import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Correct module for RouterOutlet
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ScrollingModule } from '@angular/cdk/scrolling'; // Correct module for CdkScrollable
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

export const SharedImports = [
  CommonModule, 
  HttpClientModule,
  RouterModule, // Replaces RouterOutlet
  MatProgressSpinnerModule,
  MatIconModule,
  FormsModule,
  ReactiveFormsModule,
  MatTooltipModule,
  ScrollingModule, // Replaces CdkScrollable
  MatSelectModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
];
