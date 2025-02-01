import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { MaterialIconsPack } from './Icons/material-icons';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native';

import OverviewView from './Views/OverviewView';
import { ConnectivityView } from './Views/ConnectivityView';
import { AppsView } from './Views/AppsView';
import { StorageView } from './Views/StorageView';
import { CDrawer } from './Components/Navigation/CDrawer';
import { TrueNasProvider } from './Contexts/TrueNasContext';
import { useTrueNas } from './Hooks/useTrueNas';
import { ConnectionStatus } from './Types/Enums/ConnectionStatus';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerNavigator = () => (
  <Navigator initialRouteName='Overview' drawerContent={props => <CDrawer {...props}/>}>
    <Screen name='Overview' component={OverviewView}/>
    <Screen name='Storage' component={StorageView}/>
    <Screen name='Apps' component={AppsView}/>
    <Screen name='Connectivity' component={ConnectivityView}/>
  </Navigator>
);

function MainArea() {
  const { connectionStatus } = useTrueNas();

  switch(connectionStatus) {
    case ConnectionStatus.DISCONNECTED:
    case ConnectionStatus.CONNECTING:
      return <ConnectivityView/>
    case ConnectionStatus.CONNECTED:
      return <DrawerNavigator/>;
  }
}

export default () => (
  <TrueNasProvider>
    <IconRegistry icons={MaterialIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer theme={DefaultTheme}>
          <SafeAreaView style={{height: "100%", backgroundColor: "white"}}>
            <GestureHandlerRootView>
              <MainArea/>
            </GestureHandlerRootView>
          </SafeAreaView>
        </NavigationContainer>
    </ApplicationProvider>
  </TrueNasProvider>
);
