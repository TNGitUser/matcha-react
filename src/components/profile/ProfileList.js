import React, { Component } from 'react';
import ProfilePeek from './ProfilePeek';
import M from 'materialize-css';
import Slider from 'rc-slider';
import { connect } from 'react-redux';
import Axios from 'axios';
// import Pagination from 'rc-pagination';
// import 'rc-pagination/assets/index.css';


const Range = Slider.Range;

function getChipDeleted(e, data) {
  return (data.childNodes[0].textContent);
}

function hasTag(tags, profile) {
  let ok = false;
  if (tags.length === 0) ok = true;
  tags.forEach(tag => {
    if (profile.tags.includes(tag)) {
      ok = true;
    }
  });
  return ok;
}

class ProfileList extends Component {

    constructor(props) {
      super(props);

      let max_page = this.props.profiles ? Math.floor(this.props.profiles.length / 20) : 0;

      this.state = {
        filter : {
          lowerBound: 18,
          upperBound: 125,
          value: [18, 26],
        },
        pop : {
          lowerBound: 0,
          upperBound: 100,
          value: [0, 100],
        },
        dst : {
          lowerBound: 0,
          upperBound: 100,
          value: [0, 100],
        },
        page : 1,
        max_page,
        epp : 20,
        tags : [],
        filter_tags : []
      };
    }
    onSliderChange = (value) => {
      this.setState({
        filter : { value },
      });
    }
    onSliderPopChange = (value) => {
      this.setState({
        pop : { value },
      });
    }
    onSliderDstChange = (value) => {
      this.setState({
        dst : { value },
      });
    }

    // handlePageChange = (page) => {
    //   this.setState({
    //     page
    //   })
    // }
  
    initTags = () => {
      let tags = document.querySelectorAll('.chips');
      let autocomplete_data = {};
      this.state.tags.map(tag => {
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
            this.setState({
              filter_tags : [...this.state.filter_tags, value]
            })
        },
        onChipDelete : (e, data) => {
          let tag = getChipDeleted(e, data);
          if (tag) {
            this.setState({
              filter_tags : this.state.filter_tags.filter(ftag => { return ftag !== tag })
            })
          }
        }
      });
    }

    componentDidMount() {
      Axios.get("http://10.12.10.19:8080/api/get_tags").then(response => {
          let tags = response.data;
          if (tags.length === 0 ) {
            M.toast({html : "No tags retrieved.", classes: "red"});
          } else {
            this.setState({
              tags
            });
            this.initTags();
          }
        }).catch(err => {
            console.log(err);
      })
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
                          <div className="row">
                            <div className="col s4">
                              <label>Âge entre : {this.state.filter.value[0]} - {this.state.filter.value[1]}</label>
                              <Range allowCross={true} min={18} max={125} value={this.state.filter.value} onChange={this.onSliderChange}/>
                            </div>
                            <div className="col s4">
                              <label>Distance : {this.state.dst.value[0]} - {this.state.dst.value[1]}</label>
                              <Range allowCross={true} min={0} max={1250} value={this.state.dst.value} onChange={this.onSliderDstChange}/>
                            </div>
                            <div className="col s4">
                              <label>Popularité : {this.state.pop.value[0]} - {this.state.pop.value[1]}</label>
                              <Range allowCross={true} min={0} max={100} value={this.state.pop.value} onChange={this.onSliderPopChange}/>
                            </div>
                          </div>
                            <div className="tag-filter">
                                <div className="chips filter-tags">
                                  <input className="custom-class"/>
                                </div>
                            </div>
                          </div>
                        </div>
                    </li>
                </ul>
                </div>
                <div className="row profile-row s8 m8">
                  { this.props.profiles && this.props.profiles.map((profile, index) => {
                    if (profile.age >= this.state.filter.value[0] && profile.age <= this.state.filter.value[1] && hasTag(this.state.filter_tags, profile)) {
                      return <ProfilePeek profile={profile} key={profile.login}/>
                    } else return null;
                  })}
                </div>
                {/* <Pagination current={this.state.page} total={this.state.max_page} className="center list-pagination" onChange={this.handlePageChange}/> */}
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