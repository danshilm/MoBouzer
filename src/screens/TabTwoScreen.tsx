import { Text, View } from 'react-native';
import { useDeviceContext } from 'twrnc';
import EditScreenInfo from '../components/EditScreenInfo';
import tw from '../lib/tailwind';

export default function TabTwoScreen() {
  useDeviceContext(tw);

  return (
    <View style={tw`flex items-center justify-center flex-1 bg-white dark:bg-black`}>
      <Text style={tw`text-xl font-bold dark:text-slate-100`}>Tab Two</Text>
      <View style={tw`w-4/5 h-px my-8 bg-slate-300 dark:bg-slate-50`} />
      <EditScreenInfo path="/src/screens/TabTwoScreen.tsx" />
    </View>
  );
}
