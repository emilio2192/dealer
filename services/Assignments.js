import React from 'react'
import * as BackgroundFetch from 'expo-background-fetch';
import {AsyncStorage} from "react-native";
import endpoints from '../constants/Endpoints';
import {gateway} from '../services/gateway';

const LOCATION_TASK_NAME = 'background-location-task';
const ASSIGNMENT_TASK_NAME = 'background-get-assignment';

//
// const sendUpdateLocation = async () => {
//     try{
//         let { status } = await Permissions.askAsync(Permissions.LOCATION);
//         if (status !== 'granted') {
//             alert('Deny access');
//         }
//         await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
//             accuracy: 4,
//             timeInterval: (1000 * 60 * 1),
//         });
//         console.log('registry');
//     } catch (e) {
//         console.log(e);
//     }
// }
BackgroundFetch.setMinimumIntervalAsync(1);
// TaskManager.defineTask(LOCATION_TASK_NAME,  ({ data, error }) => {
//     if (error) {
//         // Error occurred - check `error.message` for more details.
//         return;
//     }
//     if (data) {
//         const { locations } = data;
//         const dataSend = {
//             latitude: locations[0].coords.latitude,
//             longitude: locations[0].coords.longitude
//         };
//         fetch(endpoints.changeMessengerLocationAssigment, {
//             method: 'POST',
//             headers: constants.headers,
//             body: JSON.stringify(dataSend)
//         });
//         const onAssigment = await AsyncStorage.getItem('assigmentId');
//         if(onAssigment.length > 0){
//              const response = gateway(endpoints.changeMessengerLocationAssigment, 'POST', dataSent);
//         }
//         console.log('send');
//
//         // do something with the locations captured in the background
//     }
// });

const connectMessenger = async () => {
    let user = await AsyncStorage.getItem('userInformation');
    user = JSON.parse(user);
    const data = {
        userId: user.id,
        state: 'connected'
    };
    const response = await gateway(endpoints.messengerConnection, 'POST', data);
    return response;
};

const disconnectMessenger = async () => {
    let user = await AsyncStorage.getItem('userInformation');
    user = JSON.parse(user);
    const data = {
        userId: user.id,
        state: 'disconnected'
    };
    const response = await gateway(endpoints.messengerConnection, 'POST', data);
    return response;
};
let interval;
const startGetAssignments = async () => {

    interval = setInterval(async () => {
        const assignment = await AsyncStorage.getItem('assignment');
        if(assignment === null){
            let user = await AsyncStorage.getItem("userInformation");
            user = JSON.parse(user);
            const data = {
                messengerId: user.id
            };
            const response = await gateway(endpoints.setMessengerAssignment, 'POST', data);

            console.log("set assignment ",response);
            // await AsyncStorage.setItem('assignment', response.assignmentID);
            console.log('Asignado');
        }
        
    }, 1000 * 5)
};

const getMessengerAssignment = async () => {
    let user = await AsyncStorage.getItem("userInformation");
    user = JSON.parse(user);
    const data = {
        messengerId: user.id
    };
    const response = await gateway(endpoints.getAssigment, 'POST', data);
    // await AsyncStorage.setItem('assignment', response.assignment.assignmentID);
    return response;
}

const stopGetAssignments = () => {
    clearInterval(interval);
};
export default {
    // sendUpdateLocation,
    startGetAssignments,
    stopGetAssignments,
    connectMessenger,
    disconnectMessenger,
    getMessengerAssignment
}
