import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import tw from '../../lib/tailwind';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  style: ViewStyle;
}

export default function Button({ children, style, ...props }: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={tw.style(
        'shadow-sm font-semibold disabled:opacity-50 h-14 rounded-xl border flex flex-row items-center justify-center',
        style
      )}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
