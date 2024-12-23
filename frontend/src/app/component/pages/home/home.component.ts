import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../services/user-service.service';
import { SharedImports } from '../../shared/shared-imports';
import { FeaturedAuctionsComponent } from "../../components/featured-auctions/featured-auctions.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ExploreCategoryComponent } from "../../components/explore-category/explore-category.component";
import { TrendingAuctionComponent } from "../../components/trending-auction/trending-auction.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedImports, CommonModule, RouterLink, FeaturedAuctionsComponent, FooterComponent, ExploreCategoryComponent, TrendingAuctionComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserServiceService],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('auctionListings') auctionListings!: ElementRef;

  isLoggedIn = false;
  user: string = '';
  userProfileImage: string = '';
  userRole: string = '';
  private userStateSubscription: any;

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit(): void {
    this.listenToUserState();
    this.userService.initializeUserFromLocalStorage();
    this.animateSteps();
  }

  ngOnDestroy(): void {
    if (this.userStateSubscription) {
      this.userStateSubscription.unsubscribe(); // Prevent memory leaks
    }
  }

  // Listen to user state changes in real-time
  private listenToUserState(): void {
    this.userStateSubscription = this.userService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.user = user.username.split(' ')[0]  || '';
        this.userProfileImage = user.profileImage || '';
        this.userRole = user.role || '';
      } else {
        this.resetUserState();
      }
    });
  }

  // Reset local user-related states
  private resetUserState(): void {
    this.isLoggedIn = false;
    this.user = '';
    this.userProfileImage = '';
    this.userRole = '';
  }

  // Navigate to login page
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  currentStep: number = 1; // Start with Step 1

 

  animateSteps() {
    const totalSteps = 4; // Total number of steps
    setInterval(() => {
      // Remove active class from all steps and arrows
      for (let i = 1; i <= totalSteps; i++) {
        const logo = document.getElementById(`step-${i}`)?.querySelector('.logo');
        const arrow = document.getElementById(`arrow-${i}`);
        logo?.classList.remove('active');
        arrow?.classList.remove('active');
      }

      // Highlight the current step and arrow
      const currentLogo = document.getElementById(`step-${this.currentStep}`)?.querySelector('.logo');
      const currentArrow = document.getElementById(`arrow-${this.currentStep}`);
      currentLogo?.classList.add('active');
      currentArrow?.classList.add('active');

      // Increment step or loop back to the first step
      this.currentStep = this.currentStep < totalSteps ? this.currentStep + 1 : 1;
    }, 2000); // Change step every 2 seconds
  }
}
