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
import schoolImage from "../../../assets/bigIcon/schoolIcon.png";
import userListImage from "../../../assets/bigIcon/userList.png";
import { useNavigate } from "react-router-dom";

function SchoolsManagement() {
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
      schoolId: "SCH-001",
      name: "Central Elementary School",
      address: "123 Main St, Anytown",
      stage: "Elementary",
      ower: "John Smith",
      number: "(555) 555-1234",
      total: "300",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 2,
      schoolId: "SCH-001",
      name: "Central Elementary School",
      address: "123 Main St, Anytown",
      stage: "Elementary",
      ower: "John Smith",
      number: "(555) 555-1234",
      total: "300",
      status: "Active",
      joinDate: "2024-05-18",
    },
    {
      id: 3,
      schoolId: "SCH-001",
      name: "Central Elementary School",
      address: "123 Main St, Anytown",
      stage: "Elementary",
      ower: "John Smith",
      number: "(555) 555-1234",
      total: "300",
      status: "Active",
      joinDate: "2024-05-18",
    },
    // Add more users as needed
  ];
  const handleCreateSchool = () => {
    navigate('/AddSchool')
  }
  const handleSchoolDetail = () => {
    navigate('/SchoolDetail')
  }
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"Schools Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Total EdoSUBEB Schools"}
                image={schoolImage}
                figure={"4,323"}
                margin={"↑"}
                marginColor={"green"}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                icon={faAdd}
                text={"Add School"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateSchool()}

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
                text={"Create New School"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateSchool()}
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
                      {user.schoolId}
                      <span className="text-muted InventoryCategoryText">
                        {" "}
                        | {user.address}{" "}
                        <span className="d-none d-lg-inline me">
                          {user.stage} | {user.ower} | {user.number} |{" "}
                          <b>{user.total}</b> |
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
                          | {user.joinDate}
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
                  <PrimaryButton text={"Edit"} Primarystyle={"UserViewButton d-none d-lg-block"}  />
                  <PrimaryButton
                    text={"View"}
                    Primarystyle={"schoolViewButton"}
                    clickEvent={() => handleSchoolDetail()}
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

export default SchoolsManagement;
