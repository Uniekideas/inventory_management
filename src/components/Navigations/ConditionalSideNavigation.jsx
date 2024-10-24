import React, { useState, useContext } from "react";
import SideNavigation from "./SideNavigation";
import HeadTeacherNavigation from "../../pages/HeadTeacher/Navigation/HeadTeacherNavigation";
import WareHouseSideNavigation from "../../pages/WareHouseStaff/Navigation/WareHouseSideNavigation";
import QualityNavigation from "../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import AuthenticationContext from "../../context/Authentication/AuthenticationContext";

function ConditionalSideNavigation({ isSidebarOpen, toggleSidebar }) {
  const { isAdmin, isWareHouser, isHeadTeacher, isSubebUser, isQA } =
    useContext(AuthenticationContext);
  const roleNavigation = () => {
    if (isAdmin()) {
      return (
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      );
    } else if (isHeadTeacher()) {
      return (
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      );
    } else if (isSubebUser()) {
      <HeadTeacherNavigation
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />;
    } else if (isWareHouser()) {
      return (
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      );
    } else if (isQA()) {
      return (
        <QualityNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
      );
    }
  };
  return roleNavigation();
}

export default ConditionalSideNavigation;
