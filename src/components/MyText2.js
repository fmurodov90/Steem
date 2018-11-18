import  React ,{Component} from 'react';
import {Text, StyleSheet} from 'react-native';

const myText2 = props => (
    <Text style={styles.text}>{props.children}</Text>
);

const styles=StyleSheet.create({
    text:{fontSize:10, color:'#111'}
});
export default myText2;