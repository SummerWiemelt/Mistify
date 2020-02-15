import { connect } from "react-redux";
import PlantsPage from "./PlantsPage";

const mapStateToProps = store => {
  return store.plants;
};

export default connect(mapStateToProps, null)(PlantsPage);
