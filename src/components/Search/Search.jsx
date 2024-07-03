import React from 'react'
import "./Search.css";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search({Searchstyle}) {
    return (
        <div className={`sideNavSearchBarContainer ${Searchstyle}`}>
          <FontAwesomeIcon icon={faSearch} className="sideNavSearchIcon" />
           <input type="text" placeholder="Search" className="sideNavSearchBar" />
        </div>
      );
}

export default Search