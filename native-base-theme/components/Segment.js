import variable from "./../variables/platform";
import { colors } from '../../src/styles';

export default (variables = variable) => {
	const platform = variables.platform;

	const segmentTheme = {
		height: 45,
		flexDirection: "row",
		justifyContent: "center",
		"NativeBase.Button": {
			alignSelf: "center",
			paddingHorizontal: 20,
			height: 36,
			backgroundColor: "transparent",
			elevation: 0,
			justifyContent: 'center',
			".active": {
				backgroundColor: colors.inputBg,
				"NativeBase.Text": {
					color: colors.white,
				},
			},
			".first": {
				borderTopLeftRadius: platform === "ios" ? 18 : undefined,
				borderBottomLeftRadius: platform === "ios" ? 18 : undefined,
				borderTopRightRadius: platform === "ios" ? 18 : undefined,
				borderBottomRightRadius: platform === "ios" ? 18 : undefined,
			},
			".last": {
				borderTopLeftRadius: platform === "ios" ? 18 : undefined,
				borderBottomLeftRadius: platform === "ios" ? 18 : undefined,
				borderTopRightRadius: platform === "ios" ? 18 : undefined,
				borderBottomRightRadius: platform === "ios" ? 18 : undefined,
			},
			"NativeBase.Text": {
				color: colors.textGray,
				fontSize: 14
			},
		},
	};

	return segmentTheme;
};
