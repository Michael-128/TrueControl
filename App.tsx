import 'react-native-reanimated'
import 'react-native-gesture-handler'

import React, { useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, IconRegistry } from '@ui-kitten/components';
import OverviewScreen from './Views/OverviewScreen/OverviewScreen';
import { MaterialIconsPack } from './Icons/material-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CDrawer } from './Components/Navigation/CDrawer';
import { SafeAreaView, View } from 'react-native';
import { ConnectivityScreen } from './Views/ConnectivityScreen';
import { AppsScreen } from './Views/AppsScreen/AppsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Storage } from './Components/Storage/Storage';

const { Navigator, Screen } = createDrawerNavigator()

const DrawerNavigator = () => {
  return (<Navigator initialRouteName='Overview' drawerContent={props => <CDrawer {...props}/>}>
    <Screen name='Overview' component={OverviewScreen}/>
    <Screen name='Apps' component={AppsScreen}/>
    <Screen name='Connectivity' component={ConnectivityScreen}/>
  </Navigator>)
};

function MainArea(props: {children: JSX.Element | JSX.Element[]}) {
  return (
    <>
      <IconRegistry icons={MaterialIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaView style={{height: "100%"}}>
          {props.children}
        </SafeAreaView>
      </ApplicationProvider>
    </>
  )
}

export default () => {

  const [ isURL, setIsURL ] = useState(true)

  async function checkIfURLExists() {
    const res = await Storage.getCredentials()

    if(!res) {
      setIsURL(false)
      return
    }

    if(!res.url.includes("https://") && !res.url.includes("http://")) {
      setIsURL(false)
      return
    }

    setIsURL(true)
  }

  useEffect(() => {checkIfURLExists()}, [])

  if(!isURL)
    return (
      <MainArea>
        <GestureHandlerRootView>
         <ConnectivityScreen isConnected={(isConnected: boolean) => {if(isConnected) setIsURL(true)}}/>
        </GestureHandlerRootView>
      </MainArea>
    )
  
  return (
    <MainArea>
      <NavigationContainer>
        <DrawerNavigator/>
      </NavigationContainer>
    </MainArea>
  )
};
