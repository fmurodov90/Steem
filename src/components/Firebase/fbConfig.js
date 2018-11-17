import firebase from 'react-native-firebase';
import {AsyncStorage} from "react-native";


export const  checkPermission = async ()=>{
    try {
        const enabled = await firebase.messaging().hasPermission();
        if (enabled) {
            this.getToken();
        } else {
            this.requestPermission();
        }
    }catch (e) {
        console.log("fcmError Getting Token",e)
    }
};
requestPermission  = async ()=> {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        this.getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
};
getToken = async ()=> {
    try{
        let fcmToken = await AsyncStorage.getItem('fcmToken', value);
        if (!fcmToken) {
            fcmToken = await getToken();
            console.log('fcmtoken',fcmToken);
            if (fcmToken) {
                // user has a device token
                await AsyncStorage.setItem('fcmToken', fcmToken);
            }
        }
    }
    catch (e) {
        console.log('error for getting token',e)
    }
};

export const createNotificationListeners = async ()=>{
    notificationListener();
    notificationOpenedListener();
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
    }
};

export const notificationListener =firebase.notifications().onNotification((notification) => {
    const { title, body } = notification;
    showAlert(title, body);
});
export const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    const { title, body } = notificationOpen.notification;
    showAlert(title, body);
});
const showAlert =(title, body)=> {
    Alert.alert(
        title, body,
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
    );
};
