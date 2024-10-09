import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
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

function Category() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let { pk } = useParams();

  const {
    getButtonLoading,
    seteditItemError,
    seteditItemResponse,
    seteditedFormData,
    editedFormData,
    editItemIsLoading,
    editItemError,
    editItemResponse,
  } = useContext(LocationContext);

  const { setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  const getCategories = async (url = `${baseUrl}/api/category`) => {
    setButtonLoading(true);

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
    getCategories();
  }, []);


  useEffect(() => {
    if (!getButtonLoading && editItemResponse) {
      setnavigationMessages("Edit successful!");
      navigate(-1);
      seteditItemResponse(null);
    }
  }, [editItemIsLoading, editItemResponse, navigate]);

  useEffect(() => {
    if (!getButtonLoading && editItemError) {
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
            <TitleHeader text={"Categories"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          {buttonLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={buttonLoading} />
            </Container>
          ) : (
            <div className="">
              <table className="table">
                <thead>
                  <tr>
                    <td>SN</td>
                    <td>category</td>
                    <td>Description</td>
                    <td>...</td>
                  </tr>
                </thead>
                <tbody>
                  {categoryData.map((category, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{category.name}</td>
                      <td>{category.description}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Category;
