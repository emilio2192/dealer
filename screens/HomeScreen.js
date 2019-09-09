import * as React from 'react';
import {AsyncStorage, Text, View} from 'react-native';
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import assigment from '../services/Assignments';
import AlertAsync from "react-native-alert-async";

export default class HomeScreen extends React.Component {

    constructor(props) {
        const _isMount = false;
        super(props);
        this.state = {
            statusDelivery: false,
            userStatus: 'false',
            interval: null
        };
    };

    async componentDidMount() {
        const userStatus = await AsyncStorage.getItem('userStatus');

        if (userStatus === null) {
            await AsyncStorage.setItem('userStatus', 'false');
            this.setState({userStatus: 'false'});
        }
        if (userStatus === 'false') {
            this.stopAssignment();
        } else {
            await AsyncStorage.setItem('userStatus', 'true');
            clearInterval(this.state.interval);
            this.setState({interval:null});
            this.startGetAssignments();
        }
        this.setState({userStatus});
    };

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
    };

    static navigationOptions = {
        header: null,
    };
    changeStatus = async () => {

        if (this.state.userStatus === "true") {
            assigment.connectMessenger();
            await AsyncStorage.setItem('userStatus', 'false');
            this.setState({userStatus: 'false'});
            this.stopAssignment();
        } else {
            assigment.disconnectMessenger();
            await AsyncStorage.setItem('userStatus', 'true');
            this.startGetAssignments();
            this.setState({userStatus: 'true'});
        }

    };

    startGetAssignments = () => {
        const interval = setInterval(async () => {
            console.log('ASSIGNMENT ++++++++++++');
            const assignmentId = await AsyncStorage.getItem("assignment");
            const confirmedAssignment = await AsyncStorage.getItem("confirmedAssignment");
            if((assignmentId !== null || assignmentId) && (confirmedAssignment !== null || confirmedAssignment === 'true')){
                clearInterval(this.state.interval);
                this.props.navigation.navigate('Navigator');
                return ;
            }

            // if ((assignmentId !== null || assignmentId) && (confirmedAssignment !== null || confirmedAssignment === 'false')) {
            //     console.log('inside', (assignmentId === null || assignmentId) );
            //     return;
            // }

            const response = await assigment.startGetAssignments();
            console.log('response assignment =======>', response);
            if (typeof response.assignment !== 'undefined') {
                console.log('inside of if' + typeof response.assignment);
                console.log('************** assignmentID  ---      ', response.assignment.assignmentID);
                await this.confirmedAlert(response.assignment.assignmentID);
            }
        }, (1000 * 10));
        this.setState({interval});
    };

    confirmedAlert = async (assignmentId) => {
        clearInterval(this.state.interval);
        console.log('INSIDE CONFIRM ALERT ');
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
        if (choice) {
            await AsyncStorage.setItem('confirmedAssignment', 'true');
            await AsyncStorage.setItem('assignment', assignmentId);
            // send to screen
            this.props.navigation.navigate('Navigator');
        }else{
            this.startGetAssignments();
            await AsyncStorage.setItem('confirmedAssignment', 'false');
            await AsyncStorage.removeItem('assignment');
        }
        assigment.confirm(choice);
    };

    stopAssignment = () => {
        clearInterval(this.state.interval);
        this.setState({interval: null});
    };

    render() {

        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                {this.displayIconStatus()}
            </View>
        );
    }
}
