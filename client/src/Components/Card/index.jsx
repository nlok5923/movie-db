import React from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import "./Card.scss";
import Axios from "axios";
import { Toaster } from 'react-hot-toast';

const CardComponent = (props) => {
  const addToFavourites = async (id) => {
    if(props.favourite.includes(id)) {
      props.notifyUser(false);
    } else {
      props.favourite.push(id);
      props.notifyUser(true);
      const endpoint = "http://localhost:5000/dashboard/favourite";
      await Axios.post(endpoint, { id: id });
    }
  };

  const deleteFromFavourite = async (id) => {
    console.log(id);
    const endpoint = "http://localhost:5000/dashboard/delete-favourite/" + id;
    Axios.delete(endpoint, { id: id }).then(() => props.fetchFavourite);
    window.location.reload();
  };

  return (
    <Card>
      {/* <Toaster /> */}
      <Image src={props.data.Poster} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.data.Title}</Card.Header>
        <Card.Meta>
          <span className="date">Release year {props.data.Year} </span>
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        {!props.isFavourite ? (
          <Button
            icon="like"
            onClick={() => addToFavourites(props.data.imdbID)}
            floated="right"
          />
        ) : (
          <Button
            icon="delete"
            onClick={() => deleteFromFavourite(props.data.imdbID)}
            floated="right"
          />
        )}
      </Card.Content>
    </Card>
  );
};

export default CardComponent;
