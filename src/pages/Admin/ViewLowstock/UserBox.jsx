import React from "react";
import { Modal, Container, Table } from "react-bootstrap";

export const UserBox = ({ items, show, handleClose }) => {
  let allLowItems = items;

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Low Stock Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <Table responsive="lg" striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Code</th>
                  <th className="">Barcode ID</th>
                  <th className="">Category</th>
                  <th>Quantity</th>

                  <th>School</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.item_name}</td>
                    <td>{item.item_code}</td>
                    <td className="">{item.barcode_id}</td>
                    <td className="">{item.subject_category}</td>
                    <td>{item.quantity}</td>
                    <td>{item.school}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
