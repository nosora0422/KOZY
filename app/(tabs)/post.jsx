import { router, usePathname } from "expo-router";
import { Platform, StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';


export default function Post() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppText variant="headline-sm" color="primary">Add New Listing</AppText>
        <View style={styles.content}>
            <View style={{ marginBottom: 16 }}>
              <AppText 
                variant="headline-md" 
                color="primary" 
                style={{ textAlign: 'center', maxwidth: 300 }}>
                  Let's List your Space
              </AppText>
              <AppText 
                variant="body-sm" 
                color="primary" 
                style={{ textAlign: 'center', marginTop: 16, maxWidth: 300 }}>
                  Just a few quick steps to share your room with the right people. You’re in control — from details to visibility.
              </AppText>
            </View>
            <View style={{ width: 230, height: 130, backgroundColor: '#f0f0f0' }} />
            <View>
              <AppText variant="body-sm" color="primary">
                  • Add room details
              </AppText>
              <AppText variant="body-sm" color="primary">
                  • Upload clear photos and a video
              </AppText>  
              <AppText variant="body-sm" color="primary">
                  • Get matched with compatible seekers
              </AppText>            
            </View>
          <AppButton 
            text='Sign Up / Log In'
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
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 56,
    flexDirection: 'column',
  },
});