import React from 'react';
import { Drawer, DrawerItem, IndexPath, Text } from '@ui-kitten/components';
import { NavigationState, NavigatorScreenParams } from '@react-navigation/native';

export const CDrawer = (props: { navigation: any, state: NavigationState }): React.ReactElement => {

  const [selectedIndex, _setSelectedIndex] = React.useState(new IndexPath(props.state.index));
  function setSelectedIndex(index: IndexPath) {
    props.navigation.navigate(props.state.routeNames[index.row])
    _setSelectedIndex(index)
  }

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => {
        setSelectedIndex(index)
      }}
      header={<Text category='h2'>TrueControl</Text>}
    > 
      <DrawerItem title='Overview' />
      <DrawerItem title='Connectivity' />
    </Drawer>
  );
};