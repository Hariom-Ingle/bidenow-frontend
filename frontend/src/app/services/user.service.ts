import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: any = null; // Holds user details

  constructor() {}

  /**
   * Sets the logged-in user data.
   * @param userData - The data of the logged-in user.
   */
  setUser(userData: any): void {
    this.user = userData;
    localStorage.setItem('user', JSON.stringify(userData)); // Persist state
    console.log('Setting user data:', userData);

  }

  /**
   * Retrieves the logged-in user data.
   * @returns - The user data if logged in; otherwise, null.
   */
  getUser(): any {
    if (!this.user) {
      const storedUser = localStorage.getItem('user');
      this.user = storedUser ? JSON.parse(storedUser) : null;
      console.log(localStorage.getItem('user'));
      

    }
    return this.user;
  }

  /**
   * Checks if a user is logged in.
   * @returns - True if a user is logged in, otherwise false.
   */
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  /**
   * Clears the user data, logging the user out.
   */
  logout(): void {
    this.user = null;
    localStorage.removeItem('user'); // Clear persisted state
  }
}
