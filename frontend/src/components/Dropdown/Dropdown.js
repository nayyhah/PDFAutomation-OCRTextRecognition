import React, { useState } from "react";

import "./dropdown.styles.css";
import ChevronRight from "../../SVG/chevron-right";

const items = [
  { id: "0", label: "DELL" },
  { id: "1", label: "AMAZON" },
];

const Dropdown = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id, item) => {
    console.log(id);
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);
    // let field = [...fields];
    // field[index].role = item.label;
    // setFields(field);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedItem
          ? items.find((item) => item.id === selectedItem).label
          : "Select Template"}
        <div className={`icon ${isOpen && "open"}`}>
          <ChevronRight />
        </div>
      </div>
      <div className={`dropdown-body ${isOpen && "open"}`}>
        {items.map((item) => (
          <div
            className="dropdown-item"
            onClick={(e) => handleItemClick(e.target.id, item)}
            id={item.id}
            key={item.id}
          >
            <span
              className={`dropdown-item-dot ${
                item.id === selectedItem && "selected"
              }`}
            >
              •{" "}
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
