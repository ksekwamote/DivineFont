import { StatusBar } from 'expo-status-bar';
import * as Font from "expo-font"
import AppLoading from 'expo-app-loading';
import React, { useState , useEffect } from 'react';
import { Image, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {SignIn} from "./screens/SignIn"
import Home from "./screens/Home"
import Sales from "./screens/Sales"
import Admin from "./screens/Admin"
import Social from "./screens/Social"
import { NavigationContainer } from '@react-navigation/native';
import Batch from './screens/Batch';
import Promotion from "./screens/Promotion"
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import {createDrawerNavigator , DrawerContentScrollView} from "@react-navigation/drawer"
import {username , theAdmin } from "./screens/SignIn"
import DrawerContent from "./screens/DrawerContent"
import * as firebase from "firebase"


var firebaseConfig = {
  apiKey: "AIzaSyAa18AY9FZodtVk4NTvSVQGzmQF0iCkIQw",
  authDomain: "divine-font.firebaseapp.com",
  projectId: "divine-font",
  storageBucket: "divine-font.appspot.com",
  messagingSenderId: "981744332243",
  appId: "1:981744332243:web:c5cc62ec6395a360755326"
};


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
else {
    firebase.app()
}



export const getProfile = user =>{
  if(!firebase.auth().currentUser){
    return require("./assets/image/profile/profile.png")
  }

  if (user =="Kutlo"){
    return require("./assets/image/profile/Kutlo.jpg")
  }
  else if (user=="Cassie"){
    return require("./assets/image/profile/Cassie.jpg")
  }
  else if (user=="Portia"){
    return require("./assets/image/profile/Portia.jpg")
  }
  else if (user=="Phaladi"){
    return require("./assets/image/profile/Phaladi.jpg")
  }
  else {
    return require("./assets/image/profile/profile.png")
  }
}

const Drawer = createDrawerNavigator()

export default function App() {



  const [fontloaded , setFontLoaded] = useState(false)
  const loadFont = () => {
    return Font.loadAsync({
      'material-community': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf')
    })
  }

  if(!fontloaded){
    <AppLoading
      startAsync ={loadFont}
      onFinish = {()=> setFontLoaded(true)}
      onError ={(err)=> console.error(err)}
    
    />
  }

  


  return (
    <NavigationContainer>
      
    <Drawer.Navigator
    drawerContent={ props => <DrawerContent {...props}/> }
    screenOptions={{
      headerShown: true ,
      headerRight:() => <TouchableOpacity style={{paddingRight:10}}>
        <Image style={{width:45 , height:45 , borderRadius:25}} source={ firebase.auth().currentUser ? getProfile(username): require("./assets/image/profile/profile.png")}/>
      </TouchableOpacity> 
    }}
    initialRouteName={Home}
    >
      
      
      <Drawer.Screen name="SignIn" component={SignIn} />
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Sales" component={Sales} />
      <Drawer.Screen name="Batch" component={Batch} />
      <Drawer.Screen name="Admin" component={Admin} /> 
      <Drawer.Screen name="Social" component={Social} /> 
     <Drawer.Screen name="Promotion" component={Promotion}/> 
      
 
      
    </Drawer.Navigator>
    </NavigationContainer>
    
  );
}


