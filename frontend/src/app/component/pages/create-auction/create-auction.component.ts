import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuctionService } from '../../../services/auction-service.service';
import { SharedImports } from '../../shared/shared-imports';
@Component({
  selector: 'app-create-auction',
  standalone: true,
  imports: [...SharedImports],
  providers: [AuctionService],
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css'],
})
export class CreateAuctionComponent {
  auctionData = {
    title: '',
    category: 'electronics',
    description: '',
    startingBid: '',
    startTime: '',
    endTime: '',
  };

  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  errorMessage: string | null = null;
  loading = false; // Loading state

  constructor(private router: Router, private auctionService: AuctionService) {}

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files[0]) {
      this.image = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
      };

      reader.readAsDataURL(this.image);
    }
  }

  onSubmit(): void {
    if (
      this.auctionData.title &&
      this.auctionData.category &&
      this.auctionData.description &&
      this.auctionData.startingBid &&
      this.auctionData.startTime &&
      this.auctionData.endTime &&
      this.image
    ) {
      this.loading = true; // Start loading
      const formData = new FormData();
      formData.append('title', this.auctionData.title);
      formData.append('category', this.auctionData.category);
      formData.append('description', this.auctionData.description);
      formData.append('startingBid', this.auctionData.startingBid);
      formData.append('startTime', this.auctionData.startTime);
      formData.append('endTime', this.auctionData.endTime);
      formData.append('image', this.image);

      this.auctionService.createAuction(formData).subscribe({
        next: (response) => {
          console.log('Auction created:', response);
          this.router.navigate(['/auctions']);
        },
        error: (error) => {
          console.error('Auction Creation error:', error);
          this.errorMessage =
            error?.error?.message || 'Auction creation failed.';
      this.loading = false; // Start loading

        },
        complete: () => {
          this.loading = false; // Stop loading
        },
      });
    } else {
      this.errorMessage = 'All fields are required, including the image.';
      this.loading = false; // Start loading

    }
  }
}
