import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedImports } from '../../shared/shared-imports';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [...SharedImports],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  providers: [AdminService]
})
export class UserTableComponent implements OnInit {
  users: Array<any> = []; // Initialize an empty array for users

  constructor(private userService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Method to fetch user data
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (response: any) => {
        // Assuming the response contains a `data` field with the array of users
        if (Array.isArray(response.data)) {
          this.users = response.data; // Assign the fetched array to users
        } else {
          console.error('Response is not in the expected format:', response);
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Method to navigate to user details page
  viewUserDetails(userId: string): void {
    this.router.navigate([`/user-details/${userId}`]);
  }
}
