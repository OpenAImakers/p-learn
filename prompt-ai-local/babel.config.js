module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',       // Handles React Native + JSX + TypeScript
    ],
    plugins: [
      'react-native-reanimated/plugin', // Keep your existing plugin
    ],
  };
};
