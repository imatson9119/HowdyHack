import { Component, OnInit, Inject } from '@angular/core';
import listPlugin from '@fullcalendar/list'
import { CalendarService } from '../calendar.service'
import { FoodEvent } from './FoodEvent';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { buildings } from '../MockMapExtensions'
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface Data {
    title : string;
    location : string;
    description : string;
    organization : string;
    doLink : boolean;
    mapLink : string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [listPlugin]; // important!
  public events : FoodEvent[];
  public calendarObjects: Object[] = [];
  public doLink : boolean;

  constructor(private calendarService : CalendarService, public dialog : MatDialog) { }

  ngOnInit() {
    this.calendarService.getEvents().subscribe(events => this.events = events);
    console.log("Events Length", this.events.length);
    this.calendarObjects = [];
    this.calendarService.getCalendarEvents().subscribe(events => this.calendarObjects = events);
  }

  

  openDialog(arg): void {
    let event = {eventName:"", location:"",description:"",organization:""};
    for (let i = 0; i < this.events.length; i++) {
      let verificationString = this.events[i].location + " - " + this.events[i].eventName;
      let selectedString = arg.event._def.title;
      if(selectedString == verificationString) {
        event = this.events[i];
        console.log("EVENT FOUND");
      }
    }

    this.doLink = false;
    let mapLink = "https://aggiemap.tamu.edu/map/d?ref=HungryAgs&BldgAbbrv=";
    for (let i = 0; i < buildings.length; i++) {
      if(event.location.indexOf(buildings[i]) != -1) {
        this.doLink = true;
        mapLink += buildings[i];
        console.log(buildings[i]);
      }
    }

    const dialogRef = this.dialog.open(EventDialog, {
      width: '400px',
      data: {title:event.eventName,
        location:event.location, 
        description:event.description,
        organization:event.organization,
        doLink:this.doLink,
        mapLink:mapLink}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'eventDialog.html',
  styleUrls:['eventDialog.scss']
})
export class EventDialog {

  constructor(
    public dialogRef: MatDialogRef<EventDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private _snackBar: MatSnackBar) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  reportClick() {
    this._snackBar.open('Your report has been received.', 'Okay', {
      duration: 3000
    });
  }

  showMap() : boolean {
    if(this.data.doLink) return true;
    return false;
  }

}
