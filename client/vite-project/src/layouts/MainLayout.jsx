import PropTypes from "prop-types";

export const MainLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 bg-dark d-flex justify-content-center align-items-center vh-100">
          {children}
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};
