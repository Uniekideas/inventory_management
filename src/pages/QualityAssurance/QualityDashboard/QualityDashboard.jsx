import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Image, Card, Table } from "react-bootstrap";
import "./QualityDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import QualityNavigation from "../../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import { NoImagCard } from "../../../components/Card/PresentaionCard";
import { useLocation, useNavigate } from "react-router-dom";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function QualityDashboard() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const [filterBy, setFilterBy] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [schoolsData, setSchoolsData] = useState([]);
  const [locationsData, setLocationsData] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [change, setChange] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  const response = async () => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/item-request/qa`);
      setAllData(response.data.requests);
      setRequestData(response.data.requests);
      setSchoolsData(response.data.schools);
      setLocationsData(response.data.locations);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    response();
  }, []);

  useEffect(() => {
    setFilteredData(requestData);
  }, [change]);

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy]);

  const handleApprove = async (status, id) => {
    try {
      const res = await axios.put(`${baseUrl}/api/tracking/${id}`, { status });
      console.log(res.data);
      setChange(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterSortSearch = () => {
    let filtered = [...allData];

    if (filterBy) {
      filtered =
        filterBy == "Status"
          ? requestData
          : filtered.filter((item) => item.status === filterBy);
    }

    setRequestData(filtered);
  };

  const generateReport = async (formatQuery, resultData) => {
    setIsLoading(true);

    if (formatQuery === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [["SN", "Item Name", "School", "Quantity", "Comment", "Status"]],
        body: resultData.map((item, index) => [
          index + 1,
          item.item.item_name,
          item.school.name,
          item.quantity,
          item.comment,
          item.status,
        ]),
      });
      doc.save("edo_qa_request_report.pdf");
      //   setCreateReportResponse(response);
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(resultData);

      XLSX.utils.book_append_sheet(wb, ws, "edo_qa_request_report");
      XLSX.writeFile(wb, "edo_qa_request_report.xlsx");
    }

    setIsLoading(false);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterDataSortBy = [
    {
      pk: 1,
      type: "ascending",
    },
    {
      pk: 2,
      type: "descending",
    },
  ];

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

  const filterData = [
    {
      pk: 0,
      type: "Status",
    },
    {
      pk: 1,
      type: "pending",
    },
    {
      pk: 2,
      type: "approved",
    },
    {
      pk: 3,
      type: "denied",
    },
  ];
  const users1 = [
    {
      id: 1,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 2,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 3,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 4,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 5,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
    {
      id: 6,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: "Add New Item",
      joinDate: "2024-05-18",
    },
  ];

  const activities = [
    {
      id: 1,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 2,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 3,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 4,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 5,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
  ];
  const handleApprovalDetail = () => {
    navigate("/ApprovalDetail");
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <QualityNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Dashboard"} />
            {/* <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This week"}
            /> */}
          </div>
          <Row className="mb-5 mt-5">
            <TitleHeader
              text={"Your Schools"}
              headerTextStyle={"headerTextStyle"}
            />
            <div className="d-flex quailtyDashboardDisplaySchoolWrapper">
              {schoolsData.length
                ? schoolsData.map((school, index) => (
                    <NoImagCard
                      key={index}
                      title={school.name}
                      figure={school.newitems.length}
                      margin=""
                      marginColor=""
                    />
                  ))
                : ""}
            </div>
          </Row>
          <Row className="d-lg-none mb-2">
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
              <TitleHeader
                text={"Approval Queue"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <div className="d-flex justify-content-between">
              <TitleHeader
                text={"Approval Queue"}
                headerTextStyle={"headerTextStyle"}
              />

              <Col className="d-flex justify-content-end ms-auto gap-3">
                <Filter
                  optionTitle={"Filter by"}
                  options={filterData}
                  defult={"Status"}
                  onSelect={(value) => setFilterBy(value)}
                />
                <Filter
                  defult={"None"}
                  optionTitle={"Report Format"}
                  options={filterOption}
                  onSelect={(value) => {
                    generateReport(value, requestData);
                  }}
                />
              </Col>
            </div>
          </Row>
          <Container className="ListContainer mb-5">
            {!isLoading ? (
              <Table responsive="lg" striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>Item Name</th>
                    <th>School</th>
                    <th>Quantity</th>
                    <th>Comment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requestData.map((request, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate("/ApprovalDetail/" + request.id);
                          }}
                        >
                          {request.item.item_name}
                        </a>
                      </td>
                      <td>{request.school.name}</td>
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
        </Container>
      </div>
    </div>
  );
}

export default QualityDashboard;
