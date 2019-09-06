export default {
    signUp: '/user/signup',
    verifyAccount: '/user/verify',
    signIn: '/user/signin',
    requestChangePassword: '/user/change-password-request',
    changePassword: '/user/change-password',
    requestVerification : '/user/verify-request',
    price: '/assignment/price',
    payment: '/assignment/payment',
    createAssignement: '/assignment/create',
    MessengerLocation: '/assignment/messenger-location',
    messengerConnection: '/user/messenger-connection/',
    changeMessengerLocationAssigment: '/assignment/set-messenger-location/',
    getAssigment: '/assignment/get-assignament-messenger',
    setMessengerAssignment: '/assignment/set-messenger/',
    historyAssignment: '/assignment/messenger',
    confirmAssignment: '/assignment/confirm-messenger',
    GetAssignement: (id) => `/assignment/${id}`,
    endPointLocation: '/assignment/update-locations',
    finishAssignment: '/assignment/finish'
}
