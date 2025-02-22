import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorHandler: ErrorHandlerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1), // Retry failed requests once
      catchError((error: HttpErrorResponse) => {
        // Detailed error logging
        console.log('Network Error Details:', {
          type: error.error instanceof ProgressEvent ? 'Network Error' : 'HTTP Error',
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          error: error.error,
          message: error.message
        });

        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }
}
