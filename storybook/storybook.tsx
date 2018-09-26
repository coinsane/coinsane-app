import {
  addDecorator,
  configure,
  getStorybookUI,
} from '@storybook/react-native';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import { loadStories } from './storyLoader';

import CenterView from './stories/CenterView';

addDecorator(story => (
  <CenterView>
    {story()}
  </CenterView>
));

configure(() => loadStories(), module);

const StorybookUIRoot = getStorybookUI({ port: 7007, onDeviceUI: true });

class StorybookUIHMRRoot extends Component {
  render () {
    return <StorybookUIRoot />;
  }
}

AppRegistry.registerComponent('coinsane', () => StorybookUIHMRRoot);
export default StorybookUIHMRRoot;
