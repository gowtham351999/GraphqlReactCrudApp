import PropTypes from "prop-types";

export const MainLayout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-xl-flex d-lg-flex justify-content-xl-center align-items-xl-center justify-content-lg-center align-items-lg-center justify-content-start align-items-start vh-100 bg-warning">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};
