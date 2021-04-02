
import React, { useState  , useRef , useEffect} from 'react'
import { StatusBar,Platform , FlatList, Picker, Modal ,Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, SnapshotViewIOS, Pressable, TextInput, Alert } from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker'
import Constants from 'expo-constants';
import {orders , theAdmin , username } from "./SignIn"
import {shirt} from "../assets/image/Shirts"
import Swipeout from 'react-native-swipeout'
import * as firebase from "firebase"
import DatePicker from 'react-native-datepicker'
import * as Notifications from 'expo-notifications';





faker.seed(10);

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowAlert: true ,
        shouldSetBadge: false

    })
})

export const pickShirt =(color , font ,design) =>{

    color = color.trim();
    font = font.trim();
    design = design.trim();

    var code=0;


    /**DESIGNS*/
    const jesus = 1
    const keys = 2
    const rooted =3

    /**FONTS */
    const fontWhite1 =3   //Black & Navy
    const fontWhite2 =6   // Pink and Maroon

    const fontGold1 = 0  //Black & Navy
    const fontGold2 = 3  //Grey , Pink and Maroon

    const fontBlack = 0 

    /**T-SHIRT COLOR  */

    const shirtBlack = 0
    const shirtGrey = 6
    const shirtMaroon= 12
    const shirtNavy = 21
    const shirtPink = 27
    const shirtWhite =36
    const shirtYellow =42

    switch(design){
        case "Jesus":
            code = code +jesus;
            break;
        case "Keys":
            code = code+ keys;
            break;
        case "Rooted":
            code = code + rooted;
            break;
        case "Prayer":
            return require("../assets/image/prayer.jpg")
        default:
            return require("../assets/image/custom.jpg")
    }

    switch(color){
        case "Black":
            code= code+shirtBlack;
            break;
        case "Grey":
            code = code+shirtGrey;
            break;
        case "Maroon":
            code = code+shirtMaroon
            break;
        case "Navy":
            code = code+ shirtNavy;
            break;
        case "Pink":
            code = code + shirtPink;
            break;
        case "White":
            code = code + shirtWhite;
            break;
        case "Yellow":
            code = code + shirtYellow;
            break
        default:
             return require("../assets/image/custom.jpg")
    }

    if(font=="White" && (color=="Black"|| color=="Navy")){
        code = code + fontWhite1
    }
    else if(font=="White" && (color=="Pink"|| color=="Maroon")){
        code = code + fontWhite2
    }
    else if (font=="Gold" &&(color=="Black" || color=="Navy")){
        code = code + fontGold1
    }
    else if(font=="Gold" && (color=="Pink"|| color=="Pink" || color=="Maroon" || color == "White" || color == "Grey")){
        code = code + fontGold2
    }
    else if (font=="Black"){
        code = code + fontBlack
    }
    else { code=code}

   
return shirt(code)

}



const Order = () =>{
    const [color , setColor] = useState("Pink")

    return(
        <View style={styles.centeredView}>
              

        </View>
    )
}


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

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}
else {
    firebase.app()
}

const salesRef = firebase.database().ref("/Sales")
const orderRef = firebase.database().ref("/Orders")
const batchesRef = firebase.database().ref("/Batch")

var sales =[];
var diOrder=[];
var dibatch =[]


salesRef.once('value' , function(snapshot){
  
    snapshot.forEach(element => {
      var key =  element.key;
      var data = element.val();
  
      sales.push({key:key, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
    });
  })

  orderRef.once('value' , function(snapshot){
  
    snapshot.forEach(element => {
      var key =  element.key;
      var data = element.val();

      diOrder.push({key:key, agent: data.Agent,delivery:data.Delivery ,  batch:data.Batch , quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
    });
})



export {sales , diOrder , dibatch}


const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING*3;

export default function Social({navigation}) {

    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
           updatePromo()
          });

          return unsubscribe;
      }, [navigation]);
  
  

    var orderss =[];
    const [ordersRef , setOrdersRef] = useState(firebase.database().ref("/Orders"))
    const [promoref , setPromoRef] = useState (firebase.database().ref("/Promotion"))
    const batchRef =firebase.database().ref("/Batch")
    ordersRef.once('value' , function(snapshot){
      
        snapshot.forEach(element => {
          var key =  element.key;
          var data = element.val();
    
          orderss.push({key:key,tag:data.Tag, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
        });
    })
   


    const [PROMO , setPromo] = useState()





    const scrollY = React.useRef(new Animated.Value(0)).current

    const [admin , setAdmin] = useState(theAdmin)
    const [count  , setCount] = useState(0)
 
   
    
    const setToZero =()=>{
        setColor("0")
        setDesign("0")
        setFontColor("0")
        setQuantity("0")
        setSize("0")
        setError("")
        
    }

   

    function getPromoDatabase() {

        var orders =[]
        setOrdersRef(firebase.database().ref("/Orders"))

      ordersRef.once('value' , function(snapshot){
      
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();
        
              orders.push({key:key,tag:data.Tag, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
           
             });
        })

       // setData(orders)
        //diOrder = orders

        return orders
        
    }

    function deletePromo(item){

        promoref.child(item.key).remove()
        .then(()=>updateDatabase())
        .then(()=>updatePromo())
        .then(()=>updateSalesDatabase())

    }

    function updatePromo(){

        var orders =[]
        setOrdersRef(firebase.database().ref("/Orders"))

        ordersRef.once('value' , function(snapshot){
      
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();

              if (data.Agent =="Social"){

                setCount(count+ data.Quanitity)

              orders.push({key:key,tag:data.Tag, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
              
            }
            });
        })

       // setData(orders)
        //diOrder = orders

        setPromo(orders)
            
        

    }

    function addPromoToSales(item){

        salesRef.push({
         
            Buyer: item.buyer.trim() ,
            Color: item.color.trim(),
            Design:item.design.trim(),
            Font: item.font.trim(),
            Quanitity: item.quantity,
            Size: item.size.trim() ,
            Agent: "Promo"
        })
        .then(() => deletePromo(item))
        .then(()=>  Alert.alert(
            'Order added to sales',
            `${item.buyer.trim()}'s order has been added to Sales `,
            [
              {text: 'OK', onPress: ()=> console.log("")}
            ],
            { cancelable: false }
          ))
    

    }

    function promoSale(){

    }









    const adminButtons =(item) =>{

        if (admin){
            return ( [
                {
                text: 'Social',
              
              
                } ,
             
            ])

        }

    }


    


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            
         
        

{/**Order Tag */}





            <Image
                source={require("../assets/image/green.jpg")}
                style={StyleSheet.absoluteFillObject}
                blurRadius={0}
            />
        <View style={styles.centeredView}>
      
        </View >
        
            {/**Purchase Orders */}
            <Animated.FlatList
                onScroll ={Animated.event(
                    [{nativeEvent: {contentOffset:{y:scrollY}}}],
                    {useNativeDriver: true}
                )}
                data={PROMO}
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

                  
                    <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                    
                    
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+40, width: AVATAR_SIZE, height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                        <View style={{flexDirection:'row' , justifyContent: 'space-between'}}>
                            <Text style={{fontSize:22 , fontWeight:'700' }}>{item.buyer}</Text>
                         
                            </View>
                             <View style={{flexDirection:'row' , justifyContent: 'space-between' , marginTop:5}}>
                            <Text style={{fontSize:15 , opacity: 0.7}}> Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                            <Text style={{fontSize:15 , opacity: 0.7}}>{'   '}Color: <Text style={{fontWeight: 'bold'}}> {item.color}</Text></Text>
                            </View>
                            <View style={{flexDirection:'row' , marginTop:5}}>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#ff33c1'}}>Design: {item.design}</Text>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#ff33c1'}}>{'  '}Font: {item.font}</Text>
                            </View>
                            
                           
                        </View>
                    </View>
                    
                    </Animated.View>
                    </View>
                  
                    )

                  
              

                }}


            />
    
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
