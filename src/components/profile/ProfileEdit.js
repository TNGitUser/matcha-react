import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css';
import { updateProfile } from '../../store/actions/profileActions';
import Axios from 'axios';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import { format, subYears } from 'date-fns';
import fr from 'date-fns/locale/fr';
import DatePicker, { registerLocale } from "react-datepicker";
registerLocale("fr", fr); // register it with the name you want

function getChipDeleted(e, data) {
    return (data.childNodes[0].textContent);
}

export class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile : null,
            display_date : null,
            new_password : null,
            nv_password : null,
            places : [],
            cityIsValid : true
        };
    }

    handleChange = (e) => {
        if (e.target.id === "bio" || e.target.id === "firstname" || e.target.id === "lastname") {
            let test_arr = ['< ', ' >', ';', '<script>', '</script>'];
            let flag = false;
            for (let i = 0; i < test_arr.length; i++) {
                if (e.target.value.includes(test_arr[i])) {
                    M.toast({html : "'" + e.target.value[e.target.value.length - 1] + "' n'est pas un caractère accepté pour des raisons de sécurité (Balises scripts interdites).", classes : "red"});
                    flag = true;
                    break ;
                }
            }
            if (flag) return ;
        }
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    getModifications = () => {
        let fields = ['firstname', 'lastname', 'birth', 'age', 'gender', 'orientation', 'bio', 'tags', 'city', 'arr'];
        let profile_update = {};

        fields.forEach((value, index) => {
            if (this.state[value] !== this.state.profile[value]) {
                profile_update = {
                    ...profile_update,
                    [value === "tags" ? "interest" : value] : this.state[value]
                }
            }
        });
        if (this.state.new_password != null && this.state.new_password.length >= 4) {
            profile_update = {
                ...profile_update,
                password : this.state.new_password
            }
        }
        profile_update = {
            ...profile_update,
            email : this.state.email
        }
        return profile_update;
    }

    handleDate = (date) => {
        let birthday = format(date, 'dd/MM/yyyy');
        this.setState({
            birth : birthday,
            display_date : date
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let today = new Date();
        let birth = Date.parse(this.state.birth);
        
        if (!this.state.cityIsValid) {
            M.toast({html : "Merci de mettre une des villes proposées ou de contacter le staff.", classes : "red"});
            return ;   
        }
        if (/*this.state.age < 18 || this.state.age > 125 || */subYears(today, 18).getTime() < birth || subYears(today, 125).getTime() > birth) {
            M.toast({html : "Merci de mettre un âge entre 18 et 125 ans.", classes : "red"});
            return ;
        }
        if (this.state.new_password !== this.state.nv_password) {
            M.toast({html : "Les nouveaux mot de passe ne correspondent pas.", classes : "red"});
            return ;
        }
        if (this.state.email === null || this.state.email.length === 0) {
            M.toast({html : "Il vous faut un email valide !", classes : "red"});
            return ;
        }
        let {profile, password, new_password, nv_password, login, ...profile_update} = this.state; // this line is used to exclude profile field in the object we'll be disptaching
        profile_update = this.getModifications();
        // console.log(profile_update);
        //this.props.updateProfile(profile_update);
        Axios.post("http://localhost:8080/api/account_editor", {
            id : this.props.auth.uid,
            token : this.props.auth.key,
            ...profile_update
        }).then(response => {
            let data = response.data;
            let status = data.status;
            if (status === 0) {
                M.toast({html : data.error, classes : "red"});
            } else {
                M.toast({html : "Profile mis à jour :)", classes : "green"});
            }
        }).catch(e => {console.log(e)})
    }

    handlePositionChangeAC = (place) => {
        let valid = true;
        if (this.state.places.includes(place)) {
            document.querySelector(".check-pos").classList.remove("fa-times");
            document.querySelector(".check-pos").classList.remove("red-text");
            document.querySelector(".check-pos").classList.add("fa-check");
            document.querySelector(".check-pos").classList.add("green-text");
        } else {
            document.querySelector(".check-pos").classList.remove("fa-check");
            document.querySelector(".check-pos").classList.remove("green-text");
            document.querySelector(".check-pos").classList.add("fa-times");
            document.querySelector(".check-pos").classList.add("red-text");
            valid = false;
        }
        this.setState({
            city : place,
            cityIsValid : valid
        })
    }

    handlePositionChange = (e) => {
        let valid = true;
        if (this.state.places.includes(e.target.value)) {
            document.querySelector(".check-pos").classList.remove("fa-times");
            document.querySelector(".check-pos").classList.remove("red-text");
            document.querySelector(".check-pos").classList.add("fa-check");
            document.querySelector(".check-pos").classList.add("green-text");
        } else {
            document.querySelector(".check-pos").classList.remove("fa-check");
            document.querySelector(".check-pos").classList.remove("green-text");
            document.querySelector(".check-pos").classList.add("fa-times");
            document.querySelector(".check-pos").classList.add("red-text");
            valid = false;
        }
        this.setState({
            city : e.target.value,
            cityIsValid : valid
        })
    }

    uploadProfileTrigger = (e) => {
        this.inputElement.click();
    }

    uploadProfile = (e) => {
        var imagefile = document.querySelector('#profil_pic');

        var idxDot = imagefile.files[0].name.lastIndexOf(".") + 1;
        var extFile = imagefile.files[0].name.substr(idxDot, imagefile.files[0].name.length).toLowerCase();
        if (!(extFile === "jpg" || extFile === "jpeg" || extFile === "png" || extFile === "svg" || extFile === "gif")) {
            M.toast({ html: "Attention, le fichier n'est pas une image autorisée !", classes : "red"});
            return ;
        }

        const formData = new FormData();
        formData.append("profil", imagefile.files[0]);

        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/images?id=' + this.props.auth.uid + "&token=" + this.props.auth.key,
            data: formData,
            headers: {'content-type': 'undefined' }
            })
            .then(function (response) {
                //handle success
                let status = response.data.status;
                if (status === 0) {
                    M.toast({ html: response.data.error, classes : "red"});
                    return ;
                } else {
                    M.toast({ html: "Image de profile ajoutée.", classes : "green"});
                    console.log(response.data.success);
                    document.getElementById("profil_pic_trigger").setAttribute("src", "http://localhost:8080/" + response.data.success);
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }

    uploadImage = (e) => {
        var imagefile = document.querySelector('#supp_pic');

        var idxDot = imagefile.files[0].name.lastIndexOf(".") + 1;
        var extFile = imagefile.files[0].name.substr(idxDot, imagefile.files[0].name.length).toLowerCase();
        if (!(extFile === "jpg" || extFile === "jpeg" || extFile === "png" || extFile === "svg" || extFile === "gif")) {
            M.toast({ html: "Attention, le fichier n'est pas une image autorisée !", classes : "red"});
            return ;
        }

        const formData = new FormData();
        formData.append("Supp_pic", imagefile.files[0]);

        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/images?id=' + this.props.auth.uid + "&token=" + this.props.auth.key,
            data: formData,
            headers: {'content-type': 'undefined' }
            })
            .then(function (response) {
                //handle success
                let status = response.data.status;
                if (status === 0) {
                    M.toast({ html: response.data.error, classes : "red"});
                    return ;
                } else {
                    M.toast({ html: "Image ajoutée. Merci de rafraichir la page pour voir les changements", classes : "green"});
                }
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });           
    }

    componentDidMount = () => {
        Axios.get("http://localhost:8080/api/my_account?id=" + this.props.auth.uid + "&token=" + this.props.auth.key).then((response) => {
            if (response.data != null) {
                if (response.data.status !== 1) {
                    M.toast({html : "An error occurred. Please retry later or contact staff.", classes: "red"});
                } else {
                    this.setState({
                        ...response.data.success,
                        display_date : Date.parse(response.data.success.birth),
                        profile : response.data.success
                    });
                }
            }
        }).catch(e => {console.log(e)});
        this.setCitiesList();
    }

    setCitiesList = () => {
        Axios.get("http://localhost:8080/api/get_cities").then(response => {
            let cities = response.data;
            var Position = document.querySelectorAll('.autocomplete');
            var autocomplete_city = {};
            var state_city = [];
            cities.map(place => {
                return autocomplete_city[place.city] = null;
            });
            cities.map(place => {
                return state_city.push(place.city);
            });
            this.setState({
                places : state_city
            });
            M.Autocomplete.init(Position, { data : autocomplete_city, limit : 5, minLength : 1, onAutocomplete : (place) => this.handlePositionChangeAC(place) });
        });
    }

    componentDidUpdate() {
        let bioArea = document.querySelector('#bio');
        M.textareaAutoResize(bioArea);

        let carousel = document.querySelector('.carousel');
        M.Carousel.init(carousel, {indicators:true});

        let selects = document.querySelectorAll('select');
        M.FormSelect.init(selects);

        let tags = document.querySelectorAll('.chips');
        let autocomplete_data = {};
        this.props.tags.map(tag => {
            return autocomplete_data[tag] = null;
        })
        M.Chips.init(tags, {
            autocompleteOptions : {
                data : autocomplete_data,
                limit : Infinity,
                minLength : 1
            },
            onChipAdd : (chip) => {
                let value = chip[0].childNodes[chip[0].childNodes.length - 3].textContent;
                value = value.replace("close", "");
                if (!this.state.tags.includes(value)) {
                    this.setState({
                        tags : [...this.state.tags, value]
                    })
                }
            },
            onChipDelete : (e, data) => {
                let tag = getChipDeleted(e, data);
                console.log("Deleted tag : " + tag);
                if (tag) {
                  this.setState({
                    tags : this.state.tags.filter(ftag => { return ftag !== tag })
                  })
                }
            }
        });
    }

    render() {
        var i = 0;
        const user_profile = this.state.profile;
        var homo, hetero, wants, sex, pictures = null;

        if (user_profile) {
            sex = user_profile.gender;
            
            homo = sex === "Male" ? "fas fa-mars-double" : "fas fa-venus-double";
            hetero = sex === "Male" ? "fas fa-venus" : "fas fa-mars";
            
            wants = user_profile.orientation === "Bisexual" ? "fas fa-venus-mars" : user_profile.orientation === "Hétérosexuel" ? hetero : homo;
            wants += " sweet_pink";

            pictures = user_profile.images.length ? (
                <div className="carousel">
                <h5 className="center">Petit aperçu de moi ;)</h5>
                    {user_profile.images.map((image, index) => {
                        return (// eslint-disable-next-line
                            <a key={index} className="carousel-item images"><img src={"http://localhost:8080/" + image['link']} alt="Some stuff"/></a>
                        )
                    })}
                </div>
            ) : null;
        }
        const page = user_profile ? (
        (
            <div className="container white whole-profile z-depth-3">
                <form onSubmit={this.handleSubmit}>
                    <button className="btn waves-effect waves-light green save-btn" type="submit" name="save">Enregistrer
                        <i className="material-icons right">save</i>
                    </button>
                    <div className="private-info">
                        <div className="private-pass">
                            <div className="input-field col s12 private-item">
                                <input id="new_password" type="password" className="validate" onChange={this.handleChange}/>
                                <label htmlFor="new_password">Nouveau mot de passe</label>
                            </div>
                            <div className="input-field col s12 private-item">
                                <input id="nv_password" type="password" className="validate" onChange={this.handleChange}/>
                                <label htmlFor="nv_password">Vérification</label>
                            </div>
                        </div>
                        <div className="private-email">
                            <div className="input-field col s12 private-item">
                                <input id="email" type="email" className="validate" value={this.state.email} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <div className="divider center"></div>
                    <div className="row top-info">
                        <div className="col">
                            <input id="profil_pic" type="file" onChange={this.uploadProfile} accept="image/*" ref={input => this.inputElement = input}/> 
                            <div className="row s4 center fullprofile-holder"><img id="profil_pic_trigger" src={"http://localhost:8080/" + user_profile.profilePic} className="fullprofile-image center" alt="Principale" onClick={this.uploadProfileTrigger}/></div>
                            <div className="actions">
                            </div>
                        </div>
                        <div className="col s10 m6 basic-info">
                            <div className="naming-info">
                            <div className="input-field col s12 private-item">
                                <input id="firstname" type="text" className="validate" value={this.state.firstname} onChange={this.handleChange}/>
                            </div>
                            <div className="input-field col s12 private-item">
                                <input id="lastname" type="text" className="validate" value={this.state.lastname} onChange={this.handleChange}/>
                            </div>
                            </div>
                            {/* <h4 className="center">{user_profile.firstname} {user_profile.lastname}</h4> */}
                            <div className="divider center"></div>
                            <h5 className="center">Biographie</h5>
                            <textarea id="bio" className="materialize-textarea" value={this.state.bio} onChange={this.handleChange}></textarea>
                            <label htmlFor="bio">Biographie</label>
                        </div>
                    </div>
                    <div className="divider center"></div>
                    <div className="row main-info">
                        <div className="col s4 center profile-info input-field pos-field">
                            <i className="fas fa-map-marker-alt prefix"></i>
                            <input type="text" id="autocomplete-input" className="autocomplete" value={this.state.city} onChange={this.handlePositionChange}/>
                            <i className="fas fa-check green-text check-pos"></i>
                        </div>
                        <div className="col s4 center profile-info"><i className="fas fa-birthday-cake"></i>&nbsp;
                            <DatePicker id="birthday" dateFormat="dd/MM/yyyy" selected={this.state.display_date} onChange={this.handleDate} locale="fr" autoComplete="off"
                            /*maxDate={subYears(new Date(), 18)} minDate={subYears(new Date(), 125)}*//>
                        </div>
                        <div className="col s4 center profile-info"><i className={wants}></i>
                            <div className="input-field col s12">
                                <select defaultValue={this.state.orientation} id="orientation" onChange={this.handleChange}>
                                    <option value="Bisexuel">Bisexuel</option>
                                    <option value="Hétérosexuel">Hétérosexuel</option>
                                    <option value="Homosexuel">Homosexuel</option>
                                </select>
                                <label>Orientation</label>
                            </div>
                        </div>
                    </div>
                    <div className="divider center"></div>
                    <div className="section container">
                        <h5 className="center">Intérêts</h5>
                        <div className="tag-edit">
                            <div className="chips chips-autocomplete"></div>
                        </div>
                        <div className="row profile-tags">
                            { user_profile.tags.length ?
                            this.state.tags.map((tag, index) => {
                                return (
                                    <div className="chip" key={index}>
                                        {tag}
                                        <i className="material-icons close" onClick={() => {this.setState({
                                            tags : this.state.tags.filter(ftag => { return ftag !== tag })
                                        })}}>close</i>
                                    </div>
                                )
                            }) : <div className="red-text">No tags</div> }
                        </div>
                    </div>
                    <div className="divider center"></div>
                    <div className="section container">
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Ajouter image</span>
                                <input id="supp_pic" type="file" onChange={this.uploadImage} accept="image/*"/>
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                        </div>
                        {pictures}
                    </div>
                </form>
            </div>
        )) : (  <div className="center-loader"><div className="preloader-wrapper active">
                    <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div></div>    ) ;
        return page;
    }
}

const mapStateToProps = (state) => {
    //let myprofile = state.profiles.filter(profile => profile.login === state.auth);
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile : (profile) => {dispatch(updateProfile(profile))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit)
