import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { defaultErrorToastConfig } from '../configs/default-toast.configs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toast: HotToastService) {}

  handleError(error: HttpErrorResponse): void {
    // Check for network error with 429 status
    if (error.error instanceof ProgressEvent && error.status === 0) {
      const url = error.url || '';
      // Check if the error message or URL contains indication of 429
      if (url.includes('net::ERR_FAILED') || error.statusText.includes('429')) {
        this.toast.error('Trop de requêtes, veuillez réessayer plus tard', defaultErrorToastConfig);
        return;
      }
    }

    // Regular error handling
    if (error.status === 429) {
      this.toast.error('Trop de requêtes, veuillez réessayer plus tard', defaultErrorToastConfig);
      return;
    }

    this.toast.error('Une erreur est survenue', defaultErrorToastConfig);
  }
}
