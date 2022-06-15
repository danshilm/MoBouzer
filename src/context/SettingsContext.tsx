import { createContext } from 'react';
import { getSettings, PublicAppSettings } from '../lib/settings';

// type SettingsContextProps = PublicAppSettings;

export interface SettingsContextProps {
  currentSettings: PublicAppSettings;
}

const defaultPublicAppSettings: SettingsContextProps = {
  currentSettings: { isInitialised: false, isOnboarded: false, defaultTheme: 'light' },
};

export const SettingsContext = createContext<SettingsContextProps>(defaultPublicAppSettings);

export default function SettingsProvider({ children }): JSX.Element {
  const { publicSettings } = getSettings();

  return (
    <SettingsContext.Provider value={{ currentSettings: publicSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
