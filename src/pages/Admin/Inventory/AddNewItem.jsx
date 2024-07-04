import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import axios from "axios";
import Barcode from 'react-barcode';
import { useNavigate } from "react-router-dom";

function AddNewItem() {
  const fileInputRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const inputRef = useRef(null);
  const[name, setName] = useState('');
  const[brand, setBrand] = useState('');
  const[description, setDescription] = useState('');
  const[category, setCategory] = useState('');
  const[value, setValue] = useState('High');
  const[image, setImage] = useState(null);
  const[unit_cost, setUnitCost] = useState(0);
  const[quantity, setQuantity] = useState(0);
  const[reorder_point, setReoderPoint] = useState(0);
  const[supplier, setSupplier] = useState("");
  const [bar_code, setBarCode] = useState('');

  const handleInputChange = (e) => {
    setBarCode(e.target.value);
};
  const navigate = useNavigate();
  

  const handleFileChange = (event) => {
    const fileName = event.target.files[0];
    setImage(fileName)
    // document.getElementById("fileLabel").innerText = fileName;
  };

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current.focus();
}, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // "name" => "required|string",
  // "description" => "required|string",
  // "brand" => "required|string",
  // // "category" => "required|string",
  // "value" => "required|string",
  // "image" => "required",
  // "unit_cost" => "required|numeric",
  // "quantity" => "required|numeric",
  // "reorder_point" => "required|numeric",
  // "supplier" => "required|string",
  const handleSubmit = async(e)=>{
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("image", image);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('value', value);
    formData.append('unit_cost', unit_cost);
    formData.append('quantity', quantity);
    formData.append('reorder_point', reorder_point);
    formData.append('supplier', supplier);
    formData.append('bar_code', bar_code);

    try {
      const res = await axios.post('https://195d-102-89-34-7.ngrok-free.app/api/item/', formData);
      console.log(res.data)
      navigate('/InventoryManagement');
    } catch (error) {
      console.log(error);
    }



  }
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Add New Item"} />
          </div>
          <Row>
            <TitleHeader text={"School Information "} headerTextStyle={'headerTextStyle'}/>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="UserCreateInput"
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="url"
                      className="UserCreateInput"
                      placeholder="Item Description"
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Barcode"
                      onChange={handleInputChange}
                      ref={inputRef}
                      value={bar_code}
                    />
                  </Col>
                </Row>
                
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Brand"
                      className="UserCreateInput"
                      onChange={(e)=>setBrand(e.target.value)}
                    />
                  </Col>
                </Row>
                {/* <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      placeholder="unique bar code"
                      className="UserCreateInput"
                    />
                  </Col>
                </Row> */}
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                  <Filter
                      default={"Office Supplies"}
                      optionTitle={"Category:"}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={2} xs={2}>
                    <Filter
                      default={"High"}
                      optionTitle={"Value:"}
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="shoolfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    <CustomFileInput
                      fieldName={"shoolfileInput"}
                      title={"Upload Item Image"}
                      icon={faUpload}
                      
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Inventory Details"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      placeholder="Unit Cost"
                      className="UserCreateInput"
                      onChange={(e)=>setUnitCost(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Quantity on Hand"
                      onChange={(e)=>setQuantity(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Reorder Point"
                      onChange={(e)=>setReoderPoint(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Supplier"
                      onChange={(e)=>setSupplier(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="success" className="w-100 p-2" onClick={handleSubmit}>Save Item </Button> 
            </Form>
            {bar_code && (
                <div style={{ marginTop: '20px' }}>
                    <Barcode value={bar_code} />
                </div>
            )}
          </Row>
          <Row>
            <TitleHeader text={"Addittional Information"} headerTextStyle={'headerTextStyle'}/>
            <Row className="mb-3">
              <Form>
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Serial Number"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Warrant Information"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Addittional Information"
                        className="UserCreateTextArea"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" onClick={handleSubmit}>Save Item </Button> 
              </Form>
            </Row>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AddNewItem;
