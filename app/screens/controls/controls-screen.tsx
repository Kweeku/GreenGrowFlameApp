import React, {useState} from "react"
import { Wallpaper} from "../../components";
import { Screen} from "../../components";
import { MaterialIcons} from '@expo/vector-icons';
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color,spacing,typography,} from "../../theme"
import {Header} from "../../components";
import {TextStyle, View, ViewStyle,StyleSheet,Text} from "react-native";
import { Button } from "react-native-elements"
import {Picker} from '@react-native-picker/picker';
// import { Dropdown } from 'react-native-material-dropdown-v2';
import { ScrollView } from "react-native-gesture-handler";

const FULL: ViewStyle = {
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const TITLE_WRAPPER: TextStyle = {
  ...TEXT,
  textAlign: "center",
  fontWeight: "bold",
  marginTop: 20,
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

function ControlsScreen({navigation}) {

  const goBack = () => navigation.navigate("home")
  const [selectedValue, setSelectedValue] = useState("Tomato");
  const DATA =[
    {
    Crop: 'Tomato',   
  },
   { Crop: 'Strawberry'    
   },
  ]

  return(
    <View testID="ControlsScreen" style={FULL}>
  <Wallpaper />

  <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
        headerText="Controls"
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
        titleStyle={HEADER_TITLE}
        />

    <View style={styles.centered}>
      <Text style={TITLE_WRAPPER}>ACTUATIONS</Text>
    </View>
      <View style={styles.hairline}/>
        <Button
            icon={<MaterialIcons name='power-settings-new'  color= {color.palette.white} size={100}/>}
            type="clear"
            style={styles.centered}/>
          <Text style={TITLE_WRAPPER}>CROP</Text> 
          <View style={styles.hairline}/> 
          <View style={styles.dropdown}>
      <Picker
        selectedValue={selectedValue}
        style={styles.Picker}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Tomato" value="Tomato" />
        <Picker.Item label="Strawberry" value="Strawberry" />
      </Picker>
    </View>
      </Screen>
  </View>
      
      

  );
}
const styles= StyleSheet.create({
  hairline: {
    borderBottomColor: color.cloud,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 5,
    // paddingBottom: 30
},
centered: {
  alignItems: 'center',
  justifyContent: 'center'
},
button:{
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 50
},
dropdown:{
  alignItems: 'stretch',
  justifyContent: 'center'

},
Shutdown: {
  flex: 1,
  borderRadius: 8,
  shadowOffset: { width: 0, height: 3 }
},
Picker: {
  color: color.palette.white,
  height:50,
  width: '100%'
},
})
export default ControlsScreen;