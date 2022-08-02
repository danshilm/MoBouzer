import React, { createContext, Dispatch, SetStateAction, useState } from 'react';
import { defaultSettings, getSettings, PublicAppSettings } from '../lib/settings';

export interface SettingsContextProps {
  settings: PublicAppSettings;
  setSettings: Dispatch<SetStateAction<PublicAppSettings>>;
}

export const SettingsContext = createContext<SettingsContextProps>({
  settings: defaultSettings.public,
  setSettings: () => null,
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(getSettings().publicSettings);

  const handleSetSettings = async (newSettings: SetStateAction<PublicAppSettings>) => {
    const settings = getSettings();
    settings.publicSettings = newSettings as PublicAppSettings;
    await settings.save();

    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: settings,
        setSettings: async (newSettings) => await handleSetSettings(newSettings),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
