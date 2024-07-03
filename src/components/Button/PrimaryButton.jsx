import React from 'react';
import "./Button.css";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function PrimaryButton({icon, text, Primarystyle, clickEvent}) {
  return (
    <Button className={`p-2 primaryMainButton ${Primarystyle}`} onClick={() => clickEvent()}>
        <FontAwesomeIcon icon={icon} className='px-2'/>
        {text}
    </Button>
  )
}

export default PrimaryButton