import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calendar';
  date: Date = new Date();
  month: number = this.date.getMonth();
  year: number = this.date.getFullYear();
}
