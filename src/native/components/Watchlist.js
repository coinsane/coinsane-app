import React from 'react';
import { Container, Content, Text, H1, H2, H3, Button } from 'native-base';
import Spacer from './Spacer';
import Lead from './Lead';

const About = () => (
  <Container>
    <Content padder style={{ backgroundColor: '#1B152D' }}>
      <Lead
        title="Watchist"
        content="This is here to show how you can read and display data from a data source (in our case, Firebase)."
      />
      <Spacer size={30} />
      <Text>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </Text>
    </Content>
  </Container>
);

export default About;
