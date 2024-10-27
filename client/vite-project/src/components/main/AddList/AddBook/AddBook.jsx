import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_BOOK,
  GET_AUTHOR_LIST,
  UPDATE_BOOK,
} from "../../../../queries/queries";
import { useEffect, useRef, useState } from "react";
import { renderFormInput } from "../../../../utilities/RenderSubComponents";

function AddBook({ bookObj = {}, isBook = false }) {
  const {
    id: bookId = "",
    name = "",
    genre = "",
    filmAdaption = "",
    authorId = "",
  } = bookObj;

  const [selectedAuthorId, setSelectedAuthorId] = useState(authorId || "");

  const handleSelectChange = (event) => {
    setSelectedAuthorId(event.target.value);
  };

  const bookFormRef = useRef();

  const navigate = useNavigate();

  const { data, refetch } = useQuery(GET_AUTHOR_LIST);

  const [addBook, { loading: addLoading }] = useMutation(ADD_BOOK);

  const [updateBook, { loading: updateLoading }] = useMutation(UPDATE_BOOK);

  const { authors = [] } = data || {};

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (bookFormRef.current) {
      bookFormRef.current.reset();
      bookFormRef.current.elements["name"].value = name;
      bookFormRef.current.elements["genre"].value = genre;
      bookFormRef.current.elements["filmAdaption"].value = filmAdaption;
      if (authorId) {
        bookFormRef.current.elements["authorId"].value = authorId;
      }
    }
  }, [name, genre, filmAdaption, authorId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookPayload = Object.fromEntries(formData);
    try {
      if (isBook) {
        const { data } = isBook
          ? await updateBook({
              variables: { id: bookId, ...bookPayload },
            })
          : await addBook({
              variables: bookPayload,
            });
        if (data && bookFormRef.current) {
          bookFormRef.current.reset();
          navigate("/book-list");
        }
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <form onSubmit={handleSubmit} ref={bookFormRef}>
          {renderFormInput(
            "textInput",
            { titleOne: "Book Name:" },
            "name",
            "mb-2"
          )}
          {renderFormInput(
            "textInput",
            { titleOne: "Genre:" },
            "genre",
            "mb-2"
          )}
          {renderFormInput(
            "textInput",
            { titleOne: "Film Adaption:" },
            "filmAdaption",
            "mb-2"
          )}
          {renderFormInput(
            "selectInput",
            { titleOne: "Select Author:" },
            "authorId",
            "mb-4",
            authors,
            handleSelectChange,
            selectedAuthorId
          )}
          <button
            type="submit"
            className="d-flex justify-content-center align-items-center btn btn-warning text-light mt-3 p-2 w-100"
          >
            Submit{" "}
            <div
              className={`spinner-border text-danger ms-3 ${
                addLoading || updateLoading ? "d-block" : "d-none"
              }`}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

AddBook.propTypes = {
  bookObj: PropTypes.object,
  isBook: PropTypes.bool,
};

export default AddBook;
