import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Text, View, Title } from 'native-base';
import Markdown from 'react-native-simple-markdown';
import CoinsaneHeader from '../_Organisms/CoinsaneHeader/CoinsaneHeader.organism';

import { base, fonts } from '../../styles';

const markdownStyles = {
  heading: {
    fontFamily: fonts.fontBold,
  },
  heading1: {
    fontSize: 16,
    lineHeight: 18,
    fontFamily: fonts.fontBold,
    paddingTop: 20,
    paddingBottom: 10,
  },
  heading2: {
    fontSize: 15,
    lineHeight: 17,
    fontFamily: fonts.fontBold,
    paddingTop: 20,
    paddingBottom: 10,
  },
  // link: {
  //   color: 'pink',
  // },
  // mailTo: {
  //   color: 'orange',
  // },
  text: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 15,
    paddingBottom: 2,
  },
};

const addLineBreak = content => content.replace(/\\/g, m => m + m);

const Page = ({ title, content }) => (
  <Container>
    <CoinsaneHeader
      leftIcon="Close"
      title={<Title style={base.title}>{title}</Title>}
    />
    <Content padder style={base.contentContainer}>
      <Markdown styles={markdownStyles}>{content}</Markdown>
    </Content>
  </Container>
);

Page.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Page;
