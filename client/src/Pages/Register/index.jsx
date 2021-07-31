import { useState, useEffect } from "react";
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
import { useHistory, Redirect } from "react-router-dom";
import "./Register.scss";
import Navbar from "../../Components/Navigation/index";
import "semantic-ui-css/semantic.min.css";
import * as formElements from "../../Contents/Registration.json";

const SignupForm = () => {
  const labelStyle = { fontSize: "15px" };

  const renderFormElements = () => {
    return formElements.formElement.map((ele, index) => (
      <Form.Field>
        <label style={labelStyle} className="label">
          {ele.name}
        </label>
        <input
          type={ele.type}
          name={ele.name}
          onChange={(e) => setInfo(e)}
          placeholder={ele.placeholder}
        />
      </Form.Field>
    ));
  };

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
      const data = await Axios.post("http://localhost:5000/register", userData);
      const errorMessage = data.data.errorMessage;
      if (errorMessage) {
        seterrMessage(errorMessage);
      } else {
        history.push("/login");
      }
    } catch (err) {
      seterrMessage(err);
    }
  };

  return (
    <Container>
      <div>
        <Navbar />
        <Segment>
          <Header as="h2" icon textAlign="center">
            <Icon name="address book outline" circular />
            <Header.Content>Hello User!! 👋</Header.Content>
          </Header>
          <Form error={!!errMessage}>
            {renderFormElements()}
            <Button primary type="submit" onClick={() => sendData()}>
              Register
            </Button>
            <Message error header="Oops!!" content={errMessage} />
          </Form>
        </Segment>
      </div>
    </Container>
  );
};

export default SignupForm;
