
import React, { useState  , useRef , useEffect} from 'react'
import { StatusBar, Platform , FlatList, Picker, Modal ,Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, SnapshotViewIOS, Pressable, TextInput, Alert } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import {orders } from "./SignIn"
import {shirt} from "../assets/image/Shirts"
import Swipeout from 'react-native-swipeout'
import {pickShirt} from "./Home"
import * as firebase from "firebase"
import DatePicker from 'react-native-datepicker'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowAlert: true ,
        shouldSetBadge: false

    })
})

export default function Admin({navigation}) {

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const [sms , setSms] = useState("")
    const [title , setTitle] = useState("") 
    const [notvisible  , setNotVisible] = useState(false)
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

      async function sendPushNotification(expoPushToken , sms, title)  {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: title,
          body: sms,
          data: { someData: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        })
        .then(() => setNotVisible(false))
        .then(() =>alert("Notification has been sent"))
      }


    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const ITEM_SIZE = AVATAR_SIZE + SPACING*3
    
        var firebaseConfig = {
            apiKey: "AIzaSyAa18AY9FZodtVk4NTvSVQGzmQF0iCkIQw",
            authDomain: "divine-font.firebaseapp.com",
            projectId: "divine-font",
            storageBucket: "divine-font.appspot.com",
            messagingSenderId: "981744332243",
            appId: "1:981744332243:web:c5cc62ec6395a360755326"
          };
        
        
          if(!firebase.apps.length){
              firebase.initialize.App(firebaseConfig)
          }
          else {
              firebase.app()
          }
    9
          if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }
        else {
    
            firebase.app()
            
        }
 
        const [DATA , setOrders] = useState(orders)
        const ordersRef = firebase.database().ref("/Orders")
        const scrollY = React.useRef(new Animated.Value(0)).current

        function updateBatch(item , num){

            ordersRef.child(item.key).update( {
                Batch: num
            })
            .then(()=>Alert.alert(
                `Order has been updated`,
                `${item.buyer}'s Order has been added to Batch ${num}`,
                [
                  {text: 'OK', onPress: ()=> console.log("")}
                ],
                { cancelable: false }
              ))

        }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>

            <Image
                source={require("../assets/image/worshipp.jpg")}
                style={StyleSheet.absoluteFillObject}
                blurRadius={50}
            />

<View style={{
      justifyContent:'space-around',
      alignItems: "center",
      flexDirection:'row' , marginTop:35 }}>

          
           <View>
        <TouchableOpacity style={{
             backgroundColor:"#33AAFF" , 
             width: 50, height:50 ,
              borderRadius:15 ,
              marginBottom:20,
        
              }}
             onPress={() => navigation.navigate("Home")}
              >
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>
          </View>

               
              <View>
          <TouchableOpacity 
            style={{
                backgroundColor:"#DAF7A6" , 
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 marginBottom:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() =>setNotVisible(true)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Notification</Text>
          </TouchableOpacity>
          </View>
          </View>

          <View style={styles.centeredView}>
          <TouchableOpacity 
            style={{
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 alignItems:'center'
               
           }}
             onPress={() => navigation.navigate("Admin")}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Admin </Text>
          </TouchableOpacity>
          </View>

          



            
            <Animated.FlatList
                onScroll ={Animated.event(
                    [{nativeEvent: {contentOffset:{y:scrollY}}}],
                    {useNativeDriver: true}
                )}
                data={DATA}
                keyExtractor={item => item.key}
                contentContainerStyle={{padding:SPACING ,
                paddingTop: StatusBar.currentHeight || 42}}
                renderItem={({item, index}) =>{



                    const inputRange =[
                        -5,
                        0, 
                        ITEM_SIZE *index ,
                        ITEM_SIZE * (index+2)
                    ]
                    const opacityInputRange =[
                        -1,
                        0, 
                        ITEM_SIZE *index,
                        ITEM_SIZE * (index+1)
                    ]

                    const scale = scrollY.interpolate({
                        inputRange ,
                        outputRange: [1,1,1,0]
                    })
                    const opacity = scrollY.interpolate({
                       inputRange: opacityInputRange ,
                        outputRange: [1,1,1,0]
                    })

                    return (
                        <View>
                        <Animated.View style={{
                            shadowColor:"#000",
                    shadowOffset: {
                        width:0,
                        height:10
                    },
                    shadowOpacity:0.3,
                    shadowRadius: 20,
                    opacity,
                    transform:[{scale}]


                        }}>

                    <Swipeout   style={{borderRadius:12 , height: 110 , marginBottom:SPACING}} 
                    
                        left={[
                            {
                                text: 'Batch 3',
                                backgroundColor:"#FF5733",
                                onPress:() =>updateBatch(item ,3)
                            } ,
                            {
                                text: 'Batch 4',
                                backgroundColor:"#FFC300",
                                onPress:() =>updateBatch(item ,4)
                            }


                        ]
                        }
                    right={
                            [
                                {
                                text: 'Batch 1',
                                backgroundColor:"#900C3F",
                                onPress:() =>updateBatch(item,1)
                                } ,
                                {
                                    text: 'Batch 2',
                                    backgroundColor:"#C70039",
                                    onPress:() =>updateBatch(item,2)
                                }
                                
                            ]
                    }>
                    <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                    
                    
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+40, width: AVATAR_SIZE, height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                            <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                            <Text style={{fontSize:18 , opacity: 0.7}}>Size: {item.size}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#E318F3'}}>Design: {item.design}{'     '}</Text>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#E318F3'}}>{'  '}Fonts: {item.font}</Text>
                            </View>
                            
                           
                        </View>
                    </View>
                    </Swipeout>
                    </Animated.View>
                    </View>
                  
                    )
              

                }}


            />
            <Modal
                 animationType="slide"
                 transparent={true}
                 visible= {notvisible}
            >
            <View style={styles.centeredView}>
                <TextInput
                 placeholder="Title"
                 underlineColorAndroid="transparent"
                 style={styles.TextInputStyleClass}
                 onChangeText = {(val) => setTitle(val)}
                ></TextInput>
                <TextInput
                     placeholder="Message"
                     underlineColorAndroid="transparent"
                     style={styles.TextInputStyleClass}
                     onChangeText = {(val) => setSms(val)}
                ></TextInput>
          <TouchableOpacity 
            style={{
                backgroundColor:"#33AAFF" , 
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 marginBottom:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => sendPushNotification(expoPushToken , sms , title)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Send Notification</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
                backgroundColor:"red" , 
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 marginBottom:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => setNotVisible(false)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Close</Text>
          </TouchableOpacity>
          </View>
          </Modal>


        </View>
    )
}



  

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

 


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    TextInputStyleClass:{
 
        // Setting up Hint Align center.
        textAlign: 'center',
         
        // Setting up TextInput height as 50 pixel.
        height: 50,
         
        // Set border width.
         borderWidth: 2,
         
         // Set border Hex Color Code Here.
         borderColor: '#FF5722',
         
         width:200,
        // Set border Radius.
         borderRadius: 10 ,
         
        //Set background color of Text Input.
         backgroundColor : "#FFFFFF",
         marginBottom:10
         
        },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    itemStyle: {
        fontSize: 12,
        height: 50,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    picker: {
        width: 200
      },
    button: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
      margin:5,
      paddingRight:30,
      paddingLeft:30
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });