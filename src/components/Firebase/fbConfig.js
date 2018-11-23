import firebase from 'react-native-firebase';
import {AsyncStorage} from "react-native";


const  checkPermission = async ()=>{
    try {
        const enabled = await firebase.messaging().hasPermission();
        console.log("enabled",enabled);
        if (enabled) {
            getToken();
        } else {
            requestPermission();
        }
    }catch (e) {
        console.log("fcmError Getting Token",e)
    }
};
const requestPermission  = async ()=> {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
};
const getToken = async ()=> {
    try{
        let fcmToken = await AsyncStorage.getItem('fcmToken');
        console.log("storage Token",fcmToken);
        if (!fcmToken) {
            fcmToken = await firebase.messaging().getToken();
            console.log(' Firebase fcmtoken',fcmToken);
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
const createNotificationListeners = async ()=>{
    notificationListener();
    notificationOpenedListener();
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        showAlert(title, body);
    }
};

const notificationListener =firebase.notifications().onNotification((notification) => {
    const { title, body } = notification;
    showAlert(title, body);
});
const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
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
export {checkPermission, createNotificationListeners, getToken};