import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../Inventory/Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import LocationContext from "../../../context/Location/LocationContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import MessageContext from "../../../context/Message/MessageContext";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";
const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

function EditCategory() {
  const navigate = useNavigate();
  let { pk } = useParams();

  const {
    getLocations,
    seteditItemError,
    seteditItemResponse,
    editItemIsLoading,
    editItemError,
    editItemResponse,
  } = useContext(LocationContext);

  const { setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [categoryData, setCategoryData] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [addCategoryError, setAddCategoryError] = useState(false);

  const getCategory = async (url = `${baseUrl}/api/category/${pk}`) => {
    try {
      const response = await axios.get(url);

      setCategoryData(response.data.data);
    } catch (error) {
      console.log(error);
      //   setGetItemsError(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const updateCategory = async (e) => {
    e.preventDefault();
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    const formData = {
      name: e.target.name.value,
      description: e.target.description.value,
    };

    try {
      const result = await axios.patch(
        `${baseUrl}/api/category/${pk}`,
        formData
      );
      // editItemResponse(result.data);
      setButtonLoading(false);
      setnavigationMessages("Category created successful!");
      navigate(-1);
    } catch (error) {
      setAddCategoryError(error.response.data.message);
      console.log(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    if (!editItemIsLoading && editItemError) {
      scrollToTop();
      handleComfirmationPopUps(editItemError, "bg-danger");
      setButtonLoading(false);
      seteditItemError(null);
    }
  }, [editItemIsLoading, editItemError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleEditCategory = (e) => {
    updateCategory(e);
    setButtonLoading(true);
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
            <TitleHeader text={"Edit Category"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}

          <Form onSubmit={handleEditCategory}>
            <Row>
              <TitleHeader
                text={"Category "}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Category Name"
                      className="UserCreateInput"
                      name="name"
                      defaultValue={categoryData.name}
                      required
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Description"
                      name="description"
                      defaultValue={categoryData.description}
                      className="UserCreateTextArea"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Button variant="success" className="w-100 p-2" type="submit">
                {buttonLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                ) : (
                  "Update Category"
                )}
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default EditCategory;
