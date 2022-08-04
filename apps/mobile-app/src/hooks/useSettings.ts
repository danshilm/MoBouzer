import { useContext } from 'react';
import type { SettingsContextProps } from '../context/SettingsContext';
import { SettingsContext } from '../context/SettingsContext';

export default function useSettings(): SettingsContextProps {
  const settings = useContext(SettingsContext);

  return settings;
}
