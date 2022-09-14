import React from 'react';
import type { TouchableOpacityProps, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import tw from '../../lib/tailwind';

export interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  type?: 'default' | 'primary';
  size?: 'default' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;
}

export default function Button({
  children,
  style,
  type = 'default',
  size = 'default',
  isDisabled,
  ...props
}: ButtonProps): JSX.Element {
  const buttonStyles: string[] = [];

  switch (type) {
    case 'primary':
      buttonStyles.push('bg-slate-800 border-slate-800');
      break;
    default:
      buttonStyles.push('bg-white dark:bg-gray-200 border-slate-300 text-gray-100');
  }

  switch (size) {
    case 'lg':
      buttonStyles.push('font-inter-semibold rounded-xl w-full h-13 border');
      break;
    case 'sm':
      buttonStyles.push('rounded-xl w-13 h-13');
      break;
    case 'md':
    default:
      buttonStyles.push();
  }

  if (isDisabled) {
    buttonStyles.push('bg-gray-300 dark:bg-gray-500 dark:border-slate-500');
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={tw.style(
        'shadow-sm disabled:opacity-50 flex flex-row items-center justify-center',
        buttonStyles,
        style
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}
