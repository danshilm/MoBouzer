import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import MapView from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewWithSearchBar from '../components/BetterSearchBar/ViewWithSearchBar';
import { firebaseAuth } from '../firebase/config';
import useDebouncedState from '../hooks/useDebouncedState';
import tw from '../lib/tailwind';

// latitude = y-axis
// longitude = x-axis
// latitude, longitude
const southWestCoordinates = [-20.525305, 57.307921];
const northEastCoordinates = [-19.982901, 57.806426];
const centreCoordinates = [-20.254103, 57.5571735];

export default function Map() {
  const [focused, setFocused] = useState(false);
  const { value: searchValue, setValue: setSearchValue } = useDebouncedState('');
  const [isOpen, setisOpen] = useState(false);
  const [user] = useAuthState(firebaseAuth);
  const { top } = useSafeAreaInsets();

  return (
    <ViewWithSearchBar style={tw`h-full`}>
      <MapView
        style={tw`absolute top-0 bottom-0 left-0 right-0`}
        provider="google"
        initialRegion={{
          latitude: centreCoordinates[0],
          longitude: centreCoordinates[1],
          latitudeDelta: northEastCoordinates[0] - southWestCoordinates[0],
          longitudeDelta: (northEastCoordinates[1] - southWestCoordinates[1]) * 1.2,
        }}
      ></MapView>
    </ViewWithSearchBar>
    // <View style={tw`h-full`}>
    //   <MapView
    //     style={tw`absolute top-0 bottom-0 left-0 right-0`}
    //     provider="google"
    //     initialRegion={{
    //       latitude: centreCoordinates[0],
    //       longitude: centreCoordinates[1],
    //       latitudeDelta: northEastCoordinates[0] - southWestCoordinates[0],
    //       longitudeDelta: (northEastCoordinates[1] - southWestCoordinates[1]) * 1.2,
    //     }}
    //   ></MapView>

    //   <DropdownMenu isOpen={isOpen} setIsOpen={setisOpen} />
    //   <SafeAreaView style={tw`flex px-6 pt-4`}>
    //     <BetterSearchBar isDropdownOpen={isOpen} setIsDropdownOpen={setisOpen} />
    //     {/* <View
    //       style={[
    //         tw.style(
    //           'h-12 z-10 bg-white rounded-xl border-gray-300 shadow-md px-2 flex flex-row',
    //           focused ? 'border-2' : 'border'
    //         ),
    //       ]}
    //     >
    //       <TextInput
    //         style={tw`flex-1 h-full px-1 text-base font-inter ios:pb-1`}
    //         selectionColor={tw.color('gray-800')}
    //         onFocus={() => setFocused(true)}
    //         onBlur={() => setFocused(false)}
    //         placeholder="Search for your destination"
    //         // placeholderTextColor={tw.color('gray-300')}
    //         value={searchValue}
    //         onChangeText={(e) => setSearchValue(e)}
    //       />
    //       <View style={tw`flex items-center`}>
    //         <View style={tw`flex justify-center h-full ml-1`}>
    //           <TouchableOpacity
    //             style={tw`border border-gray-300 rounded-md w-7.5 h-7.5 flex items-center justify-center`}
    //             activeOpacity={0.7}
    //             onPress={() => setisOpen(!isOpen)}
    //           >
    //             {user?.photoURL ? (
    //               <Image
    //                 source={{ uri: user.photoURL }}
    //                 defaultSource={require('../../assets/images/person.png')}
    //                 style={tw`w-7.5 h-7.5 rounded-md`}
    //               />
    //             ) : (
    //               <Ionicons name="person" size={20} color={tw.color('gray-500')} />
    //             )}
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </View> */}
    //   </SafeAreaView>
    // </View>
  );
}
