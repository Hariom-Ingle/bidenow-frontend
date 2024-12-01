import { Component } from '@angular/core';
import { SharedImports } from '../../shared/shared-imports';
export interface PeriodicElement {
  profileNo: number;
  name: string;
  bid: number;
  expenditure: number;
  winner: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { profileNo: 1, name: 'Alice Johnson', bid: 5000, expenditure: 45000, winner: true },
  { profileNo: 2, name: 'Bob Smith', bid: 4500, expenditure: 38000, winner: false },
  { profileNo: 3, name: 'Charlie Davis', bid: 4700, expenditure: 40000, winner: false },
  { profileNo: 4, name: 'Diana Cooper', bid: 5100, expenditure: 47000, winner: true },
  { profileNo: 5, name: 'Ethan Carter', bid: 4900, expenditure: 42000, winner: false },
  { profileNo: 6, name: 'Fiona Bell', bid: 4600, expenditure: 39000, winner: false },
  { profileNo: 7, name: 'George Hill', bid: 4800, expenditure: 41000, winner: true },
  { profileNo: 8, name: 'Hannah Brown', bid: 5200, expenditure: 49000, winner: true },
  { profileNo: 9, name: 'Ian Wright', bid: 4400, expenditure: 37000, winner: false },
  { profileNo: 10, name: 'Jane Evans', bid: 5300, expenditure: 50000, winner: true },
];

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [...SharedImports    ],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  displayedColumns: string[] = ['profileNo', 'name', 'bid', 'expenditure','winner'];
  dataSource = ELEMENT_DATA;
}
