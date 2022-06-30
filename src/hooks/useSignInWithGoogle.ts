import { useIdTokenAuthRequest } from 'expo-auth-session/providers/google';
import { CustomParameters, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { firebaseAuth } from '../firebase/config';

export default function useSignInWithGoogle({
  scopes,
  customOAuthParameters,
}: {
  scopes?: string[];
  customOAuthParameters?: CustomParameters;
}) {
  const [error, setError] = useState();
  const [request, response, promptAsync] = useIdTokenAuthRequest({
    clientId: '579866483218-vkddpotuutlls0hgj1mc3l7ro1lqf3lo.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      try {
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(firebaseAuth, credential);
      } catch (e) {
        setError(e as any);
        console.log(e);
      }
    }
  }, [response]);

  return { loading: !!response, request, response, promptAsync, error };
}
