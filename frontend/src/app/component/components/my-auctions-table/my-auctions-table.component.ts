import { Component, OnInit, inject, viewChild} from '@angular/core';
import { AuctionService } from '../../../services/auction-service.service';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { SharedImports } from '../../shared/shared-imports';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { AuctionDialogComponent } from '../auction-dialog/auction-dialog.component';
@Component({
  selector: 'app-my-auctions-table',
  standalone: true,
  imports: [...SharedImports,  MatTableModule, MatMenuModule, HttpClientModule,MatMenuTrigger], // Include necessary imports
  templateUrl: './my-auctions-table.component.html',
  styleUrls: ['./my-auctions-table.component.css'],
  providers: [AuctionService,MatMenuTrigger],
})
export class MyAuctionsTableComponent implements OnInit {
  auctions: any[] = []; // Array to hold fetched auction data
  filteredAuctions: any[] = []; // Filtered auctions for display
  searchQuery: string = ''; // Search input binding
  activeFilter: string = 'all'; // Current filter state

  readonly menuTrigger = inject(MatMenuTrigger);
  readonly dialog = inject(MatDialog);

  constructor(private auctionService: AuctionService, private router: Router) {}

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

  applyFilters(): void {
    // Filter auctions based on active filter and search query
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

  openDialog(action: string, auction: any): void {
    const dialogRef = this.dialog.open(AuctionDialogComponent, {
      data: { action, auction },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'delete') {
        this.deleteAuction(result.id); // Pass auction id to delete method
      } else if (result?.action === 'update') {
        this.updateAuction(result.id, result.data); // Pass auction id and updated data to update method
      }
  
      // Navigate to the page with auction id as a parameter (for example, for editing)
      if (result?.action === 'update' || result?.action === 'delete') {
        this.router.navigate([`/profile/my-auction/${auction.id}`]); // Use auction.id for navigation
      }
    });
  }
  

  deleteAuction(id: string): void {
    this.auctionService.deleteAuction(id).subscribe({
      next: () => this.fetchMyAuctions(), // Refresh the table
      error: (error) => console.error('Failed to delete auction:', error),
    });
  }

  updateAuction(id: string, updatedData: any): void {
    this.auctionService.updateAuction(id, updatedData).subscribe({
      next: () => this.fetchMyAuctions(), // Refresh the table
      error: (error) => console.error('Failed to update auction:', error),
    });
  }
}
export class DialogFromMenuExampleDialog {}