import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';
 
@Component({
  selector: 'app-auction-tabel',
  standalone: true,
  imports: [SharedImports],
  templateUrl: './auction-tabel.component.html',
  styleUrls: ['./auction-tabel.component.css'],
  providers: [AdminService],
})
export class AuctionTableComponent implements OnInit {
  auctions: any[] = []; // Array to hold fetched auction data
  filteredAuctions: any[] = []; // Filtered auctions for display
  searchQuery: string = ''; // Search input binding
  activeFilter: string = 'all'; // Current filter state

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMyAuctions(); // Fetch auctions when component initializes
  }

  fetchMyAuctions(): void {
    this.adminService.getAllAuctions().subscribe({
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

  onSearch(): void {
    this.filteredAuctions = this.auctions.filter((auction) =>
      auction.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  applyFilters(): void {
    // Filter auctions based on active filter and search query
    this.filteredAuctions = this.auctions.filter((auction) => {
      const matchesFilter =
        this.activeFilter === 'all' ||
        auction.status === this.activeFilter;
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

  viewDetails(auction: any): void {
    this.router.navigate([`/auction-detail/${auction._id}`]); // Navigate to the auction details page
  }
}

 