const fs = require('fs');
const path = require('path');
const generateCode = require('@expo/config-plugins/build/utils/generateCode');
const configPlugins = require('@expo/config-plugins');

const code = `  pod 'Firebase', :modular_headers => true
  pod 'FirebaseCore', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true
  $RNFirebaseAsStaticFramework = true`;

/**
 * To solve:
 * The Swift pod `FirebaseCoreInternal` depends upon `GoogleUtilities`, which does not define modules.
 * 	To opt into those targets generating module maps (which is necessary to import them from Swift when
 * 	building as static libraries), you may set `use_modular_headers!` globally in your Podfile, or
 * 	specify `:modular_headers => true` for particular dependencies.
 *
 * From https://github.com/invertase/react-native-firebase/issues/6332#issuecomment-1192553774
 */
const withReactNativeFirebase = (config) => {
  return configPlugins.withDangerousMod(config, [
    'ios',
    async (config) => {
      const filePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      const contents = fs.readFileSync(filePath, 'utf-8');

      const addCode = generateCode.mergeContents({
        tag: 'withReactNativeFirebase',
        src: contents,
        newSrc: code,
        anchor: /\s*get_default_flags\(\)/i,
        offset: 2,
        comment: '#',
      });

      if (!addCode.didMerge) {
        console.error(
          "ERROR: Cannot add withReactNativeFirebase to the project's ios/Podfile because it's malformed."
        );
        return config;
      }

      fs.writeFileSync(filePath, addCode.contents);

      return config;
    },
  ]);
};

module.exports = withReactNativeFirebase;
