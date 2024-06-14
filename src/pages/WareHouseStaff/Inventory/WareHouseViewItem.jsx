import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./WareHouseInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import PrimaryButton from "../../../components/Button/PrimaryButton";

function WareHouseViewItem() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"View Item Details"} />
          </div>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Item Information "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4  align-items-center">
                <Col className="itemHeaderText">item Image:<Image src={inventoryListImage} rounded width="50" height="50" className="mx-2" /></Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Item Name: <b className="itemDetailText mx-2">Pen</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Item Description: <b className="itemDetailText mx-2">Blue ballpoint pen</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Brand: <b className="itemDetailText mx-2">Bic</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Category: <b className="itemDetailText mx-2">Office Supplies</b> </Col>
            </Row>
          </Row>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Inventory Details "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Unit Cost: <b className="itemDetailText mx-2">$0.25</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Quantity on Hand: <b className="itemDetailText mx-2">23</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Reorder Point: <b className="itemDetailText mx-2">20</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Supplier: <b className="itemDetailText mx-2">Bic Industries</b> </Col>
            </Row>
          </Row>
          <Row className="itemDetailMainRow mb-2">
            <TitleHeader text={"Additional Information "} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Serial Number: <b className="itemDetailText mx-2">12345GHSN45</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Warranty Information: <b className="itemDetailText mx-2">2 months</b> </Col>
            </Row>
            <Row className="mb-4 align-items-center">
                <Col className="itemHeaderText">Custom Fields: <b className="itemDetailText mx-2">__</b> </Col>
            </Row> 
          </Row>
          <Row>
            <Col lg={8} md={8} xl={8} sm={12} xs={12} className="mb-3">
            <PrimaryButton text={'Edit Item Data'} Primarystyle={'w-100 itemDetailEditButton'}/>

            </Col>
            <Col lg={4} md={4} xl={4} sm={12} xs={12}>
            <PrimaryButton text={'print Item Label'} Primarystyle={'w-100 itemDetailPrintButton'}/>
            </Col>
          </Row>
        </Container>
      </div>
    </div>

  )
}

export default WareHouseViewItem