# **Technical Architecture and Specification Report for the NBA Player Analytics Dashboard**

The landscape of professional basketball analytics has evolved from the era of rudimentary box scores to a high-fidelity, data-rich environment characterized by spatial tracking, machine-learned projection systems, and real-time impact metrics. Modern platforms such as CraftedNBA, BBall Index, and Dunks and Threes have established a high benchmark for visual data storytelling, requiring frontend architectures that can handle significant asynchronous state without compromising on performance or user experience.1 To meet these demands, this report outlines a "pro" stack implementation utilizing Angular 19+ Signals, Tailwind CSS, PrimeNG, D3.js, and Zod, all governed by the OpenSpec spec-driven development framework. This architectural blueprint ensures that intent is locked before code is written, providing a deterministic and auditable path from discovery to deployment.4

## **Evolution of NBA Data Ecosystems and Architectural Implications**

The transition from traditional statistics to advanced metrics has fundamentally changed the requirements for analytical dashboards. In the early iterations of sports data platforms, simple CRUD (Create, Read, Update, Delete) operations and static tables were sufficient. However, the contemporary analyst requires an integrated view of player performance, ranging from traditional totals to complex derivations like Player Efficiency Rating (PER), True Shooting Percentage (TS%), and Estimated Plus-Minus (EPM).3

| Metric Category    | Key Indicators                       | Analytical Purpose                                         |
| :----------------- | :----------------------------------- | :--------------------------------------------------------- |
| Traditional Totals | Points, Rebounds, Assists, FG%, FT%  | Baseline counting stats for season comparisons.6           |
| Advanced Metrics   | PER, TS%, Usage%, Win Shares, VORP   | Normalizing performance across pace and minutes played.6   |
| Impact Metrics     | EPM (Offensive/Defensive), Darko DPM | Isolating individual contribution to team success via ML.3 |
| Spatial Tracking   | X/Y Coordinates, Shot Distance, Zone | Visualizing shooting efficiency and defensive gravity.8    |

These data clusters are typically served through complex JSON APIs that follow the Basketball Reference naming convention for player identifiers, such as curryst01 for Stephen Curry or jamesle01 for LeBron James.10 The disparate nature of these endpoints necessitates a robust validation layer to prevent runtime crashes when the underlying data structure shifts—a common occurrence in third-party sports APIs.11

## **OpenSpec: A Paradigm Shift in Development Methodology**

Traditional development workflows often suffer from "vibe coding," where requirements are scattered across chat histories and implementation details are improvised during the coding phase.5 OpenSpec addresses this by introducing a lightweight, specification-driven workflow that aligns human and AI stakeholders before implementation begins.4 This methodology is particularly effective for complex dashboards where data-fetching logic, visualization scales, and UI state must be precisely synchronized.

### **The OpenSpec Workflow Lifecycle**

The OpenSpec process is iterative rather than waterfall, allowing for artifacts to be created and updated as understanding deepens.14 The lifecycle consists of several distinct phases, each producing a specific artifact that lives within the openspec/ directory of the project.

| Phase              | Artifact    | Function                                                                          |
| :----------------- | :---------- | :-------------------------------------------------------------------------------- |
| **Proposal**       | proposal.md | Captures the "What" and "Why," defining scope and constraints.15                  |
| **Specification**  | specs/      | The living source of truth using structured requirements (EARS format).14         |
| **Design**         | design.md   | Outlines the technical implementation, data models, and architectural patterns.16 |
| **Implementation** | tasks.md    | A granular, testable checklist that guides the coding agent through execution.18  |
| **Verification**   | validate    | A CLI-driven check to ensure the implementation matches the agreed-upon specs.15  |
| **Persistence**    | archive     | Merges delta specs into the main specification and preserves an audit trail.14    |

OpenSpec’s advantage over competing frameworks like GitHub’s Spec Kit or AWS’s Kiro lies in its "brownfield-first" philosophy.13 While other tools excel at initial setup (0→1), OpenSpec is designed to manage evolving systems (1→n), allowing for multiple changes to be tracked in parallel without conflict.4 This is critical for an NBA dashboard that may undergo frequent updates to its metric calculation logic or visualization components.

### **Spec-Driven Governance and EARS Syntax**

The core of an OpenSpec-compliant project is the specification file, which must follow strict formatting to be machine-parseable and human-readable.22 OpenSpec recommends the Easy Approach to Requirements Syntax (EARS) to gently constrain natural language requirements into testable patterns.17 By using keywords like **WHILE**, **WHEN**, **IF**, and **THEN**, the system produces requirements that map directly to test cases.23

| EARS Pattern     | Syntax Template                                        | Dashboard Application Example                                            |
| :--------------- | :----------------------------------------------------- | :----------------------------------------------------------------------- |
| **Ubiquitous**   | The \[system\] shall \[action\]                        | The system shall maintain type safety for all API responses.25           |
| **Event-Driven** | When \[trigger\], the \[system\] shall \[action\]      | When a player is selected, the system shall initiate data fetching.23    |
| **State-Driven** | While \[state\], the \[system\] shall \[action\]       | While the data is loading, the system shall display a skeleton UI.26     |
| **Unwanted**     | If \[condition\], then the \[system\] shall \[action\] | If the API fails, then the system shall display an error notification.27 |

## **Angular 19+ Signals: The Pro Reactive Core**

The selection of Angular 19 as the primary framework is driven by its recent transition to a Signal-based reactivity model, which provides fine-grained control over change detection.28 For a dashboard displaying high-frequency data, traditional Zone.js-based change detection—which checks the entire component tree on every event—is a performance bottleneck.28 Signals enable "zoneless" execution, allowing Angular to update only the specific DOM elements that depend on a changed value.26

### **Signal Primitives and Mental Models**

Angular 19 introduces several new primitives that simplify the management of asynchronous state and derived data. The mental model shifts from "streams" (RxJS) to "synchronous containers" (Signals) for UI state.28

1. **Writable Signals**: Created using the signal() function, these provide an API for direct updates via .set() or .update().26
2. **Computed Signals**: Read-only signals that derive their value from other signals. They are lazily evaluated and memoized, ensuring that complex calculations (e.g., aggregating shooting percentages) only run when necessary.29
3. **Linked Signals**: A new feature in Angular 19 that solves the problem of "resetting" state. For example, when a user selects a new team, the player selection signal can be linked to the team signal to automatically reset to a default value.32
4. **Effects**: Used for side effects that occur outside the reactive context, such as logging or manual D3.js DOM manipulations.29

### **Asynchronous Reactivity with Resource and httpResource**

Handling data fetching is transformed by the Resource and httpResource APIs.34 Traditionally, developers had to manually manage loading, success, and error states using multiple RxJS subjects. The Resource API encapsulates these into a single object with reactive signals for value(), isLoading(), error(), and status().36  
The httpResource API is an experimental wrapper around HttpClient that integrates seamlessly with the Signal graph.35 It is "eager," meaning it initiates the request as soon as its dependencies change. This is ideal for a player dashboard where a change in the selectedPlayerId should immediately trigger a new network request while automatically cancelling any previous pending requests.35

| Resource State | Description                               | Dashboard UI Action                             |
| :------------- | :---------------------------------------- | :---------------------------------------------- |
| idle           | Initial state before parameters are set.  | Display empty state or search prompt.34         |
| loading        | Request is in flight due to param change. | Show skeleton cards for player stats.26         |
| reloading      | Manual reload triggered by user.          | Show refresh spinner on top of existing data.36 |
| resolved       | Data successfully fetched and validated.  | Render D3 shot chart and PrimeNG tables.34      |
| error          | Request or parsing failed.                | Display error message with retry button.35      |

## **Type Safety and Data Contract Enforcement with Zod**

In a data-heavy environment like NBA analytics, the "bridge of trust" between external API responses and internal application logic is critical.25 Zod provides runtime validation that ensures incoming JSON data matches the expected structure, providing much stronger guarantees than TypeScript’s compile-time interfaces alone.11

### **Schema Composition for NBA Data**

Zod schemas are highly composable, allowing developers to define base models and extend them for specific use cases.40 For the NBA dashboard, schemas are defined for the three primary data types: Player Totals, Advanced Stats, and Shot Chart data.6

TypeScript

// Example of a composition-based Zod schema for NBA data  
const BasePlayerSchema \= z.object({  
 playerId: z.string(),  
 playerName: z.string(),  
 team: z.string().length(3),  
 season: z.number().int()  
});

const AdvancedStatsSchema \= BasePlayerSchema.extend({  
 per: z.number(),  
 tsPercent: z.number().min(0).max(1),  
 usagePercent: z.number(),  
 winShares: z.number(),  
 vorp: z.number(),  
 isPlayoff: z.boolean()  
});

### **Integration with httpResource**

One of the most powerful patterns in the Angular 19 "pro" stack is the direct integration of Zod into the httpResource configuration.35 By passing a schema's .parse or .safeParse method to the resource's parse option, the system ensures that the value() signal is always correctly typed and validated.35

TypeScript

export class PlayerDashboard {  
 private playerId \= input.required\<string\>();

// The resource is automatically typed based on the Zod schema's output  
 playerStats \= httpResource(() \=\> \`/api/player/${this.playerId()}/advanced\`, {  
 parse: (data) \=\> AdvancedStatsSchema.parse(data)  
 });  
}

This pattern eliminates "silent type mismatches" where a backend change might cause the UI to display "NaN" or crash because an expected property is missing.11

## **Advanced Visualizations: D3.js and the Geometry of Basketball**

The shot chart is the center-piece of the dashboard, requiring a bridge between raw coordinate data and SVG-based rendering.8 This involves complex mathematical mapping of the NBA’s $X/Y$ coordinate system to a responsive screen layout.8

### **Coordinate Systems and Scaling**

The NBA API provides shot locations where the baseline is at $Y \= \-52.5$ and the center of the hoop is at $(0, 0)$.43 The $X$ coordinate ranges from $-250$ to $250$ across the 50-foot width of the court.8 To map these to a D3.js SVG, linear scales must be established to translate feet (multiplied by 10 in the API) into pixels.8  
The standard NBA court dimensions are 94 feet long by 50 feet wide, with the 3-point line located at 23 feet 9 inches from the center of the basket.9 Accurate mapping must account for the 6-inch gap between the rim and the plane of the backboard, a detail often missed in amateur visualizations.43

$$X\_{svg} \= f(X\_{api}) \= \\text{d3.scaleLinear}(\[-250, 250\], \[0, \\text{width}\])$$

$$Y\_{svg} \= g(Y\_{api}) \= \\text{d3.scaleLinear}(\[-52.5, 417.5\], \[\\text{height}, 0\])$$

### **Hexagonal Binning and Shot Density**

To visualize "shot gravity" and efficiency zones, the dashboard utilizes the d3-hexbin plugin.45 Instead of rendering individual points, which can clutter the UI when viewing a full season of shots, the data is aggregated into hexagonal bins.8 Each hexagon's color is determined by the player's shooting percentage in that area relative to the league average, often represented as a "Z-value" (standard deviations from the mean).8

| Visualization Technique | Technical Implementation                     | Analytical Insight                                       |
| :---------------------- | :------------------------------------------- | :------------------------------------------------------- |
| **Scatter Plot**        | Individual SVG circle elements.47            | Precise location of specific makes and misses.           |
| **Hexagonal Binning**   | d3-hexbin with color quantile scales.8       | Identifying high-efficiency "sweet spots" on the court.  |
| **Heat Maps**           | Gaussian mixture models for bounded data.9   | Continuous density estimation of shot distribution.      |
| **Zoned Charts**        | Pre-defined polygon masks for court areas.42 | Comparative efficiency across 14 distinct court regions. |

### **Component Architecture for D3 Integration**

In an Angular Signals application, D3 should be treated as a "render-only" dependency. The Angular component manages the data signal and uses a computed() signal to calculate the hexbin aggregation.29 An effect() or the afterRender hook is then used to update the D3 selection, ensuring that the DOM is only manipulated when the data or view dimensions actually change.29

## **OpenSpec Discovery and Change Proposal: NBA-DASH-001**

This section provides the actual OpenSpec-compliant artifacts for the dashboard's initialization, serving as the official handoff for implementation.4

### ---

**Proposal: add-core-dashboard-infrastructure**

**Change ID**: add-core-dashboard-infrastructure **Intent**: Establish the foundational Angular 19 reactive core, including the NBA API service, Zod data models, and the primary D3 shot chart component.15 **Scope**:

- Project initialization with Angular 19 "zoneless" configuration.30
- Setup of Tailwind CSS and PrimeNG component library.50
- Implementation of PlayerService using httpResource.35
- Creation of the ShotChartComponent with D3.js coordinate mapping.8
- Definition of Zod schemas for player totals and advanced metrics.6

**Approach**: The system will use a service-based architecture where a GlobalStore or specific feature services manage the current selectedPlayerId as a signal. All downstream data fetching will be reactive, triggered by the change of this ID. D3.js will be used within the ShotChartComponent to render an SVG representation of the court, utilizing linear scales for precise shot placement.28

### ---

**Specifications: Dashboard Behavior and Requirements**

**Requirement: Reactive Player Selection** The system SHALL update all visualizations and stats tables automatically when a new player is selected.23

- **Scenario: Successful Player Update**
  - **GIVEN** the user is viewing data for "LeBron James"
  - **WHEN** the user selects "Kevin Durant" from the search input
  - **THEN** the selectedPlayerId signal updates to duranke01 10
  - **AND** the httpResource for stats and shot data initiates new requests 35
  - **AND** the UI components transition to a loading state 26

**Requirement: Data Integrity via Schema Validation** The system SHALL validate all API responses against a pre-defined Zod schema before rendering.25

- **Scenario: API Response Mismatch**
  - **GIVEN** a request for player advanced stats is initiated
  - **WHEN** the API returns a response missing the winShares field
  - **THEN** the Zod parser SHALL catch the validation error 11
  - **AND** the httpResource.error() signal SHALL be populated with the validation failure 35
  - **AND** the system SHALL display a data-integrity warning to the user.

**Requirement: Spatial Accuracy of Shot Charts** The system SHALL render shots at their precise court coordinates with a maximum error margin of 0.5% relative to court dimensions.9

- **Scenario: Corner 3 Mapping**
  - **GIVEN** a shot record with API coordinates $(x: 235, y: 0)$
  - **WHEN** the D3 scale is applied for a 500px width court
  - **THEN** the shot SHALL be rendered exactly at the right corner-3 location on the SVG.8

### ---

**Design: Technical Architecture**

**Component Tree and State Management** The dashboard follows a unidirectional data flow pattern powered by Angular Signals.30

1. **DashboardComponent**: Top-level container managing the layout and the selectedPlayerId signal.
2. **SearchComponent**: Uses a PrimeNG AutoComplete component linked to a search signal.
3. **StatsService**: Encapsulates all httpResource definitions, providing read-only signals for stats and shot data to the view components.26
4. **ShotChartComponent**: Receives shot data via an input() signal and performs D3 rendering inside an effect().29

**Data Schema (Zod)** All API models are defined in src/app/core/models/nba-data.schema.ts to provide a single source of truth for both types and runtime validation.25  
**CSS and Theming**

- **Tailwind CSS**: Used for responsive grid layouts and spacing utilities.50
- **PrimeNG**: Provides the "DataTable" with built-in sorting and filtering for the leaderboards, as well as the "Skeleton" components for loading states.1

### ---

**Implementation Tasks**

#### **1\. Project Initialization**

- \[ \] 1.1 Run ng new nba-dashboard \--standalone \--style=scss.
- \[ \] 1.2 Enable zoneless change detection in app.config.ts.30
- \[ \] 1.3 Install dependencies: npm i d3 zod primeng tailwindcss @fission-ai/openspec.
- \[ \] 1.4 Run openspec init and configure project.md with the "pro" stack details.16

#### **2\. Data Layer and Services**

- \[ \] 2.1 Implement nba-data.schema.ts with Zod models for Totals, Advanced, and Shot Charts.6
- \[ \] 2.2 Create PlayerService and define httpResource for each endpoint.35
- \[ \] 2.3 Implement an HTTP interceptor to add required headers for the NBA API.10
- \[ \] 2.4 Test API connectivity and Zod validation using mock data.

#### **3\. Frontend Components**

- \[ \] 3.1 Build the DashboardLayout using Tailwind CSS grid.
- \[ \] 3.2 Create the ShotChartComponent and implement D3 scaling logic.8
- \[ \] 3.3 Add the AdvancedStatsTable using PrimeNG DataTable with Signals-based data binding.1
- \[ \] 3.4 Implement skeleton screens for each component based on the isLoading() signal.26

#### **4\. Final Verification**

- \[ \] 4.1 Run openspec validate add-core-dashboard-infrastructure \--strict.16
- \[ \] 4.2 Perform cross-browser testing for the D3 SVG rendering.
- \[ \] 4.3 Verify that httpResource correctly cancels stale requests on rapid player changes.35

## ---

**Technical Handoff and Best Practices for Implementation**

The success of the NBA Player Analytics Dashboard depends on the disciplined application of the "pro" stack and the OpenSpec methodology. Developers and AI coding agents should adhere to the following architectural guidelines during the implementation phase.

### **Signals-First Architecture**

Avoid the use of RxJS Subject or BehaviorSubject for local component state. Instead, use signal() and computed(). RxJS should be reserved for complex asynchronous operations that require operators like debounceTime() (for search inputs) or switchMap() when orchestrating multiple related requests that are not covered by httpResource.28  
When reading signals in an OnPush or "zoneless" component, Angular automatically tracks the dependency.29 This means that the component will only re-render when the specific signals it accesses change their value, leading to vastly improved performance in data-heavy views.28

### **Defensive API Consumption**

Third-party sports APIs are notoriously volatile. The Zod validation layer must be the first point of contact for any data entering the application.25 Use the safeParse() method to handle validation failures gracefully, allowing the UI to display a meaningful error message rather than crashing.12

| Zod Method   | Best Use Case                         | Implementation Tip                                                        |
| :----------- | :------------------------------------ | :------------------------------------------------------------------------ |
| .parse()     | Critical data that must be present.   | Throws an error; use with try/catch or let httpResource handle it.40      |
| .safeParse() | Non-critical optional metrics.        | Returns a success/error object; ideal for "doppelganger" or trait data.40 |
| .coerce      | Mapping string API values to numbers. | Essential for stats like tsPercent which might come as a string.52        |
| .infer\<\>   | Creating TypeScript interfaces.       | Eliminates "double-writing" types and schemas.39                          |

### **D3.js and SVG Performance**

For the shot chart, prioritize performance by minimizing the number of DOM nodes. If the dataset exceeds 5,000 points (e.g., career-long shot charts for players like LeBron James), consider using a Canvas-based approach for the dots or strictly enforcing hexagonal binning to limit the number of SVG elements.8 Use D3's .join() pattern for efficient entry, update, and exit selections, ensuring that transitions are smooth and performant.53  
The court visualization itself should be a static SVG or a set of pre-calculated paths to avoid recalculating the geometry on every render.42 This allows the dashboard to remain responsive even on lower-powered mobile devices.50

### **Maintaining the OpenSpec Lifecycle**

During implementation, the tasks.md file should be treated as the primary checklist. As tasks are completed, the coding agent or developer should mark them with \[x\]. Periodically run openspec status to visualize progress and identify any blocked artifacts.15  
Once the core infrastructure is complete, the change must be archived using openspec archive. This merges the delta specifications into the project's permanent documentation and prepares the environment for the next feature, such as "Add Player Comparison Tool" or "Integrate Defensive Impact Metrics".14

## **Future Outlook and Scalability**

As Angular and the OpenSpec framework continue to evolve into 2026, the dashboard is positioned to leverage upcoming features such as enhanced Signal-based forms and improved server-side rendering (SSR) for initial page loads.39 The "zoneless" nature of the application makes it highly compatible with modern performance budgets, ensuring that even as the complexity of the analytics grows, the user experience remains fluid and responsive.  
The use of OpenSpec ensures that the dashboard can scale beyond a single repository. For enterprise-level sports organizations where data may span across microservices (e.g., a dedicated service for ML projections and another for raw tracking data), OpenSpec’s multi-spec support provides a unified governance model.5 This report provides the necessary foundation for such an ambitious and high-performance system, aligning the technical stack with the rigorous requirements of professional NBA analytics.

#### **Cytowane prace**

1. BBall Index: Data That Speaks Basketball \- Basketball Index, otwierano: lutego 23, 2026, [https://www.bball-index.com/](https://www.bball-index.com/)
2. Crafted NBA, otwierano: lutego 23, 2026, [https://craftednba.com/](https://craftednba.com/)
3. Dunks & Threes, otwierano: lutego 23, 2026, [https://dunksandthrees.com/](https://dunksandthrees.com/)
4. README_OLD.md \- Fission-AI/OpenSpec \- GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec/blob/main/README_OLD.md](https://github.com/Fission-AI/OpenSpec/blob/main/README_OLD.md)
5. Spec-Driven Development – Adoption at Enterprise Scale \- InfoQ, otwierano: lutego 23, 2026, [https://www.infoq.com/articles/enterprise-spec-driven-development/](https://www.infoq.com/articles/enterprise-spec-driven-development/)
6. nprasad2077/nbaStats: NBA API Documentation \- GitHub, otwierano: lutego 23, 2026, [https://github.com/nprasad2077/nbaStats](https://github.com/nprasad2077/nbaStats)
7. NBA Player Dashboard \- Advanced Basketball Analytics \- databallr, otwierano: lutego 23, 2026, [https://databallr.com/dashboard](https://databallr.com/dashboard)
8. NBA Shot Charts With Node.js and D3.js \- Jowanza Joseph, otwierano: lutego 23, 2026, [https://www.jowanza.com/blog/nba-shot-charts-with-nodejs-and-d3js](https://www.jowanza.com/blog/nba-shot-charts-with-nodejs-and-d3js)
9. A Model-Based Approach to Shot Charts Estimation in Basketball \- arXiv.org, otwierano: lutego 23, 2026, [https://arxiv.org/html/2405.01182v1](https://arxiv.org/html/2405.01182v1)
10. NBA Stats API \- Postman, otwierano: lutego 23, 2026, [https://documenter.getpostman.com/view/25652688/2sB34Zs4xZ](https://documenter.getpostman.com/view/25652688/2sB34Zs4xZ)
11. Make Your TypeScript API Responses Safer with Zod (in seconds) \- DEV Community, otwierano: lutego 23, 2026, [https://dev.to/edudeveloper/make-your-typescript-api-responses-safer-with-zod-in-seconds-2djf](https://dev.to/edudeveloper/make-your-typescript-api-responses-safer-with-zod-in-seconds-2djf)
12. Using Zod To Validate Api Responses \- Brenelz, otwierano: lutego 23, 2026, [https://www.brenelz.com/posts/using-zod-to-validate-api-responses/](https://www.brenelz.com/posts/using-zod-to-validate-api-responses/)
13. Fission-AI/OpenSpec: Spec-driven development (SDD) for AI coding assistants. \- GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)
14. OpenSpec/docs/concepts.md at main · Fission-AI/OpenSpec · GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md](https://github.com/Fission-AI/OpenSpec/blob/main/docs/concepts.md)
15. OpenSpec/docs/commands.md at main \- GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md](https://github.com/Fission-AI/OpenSpec/blob/main/docs/commands.md)
16. How to make AI follow your instructions more for free (OpenSpec) \- DEV Community, otwierano: lutego 23, 2026, [https://dev.to/webdeveloperhyper/how-to-make-ai-follow-your-instructions-more-for-free-openspec-2c85](https://dev.to/webdeveloperhyper/how-to-make-ai-follow-your-instructions-more-for-free-openspec-2c85)
17. Ears \- Alistair Mavin, otwierano: lutego 23, 2026, [https://alistairmavin.com/ears/](https://alistairmavin.com/ears/)
18. OpenSpec/docs/customization.md at main \- GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md](https://github.com/Fission-AI/OpenSpec/blob/main/docs/customization.md)
19. openspec-proposal-creation skill by forztf/open-skilled-sdd \- playbooks, otwierano: lutego 23, 2026, [https://playbooks.com/skills/forztf/open-skilled-sdd/openspec-proposal-creation](https://playbooks.com/skills/forztf/open-skilled-sdd/openspec-proposal-creation)
20. OpenSpec/docs/cli.md at main \- GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md](https://github.com/Fission-AI/OpenSpec/blob/main/docs/cli.md)
21. OpenSpec vs Spec Kit: Choosing the Right AI-Driven Development Workflow for Your Team, otwierano: lutego 23, 2026, [https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team)
22. I have idea about spec · Issue \#691 · Fission-AI/OpenSpec \- GitHub, otwierano: lutego 23, 2026, [https://github.com/Fission-AI/OpenSpec/issues/691](https://github.com/Fission-AI/OpenSpec/issues/691)
23. EARS (Easy Approach to Requirements Syntax) Integration · Issue \#1356 · github/spec-kit, otwierano: lutego 23, 2026, [https://github.com/github/spec-kit/issues/1356](https://github.com/github/spec-kit/issues/1356)
24. Adopting the EARS Notation to Improve Requirements Engineering \- Jama Software, otwierano: lutego 23, 2026, [https://www.jamasoftware.com/requirements-management-guide/writing-requirements/adopting-the-ears-notation-to-improve-requirements-engineering/](https://www.jamasoftware.com/requirements-management-guide/writing-requirements/adopting-the-ears-notation-to-improve-requirements-engineering/)
25. Zod — The Ultimate Guide to Type-Safe schema validation | by Divya \- Medium, otwierano: lutego 23, 2026, [https://medium.com/@divya2309c/zod-the-ultimate-guide-to-type-safe-schema-validation-1d4c195c3c13](https://medium.com/@divya2309c/zod-the-ultimate-guide-to-type-safe-schema-validation-1d4c195c3c13)
26. Angular v19 New resource() and rxResource() APIs | by Giorgio Galassi \- Medium, otwierano: lutego 23, 2026, [https://medium.com/@giorgio.galassi/angular-v19-understanding-the-new-resource-and-rxresource-apis-8a387c7d9351](https://medium.com/@giorgio.galassi/angular-v19-understanding-the-new-resource-and-rxresource-apis-8a387c7d9351)
27. EARS: The Easy Approach to Requirements Syntax | by Oguz Senna | ParamTech \- Medium, otwierano: lutego 23, 2026, [https://medium.com/paramtech/ears-the-easy-approach-to-requirements-syntax-b09597aae31d](https://medium.com/paramtech/ears-the-easy-approach-to-requirements-syntax-b09597aae31d)
28. Master Angular Signals: Build Faster, Smarter Angular Apps | Syncfusion Blogs, otwierano: lutego 23, 2026, [https://www.syncfusion.com/blogs/post/angular-signals-reactive-state](https://www.syncfusion.com/blogs/post/angular-signals-reactive-state)
29. Signals • Overview • Angular, otwierano: lutego 23, 2026, [https://angular.dev/guide/signals](https://angular.dev/guide/signals)
30. Angular Signals in Practice — A Scientific, Production‑Minded Guide (2026), otwierano: lutego 23, 2026, [https://dev.to/cristiansifuentes/angular-signals-in-practice-a-scientific-production-minded-guide-2026-56jb](https://dev.to/cristiansifuentes/angular-signals-in-practice-a-scientific-production-minded-guide-2026-56jb)
31. Linked Signals — DIY. How to use linkedSignals in \< Angular… | by Kevin Kreuzer \- Medium, otwierano: lutego 23, 2026, [https://kevinkreuzer.medium.com/diy-linked-signals-7ea78ddbcefb](https://kevinkreuzer.medium.com/diy-linked-signals-7ea78ddbcefb)
32. Angular linkedSignal(): The Missing Link in Signal-Based Reactivity, otwierano: lutego 23, 2026, [https://blog.angular-university.io/angular-linkedsignal/](https://blog.angular-university.io/angular-linkedsignal/)
33. Dependent state with linkedSignal \- Angular, otwierano: lutego 23, 2026, [https://angular.dev/guide/signals/linked-signal](https://angular.dev/guide/signals/linked-signal)
34. Async reactivity with resources \- Angular, otwierano: lutego 23, 2026, [https://angular.dev/guide/signals/resource](https://angular.dev/guide/signals/resource)
35. Reactive data fetching with httpResource \- Angular, otwierano: lutego 23, 2026, [https://angular.dev/guide/http/http-resource](https://angular.dev/guide/http/http-resource)
36. Angular 19: linkedSignal & Resource API \- Playful Programming, otwierano: lutego 23, 2026, [https://playfulprogramming.com/posts/angular-linked-signal-resource-api](https://playfulprogramming.com/posts/angular-linked-signal-resource-api)
37. Seamless data fetching with httpResource | by Matthieu Riegler | Angular Blog, otwierano: lutego 23, 2026, [https://blog.angular.dev/seamless-data-fetching-with-httpresource-71ba7c4169b9](https://blog.angular.dev/seamless-data-fetching-with-httpresource-71ba7c4169b9)
38. Getting Started with the httpResource API in Angular \- Telerik.com, otwierano: lutego 23, 2026, [https://www.telerik.com/blogs/getting-started-httpresource-api-angular](https://www.telerik.com/blogs/getting-started-httpresource-api-angular)
39. Angular v21 — Runtime Validation with Zod: Schemas, Signals, and Boundaries | by Giorgio Galassi | Jan, 2026 | Stackademic, otwierano: lutego 23, 2026, [https://blog.stackademic.com/angular-v21-runtime-validation-with-zod-schemas-signals-and-boundaries-f1ddbcb208b1](https://blog.stackademic.com/angular-v21-runtime-validation-with-zod-schemas-signals-and-boundaries-f1ddbcb208b1)
40. colinhacks/zod: TypeScript-first schema validation with static type inference \- GitHub, otwierano: lutego 23, 2026, [https://github.com/colinhacks/zod](https://github.com/colinhacks/zod)
41. Ng-News 25/09: Angular 19.2, httpResource \- Medium, otwierano: lutego 23, 2026, [https://medium.com/ng-news/ng-news-25-09-angular-19-2-httpresource-593e3fad2a52](https://medium.com/ng-news/ng-news-25-09-angular-19-2-httpresource-593e3fad2a52)
42. michaelmirandi/shotchart.d3.ts: A React+D3 library for Basketball Shot Charts \- GitHub, otwierano: lutego 23, 2026, [https://github.com/michaelmirandi/shotchart.d3.ts](https://github.com/michaelmirandi/shotchart.d3.ts)
43. NBA shot chart court dimensions : r/NBAanalytics \- Reddit, otwierano: lutego 23, 2026, [https://www.reddit.com/r/NBAanalytics/comments/1diytw7/nba_shot_chart_court_dimensions/](https://www.reddit.com/r/NBAanalytics/comments/1diytw7/nba_shot_chart_court_dimensions/)
44. Adding jointplot to NBA shot chart using d3js \- Stack Overflow, otwierano: lutego 23, 2026, [https://stackoverflow.com/questions/38912880/adding-jointplot-to-nba-shot-chart-using-d3js](https://stackoverflow.com/questions/38912880/adding-jointplot-to-nba-shot-chart-using-d3js)
45. virajsanghvi/d3.basketball-shot-chart \- GitHub, otwierano: lutego 23, 2026, [https://github.com/virajsanghvi/d3.basketball-shot-chart](https://github.com/virajsanghvi/d3.basketball-shot-chart)
46. Want to build your own d3 shot charts? \- tothemean, otwierano: lutego 23, 2026, [https://www.tothemean.com/2015/02/26/d3-basketball-shot-charts.html](https://www.tothemean.com/2015/02/26/d3-basketball-shot-charts.html)
47. Using the SVG Coordinate Space With D3.js \- DashingD3js, otwierano: lutego 23, 2026, [https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js](https://www.dashingd3js.com/d3-tutorial/using-the-svg-coordinate-space-with-d3-js)
48. Adding Shot Chart Data to NBA Scenes \- Stanford University, otwierano: lutego 23, 2026, [https://web.stanford.edu/class/cs231a/prev_projects_2016/NeeravDixit_Project_CS231A.pdf](https://web.stanford.edu/class/cs231a/prev_projects_2016/NeeravDixit_Project_CS231A.pdf)
49. Angular's new httpResource \- ANGULARarchitects, otwierano: lutego 23, 2026, [https://www.angulararchitects.io/blog/learning-httpresource-with-super-mario/](https://www.angulararchitects.io/blog/learning-httpresource-with-super-mario/)
50. Angular in 2026 & Beyond: 10 Best Practices Every Developer Can't Ignore, otwierano: lutego 23, 2026, [https://www.bootstrapdash.com/blog/angular-10-best-practices](https://www.bootstrapdash.com/blog/angular-10-best-practices)
51. swar/nba_api: An API Client package to access the APIs for NBA.com \- GitHub, otwierano: lutego 23, 2026, [https://github.com/swar/nba_api](https://github.com/swar/nba_api)
52. Defining schemas | Zod, otwierano: lutego 23, 2026, [https://zod.dev/api](https://zod.dev/api)
53. Paths | D3 by Observable \- D3.js, otwierano: lutego 23, 2026, [https://d3js.org/d3-geo/path](https://d3js.org/d3-geo/path)
