# BidNow - Real Time Auction Experience

# **Overview**:
BidNow is a platform designed to deliver a seamless and real-time auction experience for users. The first milestone focuses on building a robust authentication system, including user login, registration, password management, and an organized repository setup.

## Milestone 1: User Authentication  
## Features:
1. **Registration:** User sign-up with validations.
5. **Verify Email:** Secure email verification.
2. **Login:** Secure login system.
4. **Forgot Password:** Forgot password functionality.
3. **Logout:** User logout functionality.
4. **Reset Password:** Password reset using email or OTP.
6. **Repo Design:** Create a visually appealing and organized repository.
---

## Milestone 2: Auction Listings and Bidding

## Features:

1.  **Auction Listings:** Create, Read, Update, and Delete auction listings.

2.  **Bidding Actions:** Place bids and fetch bid history with validation.

3. **Database Schema Extension:** Store auction details and bid histories.

4. **Dynamic Forms for Auction Creation:** Allow users to create auctions with media uploads.

5. **Real-Time Bidding:** Live updates and interactive bid features.

6. **Countdown Timers:** Display real-time countdown timers for auctions.

---



## Commands to Handle the Project:

```bash
# 1. Create and Initialize the Repository
mkdir BidNow
cd BidNow
git init

# 2. Clone the Repository
git clone https://github.com/YourUsername/BidNow.git
cd BidNow

# 3. Install Dependencies
npm install

# 4. Run the Project Locally
npm run dev

# 5. Create Initial Commit
git add .
git commit -m "Initial setup with authentication features"

# 6. Push Changes to GitHub
git branch -M main
git remote add origin https://github.com/YourUsername/BidNow.git
git push -u origin main

```
---
## Description of Repo Setup
- **src/:** Contains all source code files, including authentication logic.
- **public/:** Static files such as images, styles, and client-side scripts.
- **.env:** Environment variables for sensitive data like database URIs and JWT secrets.
- **README.md:** Documentation for setting up and using the project.

This structure ensures ease of development and a clear focus on the features outlined in the milestone.

<!-- # Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page. -->
