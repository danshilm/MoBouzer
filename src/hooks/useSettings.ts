import { useContext } from 'react';
import { SettingsContext, SettingsContextProps } from '../context/SettingsContext';

export default function useSettings(): SettingsContextProps {
  const settings = useContext(SettingsContext);

  return settings;
}
