import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import ViewWithSearchBar from '../components/BetterSearchBar/ViewWithSearchBar';
import BusLineCard from '../components/BusLineCard';
import tw from '../lib/tailwind';

const busLine = () => {
  return { line: Math.floor(Math.random() * 100), destination: 'Port Louis', origin: 'Curepipe' };
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

export default function BusLines() {
  return (
    <ViewWithSearchBar style={tw`flex flex-1`}>
      <ScrollView style={tw`px-6 my-2`}>
        <Text style={[tw`mt-4 text-[25px] font-inter-bold`]}>Bus Lines</Text>
        {favourites.length > 1 && (
          <View>
            <View style={tw`flex flex-row mt-3.5 items-center`}>
              <AntDesign name="inbox" size={18} />
              <Text style={tw`ml-1.5 text-base font-inter`}>Favourites</Text>
            </View>
            <View style={tw`mt-3`}>
              {favourites.map((favourite) => (
                <BusLineCard data={favourite} key={favourite.line} />
              ))}
            </View>
          </View>
        )}
        <View>
          <View style={tw`flex flex-row mt-3.5 items-center`}>
            <Ionicons name="bus" size={18} />
            <Text style={tw`ml-1.5 text-base font-inter`}>All Buslines</Text>
          </View>
          <View style={tw`mt-3`}>
            {allBuslines.map((busline) => (
              <BusLineCard data={busline} key={busline.line} />
            ))}
          </View>
        </View>
      </ScrollView>
    </ViewWithSearchBar>
  );
}
