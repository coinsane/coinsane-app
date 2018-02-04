import React from 'react';
import { Container, Content, Text } from 'native-base';
import Spacer from './Spacer';
import Header from './Header';

const About = () => (
  <Container>
    <Content padder style={{ backgroundColor: '#232033' }}>
      <Header
        title="Market"
        content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
      />
      <Spacer size={30} />
      <Text>Elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>
    </Content>
  </Container>
);

export default About;
