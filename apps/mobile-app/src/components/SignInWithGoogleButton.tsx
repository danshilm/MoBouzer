import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { gray } from 'tailwindcss/colors';
import { supabase } from '../lib/supabase';
import tw from '../lib/tailwind';
import Sentry from '../utils/sentry';
import Button from './Common/Button';

export default function SignInWithGoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      const redirectUri = 'mobouzer://signin';
      const provider = 'google';
      const response = await WebBrowser.openAuthSessionAsync(
        `${
          Constants.expoConfig?.extra?.supabaseUrl ?? ''
        }/auth/v1/authorize?provider=${provider}&redirect_to=${redirectUri}`,
        redirectUri
      );

      if (response.type === 'success') {
        const url = response.url;
        const urlParams = new URLSearchParams(url);
        const accessToken = urlParams.get('access_token');
        const refreshToken = urlParams.get('refresh_token');

        if (!accessToken || !refreshToken) {
          Sentry.Native.captureMessage(
            'No access token or refresh token retrieved from Supabase',
            'error'
          );
          return;
        }

        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
        if (error) {
          Sentry.Native.captureException(error);
        }
      }
    } catch (error) {
      Sentry.Native.captureException(error);
    } finally {
      const result = WebBrowser.maybeCompleteAuthSession();
      if (result.type === 'failed') {
        Sentry.Native.captureMessage(result.message, 'error');
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        style={tw`mb-5`}
        size="lg"
        disabled={loading}
        onPress={() => {
          setLoading(true);
          handleGoogleSignIn();
        }}
        accessibilityLabel="sign in with google button"
      >
        {loading ? (
          <ActivityIndicator color={gray[800]} />
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
