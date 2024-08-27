import React, { useContext, useEffect, useState, useMemo, useRef} from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./AdminDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard from "../../../components/Card/PresentaionCard";

import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import LineGraph from "../../../components/Graph/LineGraph";
import DoughnutGraph from "../../../components/Graph/DoughnutGraph";
import BarGraph from "../../../components/Graph/BarGraph";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import SchoolContext from "../../../context/School/SchoolContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"
import * as XLSX from 'xlsx'

import { UserBox } from "../ViewLowstock/UserBox";
import { getLCP } from "web-vitals";
 
// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [schools, setSchools] = useState([]);
  const [originalSchools, setOriginalSchools] = useState([])
  const [exportType, setExportType] = useState("");
  

  const {
    getInventoryItems, getItemsData, getItemsIsLoading,setGetItemsData
  } = useContext(InventoryItemContext);

  const exportAccordingToType = ()=>{
    if(exportType ===''){
      return;
    }
    if(exportType ==='pdf'){
      let doc = new jsPDF();
      autoTable(doc,{
        head: [['Id','Name', 'Brand', 'Category','Quantity','Supplier' ]],
        body: getItemsData.map(item=>[item.id, item.item_name, item.brand, item.subject_category, item.quantity, item.distribution]),
      })
      doc.save('edo-inventory.pdf');
     
   
    }
    else{
      var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(getItemsData);

    XLSX.utils.book_append_sheet(wb, ws, 'edo_iventory_report');
    XLSX.writeFile(wb, 'edo_inventory_report.xlsx');
   
    }
  }
  useEffect(()=>{
    exportAccordingToType();
  }, [exportType])
  
  const {
    getSchoolsData, getSchools, getSchoolsIsLoading
  } = useContext(SchoolContext);

  
  const { ProcessAnalysis, itemDataAnalysis, schoolDataAnalysis} =
  useContext(AnalysisContext);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(getItemsData.length / itemsPerPage);
  const paginatedData = getItemsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filter, setFilter] = useState();
  const [originalItems, setOriginalItems] = useState([])
  const [lowItems, setLowItems] = useState([])
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    getInventoryItems();
    getSchools();
    setOriginalItems(getItemsData);
    
   
  }, [ ])

  const getLogs = async()=>{
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/get-logs`);
      
      setLogs(response.data)
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(()=>{
    getLogs()
  }, [])
  const getLowStockItems = ()=>{
    const low = originalItems.filter(item=>item.quantity < 20);
    setLowItems(low);
    
  }
  


  useEffect(() => {
    ProcessAnalysis(getSchoolsData);
    ProcessAnalysis(getItemsData);
    getLowStockItems();

    if(filter ==='All'){
      
       setGetItemsData(originalItems);

       return setSchools(originalSchools);
    
    }
    
    if(filter && schools){
      let schoolsMatch = schools.filter(item=>item.
        LGA === filter
        );
        
        if(schoolsMatch.length ===0){
          
          let schoolType = schools.filter(item=>item.SCHOOL_TYPE===filter);
          setCount(schoolType.length);
        }else{
          setCount(schoolsMatch.length);
        }
        
        
        
    }
    if(filter && filter === 'All'){
      setGetItemsData(originalItems); // Show all items
      setCount(schools.length); // Update count based on all schools
  
    }
   else if(filter==='AKOKO EDO'){
     
      setGetItemsData(originalItems.filter(item =>
        item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ));
    
    } else if(filter ==='EGOR'){
      setGetItemsData(originalItems.filter(item =>
        item.item_name === 'Basic Science: An Integrated Science Course' ||
        item.item_name === 'Junior Secondary Business Studies Textbook' 
      ))
    }
    else if(filter ==='ESAN CENTRAL'){
      
      setGetItemsData(originalItems.filter(item =>
        item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ));
    } else if(filter && filter==='JSS'){
      setGetItemsData(originalItems.filter(item =>
       item.item_name === 'Basic Science: An Integrated Science Course' ||
        item.item_name === 'Junior Secondary Business Studies Textbook' 
      ))
    }
    else if(filter &&filter==='Primary'){
      setGetItemsData(originalItems.filter(item =>
       item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ))
    }
    else if(filter && filter==='Progressive'){
      setGetItemsData(originalItems.filter(item =>
       item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ))
    }
  }, [getItemsIsLoading, getSchoolsIsLoading,filter ])

  const {value: InvetoryDifference, trend: InvetoryTrend} = itemDataAnalysis
  const {value: SchoolDifference, trend: SchoolTrend} = schoolDataAnalysis

  useEffect(() => {
    if (location.state?.message) {
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const getSchoolsNew = async () => {
     
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school`);
      
      setSchools(response.data.schools);
      
      setCount(response.data.count);
      setOriginalSchools(response.data.schools);
    } catch (error) {
      console.log(error)
    } 
  };

  useEffect(()=>{
    getSchoolsNew()
  },[])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterUserRole = useMemo(()=>[
    {
    pk:1,
    type: 'Admin',

    },
    {
      pk:2,
      type: 'Warehouse Staff',
  
      },
      {
        pk:3,
        type: 'Head Teacher',
    
        },
])
  const filterOptionforLGA = useMemo(() => [
    {

      pk: 1,
      type: "All",
    },

   
    {
      pk: 2,
      type: "AKOKO EDO",
    },
    {
      pk: 3,
      type: "EGOR",
    },
    {
      pk: 4,
      type: "ESAN CENTRAL",
    },
    {
      pk: 5,
      type: "ESAN NORTH EAST",
    },
    {
      pk: 6,
      type: "ESAN SOUTH EAST",
    },
    {
      pk: 7,
      type: "ESAN WEST",
    },
    {
      pk: 8,
      type: "ETSAKO CENTRAL",
    },
    {
      pk: 9,
      type: "ETSAKO EAST",
    },
    {
      pk: 10,
      type: "ETSAKO WEST",
    },
    {
      pk: 11,
      type: "IGUEBEN",
    },
    {
      pk: 12,
      type: "IKPOBA OKHA",
    },
    {
      pk: 13,
      type: "OREDO",
    },
    {
      pk: 14,
      type: "ORHIONMWON",
    },
    {
      pk: 15,
      type: "OVIA NORTH EAST",
    },
    {
      pk: 16,
      type: "OVIA SOUTH WEST",
    },
    {
      pk: 17,
      type: "OWAN EAST",
    },
    {
      pk: 18,
      type: "OWAN WEST",
    },
    {
      pk: 19,
      type: "UHUNMWODE",
    },

  ], []);

  const filterOptionForType = useMemo(()=>[

 
   {
    pk:1,
    type:'All'
   },

    {
      pk: 2,
      type: 'JSS'
    },
    {
      pk: 3,
      type: 'Primary'
    },
    {
      pk: 4,
      type: 'Progressive'
    }
  ])

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handlePushNotification = () => {
    navigate("/AdminPushNotification");
  };

  const handleGenerateReport = () => {
    navigate("/GenerateInventory");
  };

  const filterData = [
    {
      pk: 1,
      type: "Excel",
    },
    {
      pk: 2,
      type:'pdf'
    }
   
  ];
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };
  const Bardata = {
    // labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],

    labels: paginatedData.map(item => item.item_name),
   
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: paginatedData.map(item => item.quantity),
      },
    ],
  };
  const Baroptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        type: "linear",
        ticks: {
          font: {
            size: "12px",
            weight: "400",
            lineHeight: "25.6px",
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: "12px",
            weight: "400",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Piedata = {


    labels: getItemsData.map(item=>item.item_name)||["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: getItemsData.map(item=>item.quantity) ||[300, 50, 100, 40, 120, 75],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Pieoptions = {
    cutout: "50%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Arkdata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Material Usage",
        data: [650, 590, 800, 810, 560, 550, 400, 700, 750, 650],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const Arkoptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

 

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          

  {/* Header Section */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <TitleHeader text={"Dashboard"} />
    
  </div>

  {/* Button Section */}
  <Row className="mb-3">
    <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
      <Button
        variant="primary"
        onClick={handleShow}
        className="InventoryReportButton"
      >
        View Low Stock Items
      </Button>
    </Col>
    <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
      <PrimaryButton
        text={"Add New Item"}
        Primarystyle={"InventoryReportButton"}
        clickEvent={() => navigate('/AddNewItem')}
      />
    </Col>
    <Col lg={3} md={3} xl={3} sm={6} xs={6}>
      <PrimaryButton
        text={"Generate Inventory Report"}
        Primarystyle={"InventoryReportButton"}
        clickEvent={handleGenerateReport}
      />
    </Col>
    <Col lg={3} md={3} xl={3} sm={6} xs={6}>
      <PrimaryButton
        text={"Send Push Notification"}
        Primarystyle={"InventoryReportButton"}
        clickEvent={handlePushNotification}
      />
    </Col>
  </Row>

  {/* UserBox Section */}
  <UserBox items={lowItems} show={showModal} handleClose={handleClose} />

  
  {/* Filter Section */}
  
  <Row className="mb-3 mt-3">
    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
      <div className="d-flex justify-content-between align-items-center">
        <TitleHeader
          text={"Material Availability Overview"}
          headerTextStyle={"headerTextStyle"}
        />
        <Form.Control
          type="date"
          placeholder="Minimum Stock Level"
          className="pushNotificationTitle"
          style={{ width: 150 }}
        />
        <div className="d-none d-lg-flex" style={{gap:20}}>
        <Filter
          optionTitle={"School Type"}
          options={filterOptionForType}
          defult={"All"}
          onSelect={(value) => setFilter(value)}
          
        />
        <Filter
          optionTitle={"LGA"}
          options={filterOptionforLGA}
          defult={"All"}
          onSelect={(value) => setFilter(value)}
        />
        </div>
      </div>
      <div className="d-lg-none d-flex justify-content-end mt-3">
        <Filter
          optionTitle={"School Type"}
          options={filterOptionForType}
          defult={"All"}
          onSelect={(value) => setFilter(value)}
        />
        <Filter
          optionTitle={"LGA"}
          options={filterOptionforLGA}
          defult={"All"}
          onSelect={(value) => setFilter(value)}
        />
      </div>
    </Col>
  </Row>

  {/* Presentation Section */}
       <Row className="mb-3">
    <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
      <Row className="mb-3">
        <PresentaionCard
          title={"Total EdoSUBEB Schools"}
          image={inventoryImage}
          figure={count ? count : 0}
          margin={`${SchoolTrend === 'up' ? '↑' : SchoolTrend === 'down' ? '↓' : '~'} ${SchoolDifference}`}
          marginColor={SchoolTrend === 'up' ? 'text-success' : SchoolTrend === 'down' ? 'text-danger' : 'text-primary'}
        />
      </Row>
      <Row className="mb-3">
        <PresentaionCard
          title={"Total Items"}
          image={schoolImage}
          figure={getItemsData ? getItemsData.length : 0}
          margin={`${InvetoryTrend === 'up' ? '↑' : InvetoryTrend === 'down' ? '↓' : '~'} ${InvetoryDifference}`}
          marginColor={InvetoryTrend === 'up' ? 'text-success' : InvetoryTrend === 'down' ? 'text-danger' : 'text-primary'}
        />
      </Row>
    </Col>
    <Col lg={6} md={12} xl={8} sm={12} xs={12}>
      {/* <BarGraph data={Bardata} options={Baroptions} /> */}
      <UserBox items={lowItems} show={showModal} handleClose={handleClose} />
      <div style={{ width: 150, margin: 'auto' }}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mt-3 mx-3 fa-2x backButtonIcon"
          onClick={handlePreviousPage}
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          className="mt-3 mx-3 fa-2x backButtonIcon"
          onClick={handleNextPage}
        />
      </div>
    </Col>
        </Row>
 


          {/* <Row className="d-none d-lg-flex mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
                onSelect={(value) => setExportType(value)}
                
              />
            </Col>
          </Row> */}

          {/* <Row className="d-none d-lg-flex">
            <Col lg={6} md={5} xl={6}>
              <TitleHeader
                text={"Inventory Insights"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
            <Col className="d-flex justify-content-end ms-auto gap-3 mb-2">
              <Filter
                optionTitle={"Predictive Analytics"}
                options={""}
                defult={""}
              /> */}
              {/* <Filter
                optionTitle={"Sort by"}
                // options={filterData}
                defult={"All"}
              /> */}
            {/* </Col> */}
          {/* </Row> */}
          {/* <Row className="mb-3">
            <Col lg={6} md={6} xl={4} sm={12} xs={12} className="mb-3">
              <DoughnutGraph data={Piedata} options={Pieoptions} />
            </Col>
            <Col lg={6} md={6} xl={8} sm={12} xs={12} className="">
              <LineGraph data={Arkdata} options={Arkoptions} />
            </Col>
          </Row> */}

          <Row className="mb-3 mt-5">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <div className="d-flex justify-content-between ">
                <TitleHeader
                  text={"Recent User Activity"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Filter
                  optionTitle={"User Role"}
                  options={filterUserRole}
                  defult={"All"}
                  Filterstyle={"d-none d-lg-block"}
                />
              </div>
              <div className=" d-lg-none d-flex justify-content-end ">
                <Filter
                  optionTitle={"User Role"}
                  options={filterUserRole}
                  defult={"All"}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} xl={12} sm={12} xs={12} className="">
              <Card className="AdminRecentUserCardBody">
                <div className="AdminRecentUserActivtyScroll">
                  <Card.Title className="CardTiTle fw-bold m-3">
                    User Acitivity Logs
                  </Card.Title>
                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {logs.map((log) => (
                      <Row
                        key={log.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{log.email}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {log.category}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {log["log-details"]}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {log.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {log.time}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                  {/* <Card.Title className="CardTiTle fw-bold m-3">
                    Warehouse Staff
                  </Card.Title>

                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {logs.map((log) => (
                      <Row
                        key={log.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{log.email}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {log.category}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {log["log-details"]}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {log.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {log.time}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Head Teacher
                  </Card.Title>

                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {logs.map((log) => (
                      <Row
                        key={log.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{log.email}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {log.category}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {log["log-details"]}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {log.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {log.time}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body> */}
                </div>
              </Card>
            </Col>
          </Row>
         </Container>
      </div>
    </div>
  );
}


export default AdminDashboard;

