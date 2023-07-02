import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import FormButton from '../components/Common/Form/Button';
import FormCheckbox from '../components/Common/Form/Checkbox';
import FormTextInput from '../components/Common/Form/TextInput';
import { supabase } from '../lib/supabase';
import tw from '../lib/tailwind';
import type { RootStackScreenProps } from '../navigation/types';
import Sentry from '../utils/sentry';

const signInSchema = Yup.object().shape({
  email: Yup.string().required('Enter an email address'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more')
    .required('Enter a password'),
  tac: Yup.boolean().isTrue('Accept the terms and conditions'),
});

export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>) {
  const [error, setError] = useState('');
  async function createUser(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        Sentry.Native.captureException(error);
        setError(error.message);
      }
    } catch (error) {
      setError('Sign Up attempt failed');
    }
  }

  return (
    <SafeAreaView style={tw`px-6`}>
      <View style={tw`flex flex-col justify-between h-full`}>
        <View>
          {/* Header */}
          <View style={tw`flex flex-row items-center h-10`}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={tw`flex flex-row items-center`}
              accessibilityLabel="back button"
            >
              <AntDesign name="arrowleft" size={20} style={tw`text-gray-800 dark:text-gray-300`} />
              <Text style={tw`ml-2 text-base text-gray-800 font-inter-medium dark:text-gray-300`}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          {/* Carousel-y image */}
          <View style={tw`w-full h-32 mt-6 bg-gray-400 rounded-xl`} />
          {/* Login form */}
          <View style={tw`mt-3`}>
            <Formik
              initialValues={{ email: '', password: '', tac: false }}
              validationSchema={signInSchema}
              onSubmit={async (values) => {
                await createUser(values.email, values.password);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                touched,
                errors,
                isSubmitting,
                setFieldValue,
              }) => (
                <View>
                  <FormTextInput
                    label="Email address"
                    as="email"
                    placeholder="gandalf@tlotr.com"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    errorMessage={errors.email && touched.email ? errors.email : undefined}
                    accessibilityLabel="email address text input"
                  />
                  <FormTextInput
                    label="Password"
                    as="password"
                    placeholder="Thoushallnotpass123"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errorMessage={errors.password && touched.password ? errors.password : undefined}
                    accessibilityLabel="password text input"
                  />
                  <FormCheckbox
                    value={values.tac}
                    onValueChange={(value) => setFieldValue('tac', value)}
                    errorMessage={errors.tac && touched.tac ? errors.tac : undefined}
                    accessibilityLabel="terms of use & privacy policy checkbox"
                  >
                    <View style={tw`flex flex-row flex-wrap ml-2`}>
                      <Text style={tw`text-gray-800 font-inter dark:text-gray-200`}>
                        I agree to the{' '}
                      </Text>
                      <TouchableOpacity activeOpacity={0.7}>
                        <Text
                          style={tw`text-gray-700 underline dark:text-gray-200 font-inter-semibold`}
                        >
                          terms of use
                        </Text>
                      </TouchableOpacity>
                      <Text style={tw`text-gray-800 font-inter dark:text-gray-200`}> and </Text>
                      <TouchableOpacity activeOpacity={0.7}>
                        <Text
                          style={tw`text-gray-700 underline dark:text-gray-200 font-inter-semibold`}
                        >
                          privacy policy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </FormCheckbox>
                  <FormButton
                    text="Sign Up"
                    isSubmitting={isSubmitting}
                    onPress={handleSubmit}
                    errorMessage={error}
                    accessibilityLabel="sign up button"
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
        <View style={tw`flex flex-row justify-center mb-8`}>
          <Text style={tw`text-gray-700 dark:text-gray-300 font-inter`}>
            Already have an account?
          </Text>
          <TouchableOpacity
            style={tw`ml-2`}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignIn')}
            accessibilityLabel="link to sign in screen"
          >
            <Text style={tw`text-gray-700 underline dark:text-gray-300 font-inter-semibold`}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
