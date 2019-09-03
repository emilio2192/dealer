import React from 'react';
import {createBottomTabNavigator, createStackNavigator, TabBarBottom} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import Colors from '../constants/Colors';
import Entypo from '@expo/vector-icons/Entypo';
import History from '../screens/history';
import {ProfileScreen} from "../screens/profile";
import NavigatorScreen from '../screens/NavigatorScreen';

const HomeStack = createStackNavigator({
    Main: HomeScreen,
    Navigator: NavigatorScreen
});
HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = false;
    const routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'Main') {
        tabBarVisible = true
    }
    return {
        tabBarVisible
    }
};

const HistoryStack = createStackNavigator({
    Report: History,
});
HistoryStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = false;
    const routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'Report') {
        tabBarVisible = true
    }
    return {
        tabBarVisible
    }
};

const ProfileStack = createStackNavigator({
    Profile: ProfileScreen
});
ProfileStack.navigationOptions = ({navigation}) => {
    let tabBarVisible = false;
    const routeName = navigation.state.routes[navigation.state.index].routeName
    if (routeName == 'Profile') {
        tabBarVisible = true
    }
    return {
        tabBarVisible
    }
};

const RootStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => {
                    return <Entypo name="home" size={30} color={tintColor}/>;
                },
            })
        },
        History: {
            screen: History,
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => {
                    return <Entypo name="text-document" size={30} color={tintColor}/>;
                },
            })
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: ({navigation}) => ({
                tabBarIcon: ({focused, tintColor}) => {
                    return <Entypo name="user" size={30} color={tintColor}/>;
                },
            })
        }
    },
    {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: Colors.YELLOW,
            inactiveTintColor: Colors.DARK,
            style: {
                backgroundColor: '#F9F9F9',
                height: 70,
                paddingBottom: 15,
                paddingTop: 15,
                borderTopColor: '#F9F9F9'
            }
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
    }
);
export default RootStack;
