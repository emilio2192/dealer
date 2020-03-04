import React from 'react'
import * as BackgroundFetch from 'expo-background-fetch';
import {AsyncStorage} from "react-native";
import endpoints from '../constants/Endpoints';
import {gateway} from '../services/gateway';
import SERVER from "../constants/Server";


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
// const startGetAssignments = async (_callback) => {
//
//     interval = setInterval(async (_callback) => {
//         console.log('PIDIENDO ASIGNACIONES ----');
//         const assignment = await AsyncStorage.getItem('assignment');
//         if(assignment === null){
//             let user = await AsyncStorage.getItem("userInformation");
//             user = JSON.parse(user);
//             const data = {
//                 messengerId: user.id
//             };
//             const response = await gateway(endpoints.setMessengerAssignment, 'POST', data);
//
//             console.log("set assignment ",response);
//             if(response.assignmentID){
//                 await AsyncStorage.setItem('assignment', response.assignmentID);
//                 _callback();
//             }
//             console.log('Asignado');
//         }
//
//     }, 1000 * 5)
// };

const startGetAssignments = async () => {
    const assignment = await AsyncStorage.getItem('assignment');
    if (assignment === null) {
        let user = await AsyncStorage.getItem("userInformation");
        user = JSON.parse(user);
        const data = {
            messengerId: user.id
        };
        const response = await gateway(endpoints.setMessengerAssignment, 'POST', data);
        return response;
    }
};

const getMessengerAssignment = async () => {
    let user = await AsyncStorage.getItem("userInformation");
    user = JSON.parse(user);
    const data = {
        messengerId: user.id
    };
    const response = await gateway(endpoints.getAssigment, 'POST', data);
    return response;
};

const stopGetAssignments = () => {
    clearInterval(interval);
};

const getHistoryAssignments = async () => {
    console.log('inside function');
    let user = await AsyncStorage.getItem("userInformation");
    user = JSON.parse(user);
    const data = {
        messengerId: user.id
    };
    console.log('getHistory', data);
    const response = await gateway(endpoints.historyAssignment, 'POST', data);
    return response;
};

const confirm = async (status, assignmentId) => {
    let user = await AsyncStorage.getItem("userInformation");
    user = JSON.parse(user);

    const data = {
        messengerId: user.id,
        assignmentID: assignmentId,
        confirm: status
    };
    await AsyncStorage.setItem("confirmedAssignment", '' + status);
    const response = await gateway(endpoints.confirmAssignment, 'POST', data);
    console.log('CONFIRMED ENDPOINT ', response);
    return response;
};

const endLocation = async (locations) => {
    const newLocations = locations.map(item => {
        let newItem = item;
        delete newItem.active;
        return newItem
    })
    const assignmentId = await AsyncStorage.getItem('assignment');
    const data = {
        assignmentId: assignmentId,
        locations: newLocations
    };
    const response = await gateway(endpoints.endPointLocation, 'POST', data);
    return response;
};
const finishAssignment = async () => {
    const assignmentId = await AsyncStorage.getItem('assignment');
    const data = {
        assignmentId
    }
    const response = await gateway(endpoints.finishAssignment, 'POST', data);
    if (response) {
        await AsyncStorage.removeItem('assignment');
        await AsyncStorage.removeItem('confirmedAssignment');
    }
    return response;
}

const summary = async (userId) => {
    try{
        let headers = SERVER.headers;
        let token = 'Bearer ' + await AsyncStorage.getItem('token');
        token = token.replace(/['"]+/g, '');
        headers['Authorization'] = token;
        const response = await fetch(SERVER.domain + endpoints.summary, {
            method:'GET',
            headers
        });
        return response.json();
    }catch (e) {
        console.error(e);
        return Promise.reject(e);
    }

}

export default {
    // sendUpdateLocation,
    startGetAssignments,
    stopGetAssignments,
    connectMessenger,
    disconnectMessenger,
    getMessengerAssignment,
    getHistoryAssignments,
    confirm,
    endLocation,
    finishAssignment,
    summary
}
