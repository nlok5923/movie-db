import { useState } from "react";
import "./HamburgerMenu.scss";
import { useHistory } from "react-router";
import { Grid, Icon, Menu, Segment, Sidebar, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import Axios from 'axios'

const BurgerMenu = (props) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const logoutUser = () => {
      const endpoint = "http://localhost:5000/logout";
      Axios.post(endpoint); 
      history.push("/")
  };

  return (
    <div className="container">
      <Grid columns={1}>
        <Grid.Column>
          <Button icon primary onClick={() => setVisible(true)}>
            <Icon name="tasks" />
          </Button>
        </Grid.Column>

        <Grid.Column>
          <Sidebar.Pushable as={Segment}>
            <Sidebar
              as={Menu}
              animation="overlay"
              icon="labeled"
              inverted
              onHide={() => setVisible(false)}
              vertical
              visible={visible}
              width="thin"
            >
              <NavLink exact activeClassName="current" to={`/dashboard`}>
                <Menu.Item as="a">
                  <Icon name="dashboard" />
                  Dashboard
                </Menu.Item>
              </NavLink>

              <NavLink
                exact
                activeClassName="current"
                to={`/dashboard/favourite`}
              >
                <Menu.Item as="a">
                  <Icon name="like" />
                  Favourite
                </Menu.Item>
              </NavLink>

              <Menu.Item as="a" 
              onClick={() => logoutUser()}
              >
                <Icon name="power" />
                Logout
              </Menu.Item>
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic style={{ overflow: "auto", height: "88vh" }}>
                {props.children}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default BurgerMenu;
