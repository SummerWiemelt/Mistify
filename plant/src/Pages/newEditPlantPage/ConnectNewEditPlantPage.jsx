import React from "react";
import { connect } from "react-redux";
import NewEditPlantPage from "./NewEditPlantPage";

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps, null)(NewEditPlantPage);
