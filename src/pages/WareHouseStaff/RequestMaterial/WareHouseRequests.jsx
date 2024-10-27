import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { Container, Row, Col, Image, Table, Button } from "react-bootstrap";
import "./WareHouseTrack.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import { useNavigate, useLocation } from "react-router-dom";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate, scrollToTop } from "../../../utils/HelperFunc";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import MovementLog from "../Inventory/MovementLog";
import Search from "../../../components/Search/Normalsearch/Search";

import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function WareHouseRequest() {
  const navigate = useNavigate();
  const location = useLocation();
  const movementLogRef = useRef(null); // Ref for the MovementLog section

  const { getTrackings, getTrackingsData, getTrackingsIsLoading } =
    useContext(TrackingContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBox, setSelectedBox] = useState(null);
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allData, setAllData] = useState([]);

  const response = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item-request/warehouse`);
      setAllData(response.data.itemRequests);
      setRequestData(response.data.itemRequests);
      console.log("response");
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    response();
    setFilteredData(requestData);
  }, []);

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getTrackingsData]);

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);
  const handleaddmovement = () => {
    navigate("/WareHouseAddMovement");
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "All",
      },
      {
        pk: 2,
        type: "pending",
      },
      {
        pk: 3,
        type: "active",
      },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      {
        pk: 1,
        type: "ascending",
      },
      {
        pk: 2,
        type: "descending",
      },
    ],
    []
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleBoxClick = (boxName) => {
    setSelectedBox(boxName); // Select the box
    setTimeout(() => {
      if (movementLogRef.current) {
        movementLogRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const renderContent = () => {
    switch (selectedBox) {
      case "MovementLog":
        return (
          <div>
            <MovementLog />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <BackButtonIcon />
          <TitleHeader text={"Material Requests"} />
          <Row className="mb-4">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <input
                type="text"
                placeholder="Search Materials"
                className="seachContentBar px-3"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ display: "block", width: "100%", borderRadius: 10 }}
              />
            </Col>
          </Row>

          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"All"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"All"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"All"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"All"}
                onSelect={(value) => setSortBy(value)}
              />
              {/* <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleBoxClick("MovementLog")}
              /> */}
            </Col>
          </Row>
          <Container className=" ListContainer">
            {!isLoading ? (
              <Table responsive="lg" striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Item Name</th>
                    <th>School</th>
                    <th>Quantity</th>
                    <th>Comment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/WarehouseRequestDetail/" + request.id);
                          }}
                        >
                          {request.item.name}
                        </a>
                      </td>
                      <td>{request.school.name}</td>
                      <td>{request.quantity}</td>
                      <td>{request.comment}</td>
                      <td>{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={isLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default WareHouseRequest;
