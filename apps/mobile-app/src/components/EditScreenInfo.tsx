import * as WebBrowser from 'expo-web-browser';
import { Text, TouchableOpacity, View } from 'react-native';
import useSettings from '../hooks/useSettings';
import tw from '../lib/tailwind';

export default function EditScreenInfo({ path }: { path: string }) {
  const { settings } = useSettings();

  return (
    <View>
      <View style={tw`items-center px-6 py-8`}>
        <Text style={[tw`text-base leading-6 text-center dark:text-gray-200`]}>
          Open up the code for this screen:
        </Text>

        <View style={tw`px-1 my-2 rounded bg-slate-100 dark:bg-zinc-800`}>
          <Text style={tw`font-space-mono dark:text-gray-200`}>{path}</Text>
        </View>

        <Text style={tw`text-base leading-6 text-center dark:text-gray-200`}>
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={tw`mx-6 mt-3`}>
        <TouchableOpacity onPress={handleHelpPress} style={tw`py-4`}>
          <Text style={tw`text-center underline dark:text-gray-200`}>
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={tw`text-center font-extralight dark:text-gray-200`}>
        is dark mode: {settings.isDarkMode ? 'true' : 'false'}
      </Text>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet'
  );
}
