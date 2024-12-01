import { Component } from '@angular/core';
import { SharedImports } from '../../shared/shared-imports';
import { MyAuctionsTableComponent } from '../../components/my-auctions-table/my-auctions-table.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-auctioneer-profile',
  standalone: true,
  imports: [...SharedImports, MyAuctionsTableComponent, HttpClientModule],
  templateUrl: './auctioneer-profile.component.html',
  styleUrls: ['./auctioneer-profile.component.css'],
})
export class AuctioneerProfileComponent {
  activePanel: string = 'profile-panel'; // Default active panel

  constructor(private router: Router) {} // Inject Router

  // Method to update the active panel and change the URL
  showPanel(panel: string): void {
    this.activePanel = panel;

    // Update URL based on the active panel
    if (panel === 'profile-panel') {
      this.router.navigate(['/profile']);
    } else if (panel === 'myauction-items-panel') {
      this.router.navigate(['/profile/my-auction']);
    } else if (panel === 'bidding-history-panel') {
      this.router.navigate(['/profile/bidding-history']);
    } else if (panel === 'account-settings-panel') {
      this.router.navigate(['/profile/account-settings']);
    }
  }
}
