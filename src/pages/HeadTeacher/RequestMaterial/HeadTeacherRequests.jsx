import React, { useContext, useEffect, useState } from "react";
import { Container, Table, Row, Col, Form, Button } from "react-bootstrap";
import "./HeadTeacherRequestMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { scrollToTop } from "../../../utils/HelperFunc";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import Filter from "../../../components/Filter/Filter";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import axios, { all } from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HeadTeacherRequests() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);
  const navigate = useNavigate();

  const { isHeadTeacher, isSubebUser } = useContext(AuthenticationContext);

  const getRequest = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item-request`);
      setAllRequest(response.data.itemRequests);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const filterOption = [
    {
      pk: 1,
      type: "Excel",
    },
    {
      pk: 2,
      type: "pdf",
    },
  ];

  const generateReport = async (formatQuery, resultData) => {
    // setCreateReportIsLoading(true);

    if (formatQuery === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [["SN", "Item Name", "Code", "Quantity", "Comment", "Status"]],
        body: resultData.map((item, index) => [
          index + 1,
          item.item.name,
          item.item.code,
          item.quantity,
          item.comment,
          item.status,
        ]),
      });
      doc.save("edo_leader_subebe_request_report.pdf");
      //   setCreateReportResponse(response);
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(resultData);

      XLSX.utils.book_append_sheet(wb, ws, "edo_leader_subebe_request_report");
      XLSX.writeFile(wb, "edo_leader_subebe_request_report.xlsx");
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  const handleCreateItem = () => {
    const link = isSubebUser
      ? "/SubebRequestMaterial"
      : "/HeadTeacherRequestMaterial";
    navigate(link);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon />
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Request Materials"} />
          </div>
          <div className="d-flex justify-item-end">
            <PrimaryButton
              Primaryicon={faAdd}
              text={"New Request"}
              Primarystyle={"UserManagementCreateButton me-2"}
              clickEvent={() => navigate("/HeadTeacherRequestMaterial")}
            />
            <Filter
              defult={"None"}
              optionTitle={"Report Format"}
              options={filterOption}
              onSelect={(value) => {
                generateReport(value, allRequest);
              }}
            />
          </div>
          {!isLoading ? (
            <Table responsive="lg" striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Item Name</th>
                  <th>Code</th>
                  <th>Quantity</th>
                  <th>Comment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allRequest.map((request, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{request.item.name}</td>
                    <td>{request.item.code}</td>
                    <td>{request.quantity}</td>
                    <td>{request.comment}</td>
                    <td>{request.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Container className="d-flex justify-content-center align-items-center h-50">
              <Loading loading={isLoading} />
            </Container>
          )}
        </Container>
      </div>
    </>
  );
}

export default HeadTeacherRequests;
