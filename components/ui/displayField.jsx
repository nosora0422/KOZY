import { View, StyleSheet } from 'react-native';
import AppText from './appText';
import Pill from './pill/displayPill';


export default function DisplayField({
  title,
  children,
  type = 'text', // 'text' or 'pill'
  ...props
}) {
  const values = Array.isArray(children) ? children : [children];

  return (
    <View {...props}>
      <AppText
        variant="body-sm-strong"
        color="primary"
        style={{ marginBottom: 8 }}
      >
        {title}
      </AppText>

      {type === 'pill' ? (
        <View style={styles.pillContainer}>
          {values.map((item, index) => (
            <Pill key={index} label={item} />
          ))}
        </View>
      ) : (
        <AppText variant="body-xsm" color="primary">
          {children}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});