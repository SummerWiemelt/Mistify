import { connect } from "react-redux";
import PlantsPage from "./PlantsPage";

const mapStateToProps = state => {
  return state.plants;
};

export default connect(mapStateToProps, null)(PlantsPage);
