import { Component,OnInit } from '@angular/core';
import { SharedImports } from '../../shared/shared-imports';
import { MyAuctionsTableComponent } from '../../components/my-auctions-table/my-auctions-table.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router'; // Import Router
import { UserServiceService } from '../../../services/user-service.service';
@Component({
  selector: 'app-auctioneer-profile',
  standalone: true,
  imports: [...SharedImports, MyAuctionsTableComponent, HttpClientModule],
  templateUrl: './auctioneer-profile.component.html',
  styleUrls: ['./auctioneer-profile.component.css'],
  providers: [UserServiceService]
})
export class AuctioneerProfileComponent {
  activePanel: string = 'myauction-items-panel'; // Default active panel

  userName: string = '';
  email: string = '';
  role:string = '';
  img: string = '';
  isLoggedIn = false;
  private userStateSubscription: any;
  constructor(     private userService: UserServiceService,
  private router: Router,) {} // Inject Router

  ngOnInit() {
    // Extract 'id' from the route
    this.listenToUserState();
    this.userService.initializeUserFromLocalStorage();
    

    
  }
  private listenToUserState(): void {
    this.userStateSubscription = this.userService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userName = user.username || '';
        this.email = user.email || '';
        this.role = user.role || '';
        this.img = user.profileImage || '';
        console.log(this.img);
      
      }  
    });
  }
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
