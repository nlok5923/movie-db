import { useState, useEffect } from "react";
import "./Dashboard.scss";
import { Container, Header, Grid, Dropdown } from "semantic-ui-react";
import { sendCategory } from "../../Extras/item";
import Loader from "../../Components/Loader/index";
import SearchBar from "../../Components/Search";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import MovieCard from "../../Components/Card/index";
import HamburgerMenu from "../../Components/HamburgerMenu/index";
import toast, { Toaster } from "react-hot-toast";
import dotenv from "dotenv";
dotenv.config();

const Dashboard = () => {
  const [searchTitle, setSearchTitle] = useState("avenger");
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const apiPrefx =
    "http://www.omdbapi.com/?apikey=" + process.env.REACT_APP_API_KEY;
  const [favourite, setFavouite] = useState([]);
  const [auth, setAuth] = useState(true);

  const fetchFavourite = () => {
    const endpoint = "https://quiet-garden-23258.herokuapp.com/dashboard/all-favourite";
    Axios.get(endpoint).then((data) => {
      setFavouite(data.data);
    });
  };

  const fetchMovies = (searchtitle) => {
    setTimeout(() => {
      const endpoint = apiPrefx + "&s=" + searchtitle;
      Axios.get(endpoint).then(({ data }) => {
        console.log(data.Search);
        setMovies(data.Search);
        setLoading(false);
        setSearchTitle(searchtitle);
      });
    }, 2000);
  };

  const checkAuth = () => {
    const endpoint = "https://quiet-garden-23258.herokuapp.com/check-auth";
    Axios.get(endpoint).then((status) => {
      console.log(status);
      setAuth(status.data);
    });
  };

  useEffect(() => {
    checkAuth();
    fetchMovies("avenger");
    fetchFavourite();
  }, []);

  const handleCategorySelection = (e, data) => {
    setCategory(data.value);
  };

  const setLoaderState = (state) => {
    setLoading(state);
  };

  const notifyUser = (state) => {
    if (state) {
      toast("Added in favourite");
    } else {
      toast("Already added in favourite");
    }
  };
  return (
    <div className="container">
      {!auth && <Redirect to="/" />}
      {auth && (
        <div>
          <HamburgerMenu>
            <Toaster />
            <Header as="h3">All movies are listed here !!</Header>
            <SearchBar
              fetchQueriedMovies={fetchMovies}
              setLoaderState={setLoaderState}
            />
            <label> Filter your search </label> <br />
            <Dropdown
              floated="right"
              clearable
              options={sendCategory()}
              name="category"
              selection
              onChange={(e, data) => handleCategorySelection(e, data)}
            />
            {isLoading ? (
              <Loader />
            ) : (
              <Grid stackable columns={4}>
                {movies &&
                  movies
                    .filter((data) =>
                      !!category ? data.Year === category : true
                    )
                    .map((data) => {
                      return (
                        <Grid.Column>
                          <Container fluid textAlign="center">
                            <MovieCard
                              data={data}
                              notifyUser={notifyUser}
                              favourite={favourite}
                            />
                          </Container>
                        </Grid.Column>
                      );
                    })}
              </Grid>
            )}
          </HamburgerMenu>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
