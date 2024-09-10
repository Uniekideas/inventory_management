import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import "../Management/Management.css";
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

function SchoolInventory({ Searchstyle, searchText }) {
  const navigate = useNavigate();
  const location = useLocation();
  let { pk } = useParams();

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
  const [items, setItems] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [getSingleSchoolIsLoading, setSingleSchoolIsLoading] = useState(true);
  const [exportType, setExportType] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [itemsCount, setItemsCount] = useState(0);
  const [lowItemsCount, setLowItemsCount] = useState(0);

  const getSchool = async () => {
    setSingleSchoolIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school/${pk}`);
      let items = response.data.items;
      let lowStock = 0; //items.filter((item) => item.quantity < 36);
      setSchoolName(response.data.school.name);
      setItemsCount(response.data.pagination.total);
      setLowItemsCount(lowStock);
      console.log(response.data.items);
      setFilteredData(response.data.items);
    } catch (error) {
      console.log(error);
    } finally {
      setSingleSchoolIsLoading(false);
    }
  };

  useEffect(() => {
    getSchool();
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = filteredData;
    let SearchData = filteredData;

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
      console.log("search");
      console.log(filtered);
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
          <TitleHeader text={`${schoolName} Inventory`} />

          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={schoolImage}
                figure={itemsCount}
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
                figure={lowItemsCount}
                margin={"↓"}
                marginColor={"red"}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
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

          <Container className="ListContainer">
            {!getSingleSchoolIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                <>
                  {filteredData.map((Item, index) => (
                    <Row
                      key={index}
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
                        {/* <PrimaryButton
                          text={"Edit"}
                          Primarystyle={"UserViewButton d-none d-lg-block"}
                          clickEvent={() => handleEditDetail(Item.id)}
                        /> */}
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
                <Loading loading={getSingleSchoolIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default SchoolInventory;
