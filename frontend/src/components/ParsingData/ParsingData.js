import React from "react";
import parsed from "../../helpers/parsed-data.json";
import Dropdown from "../Dropdown/Dropdown";
import { unCamelCase } from "../../helpers/functions/un-camelcase";

let items = [];
for (let property in parsed) {
  //console.log("property", property);
  items.push({ id: property, label: unCamelCase(property) });
}
const ParsingData = () => {
  //console.log("parsed data", parsed.From["Contact Name"]);
  console.log("items", items);

  return (
    <div>
      <h2>Parsing data</h2>
      <Dropdown items={items} />
    </div>
  );
};

export default ParsingData;
