const initState = {
    auth : null,
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
        { login : 2, profilePic : "/img/users/NathaliePortman.jpg", gender : "female", firstname : "Nathalie", lastname : "Portman", age : 35, city : "Vernon", liked : false, orientation : "Homosexuel", tags : ["Sports", "Humanité", "Féminisme", "Cinéma"],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
        images : []},
        { login : 3, profilePic : "/img/users/beautiful_female2.jpg", gender : "female", firstname : "Elisa", lastname : "Gohlam", age : 26, city : "Marseille", liked : false, orientation : "Hétérosexuel", tags : [],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
        images : []},
        { login : 4, profilePic : "/img/users/beautiful_female3.jpg", gender : "female", firstname : "Claire", lastname : "Praetia", age : 26, city : "Mont-Michel", liked : false, orientation : "Homosexuel", tags : ["L'équitation", "Voyage", "La mode"],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!",
        images : []},
        { login : 5, profilePic : "/img/users/Shulgin0.jpg", gender : "female", firstname : "Dmitry", lastname : "Shulgin", age : 23, city : "Paris", liked : false, orientation : "Hétérosexuel", tags : ["La photographie", "Les voyages", "La mode", "La beauté"],
        bio : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati unde repellendus minima quibusdam quidem accusamus non molestiae voluptatem nihil porro voluptate deleniti earum culpa dolorem, distinctio nobis delectus nesciunt. Aliquid!", 
    images : ["/img/users/Shulgin1.jpg", "/img/users/Shulgin2.jpg", "/img/users/Shulgin3.jpg",]},
    ],
    chat : null
}

const rootReducer = (state = initState, action) => {
    if (action.type === "AUTH_LOGOUT") {
        return {
            ...state,
            auth : null
        }
    }
    else if (action.type === "AUTH_USER") {
        return {
            ...state,
            auth : action.uid
        }
    }
    return state;
}

export default rootReducer;