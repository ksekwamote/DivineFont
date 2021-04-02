import React , {useEffect , useState} from 'react';
import { View, StyleSheet , Switch } from 'react-native';
import * as Font from "expo-font"
import AppLoading from 'expo-app-loading';
import {changeAdmin} from "../redux/action/actions"
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AntDesign } from '@expo/vector-icons'; 
import {getProfile} from "../App"
import {username , email , theAdmin , getAdmin} from "./SignIn"
import { useNavigation } from '@react-navigation/native';
import {FontAwesome } from '@expo/vector-icons';
import {useFonts} from "expo-font"
import { useDispatch} from "react-redux"
import * as firebase from "firebase"
import { createIconSetFromIcoMoon} from '@expo/vector-icons';

var admin =false;

export {admin}

export default function DrawerContent(props) {

    const [theUser , setUser] = useState(username)
    const dispatch = useDispatch();
    const [isEnabled, setIsEnabled] = useState(true);
    const [admin , setAdmin] = useState(true)

    const toggleSwitch = () => 
    {
            setIsEnabled(previousState => !previousState);
            dispatch(changeAdmin())
         }

   

    var firebaseConfig = {
        apiKey: "AIzaSyAa18AY9FZodtVk4NTvSVQGzmQF0iCkIQw",
        authDomain: "divine-font.firebaseapp.com",
        projectId: "divine-font",
        storageBucket: "divine-font.appspot.com",
        messagingSenderId: "981744332243",
        appId: "1:981744332243:web:c5cc62ec6395a360755326"
      };

      useEffect(() => {
        const unlisten = firebase.auth().onAuthStateChanged(user => {
          var userC = firebase.auth().currentUser;
           if (user){
           
           setAdmin(getAdmin(userC.email))
           }
          },
        );
  
        return () => {
  
         unlisten();
        }
      }); 
    
    
      if(!firebase.apps.length){
          firebase.initializeApp(firebaseConfig)
      }
      else {
          firebase.app()
      }

      function signOut (){
        firebase.auth().signOut().then(() => {
            setUser("user")
          }).then(()=>{
              props.navigation.navigate("SignIn")
          })
          .catch((error) => {
            console.log("Logged pout")
          });
      }
    
  
   
    return(
        <View style={{flex:1}}>

        {firebase.auth().currentUser ?
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={getProfile(username)}
                                size={80}
                            />
                                
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{username}</Title>
                           
                           
                      { admin ?  <Text><Caption style={styles.caption}>Admin</Caption>  <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            /></Text> : <View></View>  }
                            
                          
                             
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Mobile Worship Apparel</Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}></Paragraph>
                                <Caption style={styles.caption}></Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon= {({color, size}) => (
                                <Icon 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cash-multiple" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Sales"
                            onPress={() => {props.navigation.navigate('Sales')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="cart-arrow-down" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Batch"
                            onPress={() => {props.navigation.navigate('Batch')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="jira" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Promotion"
                            onPress={() => {props.navigation.navigate('Promotion')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="shield-lock" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Admin"
                            onPress={() => {theAdmin? props.navigation.navigate('Admin'): alert("This section is for admins only")}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="spotify" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Social" 
                            onPress={() => { theAdmin? props.navigation.navigate('Social'): alert("This section is for admins only")}}
                        />
                        
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>: <Text></Text>}
            
            {firebase.auth().currentUser? <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>: <View></View> }
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });