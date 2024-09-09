import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";
import NavigationHeader from "../Navigations/NavigationHeader";
import TitleHeader from "../Headers/TitleHeader";
import NonAvaliable from "../NonAvaliable/NonAvaliable";
import BackButtonIcon from "../Button/BackButtonIcon";
import Loading from "../Loading/Loading";

import ConditionalSideNavigation from "../Navigations/ConditionalSideNavigation";

function NotificationDisplay() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/notification`);

        setNotifications(res.data.notifications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getNotifications();
  }, []);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon />
          <TitleHeader text={"Notifications"} />
          {loading ? (
            <>
              <div className="text-center p-5 m-5">
                <Loading loading={true} />
              </div>
            </>
          ) : notifications ? (
            <Card.Body className="AdminRecentUser rounded">
              <table className="table">
                <thead>
                  <tr className="text-bold">
                    <td>Title</td>
                    <td>Message</td>
                    <td>Time</td>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification) => (
                    <>
                      <tr key={notification.id}>
                        <td>{notification.title}</td>
                        <td>{notification.body}</td>
                        <td>
                          {new Date(notification.created_at).toDateString()}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </Card.Body>
          ) : (
            <NonAvaliable
              textMessage={
                "Sorry, you currently have no notifications, please check back later!"
              }
            />
          )}
          ;
        </Container>
      </div>
    </div>
  );
}

export default NotificationDisplay;
