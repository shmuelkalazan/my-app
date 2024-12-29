import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateSelectedRegion,
  updateSelectedCity,
  updateSearchText,
} from "../redux/slices/branchesSlice";

export default function Filter() {
  const dispatch = useDispatch();
  const filterInput = useRef();

  const branches = useSelector((state) => state.branches.branchesList);
  const selectedRegion = useSelector((state) => state.branches.selectedRegion);
  const searchText = useSelector((state) => state.branches.searchText);

  const regions = [
    ...new Set(branches && branches.map((branch) => branch.store_region)),
  ];
  const cities = [
    ...new Set(
      branches &&
        branches
          .filter(
            (branch) =>
              selectedRegion === 0 || branch.store_region === selectedRegion
          )
          .map((branch) => branch.city)
    ),
  ];

  function filterBranches(searchText) {
    dispatch(updateSelectedRegion(0));
    dispatch(updateSelectedCity(""));
    dispatch(updateSearchText(searchText));
  }
  function updateRegion(selectedValue) {
    dispatch(updateSelectedRegion(selectedValue === "0" ? 0 : selectedValue));
  }

  function updateCity(selectedValue) {
    dispatch(updateSelectedCity(selectedValue === "0" ? 0 : selectedValue));
  }
  return (
    <div className="filters">
      <select
        defaultValue="0"
        className="filter-select"
        onChange={(e) => updateRegion(e.target.value)}
      >
        <option value="0">All Regions</option>
        {regions &&
          regions.map((region, index) => (
            <option key={index} value={region}>
              {region}
            </option>
          ))}
      </select>

      <select
        defaultValue="0"
        className="filter-select"
        onChange={(e) => updateCity(e.target.value)}
      >
        <option value="0">All Cities</option>
        {cities &&
          cities.map((city, index) => (
            <option key={index} value={city} className="dropdown-item">
              {city}
            </option>
          ))}
      </select>
      <input
        type="text"
        ref={filterInput}
        name="search"
        placeholder="Search Your Branch"
        className="filter-search"
        value={searchText}
        onChange={(e) => {
          filterBranches(e.target.value);
        }}
      />
    </div>
  );
}
