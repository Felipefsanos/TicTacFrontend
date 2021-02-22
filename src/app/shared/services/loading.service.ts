import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  $isLoading = new BehaviorSubject<boolean | 'dont-show'>(false);

  constructor() { }

  showLoading(): void {
    this.$isLoading.next(true);
  }

  hideLoading(): void {
    this.$isLoading.next(false);
  }

  dontShowGlobalLoading(): void {
    this.$isLoading.next('dont-show');
  }
}
