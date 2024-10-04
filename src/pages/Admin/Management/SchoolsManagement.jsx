import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import schoolImage from "../../../assets/schools/schoolchildrens.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import SchoolContext from "../../../context/School/SchoolContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop, convertDate } from "../../../utils/HelperFunc";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import axios from "axios";
function SchoolsManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    getSchoolsData,
    getSchoolsIsLoading,
    setGetSchoolsIsLoading,
    getSchools,
    getSchoolTotal,
  } = useContext(SchoolContext);

  const { ProcessAnalysis, schoolDataAnalysis } = useContext(AnalysisContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSchools();
    setFilteredData(getSchoolsData);
  }, []);

  useEffect(() => {
    ProcessAnalysis(getSchoolsData);
  }, [getSchoolsIsLoading]);

  const { value, trend } = schoolDataAnalysis;

  useEffect(() => {
    handleFilterSortSearch();
  }, [sortBy, getSchoolsData]);

  useEffect(() => handleLgaTypeFilter(), [filterBy]);

  useEffect(() => handleNameSearch(), [searchTerm]);

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOptionForType = useMemo(() => [
    {
      pk: 1,
      type: "All",
    },
    {
      pk: 2,
      type: "JSS",
    },
    {
      pk: 3,
      type: "Primary",
    },
    {
      pk: 4,
      type: "Progressive",
    },
  ]);

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "All",
      },
      {
        pk: 2,
        type: "Akoko Edo",
      },
      {
        pk: 3,
        type: "Egor",
      },
      {
        pk: 4,
        type: "Esan Central",
      },
      {
        pk: 5,
        type: "Esan North-East",
      },
      {
        pk: 6,
        type: "Esan South-East",
      },
      {
        pk: 7,
        type: "Esan West",
      },
      {
        pk: 8,
        type: "Etsako Central",
      },
      {
        pk: 9,
        type: "Etsako East",
      },
      {
        pk: 10,
        type: "Etsako West",
      },
      {
        pk: 11,
        type: "Igueben",
      },
      {
        pk: 12,
        type: "Ikpoba Okha",
      },
      {
        pk: 13,
        type: "Oredo",
      },
      {
        pk: 14,
        type: "Orhionmwon",
      },
      {
        pk: 15,
        type: "Ovia North East",
      },
      {
        pk: 16,
        type: "Ovia South Wast",
      },
      {
        pk: 17,
        type: "Owan East",
      },
      {
        pk: 18,
        type: "Owan West",
      },
      {
        pk: 19,
        type: "Uhunmwode",
      },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      {
        pk: 1,
        type: "ascending",
      },
      {
        pk: 2,
        type: "descending",
      },
    ],
    []
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNameSearch = () => {
    setGetSchoolsIsLoading(true);
    setTimeout(async () => {
      const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

      try {
        if (searchTerm.length) {
          const formData = {
            search: searchTerm,
          };
          const results = await axios.post(
            `${baseUrl}/api/school/search`,
            formData
          );

          setFilteredData(
            results.data.schools.length ? results.data.schools : []
          );
        } else {
          setFilteredData(filteredData);
        }
      } catch (error) {
      } finally {
        setGetSchoolsIsLoading(false);
      }
    }, 1500);
  };

  const handleLgaTypeFilter = () => {
    setGetSchoolsIsLoading(true);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

    if (filterBy && filterBy !== "All") {
      if (
        filterBy === "JSS" ||
        filterBy === "Primary" ||
        filterBy === "Progressive"
      ) {
        setTimeout(async () => {
          try {
            console.log("filteredby");
            console.log(filterBy);
            const formData = {
              level: filterBy,
            };
            const results = await axios.post(
              `${baseUrl}/api/school/level`,
              formData
            );

            setFilteredData(
              results.data.schools.length ? results.data.schools : []
            );
          } catch (error) {
          } finally {
            setGetSchoolsIsLoading(false);
          }
        }, 500);
      } else {
        setTimeout(async () => {
          try {
            const formData = {
              lga: filterBy,
            };
            const results = await axios.post(
              `${baseUrl}/api/school/lga`,
              formData
            );

            setFilteredData(
              results.data.schools.length ? results.data.schools : []
            );
          } catch (error) {
          } finally {
            setGetSchoolsIsLoading(false);
          }
        }, 500);
      }
    } else {
      setFilteredData(getSchoolsData);
      setGetSchoolsIsLoading(false);
    }
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getSchoolsData];

    // if (filterBy && filterBy !== "All") {
    //   if (
    //     filterBy === "JSS" ||
    //     filterBy === "Primary" ||
    //     filterBy === "Progressive"
    //   ) {
    //     filtered = filtered.filter((item) => item.SCHOOL_TYPE === filterBy);
    //   } else {
    //     filtered = filtered.filter((item) => item.LGA === filterBy);
    //   }
    // }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.SCHOOL_NAME.localeCompare(b.SCHOOL_NAME);
        } else {
          return b.SCHOOL_NAME.localeCompare(a.SCHOOL_NAME);
        }
      });
    }

    setFilteredData(filtered);
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleCreateSchool = () => {
    navigate("/AddSchool");
  };
  const handleSchoolDetail = (pk) => {
    navigate(`/SchoolDetail/${pk}`);
  };
  const handleSchoolEdit = (pk) => {
    navigate(`/EditSchool/${pk}`);
  };

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
          <BackButtonIcon />
          <TitleHeader text={"Schools Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <input
                type="text"
                placeholder="Search School"
                className="seachContentBar px-2"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ display: "block", width: "100%", borderRadius: 10 }}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Total EdoSUBEB Schools"}
                image={schoolImage}
                figure={getSchoolTotal}
                margin={`${
                  trend === "up" ? "↑" : trend === "down" ? "↓" : "~"
                } ${value}`}
                marginColor={
                  trend === "up"
                    ? "text-success"
                    : trend === "down"
                    ? "text-danger"
                    : "text-primary"
                }
              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add School"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateSchool()}
              />
            </Col>
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"All"}
                onSelect={(value) => setFilterBy(value)}
              />

              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOptionForType}
                defult={"All"}
                onSelect={(value) => setFilterBy(value)}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"LGA"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOptionForType}
                defult={"School Type"}
                onSelect={(value) => setFilterBy(value)}
              />
              <PrimaryButton
                icPrimaryiconon={faAdd}
                text={"Create New School"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateSchool()}
              />
            </Col>
          </Row>
          <Container>
            {!getSchoolsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((school, index) => (
                  <Row
                    key={index}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                      <Image
                        src="https://img.freepik.com/free-vector/education-logo-templates_1198-200.jpg?size=626&ext=jpg&ga=GA1.1.869143472.1720893411&semt=ais_user"
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{school.name}</h6>
                        <h6 className="">
                          {" "}
                          {school.school_id}
                          <span className="text-muted InventoryCategoryText">
                            {" "}
                            | {school.lga}{" "}
                            <span className="d-none d-lg-inline me">
                              {school.SENATORIAL_DISTRICT} |{" "}
                              {school.SCHOOL_TYPE} | {school.phone_number} |{" "}
                              <b>{school.postal_code}</b> |
                              <span
                                className={
                                  school.status === "Active"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {" "}
                                {school.status}
                              </span>{" "}
                              | {convertDate(Date.now())}
                            </span>{" "}
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      className="d-flex justify-content-end gap-2"
                    >
                      <PrimaryButton
                        text={"Edit"}
                        Primarystyle={"UserViewButton d-none d-lg-block"}
                        clickEvent={() => handleSchoolEdit(school.id)}
                      />
                      <PrimaryButton
                        text={"View"}
                        Primarystyle={"schoolViewButton"}
                        clickEvent={() => handleSchoolDetail(school.id)}
                      />
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no school available 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getSchoolsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default SchoolsManagement;
