const expoConfig = {
  name: 'MoBouzer',
  displayName: 'MoBouzer',
  expo: {
    name: 'MoBouzer',
    slug: 'mobouzer',
    owner: 'danshilm',
    version: '0.0.1',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'mobouzer',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'com.mobouzer',
      supportsTablet: true,
    },
    android: {
      package: 'com.mobouzer',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    web: {
      favicon: './assets/images/favicon.png',
    },
  },
};

export default expoConfig;
