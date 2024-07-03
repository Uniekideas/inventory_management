import React, { useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./Notification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons/faPaperclip";
import CustomFileInput from "../CustomFileInput/CustomFileInput";

function PushNotification() {
    const fileInputRef = useRef(null);
  
    const handleFileChange = (event) => {
      const fileName = event.target.files[0]?.name || "Choose a file";
      document.getElementById("fileLabel").innerText = fileName;
    };
  return (
    <div>
         <Form>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row>
                <Col lg={8} md={8} xl={8} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Notification Title"
                    className="pushNotificationTitle"
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
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="align-items-center mb-3  d-flex justify-content-between">
              <Col xs={12} lg={3} sm={12} className="mb-2 mb-lg-0">
                <Form.Control
                  type="file"
                  id="fileInput" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <CustomFileInput fieldName={'fileInput'} title={'Attach File'} icon={faPaperclip}/>
              </Col>
            </Row>
            <Row>
              <Col
                xs={12}
                lg={12}
                sm={12}
                className="text-end d-flex justify-content-between"
              >
                <Button variant="success" className="w-100 p-2">
                  Send Notification
                </Button>

                <Button variant="success" className="ms-2">
                  <FontAwesomeIcon icon={faClockRotateLeft} />
                </Button>
              </Col>
            </Row>
          </Form>
    </div>
  )
}

export default PushNotification