import React from "react";
import "./Navigation.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  faTachometerAlt,
  faSchool,
  faUsers,
  faChartBar,
  faBell,
  faSignOutAlt,
  faDashboard,
  faStore,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { SideNavButton, SideNavAppStore } from "./SideNavComponent";
import Search from "../Search/Search";

function SideNavigation({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`d-flex flex-column sidebar ${isOpen ? "open" : ""} fixed-top`}
    >
      {" "}
      <Search Searchstyle={"seachSideBar"} searchText={"Search"} />
      <Nav className="flex-column">
        <Nav.Link
          as={NavLink}
          to="/AdminDashboard"
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
          to="/InventoryManagement"
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
          to="/SchoolsManagement"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Schools"}
            icon={faSchool}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/UserManagement"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Users"}
            icon={faUsers}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/ReportAnalytics"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Reports & Analytics"}
            icon={faChartBar}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/DiscrepancyList"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Discrepancy"}
            icon={faTachometerAlt}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/category"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Category"}
            icon={faLocationDot}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/locations"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Locations"}
            icon={faLocationDot}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/AdminPushNotification"
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
        {/* <Nav.Link href="#dark-mode">
          <SideNavButton
            text={"Dark mode"}
            icon={faMoon}
            toggle={<ButtonToggle />}
            hoverStyle={"sideNavDarkModeButton"}
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

export default SideNavigation;
