import React, { Component } from 'react';
import ProfilePeek from './ProfilePeek';
import M from 'materialize-css';
import Slider from 'rc-slider';
import { connect } from 'react-redux';

const Range = Slider.Range;

class ProfileList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        filter : {
          lowerBound: 18,
          upperBound: 99,
          value: [18, 26],
        }
      };
    }

    onLowerBoundChange = (e) => {
      this.setState({ filter : { lowerBound: +e.target.value }});
    }
    onUpperBoundChange = (e) => {
      this.setState({ filter : { upperBound: +e.target.value }});
    }
    onSliderChange = (value) => {
      this.setState({
        filter : {
          value,
        }
      });
    }

    componentDidMount() {
        var elems = document.querySelectorAll('.collapsible');
        M.Collapsible.init(elems, null);
    }

    render() {
        return (
            <div className="container">
                <div className="profile-search">
                <ul className="collapsible collapsible-search">
                    <li>
                        <div className="collapsible-header"><i className="material-icons">settings</i>Filtres</div>
                        <div className="collapsible-body">
                          <div>
                              <label>Âge entre : {this.state.filter.value[0]} - {this.state.filter.value[1]}</label>
                              <Range allowCross={true} min={18} value={this.state.filter.value} onChange={this.onSliderChange}/>
                          </div>
                        </div>
                    </li>
                </ul>
                </div>
                <div className="row profile-row s8 m8">
                  { this.props.profiles && this.props.profiles.map((profile) => {
                    return <ProfilePeek profile={profile} key={profile.login}/>
                  })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(ProfileList)