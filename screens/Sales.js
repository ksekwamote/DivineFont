import React , {useState} from 'react'
import { StatusBar, FlatList, Picker, Modal ,Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, SnapshotViewIOS, Pressable, TextInput, Alert } from 'react-native';
import {sales} from "./Home"
import {theAdmin , username} from "./SignIn"
import * as firebase from "firebase"
import {shirt} from "../assets/image/Shirts"
import Swipeout from 'react-native-swipeout'
import {pickShirt} from "./Home"



export default function Sales({navigation}) {


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

    var orderss =[];





    const [salesRef , setSalesRef] = useState(firebase.database().ref("/Sales"))
    const [ordersRef , setOrdersRef] = useState(firebase.database().ref("/Orders"))
    const scrollY = React.useRef(new Animated.Value(0)).current
    
    salesRef.once('value' , function(snapshot){
      
        snapshot.forEach(element => {
          var key =  element.key;
          var data = element.val();
    
          orderss.push({key:key, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
        });
    })
   
    const [DATA , setData] = useState(sales)



    return (
       
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            
    

            <Image
                source={require("../assets/image/worshipp.jpg")}
                style={StyleSheet.absoluteFillObject}
                blurRadius={50}
            />

            

            <View style={{flex: 1,
      justifyContent:'space-around',
      alignItems: "center",
      marginTop: 80 , flexDirection:'row'  , position: 'relative', marginBottom: 50}}>

           
        <TouchableOpacity style={{
             backgroundColor:"#33AAFF" , 
             width: 50, height:50 ,
             alignItems:'center' ,
              justifyContent:'center',
            
              borderRadius:15 ,
              marginTop:30,
              marginBottom:40,
        
              }}
             onPress={() => navigation.navigate("Home")}
              >
            <Image source={require("../assets/icons/back.png")} />
          </TouchableOpacity>


          <TouchableOpacity style={{
             backgroundColor:"#F3188F" , 
             width: 200 , height:50 ,
             alignItems:'center' ,
              justifyContent:'center',
                flexDirection:'row',
              borderRadius:15 ,
              marginTop:30,
              marginBottom:40
              }}
            
              >
                  <Image source={require("../assets/icons/shopping.png")}/>
            <Text style={{color:"#ffff" , fontSize:15}}>Completed Sales </Text>
          </TouchableOpacity>


           
        
            <TouchableOpacity style={{
           
             width:50  , height:50 ,
             alignItems:'center' ,
              justifyContent:'center',
            
              borderRadius:15 ,
              marginTop:30,
              marginBottom:40,
              }}
             onPress={() => navigation.navigate("Batch")}
              >
          <Image source={require("../assets/icons/batch.png")} />
          </TouchableOpacity>
          

         

          </View>

                
     
            
              


            <Animated.FlatList
                onScroll ={Animated.event(
                    [{nativeEvent: {contentOffset:{y:scrollY}}}],
                    {useNativeDriver: true}
                )}
                data={DATA.reverse()}
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


                    if (theAdmin){

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

                    <Swipeout  style={{borderRadius:12 , height: 110 , marginBottom:SPACING}} 
                    >
                    <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                    
                    
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                            <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                            <Text style={{fontSize:14 , opacity: 0.7}}>Keys: {item.key}</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{item.design}</Text>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{'  '}Fonts: {item.font}</Text>
                            </View>
                            
                           
                        </View>
                    </View>
                    </Swipeout>
                    </Animated.View>
                    </View>
                  
                    )}

                    else if (item.agent == username.trim()){

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
  
                      <Swipeout  style={{borderRadius:12 , height: 110 , marginBottom:SPACING}} 
                      >
                      <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                      
                      
                      }}>
                          <Image source={pickShirt(item.color ,item.font ,item.design)}
                          style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                          resizeMode="contain"
                         />
                          <View>
                              <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                              <Text style={{fontSize:14 , opacity: 0.7}}>Keys: {item.key}</Text>
                              <View style={{flexDirection:'row'}}>
                                  <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{item.design}</Text>
                                  <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{'  '}Fonts: {item.font}</Text>
                              </View>
                              
                             
                          </View>
                      </View>
                      </Swipeout>
                      </Animated.View>
                      </View>
                    
                      )}

                }}


            />
    
    </View>
      
    )
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

