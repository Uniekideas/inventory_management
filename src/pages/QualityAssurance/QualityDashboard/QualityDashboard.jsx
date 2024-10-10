import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "./QualityDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import QualityNavigation from "../../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { NoImagCard } from "../../../components/Card/PresentaionCard";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { useLocation, useNavigate } from "react-router-dom";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";

function QualityDashboard() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const [filterBy, setFilterBy] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [change, setChange] = useState(false);
  const [logs, setLogs] = useState([]);
  const { getTrackings, getTrackingsData, getTrackingsIsLoading } =
    useContext(TrackingContext);
  const getLogs = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/get-logs`);

      setLogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  useEffect(() => {
    getTrackings();
    setFilteredData(getTrackingsData);
  }, [change]);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getTrackingsData]);

  const handleApprove = async (status, id) => {
    try {
      const res = await axios.put(`${baseUrl}/api/tracking/${id}`, { status });
      console.log(res.data);
      setChange(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilterSortSearch = () => {
    let filtered = [...getTrackingsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.status === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.item_name.localeCompare(b.item_name);
        } else {
          return b.item_name.localeCompare(a.item_name);
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterDataSortBy = [
    {
      pk: 1,
      type: "ascending",
    },
    {
      pk: 2,
      type: "descending",
    },
  ];
  const filterData = [
    {
      pk: 1,
      type: "pending",
    },
    {
      pk: 2,
      type: "approved",
    },
    {
      pk: 3,
      type: "denied",
    },
  ];
  const users1 = [
    {
      id: 1,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 2,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 3,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 4,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 5,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 6,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
  ];

  const activities = [
    {
      id: 1,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 2,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 3,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 4,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 5,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
  ];
  const handleApprovalDetail = () => {
    navigate("/ApprovalDetail");
  };
  console.log("list");
  console.log(filteredData);
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <QualityNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Dashboard"} />
            {/* <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This week"}
            /> */}
          </div>
          <Row className="mb-5 mt-5">
            <TitleHeader
              text={"Your Schools"}
              headerTextStyle={"headerTextStyle"}
            />
            <div className="d-flex quailtyDashboardDisplaySchoolWrapper">
              {Array.from({ length: 4 }).map((_, index) => (
                <NoImagCard
                  key={index}
                  title={`School ${index + 1}`}
                  figure={"4,678"}
                  margin={"↓"}
                  marginColor="red"
                />
              ))}
            </div>
          </Row>
          <Row className="d-lg-none mb-2">
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <TitleHeader
                text={"Approval Queue"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
            <Col
              xl={6}
              lg={6}
              md={12}
              sm={12}
              xs={12}
              className="d-flex justify-content-between ms-auto gap-3"
            >
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterDataSortBy}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <div className="d-flex justify-content-between">
              <TitleHeader
                text={"Approval Queue"}
                headerTextStyle={"headerTextStyle"}
              />

              <Col className="d-flex justify-content-end ms-auto gap-3">
                <Filter
                  optionTitle={"Filter by"}
                  options={filterData}
                  defult={"Ramdom"}
                  onSelect={(value) => setFilterBy(value)}
                />
                <Filter
                  optionTitle={"Sort by"}
                  options={filterDataSortBy}
                  defult={"Ramdom"}
                  onSelect={(value) => setSortBy(value)}
                />
              </Col>
            </div>
          </Row>
          <Container className="ListContainer mb-5">
            {!getTrackingsIsLoading ? (
              filteredData && filterData.length > 0 ? (
                filteredData.map((item) => (
                  <Row
                    key={item.id}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={7} md={7} sm={7} lg={7} className="d-flex gap-3">
                      <Image
                        src={inventoryListImage}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{item.item.name}</h6>
                        <h6 className="fs-6">
                          {" "}
                          {item.action}
                          <span className="quailtyDashboardListText">
                            {" "}
                            | {item.address} |{" "}
                            <span
                              style={{
                                color:
                                  item.status == "delivered" ? "green" : "red",
                              }}
                            >
                              {item.status}
                            </span>
                            |
                            <span className="d-none d-lg-inline me">
                              {item.brand} | {item.created_at}
                            </span>{" "}
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      className="d-flex justify-content-end gap-2 d-none d-lg-flex"
                    >
                      <PrimaryButton
                        text={"View"}
                        Primarystyle={
                          "quailtyListViewButton rounded rounded-4 px-4 "
                        }
                        clickEvent={() => handleApprovalDetail()}
                      />
                      <PrimaryButton
                        text={"Approve"}
                        Primarystyle={
                          "bg-success border border-0 rounded rounded-4 px-3 "
                        }
                        clickEvent={() => handleApprove("approved", item.id)}
                      />
                      <PrimaryButton
                        text={"Deny"}
                        Primarystyle={
                          "bg-danger border border-0 rounded rounded-4 px-3"
                        }
                        clickEvent={() => handleApprove("denied", item.id)}
                      />
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no available item! 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getTrackingsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default QualityDashboard;
