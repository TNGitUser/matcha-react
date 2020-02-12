import React, { Component } from 'react'
import { connect } from 'react-redux'
import M from 'materialize-css';

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile : null
        };
        console.log(props);
    }

    componentDidMount = () => {
        this.setState({
            profile : this.props.profiles[this.props.match.params.user_id]
        })

        var elems = document.querySelectorAll('.carousel');
        M.Carousel.init(elems);
    }

    componentDidUpdate() {
        let carousel = document.querySelector('.carousel');
        M.Carousel.init(carousel, {indicators:true});
    }

    render() {
        var i = 0;
        const user_profile = this.state.profile;
        var wants = null;
        var sex = null;
        var pictures = null;
        if (user_profile) {
            
            sex = user_profile.gender;
            
            let homo = sex === "male" ? "fas fa-mars-double" : "fas fa-venus-double";
            let hetero = sex === "male" ? "fas fa-venus" : "fas fa-mars";
            
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
                <h4 className="center">{user_profile.firstname} {user_profile.lastname}</h4>
                <div className="row">
                    <div className="col s4 offset-s4 center fullprofile-holder"><img src={user_profile.profilePic} className="fullprofile-image center" alt="Principale"/></div>
                </div>
                <div className="row main-info">
                    <div className="col s4 center profile-info"><i className="fas fa-map-marker-alt"></i> {user_profile.city} </div>
                    <div className="col s4 center profile-info"><i className="fas fa-birthday-cake"></i> {user_profile.age} ans</div>
                    <div className="col s4 center profile-info"><i className={wants}></i> {user_profile.orientation} </div>
                </div>
                <div className="divider center"></div>
                <div className="section container">
                    <h5 className="center">Biographie</h5>
                    <p>{user_profile.bio}</p>
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
