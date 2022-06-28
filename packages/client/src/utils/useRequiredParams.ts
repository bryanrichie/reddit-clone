import { useParams } from 'react-router-dom';

export function useRequiredParams<A>() {
  return useParams() as any as Required<A>;
}
