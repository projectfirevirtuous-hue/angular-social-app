import { Component, Input, Output, EventEmitter, signal, computed, inject } from '@angular/core';
import { ChangeDetectionService } from '../services/change-detection.service';

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

@Component({
  selector: 'app-date-range-picker',
  standalone: false,
  template: `
    <div class="date-range-picker">
      <div class="date-inputs">
        <div class="date-input-group">
          <label>Start Date</label>
          <input 
            type="date" 
            [value]="formatDate(selectedRange().startDate)"
            (change)="onStartDateChange($event)"
            class="date-input"
          />
        </div>
        
        <div class="date-input-group">
          <label>End Date</label>
          <input 
            type="date" 
            [value]="formatDate(selectedRange().endDate)"
            (change)="onEndDateChange($event)"
            class="date-input"
            [min]="formatDate(selectedRange().startDate)"
          />
        </div>
      </div>
      
      <div class="quick-select">
        <button 
          *ngFor="let preset of presets" 
          (click)="selectPreset(preset)"
          class="preset-button"
          [class.active]="isPresetActive(preset)"
        >
          {{preset.label}}
        </button>
      </div>
      
      <div class="calendar-container" *ngIf="showCalendar()">
        <div class="calendar">
          <div class="calendar-header">
            <button (click)="previousMonth()" class="nav-button">&lt;</button>
            <span class="month-year">{{currentMonthYear()}}</span>
            <button (click)="nextMonth()" class="nav-button">&gt;</button>
          </div>
          
          <div class="calendar-grid">
            <div class="day-header" *ngFor="let day of dayHeaders">{{day}}</div>
            <button 
              *ngFor="let day of calendarDays()" 
              (click)="selectDate(day.date)"
              class="day-button"
              [class.other-month]="day.otherMonth"
              [class.selected]="isDateSelected(day.date)"
              [class.in-range]="isDateInRange(day.date)"
              [class.range-start]="isRangeStart(day.date)"
              [class.range-end]="isRangeEnd(day.date)"
              [disabled]="day.otherMonth"
            >
              {{day.day}}
            </button>
          </div>
        </div>
      </div>
      
      <div class="actions">
        <button (click)="clearSelection()" class="clear-button">Clear</button>
        <button (click)="toggleCalendar()" class="toggle-button">
          {{showCalendar() ? 'Hide Calendar' : 'Show Calendar'}}
        </button>
      </div>
    </div>
  `,
  styleUrl: './date-range-picker.component.css'
})
export class DateRangePickerComponent {
  @Input() initialRange: DateRange = { startDate: null, endDate: null };
  @Output() rangeChange = new EventEmitter<DateRange>();
  
  private readonly changeDetection = inject(ChangeDetectionService);
  
  protected readonly selectedRange = signal<DateRange>(this.initialRange);
  protected readonly currentDate = signal(new Date());
  protected readonly showCalendar = signal(false);
  
  protected readonly dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  protected readonly presets = [
    { label: 'Today', days: 0 },
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 }
  ];
  
  protected readonly currentMonthYear = computed(() => {
    const date = this.currentDate();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });
  
  protected readonly calendarDays = computed(() => {
    const current = this.currentDate();
    const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
    const lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    const currentIterDate = new Date(startDate);
    while (currentIterDate <= endDate) {
      days.push({
        date: new Date(currentIterDate),
        day: currentIterDate.getDate(),
        otherMonth: currentIterDate.getMonth() !== current.getMonth()
      });
      currentIterDate.setDate(currentIterDate.getDate() + 1);
    }
    
    return days;
  });

  ngOnInit(): void {
    this.selectedRange.set(this.initialRange);
  }

  protected formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  }

  protected onStartDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const date = target.value ? new Date(target.value) : null;
    this.updateRange({ ...this.selectedRange(), startDate: date });
  }

  protected onEndDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const date = target.value ? new Date(target.value) : null;
    this.updateRange({ ...this.selectedRange(), endDate: date });
  }

  protected selectPreset(preset: { label: string; days: number }): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - preset.days);
    this.updateRange({ startDate, endDate });
  }

  protected isPresetActive(preset: { label: string; days: number }): boolean {
    const range = this.selectedRange();
    if (!range.startDate || !range.endDate) return false;
    
    const today = new Date();
    const presetStart = new Date();
    presetStart.setDate(today.getDate() - preset.days);
    
    return this.isSameDay(range.startDate, presetStart) && 
           this.isSameDay(range.endDate, today);
  }

  protected selectDate(date: Date): void {
    const range = this.selectedRange();
    
    if (!range.startDate || (range.startDate && range.endDate)) {
      this.updateRange({ startDate: date, endDate: null });
    } else if (date >= range.startDate) {
      this.updateRange({ ...range, endDate: date });
    } else {
      this.updateRange({ startDate: date, endDate: range.startDate });
    }
  }

  protected isDateSelected(date: Date): boolean {
    const range = this.selectedRange();
    return (range.startDate && this.isSameDay(date, range.startDate)) ||
           (range.endDate && this.isSameDay(date, range.endDate)) ||
           false;
  }

  protected isDateInRange(date: Date): boolean {
    const range = this.selectedRange();
    if (!range.startDate || !range.endDate) return false;
    return date > range.startDate && date < range.endDate;
  }

  protected isRangeStart(date: Date): boolean {
    const range = this.selectedRange();
    return range.startDate ? this.isSameDay(date, range.startDate) : false;
  }

  protected isRangeEnd(date: Date): boolean {
    const range = this.selectedRange();
    return range.endDate ? this.isSameDay(date, range.endDate) : false;
  }

  protected previousMonth(): void {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    this.changeDetection.scheduleChangeDetection();
  }

  protected nextMonth(): void {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    this.changeDetection.scheduleChangeDetection();
  }

  protected toggleCalendar(): void {
    this.showCalendar.update(show => !show);
    this.changeDetection.scheduleChangeDetection();
  }

  protected clearSelection(): void {
    this.updateRange({ startDate: null, endDate: null });
  }

  private updateRange(range: DateRange): void {
    this.selectedRange.set(range);
    this.rangeChange.emit(range);
    this.changeDetection.scheduleChangeDetection();
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }
}