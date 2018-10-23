import React ,  {Component} from "react";
import {View,WebView,ActivityIndicator,Platform} from 'react-native';

class WebScreen extends Component {
    state = {
        loadingWeb:false
    };
    render(){
        const  {navigation} = this.props;
        const url=navigation.getParam('url');
        return(
            <View style={{flex:1,marginTop: (Platform.OS) === 'ios' ? 20 : 0}}>
                {
                    this.state.loadingWeb &&
                        <View style={{
                            flex:1,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            alignItems:'center',
                            justifyContent:'center'}}>
                            <ActivityIndicator
                                animating
                                size="large"
                                color="red"
                            />
                        </View>
                }
                <WebView
                    source = {{uri:url}}
                    style={{marginTop:20, flex:1}}
                    onLoadStart = {()=>this.setState({loadingWeb:true})}
                    onLoadEnd = {()=>this.setState({loadingWeb:false})}
                />
            </View>
        );
    }
}
export  default WebScreen;

