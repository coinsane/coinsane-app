import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Body, Text, Right } from 'native-base';
import CoinsaneIcon from 'src/components/_Atoms/CoinsaneIcon/CoinsaneIcon.component';
import { colors } from 'src/styles/index';
import styles from './CoinsaneListItem.styles';
import withPreventDoubleClick from 'src/hocs';

const ListItemEx = withPreventDoubleClick(ListItem);

const CoinsaneListItem = ({
  label,
  title,
  onPress,
  rightIcon,
}) => (
  <ListItemEx style={styles.container} onPress={onPress}>
    <Body>
      { label && <Text style={styles.label}>{label}</Text> }
      <Text style={styles.title}>{title}</Text>
    </Body>
    {
      rightIcon &&
      <Right style={styles.rightIconContainer}>
        <CoinsaneIcon name="ChevronRight" width={16} fill={colors.textGray} />
      </Right>
    }
  </ListItemEx>
);

CoinsaneListItem.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  onPress: PropTypes.func,
  rightIcon: PropTypes.bool,
};

CoinsaneListItem.defaultProps = {
  label: null,
  onPress: () => {},
  rightIcon: true,
};

export default CoinsaneListItem;
