import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Navigation from 'src/Navigation';
import { appTheme } from 'src/config/theme';
import { DBContextProvider } from 'src/context/DBContext';
import { ThemeProvider, type DefaultTheme } from 'styled-components/native';

export default function App() {
  return (
    <DBContextProvider
      children={
        <ThemeProvider theme={appTheme as DefaultTheme}>
          <StatusBar style="auto" />
          <Navigation>
          </Navigation>
        </ThemeProvider>
      }>
    </DBContextProvider>
  );
}