import { useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./style.module.scss";
import AddAuthor from "./AddAuthor/AddAuthor";
import AddBook from "./AddBook/AddBook";

function AddList() {
  const [activePill, setActivePill] = useState("author");

  const location = useLocation();

  const { item = {}, type } = location.state || {};

  const isAuthorCompleted = (status) => {
    status &&
      (() => {
        setActivePill("book");
      })();
  };

  const renderPill = (title = "Add Author", pillKey, hidePill = false) => {
    const isActive = activePill === pillKey;

    return (
      <button
        type="button"
        className={`bg-${isActive ? "success" : "dark"} ${styles.tabBtn} ${
          hidePill && "d-none"
        } p-3 w-100 m-0`}
        onClick={() => setActivePill(pillKey)}
      >
        <p className={`text-light text-center mb-0`}>{title}</p>
      </button>
    );
  };

  return (
    <div className="row">
      <div className="col-12 bg-warning p-5">
        <div
          className={`${styles.listContainer} d-flex justify-content-around bg-warning`}
        >
          {renderPill("Add Author", "author", type === "book")}
          {renderPill("Add Book", "book")}
        </div>
        <div className="p-5 bg-success mt-2">
          {activePill === "author" && type !== "book" ? (
            <AddAuthor isAuthorCompleted={isAuthorCompleted} />
          ) : (
            <AddBook bookObj={item} isBook={type === "book"} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AddList;
