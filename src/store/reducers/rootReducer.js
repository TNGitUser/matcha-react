const initState = {
    auth : {
        uid : -1,
        key : null
    },
    profiles : [
        { login : 0,
            profilePic : "/img/users/StellaCox.jpg",
            gender : "female",
            firstname : "Stella",
            lastname : "Cox",
            age : 26,
            city : "Vernon",
            liked : false,
            orientation : "Bisexuel",
            bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
            tags : [],
            images : []}, 
        { login : 1,
            profilePic : "/img/users/beautiful_female.jpg",
            gender : "female", firstname : "Laura", lastname : "Angels", age : 24, city : "Orléans",
            liked : false,
            orientation : "Hétérosexuel",
            bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
            tags : [],
            images : []},
        { login : 2, profilePic : "/img/users/NathaliePortman.jpg", gender : "female", firstname : "Nathalie", lastname : "Portman", age : 35, city : "Vernon", liked : false, orientation : "Homosexuel", tags : ["#Sports", "#Humanité", "#Féminisme", "#Cinéma"],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
        images : []},
        { login : 3, profilePic : "/img/users/beautiful_female2.jpg", gender : "female", firstname : "Elisa", lastname : "Gohlam", age : 26, city : "Marseille", liked : false, orientation : "Hétérosexuel", tags : [],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
        images : []},
        { login : 4, profilePic : "/img/users/beautiful_female3.jpg", gender : "female", firstname : "Claire", lastname : "Praetia", age : 26, city : "Mont-Michel", liked : false, orientation : "Homosexuel", tags : ["#L'équitation", "#Voyage", "#La mode"],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
        images : []},
        { login : 5, profilePic : "/img/users/Shulgin0.jpg", gender : "female", firstname : "Dmitry", lastname : "Shulgin", age : 23, city : "Paris", liked : false, orientation : "Hétérosexuel", tags : ["#La photographie", "#Les voyages", "#La mode", "#La beauté"],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!", 
    images : ["/img/users/Shulgin1.jpg", "/img/users/Shulgin2.jpg", "/img/users/Shulgin3.jpg",]},
    ],
    chat : null,
    tags : ["#La photographie", "#Les voyages", "#La mode", "#La beauté", "#Sports", "#Humanité", "#Féminisme", "#Cinéma", "#L'équitation",],
    filtered_profiles : []
}

function getIndex(value, arr, prop) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1; // to handle the case where the value doesn't exist
}

const rootReducer = (state = initState, action) => {
    if (action.type === "AUTH_LOGOUT") {
        return {
            ...state,
            auth : {
                uid : -1,
                key : null
            },
            profiles : [],
            chat : [],
            tags : [],
        }
    }
    else if (action.type === "AUTH_USER") {
        return {
            ...state,
            auth : {
                uid : action.payload.uid,
                key : action.payload.key
            }
        }
    }
    else if (action.type === "SEED_TAGS") {
        return {
            ...state,
            tags : action.payload.tags
        }
    }
    else if (action.type === "SEED_PROFILES") {
        return {
            ...state,
            profiles : action.profiles
        }
    }
    else if (action.type === "PROFILE_UPDATE") {
        let index = getIndex(action.login, state.profiles, 'login');
        if (index !== -1) {
            return {
                ...state,
                profiles : state.profiles.slice(0, index)
                    .concat(action.profile)
                    .concat(state.profiles.slice(index + 1))
            }
        }
    }
    return state;
}

export default rootReducer;