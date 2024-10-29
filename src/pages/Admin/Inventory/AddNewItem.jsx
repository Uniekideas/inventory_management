import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import MessageContext from "../../../context/Message/MessageContext";
import Select from "react-select";
import axios from "axios";

function AddNewItem() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState([]);
  const [csv, setCsv] = useState(null);

  const {
    handleAddItem,
    addItemIsLoading,
    addItemResponse,
    addItemError,
    setAddItemError,
    setAddItemResponse,
  } = useContext(InventoryItemContext);
  const [loading, setLoading] = useState(false);
  const { setnavigationMessages } = useContext(MessageContext);
  const categories = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/category`);

      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categories();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    if (!addItemIsLoading && addItemResponse) {
      setnavigationMessages("Item added successful!");
      navigate(-1);
      setAddItemResponse(null);
    }
  }, [addItemIsLoading, addItemResponse, navigate]);

  useEffect(() => {
    if (!addItemIsLoading && addItemError) {
      scrollToTop();
      handleComfirmationPopUps(addItemError, "bg-danger");
      setButtonLoading(false);
    }
    setAddItemError(null);
  }, [addItemIsLoading, addItemError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (
      addItemIsLoading ||
      (!addItemIsLoading && !addItemError && !addItemResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleSubmit = (e) => {
    handleAddItem(e);
    handleLoadingClick();
  };

  const handleFileChange = (event) => {
    const fileName = event.target.files[0]?.name || "Choose a file";
    document.getElementById("fileLabel").innerText = fileName;
  };

  const handleCsvChange = (e) => {
    const file = e.target.files[0];
    setCsv(file);
  };

  const handleCsvSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setAddItemError(null);
      const formData = new FormData();
      formData.append("file", csv);

      const res = await axios.post(`${baseUrl}/api/item/upload`, formData);
      if (res.status == 200) {
        setLoading(false);
        setSuccess(res.data.success);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      setAddItemError(error.response.data.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Add New Item"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          {/* <Form.Control
            type="file"
            // id="shoolfileInput"

            onChange={handleCsvChange}
            // style={{ display: "none" }}
            name="file"
            accept="csv"
          />
          <Button
            variant="success"
            className="w-20 p-2 mt-1"
            onClick={handleCsvSubmit}
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} spin size="2x" />
            ) : (
              "Upload"
            )}
          </Button> 
           <h3
              style={{ fontWeight: "lighter", fontSize: 17, marginBottom: 2 }}
            >
              Upload csv file (if available)
            </h3>
          */}
          <Form onSubmit={handleSubmit}>
            {success && (
              <p
                style={{
                  fontWeight: "lighter",
                  fontSize: 17,
                  marginBottom: 2,
                  color: "green",
                }}
              >
                {success}
              </p>
            )}

            <Row>
              <TitleHeader
                text={"Item Information "}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="UserCreateInput"
                      name="item_name"
                      required
                    />
                  </Col>
                </Row>
                {/* <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Item Code"
                      name="description"
                      required
                    />
                  </Col>
                </Row> */}
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Brand"
                      className="UserCreateInput"
                      name="brand"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Barcode Id"
                      className="UserCreateInput"
                      name="barcode_id"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                    <Form.Select className="UserCreateInput" name="category">
                      <option value="NA">Subject Category</option>
                      <option value="English">English</option>
                      <option value="Mathematics">Mathematics</option>
                      <option value="Science">Science</option>
                      <option value="Home Work">Home Work</option>
                      <option value="Stationery">Stationery</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="shoolfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      name="image"
                    />
                    <CustomFileInput
                      fieldName={"shoolfileInput"}
                      title={"Upload Item Image"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Inventory Details"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Select className="UserCreateInput" name="category_id">
                      <option value="">Select Item Category</option>
                      {category.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Quantity at Hand"
                      name="quantity"
                      required
                    />
                  </Col>
                </Row>
                {/* <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Reorder Point"
                      name="reorder_point"
                      required
                    />
                  </Col>
                </Row> */}
                <Row className="mb-3">
                  <Col lg={6} md={6} xl={6} sm={12} xs={12}>
                    <Form.Select
                      className="UserCreateInput"
                      name="distribution"
                    >
                      <option value="">Book Distribution</option>
                      <option value="pupil">Pupil</option>
                      <option value="bench">Bench</option>
                      <option value="class">Class</option>
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Addittional Information"}
                headerTextStyle={"headerTextStyle"}
              />
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Item Code"
                        className="UserCreateInput"
                        name="item_code"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Warrant Information"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Class Grade"
                        className="UserCreateInput"
                        name="classGrade"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Save Item"
                  )}
                </Button>
              </Row>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default AddNewItem;
