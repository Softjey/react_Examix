export default function prettifyDate(ISODate: string): string {
  const date = new Date(ISODate);
  const now = new Date();

  if (Number.isNaN(date.getTime())) {
    throw new Error('Invalid date string provided');
  }

  const isToday = date.toDateString() === now.toDateString();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  };

  if (isToday) {
    return date.toLocaleTimeString(undefined, timeOptions);
  }

  return date.toLocaleDateString(undefined, dateOptions);
}
