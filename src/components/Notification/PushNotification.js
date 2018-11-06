import PushNotification from 'react-native-push-notification';

export const configure =()=> {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("token:", token);
            },
            onNotification: function (notification) {
                console.log("Notification",notification);
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            popInitialNotification: true,
            requestPermissions: true,
            senderID:"193745023103",
        });
    };
export const localNotification = (witness,id) => {
    PushNotification.localNotification({
        autoCancel: true,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        bigText: "Your Device Id:"+id+".",
        subText: "This is a subText",
        color: "green",
        vibrate: true,
        vibration: 300,
        title: "Steem Monitor",
        message: "You subscribed to "+witness+" witness.",
        playSound: true,
        soundName: 'default',
        actions: '["Accept", "Reject"]',
    });
};