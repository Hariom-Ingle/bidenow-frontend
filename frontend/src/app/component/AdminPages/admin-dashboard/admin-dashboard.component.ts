import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { SharedImports } from '../../shared/shared-imports';
import { UserTableComponent } from '../user-table/user-table.component';
import { AuctionTableComponent } from '../auction-tabel/auction-tabel.component';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [SharedImports, UserTableComponent, AuctionTableComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
 
})
export class AdminDashboardComponent implements AfterViewInit {
  activePanel: string = 'dashboard-panel'; // Default active panel

  constructor() {}

  ngAfterViewInit(): void {
    this.renderPieChart();
    this.renderLineChart();
  }

  showPanel(panel: string): void {
    this.activePanel = panel;
  }

  private renderPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Electronics', 'Furniture', 'Books', 'Art','other'], // Labels to match your example
        datasets: [
          {
            label: 'Product Variety',
            data: [45, 30, 15, 10,20], // Adjusted data percentages
            backgroundColor: ['#4b8af7', '#32f784', '#FF6384', '#FFCD56', '#63fcff'], // Colors to match chart sections
            borderColor: '#ffffff', // Border for better segment separation
            borderWidth: 2, // Visible segment border
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#4A5568', // Neutral dark color
              font: { size: 14 },
              padding: 15, // Space between legend items
            },
          },
          tooltip: {
            backgroundColor: '#333', // Tooltip background
            bodyColor: '#fff', // Tooltip text color
          },
        },
      },
    });
  }
  
  

  private renderLineChart(): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Months or periods in the auction platform
        datasets: [
          {
            label: 'Items Sold',
            data: [120, 150, 180, 200, 250, 300], // Number of items sold each month
            borderColor: '#4C51BF',
            backgroundColor: 'rgba(76, 81, 191, 0.2)',
            tension: 0.4,
            yAxisID: 'y',
            fill: true,
            pointBackgroundColor: '#4C51BF',
            pointBorderWidth: 2,
          },
          {
            label: 'Revenue Generated',
            data: [3000, 4500, 7000, 9500, 12000, 15000,], // Revenue generated for each month
            borderColor: '#48BB78',
            backgroundColor: 'rgba(72, 187, 120, 0.2)',
            tension: 0.4,
            yAxisID: 'y1',
            fill: true,
            pointBackgroundColor: '#48BB78',
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#1e5087',
            },
            grid: {
              color: '#2D3748',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            ticks: {
              color: '#4C51BF',
              stepSize: 50, // Adjusted to suit item sales
              callback: (value) => `${value} items`,
            },
            grid: {
              color: 'rgba(75, 85, 99, 0.1)',
            },
          },
          y1: {
            type: 'linear',
            position: 'right',
            ticks: {
              color: '#48BB78',
              stepSize: 2000, // Adjusted to suit revenue
              callback: (value) => `$${value}`,
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#e6cd6c',
              font: { size: 14 },
            },
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label || '';
                const value = context.raw;
                if (label === 'Revenue Generated') return `Revenue: $${value}`;
                if (label === 'Items Sold') return `Items Sold: ${value}`;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  }
  
}
