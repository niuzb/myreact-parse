import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
var Loader = require("react-loader");

const style = {
  screen: {
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    background: "#e2e2e2"
  },
  title: {
    textDecoration: "underline"
  },
  dataTitle: {
    marginTop: "15px",
    color: "#030348",
    fontSize: "21p",
    textDecoration: "underline",
    marginLeft: "5px"
  },
  buttonStyle: {
    background: "transparent",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }
};
export default class MyCollectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      likes: 0,
      postImage: null,
      filesIncluded: false,
      objectId: null
    };
    this.handleFileUpload = this.handleFileUpload.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }
  handleFileUpload(e) {
    const _file = e.target.files[0];
    this.setState({ postImage: _file, filesIncluded: true });
  }
  clearAll() {
    this.setState({
      title: "",
      body: "",
      postImage: null,
      filesIncluded: false,
      editMode: false,
      objectId: null
    });
  }
  render() {
    const {
      data,
      error,
      status,
      info,
      isLoading,
      refresh,
      post,
      put
    } = this.props.fetchProps;
    const {
      title,
      body,
      likes,
      postImage,
      filesIncluded,
      editMode,
      objectId
    } = this.state;
    return (
      <div style={style.screen}>
        <h1 style={style.title}>Fetch collection example</h1>
        {isLoading && <Loader />}
        {isLoading && !data && <div>Patience, Heroku is sleeping...</div>}
        <h3>Number of Results: {info ? info.count : 0}</h3>
        {editMode ? (
          <Button onClick={this.clearAll}>Quiet Edit Mode</Button>
        ) : (
          <p>Create new Doc: </p>
        )}
        <div>
          <Card>
            <CardBody>
              <CardTitle>
                Post Title:
                <Input
                  value={title}
                  onChange={e => this.setState({ title: e.target.value })}
                />
              </CardTitle>
              <CardText>
                Post Body:
                <Input
                  value={body}
                  onChange={e => this.setState({ body: e.target.value })}
                />
              </CardText>
              <CardText>
                Post Image:
                <Input type="file" onChange={this.handleFileUpload} />
              </CardText>
              <Button
                onClick={() => {
                  const dataToSend = { title, body, likes };
                  if (postImage) {
                    dataToSend.postImage = postImage;
                  }
                  editMode
                    ? put(objectId, dataToSend, filesIncluded)
                    : post(dataToSend, filesIncluded);
                  this.clearAll();
                }}
              >
                {editMode ? "UPDATE" : "SUBMIT"}
              </Button>
            </CardBody>
          </Card>
        </div>
        <p style={style.dataTitle}>Data:</p>
        <ListGroup>
          {data &&
            data.map(item => {
              return (
                <ListGroupItem key={item.objectId}>
                  <button
                    style={style.buttonStyle}
                    onClick={() => {
                      this.setState({
                        editMode: true,
                        ...item,
                        postImage: null
                      });
                    }}
                  >
                    <div>
                      <img
                        src={item.postImage && item.postImage.url}
                        style={{ width: 50, height: 50, background: "grey" }}
                      />
                      <p>Title: {item.title}</p>
                    </div>
                    <p>Body: {item.body}</p>
                    <p>
                      Likes: {item.likes || 0}
                      <Button
                        outline
                        size="sm"
                        style={{ marginLeft: 15 }}
                        onClick={() =>
                          put(item.objectId, { likes: item.likes + 1 })
                        }
                      >
                        LIKE
                      </Button>
                    </p>
                  </button>
                </ListGroupItem>
              );
            })}
        </ListGroup>
      </div>
    );
  }
}
