import {
  ThemeProvider as NavigationThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

import {
  ThemeProvider as RNEThemeProvider,
} from 'react-native-elements';

import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import 'react-native-reanimated';

import { appTheme } from '@/constants/index';

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000', 
    card: '#000000',      
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationThemeProvider
        value={AppDarkTheme}
      >
        <RNEThemeProvider theme={appTheme}>
          <Slot />
          <StatusBar style="auto" />
        </RNEThemeProvider>
      </NavigationThemeProvider>
    </GestureHandlerRootView>
  );
}
