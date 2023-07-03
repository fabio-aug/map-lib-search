import Paths from '@/routes/Paths';
import { useNavigate } from 'react-router-dom';

type PathGo<T> = (a: typeof Paths) => ((...data: T[]) => string)

function useHistory() {
  const navigate = useNavigate();

  const history = <T>(path: PathGo<T>) => ({
    go: (...data: T[]) => {
      const aux = path(Paths)(...data);
      console.log(aux);
      navigate(aux);
    },
  });

  return history;
}

export default useHistory;
