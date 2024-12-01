import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; 
// import { UserService } from '../../../services/user.service';
import { ExploreCategoryComponent } from "../../components/explore-category/explore-category.component";
import { FooterComponent } from "../../components/footer/footer.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ExploreCategoryComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('auctionListings') auctionListings!: ElementRef;

  scrollToSection(): void {
    this.auctionListings.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  isActive: boolean = true;


  timeLeft: number = 2 * 60 * 60 + 45 * 60 + 30; // 2 hours, 45 minutes, 30 seconds in seconds
  displayTime: string = '';
  private timerInterval: any;

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval); // Clear interval on component destroy to prevent memory leaks
  }

  startTimer() {
    this.updateDisplayTime(); // Initial display update

    this.timerInterval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateDisplayTime();
      } else {
        clearInterval(this.timerInterval); // Stop the timer when it reaches zero
      }
    }, 1000);
  }

  updateDisplayTime() {
    const hours = Math.floor(this.timeLeft / 3600);
    const minutes = Math.floor((this.timeLeft % 3600) / 60);
    const seconds = this.timeLeft % 60;
    
    this.displayTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

 
 
}
