import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';
import {configure} from './src/components/Notification/PushNotification';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

configure();

AppRegistry.registerComponent('www', () => App);
