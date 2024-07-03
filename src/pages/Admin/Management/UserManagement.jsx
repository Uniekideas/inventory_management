import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import usersImage from "../../../assets/bigIcon/userManagement.png";
import userListImage from "../../../assets/bigIcon/userList.png";
import { useNavigate } from "react-router-dom";


function UserManagement() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];
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
  const handleCreateUser = () => {
    navigate('/CreateNewUser')
  }
  const handleUserDetail = () => {
    navigate('/UserDetail')
  }

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"User Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
              title={'Total IMS Users'}
                image={usersImage}
                figure={"709"}
                margin={"↑"}
                marginColor={"green"}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                icon={faAdd}
                text={"Create New User"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateUser()}
              />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <PrimaryButton
                icon={faAdd}
                text={"Create New User"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateUser()}
              />
            </Col>
          </Row>
          <Container>
            {users.map((user) => (
              <Row
                key={user.id}
                className="UserListRow my-2 py-2 align-items-center"
              >
                <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                  <Image src={userListImage} rounded width="50" height="50" />
                  <div>
                    <h6>{user.name}</h6>
                    <h7 className="fs-6">
                      {" "}
                      USR-001
                      <span className="text-muted InventoryCategoryText">
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
                <Col
                  xs={3}
                  md={3}
                  sm={3}
                  lg={3}
                  className="d-flex justify-content-end gap-2"
                >
                  <PrimaryButton text={"View"} Primarystyle={"UserViewButton"} clickEvent={() => handleUserDetail()}/>
                  <PrimaryButton
                    text={"Deactivate Account"}
                    Primarystyle={"UserDeactivateButton d-none d-lg-block"}
                  />
                </Col>
              </Row>
            ))}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default UserManagement;
