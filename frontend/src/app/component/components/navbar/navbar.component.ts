import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service.service';
import { UserServiceService } from '../../../services/user-service.service';
import { SharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-navbar',
  standalone: true,
  providers: [AuthServiceService, ],
  imports: [...SharedImports, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  title = 'BidNow';
  isLoggedIn = false;
  isMobileMenuOpen = false;
  isProfilePanelOpen = false;
  user :String ='';
  userProfileImage: string = '';
  userRole: string = '';

  constructor(
    private authService: AuthServiceService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.listenToUserState();
    this.userService.initializeUserFromLocalStorage(); 
  }

  // Listen to user state changes in real-time
  private listenToUserState(): void {
    this.userService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userRole = user.role;
        this.userProfileImage = user.profileImage || ''; 
        console.log(this.userRole);

         
      } else {
        this.resetUserState();
      }
    });
  }

  // Reset local user-related states
  private resetUserState(): void {
    this.isLoggedIn = false;
    this.userRole = '';
    this.userProfileImage = '';
     
  }

  // Handle logout
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.userService.clearUser(); // Update user state globally
      this.isProfilePanelOpen = false; // Close profile panel on logout
    });
  }

  // Toggle the menu for mobile responsiveness
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfilePanel() {
    this.isProfilePanelOpen = !this.isProfilePanelOpen;
  }
}
