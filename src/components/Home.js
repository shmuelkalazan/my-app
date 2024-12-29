import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBranches } from "../redux/slices/branchesSlice";
import Filter from "./Filter";
import BranchesList from "./BranchesList";

function Home() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const logo =
    "https://upload.wikimedia.org/wikipedia/commons/4/4b/McDonald%27s_logo.svg";

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="header">
        <img src={logo} alt="McDonald's Logo" className="logo" />
        <h1>Company Branches</h1>
      </div>
      <div className="row filters">
        <Filter />
      </div>
      <div className="row">
        <BranchesList />
      </div>
    </div>
  );
}

export default Home;
