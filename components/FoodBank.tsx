import {Button, Image, Text, View} from "react-native";
import React from "react";

export default function FoodBank({location,name,distance,imageurl,priority}) {

    return (
        <View style={styles.container}>
            {/* Image */}
            <Image
                style={styles.image}
                source={{uri: imageurl}}/>

            {/* Info */}
            <Text> {name} </Text>
            {/* Description */}
            <Text> {location} </Text>

            {/* Distance and priority */}
            <Text> {distance} meters Priority:{priority}</Text>

            <Button title={"DONATE"}> </Button>
        </View>
    );
}



import {StyleSheet} from "react-native";
const styles = StyleSheet.create({
    container: {
        margin: 20,
    },
    image: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    }
})

