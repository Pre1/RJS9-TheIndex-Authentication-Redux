import React from "react";

import { connect } from "react-redux";
import * as actionCreators from "./store/actions/index";



const Logout = props => {
	return (
		<button 
		className="btn btn-danger m-2 float-left" 
		onClick={props.logout}>

			Logout {props.user.username}

		</button>
	)
}


const mapStateToProps = state => {
  return {
  	user: state.rootAuth.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
  	logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
