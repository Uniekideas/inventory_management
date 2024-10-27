import React from "react";
import "./WareHouseNavigation.css";
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
import Searchd from "../../../components/Search/WarehouseSearch/Searchd";

function WareHouseSideNavigation({ toggleSidebar, isOpen }) {
  return (
    <div
      className={`d-flex flex-column sidebar ${isOpen ? "open" : ""} fixed-top`}
    >
      {" "}
      <Searchd Searchstyle={"seachSideBar"} searchText={"Search"} />
      <Nav className="flex-column">
        <Nav.Link
          as={NavLink}
          to="/WareHouseDashboard"
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
          to="/WareHouseInventory"
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
          to="/ScanMaterial"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Scan Materials"}
            icon={faSchool}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/WareHouseRequest"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <SideNavButton
            text={"Material Requests"}
            icon={faUsers}
            hoverStyle={"sideNavPrimaryHoverButton"}
          />
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/ReportDiscrepancy"
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
          to="/WareHousePushNotification"
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

export default WareHouseSideNavigation;
