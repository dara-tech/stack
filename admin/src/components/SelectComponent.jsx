import React from "react";
import { Select } from "@mantine/core";

const SelectComponent = ({ value, onChange }) => (
  <Select
    label="Category"
    defaultValue={"NEWS"}
    placeholder="Pick Category"
    data={["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION", "MOVIE"]}
    onChange={onChange}
    className="w-full px-4 mt-2"
  />
);

export default SelectComponent;
