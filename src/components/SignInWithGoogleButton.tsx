import { FontAwesome } from '@expo/vector-icons';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';
import Button from './Common/Button';

export default function SignInWithGoogleButton() {
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: Constants.manifest?.extra?.firebaseWebClientId,
    androidClientId: Constants.manifest?.extra?.firebaseAndroidClientId,
    iosClientId: Constants.manifest?.extra?.firebaseiOSClientId,
    expoClientId: Constants.manifest?.extra?.firebaseExpoGoClientId,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(firebaseAuth, credential).catch((err) => console.log(err));
    }
  }, [response]);

  return (
    <>
      <Button
        style={tw`mb-5`}
        type="default"
        isDisabled={!request}
        onPress={() =>
          promptAsync({
            // TODO should not use proxy in prod, but setting false
            // results in an error screen from auth.expo.io
            // something went wrong trying to finish signing in
            useProxy: true,
          })
        }
      >
        {!request ? (
          <ActivityIndicator color={tw.color('gray-800')} />
        ) : (
          <>
            <FontAwesome style={tw`mr-3 text-gray-800`} name="google" size={20} />
            <Text style={tw`text-base text-gray-800 font-inter-medium`}>Continue With Google</Text>
          </>
        )}
      </Button>
    </>
  );
}
