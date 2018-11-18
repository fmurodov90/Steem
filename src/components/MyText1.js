import  React ,{Component} from 'react';
import {Text, StyleSheet} from 'react-native';

const myText1 = props => (
    <Text style={styles.text}>{props.children}</Text>
);

const styles=StyleSheet.create({
    text:{fontSize:12, color:'blue', fontWeight:'bold'}
});
export default myText1;