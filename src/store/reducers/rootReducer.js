const initState = {
    auth : null,
    profiles : [],
    chat : null
}

const rootReducer = (state = initState, action) => {
    if (action === "AUTH_USER") {
        console.log("Authentificated user");
    }
    return state;
}

export default rootReducer;