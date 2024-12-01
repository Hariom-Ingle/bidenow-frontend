import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

export const SharedImports = [
  RouterOutlet,
  CommonModule,MatCardModule,
  FormsModule,MatProgressSpinnerModule, HttpClientModule,MatIconModule,MatButtonModule,MatSelectModule,CdkScrollable,MatFormFieldModule, ReactiveFormsModule,MatTooltipModule, 
   
  
];
 