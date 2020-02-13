
export const authLogin = (user_id, user_token) => {
    return {
        type : "AUTH_USER",
        payload : {
            uid : user_id,
            key : user_token
        }
    }
}

export const authOut = (user_id) => {
    return {
        type : "AUTH_LOGOUT",
    }
}

export const getProfile = (profiles) => {
    return {
        type : "SEED_PROFILES",
        profiles
    }
}