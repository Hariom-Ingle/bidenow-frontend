import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../services/admin.service';
import { SharedImports } from '../../shared/shared-imports';
@Component({
  standalone: true,
  selector: 'app-user-details',
  imports: [SharedImports],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [AdminService]
})
export class UserDetailsComponent implements OnInit {
  userId: string = ''; // To hold the user ID from the URL
  user: any = {}; // To hold the user data

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    // Get the userId from the route parameters
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Get the 'id' parameter from the URL
      this.fetchUserDetails(); // Fetch the user details once the ID is available
    });
  }

  // Method to fetch the user details
  fetchUserDetails(): void {
    this.adminService.getUserById(this.userId).subscribe(
      (response) => {
        if (response.success) {
          this.user = response.data; // Assign user data to the component variable
        } else {
          console.error('User not found');
        }
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
