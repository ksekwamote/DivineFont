import React from 'react'
import { Modal, StyleSheet, Text, View } from 'react-native'

export default function Admodal() {
    return (
        <View>
            <Text></Text>
        </View>
    )
}


export function orderState(props){

    return(
            <Modal
                visible= {props.visible}
                transparent={true}

            >



            </Modal>
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
