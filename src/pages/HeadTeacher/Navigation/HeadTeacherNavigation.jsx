import React, { useState, useContext } from "react";
import "./HeadTeacherNavigation.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  faSchool,
  faUsers,
  faChartBar,
  faBell,
  faSignOutAlt,
  faDashboard,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import {
  SideNavButton,
  SideNavAppStore,
} from "../../../components/Navigations/SideNavComponent";
import Searchs from "../../../components/Search/TeachersSearch/Search";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";

function HeadTeacherNavigation({ toggleSidebar, isOpen }) {
  const { isHeadTeacher, isSubebUser } = useContext(AuthenticationContext);
  const subebNav = () => {
    if (isSubebUser()) {
      return (
        <>
          <Nav.Link
            as={NavLink}
            to="/SubebDashboard"
            className={`sideNavButtonAchorTag ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            <SideNavButton
              text={"Dashboard"}
              icon={faDashboard}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/SubebInventory"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Inventory"}
              icon={faStore}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/SubebRequests"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Request Materials"}
              icon={faSchool}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>

          <Nav.Link
            as={NavLink}
            to="/SubebReportDiscrepancy"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Report Discrepancy"}
              icon={faChartBar}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/SubebPushNotification"
            className={`sideNavButtonAchorTag ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            <SideNavButton
              text={"Push Notifications"}
              icon={faBell}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
        </>
      );
    }

    if (isHeadTeacher()) {
      return (
        <>
          <Nav.Link
            as={NavLink}
            to="/HeadTeacherDashboard"
            className={`sideNavButtonAchorTag ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            <SideNavButton
              text={"Dashboard"}
              icon={faDashboard}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/HeaderTeacherInventory"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Inventory"}
              icon={faStore}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/HeadTeacherRequests"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Request Materials"}
              icon={faSchool}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          {/* <Nav.Link
            as={NavLink}
            to="/HeadTeacherTrackMaterial"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Track Materials"}
              icon={faUsers}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link> */}
          <Nav.Link
            as={NavLink}
            to="/HeadTeacherDiscrepancyList"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SideNavButton
              text={"Discrepancy"}
              icon={faChartBar}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/HeadTeacherPushNotification"
            className={`sideNavButtonAchorTag ${({ isActive }) =>
              isActive ? "active" : ""}`}
          >
            <SideNavButton
              text={"Push Notifications"}
              icon={faBell}
              hoverStyle={"sideNavPrimaryHoverButton"}
            />
          </Nav.Link>
        </>
      );
    }
  };

  return (
    <div
      className={`d-flex flex-column sidebar ${isOpen ? "open" : ""} fixed-top`}
    >
      {" "}
      <Searchs Searchstyle={"seachSideBar"} searchText={"Search"} />
      <Nav className="flex-column">
        {subebNav()}

        <SideNavAppStore />
        {/* <Nav.Link href="#dark-mode">
        <SideNavButton
          text={"Dark mode"}
          icon={faMoon}
          toggle={<ButtonToggle />}
          hoverStyle={"sideNavDarkModeButton wareHouseDarkMode"}
        />
      </Nav.Link> */}
        <Nav.Link as={NavLink} to="/Logout" className="logout">
          <SideNavButton
            text={"Log Out"}
            icon={faSignOutAlt}
            hoverStyle={"sideNavLogoutButton"}
          />
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default HeadTeacherNavigation;
