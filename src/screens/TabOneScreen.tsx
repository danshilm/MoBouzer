import { Text, View } from 'react-native';
import { useDeviceContext } from 'twrnc';
import EditScreenInfo from '../components/EditScreenInfo';
import tw from '../lib/tailwind';

export default function TabOneScreen() {
  useDeviceContext(tw);

  return (
    <View style={tw`flex items-center justify-center flex-1 bg-white dark:bg-zinc-900`}>
      <Text style={tw`text-xl font-bold dark:text-slate-100`}>Tab One</Text>
      <View style={tw`w-4/5 h-px my-8 bg-slate-300 dark:bg-slate-100`} />
      <EditScreenInfo path="/src/screens/TabOneScreen.tsx" />
    </View>
  );
}
