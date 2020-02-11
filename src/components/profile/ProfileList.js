import React, { Component } from 'react';
import ProfilePeek from './ProfilePeek';
import M from 'materialize-css';
import Slider from 'rc-slider';

const Range = Slider.Range;

class CustomizedRange extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        lowerBound: 18,
        upperBound: 99,
        value: [18, 26],
      };
    }
    onLowerBoundChange = (e) => {
      this.setState({ lowerBound: +e.target.value });
    }
    onUpperBoundChange = (e) => {
      this.setState({ upperBound: +e.target.value });
    }
    onSliderChange = (value) => {
      this.setState({
        value,
      });
    }
    render() {
      return (
        <div>
            <label>Âge entre : {this.state.value[0]} - {this.state.value[1]}</label>
            <Range allowCross={true} min={18} value={this.state.value} onChange={this.onSliderChange}/>
        </div>
      );
    }
  }

export class ProfileList extends Component {

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
                            <CustomizedRange></CustomizedRange>
                            <CustomizedRange></CustomizedRange>
                        </div>
                    </li>
                </ul>
                </div>
                <div className="row profile-row s8 m8">
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                    <ProfilePeek />
                </div>
            </div>
        )
    }
}

export default ProfileList