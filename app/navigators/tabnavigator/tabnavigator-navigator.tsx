import {Image,View} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from "react";
import {HomeNavigator} from "../stack/stack-navigator"
import {StatisticsNavigator} from "../stack/stack-navigator"
import {ControlsNavigator} from "../stack/stack-navigator"
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { color } from "../../theme"
const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeNavigator} 
      options={{tabBarIcon: () => <MaterialIcons name='home' size={26} color= {color.palette.black}/>
        }} />
      <Tab.Screen name="statistics" component = {StatisticsNavigator}
      options={{tabBarIcon: () => <MaterialIcons name='equalizer' size={26} color= {color.palette.black}/>
    }}
      />
      <Tab.Screen name="controls" component={ControlsNavigator} 
      options={{tabBarIcon: () => <MaterialIcons name='tune' size={26} color= {color.palette.black}/>
    }}
      />
    </Tab.Navigator>
  );
}
export default BottomTabNavigator;