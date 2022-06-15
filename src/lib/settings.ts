// import { merge } from 'lodash';
import { merge } from 'lodash';
import { load, save } from '../utils/storage';

export interface PublicAppSettings {
  isInitialised: boolean;
  isOnboarded: boolean;
  defaultTheme: 'dark' | 'light';
}

interface AppSettings {
  public: PublicAppSettings;
}

class Settings {
  private settings: AppSettings;

  constructor() {
    this.settings = {
      public: {
        isInitialised: false,
        isOnboarded: false,
        defaultTheme: 'dark',
      },
    };
  }

  get publicSettings() {
    return this.settings.public;
  }

  set publicSettings(data: PublicAppSettings) {
    this.settings.public = data;
  }

  public async load() {
    const settings = await load<AppSettings>('app-settings');

    if (settings) {
      this.settings = merge(this.settings, settings);
      await this.save();
    }
    return this;
  }

  public async save() {
    await save('app-settings', this.settings);
  }
}

let settings: Settings | undefined;

export const getSettings = () => {
  if (!settings) {
    settings = new Settings();
  }

  return settings;
};

export default Settings;
