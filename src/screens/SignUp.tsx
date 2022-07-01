import { AntDesign } from '@expo/vector-icons';
import { Formik } from 'formik';
import React from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeviceContext } from 'twrnc';
import * as Yup from 'yup';
import FormButton from '../components/Common/Form/Button';
import FormCheckbox from '../components/Common/Form/Checkbox';
import FormTextInput from '../components/Common/Form/TextInput';
import { firebaseAuth } from '../firebase/config';
import tw from '../lib/tailwind';
import { RootStackScreenProps } from '../navigation/types';

const signInSchema = Yup.object().shape({
  email: Yup.string().required('Enter an email address'),
  password: Yup.string()
    .min(8, 'Password must be 8 characters or more')
    .required('Enter a password'),
  tac: Yup.boolean().isTrue('Accept the terms and conditions'),
});

export default function SignUp({ navigation }: RootStackScreenProps<'SignUp'>) {
  const [createUser, , , error] = useCreateUserWithEmailAndPassword(firebaseAuth);
  useDeviceContext(tw);

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
              initialValues={{ email: '', password: '', tac: false }}
              validationSchema={signInSchema}
              onSubmit={async (values) => {
                try {
                  await createUser(values.email, values.password);
                } catch (e) {
                  // no need to do anything here
                  // the signin hook already gives the reason for the error
                  console.log(e);
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
                  <FormCheckbox
                    value={values.tac}
                    onValueChange={(value) => setFieldValue('tac', value)}
                    errorMessage={errors.tac && touched.tac ? errors.tac : undefined}
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
                    error={!!error}
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
