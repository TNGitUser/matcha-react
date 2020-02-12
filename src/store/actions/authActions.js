
export const authLogin = (user_id) => {
    return {
        type : "AUTH_USER",
        uid : user_id
    }
}

export const authOut = (user_id) => {
    return {
        type : "AUTH_LOGOUT",
    }
}