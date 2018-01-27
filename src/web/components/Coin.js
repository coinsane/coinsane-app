import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  CardText,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ErrorMessages from '../../constants/errors';
import Loading from './Loading';
import Error from './Error';

const CoinView = ({
  error,
  loading,
  coins,
  coinId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this Coin from all coins
  let coin = null;
  if (coinId && coins) {
    coin = coins.find(item => parseInt(item.id, 10) === parseInt(coinId, 10));
  }

  // Coin not found
  if (!coin) return <Error content={ErrorMessages.coin404} />;

  // Build Ingredients listing
  const ingredients = coin.ingredients.map(item => (
    <ListGroupItem key={`${item}`}>{item}</ListGroupItem>
  ));

  // Build Method listing
  const method = coin.method.map(item => (
    <ListGroupItem key={`${item}`}>{item}</ListGroupItem>
  ));

  return (
    <div>
      <Row>
        <Col sm="12">
          <h1>{coin.title}</h1>
          <p>by {coin.author}</p>
        </Col>
      </Row>
      <Row>
        <Col lg="4" className="coin-view-card">
          <Card>
            <CardHeader>About this coin</CardHeader>
            <CardBody>
              <CardText>{coin.body}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="coin-view-card">
          <Card>
            <CardHeader>Ingredients</CardHeader>
            <ListGroup className="list-group-flush">
              {ingredients}
            </ListGroup>
          </Card>
        </Col>
        <Col lg="4" className="coin-view-card">
          <Card>
            <CardHeader>Method</CardHeader>
            <ListGroup className="list-group-flush">
              {method}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col sm="12">
          <Link className="btn btn-secondary" to="/coins"><i className="icon-arrow-left" /> Back</Link>
        </Col>
      </Row>
    </div>
  );
};

CoinView.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  coinId: PropTypes.string.isRequired,
  coins: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

CoinView.defaultProps = {
  error: null,
};

export default CoinView;
