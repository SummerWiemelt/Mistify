import { connect } from "react-redux";
import LoginPage from "../../pages/loginPage/LoginPage";

const mapStateToProps = store => {
    return {
        user: store.user
      };
};

export default connect(mapStateToProps, null)(LoginPage);