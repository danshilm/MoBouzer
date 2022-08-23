import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import type MapView from 'react-native-maps';
import tw from '../../lib/tailwind';

function Compass(_props, ref: React.Ref<MapView>) {
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    if ((ref as React.RefObject<MapView>).current?.state.isReady) {
      (ref as React.RefObject<MapView>).current
        ?.getCamera()
        .then((camera) => setHeading(camera.heading));
    }
  });

  return (
    <TouchableOpacity
      style={tw`items-center justify-center w-10 h-10 p-0 m-0 bg-white rounded-full shadow-sm`}
      activeOpacity={0.7}
      onPress={() => {
        (ref as React.RefObject<MapView>).current?.animateCamera({ heading: 0 });
      }}
    >
      <Ionicons
        name="navigate-circle-outline"
        size={35}
        style={[tw`w-[33px]`, { transform: [{ rotate: `${(heading - 45 + 90) * -1}deg` }] }]}
      />
    </TouchableOpacity>
  );
}

export default React.forwardRef(Compass) as typeof Compass;
