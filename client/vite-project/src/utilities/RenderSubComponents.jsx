const renderFormInput = (
  type,
  label,
  name,
  spacing,
  options,
  handleSelectChange,
  selectedValue
) => {
  switch (type) {
    case "textInput":
      return (
        <div className={spacing}>
          <label className="form-label text-light">{label.titleOne}</label>
          <input
            type="text"
            className="form-control"
            name={name}
            placeholder=""
            required
          />
        </div>
      );
    case "radio":
      return (
        <div className={`${spacing} d-flex flex-row`}>
          <div className="pe-3">
            <input
              type="radio"
              className="btn-check"
              name={name}
              value={label.titleOne}
              id="danger-outlined-single"
              autoComplete="off"
              required
            />
            <label
              className="btn btn-outline-danger text-warning"
              htmlFor="danger-outlined-single"
            >
              {label.titleOne}
            </label>
          </div>
          <div>
            <input
              type="radio"
              className="btn-check"
              name={name}
              value={label.titleTwo}
              id="danger-outlined-married"
              autoComplete="off"
              required
            />
            <label
              className="btn btn-outline-danger text-warning"
              htmlFor="danger-outlined-married"
            >
              {label.titleTwo}
            </label>
          </div>
        </div>
      );
    case "selectInput":
      return (
        <div className={spacing}>
          <label className="form-label text-light">{label.titleOne}</label>
          <select
            className="form-select"
            name={name}
            value={selectedValue}
            onChange={handleSelectChange}
            aria-label="Default select example"
            required
          >
            <option value="" disabled selected>
              Select an author
            </option>
            {options.map((v, i) => {
              return (
                <option key={i} value={v.id}>
                  {v.name}
                </option>
              );
            })}
          </select>
        </div>
      );
    default:
      return (
        <div className={spacing}>
          <label className="form-label text-light">{label.titleOne}</label>
          <input
            type="text"
            className="form-control"
            name={name}
            placeholder=""
            required
          />
        </div>
      );
  }
};

export { renderFormInput };
