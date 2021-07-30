import { useState, useEffect } from "react";
import "./Dashboard.scss";
import { Container, Header, Grid, Input, Dropdown } from "semantic-ui-react";
import Navbar from "../../Components/Navigation/index";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-hot-toast";
import SearchBar from "../../Components/Search";
// import Table from "../../Components/Table/index";
import { Redirect } from "react-router-dom";
// import useAuthStatus from "../../Utils/customHooks/user";
// import Loader from "../../Components/Loader/index";
import Axios from "axios";
import MovieCard from "../../Components/Card/index";
// import useToken from "../../Utils/customHooks/token";
// import { filterExpenses, totalExpenseAmount } from "../../Utils/utils";
// import { heading } from "../../Extras/item"

const filterCategory = [
  { key: 1, value: "1951", text: "1951" },
  { key: 2, value: "1952", text: "1952" },
  { key: 3, value: "1953", text: "1953" },
  { key: 4, value: "1954", text: "1954" },
  { key: 5, value: "1956", text: "1956" },
];

const Dashboard = () => {
  const [allTransactions, setAllTransations] = useState([]);
  const [searchTitle, setSearchTitle] = useState("avenger");
  const [loader, setLoader] = useState("flex");
  const [category, setCategory] = useState("");
  // const { getStatus } = useAuthStatus();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const [search, setSearch] = useState("avengers");
  const [movies, setMovies] = useState([]);
  // const filterCategory = [];
  const apiPrefx = "http://www.omdbapi.com/?apikey=a342fd49";

  const fetchMovies = (searchtitle) => {
    const endpoint = apiPrefx + "&s=" + searchtitle;
    Axios.get(endpoint).then(({ data }) => {
      console.log(data.Search);
      setMovies(data.Search);
      setLoader(data.Search && !data.Search.length ? "none" : "flex");
      setSearchTitle(searchtitle);
    });
  };
  useEffect(() => {
    fetchMovies("avenger");
  }, []);

  const handleCategorySelection = (e, data) => {
    setCategory(data.value);
  };

  // const { getToken } = useToken();

  // useEffect(() => {
  //   // const token = getToken();
  //   try {
  //     Axios.get("https://aqueous-ridge-34051.herokuapp.com/dashboard/all-expenses", {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }).then((response) => {
  //       setAllTransations(response.data);
  //       getStatus().then((status) => {
  //         setAuth(status);
  //         setLoading(false);
  //       });
  //       setLoading(false);
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }, []);

  return (
    <div className="container">
      <Navbar />
      <Container>
        {/* {isLoading && <Loader />}
      {!isLoading && !auth && <Redirect to="/login" />}
      {!isLoading && auth && ( */}
        <div>
          <Header as="h3">All moves are listed here 🤓 </Header>
          <SearchBar fetchQueriedMovies={fetchMovies} />
          <Dropdown
            floated="right"
            clearable
            options={filterCategory}
            name="category"
            selection
            onChange={(e, data) => handleCategorySelection(e, data)}
          />
          <Grid stackable columns={4}>
            {movies &&
              movies
                .filter((data) => (!!category ? data.year === category : true))
                .map((data) => {
                  return (
                    <Grid.Column>
                      <Container fluid textAlign="center">
                        <MovieCard data={data} />
                      </Container>
                    </Grid.Column>
                  );
                })}
          </Grid>
        </div>
      </Container>
    </div>
  );
};
export default Dashboard;
