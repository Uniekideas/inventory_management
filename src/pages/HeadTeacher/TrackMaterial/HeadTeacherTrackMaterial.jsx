import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Table } from "react-bootstrap";
import "./HeadTeacherTrackMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
function HeadTeacherTrackMaterial() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [searchTerm, setSearchTerm] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [exportType, setExportType] = useState("");
  const [originalData, setOriginalData] = useState([]);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { getTrackings, getTrackingsData, getTrackingsIsLoading } =
    useContext(TrackingContext);

  const exportAccordingToType = () => {
    if (exportType === "") {
      return;
    }
    if (exportType === "pdf") {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [["Id", "Name", "Brand", "Category", "Quantity", "Supplier"]],
        body: getTrackingsData.map((item) => [
          item.id,
          item.item_name,
          item.brand,
          item.subject_category,
          item.quantity,
          item.distribution,
        ]),
      });
      doc.save("edo-inventory.pdf");
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(getTrackingsData);

      XLSX.utils.book_append_sheet(wb, ws, "edo_iventory_report");
      XLSX.writeFile(wb, "edo_inventory_report.xlsx");
    }
  };
  useEffect(() => {
    exportAccordingToType();
  }, [exportType]);

  useEffect(() => {
    getTrackings();
    setFilteredData(getTrackingsData);
    setOriginalData(getTrackingsData);
  }, []);
  useEffect(() => {
    handleFilterSortSearch();
  }, [sortBy, searchTerm, getTrackingsData, filterBy]);
  const filterData = [
    {
      pk: 1,
      type: "Excel",
    },
    {
      pk: 2,
      type: "pdf",
    },
  ];
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFilterSortSearch = () => {
    let filtered = [...getTrackingsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.status === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.item_name.localeCompare(b.item_name);
        } else {
          return b.item_name.localeCompare(a.item_name);
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };
  console.log("filteredData");
  console.log(filteredData);
  const data = filteredData;

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date_moved,

      sortable: true,
      wrap: true,
    },
    {
      name: "Time",
      selector: (row) => row.time_moved,
      sortable: true,
      wrap: true,
    },
    {
      name: "Item ID",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
    },
    {
      name: "Item Name",
      selector: (row) => (
        <div>
          {row.item_name}{" "}
          {/* <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" /> */}
        </div>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "From Location",
      selector: (row) => row.address,
      sortable: true,
      wrap: true,
    },
    {
      name: "To Location",
      selector: (row) => row.picking_area,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "Quantity",
    //   selector: (row) => row.quantity,
    //   sortable: true,
    //   wrap: true,
    // },
    {
      name: "Status",
      selector: (row) => row.action,
      sortable: true,
      wrap: true,
    },
    // {
    //   name: "User",
    //   selector: (row) => row.user,
    //   sortable: true,
    //   wrap: true,
    // },
  ];

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <BackButtonIcon />
            <TitleHeader text={"Track Materials"} />
            <Form.Control
              type="date"
              placeholder="Minimum Stock Level"
              className="pushNotificationTitle"
              style={{ width: 300 }}
            />
          </div>
          <div className="d-flex justify-content-between">
            <TitleHeader
              text={"Movement Log"}
              headerTextStyle={"headerTextStyle"}
            />
            {/* <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
                onSelect={(value) => setExportType(value)}
                
              /> */}
          </div>
          <Row className="mb-4">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <input
                type="text"
                placeholder="Search Inventory"
                className="seachContentBar"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ display: "block", width: "100%", borderRadius: 10 }}
              />
            </Col>
          </Row>
          <Row className="d-lg-none mb-3">
            {/* <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col> */}
          </Row>
          <Row className="d-none d-lg-flex mb-3">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              {/* <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              /> */}
              <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
                onSelect={(value) => setExportType(value)}
              />
            </Col>
          </Row>
          <Container>
            <div>
              <Table responsive="lg" striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Reference</th>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>School</th>
                    <th>Start Point</th>
                    <th>Current Point</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filterData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.reference_number}</td>
                      <td>{item.item_id}</td>
                      <td>{item.quantity}</td>
                      <td>{item.school_id}</td>
                      <td>{item.start_point}</td>
                      <td>{item.current_point}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              striped
              responsive
              customStyles={{
                header: {
                  style: {
                    backgroundColor: "rgba(146, 216, 200, 1)",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "rgba(146, 216, 200, 1)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    minHeight: "72px",
                  },
                },
                headCells: {
                  style: {
                    fontFamily: "Open Sans",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "25.6px",
                  },
                },
                rows: {
                  style: {
                    minHeight: "72px", // override the row height
                  },
                },
                cells: {
                  style: {
                    padding: "10px", // override the cell padding
                  },
                },
              }}
            />
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default HeadTeacherTrackMaterial;
