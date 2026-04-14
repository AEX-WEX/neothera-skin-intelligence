/**
 * Date Formatting Utilities
 * Consistent date and time formatting across the application
 */

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateFull(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export function getDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

export function getDayNum(date: Date): number {
  return date.getDate();
}

export function getMonthName(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short' });
}

export function parseDate(dateString: string): Date {
  return new Date(dateString);
}

export function getDateDifference(date1: Date, date2: Date): number {
  return Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));
}

export function isConsecutiveDay(date1: Date, date2: Date): boolean {
  return getDateDifference(date1, date2) === 1;
}
