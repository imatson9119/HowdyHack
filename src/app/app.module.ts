import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FullCalendarModule } from "@fullcalendar/angular"; // for FullCalendar!
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { LoginComponent } from "./login/login.component";
import { AboutComponent } from "./about/about.component";
import { PageHeadComponent } from "./page-head/page-head.component";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    AboutComponent,
    PageHeadComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
