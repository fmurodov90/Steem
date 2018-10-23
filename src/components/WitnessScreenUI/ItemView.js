import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity}from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'

class ItemView extends React.Component{
    render(){
        let now = new Date();
        let early= new Date(this.props.fourth);
        let duration = now.getTime()-early.getTime();
        return(
            <View style={styles.content} {...this.props}>
                <View style={styles.content1}>
                    <View style={{width:40, height:40, borderRadius:20, backgroundColor:'blue', alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'white'}}>{this.props.first.toString().slice(0,2)}</Text>
                    </View>
                </View>
                <View style={styles.content2}>
                    <Text style={{color:'black',fontSize:12}}>{this.props.nine+". "+this.props.second.toString().toUpperCase()}</Text>
                    <Text style={{fontSize:11}}>{this.props.third}</Text>
                    <Text style={{fontSize:11}}>{Math.round(duration/(3600*1000))+' hour ago'}</Text>
                </View>
                <View style={styles.content3}>
                    <Text style={{color:'black',fontSize:12}}>{(parseInt(this.props.fifth.toString())/1000000000000000).toFixed(1)+" PV"}</Text>
                    <Text style={{fontSize:11}}>{"v. "+this.props.sixth}</Text>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <FontAwesomeIcon
                            name="warning"
                            size={11}
                        />
                        <Text style={{fontSize:11}}>{this.props.seventh}</Text>
                    </View>
                </View>
                <View style={styles.content4}>
                    <TouchableOpacity onPress={this.props.onClick}>
                        <View style={{width:40, height:40, borderRadius:20 , backgroundColor:'red',alignItems:'center', justifyContent:'center'}}>
                            <Icon
                                name="bell"
                                size={30}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


const  styles=StyleSheet.create({
   content:{flexDirection:'row', borderBottomWidth:1, width:'100%'},
    content1:{width:'20%',alignItems:'center', justifyContent:'center'},
    content2:{width:'38%',alignItems:'center', justifyContent:'center'},
    content3:{width:'22%',alignItems:'center', justifyContent:'center'},
    content4:{width:'20%',alignItems:'center', justifyContent:'center'}

});

export  default ItemView;

