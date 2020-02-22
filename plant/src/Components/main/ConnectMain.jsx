import { connect } from "react-redux";
import Main from "../../components/main/Main.component";

const mapStateToProps = store => {
    return {
        user: store.user
      };
};

export default connect(mapStateToProps, null)(Main);