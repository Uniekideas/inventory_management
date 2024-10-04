import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Badge, Form } from "react-bootstrap";
import "./Discrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { useNavigate } from "react-router-dom";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate } from "../../../utils/HelperFunc";
import DiscrepancyContext from "../../../context/Discrepancy/DiscrepancyContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function DiscrepancyListResolved() {
  const navigate = useNavigate();

  const {
    getResolvedDiscrepancys,
    getDiscrepancysIsLoading,
    getDiscrepancysData,
  } = useContext(DiscrepancyContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getResolvedDiscrepancys();
    setFilteredData(getDiscrepancysData);
  }, []);

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getDiscrepancysData]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOptionForType = useMemo(() => [
    {
      pk: 2,
      type: "Old to New",
    },
    {
      pk: 3,
      type: "New to Old",
    },
  ]);

  const filterOption = useMemo(
    () => [
      {
        pk: 2,
        type: "AKOKO EDO",
      },
      {
        pk: 3,
        type: "EGOR",
      },
      {
        pk: 4,
        type: "ESAN CENTRAL",
      },
      {
        pk: 5,
        type: "ESAN NORTH EAST",
      },
      {
        pk: 6,
        type: "ESAN SOUTH EAST",
      },
      {
        pk: 7,
        type: "ESAN WEST",
      },
      {
        pk: 8,
        type: "ETSAKO CENTRAL",
      },
      {
        pk: 9,
        type: "ETSAKO EAST",
      },
      {
        pk: 10,
        type: "ETSAKO WEST",
      },
      {
        pk: 11,
        type: "IGUEBEN",
      },
      {
        pk: 12,
        type: "IKPOBA OKHA",
      },
      {
        pk: 13,
        type: "OREDO",
      },
      {
        pk: 14,
        type: "ORHIONMWON",
      },
      {
        pk: 15,
        type: "OVIA NORTH EAST",
      },
      {
        pk: 16,
        type: "OVIA SOUTH WEST",
      },
      {
        pk: 17,
        type: "OWAN EAST",
      },
      {
        pk: 18,
        type: "OWAN WEST",
      },
      {
        pk: 19,
        type: "UHUNMWODE",
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
    let filtered = [...getDiscrepancysData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.category === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "Old to New") {
          return a.discrepancy_type.localeCompare(b.discrepancy_type);
        } else {
          return b.discrepancy_type.localeCompare(a.discrepancy_type);
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleViewDetail = (pk) => {
    navigate(`/DiscrepancyDetail/${pk}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return (
          <Badge
            bg="none"
            className="BadgeList"
            style={{ color: "rgba(41, 141, 44, 1)" }}
          >
            New.
          </Badge>
        );
      case "Under Review":
        return (
          <Badge
            bg="none"
            className="BadgeList"
            style={{ color: "rgba(215, 154, 0, 1)" }}
          >
            Under Review
          </Badge>
        );
      case "Resolved":
        return <Badge bg="success">Resolved</Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}

          <Row className="mb-2">
            <div className="row justify-content-between">
              <div className="col d-flex">
                <BackButtonIcon />
                <TitleHeader text={"Resolved Discrepancy"} />
              </div>
            </div>
          </Row>

          <Row className="mb-3 ">
            <Col className="mb-3 " lg={12} xl={12} md={12} sm={12} xs={12}>
              <input
                type="text"
                placeholder="Search Discrepancies"
                className="searchContentBar p-2"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{
                  display: "block",
                  width: "100%",
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: "gray",
                }}
              />
            </Col>
            {/* <Col
              lg={3}
              md={3}
              xl={2}
              sm={6}
              xs={6}
              className="d-none d-lg-block"
            >
              <Filter
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"LGA"}
                onSelect={(value) => setFilterBy(value)}
              />
            </Col>

            <Col
              lg={3}
              md={3}
              xl={2}
              sm={6}
              xs={6}
              className="d-none d-lg-block"
            >
              <Filter
                optionTitle={"Sort by"}
                options={filterOptionForType}
                defult={"All"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col> */}
          </Row>

          <Row>
            <Container className="">
              {!getDiscrepancysIsLoading ? (
                filteredData && filteredData.length > 0 ? (
                  <table className="table rounded mt-5">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th>Reporter</th>
                        <th>Status</th>
                        <th>Created at</th>
                        <th>....</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.description}</td>
                          <td>{item.discrepancy_type}</td>
                          <td>{item.reporter}</td>
                          <td>{item.status}</td>
                          <td>{convertDate(item.created_at)}</td>
                          <td>
                            <PrimaryButton
                              text={"View"}
                              Primarystyle={"ListButton"}
                              clickEvent={() => handleViewDetail(item.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                  <Loading loading={getDiscrepancysIsLoading} />
                </Container>
              )}
            </Container>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DiscrepancyListResolved;
