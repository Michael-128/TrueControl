import 'react-native-reanimated'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'

import React, { useContext, useEffect, useState } from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text, Button, IconRegistry, useTheme } from '@ui-kitten/components';
import OverviewScreen from './Views/OverviewScreen/OverviewScreen';
import { MaterialIconsPack } from './Icons/material-icons';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CDrawer } from './Components/Navigation/CDrawer';
import { SafeAreaView, View, useColorScheme } from 'react-native';
import { ConnectivityView } from './Views/ConnectivityView';
import { AppsScreen } from './Views/AppsScreen/AppsScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Storage } from './Components/Storage/Storage';
import { ThemeContext } from './Contexts/ThemeContext';
import { StorageView } from './Views/StorageView';

const { Navigator, Screen } = createDrawerNavigator()

const DrawerNavigator = () => {
  return (<Navigator initialRouteName='Overview' drawerContent={props => <CDrawer {...props}/>}>
    <Screen name='Overview' component={OverviewScreen}/>
    <Screen name='Storage' component={StorageView}/>
    <Screen name='Apps' component={AppsScreen}/>
    <Screen name='Connectivity' component={ConnectivityView}/>
  </Navigator>)
};

function MainArea(props: {children: JSX.Element | JSX.Element[]}) {
  const [theme, setTheme] = useState<string>('light');

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <>
      <IconRegistry icons={MaterialIconsPack} />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <SafeAreaView style={{height: "100%", backgroundColor: "white"}}>
            {props.children}
          </SafeAreaView>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  )
}

export default () => {

  const themeContext = useContext(ThemeContext);
  const theme = useTheme()


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
         <ConnectivityView isConnected={(isConnected: boolean) => {if(isConnected) setIsURL(true)}}/>
        </GestureHandlerRootView>
      </MainArea>
    )
  
  return (
    <MainArea>
      <NavigationContainer theme={DefaultTheme}>
        <DrawerNavigator/>
      </NavigationContainer>
    </MainArea>
  )
};
