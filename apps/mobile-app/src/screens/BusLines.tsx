import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import BusLineCard from '../components/BusLineCard';
import ViewWithSearchBar from '../components/SearchBar/ViewWithSearchBar';
import tw from '../lib/tailwind';
import type { BusLinesStackScreenProps } from '../navigation/types';

const busLine = () => {
  return {
    line: Math.floor(Math.random() * 100).toString(),
    destination: 'Port Louis',
    origin: 'Curepipe',
  };
};

const favourites = [busLine(), busLine(), busLine(), busLine(), busLine()];
const allBuslines = [
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
  busLine(),
];

export default function BusLines({ navigation }: BusLinesStackScreenProps<'BusLines'>) {
  // const [value, loading, error] = useDocumentDataOnce(doc(firebaseStore, 'bus-lines', 'all'));

  return (
    <ViewWithSearchBar style={tw`flex-1`} placeholder="Search for a bus line">
      <ScrollView style={tw`z-10 my-2`}>
        <Text style={[tw`mt-4 px-6 text-[25px] font-inter-bold`]}>Bus Lines</Text>
        {favourites.length > 1 && (
          <View style={tw`px-6`}>
            <View style={tw`flex flex-row mt-3.5 items-center`}>
              <AntDesign name="inbox" size={18} />
              <Text style={tw`ml-1.5 text-base font-inter`}>Favourites</Text>
            </View>
            <View style={tw`mt-3`}>
              <BusLineCard
                data={{ line: '2', destination: 'Curepipe', origin: 'Port Louis' }}
                key="2-szkvb"
                navigation={navigation}
              />
              {favourites.map((favourite) => (
                <BusLineCard data={favourite} key={favourite.line} navigation={navigation} />
              ))}
            </View>
          </View>
        )}
        <View style={tw`px-6`}>
          <View style={tw`flex flex-row mt-3.5 items-center`}>
            <Ionicons name="bus" size={18} />
            <Text style={tw`ml-1.5 text-base font-inter`}>All Buslines</Text>
          </View>
          <View style={tw`mt-3`}>
            {allBuslines.map((busline) => (
              <BusLineCard
                data={busline}
                key={Math.random() + busline.line}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ViewWithSearchBar>
  );
}
