
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { updateCurrentBranch } from "../redux/slices/branchesSlice";

export default function SingleBranch() {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const currentBranch = useSelector((state) => state.branches.currentBranch);

  const handleClose = () => {
    setShowModal(!showModal);
    dispatch(updateCurrentBranch({}));
  };

  return (
       <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100">
          {currentBranch.store_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <div className="branch-details">
          <div>
            <strong>Id:</strong> {currentBranch.store_id}
          </div>
          <div>
            <strong>Address:</strong> {currentBranch.store_address}
          </div>
          <div>
            <strong>City:</strong> {currentBranch.city}
          </div>
          <div>
            <strong>Area:</strong> {currentBranch.store_region}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
