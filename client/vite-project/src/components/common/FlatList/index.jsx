export const MapLayout = (data, Comp, loading) => {
  return loading || data ? (
    data?.map((item, index) => <Comp key={index} item={item} />)
  ) : (
    <p className="mb-0 text-light">No data available...!</p>
  );
};

const FlatList = ({ data, comp, loading }) => {
  let hocFlatList = MapLayout(data, comp, loading);
  return hocFlatList;
};

export default FlatList;
