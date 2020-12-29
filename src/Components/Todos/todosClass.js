import React, { useState, useEffect } from 'react';
// IMPORT MENU
import Menu from '../Menu/menu';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class TodosClasses extends React.Component {
    constructor() {
        super();
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            title: '',
            task: '',
            tasks: [],
            show: false,
            //data to edit
            idEdit: '',
            titleEdit: '',
            taskEdit: '',
        }
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleTask = (e) => {
        this.setState({
            task: e.target.value
        })
    }

    handleTitleEdit = (e) => {
        this.setState({
            titleEdit: e.target.value
        })
    }

    handleTaskEdit = (e) => {
        this.setState({
            taskEdit: e.target.value
        })
    }

    handleShow = (id, title, task) => {
        this.setState({
            show: true,
            idEdit: id,
            titleEdit: title,
            taskEdit: task,
        });

    }

    handleHide() {
        this.setState({ show: false });
    }

    handleForm = (e) => {
        e.preventDefault();
        // setFormTask({
        //     id: id,
        //     task: task
        // })

        fetch('http://localhost:8080/api/v1/newTask', {
            method: 'POST',
            // headers: {
            //     Accept: 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({
                title: this.state.title,
                task: this.state.task,
            })

        }).then(res => res.json())
            .then(data => console.log(data.message))
        fetch('http://localhost:8080/api/v1/getTask')
            .then(response => response.json())
            .then(data => this.setState({ tasks: data.message }));
        // axios.post('http://localhost:8080/api/v1/newTask', {
        //     title,
        //     task,
        //   })
        //   .then(function (response) {
        //     console.log(response.message);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
    }

    handleFormEdit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/v1/updateTask/${this.state.idEdit}`, {
            method: "PUT",
            body: JSON.stringify({
                title: this.state.titleEdit,
                task: this.state.taskEdit
            })
        }).then(res => res.json())
        .then(resposne => this.refresData());
    }

    handleDelete = (idToDelete) =>{
        if(window.confirm("Shure you want to delete?") === true){
            fetch(`http://localhost:8080/api/v1/deleteTask/${idToDelete}`, {
                method: "DELETE",

            }).then(res => res.json())
            .then(resposne => this.refresData());
            
        }
    }

    refresData = () =>{
        fetch('http://localhost:8080/api/v1/getTask')
        .then(response => response.json())
        .then(data => this.setState({ tasks: data.message }));
    }
    componentDidMount() {
        fetch('http://localhost:8080/api/v1/getTask')
            .then(response => response.json())
            .then(data => this.setState({ tasks: data.message }));
    }

    render() {
        return (
            <div>
                <Menu />
                <Container>

                    <br></br>
                    {/* <p>{task}</p> */}
                    <Form onSubmit={(e) => this.handleForm(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" onChange={(e) => this.handleTitle(e)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Task</Form.Label>
                            <Form.Control type="text" placeholder="Task" onChange={(e) => this.handleTask(e)} />
                        </Form.Group>
                        <Button variant="primary btn-block" type="submit">
                            Submit
                            </Button>
                    </Form>
                    <br></br>
                    <div className="row" >
                        {this.state.tasks.map((data, index) => {
                            return <div key={data.id}>
                                <div className="col-4" >
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Body>
                                            <Card.Title>{data.title}</Card.Title>
                                            <Card.Text>
                                                {data.task}
                                            </Card.Text>

                                            <div className="row">
                                                <div className="col-6">
                                                    <Button variant="primary" onClick={() => this.handleShow(data.id, data.title, data.task)}>Edit</Button>
                                                </div>
                                                <div className="col-6">
                                                    <Button variant="danger" onClick={() => this.handleDelete(data.id)}>Delete</Button>
                                                </div>
                                            </div>


                                        </Card.Body>
                                    </Card>
                                </div>
                                <br></br>
                            </div>

                        })}

                    </div>
                </Container>


                <Modal
                    {...this.props}
                    show={this.state.show}
                    onHide={this.handleHide}
                    dialogClassName="custom-modal"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg">
                            Editing Task
            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(e) => this.handleFormEdit(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Title" onChange={(e) => this.handleTitleEdit(e)} value={this.state.titleEdit} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Task</Form.Label>
                                <Form.Control type="text" placeholder="Task" onChange={(e) => this.handleTaskEdit(e)} value={this.state.taskEdit} />
                            </Form.Group>
                            <Button variant="primary btn-block" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default TodosClasses;