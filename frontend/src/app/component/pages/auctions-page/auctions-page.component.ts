import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedImports } from '../../shared/shared-imports';
import { Router } from '@angular/router';
import { AuctionService } from '../../../services/auction-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auctions-page',
  standalone: true,
  imports: [SharedImports, RouterLink],
  providers: [AuctionService],
  templateUrl: './auctions-page.component.html',
  styleUrls: ['./auctions-page.component.css']
})
export class AuctionsPageComponent implements OnInit, OnDestroy {
  auctionItems: any[] = [];
  searchQuery: string = '';
  sortOption: string = 'popularity';
  categories: string[] = ['Antiques', 'Cameras', 'Electronics', 'Gaming', 'Headphones', 'Laptops'];
  countdowns: { [key: string]: string } = {}; // Countdown for each item
  statuses: { [key: string]: string } = {}; // Live status for each item
  intervalIds: { [key: string]: any } = {}; // Store interval IDs

  constructor(private router: Router, private auctionService: AuctionService) {}

  ngOnInit() {
    this.fetchAuctionItems();
  }

  ngOnDestroy() {
    // Clear all intervals on component destroy
    for (const id in this.intervalIds) {
      clearInterval(this.intervalIds[id]);
    }
  }

  fetchAuctionItems() {
    this.auctionService.getAllItems().subscribe(
      (response: any) => {
        console.log('Fetched auction items:', response);
        if (response && Array.isArray(response.items)) {
          this.auctionItems = response.items; // Store the items array
          this.auctionItems.forEach(item => this.initializeCountdown(item));
        } else {
          console.error('Unexpected response format:', response);
          this.auctionItems = []; // Default to empty array if response format is invalid
        }
      },
      (error) => {
        console.error('Error fetching auction items:', error);
      }
    );
  }

  initializeCountdown(item: any) {
    const startTime = new Date(item.startTime).getTime();
    const endTime = new Date(item.endTime).getTime();
    const now = new Date().getTime();
  
    if (now < startTime) {
      this.countdowns[item._id] = 'Auction starts soon';
      this.statuses[item._id] = 'Not Live';
      this.intervalIds[item._id] = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = startTime - currentTime;
  
        if (remainingTime > 0) {
          this.countdowns[item._id] = `Starts in ${this.formatTime(remainingTime)}`;
        } else {
          this.countdowns[item._id] = 'Auction is live!';
          this.statuses[item._id] = 'Live';
          clearInterval(this.intervalIds[item._id]);
          this.initializeCountdown(item); // Re-initialize for countdown to end time
        }
      }, 1000);
    } else if (now >= endTime) {
      this.countdowns[item._id] = 'Auction ended';
      this.statuses[item._id] = 'Auction Not Live';
    } else {
      this.countdowns[item._id] = this.formatTime(endTime - now);
      this.statuses[item._id] = 'Live';
  
      this.intervalIds[item._id] = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainingTime = endTime - currentTime;
  
        if (remainingTime > 0) {
          this.countdowns[item._id] = this.formatTime(remainingTime);
        } else {
          this.countdowns[item._id] = 'Auction ended';
          this.statuses[item._id] = 'Auction Not Live';
          clearInterval(this.intervalIds[item._id]);
        }
      }, 1000);
    }
  }
  
  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  filterByCategory(selectedCategory: string) {
    console.log('Selected category:', selectedCategory);

    this.auctionService.getAllItems().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.items)) {
          this.auctionItems = response.items.filter(
            (item: any) => item.category === selectedCategory
          );
          this.auctionItems.forEach(item => this.initializeCountdown(item)); // Reinitialize countdown
        } else {
          console.error('Unexpected response format:', response);
          this.auctionItems = [];
        }
      },
      (error) => {
        console.error('Error filtering auction items:', error);
      }
    );
  }
}
