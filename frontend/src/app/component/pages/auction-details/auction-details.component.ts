import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuctionService } from '../../../services/auction-service.service';
import { SharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-auction-details',
  standalone: true,
  imports: [...SharedImports],
  providers: [AuctionService],
  templateUrl: './auction-details.component.html',
  styleUrls: ['./auction-details.component.css'],
})
export class AuctionDetailsComponent implements OnInit, OnDestroy {
  auctionItem: any = null; // Store auction details
  countdown: string = ''; // Display the countdown
  live: boolean = false; // Indicates if the auction is live
  intervalId: any; // Timer cleanup
  amount: number = 0; // User's bid
  auctionId!: string; // Auction ID from the route

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService
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
    this.auctionService.getItemById(itemId).subscribe(
      (response: any) => {
        this.auctionItem = response.auctionItem || null;
        console.log('Auction details:', this.auctionItem);
        if (this.auctionItem) {
          this.checkAuctionStatus(
            this.auctionItem.startTime,
            this.auctionItem.endTime
          );
        }
      },
      (error) => {
        console.error('Error fetching auction details:', error);
        this.auctionItem = null; // Reset on error
      }
    );
  }

  checkAuctionStatus(startTime: string, endTime: string) {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();

    if (now >= start && now < end) {
      this.live = true;
      this.startCountdown(end);
    } else {
      this.live = false;
      this.countdown =
        now < start
          ? `Auction starts in: ${this.formatTime(start - now)}`
          : 'Auction ended';
    }
  }

  startCountdown(endTime: number) {
    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      if (now < endTime) {
        this.countdown = `Time remaining: ${this.formatTime(endTime - now)}`;
      } else {
        this.countdown = 'Auction ended';
        this.live = false;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  placeBid() {
    if (!this.auctionId) {
      console.error('Auction ID is missing.');
      alert('Invalid auction item.');
      return;
    }
  
    if (this.amount <= 0) {
      alert('Please enter a valid bid amount.');
      return;
    }
  
    const bidData = { amount: this.amount };
    console.log(bidData);

    this.auctionService.placeBid(this.auctionId, bidData).subscribe(
      (response) => {
        alert('Bid placed successfully!');
        if (this.auctionItem) {
          this.auctionItem.currentBid = response.currentBid; // Update current bid dynamically
        }
      },
      (error) => {
        console.error('Error placing bid:', error);
        alert(error.error.message || 'Failed to place bid. Please try again later.');
      }
    );
  }
  

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
