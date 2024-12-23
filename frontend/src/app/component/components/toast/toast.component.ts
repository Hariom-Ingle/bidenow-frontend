import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { Observable, Subscription } from 'rxjs';
 import { SharedImports } from '../../shared/shared-imports';
@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [...SharedImports], // You can remove this if you are not using any other components or modules
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit, OnDestroy {
  message$: Observable<string>;
  messageSubscription: Subscription | null = null; // Initialize with null

  constructor(private toastService: ToastService) {
    this.message$ = this.toastService.toastMessages$;
  }

  ngOnInit() {
    this.messageSubscription = this.message$.subscribe((message) => {
      if (message) {
        setTimeout(() => {
          this.toastService.clearToast();
        }, 3000);
      }
    });
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
}
