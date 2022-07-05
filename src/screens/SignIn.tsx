import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import FormButton from '../components/Common/Form/Button';
import FormTextInput from '../components/Common/Form/TextInput';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

const signInSchema = Yup.object().shape({
  email: Yup.string().required('Enter an email address'),
  password: Yup.string().required('Enter a password'),
});

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
  const [signIn, , , error] = useSignInWithEmailAndPassword(firebaseAuth);

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
              initialValues={{ email: '', password: '' }}
              validationSchema={signInSchema}
              onSubmit={async (values: { email: string; password: string }) => {
                try {
                  await signIn(values.email, values.password);
                } catch (e) {
                  // no need to do anything here
                  // the signin hook already gives the reason for the error
                  console.warn(e);
                  console.warn(error);
                }
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
                  />
                  <FormTextInput
                    label="Password"
                    as="password"
                    placeholder="Thoushallnotpass123"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errorMessage={errors.password && touched.password ? errors.password : undefined}
                  />
                  <FormButton
                    text="Sign In"
                    isSubmitting={isSubmitting}
                    onPress={handleSubmit}
                    error={!!error}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
        <View style={tw`flex flex-row justify-center mb-8`}>
          <Text style={tw`text-gray-700 dark:text-gray-300 font-inter`}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            style={tw`ml-2`}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Text style={tw`text-gray-700 underline dark:text-gray-300 font-inter-semibold`}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
