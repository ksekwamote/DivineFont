
import React, { useState  , useRef , useEffect} from 'react'
import { StatusBar,Platform , FlatList, Picker,BackHandler, Modal ,Image, Animated, Text, View, Dimensions, StyleSheet, TouchableOpacity, Easing, SafeAreaViewBase, SafeAreaView, SnapshotViewIOS, Pressable, TextInput, Alert } from 'react-native';
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

batchesRef.once('value' , function(snapshot){
    
    snapshot.forEach(element => {
      var key =  element.key;
      var data = element.val();

     
      dibatch.push({batch1: data.Batch1,  batch2: data.Batch2 , batch3: data.Batch3 , batch4: data.Batch4})
  
    });
    //console.log(`this has run ${dibatch[0].batch1}`)

  })


export {sales , diOrder , dibatch}


const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING*3;

export default function Home({navigation}) {

    
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
           updateDatabase()
          });

          return unsubscribe;
      }, [navigation]);

      
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => true)
        return () =>
          BackHandler.removeEventListener('hardwareBackPress', () => true)
      }, [])
  
  

    var orderss =[];
    const [ordersRef , setOrdersRef] = useState(firebase.database().ref("/Orders"))
   
    const batchRef =firebase.database().ref("/Batch")
    ordersRef.once('value' , function(snapshot){
      
        snapshot.forEach(element => {
          var key =  element.key;
          var data = element.val();
    
          orderss.push({key:key,tag:data.Tag, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
        });
    })
   

    const [DATA , setData] = useState(orders)
  





    const scrollY = React.useRef(new Animated.Value(0)).current
    const [purchaseVisible , setPurchaseVisible] = useState(false);
    const [updatePurchase , setUpdatePurchase] = useState(false);
    const [user , setUser] = useState(username)
    const [admin , setAdmin] = useState(theAdmin)
    const [record, setRecordUpdate] = useState(DATA[0])
    const [color , setColor] = useState("0")
    const [design , setDesign] = useState("0")
    const [fontColor , setFontColor] = useState("0")
    const [quantity, setQuantity] = useState("0")
    const [size , setSize] = useState("0")
    const [buyer , setBuyer] = useState("0")
    const [cell , setCell] = useState("0")
    const [error, setError] = useState("")
    const [back , setBack] = useState("")
    const [backVisible , setBackVisible]= useState(false)
    const [deliveryDate , setDeliveryDate]= useState(new Date().toJSON().slice(0,10).replace(/-/g,'-'))
    const [batch1 , setBatch1]= useState("")
    const [batch2 , setBatch2]= useState("")
    const [batch3 , setBatch3]= useState("")
    const [batch4 , setBatch4]= useState("")
    const [batchError , setBatchError] = useState("")
    const [batchVisible , setBatchVisible] = useState(false)
    const [orderState , setOrderState] = useState(false)
    const [socialVisible , setSocialVisible] = useState(false)

    const setToZero =()=>{
        setColor("0")
        setDesign("0")
        setFontColor("0")
        setQuantity("0")
        setSize("0")
        setCell("0")
        setError("")
        
    }

    const getBatch =() =>{
        var date  = deliveryDate.split("-")
        const day = parseInt(date[2])
        const month = parseInt(date[1])
        const year = parseInt(date[0])

        
        const b1 = batch1.split("-")
        const b2 = batch2.split("-")
        const b3 = batch3.split("-")
        const b4 = batch4.split("-")
        
        
        if (year==2021 && (month==b1[2] || month==b4[2])){

            if (day>=b1[0] && day<=b1[1]){
                return 1
            }
            else if(day>b2[0] && day<=b2[1]){
                return 2
            }
            else if(day>b4[0] && day<=b4[1]){
                return 3
            }
            else{
                if(day<=b3[2] && month==b4[2])
                     return 4
            }

        }

    }

   


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
        .then(() => diOrder=orders)
      
        
    }


    function updateDatabase2() {

        var orders =[]
        setOrdersRef(firebase.database().ref("/Orders"))

        ordersRef.once('value' , function(snapshot){
      
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();
        
              orders.push({key:key,tag:data.Tag, agent: data.Agent,delivery:data.Delivery ,  batch:data.Batch , quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
            });
        })

      return orders
        
    }

    function updateSalesDatabase() {

        const salesList =[]
        salesRef.once('value' , function(snapshot){
  
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();
          
              salesList.push({key:key, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
            });
          })

          sales = salesList
        
    }

    function updater(item) {

        setUpdatePurchase(true)

        setRecordUpdate(item)

        setColor(item.color.trim())
        setDesign(item.design.trim())
        setFontColor(item.font.trim())
        setQuantity(item.quantity.toString())
        setSize(item.size.trim())
        setBuyer(item.buyer.trim())
        
    }

    {/**Update Batch */}


    function updateBatch(){

        if (batch1 =="" || batch2=="" || batch3=="" || batch4=="" ){

            setBatchError("Fill out all required fields")
        }
        else{
            setBatchError("")
            ordersRef.child("Batches").update({

                Batch1 : batch1,
                Batch2 : batch2,
                Batch3 : batch3,
                Batch4 : batch4

            })
         
            .then(()=> updateBatchDatabase())
            .then(()=> setBatchVisible(false) )
            .then(()=> alert("Batches have been updated"))
        }

    }

    function updateBatchDatabase(){
         var batchess = []

         const batcherefence = firebase.database().ref("/Batch")

         batcherefence.once('value' , function(snapshot){
  
            snapshot.forEach(element => {
              var key =  element.key;
              var data = element.val();

              batchess.push({batch1: data.Batch1,  batch2: data.Batch2 , batch3: data.Batch3 , batch4: data.Batch4})
  
            });

            dibatch = batchess
          })

        

    }

    {/**Purchasing the Order */}

 function purchaseOrder() {

    if (color=="0" || buyer==""|| design=="0" || fontColor=="0" || quantity=="0" || size=="0" ){

        setError("Fill out all Required Fields")
    }
    else{
       
        setError("")

        ordersRef.push({
            Agent:username ,
            Buyer: buyer ,
            Color: color,
            Design:design,
            Font: fontColor,
            Quanitity: parseInt(quantity),
            Size: size,
            Batch: 2,
            Delivery: deliveryDate ,
            Tag: "lightblue"

        })
        .then(()=>updateDatabase())
        .then(() => Alert.alert(
            'Puchase Order has been made',
            `${buyer.trim()}'s order has been created`,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: ()=> console.log("")}
            ],
            { cancelable: false }
          ))
        .then(() => purchaseInvisible())
        .then(() => setToZero())
  
       
    }
     
 }

 function socialOrder() {

    if (color=="0" || cell=="0" || buyer==""|| design=="0" || fontColor=="0" || quantity=="0" || size=="0" ){

        setError("Fill out all Required Fields")
    }
    else{
       
        setError("")

        ordersRef.push({
            Agent:"Social",
            Buyer: buyer ,
            Color: color,
            Design:design,
            Font: fontColor,
            Quanitity: parseInt(quantity),
            Size: size,
            Cell: cell,
            Batch: 2,
            Delivery: deliveryDate ,
            Tag: "lightblue"

        })
        .then(()=>updateDatabase())
        .then(() => Alert.alert(
            'Social Order has been made',
            `${buyer.trim()}'s order has been created`,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: ()=> console.log("")}
            ],
            { cancelable: false }
          ))
        .then(() => purchaseInvisible())
        .then(() => setToZero())
  
       
    }
     
 }

 {/**Updating the Order */}

 function updateOrder() {
    if (color=="0" || buyer==""|| design=="0" || fontColor=="0" || quantity=="0" || size=="0"){

        setError("Fill out all Required Fields")
    }
    else{
        setError("")
        ordersRef.child(record.key).update({
            Buyer: buyer ,
            Color: color,
            Design:design,
            Font: fontColor,
            Quanitity: parseInt(quantity),
            Size: size

        })
        .then(()=>updateDatabase())
        .then(()=>  Alert.alert(
            'Order Updated',
            `${buyer.trim()}'s order has been updated`,
            [
            
              {text: 'OK', onPress: ()=> console.log("")}
            ],
            { cancelable: false }
          ))
        .then(() => updateInvisible())
        

    }
 }

 function addBackDesign(item){
     
     //console.log("Hello   "+ordersRef.child(item.key))

    // console.log("Checking:  "+item.key)
    if (back==""){
        setError("Fill out required field")
    }
    else {

        ordersRef.child(item.key).update( {
                Back:back
            }
        )
        .then(()=>updateDatabase())
        .then(()=>  Alert.alert(
            'Back Design Added',
            `${buyer.trim()}'s order has been updated`,
            [
            
              {text: 'OK', onPress: ()=> console.log("")}
            ],
            { cancelable: false }
          ))
          .then(()=>setBackVisible(false))

    }

 }

 function addToSales(item) {

    salesRef.push({
        Agent:item.agent.trim(),
        Buyer: item.buyer.trim() ,
        Color: item.color.trim(),
        Design:item.design.trim(),
        Font: item.font.trim(),
        Quanitity: item.quantity,
        Size: item.size.trim()
    })
    .then(() => ordersRef.child(item.key).update({
        Batch: 0
    }) )
    .then(() => deleteOrderSales(item))
    .then(()=>  Alert.alert(
        'Order added to sales',
        `${item.buyer.trim()}'s order has been added to Sales `,
        [
          {text: 'OK', onPress: ()=> console.log("")}
        ],
        { cancelable: false }
      ))



     
 }

 function navigateToSales(){

    updateSalesDatabase()
    updateDatabase()
    updateBatchDatabase()
    navigation.navigate("Sales")
 }

 function deleteOrderSales(item) {

    ordersRef.child(item.key).remove()
    .then(()=>updateDatabase())
    .then(()=>updateSalesDatabase())
    
 }

 function deleteOrder(item) {

    ordersRef.child(item.key).remove()
    .then(()=>updateDatabase())
    .then(()=>  Alert.alert(
        'Order Deleted',
        `${item.buyer.trim()}'s order has been deleted`,
        [
          {text: 'OK', onPress: ()=> console.log("")}
        ],
        { cancelable: false }
      ))
      
     
 }





    const adminButtons =(item) =>{

        if (admin){
            return ( [
                {
                text: 'Sold',
                backgroundColor:"#FF33DD",
                onPress: ()=>{addToSales(item)}
              
                } ,
                {
                    text: 'Back',
                    backgroundColor:"#FF337D",
                    onPress: () =>setBackVisibility(item)
                   
                }
            ])

        }
        else {
            return [
                {
                    text: 'Back',
                    backgroundColor:"#FF337D",
                    onPress: () =>setBackVisibility(item)
                }
            ]
        }

    }

    const setBackVisibility =(item)=>
    {
        setBackVisible(true)
        setRecordUpdate(item)


    }
    
    const purchaseInvisible =() =>{
        setPurchaseVisible(!purchaseVisible)
        setToZero()
    }

    const updateInvisible =() =>{
        setUpdatePurchase(!updatePurchase)
        setToZero()
    }

    function signOut(){
        firebase.auth().signOut().then(() => {
           navigation.navigate("SignIn")
          }).catch((error) => {
            // An error happened.
          });
    }


    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            
            {/** BACK DESIGN */}
            <View  style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={backVisible}
                    onRequestClose={()=>{
                        setBackVisible(false)
                    }}
                >
                     <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={{fontWeight:'bold' , fontSize:20}}>Back Design</Text>

                        <TextInput
                                placeholder="Describe Design"
                                underlineColorAndroid="transparent"
                                style={styles.TextInputStyleClass}
                                onChangeText ={(event)=> setBack(event)}
                                
                            ></TextInput>
                                
                        
                        
                                    <Text style={{color:"#00ff00" ,backgroundColor:"#ff0000"}}>{error}</Text>
                            <View style={{flexDirection:'row'}}>

                         
                        <Pressable
                         style={[styles.button , styles.buttonOpen]}
                        onPress={()=> setBackVisible(false)  }
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>

                        <Pressable
                         style={[styles.button , styles.buttonClose]}
                        onPress={()=> addBackDesign(record)}
                        >
                            <Text style={styles.textStyle}>Order</Text>
                        </Pressable>


                        </View>
                        </View>
                        </View>

                   
                </Modal>
            </View>

        

            {/**PURCHASE MODAL */}
           <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={purchaseVisible}
            onRequestClose={()=>{
                setPurchaseVisible(!purchaseVisible)
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={{fontWeight:'bold' , fontSize:20}}>Purchase Order</Text>

                           
                            

     <Picker
        style={styles.picker}
        selectedValue={color}
        onValueChange={col=>setColor(col)}
        mode="dropdown"
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Tshirt Color" value="0" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Navy Blue" value="Navy" />
            <Picker.Item label="Grey" value="Grey" />
            <Picker.Item label="Maroon" value="Maroon" />
            <Picker.Item label="Yellow" value="Yellow" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={design}
        onValueChange={des=>setDesign(des)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Design" value="0" />
            <Picker.Item label="Jesus" value="Jesus" />
            <Picker.Item label="Rooted in Christ" value="Rooted" />
            <Picker.Item label="Keyboard" value="Keys" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={fontColor}
        onValueChange={col=>setFontColor(col)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Font Color" value="0" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Gold" value="Gold" />
    </Picker>

    <View></View>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={quantity}
        onValueChange={qua=>setQuantity(qua)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Quantity" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={size}
        onValueChange={val=>setSize(val)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Size" value="0" />
            <Picker.Item label="Extra Small" value="XS" />
            <Picker.Item label="Small" value="S" />
            <Picker.Item label="Medium" value="M" />
            <Picker.Item label="Larger" value="L" />
            <Picker.Item label="Extra Large" value="XL" />
            <Picker.Item label="XX Larger" value="XXL" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
    </Picker>

            
      

    <TextInput
                                placeholder="Name of Buyer"
                                underlineColorAndroid="transparent"
                                style={styles.TextInputStyleClass}
                                onChangeText ={(event)=> setBuyer(event)}
                                
                            ></TextInput>
                            <Text></Text>

<Text>Date of Delivery: </Text>
    <DatePicker
        style={{width: 150}}
        date={deliveryDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2021-03-01"
        maxDate="2022-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
       onDateChange={(date) => setDeliveryDate(date)}
      />
                                
                        
                        
                                    <Text style={{color:"#00ff00" ,backgroundColor:"#ff0000"}}>{error}</Text>
                            <View style={{flexDirection:'row'}}>

                         
                        <Pressable
                         style={[styles.button , styles.buttonOpen]}
                        onPress={()=> purchaseInvisible()  }
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>

                        <Pressable
                         style={[styles.button , styles.buttonClose]}
                        onPress={()=> purchaseOrder()}
                        >
                            <Text style={styles.textStyle}>Order</Text>
                        </Pressable>

                        </View>

                    </View>

                </View>


            </Modal>
            </View>

            <View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={socialVisible}
            onRequestClose={()=>{
                setPurchaseVisible(!socialVisible)
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={{fontWeight:'bold' , fontSize:20}}> Social Media Order</Text>

                           
                            

     <Picker
        style={styles.picker}
        selectedValue={color}
        onValueChange={col=>setColor(col)}
        mode="dropdown"
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Tshirt Color" value="0" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Navy Blue" value="Navy" />
            <Picker.Item label="Grey" value="Grey" />
            <Picker.Item label="Maroon" value="Maroon" />
            <Picker.Item label="Yellow" value="Yellow" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={design}
        onValueChange={des=>setDesign(des)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Design" value="0" />
            <Picker.Item label="Jesus" value="Jesus" />
            <Picker.Item label="Rooted in Christ" value="Rooted" />
            <Picker.Item label="Keyboard" value="Keys" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={fontColor}
        onValueChange={col=>setFontColor(col)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Font Color" value="0" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Gold" value="Gold" />
    </Picker>

    <View></View>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={quantity}
        onValueChange={qua=>setQuantity(qua)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Quantity" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={size}
        onValueChange={val=>setSize(val)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Size" value="0" />
            <Picker.Item label="Extra Small" value="XS" />
            <Picker.Item label="Small" value="S" />
            <Picker.Item label="Medium" value="M" />
            <Picker.Item label="Larger" value="L" />
            <Picker.Item label="Extra Large" value="XL" />
            <Picker.Item label="XX Larger" value="XXL" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
    </Picker>

            
      

    <TextInput
                                placeholder="Name of Buyer"
                                underlineColorAndroid="transparent"
                                style={styles.TextInputStyleClass}
                                onChangeText ={(event)=> setBuyer(event)}
                                
                            ></TextInput>

<TextInput
                                placeholder="Cell of Buyer"
                                underlineColorAndroid="transparent"
                                style={styles.TextInputStyleClass}
                                onChangeText ={(event)=> setCell(event)}
                                
                            ></TextInput>      
                            <Text></Text>

<Text>Date of Delivery: </Text>
    <DatePicker
        style={{width: 150}}
        date={deliveryDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2021-03-01"
        maxDate="2022-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
       onDateChange={(date) => setDeliveryDate(date)}
      />
                                
                        
                        
                                    <Text style={{color:"#00ff00" ,backgroundColor:"#ff0000"}}>{error}</Text>
                            <View style={{flexDirection:'row'}}>

                         
                        <Pressable
                         style={[styles.button , styles.buttonOpen]}
                        onPress={()=> setSocialVisible(false) }
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>

                        <Pressable
                         style={[styles.button , styles.buttonClose]}
                        onPress={()=> socialOrder()}
                        >
                            <Text style={styles.textStyle}>Order</Text>
                        </Pressable>

                        </View>

                    </View>

                </View>


            </Modal>
            </View>


{/**UPDATE PURCHASE */}
            
<View style={styles.centeredView}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={updatePurchase}
            onRequestClose={()=>{
                setUpdatePurchase(!updatePurchase)
            }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <Text style={{fontWeight:'bold' , fontSize:20}}>Update Order</Text>

                           
                            

     <Picker
        style={styles.picker}
        selectedValue={color}
        onValueChange={col=>setColor(col)}
        mode="dropdown"
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Tshirt Color" value="0" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Navy Blue" value="Navy" />
            <Picker.Item label="Grey" value="Grey" />
            <Picker.Item label="Maroon" value="Maroon" />
            <Picker.Item label="Yellow" value="Yellow" />
            <Picker.Item label="Pink" value="Pink" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={design}
        onValueChange={des=>setDesign(des)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Design" value="0" />
            <Picker.Item label="Jesus" value="Jesus" />
            <Picker.Item label="Rooted in Christ" value="Rooted" />
            <Picker.Item label="Keyboard" value="Keys" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={fontColor}
        onValueChange={col=>setFontColor(col)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Font Color" value="0" />
            <Picker.Item label="White" value="White" />
            <Picker.Item label="Black" value="Black" />
            <Picker.Item label="Gold" value="Gold" />
    </Picker>

    <View></View>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={quantity}
        onValueChange={qua=>setQuantity(qua)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Quantity" value="0" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
    </Picker>

    <Picker
        style={styles.picker}
        mode="dropdown"
        selectedValue={size}
        onValueChange={val=>setSize(val)}
        itemStyle={styles.itemStyle}>
            <Picker.Item label="Select Size" value="0" />
            <Picker.Item label="Extra Small" value="XS" />
            <Picker.Item label="Small" value="S" />
            <Picker.Item label="Medium" value="M" />
            <Picker.Item label="Larger" value="L" />
            <Picker.Item label="Extra Large" value="XL" />
            <Picker.Item label="XX Larger" value="XXL" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
            <Picker.Item label="12" value="12" />
    </Picker>

    <TextInput
                                placeholder={buyer}
                                underlineColorAndroid="transparent"
                                style={styles.TextInputStyleClass}
                                onChangeText ={(event)=> setBuyer(event)}
                                value={buyer}
                            ></TextInput>
                                
                        
                        
                                <Text style={{color:"#00ff00" ,backgroundColor:"#ff0000"}}>{error}</Text>
                            <View style={{flexDirection:'row'}}>

                         <TouchableOpacity>
                        <Pressable
                         style={[styles.button , styles.buttonOpen]}
                        onPress={()=> updateInvisible() }
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <Pressable
                         style={[styles.button , styles.buttonClose]}
                        onPress={()=> updateOrder()}
                        >
                            <Text style={styles.textStyle}>Update</Text>
                        </Pressable>
                        </TouchableOpacity>

                        </View>

                    </View>

                </View>


            </Modal>
            </View>

{/**Order Tag */}

<View style={styles.centeredView}>
           <Modal
                visible= {orderState}
                transparent={true}

            >

              <View style={styles.centeredView}>
                <View style={styles.modalView}>

              <Text style={{fontSize: 25 , fontWeight: 'bold' , marginBottom:20}}>Tag description</Text>
        

          <Text style={{backgroundColor:"red" , color:"#fff"}}>RED: Delivered / Not Paid </Text>
          <Text style={{backgroundColor:"orange" , color:"#fff"}}>ORANGE: Not Delivered / Not Paid / Available  </Text>
          <Text style={{backgroundColor:"yellow" , color:"#fff"}}>YELLOW: Not Delivered / Paid / Not Available /</Text>
          <Text style={{backgroundColor:"green" , color:"#fff"}}>GREEN: Not Delivered / Paid / Available </Text>
          
          <Text style={{backgroundColor:"lightblue" , color:"#fff"}}>LIGHTBLUE: Not Delivered / Not Paid / Not Available </Text>
          
          <TouchableOpacity 
            style={{
                backgroundColor:"red" , 
                width: 100 , height:30,
                 borderRadius:15 ,
                 marginBottom:20,
                 marginTop:20,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => setOrderState(false)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Close</Text>
          </TouchableOpacity>
          </View>
        
          </View>

            </Modal>
            </View>



            <Image
                source={require("../assets/image/worshipp.jpg")}
                style={StyleSheet.absoluteFillObject}
                blurRadius={50}
            />
        <View style={styles.centeredView}>
      
        </View >
            

        
            
            <View style={{
      justifyContent:'space-around',
      alignItems: "center",
      flexDirection:'row' , marginTop:-100 }}>

        

               
              <View>
          <TouchableOpacity 
            style={{
                backgroundColor:"#33AAFF" , 
                width: 200 , height:50 ,
                 borderRadius:15 ,
                 marginBottom:10,
                 justifyContent: 'center',
                 alignItems:'center'
           }}
             onPress={() => setPurchaseVisible(true)}
              >
                  
            <Text style={{color:"#ffff" , fontSize:15}}>Make Purchase Order </Text>
          </TouchableOpacity>
          </View>
          </View>

        
    
            {/**Purchase Orders */}
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

                    if (admin){
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
                    

                    left={

                       adminButtons(item)

                    }
                    right={
                            [
                                {
                                text: 'Update',
                                backgroundColor:"#33AAFF",
                                onPress:() =>updater(item)
                                } ,
                                {
                                    text: 'Delete',
                                    backgroundColor:"#FF334C",
                                    onPress:() => Alert.alert(
                                        'Delete Purchase Order',
                                        `Are you sure you want to delete ${item.buyer.trim()}'s order? `,
                                        [
                                          {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                          {text: 'OK', onPress: ()=> deleteOrder(item)},
                                        ],
                                        { cancelable: false }
                                      )
                                }
                            ]
                    }>
                    <View style={{flexDirection:'row' ,padding: item.agent=="Social" ?  SPACING-10: SPACING , marginBottom:SPACING , backgroundColor: item.agent =="Social" ? "lightblue":"rgba(255,255,240, .7)" , borderRadius:12 ,
                    
                    
                    }}>
                        <Image source={pickShirt(item.color ,item.font ,item.design)}
                        style={{marginRight: SPACING/2+40, width: AVATAR_SIZE, height: AVATAR_SIZE , borderRadius:AVATAR_SIZE}}
                        resizeMode="contain"
                       />
                        <View>
                        <View style={{flexDirection:'row' , justifyContent: 'space-between'}}>
                            <Text style={{fontSize:22 , fontWeight:'700' }}>{item.buyer}</Text>
                            {item.tag!="lightblue" ? <TouchableOpacity
                              style={{
                                width:50,
                                height:25,
                                backgroundColor:item.tag,
                                borderRadius:0
                              }}

                              onPress={()=> setOrderState(true)}
                            >


                            </TouchableOpacity>: <Text></Text>}
                            </View>
                             <View style={{flexDirection:'row' , justifyContent: 'space-between' , marginTop:5}}>
                            <Text style={{fontSize:15 , opacity: 0.7}}>Size: <Text style={{fontWeight: 'bold'}}>{item.size}</Text></Text>
                           { admin ? <Text style={{fontSize:15 , opacity: 0.7}}>{'   '}Agent: <Text style={{fontWeight: 'bold'}}> {item.agent}</Text></Text>:<View></View>}
                            </View>
                            <View style={{flexDirection:'row' , marginTop:5}}>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#ff33c1'}}>Design: {item.design}</Text>
                                <Text style={{fontSize:12, opacity:0.8 , color:'#ff33c1'}}>{'  '}Font: {item.font}</Text>
                            </View>
                            {item.agent=="Social" ?  <Text style={{fontSize:12, opacity:0.8 , color:'#ff33c1'}}>{item.cell}</Text>:<Text></Text> }
                            
                           
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
                        
    
                        left={
    
                           adminButtons(item)
    
                        }
                        right={
                                [
                                    {
                                    text: 'Update',
                                    backgroundColor:"#33AAFF",
                                    onPress:() =>updater(item)
                                    } ,
                                    {
                                        text: 'Delete',
                                        backgroundColor:"#FF334C",
                                        onPress:() => Alert.alert(
                                            'Delete Purchase Order',
                                            `Are you sure you want to delete ${item.buyer.trim()}'s order? `,
                                            [
                                              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                              {text: 'OK', onPress: ()=> deleteOrder(item)},
                                            ],
                                            { cancelable: false }
                                          )
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
                                    <Text style={{fontSize:12, opacity:0.8 , color:'#E318F3'}}>{'  '}Font: {item.font}</Text>
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
