import { useQuery } from "@apollo/client";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { GET_BOOK, GET_BOOK_LIST } from "../../../queries/queries";
import FlatList from "../../common/FlatList";

function Home() {
  const [searchParams] = useSearchParams();

  const location = useLocation();

  const navigate = useNavigate();

  const { id = '' } = location.state || {};

  const isView = searchParams.get("type") === "View";

  let idQuery = {
    variables: { id: id },
  };

  if (!isView) {
    delete idQuery.variables;
  }

  const { data, loading } = useQuery(
    isView ? GET_BOOK : GET_BOOK_LIST,
    idQuery
  );

  const { books, book } = data || [];

  const actionCall = (type, name, id) => {
    navigate(`/book-list?type=${type}&name=${name.split(" ").join("-")}`, {
      state: { id: id },
    });
  };

  const renderBookList = ({ item }) => {
    const { id, name, genre } = item || {};

    return (
      <div className="d-flex flex-row justify-content-center align-items-center">
        <p
          className="text-light text-center m-0 py-2 pe-2"
          role="button"
          onClick={() => actionCall("View", name, id)}
        >
          {books.indexOf(item) + 1}
          {". " + name + " " + "-" + " " + genre}{" "}
        </p>
        <span
          role="button"
          className="text-light"
          onClick={() => {
            navigate(`/update-book/${id}`, {
              state: { item, type: 'book' },
            });
          }}
        >
          &#9935;
        </span>
      </div>
    );
  };

  const renderAboutBook = (item, title) => {
    return (
      <span className="text-light text-center m-0 py-2">
        <span className="text-danger">{title.toUpperCase()}</span> :{" "}
        {item?.[`${title}`] ?? "-"}
      </span>
    );
  };

  return (
    <div className="row">
      <div className="col-12 bg-warning p-5">
        {isView ? (
          <>
            <h3 className="text-danger font-weight-bold text-center">
              About Book
            </h3>
            <>
              {loading ? <h2 className="mb-0 text-light">Loading...</h2> : null}
              <p className="text-center">{renderAboutBook(book, "name")}</p>
              <p className="text-center">{renderAboutBook(book, "genre")}</p>
              <p className="text-center">
                {renderAboutBook(book?.author, "name")}
              </p>
              <p className="text-center">
                {renderAboutBook(book?.author, "dob")}
              </p>
              <p className="text-center">
                {renderAboutBook(book?.author, "native")}
              </p>
              <button
                type="button"
                className="btn btn-danger text-light mx-auto d-block"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </>
          </>
        ) : (
          <>
            <h3 className="text-danger font-weight-bold text-center">
              Book List
            </h3>
            {loading ? <h2 className="mb-0 text-light">Loading...</h2> : null}
            <FlatList data={books} comp={renderBookList} loading={loading} />
            <button
              type="button"
              className="btn btn-danger text-light mx-auto d-block"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
