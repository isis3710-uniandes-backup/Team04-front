import React from "react";

const TextArea = props => (
  <div className="form-group">
    <label className="form-label" htmlFor={props.id}>{props.title}</label>
    <textarea
      id={props.id}
      className="form-control"
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
    />
  </div>
);

export default TextArea;
