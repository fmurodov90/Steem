import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

const mySecondText = props =>(
    <Text style={styles.text}>{props.children}</Text>
);
const styles=StyleSheet.create({
    text:{color:'red', fontSize:16, fontWeight:'bold',marginVertical:5}
})

export  default mySecondText;
