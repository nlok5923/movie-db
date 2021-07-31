import { React, useState, useEffect } from "react";
import {
  Button,
  Form,
  Container,
  Message,
  Header,
  Segment,
  Icon,
} from "semantic-ui-react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import "./Login.scss";
import Navbar from "../../Components/Navigation/index";

const LoginForm = () => {
  const labelStyle = { fontSize: "15px" };
  const [errMessage, seterrMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();
  const setInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async () => {
    const { email, password } = userInfo;
    const userData = {
      password,
      email,
    };
    try {
      const response = await Axios.post(
        "http://localhost:5000/login",
        userData
      );
      const errorMessage = response.data.errorMessage;
      if (errorMessage) {
        seterrMessage(errorMessage);
      } else {
        history.push("/dashboard");
      }
    } catch (err) {
      seterrMessage(err);
    }
  };

  const formElements = [
    { name: "email", placeholder: "Enter your email" },
    { name: "password", placeholder: "Enter password" },
  ];
  const renderFormElement = (name, placeholder) => (
    <Form.Field>
      <label className="label" style={labelStyle}>
        {name}
      </label>
      <input
        type={name}
        name={name}
        onChange={(e) => setInfo(e)}
        placeholder={placeholder}
      />
    </Form.Field>
  );

  return (
    <Container>
      <div>
        <Navbar />
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="hand peace" circular />
            <Header.Content>Welcome Back!! 👏</Header.Content>
          </Header>
          <Form error={!!errMessage}>
            {formElements.map((element, index) =>
              renderFormElement(element.name, element.placeholder)
            )}
            <Button type="submit" primary onClick={() => sendData()}>
              Login
            </Button>
            <Message error header="Oops!!" content={errMessage} />
          </Form>
        </Segment>
      </div>
    </Container>
  );
};

export default LoginForm;
