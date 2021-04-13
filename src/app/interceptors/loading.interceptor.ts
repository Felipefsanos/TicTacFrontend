import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../shared/services/loading.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    debugger;
    if (request.headers.has('dontShowLoading')) {
      return next.handle(request);
    }

    this.loadingService.showLoading();

    return next.handle(request).pipe(
      finalize(() => this.loadingService.hideLoading())
    );
  }
}
