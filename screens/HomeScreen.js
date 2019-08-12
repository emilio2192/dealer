import * as React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';



export default class App extends React.Component {

    static navigationOptions = {
        header: null,
    };

    render() {
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;
        return (
            <View>
                <Text>hola mundo </Text>            
            </View>
        );
    }
}
