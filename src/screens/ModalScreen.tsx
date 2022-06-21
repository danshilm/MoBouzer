import { StatusBar } from 'expo-status-bar';
import { Platform, Text, View } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import tw from '../lib/tailwind';

export default function ModalScreen() {
  return (
    <View style={tw`flex items-center justify-center flex-1 bg-white dark:bg-black`}>
      <Text style={tw`text-xl font-bold dark:text-white`}>Modal</Text>
      <View style={tw`w-4/5 h-px my-7 bg-slate-300`} />
      <EditScreenInfo path="/src/screens/ModalScreen.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
