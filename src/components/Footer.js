import React from 'react';
import '../css/Footer.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';

// get our fontawesome imports
import { faFacebook, faInstagram, faWhatsapp, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = (props) => {
  let positionProps = {}

  if(props.position==='sticky')
    positionProps.sticky = 'bottom';

  if(props.position==='fixed')
    positionProps.fixed = 'bottom';
  

  return (
    <>
      <Navbar variant='dark' expand='sm' {...positionProps} className='custom-footer'>
        <Nav className='mr-auto d-none d-sm-block' style={{ marginTop: '-10px' }}>
          <Row style={{ marginLeft: 'auto' }} className='custom-font-title'>
            INDIRIZZO
          </Row>
          <Row style={{ marginLeft: '-10px' }} className='custom-font-p'>
            Da qualche parte a Cerzeto
          </Row>
        </Nav>
        <Nav className='mr-auto ml-auto d-sm-block mb-4 mb-sm-0' style={{ marginTop: '-20px' }}>
          <Row style={{ marginBottom: '-20px' }}>
            <a href='https://m.facebook.com/profile.php?id=2430418867236248&ref=content_filter' target="_blank"  rel="noopener noreferrer">
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faFacebook} size='2x' />
            </a>
            <a href='https://www.instagram.com/opera_aps/' target="_blank"  rel="noopener noreferrer">
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faInstagram} size='2x' />
            </a>
            <a href='https://wa.me/+39 3495513563' target="_blank"  rel="noopener noreferrer">
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faWhatsapp} size='2x' />
            </a>
            <a href='mailto:operaaps@outlook.it' target="_blank"  rel="noopener noreferrer">
              <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faAt} size='2x' />
            </a>
          </Row>
        </Nav>

        <Nav className='ml-auto d-none d-sm-block ' style={{ marginTop: '-10px' }}>
          <Row style={{ marginRight: 'auto' }} className='custom-font-title'>
            ASSOCIAZIONE
          </Row>
          <Row style={{ marginLeft: '-10px' }} className='custom-font-p'>
            Breve info
          </Row>
        </Nav>
      </Navbar>

      <Navbar  variant='dark' expand='sm' {...positionProps} className='custom-footer-bottom'>
        <Nav className='mr-auto ml-auto' style={{ marginTop: '-10px', marginBottom: '-10px' }}>
          <Nav.Item className='custom-font-p'>Made for Opera APS by Guido Ricioppo © - 2020   -   <a href='https://github.com/guidonguido' target="_blank"  rel="noopener noreferrer">
              Contact me <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faGithub}  />
            </a></Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default Footer;
