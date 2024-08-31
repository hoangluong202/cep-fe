import { EllipsisVertical } from 'lucide-react';

export const EditIcon = () => (
  <svg focusable='false' width='20' height='20' viewBox='0 0 24 24' className=' NMm5M'>
    <path d='M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z'></path>
  </svg>
);

export const DeleteIcon = () => (
  <svg focusable='false' width='20' height='20' viewBox='0 0 24 24' className=' NMm5M' fill='red'>
    <path d='M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z'></path>
    <path d='M9 8h2v9H9zm4 0h2v9h-2z'></path>
  </svg>
);

export const DetailIcon = () => <EllipsisVertical size='20px' />;

export const CrossIcon = () => (
  <svg focusable='false' width='20' height='20' viewBox='0 0 24 24' className=' NMm5M'>
    <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z'></path>
  </svg>
);

export const CalendarIcon = () => (
  <i className='google-material-icons meh4fc hggPq' aria-hidden='true'>
    event
  </i>
);

export const CreateIcon = () => (
  <svg width='36' height='36' viewBox='0 0 36 36'>
    <path fill='#34A853' d='M16 16v14h4V20z'></path>
    <path fill='#4285F4' d='M30 16H20l-4 4h14z'></path>
    <path fill='#FBBC05' d='M6 16v4h10l4-4z'></path>
    <path fill='#EA4335' d='M20 16V6h-4v14z'></path>
    <path fill='none' d='M0 0h36v36H0z'></path>
  </svg>
);
