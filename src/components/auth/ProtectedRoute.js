import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

class ProtectedRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props
  
      return (
        <Route 
          {...props} 
          render={props => (
            this.props.auth != null ?
              <Component {...props} /> :
              <Redirect to='/signin' />
          )}
        />
      )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(ProtectedRoute);