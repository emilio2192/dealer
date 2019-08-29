import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import assigment from '../services/Assignments';
import { AsyncStorage } from 'react-native';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusDelivery: false,
            userStatus: 'false'
        };
    }

    async componentDidMount() {
        const userStatus = await AsyncStorage.getItem('userStatus');
        this.setState({userStatus: userStatus});
        console.log(userStatus);
        if (userStatus === 'true') {
            // assigment.startGetAssignments();
        }
        setTimeout(() => {
            this.props.navigation.navigate('Navigator');
        }, 1000);
    }

    static navigationOptions = {
        header: null,
    };
    changeStatus = async () => {
        if (this.state.userStatus === "true") {
            // assigment.stopGetAssignments();
            await AsyncStorage.setItem('userStatus', 'false');
            this.setState({userStatus: 'true'});
        } else {
            // assigment.startGetAssignments();
            await AsyncStorage.setItem('userStatus', 'true');
            this.setState({userStatus: 'false'});
        }
        console.log(await AsyncStorage.getItem("userStatus"));
        this.setState({userStatus: (this.state.userStatus === "true"? "false" : "true")})
    }
    displayIconStatus = () => {
        if (this.state.userStatus === "true") {
            return [<Text key={'online'}>En linea</Text>,
                <MaterialCommunityIcons key={'powerOn'} name="play-speed" size={45} color="black"
                                        onPress={() => this.changeStatus()}/>];
        } else {
            return [<Text key={'offline'}>Fuera de linea</Text>,
                <AntDesign key={'iconOff'} name="poweroff" size={35} color="black"
                           onPress={() => this.changeStatus()}/>]
        }
    }

    render() {
        
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                {this.displayIconStatus()}
            </View>
        );
    }
}

