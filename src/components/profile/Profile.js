import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css';
import Axios from 'axios';
import Score from './Score';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile : null
        };
    }

    componentDidMount = () => {
        Axios.get("http://10.12.10.19:8080/api/profil/" + this.props.match.params['user_id'] + "?id=" + this.props.auth.uid + "&token=" + this.props.auth.key).then((response) => {
            console.log(response.data);
            let status = response.data.status;

            if (status === 0) {
                M.toast({html : "An error occurred. Please retry later or contact staff.", classes: "red"});
            } else {
                this.setState({
                    profile : response.data.success
            })}
        }).catch(err => {
            console.log(err);
        })

        var elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems);
    }

    componentDidMount() {
        let carousel = document.querySelector('.carousel');
        M.Carousel.init(carousel, {indicators:true, fullWidth:false, dist:0});
    }

    render() {
        var i = 0;
        const user_profile = this.state.profile;
        var wants = null;
        var sex = null;
        var pictures = null;
        var arr = null;
        if (user_profile) {
            
            sex = user_profile.gender;
            
            let homo = sex === "male" ? "fas fa-mars-double" : "fas fa-venus-double";
            let hetero = sex === "male" ? "fas fa-venus" : "fas fa-mars";
            
            wants = user_profile.orientation === "Bisexual" ? "fas fa-venus-mars" : user_profile.orientation === "Hétérosexuel" ? hetero : homo;
            wants += " sweet_pink";

            if (user_profile.arr != null) {
                arr = ", " + user_profile.arr + "ème";
            }
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
                <div className="row top-info">
                    <div className="col">
                        <div className="row s4 center fullprofile-holder"><img src={user_profile.profilePic} className="fullprofile-image center" alt="Principale"/></div>
                        <div className="actions">
                            <a href="#like" className="btn-floating btn-large waves-effect waves-light unliked">
                                <i className="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <a href="#!" className="btn-floating btn-large disabled">
                                <i className="material-icons">message</i>
                            </a>
                            <a href="#!" className="btn-floating btn-large yellow darken-3">
                                <i className="material-icons">warning</i>
                            </a>
                        </div>
                    </div>
                    <div className="col s8 m6">
                        <h4 className="center">{user_profile.firstname} {user_profile.lastname} <Score score={user_profile.score}/></h4>
                        <div className="divider center"></div>
                        <h5 className="center">Biographie</h5>
                        <p>{user_profile.bio}</p>
                    </div>
                </div>
                <div className="divider center"></div>
                <div className="row main-info">
                    <div className="col s4 center profile-info"><i className="fas fa-map-marker-alt"></i> {user_profile.city}{ arr } - {user_profile.dst} Kms</div>
                    <div className="col s4 center profile-info"><i className="fas fa-birthday-cake"></i> {user_profile.age} ans</div>
                    <div className="col s4 center profile-info"><i className={wants}></i> {user_profile.orientation} </div>
                </div>
                <div className="divider center"></div>
                <div className="section container">
                    {pictures}
                </div>
                <div className="section container">
                    <h5 className="center">Intérêts</h5>
                    <div className="row profile-tags">
                        { user_profile.tags.length ? user_profile.tags.map((tag, index) => {
                            return (
                                <div className="chip" key={index}>
                                    {tag}
                                </div>
                            )
                        }) : <div className="red-text">No tags</div> }
                    </div>
                </div>
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
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Profile)
