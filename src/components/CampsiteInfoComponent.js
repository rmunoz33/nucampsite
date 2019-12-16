import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label, Col, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link, Route } from 'react-router-dom';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false, 
            touched: {
                rating: false,
                author: false,
                text: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
    }
    
    render() {
        return (
            <React.Fragment>
                <Button outline className="fa fa-pencil fa-lg" onClick={this.toggleModal}> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <div className="group">
                            <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating" >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                    </Control.select>
                                    <Errors
                                            className="text-danger"
                                            model=".rating"
                                            show="touched"
                                            component="div"
                                            
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(2),
                                            maxLength: maxLength(15)
                                        }}
                                        
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            minLength: 'Must be at least 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                        
                                    />
                                </Col>                        
                            </Row>
                            
                            <Row className="form-group">
                                <Label htmlFor="text" md={2}>Comment</Label>
                            </Row>
                            <Row className="form-group">
                                <Col md={10}>
                                    <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size: 10}}>
                                <Button type="submit" value="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {
        if (comments) {
            
            return (
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return (
                        <div key={comment.id}>
                            <p>{comment.text}
                            <br />
                            - {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                            </div>
                        )
                    })}
                    <CommentForm/>
                </div>
            )
        }
        return (
            <div>

            </div>
        )
    }

function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        } 
        return <div />;
}

export default CampsiteInfo;