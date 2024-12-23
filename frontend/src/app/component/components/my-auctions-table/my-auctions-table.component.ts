import { Component, OnInit, inject } from '@angular/core';
import { AuctionService } from '../../../services/auction-service.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedImports } from '../../shared/shared-imports';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
 
@Component({
  selector: 'app-my-auctions-table',
  standalone: true,
  imports: [...SharedImports, MatTableModule, MatMenuModule, HttpClientModule],
  templateUrl: './my-auctions-table.component.html',
  styleUrls: ['./my-auctions-table.component.css'],
  providers: [AuctionService],
})
export class MyAuctionsTableComponent implements OnInit {
  auctions: any[] = []; // Array to hold fetched auction data
  filteredAuctions: any[] = []; // Filtered auctions for display
  searchQuery: string = ''; // Search input binding
  activeFilter: string = 'all'; // Current filter state
  dropdownOpen = false;
  readonly dialog = inject(MatDialog);

  constructor(
    private auctionService: AuctionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchMyAuctions(); // Fetch auctions when component initializes
  }

  fetchMyAuctions(): void {
    this.auctionService.getMyAuctions().subscribe({
      next: (response: any) => {
        if (response && Array.isArray(response.items)) {
          this.auctions = response.items; // Assign fetched auctions to auctions array
          this.applyFilters(); // Apply filters initially
        } else {
          console.error('Invalid response format: Expected "items" field');
        }
      },
      error: (error) => {
        console.error('Failed to fetch auctions:', error);
      },
    });
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  applyFilters(): void {
    this.filteredAuctions = this.auctions.filter((auction) => {
      const matchesFilter =
        this.activeFilter === 'all' ||
        (this.activeFilter === 'live' && auction.status === 'live') ||
        (this.activeFilter === 'upcoming' && auction.status === 'upcoming') ||
        (this.activeFilter === 'history' && auction.status === 'history');
      const matchesSearch =
        !this.searchQuery ||
        auction.title.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }

  onFilterChange(filter: string): void {
    this.activeFilter = filter; // Update active filter
    this.applyFilters();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value; // Update search query
    this.applyFilters();
  }

  navigateToDetails(auctionId: string): void {
    this.router.navigate([`/my-auction/${auctionId}`]); // Navigate to auction details page
  }
  
}

   
