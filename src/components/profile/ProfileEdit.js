import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css';
import { updateProfile } from '../../store/actions/profileActions';
import Axios from 'axios';

export class ProfileEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile : null
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("It's mine !");
        console.log(this.state.age);
        if (this.state.age < 18 || this.state.age > 125) {
            M.toast({html : "Merci de metter un âge entre 18 et 125 ans.", classes : "red"});
            return ;
        }
        let {profile, ...profile_update} = this.state; // this line is used to exclude profile field in the object we'll be disptaching
        console.log(profile_update);
        this.props.updateProfile(profile_update);
        console.log(this.props);
        M.toast({html : "Profile mis à jour :)", classes : "green"});
    }

    componentDidMount = () => {
        Axios.get("http://10.12.10.19:8080/api/my_account?id=" + this.props.auth.uid + "&token=" + this.props.auth.key).then((response) => {
            if (response.data != null) {
                if (response.data.status !== 1) {
                    M.toast({html : "An error occurred. Please retry later or contact staff.", classes: "red"});
                } else {
                    this.setState({
                        ...response.data.success,
                        profile : response.data.success
                    });
                }
            }
        }).catch(e => {console.log(e)})
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
                if (this.state.tags.includes(value)) {
                    console.log("Tag does Exist");
                } else {
                    console.log("Tag does not exist");
                    this.setState({
                        tags : [...this.state.tags, value]
                    })
                }
                if (!this.props.tags.includes(value)) {
                    console.log("must update database !");
                    M.toast({html : "Must update the database ! Go and contact Jmondino !"});
                }
            }
        });
    }

    render() {
        var i = 0;
        const user_profile = this.state.profile;
        var homo, hetero, wants, sex, pictures = null;

        if (user_profile) {
            console.log(user_profile);
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
                            <a key={index} className="carousel-item images"><img src={image} alt="Some stuff"/></a>
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
                    <div className="row top-info">
                        <div className="col">
                            <div className="row s4 center fullprofile-holder"><img src={user_profile.profilePic} className="fullprofile-image center" alt="Principale"/></div>
                            <div className="actions">
                            </div>
                        </div>
                        <div className="col s8 m6">
                            <h4 className="center">{user_profile.firstname} {user_profile.lastname}</h4>
                            <div className="divider center"></div>
                            <h5 className="center">Biographie</h5>
                            <textarea id="bio" className="materialize-textarea" value={this.state.bio} onChange={this.handleChange}></textarea>
                            <label htmlFor="bio">Biographie</label>
                        </div>
                    </div>
                    <div className="divider center"></div>
                    <div className="row main-info">
                        <div className="col s4 center profile-info"><i className="fas fa-map-marker-alt"></i> {user_profile.city} </div>
                        <div className="col s4 center profile-info"><i className="fas fa-birthday-cake"></i> <input type="number" id="age" value={this.state.age} onChange={this.handleChange}/>ans</div>
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
                        {pictures}
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Image</span>
                                <input type="file" />
                            </div>
                            <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" />
                            </div>
                            </div>
                    </div>
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
                                        <i className="material-icons close">close</i>
                                    </div>
                                )
                            }) : <div className="red-text">No tags</div> }
                        </div>
                    </div>
                </form>
            </div>
        )) : (  <div className="preloader-wrapper active center-loader">
                    <div className="spinner-layer spinner-red-only">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                    </div>
                </div>) ;
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
