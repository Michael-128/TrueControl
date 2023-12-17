import 'react-native-gesture-handler';

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, IconRegistry } from '@ui-kitten/components';
import OverviewScreen from './Views/OverviewScreen';
import { MaterialIconsPack } from './Icons/material-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CDrawer } from './Components/Navigation/CDrawer';
import { SafeAreaView, View } from 'react-native';
import { ConnectivityScreen } from './Views/ConnectivityScreen';

const { Navigator, Screen } = createDrawerNavigator()

const DrawerNavigator = () => {
  return (<Navigator initialRouteName='Connectivity' drawerContent={props => <CDrawer {...props}/>}>
    <Screen name='Overview' component={OverviewScreen}/>
    <Screen name='Connectivity' component={ConnectivityScreen}/>
  </Navigator>)
};

export default () => (
  <>
    <IconRegistry icons={MaterialIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{height: "100%"}}>
        <NavigationContainer>
          <DrawerNavigator/>
        </NavigationContainer>
      </SafeAreaView>
    </ApplicationProvider>
  </>
);
