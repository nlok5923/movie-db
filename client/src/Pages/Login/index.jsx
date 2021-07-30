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
import { useHistory, Redirect } from "react-router-dom";
import "./Login.scss";
import useAuthStatus from "../../Utils/customHooks/user";
import useToken from "../../Utils/customHooks/token";
import Navbar from "../../Components/Navigation/index";
import Loader from "../../Components/Loader/index";

const LoginForm = () => {
  const labelStyle = { fontSize: "15px" };
  const [errMessage, seterrMessage] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const { setToken } = useToken();
  const { getStatus } = useAuthStatus();
  const history = useHistory();
  const setInfo = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  var [isLoading, setLoading] = useState(true);
  var [auth, setAuth] = useState();

  useEffect(() => {
    const checkStatus = async () => {
      const isAuthenticated = await getStatus();
      setAuth(isAuthenticated);
      setLoading(false);
    };
    checkStatus();
  }, [getStatus]);

  const sendData = async () => {
    const { email, password } = userInfo;
    const userData = {
      password,
      email,
    };
    try {
      const response = await Axios.post(
        "https://aqueous-ridge-34051.herokuapp.com/login",
        userData
      );
      const token = response.data.token;
      const errorMessage = response.data.errorMessage;
      if (errorMessage) {
        seterrMessage(errorMessage);
      } else {
        setToken(token);
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
      {isLoading && <Loader />}
      {!isLoading && auth && <Redirect to="/dashboard" />}
      {!isLoading && !auth && (
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
      )}
    </Container>
  );
};

export default LoginForm;
