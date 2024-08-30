type TFormatDate = {
  date: Date | null | undefined;
  type: 'start' | 'end';
};

export const formatDate = ({ date, type }: TFormatDate): string => {
  if (!date) return '';
  const dateTime = type === 'start' ? date : new Date(date.getTime() - 100);
  return Intl.DateTimeFormat('vi-VI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(dateTime);
};
