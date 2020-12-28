import React, { useState, useEffect } from 'react';
// IMPORT MENU
import Menu from '../Menu/menu';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function MyVerticallyCenteredModal(props) {
    // console.log(props)
    const [id, setId] = useState(props.taskDataId);
    const [title, setTitle] = useState('');
    const [task, setTask] = useState(props.taskDataTask);

    useEffect(() => {
        
    }, [])
    
    const handleForm = (e) => {
        e.preventDefault();
        // setFormTask({
        //     id: id,
        //     task: task
        // })

        // fetch('http://localhost:8080/api/v1/newTask', {
        //     method: 'POST',
        //     // headers: {
        //     //     Accept: 'application/json',
        //     //     'Content-Type': 'application/json'
        //     // },
        //     body: JSON.stringify({
        //         title,
        //         task,
        //     }) 
                
        // }).then(res => res.json())
        // .then(data => console.log(data.message))
        // fetch('http://localhost:8080/api/v1/getTask')
        // .then(response => response.json())
        // .then(data => setTasks(data.message));
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

    return (
        
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>title</Form.Label>
                        <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Task</Form.Label>
                        <Form.Control type="text" placeholder="Task" onChange={(e) => setTask(e.target.value)} value={task} />
                    </Form.Group>
                    <Button variant="primary btn-block" type="submit">
                        Submit
                        </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function Todos() {
    const [modalShow, setModalShow] = useState(false, '', '', '');
    const [title, setTitle] = useState('');
    const [task, setTask] = useState('');
    const [formTask, setFormTask] = useState({ id: '', task: '' });
    const [tasks, setTasks] = useState([]);

    const handleForm = (e) => {
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
                title,
                task,
            }) 
                
        }).then(res => res.json())
        .then(data => console.log(data.message))
        fetch('http://localhost:8080/api/v1/getTask')
        .then(response => response.json())
        .then(data => setTasks(data.message));
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


    useEffect(() => {
        fetch('http://localhost:8080/api/v1/getTask')
            .then(response => response.json())
            .then(data => setTasks(data.message));
    }, [])

    return (
        <div>
            <Menu />
            <Container>
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    
                />
                <br></br>
                {/* <p>{task}</p> */}
                <Form onSubmit={handleForm}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Task</Form.Label>
                        <Form.Control type="text" placeholder="Task" onChange={(e) => setTask(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary btn-block" type="submit">
                        Submit
                        </Button>
                </Form>
                <br></br>
                <div className="row" >
                {tasks.map((data, index) => {
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
                                            <Button variant="primary" onClick={() => setModalShow(true)}>Edit</Button>
                                        </div>
                                        <div className="col-6">
                                            <Button variant="danger">Delete</Button>
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
        </div>
    );
}

export default Todos;