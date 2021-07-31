import { useState, useEffect } from "react";
import "./Favourite.scss";
import { Container, Header, Grid } from "semantic-ui-react";
import MovieCard from "../../../Components/Card/index";
import Loader from "../../../Components/Loader/index";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import HamburgerMenu from "../../../Components/HamburgerMenu/index";
import dotenv from "dotenv";
dotenv.config();

const Favourite = () => {
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState("avengers");
  const [movies, setMovies] = useState([]);
  const [auth, setAuth] = useState(true);
  const apiPrefx =
    "http://www.omdbapi.com/?apikey=" + process.env.REACT_APP_API_KEY;

  const fetchFavourite = () => {
    const endpoint = "http://localhost:5000/dashboard/all-favourite";
    let moviesInfo = [];
    Axios.get(endpoint).then((data) => {
      data.data.map((imdbId) => {
        let newendpoint = apiPrefx + "&i=" + imdbId;
        Axios.get(newendpoint).then((movie) => {
          moviesInfo.push(movie.data);
          console.log(moviesInfo);
          setMovies((prev) => [...prev, movie.data]);
        });
      });
      setLoading(false);
    });
  };

  const checkAuth = () => {
    const endpoint = "http://localhost:5000/check-auth";
    Axios.get(endpoint).then((status) => {
      console.log(status);
      setAuth(status.data);
    });
  };

  useEffect(() => {
    checkAuth();
    fetchFavourite();
  }, []);

  return (
    <div className="container">
      {!auth && <Redirect to="/" />}
      {auth && (
        <div>
          <HamburgerMenu>
            <Header as="h3">All your favourite movies are 🤓 </Header>
            {isLoading ? (
              <Loader />
            ) : (
              <Grid stackable columns={4}>
                {movies &&
                  movies.map((data) => {
                    return (
                      <Grid.Column>
                        <Container fluid textAlign="center">
                          <MovieCard
                            data={data}
                            isFavourite={true}
                            fetchFavourite={fetchFavourite}
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
export default Favourite;
