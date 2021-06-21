import * as React from 'react';
import { Image, View, useWindowDimensions, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
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

  const getLoginKey = React.useCallback(async () => {
    try {
      isLoggedIn = await AsyncStorage.getItem('@isLoggedIn') || 'none';
    } catch (error) {
      console.tron.log("Error retrieving data" + error);
    }
  }, [AsyncStorage])

  React.useEffect(() => {
    getLoginKey();
  }, [getLoginKey]
  )
  console.tron.log(isLoggedIn)

  if (isLoggedIn === 'true') {
    return (
      <Drawer.Navigator
        drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
        drawerStyle={{
          backgroundColor: "#281B34"
        }}
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
        <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{
          drawerLabel: () =>
            <View>
              <Text style={styles.DrawerTextColor}>
                Login
              </Text>
            </View>,
          drawerIcon: () => <MaterialIcons name='login' size={26} color={color.palette.white} />
        }}
        />
        <Drawer.Screen name="SettingsScreen" component={SettingsScreen} options={{
          drawerLabel: () =>
            <View>
              <Text style={styles.DrawerTextColor}>
                Settings
              </Text>
            </View>,
          drawerIcon: () => <MaterialIcons name='settings' size={26} color={color.palette.white} />
        }} />
        <Drawer.Screen name="LogoutScreen" component={LogoutScreen} options={{
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
  } else if (isLoggedIn !== 'true') {
    return (
      <Drawer.Navigator
        drawerType={dimensions.width >= 768 ? 'permanent' : 'front'}
        drawerStyle={{
          backgroundColor: "#281B34"
        }}>
        <Drawer.Screen name="LoginScreen" component={LoginScreen} options={{
          drawerLabel: () =>
            <View>
              <Text style={styles.DrawerTextColor}>
                Login
              </Text>
            </View>,
          drawerIcon: () => <MaterialIcons name='login' size={26} color={color.palette.white} />
        }}
        />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  DrawerTextColor: {
    color: color.text,
    fontWeight: 'bold',
    fontFamily: typography.secondary,
    fontSize: 16
  },
}
);