import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';
import tw from '../../lib/tailwind';

interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  style: ViewStyle;
  type: 'default' | 'primary';
  isDisabled?: boolean;
}

export default function Button({
  children,
  style,
  type = 'default',
  isDisabled,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={tw.style(
        'shadow-sm font-semibold disabled:opacity-50 h-13 rounded-xl border flex flex-row items-center justify-center',
        type === 'default'
          ? 'bg-white dark:bg-gray-200 border-slate-300 text-gray-100'
          : 'bg-slate-800 border-slate-800',
        isDisabled && 'bg-gray-300 dark:bg-gray-500 dark:border-slate-500',
        style
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
