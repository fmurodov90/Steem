import  React ,{Component} from 'react';
import {Text, StyleSheet} from 'react-native';

const myText = props => (
     <Text style={styles.text}>{props.children}</Text>
    );

const styles=StyleSheet.create({
   text:{fontSize:16, color:'blue', fontWeight:'bold',marginVertical:5}
});
export default myText;