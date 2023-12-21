import React from 'react';
import { Drawer, DrawerItem, Icon, IndexPath, Text } from '@ui-kitten/components';
import { NavigationState, NavigatorScreenParams } from '@react-navigation/native';

const ChartIcon = (props: any) => <Icon {...props} name="chart-line" pack="material"/>
const ConnectionIcon = (props: any) => <Icon {...props} name="connection" pack="material"/>
const AppsIcon = (props: any) => <Icon {...props} name="apps" pack="material"/>

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
      <DrawerItem accessoryLeft={ChartIcon} title='Overview' />
      <DrawerItem accessoryLeft={AppsIcon} title='Apps' />
      <DrawerItem accessoryLeft={ConnectionIcon} title='Connectivity' />
    </Drawer>
  );
};