import React from 'react';
import { Image, View, useWindowDimensions, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import SettingsScreen from "../../screens/settings/settings-screen";
import LoginScreen from "../../screens/login/login-screen";
import LogoutScreen from "../../screens/logout/logout-screen";
import TabNavigator from "../../navigators/tabnavigator/tabnavigator-navigator"
import { MaterialIcons } from '@expo/vector-icons';
import { color, typography } from "../../theme";
import AsyncStorage from '@react-native-async-storage/async-storage'

const Drawer = createDrawerNavigator();


export default function DrawerNavigation() {
  const dimensions = useWindowDimensions();

  let isLoggedIn = '';
  let username = '';

  const getSavedUsername = async () => {
    try {
      username = await AsyncStorage.getItem('username') || 'none';
    } catch (error) {
      console.tron.log("Error retrieving data" + error);
    }
  };
  const getLoginKey = React.useCallback(async () => {
    try {
      isLoggedIn = await AsyncStorage.getItem('@isLoggedIn') || 'none';
    } catch (error) {
      console.tron.log("Error retrieving data" + error);
    }
  }, [AsyncStorage]);

  React.useEffect(() => {
    getLoginKey();
    getSavedUsername();
  }, [getLoginKey, getSavedUsername]
  )
  console.tron.log(isLoggedIn)

  return (
    <Drawer.Navigator
      drawerContent={props => customDrawerContent(props, username)}
      drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
      drawerStyle={{
        backgroundColor: "#281B34"
      }}
      initialRouteName={isLoggedIn === 'true' ? 'LoginScreen' : 'home'}
    >
      <Drawer.Screen name="home" component={TabNavigator}
        options={{
          drawerIcon: () =>
          (<View >
            <Image source={require("../../components/images/DrawerLogo.jpg")}
              style={{
                resizeMode: 'cover',
                height: 120,
                width: 245,
                borderColor: color.palette.black,
                borderRadius: 0,
                alignContent: 'center',
              }}

            />
          </View>)
        }}
      />
      <Drawer.Screen name="login" component={LoginScreen} options={{
        drawerLabel: () =>
          <View>
            <Text style={styles.DrawerTextColor}>
              Login
            </Text>
          </View>,
        drawerIcon: () => <MaterialIcons name='login' size={26} color={color.palette.white} />
      }}
      />
      <Drawer.Screen name="settings" component={SettingsScreen} options={{
        drawerLabel: () =>
          <View>
            <Text style={styles.DrawerTextColor}>
              Settings
            </Text>
          </View>,
        drawerIcon: () => <MaterialIcons name='settings' size={26} color={color.palette.white} />
      }} />

      <Drawer.Screen name="logout" component={LogoutScreen} options={{
        drawerLabel: () =>
          <View>
            <Text style={styles.DrawerTextColor}>
              Logout
            </Text>
          </View>,
        drawerIcon: () => <MaterialIcons name='logout' size={26} color={color.palette.white} />
      }} />

    </Drawer.Navigator>
  )
}

const customDrawerContent = (props, username) => {

  const clearLoginKey = async () => {
    try {
      AsyncStorage.clear()
      console.tron.log('Storage successfully cleared!')
    } catch (error) {
      console.tron.log('Failed to clear the async storage.')
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: '90%' }}>

        <DrawerContentScrollView {...props}>
          <View >
            <Image source={require("../../components/images/DrawerLogo.jpg")}
              style={{
                resizeMode: 'contain',
                height: 150,
                width: 275,
                borderColor: color.palette.black,
                borderRadius: 0,
                alignContent: 'center',
              }}

            />
          </View>

          {username !== '' &&
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.drawerText}>{username}</Text>
            </View>
          }

          <TouchableOpacity style={styles.contactUsContainer} onPress={() => props.navigation.navigate('home')}>
            <AntDesign name={'home'} size={35} color={'white'} />
            <Text style={styles.drawerText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactUsContainer} onPress={() => props.navigation.navigate('settings')}>
            <AntDesign name={'contacts'} size={35} color={'white'} />

            <Text style={styles.drawerText}>Settings</Text>
          </TouchableOpacity>
        </DrawerContentScrollView>
      </View>

      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={() => {
          props.navigation.navigate('login');
          clearLoginKey();
        }}>
        <Text style={styles.logoutText}>SIGN OUT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  DrawerTextColor: {
    color: color.text,
    fontWeight: 'bold',
    fontFamily: typography.secondary,
    fontSize: 16
  },
  contactUsContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'center',
    paddingLeft: 15
  },
  logoutContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  welcomeContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40
  },
  drawerText: {
    marginLeft: 16,
    color: 'white',
    fontSize: 18
  },
  welcomeText: {
    marginLeft: 16,
    color: 'white',
    fontSize: 20,
    marginBottom: 10
  },
  logoutText: {
    color: 'white',
    fontSize: 18
  }
}
);