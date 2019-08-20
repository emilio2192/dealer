import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image
} from 'react-native';
import Colors from '../../constants/Colors';

export class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('token');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        // setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'Main' : 'Login');
        // }, 2000);
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../../assets/images/logo-splash.png')} />
                <StatusBar barStyle="light-content" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.CIAN
    },
    logo: {
        resizeMode: 'contain',
        width: 200,
        height: 150
    },
});
