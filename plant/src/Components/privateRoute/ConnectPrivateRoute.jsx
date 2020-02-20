import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";

const mapStateToProps = store => {
  return {
    user: store.user
  };
};

export default connect(mapStateToProps, null)(PrivateRoute);
