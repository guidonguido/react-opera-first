import React from 'react';
import '../css/Sidebar.css';
import { NavLink } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';

const Sidebar = (props) => {
  return (
    <div className='fixed-top below-nav-list'>
      <ListGroup variant='flush'>
        <ListGroup.Item className='custom-sidebar' onClick={props.showSidebar}>
          <Nav.Link style={{ textDecoration: 'none', color: 'white' }} as={NavLink} to='/'>
            HOME
          </Nav.Link>
        </ListGroup.Item>
        <ListGroup.Item className='custom-sidebar' onClick={props.showSidebar}>
          <Nav.Link style={{ textDecoration: 'none', color: 'white' }} as={NavLink} to='/iscrizioneAssociazione'>
            Iscriviti ad OPERA
          </Nav.Link>
        </ListGroup.Item>
        <ListGroup.Item className='custom-sidebar' onClick={props.showSidebar}>
          <Nav.Link style={{ textDecoration: 'none', color: 'white' }} as={NavLink} to='/iscrizioneTorneo'>
            Iscriviti al TORNEO
          </Nav.Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Sidebar;
