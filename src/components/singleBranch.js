import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { updateCurrentBranch } from "../redux/slices/branchesSlice";

export default function SingleBranch() {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const currentBranch = useSelector((state) => state.branches.currentBranch);

  const handleClose = () => {
    setShowModal(false);
    dispatch(updateCurrentBranch({}));
  };

  if (!currentBranch?.store_id) return null;

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center w-100 branch-modal-title">
          {currentBranch.store_title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}