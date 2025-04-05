import {useNavigation} from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import React from 'react';
import {Image, ImageSourcePropType, Pressable, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {moderateScale, scale, verticalScale, width} from '../../utils/scaling';
import colors from '../../styles/colors';
import fontFamily from '../../constants/fontFamily';
import {lightTheme} from '../../styles/themes';

const stylesheet = createStyleSheet(theme => ({
  headerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    justifyContent: 'space-between',
    backgroundColor: lightTheme.colors.white,
    paddingHorizontal: moderateScale(16),
    width: '100%',
  },
  icStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginTop: moderateScale(0),
    marginLeft: moderateScale(2),
  },
  cneterText: {
    fontSize: scale(16),
    color: lightTheme.colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
  },
  rightText: {
    fontSize: scale(12),
    color: lightTheme.colors.black,
    fontFamily: fontFamily.medium,
    width: '65%',
  },
  btnCatagoryStyle: {
    width: '35%',
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
    borderRadius: 12,
    justifyContent: 'center',
    backgroundColor: lightTheme.colors.white,
    alignItems: 'center',
    shadowColor: lightTheme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 0.2,
  },
}));

type SectionProps = PropsWithChildren<{
  style?: object;
  centerText?: string;
  categoryText?: string;
  rightImage?: ImageSourcePropType;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}>;

const HeaderComp = ({
  style,
  centerText,
  categoryText,
  rightImage,
  onPressRight,
}: SectionProps): React.JSX.Element => {
  const navigation = useNavigation();

  const {styles, theme} = useStyles(stylesheet);

  return (
    <View style={{...styles.headerStyle, ...style}}>
      <View style={{width: '25%'}} />
      <Text style={styles.cneterText}>{centerText}</Text>
      <Pressable style={styles.btnCatagoryStyle} onPress={onPressRight}>
        <Text numberOfLines={1} style={styles.rightText}>
          {categoryText}
        </Text>
        <Image style={styles.icStyle} source={rightImage} />
      </Pressable>
    </View>
  );
};

export default React.memo(HeaderComp);
