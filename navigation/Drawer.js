import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Drawer() {
    return (
        <View>
            <Text></Text>
            { theAdmin ? <Drawer.Screen name="Admin" component={Admin} /> : <View></View>}
     { theAdmin ? <Drawer.Screen name="Social" component={Social} /> : <View></View>}
     { theAdmin ? <Drawer.Screen name="Promotion" component={Promotion}/> :<View></View>}
        </View>
    )
}

const styles = StyleSheet.create({})
