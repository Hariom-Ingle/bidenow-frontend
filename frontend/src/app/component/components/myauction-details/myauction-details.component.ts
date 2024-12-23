import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,RouterLink,Router   } from '@angular/router';
import { AuctionService } from '../../../services/auction-service.service';
import { SharedImports } from '../../shared/shared-imports';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserServiceService } from '../../../services/user-service.service';
@Component({
  selector: 'app-myauction-details',
  standalone: true,
  imports: [SharedImports,  ],
  templateUrl: './myauction-details.component.html',
  styleUrl: './myauction-details.component.css',
  providers: [AuctionService,UserServiceService]
})
export class MyauctionDetailsComponent implements OnInit {
  auctionItem: any = null; // Store auction details
  countdown: string = ''; // Display the countdown
  live: boolean = false; // Indicates if the auction is live
  ended: boolean = false; // Indicates if the auction has ended
  intervalId: any; // Timer cleanup
  amount: number = 0; // User's bid
  auctionId!: string; // Auction ID from the route
  userid: string = ''; 
  isLoggedIn = false;
  private userStateSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private auctionService: AuctionService,
    private dialog: MatDialog,
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.listenToUserState();
    this.userService.initializeUserFromLocalStorage();
    this.auctionId = this.route.snapshot.paramMap.get('id') || '';
    if (!this.auctionId) {
      console.error('No auction ID found in route.');
      alert('Invalid auction item.');
      return;
    }

    this.fetchAuctionDetails(this.auctionId);
  }

  private listenToUserState(): void {
    this.userStateSubscription = this.userService.user$.subscribe((user) => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userid = user.userId || '';
      }
    });
  }

  fetchAuctionDetails(itemId: string) {
    this.auctionService.getItemById(itemId).subscribe(
      (response: any) => {
        this.auctionItem = response.auctionItem || null;
        console.log('Auction details:', this.auctionItem);
        if (this.auctionItem) {
          this.checkAuctionStatus(
            this.auctionItem.startTime,
            this.auctionItem.endTime
          );
          
          this.auctionService.incrementViewCount(itemId).subscribe(
            (res) => {
              console.log('View count incremented');
            },
            (error) => {
              console.error('Error incrementing view count:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error fetching auction details:', error);
        this.auctionItem = null; // Reset on error
      }
    );
  }

  checkAuctionStatus(startTime: string, endTime: string) {
    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();
    const now = new Date().getTime();

    if (now >= start && now < end) {
      this.live = true;
      this.ended = false;
      this.startCountdown(end);
    } else {
      this.live = false;
      this.ended = now >= end;
      this.countdown =
        now < start
          ? `Auction starts in: ${this.formatTime(start - now)}`
          : 'Auction ended';
    }
  }

  startCountdown(endTime: number) {
    this.intervalId = setInterval(() => {
      const now = new Date().getTime();
      if (now < endTime) {
        this.countdown = `Time remaining: ${this.formatTime(endTime - now)}`;
      } else {
        this.countdown = 'Auction ended';
        this.live = false;
        this.ended = true;
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  openUpdateDialog() {
    const dialogRef = this.dialog.open(UpdateDialogComponent, {
      width: '600px',
      data: { ...this.auctionItem },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      if (updatedData) {
        const userId = this.userid;

        this.auctionService.updateAuction(this.auctionId, updatedData, userId).subscribe(
          (res) => {
            console.log('Auction updated successfully:', res);
            this.fetchAuctionDetails(this.auctionId);
          },
          (error) => {
            console.error('Error updating auction:', error);
          }
        );
      }
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        const userId = this.userid;

        this.auctionService.deleteAuction(this.auctionId, userId).subscribe(
          (res) => {
            console.log('Auction deleted successfully');
            this.router.navigate(['/auctions']); // Redirect after deletion
          },
          (error) => {
            console.error('Error deleting auction:', error);
          }
        );
      }
    });
  }
}

