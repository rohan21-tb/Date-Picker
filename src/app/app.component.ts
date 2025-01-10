import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentDate: Date = new Date(); 
  weekDaysArray: string[] =AppConstants.weekDaysArray; 
  days: { day: number, currentMonth: boolean }[] = [];

  ngOnInit(): void {
    this.generateDays();
  }

  // Method to change the month
  onMonthChange(value: number): void {
    const currentMonth = this.currentDate.getMonth();
    this.currentDate = new Date(this.currentDate.getFullYear(), currentMonth + value, 1);
    this.generateDays();  
  }

  // Method to change the year
  onYearChange(value: number): void {
    const currentYear = this.currentDate.getFullYear();
    this.currentDate = new Date(currentYear + value, this.currentDate.getMonth(), 1);
    this.generateDays();
  }

  // Method to handle day selection
  onDateSelection(day: number): void {
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();

    this.currentDate = new Date(currentYear, currentMonth, day); // Update current date object
    this.currentDate.setDate(day);
  }

  // Method to generate days of the current month
  generateDays() {
    this.days = [];
    const totalDays = AppConstants.totalDays; // Calulate total number of days to display

    // Get the required value based on the current date
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    // Find the starting point of the month
    const firstDayIndex = firstDayOfMonth.getDay(); 
  
    // Find last month data for display
    const previousMonthDaysCount = firstDayIndex; // Number of days form the previous months to display
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    
    // First add the previous month's data
    for (let i = previousMonthDaysCount; i > 0; i--) {
      this.days.push({ day: previousMonthLastDay - i + 1, currentMonth: false });
    }
  
    // Add current month's data
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      this.days.push({ day: i, currentMonth: true });
    }
  
    // Add next month's data
    const nextMonthDaysCount = totalDays - this.days.length;
    for (let i = 1; i <= nextMonthDaysCount; i++) {
      this.days.push({ day: i, currentMonth: false });
    }
  }
}
