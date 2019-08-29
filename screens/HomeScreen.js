import * as React from 'react';
import {Dimensions, Text, View} from 'react-native';
import AlertAsync from "react-native-alert-async";
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import assigment from '../services/Assignments';
import { AsyncStorage } from 'react-native';


export default class HomeScreen extends React.Component {
    
    constructor(props) {
        const _isMount = false;
        super(props);
        this.state = {
            statusDelivery: false,
            userStatus: 'false'
        };
    }

    async componentDidMount(){
        const userStatus = await AsyncStorage.getItem('userStatus');
        this.setState({userStatus: userStatus});

        const assignmentId = await AsyncStorage.getItem("assignment");
        console.log('assignment', assignmentId);
        if(assignmentId !== null){
            const confirmedAssignment = await AsyncStorage.getItem("confirmedAssignment");
            if(confirmedAssignment===null || confirmedAssignment === 'false'){
                this.confirmedAlert();
            }else{
                // send to screen
                // this.props.navigation.navigate('History');
            }

        }
        setTimeout(() => {
            this.props.navigation.navigate('Navigator');
        }, 1000);
    }


    static navigationOptions = {
        header: null,
    };
    changeStatus = async () => {

        const assignmentId = await AsyncStorage.getItem("assignment");
        const confirmedAssignment = await AsyncStorage.getItem("confirmedAssignment");
        if(assignmentId !== null){
            await AsyncStorage.setItem('userStatus', 'true');
            assigment.connectMessenger();
            if(confirmedAssignment===null || confirmedAssignment==='false'){
                this.confirmedAlert();
            }else{
                return;
            }
        }
        if (this.state.userStatus === "true") {
            assigment.disconnectMessenger();
            assigment.stopGetAssignments();
            await AsyncStorage.setItem('userStatus', 'false');
            this.setState({userStatus: 'true'});
        } else {
            assigment.connectMessenger();
            assigment.startGetAssignments();
            await AsyncStorage.setItem('userStatus', 'true');
            this.setState({userStatus: 'false'});
        }
        console.log(await AsyncStorage.getItem("userStatus"));
        this.setState({userStatus: (this.state.userStatus === "true"? "false" : "true")})
    }
    displayIconStatus = () => {
        if (this.state.userStatus === "true") {
            return [<Text key={'online'}>En linea</Text>,
                <MaterialCommunityIcons key={'powerOn'} name="play-speed" size={50} color="black"
                                        onPress={() => this.changeStatus()}/>];
        } else {
            return [<Text key={'offline'}>Fuera de linea</Text>,
                <AntDesign key={'iconOff'} name="poweroff" size={50} color="black"
                           onPress={() => this.changeStatus()}/>]
        }
    }

    confirmedAlert = async () => {
        const message = 'Desea realizar asignación?';
        const choice = await AlertAsync(
            'Confirmar',
            message,
            [
                {text: 'Aceptar', onPress: () => Promise.resolve(true)},
                {text: 'No', onPress: () => Promise.resolve(false)},
            ],
            {
                cancelable: false,
                onDismiss: () => Promise.resolve(false),
            },
        );
        if(choice){
            await AsyncStorage.setItem('confirmedAssignment', 'true');
            // send to screen
            // this.props.navigation.navigate('History');
        }
        assigment.confirm(choice);
    }

    render() {
        
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                {this.displayIconStatus()}
            </View>
        );
    }
}

