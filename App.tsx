import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, IconRegistry } from '@ui-kitten/components';
import HomeScreen from './Views/HomeScreenView';
import { MaterialIconsPack } from './Icons/material-icons';

export default () => (
  <>
    <IconRegistry icons={MaterialIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
    </ApplicationProvider>
  </>
);
