import React from 'react'
import "./HeadTeacherNavigation.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  faTachometerAlt,
  faSchool,
  faUsers,
  faChartBar,
  faBell,
  faMoon,
  faSignOutAlt,
  faDashboard,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import {
  SideNavButton,
  ButtonToggle,
  SideNavAppStore,
} from "../../../components/Navigations/SideNavComponent";
import Search from "../../../components/Search/Search";

function HeadTeacherNavigation({toggleSidebar, isOpen}) {
  return (
    <div
    className={`d-flex flex-column sidebar ${isOpen ? "open" : ""} fixed-top`}
  >
    {" "}
    <Search Searchstyle={"seachSideBar"} />
    <Nav className="flex-column">
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
        to="/HeadTeacherRequestMaterial"
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
        to="/HeadTeacherTrackMaterial"
        className={({ isActive }) => (isActive ? "active" : "")}
      >
        <SideNavButton
          text={"Track Materials"}
          icon={faUsers}
          hoverStyle={"sideNavPrimaryHoverButton"}
        />
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        to="/HeadTeacherReportDiscrepancy"
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
      <SideNavAppStore />
      <Nav.Link href="#dark-mode">
        <SideNavButton
          text={"Dark mode"}
          icon={faMoon}
          toggle={<ButtonToggle />}
          hoverStyle={"sideNavDarkModeButton wareHouseDarkMode"}
        />
      </Nav.Link>
      <Nav.Link as={NavLink} to="/" className="logout">
        <SideNavButton
          text={"Log Out"}
          icon={faSignOutAlt}
          hoverStyle={"sideNavLogoutButton"}
        />
      </Nav.Link>
    </Nav>
  </div>
  )
}

export default HeadTeacherNavigation