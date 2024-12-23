import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { SharedImports } from '../../shared/shared-imports';
import { ToastService } from '../../../services/toast.service';
import { ToastComponent } from "../../components/toast/toast.component";
@Component({
  selector: 'app-auction-detail',
  standalone: true,
  imports: [SharedImports, ToastComponent],
  templateUrl: './auction-detail.component.html',
  styleUrls: ['./auction-detail.component.css'],
  providers: [AdminService],
})
export class AuctionDetailComponent implements OnInit {
  auctionItem: any = null; 
  countdown: string = ''; // Display the countdown
  live: boolean = false; // Indicates if the auction is live
  intervalId: any; // Timer cleanup
  amount: number = 0; // User's bid
  auctionId!: string; // Auction ID from the route
  isAdmin: boolean = true; // Assume you are setting this dynamically
  statusUpdateMessage: string = ''; // Store status update feedback message

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // Extract 'id' from the route
    this.auctionId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.auctionId) {
      console.error('No auction ID found in route.');
      alert('Invalid auction item.');
      return;
    }
  
    // Fetch auction details
    this.fetchAuctionDetails(this.auctionId);
  }
  fetchAuctionDetails(itemId: string) {
    this.adminService.getItemById(itemId).subscribe(
      (response: any) => {
        this.auctionItem = response.auctionItem || null;
        console.log('Auction details:', this.auctionItem);
      },
      (error) => {
        console.error('Error fetching auction details:', error);
        this.auctionItem = null; // Reset on error
      }
    );
  }

  // Update Auction Status Method
updateAuctionStatus(auctionId: string, status: string) {
  this.statusUpdateMessage = '';
  console.log('Updating auction status:', auctionId, status);

  this.adminService.updateAuctionStatus(auctionId, status).subscribe(
    (response: any) => {
      console.log('Auction status updated:', response);
      this.auctionItem.status = status; // Update the status locally
      this.statusUpdateMessage = `Auction status successfully updated to ${status}.`;
      this.toastService.showToast(`Auction status updated to ${status}`);
    },
    (error) => {
      console.error('Error updating auction status:', error);
      this.statusUpdateMessage = 'Error updating auction status.';
      this.toastService.showToast('Error updating auction status.');
    }
  );
}

  
  toggleFeaturedStatus(auctionId: string) {
    this.adminService.toggleIsFeatured(auctionId).subscribe(
      (response: any) => {
        console.log('Featured status toggled:', response);
        if (this.auctionItem) {
          this.auctionItem.isFeatured = response.auctionItem.isFeatured;
        }
        this.toastService.showToast(
          `Auction item featured status updated to ${this.auctionItem?.isFeatured ? 'Featured' : 'Not Featured'}.`
        );
      },
      (error) => {
        console.error('Error toggling featured status:', error);
        this.toastService.showToast('Error updating featured status.');
      }
    );
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
