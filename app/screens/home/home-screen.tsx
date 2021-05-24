import React from "react"
import { Screen} from "../../components"
import { Wallpaper} from "../../components";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import {Header} from "../../components";
import {FlatList, TextStyle, View, ViewStyle,Image, ImageBackground} from "react-native"
import { color, spacing } from "../../theme"
import ItemHomeRow from './ItemHome';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Images from "../../components/images/images"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 14,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[2],
}


function HomeScreen({navigation}) {

  const DATA = [
    {
      id: 'Tomato',
      image: Images.tomato,
      sensorVals: { Temperature: 22, Humidity: 55, Water: 23, Light: 10000 }
    },
    {
      id: 'Lettuce',
      image: Images.lettuce,
      sensorVals: { Temperature: 21, Humidity: 75, Water: 50, Light: 8000 }
    },
    {
      id: 'Cabbage',
      image: Images.cabbage,
      sensorVals: { Temperature: 23, Humidity: 35, Water: 33, Light: 11000 }
    },
    {
      id: 'Maize',
      image: Images.maize,
      sensorVals: { Temperature: 23.5, Humidity: 65, Water: 50, Light: 7700 }
    },
    {
      id: 'Cassava',
      image: <MaterialCommunityIcons name='palm-tree' style={{color: '#228B22' }} />,
      sensorVals: { Temperature: 21.5, Humidity: 80, Water: 53, Light: 9700 }
    },
    {
      id: 'Grapes',
      image: Images.grapes,
      sensorVals: { Temperature: 25, Humidity: 14, Water: 23, Light: 1500 }
    },
  ];
  
  const goDrawer = () => navigation.toggleDrawer()

  return(
<View testID="HomeScreen" style={FULL}>
  <Wallpaper />
  <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
        headerText="GreenGrow"
        leftIcon="dots"
        
        onLeftPress={goDrawer}
        style={HEADER}
        titleStyle={HEADER_TITLE}
        />
      <FlatList
      contentContainerStyle={FLAT_LIST}
      data={DATA}
      extraData={DATA}
      showsVerticalScrollIndicator={false}
      // keyExtractor={(item, index) => index.toString()}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item}) => <ItemHomeRow data={item} /> }
      />
  </Screen>
</View>
  )
}

export default HomeScreen;