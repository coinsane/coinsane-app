import variable from './../variables/platform';

export default (variables = variable) => {
  const { platformStyle } = variables;

  return {
    elevation: 0,
    height: 50,
    flexDirection: 'row',
    shadowColor: platformStyle === 'material' ? '#000' : undefined,
    shadowOffset: platformStyle === 'material'
      ? { width: 0, height: 2 }
      : undefined,
    shadowOpacity: platformStyle === 'material' ? 0.2 : undefined,
    shadowRadius: platformStyle === 'material' ? 1.2 : undefined,
    justifyContent: 'space-around',
    borderBottomWidth: variables.borderWidth,
    borderColor: variables.topTabBarBorderColor
  };
};
