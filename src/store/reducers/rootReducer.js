const initState = {
    auth : null,
    profiles : [
        { profile_id : 1, profile_picture : "/img/users/StellaCox.jpg", firstname : "Stella", lastname : "Cox", age : 26, city : "Vernon", liked : false}, 
        { profile_id : 2, profile_picture : "/img/users/beautiful_female.jpg", firstname : "Laura", lastname : "Angels", age : 24, city : "Orléans", liked : false},
        { profile_id : 3, profile_picture : "/img/users/NathaliePortman.jpg", firstname : "Nathalie", lastname : "Portman", age : 35, city : "Vernon", liked : false},
        { profile_id : 4, profile_picture : "/img/users/beautiful_female2.jpg", firstname : "Elisa", lastname : "Gohlam", age : 26, city : "Marseille", liked : false},
        { profile_id : 5, profile_picture : "/img/users/beautiful_female3.jpg", firstname : "Claire", lastname : "Praetia", age : 26, city : "Mont-Michel", liked : false},
    ],
    chat : null
}

const rootReducer = (state = initState, action) => {
    if (action === "AUTH_USER") {
        console.log("Authentificated user");
    }
    return state;
}

export default rootReducer;