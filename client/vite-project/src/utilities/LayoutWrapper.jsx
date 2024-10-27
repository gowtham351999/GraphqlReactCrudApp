const LayoutWrapper = (Component, Layout) => {
  return function WrappedComponent(props) {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};

export default LayoutWrapper;
