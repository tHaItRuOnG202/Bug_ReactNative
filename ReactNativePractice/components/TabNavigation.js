import FriendScreen from './Friend';
import HomeScreen from './Home';
import NotificationScreen from './Notification';
import SettingScreen from './Setting'

export const TabNavigation = [
    {
        id: 1,
        route: HomeScreen,
        name: 'Home',
        activeIconName: 'home',
        activeiconType: 'Entypo',
        inactiveIconName: 'home-outline',
        inactiveIconType: 'MaterialCommunityIcons',
        size: 25,
        unFocusSize: 28,
    },
    {
        id: 2,
        route: FriendScreen,
        name: 'Friends',
        activeIconName: 'people-sharp',
        activeiconType: 'Ionicons',
        inactiveIconName: 'people-outline',
        inactiveIconType: 'Ionicons',
        size: 25,
        unFocusSize: 25,
    },
    {
        id: 3,
        route: NotificationScreen,
        name: 'Notification',
        activeIconName: 'notifications',
        activeiconType: 'Ionicons',
        inactiveIconName: 'notifications-outline',
        inactiveIconType: 'Ionicons',
        size: 25,
        unFocusSize: 25,
    },
    {
        id: 4,
        route: SettingScreen,
        name: 'Setting',
        activeIconName: 'menu',
        activeiconType: 'Ionicons',
        inactiveIconName: 'menu-outline',
        inactiveIconType: 'Ionicons',
        size: 25,
        unFocusSize: 25,
    },
];