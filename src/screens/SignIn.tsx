import { Ionicons } from '@expo/vector-icons';
import { useSignInWithEmailAndPassword } from '@skillnation/react-native-firebase-hooks/auth';
import { Formik } from 'formik';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from 'yup';
import FormButton from '../components/Common/Form/Button';
import FormTextInput from '../components/Common/Form/TextInput';
import { canHumaniseFirebaseAuthError, DisplayFirebaseAuthError } from '../firebase/errors';
import { firebaseAuth } from '../firebase/utils';
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
          <View style={tw`mt-2`}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
              style={tw`flex flex-row items-center h-12`}
            >
              <Ionicons name="arrow-back" size={20} style={tw`text-gray-800 dark:text-gray-300`} />
              <Text style={tw`ml-2 text-base text-gray-800 font-inter-medium dark:text-gray-300`}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          {/* Carousel-y image */}
          <View style={tw`w-full h-32 mt-4 bg-gray-400 rounded-xl`} />
          {/* Login form */}
          <View style={tw`mt-4`}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={signInSchema}
              onSubmit={async (values: { email: string; password: string }) => {
                await signIn(values.email, values.password);
                console.log(firebaseAuth().currentUser);
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
                    errorMessage={
                      error && !canHumaniseFirebaseAuthError(error)
                        ? 'Oops, something went wrong'
                        : undefined
                    }
                  />
                  <DisplayFirebaseAuthError error={error} />
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
