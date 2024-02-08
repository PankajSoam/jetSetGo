import { useState } from "react";
import "./DropDown.css";

function DropDown(props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const { dropDownList, label } = props;
  function handleOptionClick(callback) {
    callback();
    setOpen(!open);
  }
  return (
    <div className="dropdown">
      <button onClick={handleOpen}>{label}</button>
      {open ? (
        <ul className="menu">
          {dropDownList.map((element, index) => {
            return (
              <li className="menu-item" key={element.label}>
                <button
                  onClick={() => handleOptionClick(element.onClickHandler)}
                >
                  {element.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export default DropDown;
