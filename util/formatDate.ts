 export default function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short", // or "long"
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,   // false for 24-hour
    });
  }
  