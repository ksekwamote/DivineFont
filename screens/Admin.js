
import React, { useState  , useRef , useEffect} from 'react'
import { StatusBar, Platform , FlatList, Picker, Modal ,Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, SnapshotViewIOS, Pressable, TextInput, Alert } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import {orders , sales } from "./SignIn"
import {shirt} from "../assets/image/Shirts"
import Swipeout from 'react-native-swipeout'
import {pickShirt} from "./Home"
import * as firebase from "firebase"
import DatePicker from 'react-native-datepicker'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Row } from 'native-base';


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
    const [purchasevis , setPurchasevis] = useState(false)  
    const [salesvis , setSalesvis] = useState(false)
    const [orderState , setOrderState] = useState(false)
    const [record  , setRecord]= useState(orders[0])
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

        
 
        const [DATA , setOrders] = useState(updateDatabase2())
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

        function totalPurchase(agent){

          var count=0;

          DATA.forEach((item) =>{

            if (item.agent==agent) count++;

          })

       return count
        }

        function totalSales(agent){
          var count =0;
          sales.forEach((item) =>{

            if (item.agent==agent) count++;

          })

       return count

        }

        function updateDatabase() {

          var orderss =[]
          //setOrdersRef(firebase.database().ref("/Orders"))
      //  const ordersRefs= ;

  
      firebase.database().ref("/Orders").once('value' , function(snapshot){
        
              snapshot.forEach(element => {
                var key =  element.key;
                var data = element.val();
          
                orderss.push({key:key,tag:data.Tag, agent: data.Agent,delivery:data.Delivery ,  batch:data.Batch , quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
              });
          })
  
         setOrders(orderss)


      }

      function updateDatabase2() {

        var orderss =[]
        //setOrdersRef(firebase.database().ref("/Orders"))
    //  const ordersRefs= ;


    firebase.database().ref("/Orders").once('value' , function(snapshot){
      
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();
        
              orderss.push({key:key,tag:data.Tag, agent: data.Agent,delivery:data.Delivery ,  batch:data.Batch , quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
            });
        })

       
       return orderss
        
    }

        function updateTag(item , color){
          ordersRef.child(item.key).update( {
            Tag:color})
            .then(()=>updateDatabase())
            .then(()=>setOrderState(false))
            .then(()=>alert(`${item.buyer}'s Tag color has been changed to ${color}`)) 
            
          }
        function openTag(item){
          setRecord(item)
          setOrderState(true)

        }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
    

            <Image
                source={require("../assets/image/admins.jpg")}
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

          <View style={
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
              marginBottom:35
            }
           }>
          <TouchableOpacity 
            style={{
                width: 200 , height:40,
                 borderRadius:0 ,
                 alignItems:'center',
                 borderColor: "#ffff",
                 borderWidth: 2,
                 justifyContent:'center'

             
               
           }}
             onPress={() => setPurchasevis(true)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Agents Purchases </Text>
          </TouchableOpacity>
          </View>

          <View style={{flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 22,
              marginBottom:15}}>
          <TouchableOpacity 
            style={{
                width: 200 , height:40 ,
                 borderRadius:0 ,
                 alignItems:'center',
                 borderColor: "#ffff",
                 borderWidth: 2,
                 justifyContent:'center'
               
           }}
             onPress={() => setSalesvis(true)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Agents Sales </Text>
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
                              <View style={{flexDirection:'row' , justifyContent: 'space-between'}}>
                            <Text style={{fontSize:22 , fontWeight:'700' }}>{item.buyer}</Text>
                            <TouchableOpacity
                              style={{
                                width:50,
                                height:25,
                                backgroundColor:item.tag,
                                borderRadius:0
                              }}

                              onPress={()=> openTag(item) }
                            >


                            </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row' , justifyContent: 'space-between' , marginTop:5}}>
                            <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                           <Text style={{fontSize:15 , opacity: 0.7}}>{'   '}Agent: <Text style={{fontWeight: 'bold'}}> {item.agent}</Text></Text>
                            </View>
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
            {/** NOTIFICATION MODAL */}
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
           <Modal
              visible={purchasevis}
              animationType= "slide"
              transparent={false}
             
           >
             <View style={styles.centeredView}>

             <Text style={{fontSize: 25 , fontWeight: 'bold'}}>Purchase Order By Agent</Text>

            <View style={{marginTop:20, justifyContent: 'space-between'}}>
              <Text style={{fontSize:20}}>Kutlo:  {totalPurchase("Kutlo")}</Text>
              <Text style={{fontSize:20}}>Cassie:  {totalPurchase("Cassie")}</Text>
              <Text style={{fontSize:20}}>Portia:  {totalPurchase("Portia")}</Text>
              <Text style={{fontSize:20}}>Phaladi:  {totalPurchase("Phaladi")}</Text>
              <Text style={{fontSize:20}}>Mooketsi:  {totalPurchase("Mooketsi")}</Text>
              <Text style={{fontSize:20}}>Wame:  {totalPurchase("Wame")}</Text>
              <Text style={{fontSize:20}}>Master:  {totalPurchase("Master")}</Text>
              <Text style={{fontSize:20}}>Dimpho:  {totalPurchase("Lolo")}</Text>
              <Text style={{fontSize:20}}>Faith:  {totalPurchase("Fatih")}</Text>
              <Text style={{fontSize:20}}>Nelly:  {totalPurchase("Nelly")}</Text>
              <Text style={{fontSize:25 , fontWeight: 'bold'}}>TOTAL:  {DATA.length}</Text>
              
            

            </View>

            <TouchableOpacity 
            style={{
                backgroundColor:"red" , 
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 marginTop:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => setPurchasevis(false)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Close</Text>
          </TouchableOpacity>
           
               
             </View>
            
             

           </Modal>


           <Modal
              visible={salesvis}
              animationType= "slide"
              transparent={false}
             
           >
             <View style={styles.centeredView}>

             <Text style={{fontSize: 25 , fontWeight: 'bold'}}>Sales By Agent</Text>

            <View style={{marginTop:20, justifyContent: 'space-between'}}>
              <Text style={{fontSize:20}}>Kutlo:  {totalSales("Kutlo")}</Text>
              <Text style={{fontSize:20}}>Cassie:  {totalSales("Cassie")}</Text>
              <Text style={{fontSize:20}}>Portia:  {totalSales("Portia")}</Text>
              <Text style={{fontSize:20}}>Phaladi:  {totalSales("Phaladi")}</Text>
              <Text style={{fontSize:20}}>Mooketsi:  {totalSales("Mooketsi")}</Text>
              <Text style={{fontSize:20}}>Wame:  {totalSales("Wame")}</Text>
              <Text style={{fontSize:20}}>Master:  {totalSales("Master")}</Text>
              <Text style={{fontSize:20}}>Dimpho:  {totalSales("Lolo")}</Text>
              <Text style={{fontSize:20}}>Faith:  {totalSales("Fatih")}</Text>
              <Text style={{fontSize:20}}>Nelly:  {totalSales("Nelly")}</Text>
              <Text style={{fontSize:25 , fontWeight: 'bold'}}>TOTAL:  {sales.length}</Text>
              
            

            </View>

            <TouchableOpacity 
            style={{
                backgroundColor:"red" , 
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 marginTop:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => setSalesvis(false)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Close</Text>
          </TouchableOpacity>
           
               
             </View>
           </Modal>

           <View style={styles.centeredView}>
           <Modal
                visible= {orderState}
                transparent={true}

            >

              <View style={styles.centeredView}>
                <View style={styles.modalView}>

              <Text style={{fontSize: 25 , fontWeight: 'bold' , marginBottom:20}}>Purchase Order State</Text>

            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
              <TouchableOpacity 
            style={{
                backgroundColor:"red" , 
                width: 45 , height:45 ,
                 borderRadius:40 ,
                 marginBottom:25,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => updateTag(record , "red")}
              >
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
                backgroundColor:"orange" , 
                width: 45 , height:45 ,
                 borderRadius:40 ,
                 marginBottom:25,
                 marginLeft:30,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => updateTag(record , "orange")}
              >
          </TouchableOpacity>
         </View>
            <View style={{flexDirection:'row' , justifyContent:'center'}}>
              <TouchableOpacity 
            style={{
                backgroundColor:"yellow" , 
                width: 45 , height:45 ,
                 borderRadius:40 ,
                 marginBottom:25,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => updateTag(record , "yellow")}
              >
          </TouchableOpacity>

          <TouchableOpacity 
            style={{
                backgroundColor:"green" , 
                width: 45 , height:45 ,
                 borderRadius:40 ,
                 marginBottom:25,
                 marginLeft:30,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => updateTag(record , "green")}
              >
          </TouchableOpacity>
         </View>
           
          <View style={{flexDirection:'row' , justifyContent:'center'}}>
              <TouchableOpacity 
            style={{
                backgroundColor:"lightblue" , 
                width: 45 , height:45 ,
                 borderRadius:40 ,
                 marginBottom:25,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => updateTag(record , "lightblue")}
              >
          </TouchableOpacity>
          <Text style={{fontSize: 20 , fontWeight: 'bold' ,justifyContent:'center', marginBottom:20}}></Text>
          </View>


          <TouchableOpacity 
            style={{
                backgroundColor:"red" , 
                width: 100 , height:30,
                 borderRadius:15 ,
                 marginBottom:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => setOrderState(false)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Close</Text>
          </TouchableOpacity>

          <Text style={{backgroundColor:"red" , color:"#fff"}}>Red: Delivered / Not Paid </Text>
          <Text style={{backgroundColor:"orange" , color:"#fff"}}>Orange: Not Delivered / Not Paid / Available  </Text>
          <Text style={{backgroundColor:"yellow" , color:"#fff"}}>Yellow: Not Delivered / Paid / Not Available /</Text>
          <Text style={{backgroundColor:"green" , color:"#fff"}}>Green: Not Delivered / Paid / Available </Text>
          
          </View>
        
          </View>

            </Modal>
            </View>

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

        TextInputStyle:{
 
          // Setting up Hint Align center.
          textAlign: 'center',
           
          // Setting up TextInput height as 50 pixel.
          height: 30,
           
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