import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import { useState } from "react";

const SortSelect = ({ sort, setSort }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <div className="filter">
        <FormControl
  size="small"
  sx={{
    minWidth: 220,
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": { borderColor: " #9c690a" },
    },
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputLabel-root.Mui-focused": { color: " #9c690a" },
  }}
>
  <InputLabel>Sort By</InputLabel>

  <Select
    value={sort}
    label="Sort By"
    onChange={handleChange}
    sx={{ color: "black" }}
  >
    <MenuItem value="">Normal</MenuItem>
    <MenuItem value="low">Price: Low to High</MenuItem>
    <MenuItem value="high">Price: High to Low</MenuItem>
    <MenuItem value="popular">Most Popular</MenuItem>
  </Select>
</FormControl>
    </div>
  );
};

export default SortSelect;