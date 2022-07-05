import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BusLineCard from '../components/BusLineCard';
import SearchBar from '../components/SearchBar';
import tw from '../lib/tailwind';

const busLine = (line?: number) => {
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
    <SafeAreaView style={tw`dark:bg-zinc-900`}>
      <SearchBar style={tw`mx-6 mt-4 mb-4`} placeholder="Search for a bus line" />
      <ScrollView style={tw`px-6 android:mb-23 ios:mb-14`}>
        <Text style={[tw`mt-2 font-inter-bold`, { fontSize: 26 }]}>Bus Lines</Text>
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
    </SafeAreaView>
  );
}
