import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';
import {configure} from './src/components/Notification/PushNotification';
import {checkPermission,createNotificationListeners} from './src/components/Firebase/fbConfig';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

//configure();
checkPermission();
createNotificationListeners();

AppRegistry.registerComponent('www', () => App);
