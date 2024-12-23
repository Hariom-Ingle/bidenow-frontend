import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedImports } from '../../shared/shared-imports';

@Component({
  selector: 'app-update-dialog',
  standalone: true,
  imports: [SharedImports],
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.css'],
})
export class UpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Make sure all required fields are filled
    if (this.data.title && this.data.category && this.data.description && this.data.endTime && this.data.startTime) {
      this.dialogRef.close(this.data); // Send data back with updated values
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
