import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import {LoginScreen} from "../screens/auth/Login";

import {RegisterScreen} from "../screens/auth/Register";
import {VerificationAccountScreen} from "../screens/auth/VerificationAccount";
import { RequestChangePasswordScreen } from "../screens/auth/RequestChangePassword";
import {ChangePasswordScreen} from '../screens/auth/ChangePassword';

const AuthClientStack = createStackNavigator({
    Register: {screen:RegisterScreen, navigationOptions:{title:"Registro"}},
    Verify: VerificationAccountScreen,
    RequestChangePass: RequestChangePasswordScreen,
    ChangePassword: ChangePasswordScreen,
    Login: LoginScreen,
}, {initialRouteName: 'Login'});

export default createSwitchNavigator({AuthClientStack});
