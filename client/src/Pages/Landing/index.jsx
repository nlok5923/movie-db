import "./Landing.scss";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import Navbar from "../../Components/Navigation/index";

const Landing = () => {

  return (
    <div>
        <div>
          <Navbar />
          <div className="frontpage">
            <div className="frontpage__tagline">
              <div className="frontpage__tagline__text">
                <Link to="/register">
                  <Button
                    size="huge"
                    color="green"
                    icon="rocket"
                    content="Get Stared"
                  />
                </Link>
              </div>
            </div>
            <div className="frontpage__img">
              <img
                className="frontPageImg"
                src={"images/movie.jpg"}
                alt="landing page"
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Landing;
