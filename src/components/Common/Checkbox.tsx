import BaseCheckBox from 'expo-checkbox';
import React, { useState } from 'react';
import tw from '../../lib/tailwind';

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  return (
    <BaseCheckBox
      style={tw`w-5 h-5 rounded-md`}
      value={checked}
      onValueChange={() => setChecked(!checked)}
      color={'black'}
    />
  );
}
