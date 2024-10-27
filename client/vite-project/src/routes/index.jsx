// src/routes/index.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routesData } from "../utilities/mock";
import LayoutWrapper from "../utilities/LayoutWrapper";

const RoutesPath = () => (
  <Router>
    <Routes>
      {routesData.map((route, index) => {
        const { path, exact, component: Component, layout: Layout } = route;
        const WrappedComponent = LayoutWrapper(Component, Layout);
        return (
          <Route
            key={index}
            path={path}
            exact={exact}
            element={<WrappedComponent />}
          />
        );
      })}
    </Routes>
  </Router>
);

export default RoutesPath;
