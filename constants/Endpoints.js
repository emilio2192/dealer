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
    GetAssignement: (user) => `/assignment/user/${user}`,
    MessengerLocation: '/assignment/messenger-location',
    GetPackage: (user)=> `/user/package-balance/${user}`
}
