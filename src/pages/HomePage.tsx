import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@states';
import { SimpleNavbar, SimpleMap } from '@components';

export function HomePage() {
  const navigate = useNavigate();
  const { userStatus } = useUserStore();

  if (userStatus === 'UNINIT' || userStatus === 'PENDING') {
    navigate('/login');
  }

  return (
    <div>
      <SimpleNavbar />
      <SimpleMap />
    </div>
  );
}
