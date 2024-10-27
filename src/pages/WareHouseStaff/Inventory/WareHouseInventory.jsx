import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./WareHouseInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { LoadingPropagate } from "../../../components/Loading/Loading";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate, scrollToTop } from "../../../utils/HelperFunc";
import MessageContext from "../../../context/Message/MessageContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";

import Search from "../../../components/Search/Normalsearch/Search";

import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function WareHouseInventory() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    getInventoryItems,
    getItemsData,
    getItemsPagination,
    getItemsDataCount,
    getLowStockItemsDataCount,
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
  const [buttonText, setButtonText] = useState("search");
  const [buttonClick, setButtonClick] = useState(false);

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
    let filtered = [...getItemsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.subject_category === filterBy);
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleGenerateReport = () => {
    navigate("/WareHouseGenerateInventory");
  };
  const handleAdditem = () => {
    navigate("/AddNewItem");
  };
  const handleItemDetail = (pk) => {
    navigate(`/ItemDetail/${pk}`);
  };
  const handleTrackMovementLog = () => {
    navigate("/TrackMovementLog"); // Assuming pk is the identifier for the item
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
          <TitleHeader text={"Inventory Management"} />

          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={schoolImage}
                figure={getItemsDataCount}
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
                image={inventoryImage}
                figure={getLowStockItemsDataCount}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>

          <Row className="mb-5">
            <Col>
              <PrimaryButton
                text={"Inventory Report"}
                Primarystyle={"WareHouseGenerateInventoryButton"}
                clickEvent={() => handleGenerateReport()}
              />{" "}
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add Item"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleAdditem()}
              />
            </Col>
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"LGA"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={sortOption}
                defult={"School type"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Form>
                <div className="d-flex">
                  <input
                    type="text"
                    placeholder="Search Inventory"
                    className="seachContentBar px-3 me-2 flex-grow-1"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ display: "block", borderRadius: 10 }}
                  />
                  {!buttonClick ? (
                    <PrimaryButton
                      Primaryicon={faSearch}
                      Primarystyle={"UserManagementCreateButton"}
                      clickEvent={() => handleAdditem()}
                    />
                  ) : (
                    <Button variant="success" className="p-2" type="submit">
                      <LoadingPropagate loading={buttonClick} />
                    </Button>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                <>
                  <table className="table rounded mt-5">
                    <thead>
                      <tr>
                        <th>SN</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Quantity</th>
                        <th>Stock</th>
                        <th>....</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((Item, index) => (
                        <tr key={Item.id}>
                          <th>{index + 1}</th>
                          <td>
                            <Image
                              src={Item.image}
                              rounded
                              width="50"
                              height="50"
                            />
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-link"
                              onClick={() => handleItemDetail(Item.item_code)}
                            >
                              {Item.item_name}
                            </button>
                          </td>
                          <td>{Item.subject_category}</td>
                          <td>{Item.quantity}</td>
                          <td>
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
                                ? "In stock"
                                : Item.quantity < 1
                                ? "Out of stock"
                                : "Low on stock"}
                            </span>
                          </td>
                          <td>
                            <PrimaryButton
                              text={"Edit"}
                              Primarystyle={"UserViewButton"}
                              clickEvent={() => null} //handleEditDetail(Item.id)
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

export default WareHouseInventory;
