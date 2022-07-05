import { AuthError } from 'firebase/auth';
import { useFormikContext } from 'formik';
import { startCase } from 'lodash';
import { useEffect } from 'react';

const errorsToHandle = ['auth/wrong-password', 'auth/invalid-email', 'auth/user-not-found'];
export const canHumaniseFirebaseAuthError = (error?: AuthError) =>
  errorsToHandle.includes(error?.code ?? '');
export const humaniseFirebaseAuthError = (code: string) => {
  return startCase(code.replace('auth/', ''));
};

export function DisplayFirebaseAuthError({ error }: { error?: AuthError }) {
  const { setFieldError } = useFormikContext();

  useEffect(() => {
    if (canHumaniseFirebaseAuthError(error)) {
      switch (error?.code) {
        case 'auth/wrong-password':
          setFieldError('password', 'Wrong Password');
          break;

        case 'auth/invalid-email':
          setFieldError('email', 'Invalid Email');
          break;

        case 'auth/user-not-found':
          setFieldError('email', 'User Not Found');
          break;
      }
    }
  }, [error, setFieldError]);

  return null;
}
