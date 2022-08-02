import { FontAwesome } from '@expo/vector-icons';
import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { firebaseAuth } from '../firebase/utils';
import tw from '../lib/tailwind';
import Button from './Common/Button';

export default function SignInWithGoogleButton() {
  const [_request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: Constants.manifest?.extra?.firebaseWebClientId,
    androidClientId: Constants.manifest?.extra?.firebaseAndroidClientId,
    iosClientId: Constants.manifest?.extra?.firebaseiOSClientId,
    expoClientId: Constants.manifest?.extra?.firebaseExpoGoClientId,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const login = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;

        // Create a Google credential with the token
        const googleCredential = firebaseAuth.GoogleAuthProvider.credential(id_token);

        // Sign-in the user with the credential
        await firebaseAuth()
          .signInWithCredential(googleCredential)
          .catch((reason) => console.log(reason));
      }
      setLoading(false);
    };

    login();
  }, [response]);

  return (
    <>
      <Button
        style={tw`mb-5`}
        type="default"
        disabled={loading}
        onPress={() => {
          setLoading(true);
          promptAsync();
        }}
      >
        {loading ? (
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
