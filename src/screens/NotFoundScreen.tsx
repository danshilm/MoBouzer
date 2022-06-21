import { Text, TouchableOpacity, View } from 'react-native';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <View style={tw`flex items-center justify-center flex-1 p-5`}>
      <Text style={tw`font-bold`}>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Root')} style={tw`py-4 mt-4`}>
        <Text style={tw`text-sm text-blue-500`}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}
