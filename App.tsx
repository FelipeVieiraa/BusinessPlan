import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from "@eva-design/eva";

import Routes from './src/routes';
import ContextProvider from './src/contexts';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
      >
        <ContextProvider>
          <StatusBar style="light" translucent={false} />
          <Routes/>
        </ContextProvider>
      </ApplicationProvider>
    </>
  );
}