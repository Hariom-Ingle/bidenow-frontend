import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SharedImports } from '../../shared/shared-imports';
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [SharedImports],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
