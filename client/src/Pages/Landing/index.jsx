import "./Landing.scss";
import { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
// import useAuthStatus from "../../Utils/customHooks/user";
import Navbar from "../../Components/Navigation/index";
// import Loader from "../../Components/Loader/index";

const Landing = () => {
  // const { getStatus } = useAuthStatus();
  // var [isLoading, setLoading] = useState(true);
  // var [auth, setAuth] = useState();

  // useEffect(() => {
  //   const checkStatus = async () => {
  //     // const isAuthenticated = await getStatus();
  //     // setAuth(isAuthenticated);
  //     setLoading(false);
  //   };
  //   checkStatus();
  // }, [getStatus]);
  return (
    <div>
      {/* {isLoading && <Loader />}
      {!isLoading && auth && <Redirect to="/dashboard" />}
      {!isLoading && !auth && ( */}
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
      {/* )} */}
    </div>
  );
};

export default Landing;
