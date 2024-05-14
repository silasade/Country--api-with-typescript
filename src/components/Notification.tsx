import { useState,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ThemeContext } from './contexts/ThemeContext';
import { BackgroundContext } from './contexts/BackgroundContext';
type NotificationProp={
    show:boolean
    setShow: (show: boolean) => void;
    country:string
}
function Notification({show,setShow, country}:NotificationProp) {
    const themecontext=useContext(ThemeContext)
    const backgroundContext=useContext(BackgroundContext)
    const [shows,setShows]=useState(show)
    function handleHide(){
        setShows(false)
    }
  return (
    <>
    
      <Modal
        size="sm"
        show={show}
        onHide={()=>setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm" >
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {country} not found
        </Modal.Body>
      </Modal>
      </>
  );
}

export default Notification