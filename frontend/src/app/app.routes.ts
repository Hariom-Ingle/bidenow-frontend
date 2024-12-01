import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/pages/home/home.component';
import { LoginComponent } from './component/pages/login/login.component';
import { RegisterComponent } from './component/pages/register/register.component';
import { ForgotPasswordComponent } from './component/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/pages/reset-password/reset-password.component';
import { VerifyEmailComponent } from './component/pages/verify-email/verify-email.component';
import { AuctionsPageComponent } from './component/pages/auctions-page/auctions-page.component';
import { LeaderboardComponent } from './component/components/leaderboard/leaderboard.component';
import { CreateAuctionComponent } from './component/pages/create-auction/create-auction.component';
import { AboutUsComponent } from './component/pages/about-us/about-us.component';
import { ContactUsComponent } from './component/pages/contact-us/contact-us.component';
import { UserServiceService } from './services/user-service.service';
import { AuctionDetailsComponent } from './component/pages/auction-details/auction-details.component';
import { AuctioneerProfileComponent } from './component/pages/auctioneer-profile/auctioneer-profile.component';
import { MyAuctionsTableComponent } from './component/components/my-auctions-table/my-auctions-table.component';
export const routes: Routes = [
  // Auth Paths
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent }, // Reset Password Route
  { path: 'verify-email', component: VerifyEmailComponent },

  
  { path: 'profile', component: AuctioneerProfileComponent },
 
  {
    path: 'profile/my-auction/:id',  // Add the `id` parameter in the URL
    component: MyAuctionsTableComponent,
  },
  { path: 'auctions', component: AuctionsPageComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'createauction', component: CreateAuctionComponent },
  { path: 'auction-details/:id', component: AuctionDetailsComponent },



  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  
  // { path: '**', redirectTo: '', pathMatch: 'full' }, // Fallback route


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
})
export class AppRoutingModule {}
