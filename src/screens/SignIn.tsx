import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import * as Yup from 'yup';
import Button from '../components/Common/Button';
import TextInput from '../components/Common/TextInput';
import OnboardingFooter from '../components/OnboardingFooter';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

const signInSchema = Yup.object().shape({
  email: Yup.string().required('Enter an email address'),
  password: Yup.string().required('Emter a password'),
});

export default function SignIn({ navigation }: RootStackScreenProps<'SignIn'>) {
  const [signInWithEmailAndPassword, , , error] = useSignInWithEmailAndPassword(firebaseAuth);
  useDeviceContext(tw);

  return (
    <SafeAreaView style={tw`px-6`}>
      <View style={tw`flex flex-col justify-between h-full`}>
        <View>
          {/* Header */}
          <View style={tw`flex flex-row items-center h-10`}>
            <TouchableOpacity
              activeOpacity={0.6}
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
              onSubmit={async (values) => {
                try {
                  await signInWithEmailAndPassword(values.email, values.password);
                } catch (e) {
                  // no need to do anything here
                  // the signin hook already gives the reason for the error
                  console.log(e);
                }
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, isSubmitting }) => (
                <View>
                  <TextInput
                    label="Email address"
                    as="email"
                    placeholder="gandalf@tlotr.com"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    errorMsg={errors.email}
                  />
                  <TextInput
                    label="Password"
                    as="password"
                    placeholder="Thoushallnotpass123"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    errorMsg={errors.password}
                  />
                  <Button style={tw`mt-3.5`} type="primary" onPress={() => handleSubmit()}>
                    {isSubmitting ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={tw`text-base text-gray-100 font-inter-medium`}>Sign In</Text>
                    )}
                  </Button>
                  {error && <Text>{error.message}</Text>}
                </View>
              )}
            </Formik>
          </View>
        </View>
        <OnboardingFooter />
      </View>
    </SafeAreaView>
  );
}
