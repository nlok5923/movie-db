import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './Card.scss'

const CardComponent = (props) => (
  <Card>
    <Image src={props.data.Poster} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.data.Title}</Card.Header>
      <Card.Meta>
        <span className='date'>Release year {props.data.Year}</span>
      </Card.Meta>
    </Card.Content>
    <Card.Content extra>
    </Card.Content>
  </Card>
)

export default CardComponent;
