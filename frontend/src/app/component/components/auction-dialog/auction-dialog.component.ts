import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedImports } from '../../shared/shared-imports';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

interface AuctionDialogData {
  action: 'delete' | 'update';
  auction?: {
    id: string;
    title: string;
    category: string;
    startingBid: number;
  };
}

@Component({
  selector: 'app-auction-dialog',
  imports: [SharedImports, MatDialogModule, MatButtonModule],
  standalone: true,
  template: `
    <h2 mat-dialog-title>{{ data.action === 'delete' ? 'Confirm Delete' : 'Update Auction' }}</h2>
    <mat-dialog-content>
      <ng-container *ngIf="data.action === 'delete'">
        <p>Are you sure you want to delete this auction?</p>
      </ng-container>
      <ng-container *ngIf="data.action === 'update'">
        <form [formGroup]="updateForm">
          <mat-form-field class="w-full">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" />
          </mat-form-field>
          <mat-form-field class="w-full">
            <mat-label>Category</mat-label>
            <input matInput formControlName="category" />
          </mat-form-field>
          <mat-form-field class="w-full">
            <mat-label>Starting Bid</mat-label>
            <input matInput formControlName="startingBid" type="number" />
          </mat-form-field>
        </form>
      </ng-container>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-button *ngIf="data.action === 'delete'" color="warn" (click)="onDelete()">Delete</button>
      <button mat-button *ngIf="data.action === 'update'" color="primary" (click)="onUpdate()">Update</button>
    </mat-dialog-actions>
  `,
})
export class AuctionDialogComponent implements OnInit {
  updateForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AuctionDialogData,
    private dialogRef: MatDialogRef<AuctionDialogComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: [this.data.auction?.title || '', Validators.required],
      category: [this.data.auction?.category || '', Validators.required],
      startingBid: [this.data.auction?.startingBid || '', [Validators.required, Validators.min(1)]],
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    if (this.data.auction?.id) {
      this.dialogRef.close({ action: 'delete', id: this.data.auction.id });
    } else {
      console.error('Auction ID is undefined, cannot delete.');
    }
  }

  onUpdate() {
    if (this.data.auction?.id) {
      const updatedData = this.updateForm.value;
      this.dialogRef.close({ action: 'update', id: this.data.auction.id, data: updatedData });
    } else {
      console.error('Auction ID is undefined, cannot update.');
    }
  }
}

