import { BottomNavigation, BottomNavigationProps, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';
import { useState } from 'react';

const useBottomNavigationState = (initialState = 0): BottomNavigationProps => {
  const [selectedIndex, setSelectedIndex] = useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};

export const CBottomNavigation = (): React.ReactElement => {

    const bottomNavState = useBottomNavigationState();

    const NasIcon = (props: any): IconElement => (
      <Icon
        {...props}
        name='nas'
        pack='material'
      />
    );

    const CogIcon = (props: any): IconElement => (
      <Icon
        {...props}
        name='cog'
        pack='material'
      />
    );
  
    return (
      <>
  
        <BottomNavigation>
          <BottomNavigationTab
            title='Overview'
            icon={NasIcon}
          />

          <BottomNavigationTab
            title='Settings'
            icon={CogIcon}
          />
        </BottomNavigation>
      </>
    )
  };