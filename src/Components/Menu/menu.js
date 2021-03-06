import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


class Menu extends React.Component{
    render(){
        return(
            <div>
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Todos <Badge variant="light">9</Badge></Navbar.Brand>
                <Nav className="mr-auto">
                <Nav.Link href="#home"></Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
                </Form>
            </Navbar>
            </div>
        );
    }
}

export default Menu;