import { Component, OnInit,  Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MessageDTO } from 'app/models/message.dto';

export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages.component.html',
})
export class MessagesDialogComponent {
  constructor(public dialogRef: MatDialogRef<MessagesDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
     onNoClick(): void {
      this.dialogRef.close();
    }
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {

  title: string;
  content: string;

  constructor(public dialog: MatDialog) {

  }

  setTitle(msg: string) {
    this.title = msg;
  }

  setAddContent(msg: string) {
    this.content = msg;
  }
  openDialog() {
    const dialogRef = this.dialog.open(MessagesDialogComponent, {
      data: {title: this.title, content: this.content}});
  }
}

