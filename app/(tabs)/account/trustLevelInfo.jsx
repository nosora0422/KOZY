import { router, usePathname, Stack } from "expo-router";
import { Platform, StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from "react-native-gesture-handler";

import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import { colors } from '@/constants/colors';



export default function TrustLevelInfo() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  return (
    <ScrollView 
      ontentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      style={[styles.container, { paddingTop: insets.top }]}
    >
        <View style={styles.content}>
          <View>
            <AppText variant="headline-md" color="primary">
              Build Trust. Unlock More.
            </AppText>
            <AppText variant="body-sm" color="primary">
              Your trust level helps others feel safe and confident when connecting with you. 
              It reflects how complete and active your profile is. 
              Higher trust brings more visibility and better matches.
            </AppText>
          </View>
          <View style={{width: 300, height: 300, backgroundColor:'#f4f4f4'}}></View>
          <View>
            <AppText 
              variant="headline-md" 
              color="primary"
              style={{ marginBottom: 30 }}
            >
                ✅ Trust Level Guide
            </AppText>
            <AppText 
              variant="body-sm" 
              color="primary" 
              style={{ marginBottom: 16 }}
            >
                🔒 Level 1: Unverified
            </AppText>
            <AppText variant="body-sm" color="primary">
                You haven't signed up yet, or haven’t completed your basic profile.
              </AppText>
            <View style={{ paddingVertical: 16 }}>
              <AppText variant="body-sm" color="primary">
                  • You’re browsing as a guest
              </AppText>
              <AppText variant="body-sm" color="primary">
                  • You can't contact others or upload listings
              </AppText>  
              <AppText variant="body-sm" color="primary">
                  • Your activity is not visible to other users
              </AppText>            
            </View>
            <AppText variant="body-sm" color="primary">
                To get started:
            </AppText>
            <AppText variant="body-sm" color="primary">
                ✅ Sign up
            </AppText>
            <AppText variant="body-sm" color="primary">
                ✅ Verify your email and provide basic information
            </AppText>
          </View>
          <View>
            <AppText 
              variant="body-sm" 
              color="primary" 
              style={{ marginBottom: 16 }}
            >
                🥈 Level 2: Verified
            </AppText>
            <AppText variant="body-sm" color="primary">
                You’ve completed your profile and verified your identity. Other users can trust and connect with you.
              </AppText>
            <View style={{ paddingVertical: 16 }}>
              <AppText variant="body-sm" color="primary">
                  • Normal visibility in search results
              </AppText>
              <AppText variant="body-sm" color="primary">
                  • Can send and receive chat requests
              </AppText>  
              <AppText variant="body-sm" color="primary">
                  • Can upload and manage listings
              </AppText>            
            </View>
            <AppText variant="body-sm" color="primary">
                How to stay verified:
            </AppText>
            <AppText variant="body-sm" color="primary">
                👍 Keep your profile photo updated
            </AppText>
            <AppText variant="body-sm" color="primary">
                👍 Make sure your lifestyle and preferences reflect your current situation
            </AppText>
            <AppText variant="body-sm" color="primary">
               👍 Stay respectful in chats
            </AppText>
          </View>
          
          <AppButton 
            text='Return to My Page'
            type='secondary'
            onPress={() => {
              router.push('/(tabs)/account');
            }} 
          />
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container :{
    backgroundColor: colors.base.background,
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 56,
    flexDirection: 'column',
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
});