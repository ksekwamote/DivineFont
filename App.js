import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Image, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {SignIn} from "./screens/SignIn"
import Home from "./screens/Home"
import Sales from "./screens/Sales"
import Admin from "./screens/Admin"
import {createStackNavigator} from "@react-navigation/stack"
import { NavigationContainer } from '@react-navigation/native';
import Batch from './screens/Batch';
import Promotion from "./screens/Promotion"

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false, 
      header: null
    }}


    initialRouteName={Home}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Sales" component={Sales} />
      <Stack.Screen name="Batch" component={Batch} />
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="Promotion" component={Promotion}/>
      
    </Stack.Navigator>
    </NavigationContainer>
    
  );
}


