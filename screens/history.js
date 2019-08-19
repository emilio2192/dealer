import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';

export default class History extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
               <Text>Hola</Text>
            </View>
        );
    }
}
