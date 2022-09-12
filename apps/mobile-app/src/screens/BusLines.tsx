import { Ionicons } from '@expo/vector-icons';
import type { BusLine } from '@mobouzer/shared';
import { useDocumentData } from '@skillnation/react-native-firebase-hooks/firestore';
import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import BusLineCard from '../components/BusLineCard';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import { firebaseStore } from '../firebase/utils';
import tw from '../lib/tailwind';
import type { BusLinesStackScreenProps } from '../navigation/types';

export default function BusLines({ navigation }: BusLinesStackScreenProps<'BusLines'>) {
  const [allBuslines, allBusLinesLoading] = useDocumentData<BusLine.AllDocumentData>(
    firebaseStore().doc('bus-lines/all')
  );

  return (
    <ViewWithSearchBar style={tw`flex-1`} placeholder="Search for a bus line">
      <ScrollView style={tw`z-10 my-2`}>
        <Text style={[tw`mt-4 px-4 text-[25px] font-inter-bold`]}>Bus Lines</Text>
        {/* {favourites.length > 1 && (
          <View style={tw`px-4`}>
            <View style={tw`flex flex-row mt-3.5 items-center`}>
              <AntDesign name="inbox" size={18} />
              <Text style={tw`ml-1.5 text-base font-inter`}>Favourites</Text>
            </View>
            <View style={tw`mt-3`}>
              <BusLineCard
                data={{ id: '2', destination: 'Curepipe', origin: 'Port Louis' }}
                key="2-szkvb"
                navigation={navigation}
              />
              {favourites.map((favourite) => (
                <BusLineCard data={favourite} key={favourite.line} navigation={navigation} />
              ))}
            </View>
          </View>
        )} */}
        <View style={tw`px-4 mt-3.5`}>
          {allBusLinesLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <View style={tw`flex flex-row items-center`}>
                <Ionicons name="bus" size={18} />
                <Text style={tw`ml-1.5 text-base font-inter`}>All Buslines</Text>
              </View>
              <View style={tw`mt-3`}>
                {allBuslines?.['bus-lines'].map((busline) => (
                  <BusLineCard data={busline} key={busline.id} navigation={navigation} />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </ViewWithSearchBar>
  );
}
