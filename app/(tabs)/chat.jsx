import { router, usePathname } from "expo-router";
import { StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';


export default function Chat() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppText variant="headline-sm" color="primary">Messages</AppText>
        <View style={styles.content}>

          <AppButton 
            text='Sign Up / Log In to Contact' 
            onPress={() => {
              router.push({
                pathname: "/(auth)/login",
                params: { redirect: pathname },
              });
            }}
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
