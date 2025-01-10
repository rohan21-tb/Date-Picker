import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppConstants{
    public static readonly weekDaysArray: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    public static readonly totalDays: number = 42;
}