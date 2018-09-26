import Colors from 'src/components/NativeBase/variables/commonColor';

export default {
  navbarProps: {
    backButtonTintColor: Colors.textColor,
    navigationBarStyle: { backgroundColor: '#1B152D' },
    titleStyle: {
      alignSelf: 'center',
      color: Colors.textColor,
      fontSize: Colors.fontSizeBase,
      letterSpacing: 2,
    },
  },

  tabProps: {
    activeBackgroundColor: 'rgba(255,255,255,0.1)',
    inactiveBackgroundColor: Colors.brandPrimary,
    swipeEnabled: false,
    tabBarStyle: { backgroundColor: Colors.brandPrimary },
  },

  icons: {
    style: { color: 'white' },
  },
};
