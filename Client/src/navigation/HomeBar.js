import React from 'react';
import { Text, Icon, Layout, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const EditIcon = (props) => (
  <Icon {...props} name='edit'/>
);

const DrawerIcon = (props) => (
  <Icon {...props} name='menu'/>
);

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical'/>
);

const InfoIcon = (props) => (
  <Icon {...props} name='info'/>
);

const LogoutIcon = (props) => (
  <Icon {...props} name='log-out'/>
);

const HomeBar = (props) => {

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu}/>
  );

  const renderRightActions = () => (
    <React.Fragment>
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title='About'/>
        <MenuItem accessoryLeft={LogoutIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );

  const renderLeftActions = () => (
    <Button appearance='ghost' size='giant' accessoryLeft={DrawerIcon}
      onPress={() => props.navigation.toggleDrawer()}
    />
  );

  return (
    <Layout style={styles.container} level='1'>
      <TopNavigation style={{backgroundColor: 'aliceblue'}}
        alignment='center'
        title={props.name}
        accessoryLeft={renderLeftActions}
        accessoryRight={renderRightActions}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});


export default HomeBar;