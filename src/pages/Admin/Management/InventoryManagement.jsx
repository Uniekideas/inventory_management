import React, { useContext, useEffect, useState, useMemo } from "react";
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
// import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate, scrollToTop } from "../../../utils/HelperFunc";
import MessageContext from "../../../context/Message/MessageContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import LineGraph from "../../../components/Graph/LineGraph";
import DoughnutGraph from "../../../components/Graph/DoughnutGraph";
import BarGraph from "../../../components/Graph/BarGraph";

function InventoryManagement({ Searchstyle, searchText }) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    getInventoryItems,
    getItemsData,
    getItemsPagination,
    getItemsDataCount,
    getItemsIsLoading,
    handleNextPage,
    handlePrevPage,
  } = useContext(InventoryItemContext);

  const { ProcessAnalysis, itemDataAnalysis } = useContext(AnalysisContext);

  const { navigationMessages, setnavigationMessages } =
    useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [exportType, setExportType] = useState("");

  const filterData = [
    {
      pk: 1,
      type: "Excel",
    },
    {
      pk: 2,
      type: "pdf",
    },
  ];

  const Piedata = {
    labels: getItemsData.map((item) => item.item_name) || [
      "Red",
      "Blue",
      "Yellow",
      "Green",
      "Purple",
      "Orange",
    ],
    datasets: [
      {
        data: getItemsData.map((item) => item.quantity) || [
          300, 50, 100, 40, 120, 75,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Pieoptions = {
    cutout: "50%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Arkdata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Material Usage",
        data: [650, 590, 800, 810, 560, 550, 400, 700, 750, 650],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const Arkoptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

  useEffect(() => {
    getInventoryItems();
    setFilteredData(getItemsData);
  }, []);

  useEffect(() => {
    ProcessAnalysis(getItemsData, "items");
  }, [getItemsIsLoading]);

  const { value, trend } = itemDataAnalysis;

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getItemsData]);

  useEffect(() => {
    if (location.state?.message || navigationMessages) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(
        redirectMessage || navigationMessages,
        "bg-success"
      );
      navigate(location.pathname, { replace: true, state: {} });
      setnavigationMessages("");
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "English",
      },
      {
        pk: 2,
        type: "Mathematics",
      },
      {
        pk: 3,
        type: "Science",
      },
      {
        pk: 4,
        type: "Home Work",
      },
      {
        pk: 5,
        type: "Stationery",
      },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      {
        pk: 1,
        type: "Highest to Lowest",
      },
      {
        pk: 2,
        type: " Lowest to Highest ",
      },
    ],
    []
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getItemsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.subject_category === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "Highest to Lowest") {
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

  const handleCreateItem = () => {
    navigate("/AddNewItem");
  };
  const handleGenerateReport = () => {
    navigate("/GenerateInventory");
  };
  const handleViewReport = () => {
    navigate("/ReportAnalytics");
  };
  const handleItemDetail = (pk) => {
    navigate(`/ItemDetail/${pk}`);
  };

  const handleEditDetail = (pk) => {
    navigate(`/EditItem/${pk}`);
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
          <BackButtonIcon />
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
              <PrimaryButton
                text={"Generate Inventory Report"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={handleGenerateReport}
              />
            </Col>
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
              <PrimaryButton
                text={"View Inventory Reports"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={handleViewReport}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              {/* <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Inventory..."}
                onSearchChange={handleSearchChange}
              /> */}
              <div className={`sideNavSearchBarContainer ${Searchstyle}`}>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="sideNavSearchIcon"
                />
                <input
                  type="text"
                  placeholder="Search Inventory"
                  className="sideNavSearchBar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ display: "block", width: "100%", borderRadius: 10 }}
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={schoolImage}
                figure={getItemsDataCount ? getItemsDataCount : 0}
                margin={`${
                  trend === "up" ? "↑" : trend === "down" ? "↓" : "~"
                } ${value}`}
                marginColor={
                  trend === "up"
                    ? "text-success"
                    : trend === "down"
                    ? "text-danger"
                    : "text-primary"
                }
              />
            </Col>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Low Stock Alerts"}
                image={schoolImage}
                figure={"46"}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
                onSelect={(value) => setExportType(value)}
              />
            </Col>
          </Row>

          <Row className="d-none d-lg-flex">
            <Col lg={6} md={5} xl={6}>
              <TitleHeader
                text={"Inventory Insights"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
            <Col className="d-flex justify-content-end ms-auto gap-3 mb-2">
              <Filter
                optionTitle={"Predictive Analytics"}
                options={""}
                defult={""}
              />
              <Filter
                optionTitle={"Sort by"}
                // options={filterData}
                defult={"All"}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={6} xl={4} sm={12} xs={12} className="mb-3">
              <DoughnutGraph data={Piedata} options={Pieoptions} />
            </Col>
            <Col lg={6} md={6} xl={8} sm={12} xs={12} className="">
              <LineGraph data={Arkdata} options={Arkoptions} />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Create New Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={handleCreateItem}
              />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Category"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"sort by"}
                options={sortOption}
                defult={"Highest to Lowest"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filters by"}
                options={filterOption}
                defult={"Category"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"Highest to Lowest"}
                onSelect={(value) => setSortBy(value)}
              />
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={handleCreateItem}
              />
            </Col>
          </Row>
          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                <>
                  {filteredData.map((Item) => (
                    <Row
                      key={Item.id}
                      className="UserListRow my-2 py-2 align-items-center"
                    >
                      <Col xs={9} className="d-flex gap-3">
                        <Image
                          src={Item.image}
                          rounded
                          width="50"
                          height="50"
                        />
                        <div>
                          <h6>{Item.item_name}</h6>
                          <h6 className="fs-6">
                            INV-{Item.id}
                            <span className="text-muted InventoryCategoryText">
                              | {Item.category} | {""}
                              <span className="d-none d-lg-inline me">
                                {Item.item_code} | {`${Item.school}`} |{" "}
                                {Item.quantity} {""}
                                <span
                                  className={
                                    Item.quantity > 35
                                      ? "text-success"
                                      : Item.quantity < 1
                                      ? "text-danger"
                                      : "text-warning"
                                  }
                                >
                                  {Item.quantity > 35
                                    ? "| In stock"
                                    : Item.quantity < 1
                                    ? "| Out of stock"
                                    : "| Low on stock"}
                                </span>{" "}
                                | {""}
                                {Item.supplier} | {""}
                                <span
                                  className={
                                    Item.status === "pending"
                                      ? "text-danger"
                                      : "text-success"
                                  }
                                >
                                  {Item.status}
                                </span>{" "}
                                | {""}
                                {convertDate(Item.created_at)}
                              </span>
                            </span>
                          </h6>
                        </div>
                      </Col>
                      <Col xs={3} className="d-flex justify-content-end gap-2">
                        <PrimaryButton
                          text={"Edit"}
                          Primarystyle={"UserViewButton d-none d-lg-block"}
                          clickEvent={() => handleEditDetail(Item.id)}
                        />
                        <PrimaryButton
                          text={"View details"}
                          Primarystyle={"schoolViewButton"}
                          clickEvent={() => handleItemDetail(Item.item_code)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 4,
                      marginBottom: 10,
                    }}
                  >
                    <button
                      type="button"
                      onClick={(e) =>
                        handlePrevPage(e, getItemsPagination?.prev_page_url)
                      }
                      disabled={getItemsPagination?.prev_page_url === null}
                      className="btn btn-outline-primary"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={(e) =>
                        handlePrevPage(e, getItemsPagination?.next_page_url)
                      }
                      disabled={getItemsPagination?.next_page_url === null}
                      className="btn btn-outline-primary"
                    >
                      Next
                    </button>
                  </div>
                </>
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
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default InventoryManagement;
