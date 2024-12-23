import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<string>(''); // Store the message
  toastMessages$ = this.toastSubject.asObservable(); // Expose it as an observable

  constructor() {}

  // Show toast with a message
  showToast(message: string) {
    this.toastSubject.next(message); // Set the message to display
  }

  // Optionally, clear the toast message
  clearToast() {
    this.toastSubject.next('');
  }
}
