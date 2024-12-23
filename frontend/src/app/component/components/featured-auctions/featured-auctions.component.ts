import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { SharedImports } from '../../shared/shared-imports';
 import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-featured-auctions',
  standalone: true,
  imports: [...SharedImports, RouterLink],
  templateUrl: './featured-auctions.component.html',
  styleUrl: './featured-auctions.component.css',
  providers:[AdminService]
})
export class FeaturedAuctionsComponent {
  featuredAuctions: any[] = [];
  loading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchFeaturedAuctions();
  }

  fetchFeaturedAuctions(): void {
    this.adminService.getFeaturedAuctions().subscribe(
      (response) => {
        this.featuredAuctions = [...response.featuredItems, ...response.featuredItems];
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching featured auctions:', error);
        this.loading = false;
      }
    );
  }
  
}
