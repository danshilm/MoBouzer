import Error from '../components/Error';
import type { RootStackScreenProps } from '../navigation/types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return <Error code={404} />;
}
