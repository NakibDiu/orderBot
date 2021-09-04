import React, { useState, useEffect } from "react";

import { Box, FormLabel, Select } from "@chakra-ui/react";

const Categories = (props) => {
  let categoryOptions = null;

  if (props.categories) {
    categoryOptions = props.categories.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    });
  }

  return (
    <Box>
      <FormLabel htmlFor="category">Category</FormLabel>
      <Select
        {...props.register("category", {
          required: true,
        })}
        id="category"
        name="category"
      >
        {categoryOptions}
      </Select>
    </Box>
  );
};

export default Categories;
