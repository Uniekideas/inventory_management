import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportAnalytics from "../../pages/Admin/Analytics/ReportAnalytics";
import Login from "../../pages/Admin/Authentication/Login";
import SignUp from "../../pages/Admin/Authentication/SignUp";
import NavigationHeader from "./NavigationHeader";
import DiscrepancyList from "../../pages/Admin/Discrepancy/DiscrepancyList";
import UserManagement from "../../pages/Admin/Management/UserManagement";
import SchoolsManagement from "../../pages/Admin/Management/SchoolsManagement";
import InventoryManagement from "../../pages/Admin/Management/InventoryManagement";
import AdminDashboard from "../../pages/Admin/Dashboard/AdminDashboard";
import AdminPushNotification from "../../pages/Admin/PushNotification/AdminPushNotification";
import DiscrepancyDetail from "../../pages/Admin/Discrepancy/DiscrepancyDetail";
import CreateNewUser from "../../pages/Admin/User/CreateNewUser";
import AddSchool from "../../pages/Admin/School/AddSchool";
import AddNewItem from "../../pages/Admin/Inventory/AddNewItem";
import GenerateInventory from "../../pages/Admin/Inventory/GenerateInventory";
import ItemDetail from "../../pages/Admin/Inventory/ItemDetail";
import SchoolDetail from "../../pages/Admin/School/SchoolDetail";
import UserDetail from "../../pages/Admin/User/UserDetail";
import WareHouseDashboard from "../../pages/WareHouseStaff/Dashboard/WareHouseDashboard";
import WareHouseInventory from "../../pages/WareHouseStaff/Inventory/WareHouseInventory";
import WareHouseTrack from "../../pages/WareHouseStaff/TrackMaterial/WareHouseTrack";
import ReportDiscrepancy from "../../pages/WareHouseStaff/ReportDiscrepancy/ReportDiscrepancy";
import ScanMaterial from "../../pages/WareHouseStaff/ScanMaterial/ScanMaterial";
import WareHousePushNotification from "../../pages/WareHouseStaff/PushNotification/WareHousePushNotification";
import WareHouseGenerateReport from "../../pages/WareHouseStaff/Inventory/WareHouseGenerateReport";
import WareHouseAddItem from "../../pages/WareHouseStaff/Inventory/WareHouseAddItem";
import WareHouseViewItem from "../../pages/WareHouseStaff/Inventory/WareHouseViewItem";
import WareHouseAddMovement from "../../pages/WareHouseStaff/TrackMaterial/WareHouseAddMovement";
import HeadTeacherDashboard from "../../pages/HeadTeacher/Dashboard/HeadTeacherDashboard";
import HeaderTeacherInventory from "../../pages/HeadTeacher/Inventory/HeaderTeacherInventory";
import HeaderTeacherGenerateReport from "../../pages/HeadTeacher/Inventory/HeaderTeacherGenerateReport";
import HeadTeacherRequestMaterial from "../../pages/HeadTeacher/RequestMaterial/HeadTeacherRequestMaterial";
import HeadTeacherReportDiscrepancy from "../../pages/HeadTeacher/ReportDiscrepancy/HeadTeacherReportDiscrepancy";
import HeadTeacherPushNotification from "../../pages/HeadTeacher/PushNotification/HeadTeacherPushNotification";
import HeadTeacherTrackMaterial from "../../pages/HeadTeacher/TrackMaterial/HeadTeacherTrackMaterial";


function NavigationControl() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/AdminPushNotification"
          element={<AdminPushNotification />}
        />
      </Routes>

      <Routes>
        <Route path="/NavigationHeader" element={<NavigationHeader />} />
        <Route path="/DiscrepancyList" element={<DiscrepancyList />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/SchoolsManagement" element={<SchoolsManagement />} />
        <Route path="/InventoryManagement" element={<InventoryManagement />} />
        <Route path="/ReportAnalytics" element={<ReportAnalytics />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/DiscrepancyDetail" element={<DiscrepancyDetail />} />
        <Route path="/CreateNewUser" element={<CreateNewUser />} />
        <Route path="/AddSchool" element={<AddSchool />} />
        <Route path="/AddNewItem" element={<AddNewItem />} />
        <Route path="/GenerateInventory" element={<GenerateInventory />} />
        <Route path="/ItemDetail" element={<ItemDetail />} />
        <Route path="/SchoolDetail" element={<SchoolDetail />} />
        <Route path="/UserDetail" element={<UserDetail />} />
      </Routes>

      <Routes>
        <Route path="/WareHouseDashboard" element={<WareHouseDashboard />} />
        <Route path="/WareHouseInventory" element={<WareHouseInventory />} />
        <Route path="/WareHouseTrack" element={<WareHouseTrack />} />
        <Route path="/ReportDiscrepancy" element={<ReportDiscrepancy />} />
        <Route path="/ScanMaterial" element={<ScanMaterial />} />
        <Route path="/WareHousePushNotification" element={<WareHousePushNotification />}/>
        <Route path="/WareHouseGenerateReport" element={<WareHouseGenerateReport />} />
        <Route path="/WareHouseAddItem" element={<WareHouseAddItem />} />
        <Route path="/WareHouseViewItem" element={<WareHouseViewItem />} />
        <Route path="/WareHouseAddMovement" element={<WareHouseAddMovement />} />
      </Routes>

      <Routes>
        <Route path="/HeadTeacherDashboard" element={<HeadTeacherDashboard />} />
        <Route path="/HeaderTeacherInventory" element={<HeaderTeacherInventory />} />
        <Route path="/HeaderTeacherGenerateReport" element={<HeaderTeacherGenerateReport />} />
        <Route path="/HeadTeacherRequestMaterial" element={<HeadTeacherRequestMaterial />} />
        <Route path="/HeadTeacherReportDiscrepancy" element={<HeadTeacherReportDiscrepancy />} />
        <Route path="/HeadTeacherPushNotification" element={<HeadTeacherPushNotification />}/>
        <Route path="/HeadTeacherTrackMaterial" element={<HeadTeacherTrackMaterial />} />
        {/* <Route path="/WareHouseAddItem" element={<WareHouseAddItem />} /> */}
        {/* <Route path="/WareHouseViewItem" element={<WareHouseViewItem />} /> */}
        {/* <Route path="/WareHouseAddMovement" element={<WareHouseAddMovement />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default NavigationControl;
