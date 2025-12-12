export function useDate() {
     function formatDate(timestamp: string | Date) {
          const date = new Date(timestamp);
          return new Intl.DateTimeFormat('en-US', {
               year: 'numeric',
               month: 'short',
               day: '2-digit',
               hour: '2-digit',
               minute: '2-digit',
               hour12: false,
          }).format(date);
     }

     return { formatDate };
}
