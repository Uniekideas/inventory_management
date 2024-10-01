import React, { useContext, useRef, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Filter from "../Filter/Filter";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";

import axios from "axios";
import AuthenticationContext from "../../context/Authentication/AuthenticationContext";
import { Schedule } from "./Schedule/NotificationSchedule";

function PushNotification() {
  // const fileInputRef = useRef(null);
  const { messages, setMessages } = useContext(AuthenticationContext);
  const [audience, setAudience] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const filterData = [
    {
      pk: 1,
      type: "QA",
    },
    {
      pk: 2,
      type: "Warehouse Staff",
    },
    {
      pk: 3,
      type: "Head Teacher",
    },
    {
      pk: 4,
      type: "Admin",
    },
  ];

  // const handleFileChange = (event) => {
  //   const fileName = event.target.files[0]?.name || "Choose a file";
  //   document.getElementById("fileLabel").innerText = fileName;
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      message: message,
      audience: audience,
    };

    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      console.log(data);
      const response = await axios.post(
        `${baseUrl}/api/notification/sendnotification`,
        data
      );
      if (response.data) {
        setLoading(false);

        setSuccess("Email Sent Successfully");
      }

      // temporal
      // setMessages(response.data.message);
    } catch (error) {
      console.log(error);

      setLoading(false);
      if (error?.response?.data) {
        setError(error.response.data.message);
      } else {
        setError("Network Error. Please check your connection");
      }
    }
  };
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="notificationudience">
          <Row>
            <Col>
              <Filter
                optionTitle={"Select Target Audience:"}
                options={filterData}
                defult={"All"}
                onSelect={(value) => setAudience(value)}
                className="pushNotificationTitle"
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="notificationTitle">
          <Row>
            <Col lg={8} md={8} xl={8} sm={12} xs={12}>
              <Form.Control
                type="text"
                placeholder="Notification Title"
                className="pushNotificationTitle"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>

        <Row>
          <Col lg={12} md={12} xl={12} sm={12} xs={12}>
            <Form.Group className="mb-3" controlId="notificationMessage">
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Enter your message here..."
                className="pushNotificationTextArea"
                name="message"
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* <Row className="align-items-center mb-3  d-flex justify-content-between">
              <Col xs={12} lg={3} sm={12} className="mb-2 mb-lg-0">
                <Form.Control
                  type="file"
                  id="fileInput" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  name='file'
                />
                <CustomFileInput fieldName={'fileInput'} title={'Attach File'} CustomFileInputicon={faPaperclip}/>
              </Col>
            </Row> */}
        <Row>
          <Col
            xs={12}
            lg={12}
            sm={12}
            className="text-end d-flex justify-content-between"
          >
            <Button variant="success" className="w-100 p-2" type="submit">
              {loading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              ) : (
                "Send Notification"
              )}
            </Button>

            <Button onClick={handleShow} variant="success" className="ms-2">
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </Button>

            <Schedule
              show={showModal}
              handleClose={handleClose}
              title={title}
              message={message}
              audience={audience}
            />
          </Col>
          <p style={{ color: "coral", textAlign: "center", marginTop: 5 }}>
            {error}
          </p>
          <p style={{ color: "green", textAlign: "center", marginTop: 5 }}>
            {success}
          </p>
        </Row>
      </Form>
    </div>
  );
}

export default PushNotification;
