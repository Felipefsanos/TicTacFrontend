import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MessageService } from '../shared/services/message.service';
import { catchError } from 'rxjs/operators';
import { ErrorModel } from '../shared/models/error/error.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private messageService: MessageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        let errorTratado: ErrorModel = {};
        try {
          errorTratado = error.error as ErrorModel;
        } catch (e) {
          throwError(e);
        }

        switch (error.status) {
          case 401:
            this.messageService.warn(errorTratado.message as string, 'OK');
            console.log(error);
            return throwError(errorTratado.message as string);
          case 404:
            this.messageService.warn(errorTratado ? errorTratado.message as string : 'Nada foi encontrado.' , 'OK');
            console.log(error);
            return throwError(errorTratado.message);
          case 422:
            this.messageService.warn(errorTratado.message as string, 'OK');
            console.log(error);
            return throwError(errorTratado.message);
          default:
            this.messageService.warn('Erro desconhecido.', 'OK');
            console.log(error);
            return throwError('Erro interno.');
        }
      })
    );
  }
}
