import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,RouterLink,MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  title = 'BidNow';
  isLoggedIn = true; // Mocked login state
  isMenuOpen = false;
  isProfilePanelOpen = false;

  userProfileImage = 'assets/userprofile.jpg'; // Default profile image path

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProfilePanel() {
    this.isProfilePanelOpen = !this.isProfilePanelOpen;
  }

  logout() {
    // Add logout logic here
    this.isLoggedIn = false;
    this.toggleProfilePanel();
  }
}
