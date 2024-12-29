import { useSelector, useDispatch } from "react-redux";
import { updateCurrentBranch } from "../redux/slices/branchesSlice";
import { Button } from "react-bootstrap";
import SingleBranch from "./singleBranch";

export default function BranchesList() {
  const dispatch = useDispatch();

  const {
    branchesList: branches,
    selectedRegion,
    selectedCity,
    currentBranch,
    searchText,
  } = useSelector((state) => state.branches);

  const filterBranches = searchText
    ? branches.filter((branch) =>
        branch.store_title.toLowerCase().includes(searchText.toLowerCase())
      )
    : branches.filter(
        (branch) =>
          (selectedRegion === 0 || branch.store_region === selectedRegion) &&
          (selectedCity === 0 || branch.city === selectedCity)
      );

  const handleBranchClick = (branch) => {
    dispatch(updateCurrentBranch(branch));
  };
  return (
    <div className="row">
      {filterBranches?.length > 0
        ? filterBranches.map((branch) => (
            <div key={branch.store_id} className="col-3">
              <div className="branch-card">
                <Button
                  type="button"
                  variant="outline-white"
                  className="branch-button"
                  onClick={() => handleBranchClick(branch)}
                >
                  <h6>{branch.store_title}</h6>
                </Button>
              </div>
            </div>
          ))
        : ""}

      {currentBranch?.store_id && (
        <SingleBranch currentBranch={currentBranch}></SingleBranch>
      )}
    </div>
  );
}
