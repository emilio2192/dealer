import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import AuthStack from './navigation/Auth';
import {AuthLoadingScreen} from './screens/auth/AuthLoading';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import * as Font from 'expo-font';
import RootStack from './navigation/Main';


const navigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App:RootStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);
const AppContainer = createAppContainer(navigator);
export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            fontLoaded: false
        }
    }


    async componentDidMount() {
        try{
            await Font.loadAsync({
                'roboto-bold': require('./assets/fonts/Roboto/Roboto-Bold.ttf'),
                'roboto-black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
                'roboto': require('./assets/fonts/Roboto/Roboto-Regular.ttf'),
                'roboto-thin': require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
                'roboto-light': require('./assets/fonts/Roboto/Roboto-Light.ttf'),
                'roboto-semibold': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
                'bebas': require('./assets/fonts/bebas_neue/BebasNeue-Regular.ttf'),
            });
            this.setState({fontLoaded: true});
        }catch(e){
            console.log(e);
        }

    }

    render() {
        return (
            this.state.fontLoaded ? (
                <AppContainer
                    ref={nav => {
                        this.navigator = nav;
                    }}
                />
            ) : null
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
