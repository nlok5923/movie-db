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
import './Register.scss'
import useToken from "../../Utils/customHooks/token";
import useAuthStatus from "../../Utils/customHooks/user";
import Navbar from "../../Components/Navigation/index";
import Loader from "../../Components/Loader/index";
import "semantic-ui-css/semantic.min.css";
import * as formElements from "../../Contents/Registration.json"

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
    name: "",
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
    const { email, password, name } = userInfo;
    const userData = {
      password,
      email,
      name,
    };
    try {
      const data = await Axios.post(
        "https://aqueous-ridge-34051.herokuapp.com/register",
        userData
      );
      const token = data.data.token;
      const errorMessage = data.data.errorMessage;
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

  return (
    <Container>
      {isLoading && <Loader />}
      {!isLoading && auth && <Redirect to="/dashboard" />}
      {!isLoading && !auth && (
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
      )}
    </Container>
  );
};

export default SignupForm;
