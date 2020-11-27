import React, { Component } from "react";
import secureAxios from "./secureAxios";

export default class Fetchdata extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
      inputname: "",
      inputEmail: "",
      editIndex: -1
    };
  }

  componentDidMount() {
    secureAxios
      .get("/users")
      .then((response) => {
        console.log(response.data);
        this.setState({ dataArray: response.data });
      })
      .catch((error) => {
        console.log("Some Error", error);
      });
  }

  handlechange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addName = () => {
    secureAxios
      .post("/users", {
        name: this.state.inputname,
        email: this.state.inputEmail
      })
      .then((res) =>
        this.setState({
          dataArray: [
            ...this.state.dataArray,
            {
              name: this.state.inputname,
              email: this.state.inputEmail,
              id: res.data.id
            }
          ],
          inputname: "",
          inputEmail: ""
        })
      );
  };

  editItem = (id) => {
    const myIndex = this.findThisItem(id);
    const editingItem = this.state.dataArray[myIndex];
    console.log(editingItem, "editingItem");

    this.setState({
      inputname: editingItem.name,
      inputEmail: editingItem.email,
      editIndex: myIndex
    });
  };

  updateItem = () => {
    const editingItem = this.state.dataArray[this.state.editIndex];
    console.log(editingItem, "editing this Item");

    this.setState({
      dataArray: [
        ...this.state.dataArray.slice(0, this.state.editIndex),
        {
          ...editingItem,
          name: this.state.inputname,
          email: this.state.inputEmail
        },
        ...this.state.dataArray.slice(this.state.editIndex + 1)
      ],
      inputname: "",
      inputEmail: "",
      editIndex: -1
    });
  };

  deletItem = (id) => {
    const myIndex = this.findThisItem(id);
    this.setState({
      dataArray: [
        ...this.state.dataArray.slice(0, myIndex),
        ...this.state.dataArray.slice(myIndex + 1)
      ]
    });
  };

  findThisItem = (id) => {
    let myIndex = -1;
    const finditem = this.state.dataArray.find((item, index) => {
      if (item.id == id) {
        myIndex = index;
        return true;
      }
      return false;
    });
    return myIndex;
  };

  render() {
    console.log(this.state);
    const { dataArray, inputname, inputEmail, editIndex } = this.state;
    return (
      <>
        <div>
          <h2 style={{ "text-align": "center" }}>Hello User !</h2>

          <input
            type="text"
            name="inputname"
            value={inputname}
            placeholder="Enter Your name"
            onChange={(event) => {
              this.handlechange(event);
            }}
            autoFocus
            required
          />
          <input
            type="text"
            name="inputEmail"
            value={inputEmail}
            placeholder="Enter Your Email ID"
            onChange={(event) => {
              this.handlechange(event);
            }}
            required
          />
          <span>
            {editIndex == -1 ? (
              <button type="submit" onClick={() => this.addName()}>
                Add User
              </button>
            ) : (
              <button onClick={() => this.updateItem()}>Update</button>
            )}
          </span>
        </div>

        <div class="names">
          <table>
            {dataArray.map((item, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>
                      <p>
                        {" "}
                        Student's name: <strong>{item.name}</strong>{" "}
                      </p>
                      <p>
                        {" "}
                        Email ID: <strong>{item.email}</strong>{" "}
                      </p>
                    </td>
                    <td>
                      <button onClick={() => this.deletItem(item.id)}>
                        Delete This Item
                      </button>
                    </td>
                    <td>
                      <button onClick={() => this.editItem(item.id)}>
                        Edit This Item
                      </button>
                    </td>
                  </tr>
                  <hr />
                </>
              );
            })}
          </table>
        </div>
      </>
    );
  }
}
