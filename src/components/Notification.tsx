import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
type NotificationProp={
    show:boolean
    setShow:boolean
    country:string
}
function Notification({show,setShow, country}:NotificationProp) {
    const [shows,setShows]=useState(show)
    function handleHide(){
        setShows(false)
    }
  return (
    <>
    
      <Modal
        size="sm"
        show={shows}
        onHide={handleHide}
        aria-labelledby="example-modal-sizes-title-sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {country} not found
        </Modal.Body>
      </Modal>
      </>
  );
}

export default Notification