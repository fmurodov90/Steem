import React, {Component} from 'react';
import {View,Text, StyleSheet}from 'react-native'
import MyText1 from './MyText1';
import MyText2 from './MyText2';


export default class MyView extends Component{
    render(){
        let now = new Date();
        let sbd_usd_update = new Date(this.props.sbd_usd_update);
        let sbd_btc_update = new Date(this.props.sbd_btc_update);
        let steem_usd_update = new Date(this.props.steem_usd_update);
        let steem_btc_update = new Date(this.props.steem_btc_update);

        let duration1 = Math.round(((now.getTime()-sbd_usd_update.getTime())/(60*1000)).toFixed(2));
        let duration2 = Math.round(((now.getTime()-sbd_btc_update.getTime())/(60*1000)).toFixed(2));
        let duration3 = Math.round(((now.getTime()-steem_usd_update.getTime())/(60*1000)).toFixed(2));
        let duration4 = Math.round(((now.getTime()-steem_btc_update.getTime())/(60*1000)).toFixed(2));
        return (
            <View>
                <View style={styles.row}>
                    <View style={styles.column1}><Text/></View>
                    <View style={styles.column2}><Text/></View>
                    <View style={styles.column3}><MyText1>Price</MyText1></View>
                    <View style={styles.column4}><MyText1>Change %</MyText1></View>
                    <View style={styles.column5}><MyText1>Last update</MyText1></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column1}><MyText1>SBD</MyText1></View>
                    <View style={styles.column2}><MyText1>USD</MyText1></View>
                    <View style={styles.column3}><MyText2>{this.props.sbd_usd_price.toFixed(10)}</MyText2></View>
                    <View style={styles.column4}><MyText2>{this.props.sbd_usd_change.toFixed(5)}</MyText2></View>
                    <View style={styles.column5}><MyText2>{duration1+" minute ago"}</MyText2></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column1}><Text/></View>
                    <View style={styles.column2}><MyText1>BTC</MyText1></View>
                    <View style={styles.column3}><MyText2>{this.props.sbd_btc_price.toFixed(10)}</MyText2></View>
                    <View style={styles.column4}><MyText2>{this.props.sbd_btc_change.toFixed(5)}</MyText2></View>
                    <View style={styles.column5}><MyText2>{duration2+" minute ago"}</MyText2></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column1}><MyText1>STEEM</MyText1></View>
                    <View style={styles.column2}><MyText1>USD</MyText1></View>
                    <View style={styles.column3}><MyText2>{this.props.steem_usd_price.toFixed(10)}</MyText2></View>
                    <View style={styles.column4}><MyText2>{this.props.steem_usd_change.toFixed(5)}</MyText2></View>
                    <View style={styles.column5}><MyText2>{duration3+" minute ago"}</MyText2></View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column1}><Text/></View>
                    <View style={styles.column2}><MyText1>BTC</MyText1></View>
                    <View style={styles.column3}><MyText2>{this.props.steem_btc_price.toFixed(10)}</MyText2></View>
                    <View style={styles.column4}><MyText2>{this.props.steem_btc_change.toFixed(5)}</MyText2></View>
                    <View style={styles.column5}><MyText2>{duration4+" minute ago"}</MyText2></View>
                </View>
            </View>
        );
    }
};


const styles=StyleSheet.create({
    row:{flexDirection:"row",width:"100%",borderBottomWidth:0.5,borderColor:"#BBB",paddingVertical:3},
    column1:{width:"15%",alignItems:"center"},
    column2:{width:"15%",alignItems:"center"},
    column3:{width:"30%",alignItems:"center"},
    column4:{width:"20%",alignItems:"center"},
    column5:{width:"20%",alignItems:"center"}
});