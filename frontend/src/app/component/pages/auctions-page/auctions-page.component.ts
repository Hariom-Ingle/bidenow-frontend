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
  filteredItems: any[] = []; // Filtered items to display
  searchQuery: string = '';
  sortOption: string = 'popularity';
  categories: string[] = ['Antiques', 'Cameras', 'Electronics', 'Gaming', 'Headphones', 'Laptops'];
  countdowns: { [key: string]: string } = {};
  statuses: { [key: string]: string } = {};
  intervalIds: { [key: string]: any } = {};
  showLive: boolean = false; // Show only live items
  selectedCategory: string = ''; // Selected category for filtering
  
  constructor(private router: Router, private auctionService: AuctionService) {}

  ngOnInit() {
    this.fetchAuctionItems();
  }

  ngOnDestroy() {
    for (const id in this.intervalIds) {
      clearInterval(this.intervalIds[id]);
    }
  }

  fetchAuctionItems() {
    this.auctionService.getAllItems().subscribe(
      (response: any) => {
        if (response && Array.isArray(response.items)) {
          this.auctionItems = response.items;
          this.filteredItems = [...this.auctionItems];
          this.auctionItems.forEach(item => this.initializeCountdown(item));
        } else {
          this.auctionItems = [];
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
    } else if (now >= endTime) {
      this.countdowns[item._id] = 'Auction ended';
      this.statuses[item._id] = 'Auction Not Live';
    } else {
      this.countdowns[item._id] = this.formatTime(endTime - now);
      this.statuses[item._id] = 'Live';
    }

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

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  filterByCategory(selectedCategory: string) {
    this.filteredItems = this.auctionItems.filter(
      (item: any) => item.category === selectedCategory
  /**
   * Filter the auction items by the given tags
   * @param selectedTags the selected tags to filter by
   */
    );
  }
  filterByTags(selectedTags: string[]) {
    if (selectedTags.length > 0) {
      this.filteredItems = this.auctionItems.filter((item: any) =>
        selectedTags.includes(item.category)
      );
    } else {
      this.filteredItems = [...this.auctionItems];
    }
  }

  filterItems() {
    // Apply search and category filters together
    this.filteredItems = this.auctionItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesCategory = this.selectedCategory ? item.category === this.selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  
    // Apply sorting after filtering
    this.sortItems();
  }
  
  sortItems() {
    if (this.sortOption === 'price') {
      this.filteredItems.sort((a, b) => a.startingBid - b.startingBid);
    } else if (this.sortOption === 'newest') {
      this.filteredItems.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
    } else if (this.sortOption === 'popularity') {
      this.filteredItems.sort((a, b) => b.popularity - a.popularity); // Assuming popularity is a property
    }
  }
  onSearchChange() {
    this.filterItems(); // Re-filter on search input change
  }
  
  onCategoryChange(category: string) {
    this.selectedCategory = category; // Update selected category
    this.filterItems(); // Re-filter when category changes
  }
  
  onSortOptionChange() {
    this.sortItems(); // Re-sort when the sort option changes
  }
  toggleShowLive() {
    this.showLive = !this.showLive;
    if (this.showLive) {
      this.filteredItems = this.auctionItems.filter((item: any) => this.statuses[item._id] === 'Live');
    } else {
      this.filteredItems = [...this.auctionItems];
    }
  }
}
