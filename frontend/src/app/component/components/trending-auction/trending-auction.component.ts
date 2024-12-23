import { Component, OnInit } from '@angular/core';
import { AuctionService} from '../../../services/auction-service.service';
import { SharedImports } from '../../shared/shared-imports';
@Component({
  selector: 'app-trending-auction',
  standalone: true,
  imports: [SharedImports],
  templateUrl: './trending-auction.component.html',
  styleUrl: './trending-auction.component.css',
  providers: [AuctionService]
})
export class TrendingAuctionComponent implements OnInit {
  trendingItems: any[] = [];
  countdowns: { [key: string]: string } = {};

  constructor(private auctionService: AuctionService) {}

  ngOnInit(): void {
    this.fetchTrendingAuctions();
  }

  fetchTrendingAuctions() {
    this.auctionService.getTrendingAuctions().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        // Extracting trendingProducts from the response
        this.trendingItems = response.trendingProducts || [];
        this.trendingItems.forEach((item) => {
          this.startCountdown(item.endTime, item._id);  // Updated 'id' to '_id'
        });
      },
      (error) => {
        console.error('Error fetching trending auctions:', error);
      }
    );
  }
  
  

  startCountdown(endTime: string, itemId: string) {
    const end = new Date(endTime).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      if (now < end) {
        this.countdowns[itemId] = this.formatTime(end - now);
      } else {
        this.countdowns[itemId] = 'Auction Ended';
        clearInterval(interval);
      }
    }, 1000);
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}
