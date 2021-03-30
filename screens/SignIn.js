
import React, { useState , useEffect } from 'react';
import { Image, Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

  //const app = firebase.initializeApp(firebaseConfig)
  const auth = firebase.auth()
  const db = firebase.database();

const ordersRef= firebase.database().ref("/Orders");
const salesRef = firebase.database().ref("/Sales");

  var orders =[];
  var sales =[];
  var username ="user";
  var email = "";
  var theAdmin = false;


ordersRef.on('value' , function(snapshot){

  
    snapshot.forEach(element => {
      var tagg = "lightblue";
      var key =  element.key;
      var data = element.val();

  
   

      orders.push({key:key, agent: data.Agent, tag:data.Tag,  batch:data.Batch , quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
    });
})

salesRef.once('value' , function(snapshot){
  
  snapshot.forEach(element => {
    var key =  element.key;
    var data = element.val();

    sales.push({key:key, agent: data.Agent, quantity:data.Quanitity , buyer: data.Buyer ,color: data.Color ,design:data.Design , size: data.Size , font: data.Font})
  });
})



export {orders , ordersRef , sales , username , theAdmin }

export const firebaseData = () =>{

  


}

  export default{
    db:db ,
    auth:auth
  }


export function SignIn({navigation}) {

    const [user , setUser] = useState("ksekwamote@gmail.com")
    const [pass , setPass] = useState("")
    const [password , showPassword] = useState(false)

    const getAdmin= (emails) =>{
      if (emails == "ksekwamote@gmail.com" || emails == "paulssie.cp@gmail.com"){
   
       return true
   
      }
      else {
        return false
      }
   }
   
   const getUsername = (emails) =>{
   
         switch (emails) {
           case "ksekwamote@gmail.com":
             return "Kutlo"
           case "paulssie.cp@gmail.com":
             return "Cassie" 
          case "emmaxtido@gmail.com":
            return "Mooketsi"
          case "poslekobane@gmail.com":
            return "Portia"
          case "kaonephaladi@gmail.com":
            return "Phaladi"
          case "wamebogosi@gmail.com":
            return "Wame"
          case "dimphobaruti554@gmail.com":
            return "Dimpho"
          case "nellyseane@mobileworship.com":
            return "Nelly"
          case "master@mobileworship.com":
            return "Master"
          case "faith@mobileworship.com":
            return "Faith"
          case "oratilelebani@mobileworship.com":
            return "Lolo"
           default:
             return ""
         }
   
   }
   
   
   function getAdminUser(emails){
    // console.log("User Level: "+emails+"   Admin: "+getAdmin(emails))
       username = getUsername(emails)
       theAdmin = getAdmin(emails)
       email = emails
   }



    function loginUser(email , password) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(()=>{

           return firebase.auth().signInWithEmailAndPassword(email , password)
          })
          .then(() => getAdminUser(email))
          .then((res) => navigation.navigate("Home"))
          .catch(err => alert("Password or Email is incorrect")) 
          
    }

    
    useEffect(() => {
      const unlisten = firebase.auth().onAuthStateChanged(user => {
        var userC = firebase.auth().currentUser;
         if (user){
          console.log(`This user is logged in:  ${userC.email}`)
          getAdminUser(userC.email)
          navigation.navigate("Home")
         }
        },
      );

      return () => {

       unlisten();
       
      }

    }); 






  

    return (
        <View style={styles.container}>
         
               

        <View style={{top: -80}}>
        <Image style={{height:200 , width:300}} source={require("../assets/image/halo.png")} />
       
        </View>
    
        <View style={{top:-70 }}>
          {/**Username */}
          <View>
          <Text style={{fontSize:25 , fontWeight:'bold'}} >Username</Text>
        <Picker
          selectedValue={user}
          style={{width:145}}
          onValueChange={user => setUser(user)}
        
        >
    
          <Picker.Item  label="Kutlo" value="ksekwamote@gmail.com" />
          <Picker.Item label="Cassie" value="paulssie.cp@gmail.com" />
          <Picker.Item label="Portia" value="poslekobane@gmail.com"/>
          <Picker.Item label="Mooketsi" value="emmaxtido@gmail.com"/>
          <Picker.Item label="Phaladi" value="kaonephaladi@gmail.com"/>
          <Picker.Item label="Wame" value="wamebogosi@gmail.com"/>
          <Picker.Item label="Dimpho" value="dimphobaruti554@gmail.com"/>
          <Picker.Item label="Lolo" value="oratilelebani@mobileworship.com"/>
          <Picker.Item label="Master" value="master@mobileworship.com"/>
          <Picker.Item label="Faith" value="faith@mobileworship.com"/>
          <Picker.Item label="Nelly" value="nellyseane@mobileworship.com"/>
    
    
        </Picker>
    
    
         </View>
    
         
          {/**Password */}
          <View style={{paddingTop:10}}>
    <Text style={{fontSize:25 , fontWeight:'bold'}} >Password</Text>
            <View style={{alignItems:'center' , flexDirection: 'row'}}>
         <TextInput 
         
         style={{
           fontSize:20 ,
           paddingTop:10,
           
         
         }}
         secureTextEntry={!password}
         onChangeText= {pass => setPass(pass)}
         onChange={pass => setPass(pass)}
         placeholder="Enter Password" />
         <TouchableOpacity
                style={{marginLeft:50}}
            onPress={() => showPassword(!password)}
         >
             <Image style={{width:25, height:25}} source={ password ?   require("../assets/icons/eye.png") : require("../assets/icons/disable_eye.png") }/>
         </TouchableOpacity>
         </View>
         </View>
    
          <TouchableOpacity style={{
             backgroundColor:"#33AAFF" , 
             width: 200 , height:50 ,
             alignItems:'center' ,
              justifyContent:'center',
              borderRadius:15 ,
              marginTop:20
              }}
             onPress={() => loginUser(user , pass)}
              >
            <Text style={{color:"#ffff" , fontSize:20}}>SignIn </Text>
          </TouchableOpacity>
    
          </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
     
    },
  });
