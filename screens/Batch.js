import React , {useState , useEffect} from 'react'
import { StatusBar, FlatList, Picker, Modal ,Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, SnapshotViewIOS, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import {sales , dibatch} from "./Home"
import * as firebase from "firebase"
import {shirt} from "../assets/image/Shirts"
import Swipeout from 'react-native-swipeout'
import {pickShirt} from "./Home"

import {diOrder} from "./Home"
import { theAdmin , username } from './SignIn';

export default function Batch({navigation}) {

    const SPACING = 20;
    const AVATAR_SIZE = 70;
    const ITEM_SIZE = AVATAR_SIZE + SPACING*3
    const [ordersRef , setOrdersRef] = useState(firebase.database().ref("/Orders"))
    const [DATA , setData] = useState(diOrder)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
           updateDatabase()
          });

          return unsubscribe;
      }, [navigation]);


    function updateDatabase() {

        var orders =[]
        setOrdersRef(firebase.database().ref("/Orders"))

        ordersRef.once('value' , function(snapshot){
      
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();
        

              orders.push({key:key,tag:data.Tag, cell: data.Cell!=undefined ? data.Cell: ""  ,agent: data.Agent,delivery:data.Delivery ,  batch:data.Batch , quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
            });
        })
        .then(()=> setData(orders))
        //.then(() => diOrder=orders)

      }


    return (
        
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            
    

            <Image
                source={require("../assets/image/worshipp.jpg")}
                style={StyleSheet.absoluteFillObject}
                blurRadius={50}
            />



          <ScrollView>

          <TouchableOpacity style={{
             backgroundColor:"#F3DE18" , 
             width: 200 , height:50 ,
             alignItems:'center' ,
              justifyContent:'center',
                flexDirection:'row',
              borderRadius:15 ,
              marginTop:30,
              marginBottom:10,
              marginLeft:20
              }}
            
              >
                  <Image source={require("../assets/icons/shopping.png")}/>
            <Text style={{color:"#ffff" , fontSize:15}}>Batch 1 - {"21 - 27 March"}  </Text>
          </TouchableOpacity>
                
     
            
              


            <FlatList
                
                data={DATA.reverse()}
                keyExtractor={item => item.key}
                contentContainerStyle={{padding:SPACING ,
                paddingTop: StatusBar.currentHeight || 42}}
                renderItem={({item, index}) =>{

                    
                if (theAdmin){

                    return (
                            item.batch==1  ?
                        <View>



                        <View style={{
                            shadowColor:"#000",
                    shadowOffset: {
                        width:0,
                        height:10
                    },
                    shadowOpacity:0.3,
                    shadowRadius: 20,
                    
                   


                        }}>

               
                    <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                    
                    
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                            <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                            <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                           
                            </View>
                            <Text style={{fontSize:15 , opacity: 0.7}}>Quantity: <Text style={{fontWeight: 'bold'}}>{item.quantity}</Text></Text> 
                            
                        </View>
                    </View>
              
                    </View>
                    </View> : <View></View>
                  
                    )}

                    else if (item.agent == username.trim()){

                        return (
                                item.batch==1  ?
                            <View>
    
    
    
                            <View style={{
                                shadowColor:"#000",
                        shadowOffset: {
                            width:0,
                            height:10
                        },
                        shadowOpacity:0.3,
                        shadowRadius: 20,
                        
                       
    
    
                            }}>
    
                   
                        <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                        
                        
                        }}>
                            <Image source={pickShirt(item.color ,item.font ,item.design)}
                            style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                            resizeMode="contain"
                           />
                            <View>
                                <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                                <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{item.design}</Text>
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{'  '}Fonts: {item.font}</Text>
                                </View>
                                
                            </View>
                        </View>
                  
                        </View>
                        </View> : <View></View>
                      
                        )}



                }}
            />


            <TouchableOpacity style={{
                        backgroundColor:"#18F348" , 
                        width: 200 , height:50 ,
                        alignItems:'center' ,
                        justifyContent:'center',
                            flexDirection:'row',
                        borderRadius:15 ,
                        marginTop:30,
                        marginBottom:10,
                        marginLeft:20
                        }}
            
              >
                  <Image source={require("../assets/icons/shopping.png")}/>
            <Text style={{color:"#ffff" , fontSize:15}}>Batch 2 - {"28 March - 03 April"} </Text>
          </TouchableOpacity>


            <FlatList
                            
                data={DATA.reverse()}
                keyExtractor={item => item.key}
                contentContainerStyle={{padding:SPACING ,
                paddingTop: StatusBar.currentHeight || 42}}
                renderItem={({item, index}) =>{

                   
                    if (theAdmin){
                    return (
                            item.batch==2  ?
                        <View>


                        <View style={{
                            shadowColor:"#000",
                    shadowOffset: {
                        width:0,
                        height:10
                    },
                    shadowOpacity:0.3,
                    shadowRadius: 20,
                    
                   


                        }}>

               
                    <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                    
                    
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                            <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                            <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                            
                            <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                            <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                            </View>

                            <Text style={{fontSize:15 , opacity: 0.7}}>Quantity: <Text style={{fontWeight: 'bold'}}>{item.quantity}</Text></Text> 
                            
                        </View>
                    </View>
              
                    </View>
                    </View> : <View></View>
                  
                    )}

                   else if (item.agent == username.trim()){
                        return (
                                item.batch==2  ?
                            <View>
    
    
                            <View style={{
                                shadowColor:"#000",
                        shadowOffset: {
                            width:0,
                            height:10
                        },
                        shadowOpacity:0.3,
                        shadowRadius: 20,
                        
                       
    
    
                            }}>
    
                   
                        <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                        
                        
                        }}>
                            <Image source={pickShirt(item.color ,item.font ,item.design)}
                            style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                            resizeMode="contain"
                           />
                            <View>
                                <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                                <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                                <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{item.design}</Text>
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{'  '}Fonts: {item.font}</Text>
                                </View>
                                
                            </View>
                        </View>
                  
                        </View>
                        </View> : <View></View>
                      
                        )}
    

                }}
            />

            {/**BATCH 3 */}

            <TouchableOpacity style={{
                        backgroundColor:"#1887F3" , 
                        width: 300 , height:50 ,
                        alignItems:'center' ,
                        justifyContent:'center',
                            flexDirection:'row',
                        borderRadius:15 ,
                        marginTop:30,
                        marginBottom:10,
                        marginLeft:20
                        }}
            
              >
                  <Image source={require("../assets/icons/shopping.png")}/>
            <Text style={{color:"#ffff" , fontSize:15}}>Batch 3 - {"4 - 10 April"}</Text>
          </TouchableOpacity>


        <FlatList
                        
                data={DATA.reverse()}
                keyExtractor={item => item.key}
                
                renderItem={({item, index}) =>{

                if (theAdmin){
                    return (
                            item.batch==3  ?
                        <View>
                        <View>
                    <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                            <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                            <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                           
                            <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                            </View>
                            
                        </View>
                    </View>
                    </View>
                    </View> : <View></View>
                    )}
                    else if (item.agent == username.trim()){
                        return (
                                item.batch==3  ?
                            <View>
                            <View>
                        <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                        }}>
                            <Image source={pickShirt(item.color ,item.font ,item.design)}
                            style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                            resizeMode="contain"
                           />
                            <View>
                                <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                                <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{item.design}</Text>
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{'  '}Fonts: {item.font}</Text>
                                </View>
                                
                            </View>
                        </View>
                        </View>
                        </View> : <View></View>
                        )}

                }}
            />

            <TouchableOpacity style={{
                        backgroundColor:"#AE18F3" , 
                        width: 300 , height:50 ,
                        alignItems:'center' ,
                        justifyContent:'center',
                            flexDirection:'row',
                        borderRadius:15 ,
                        marginTop:30,
                        marginBottom:10,
                        marginLeft:20
                        }}
            
              >
                  <Image source={require("../assets/icons/shopping.png")}/>
            <Text style={{color:"#ffff" , fontSize:15}}>Batch 4 - {"11 - 17 April"}</Text>
          </TouchableOpacity>

                <FlatList
                        
                        data={DATA.reverse()}
                        keyExtractor={item => item.key}
                        contentContainerStyle={{padding:SPACING ,
                        paddingTop: StatusBar.currentHeight || 42}}
                        renderItem={({item, index}) =>{

                        
                        if (theAdmin){
                            return (
                                    item.batch==4  ?
                                <View>
                                <View style={{
                                    shadowColor:"#000",
                            shadowOffset: {
                                width:0,
                                height:10
                            },
                            shadowOpacity:0.3,
                            shadowRadius: 20,
                                }}>     
                            <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                                                      }}>
                                <Image source={pickShirt(item.color ,item.font ,item.design)}
                                style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                                resizeMode="contain"
                            />
                                <View>
                                    <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                                    <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                                    <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                                    </View>
                                    
                                </View>
                            </View> 
                            </View>
                            </View> : <View></View>
                        
                            )}
                            else if (item.agent == username.trim()){
                                return (
                                        item.batch==4  ?
                                    <View>
                                    <View style={{
                                        shadowColor:"#000",
                                shadowOffset: {
                                    width:0,
                                    height:10
                                },
                                shadowOpacity:0.3,
                                shadowRadius: 20,
                                    }}>     
                                <View style={{flexDirection:'row' ,padding: SPACING , marginBottom:SPACING , backgroundColor: "rgba(255,255,240, .7)" , borderRadius:12 ,
                                                          }}>
                                    <Image source={pickShirt(item.color ,item.font ,item.design)}
                                    style={{marginRight: SPACING/2+50, width: AVATAR_SIZE , height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                                    resizeMode="contain"
                                />
                                    <View>
                                        <Text style={{fontSize:22 , fontWeight:'700'}}>{item.buyer}</Text>
                                        <Text style={{fontSize:14 , opacity: 0.7}}>Date: {item.delivery}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{item.design}</Text>
                                            <Text style={{fontSize:12, opacity:0.8 , color:'#0099cc'}}>{'  '}Fonts: {item.font}</Text>
                                        </View>
                                        
                                    </View>
                                </View> 
                                </View>
                                </View> : <View></View>
                            
                                )}

                        }}
            />

        </ScrollView>
    
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

