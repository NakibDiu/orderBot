import React from "react";

import { Select } from "@chakra-ui/react";

const CategoryOptions = (props) => {
  let options = null;

  if (props.categories) {
    options = props.categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  }

  return (
    <Select
      width="40%"
      onChange={(e) => {
        props.setCategoryID(e.target.value);
        props.handleSearch(e.target.value);
      }}
    >
      <option value="all">All</option>
      {options}
    </Select>
  );
};

export default CategoryOptions;
