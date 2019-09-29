import React, { Component } from "react";
import { Modal, Button, ModalBody, ModalHeader, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import axios from "axios";

import "./App.css";
import avatar from "./assets/img/avatar.png";

class App extends Component {
  state = {
    users: [],
    newUserData: {
      name: null,
      number: null,
      info: null
    },
    editUserData: {
      id: null,
      name: null,
      number: null,
      info: null
    },
    deleteUserData: {
      id: null
    },
    newUserModal: false,
    editUserModal: false,
    deleteUserModal: false
  };

  componentDidMount() {
    this._refreshUsers();
  }
  toggleNewUserModal() {
    this.setState({ newUserModal: !this.state.newUserModal });
  }
  toggleEditUserModal() {
    this.setState({ editUserModal: !this.state.editUserModal });
  }
  toggleDeleteUserModal() {
    this.setState({ deleteUserModal: !this.state.deleteUserModal });
  }

  addUser() {
    console.log(this.state.newUserData);
    const rel = this.state.newUserData;
    fetch("http://restapi/api/user/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(rel)
    }).then(response => {
      this.setState({
        newUserModal: false,
        newUserData: {
          name: "",
          number: "",
          info: ""
        }
      });
      this._refreshUsers();
    });
  }

  editUser(id, name, number, info) {
    this.setState({
      editUserData: { id, name, number, info },
      editUserModal: !this.state.editUserModal
    });
  }

  updateUser() {
    const { name, number, info, id } = this.state.editUserData;
    console.log(this.state.editUserData);
    axios
      .put("http://restapi/api/user/update.php/", { id: id, info: info, name: name, number: number })
      .then(response => this._refreshUsers());
    this.setState({
      editUserModal: false
    });
  }

  confirmDeleteUser(id) {
    console.log(id);
    this.setState({
      deleteUserData: { id: id },
      deleteUserModal: !this.state.deleteUserModal
    });

    console.log(id);
  }

  deleteUser() {
    const { id } = this.state.deleteUserData;

    axios.delete("http://restapi/api/user/delete.php", { data: { id: id } }).then(response => {
      this._refreshUsers();
    });
    this.setState({
      deleteUserModal: false
    });
  }

  _refreshUsers() {
    axios.get("http://restapi/api/user/read.php").then(response =>
      this.setState({
        users: response.data
      })
    );
  }
  render() {
    let users;
    if (this.state.users[0]) {    
    users = this.state.users.map(user => {
      return (
        <div className="card" key={user.id}>
          <div className="card-top-info">
            <div className="card-image">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="card-info">
              <p className="card-name">{user.name}</p>
              <p className="card-number">{user.number}</p>
            </div>
            <div className="card-buttons">
              <Button
                color="success"
                className="mr-2 my-3"
                onClick={this.editUser.bind(this, user.id, user.name, user.number, user.info)}
              >
                Edit
              </Button>
              <Button color="danger" onClick={this.confirmDeleteUser.bind(this, user.id)}>
                Delete
              </Button>
            </div>
          </div>
          <div className="card-bottom-info">
            <p className="card-desc">{user.info}</p>
          </div>
        </div>
      );
    });
  }

    return (
      <div className="App">
        <div className="container">
          <div className="top-section">
            <h1 className="top-section__title">Contact App</h1>
            <Button className="my-3 addUser-btn" color="primary" onClick={this.toggleNewUserModal.bind(this)}>
              Add user
            </Button>
          </div>

          <Modal isOpen={this.state.newUserModal} toggle={this.toggleNewUserModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>Add a new contact</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={this.state.newUserData.name}
                  onChange={event => {
                    const { newUserData } = this.state;
                    newUserData.name = event.target.value;
                    this.setState({
                      newUserData
                    });
                  }}
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="number">Number</Label>
                <Input
                  id="number"
                  value={this.state.newUserData.number}
                  placeholder="Number"
                  onChange={event => {
                    const { newUserData } = this.state;
                    newUserData.number = event.target.value;
                    this.setState({
                      newUserData
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="info">Info</Label>
                <Input
                  id="info"
                  type="text"
                  value={this.state.newUserData.info}
                  placeholder="Info"
                  onChange={event => {
                    const { newUserData } = this.state;
                    newUserData.info = event.target.value;
                    this.setState({
                      newUserData
                    });
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addUser.bind(this)}>
                Add user
              </Button>
              <Button color="secondary" onClick={this.toggleNewUserModal.bind(this)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit contact</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={this.state.editUserData.name}
                  onChange={event => {
                    const { editUserData } = this.state;
                    editUserData.name = event.target.value;
                    this.setState({
                      editUserData
                    });
                  }}
                  placeholder="Name"
                />
              </FormGroup>
              <FormGroup>
                <Label for="number">Number</Label>
                <Input
                  id="number"
                  value={this.state.editUserData.number}
                  placeholder="Number"
                  onChange={event => {
                    const { editUserData } = this.state;
                    editUserData.number = event.target.value;
                    this.setState({
                      editUserData
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="info">Info</Label>
                <Input
                  id="info"
                  type="text"
                  value={this.state.editUserData.info}
                  placeholder="Info"
                  onChange={event => {
                    const { editUserData } = this.state;
                    editUserData.info = event.target.value;
                    this.setState({
                      editUserData
                    });
                  }}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateUser.bind(this)}>
                Update user
              </Button>
              <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={this.state.deleteUserModal} toggle={this.toggleDeleteUserModal.bind(this)}>
            <ModalHeader toggle={this.toggleDeleteUserModal.bind(this)}>Deleting contact</ModalHeader>
            <ModalBody>
              <h3>Are u sure?</h3>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.deleteUser.bind(this)}>
                Delete contact
              </Button>
              <Button color="secondary" onClick={this.toggleDeleteUserModal.bind(this)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          
          <div className="content-section">{users}</div>
        </div>
      </div>
    );
  }
}

export default App;
