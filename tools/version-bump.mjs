import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join, relative } from 'path';

const argv = process.argv.slice(2);
const bumpTypes = ['major', 'minor', 'patch', 'prerelease'];
const bumpType = argv.find(a => bumpTypes.includes(a)) || 'patch';
const doGit = argv.includes('--git');
const allowDirty = argv.includes('--allow-dirty');
const dryRun = argv.includes('--dry-run');
const requireUnreleased = argv.includes('--require-unreleased');
const requireSpecsClean = argv.includes('--require-specs-clean');
const explicitVersion = readOptionValue('--version', argv);
const preid = readOptionValue('--preid', argv) || 'rc';

if (argv.includes('--help') || argv.includes('-h')) {
  printHelp();
  process.exit(0);
}

if (explicitVersion && argv.some(a => bumpTypes.includes(a))) {
  fail('Use either a bump type or --version, not both.');
}

if (!/^[0-9A-Za-z-]+$/.test(preid)) {
  fail('Invalid --preid value. Use only alphanumerics and dashes (e.g. rc, beta).');
}

const cwd = process.cwd();
const pkgPath = join(cwd, 'package.json');
const lockPath = join(cwd, 'package-lock.json');
const changelogPath = join(cwd, 'CHANGELOG.md');
const versionFilePath = join(cwd, 'src/app/version.ts');
const specsPath = join(cwd, 'specs');

// 1. Read package.json
const pkgRaw = readRequiredFile(pkgPath);
const pkg = parseJson(pkgRaw, pkgPath);
const oldVersion = pkg.version;
const oldSemver = parseSemver(oldVersion);
if (!oldSemver) {
  fail(`Invalid current version "${oldVersion}" in ${rel(pkgPath)}. Expected x.y.z (SemVer).`);
}

// 2. Compute new version
let newVersion;
if (explicitVersion) {
  if (!parseSemver(explicitVersion)) {
    fail(`Invalid --version "${explicitVersion}". Expected x.y.z (SemVer).`);
  }
  newVersion = explicitVersion;
} else {
  const bumped = bumpSemver(oldSemver, bumpType, preid);
  newVersion = formatSemver(bumped);
}

if (newVersion === oldVersion) {
  fail('New version is the same as current version. Choose a different bump or --version.');
}

pkg.version = newVersion;

const specChanges = findSpecChanges(specsPath);
if (specChanges.length > 0) {
  const relChanges = specChanges.map(rel).join(', ');
  const message = `Found ${specChanges.length} specs/*/changes.md files: ${relChanges}. Merge them into CHANGELOG.md before release.`;
  if (requireSpecsClean) {
    fail(message);
  } else {
    console.warn(`WARN: ${message}`);
  }
}

// 3. Update files
const changedFiles = [];
writeIfChanged(pkgPath, JSON.stringify(pkg, null, 2) + '\n', pkgRaw, changedFiles, dryRun);

if (existsSync(lockPath)) {
  const lockRaw = readFileSync(lockPath, 'utf8');
  const lockJson = parseJson(lockRaw, lockPath);
  const lockUpdated = updatePackageLock(lockJson, newVersion);
  if (lockUpdated) {
    writeIfChanged(lockPath, JSON.stringify(lockJson, null, 2) + '\n', lockRaw, changedFiles, dryRun);
  } else {
    console.log(`ℹ️  No version fields updated in ${rel(lockPath)}`);
  }
} else {
  console.warn(`⚠️  ${rel(lockPath)} not found. Skipping lockfile update.`);
}

// Update CHANGELOG.md
if (existsSync(changelogPath)) {
  const changelogRaw = readFileSync(changelogPath, 'utf8');
  const date = new Date().toISOString().split('T')[0];
  const updated = updateChangelog(changelogRaw, newVersion, date);
  if (updated.unreleasedBody !== undefined && updated.unreleasedBody.length === 0) {
    const message = `${rel(changelogPath)} has an empty [Unreleased] section; release notes will be empty.`;
    if (requireUnreleased) {
      fail(message);
    } else {
      console.warn(`WARN: ${message}`);
    }
  }
  if (updated.updated) {
    writeIfChanged(changelogPath, updated.content, changelogRaw, changedFiles, dryRun);
  } else {
    console.warn(`⚠️  ${updated.reason}`);
  }
} else {
  console.warn(`⚠️  ${rel(changelogPath)} not found. Skipping changelog update.`);
}

// Generate app version file
if (existsSync(versionFilePath)) {
  writeIfChanged(
    versionFilePath,
    `export const VERSION = '${newVersion}';\n`,
    undefined,
    changedFiles,
    dryRun
  );
} else {
  console.warn(`⚠️  ${rel(versionFilePath)} not found. Skipping version file update.`);
}

console.log(`✅ Files updated: v${oldVersion} -> v${newVersion}`);

// 4. Optional Git Operations
if (doGit) {
  if (!allowDirty && !isGitClean()) {
    fail('Working tree is dirty. Commit or stash changes, or re-run with --allow-dirty.');
  }
  if (changedFiles.length === 0) {
    fail('No files changed; nothing to commit or tag.');
  }
  try {
    const relFiles = changedFiles.map(f => rel(f));
    execSync(`git add -- ${relFiles.join(' ')}`);
    execSync(`git commit -m "chore: release v${newVersion}"`);
    execSync(`git tag v${newVersion}`);
    console.log(`✅ Git commit and tag created: v${newVersion}`);
    console.log(`👉 Run 'git push origin main --tags' to publish.`);
  } catch (error) {
    console.error('❌ Git operations failed. Ensure you are on a clean branch.');
  }
} else {
  console.log('\n--- Next Steps (Manual) ---');
  console.log(`1. git add ${changedFiles.map(f => rel(f)).join(' ')}`);
  console.log(`2. git commit -m "chore: release v${newVersion}"`);
  console.log(`3. git tag v${newVersion}`);
  console.log(`4. git push origin main --tags`);
}

function printHelp() {
  console.log(`Usage: node tools/version-bump.mjs [major|minor|patch|prerelease] [options]

Options:
  --version x.y.z     Set an explicit version (SemVer)
  --preid <id>        Pre-release identifier for prerelease bumps (default: rc)
  --git               Create git commit and tag
  --allow-dirty       Allow git operations with uncommitted changes
  --require-unreleased  Fail if CHANGELOG.md [Unreleased] is empty
  --require-specs-clean Fail if specs/*/changes.md files exist
  --dry-run           Print actions without writing files
  -h, --help          Show help
`);
}

function readOptionValue(option, args) {
  const direct = args.find(arg => arg.startsWith(`${option}=`));
  if (direct) return direct.slice(option.length + 1);
  const idx = args.indexOf(option);
  if (idx === -1) return null;
  if (idx === args.length - 1) {
    fail(`Missing value for ${option}.`);
  }
  return args[idx + 1];
}

function readRequiredFile(filePath) {
  if (!existsSync(filePath)) {
    fail(`${rel(filePath)} not found.`);
  }
  return readFileSync(filePath, 'utf8');
}

function parseJson(raw, filePath) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    fail(`Failed to parse ${rel(filePath)} as JSON.`);
  }
}

function updatePackageLock(lockJson, version) {
  let updated = false;
  if (lockJson.version) {
    lockJson.version = version;
    updated = true;
  }
  if (lockJson.packages && lockJson.packages['']) {
    lockJson.packages[''].version = version;
    updated = true;
  }
  return updated;
}

function updateChangelog(changelog, version, date) {
  const marker = '## [Unreleased]';
  const markerIndex = changelog.indexOf(marker);
  if (markerIndex === -1) {
    return { updated: false, reason: `${rel(changelogPath)} missing "${marker}".` };
  }
  const releaseHeader = `## [${version}] - ${date}`;
  if (changelog.includes(releaseHeader)) {
    return { updated: false, reason: `${releaseHeader} already exists in ${rel(changelogPath)}.` };
  }
  const afterMarkerIndex = markerIndex + marker.length;
  const nextHeaderIndex = changelog.indexOf('\n## [', afterMarkerIndex);
  const unreleasedBody = changelog
    .slice(afterMarkerIndex, nextHeaderIndex === -1 ? changelog.length : nextHeaderIndex)
    .trim();
  const rest = nextHeaderIndex === -1 ? '' : changelog.slice(nextHeaderIndex);
  let updated = `${changelog.slice(0, markerIndex)}${marker}\n\n${releaseHeader}`;
  if (unreleasedBody.length > 0) {
    updated += `\n\n${unreleasedBody}`;
  }
  updated += '\n';
  if (rest) {
    updated += rest.replace(/^\n+/, '\n');
  }
  return { updated: true, content: updated, unreleasedBody };
}

function writeIfChanged(filePath, nextContent, currentContent, changed, dryRunMode) {
  const existing = currentContent !== undefined
    ? currentContent
    : existsSync(filePath)
      ? readFileSync(filePath, 'utf8')
      : null;
  if (existing === nextContent) {
    console.log(`ℹ️  No changes for ${rel(filePath)}`);
    return false;
  }
  if (dryRunMode) {
    console.log(`[dry-run] Would update ${rel(filePath)}`);
    changed.push(filePath);
    return true;
  }
  writeFileSync(filePath, nextContent);
  changed.push(filePath);
  console.log(`✅ Updated ${rel(filePath)}`);
  return true;
}

function parseSemver(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?$/.exec(version);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] || null,
    build: match[5] || null
  };
}

function formatSemver(semver) {
  let output = `${semver.major}.${semver.minor}.${semver.patch}`;
  if (semver.prerelease) output += `-${semver.prerelease}`;
  if (semver.build) output += `+${semver.build}`;
  return output;
}

function bumpSemver(current, type, prereleaseId) {
  const next = { ...current, prerelease: null, build: null };
  if (type === 'major') {
    next.major += 1;
    next.minor = 0;
    next.patch = 0;
    return next;
  }
  if (type === 'minor') {
    next.minor += 1;
    next.patch = 0;
    return next;
  }
  if (type === 'patch') {
    next.patch += 1;
    return next;
  }
  if (type === 'prerelease') {
    if (!current.prerelease) {
      next.patch += 1;
      next.prerelease = `${prereleaseId}.0`;
      return next;
    }
    const prefix = `${prereleaseId}.`;
    if (current.prerelease.startsWith(prefix)) {
      const number = Number(current.prerelease.slice(prefix.length));
      const nextNumber = Number.isFinite(number) ? number + 1 : 0;
      next.prerelease = `${prereleaseId}.${nextNumber}`;
    } else {
      next.prerelease = `${prereleaseId}.0`;
    }
    return next;
  }
  fail(`Unknown bump type: ${type}`);
}

function isGitClean() {
  try {
    const output = execSync('git status --porcelain').toString().trim();
    return output.length === 0;
  } catch (error) {
    fail('Failed to check git status.');
  }
}

function rel(filePath) {
  return relative(cwd, filePath) || filePath;
}

function findSpecChanges(basePath) {
  if (!existsSync(basePath)) return [];
  const results = [];
  walkDir(basePath, results);
  return results;
}

function walkDir(dir, results) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, results);
    } else if (entry.isFile() && entry.name === 'changes.md') {
      results.push(fullPath);
    }
  }
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}