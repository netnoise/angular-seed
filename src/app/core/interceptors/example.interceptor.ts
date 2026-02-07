import { HttpInterceptorFn } from '@angular/common/http';

export const exampleInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    headers: req.headers.set('X-Example-Header', 'ExampleValue'),
  });
  return next(modifiedReq);
};
