import PropTypes from 'prop-types';
import { useMutation } from "@apollo/client";
import { useRef } from "react";
import { ADD_AUTHOR } from "../../../../queries/queries";
import { renderFormInput } from "../../../../utilities/RenderSubComponents";

function AddAuthor({ isAuthorCompleted }) {
  const authorFormRef = useRef();

  const [addAuthor, { loading }] = useMutation(ADD_AUTHOR);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const authorPayload = Object.fromEntries(formData);
    authorPayload.age = Number(authorPayload.age);
    try {
      const { data } = await addAuthor({
        variables: authorPayload,
      });
      if (data && authorFormRef.current) {
        authorFormRef.current.reset();
        isAuthorCompleted(true);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <form ref={authorFormRef} onSubmit={handleSubmit}>
          {renderFormInput(
            "textInput",
            { titleOne: "Author Name:" },
            "name",
            "mb-2"
          )}
          {renderFormInput("textInput", { titleOne: "Age:" }, "age", "mb-2")}
          {renderFormInput("textInput", { titleOne: "DOB:" }, "dob", "mb-2")}
          {renderFormInput(
            "textInput",
            { titleOne: "Native:" },
            "native",
            "mb-2"
          )}
          <label className="form-label text-light mt-2">Martial Status:</label>
          {renderFormInput(
            "radio",
            { titleOne: "Single", titleTwo: "Married" },
            "martialStatus",
            "mb-2"
          )}
          <button
            type="submit"
            className="d-flex justify-content-center align-items-center btn btn-warning text-light mt-3 p-2 w-100"
          >
            Submit{" "}
            <div
              className={`spinner-border text-danger ms-3 ${
                loading ? "d-block" : "d-none"
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

AddAuthor.propTypes = {
  isAuthorCompleted: PropTypes.func.isRequired,
};

export default AddAuthor;
