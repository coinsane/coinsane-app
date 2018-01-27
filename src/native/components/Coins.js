import React from 'react';
import PropTypes from 'prop-types';
import { ListView, SectionList, TouchableOpacity, RefreshControl, Image, StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button, Left, Right, List, ListItem } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import Colors from '../../../native-base-theme/variables/commonColor';

const CoinListing = ({
  error,
  loading,
  portfolios,
  list,
  createPortfolio,
  addCoin,
  removePortfolio,
  removeCoin,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item._id;

  const showCoin = item => Actions.coin({ match: { params: { id: String(item.id) } } });

  console.log('list', list)

  return (
    <Container>
      <Content padder>
        <Header
          title="Top Coins"
          content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
        />
        <Button block onPress={() => createPortfolio()}>
          <Text>Create Portfolio</Text>
        </Button>
        <Spacer size={10} />
        {/* <ListView
          dataSource={list}
          renderSectionHeader={(section) => {
            // console.log('sectionRows', sectionRows, section)
            return (
              <Body>
                <Text style={styles.header} button onPress={() => removePortfolio(section._id)}>
                  {section._id} ({section.data.length})
                </Text>
                <Button block light onPress={() => addCoin(section._id)}>
                  <Text>Add Coin</Text>
                </Button>
              </Body>
            );
          }}
          renderRow={(sectionRow, sectionId) => {
            if (!Array.isArray(sectionRow)) return null;
            return sectionRow.map(item => (
              <Card transparent style={{ paddingHorizontal: 6 }} key={item._id}>
                <CardItem cardBody bordered button onPress={() => onPress(item)}>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text>{item.price_btc}</Text>
                    <Text>{item.percent_change_24h}%</Text>
                    <Spacer size={10} />
                  </Body>
                </CardItem>
              </Card>
            ));
          }}
        /> */}
        {portfolios.length ? (
          <SectionList
            sections={portfolios}
            renderItem={({ item }) => (
              <List>
                <ListItem button onPress={() => showCoin(item)}>
                  <Left>
                    <Text button onPress={() => removeCoin(item._id)}>{item.name}</Text>
                  </Left>
                  <Body>
                    <Text>{item.price_btc}</Text>
                    <Text>{item.percent_change_24h}%</Text>
                  </Body>
                </ListItem>
              </List>
            )}
            renderSectionHeader={({ section }) => (
              <List transparent>
                <ListItem itemHeader style={styles.header}>
                  <Body>
                    <Text button onPress={() => removePortfolio(section._id)}>
                      {section.title}
                    </Text>
                  </Body>
                  <Right>
                    <Button block light onPress={() => addCoin(section._id)}>
                      <Text>Add Coin</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
            )}
            keyExtractor={keyExtractor}
            refreshing={loading}
            onRefresh={reFetch}
          />
        ) : (
          <Text>List is empty</Text>
        )}
        <Spacer size={20} />
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 10,
    backgroundColor: Colors.brandLight,
  },
})

CoinListing.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  portfolios: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  list: PropTypes.shape().isRequired,
  createPortfolio: PropTypes.func,
  removePortfolio: PropTypes.func,
  removeCoin: PropTypes.func,
  addCoin: PropTypes.func,
  reFetch: PropTypes.func,
};

CoinListing.defaultProps = {
  error: null,
  reFetch: null,
};

export default CoinListing;
