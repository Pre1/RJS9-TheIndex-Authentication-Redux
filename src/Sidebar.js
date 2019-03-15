import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";


import Logout from "./Logout";

// Logo
import logo from "./assets/theindex.svg";


class Sidebar extends Component {
  render() {
    console.log("SideBar ===> this.props.user", this.props.user)
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
        </section>
        <div className="fixed-bottom">
        
        {!this.props.user ? 
          (<div>
            <Link to="/login" className="btn btn-info m-2 float-left">
              Login
            </Link>
            <Link to="/signup" className="btn btn-success m-2 float-left">
              Signup
            </Link> 
          </div>
            ) : ( <Logout /> )}

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    user: state.rootAuth.user
  };
};


export default connect(
  mapStateToProps
)(Sidebar);

