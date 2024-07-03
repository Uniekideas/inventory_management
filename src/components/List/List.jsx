import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import userListImage from "../../assets/bigIcon/userList.png";
import "./List.css";
import PrimaryButton from "../Button/PrimaryButton";

const users = [
  {
    id: 1,
    name: "John Doe",
    role: "Admin",
    email: "johndoe@xyz.com",
    phone: "(555) 555-1234",
    status: "Active",
    joinDate: "2024-05-18",
    image: "path/to/image.jpg", // Replace with the path to the user's image
  },
  {
    id: 2,
    name: "John Doe",
    role: "Admin",
    email: "johndoe@xyz.com",
    phone: "(555) 555-1234",
    status: "Inactive",
    joinDate: "2024-05-18",
    image: "path/to/image.jpg", // Replace with the path to the user's image
  },
  // Add more users as needed
];
function List({key, image, itemname, button1Text, button2Text, button2Style}) {
  return (
    <Container>
      {users.map((user) => (
        <Row key={user.id} className="UserListRow my-2 py-2 align-items-center">
          <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
            <Image src={userListImage} rounded width="50" height="50" />
            <div>
              <h6>{user.name}</h6>
              <h7 className="fs-6">
                {" "}
                USR-001
                <span className="text-muted">
                  {" "}
                  | {user.role}{" "}
                  <span className="d-none d-lg-inline me">
                    {user.email} {user.phone} |
                    <span
                      className={
                        user.status === "Active"
                          ? "text-success"
                          : "text-danger"
                      }
                    >
                      {" "}
                      {user.status}
                    </span>{" "}
                    |{user.joinDate} {user.joinDate}{" "}
                  </span>{" "}
                </span>
              </h7>
            </div>
          </Col>
          <Col xs={3} md={3} sm={3} lg={3} className="d-flex justify-content-end gap-2">
            <PrimaryButton text={"View"} Primarystyle={"UserViewButton"} />
            <PrimaryButton
              text={"Deactivate Account"}
              Primarystyle={"UserDeactivateButton d-none d-lg-block"}
            />
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default List;
