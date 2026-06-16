import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, View, Image} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";

import AppText from '@/components/ui/appText';
import Badge from "@/components/ui/badge";
import { DATA } from "@/data/mockListData";
import EmptyListingsState from "@/components/ui/emptyListingsState";
import TrustLevelInfo from "./trustLevelInfo";


export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const isLogedIn = TrustLevelInfo; // Replace with actual authentication logic
  const currUser = DATA[0].owner; // Replace with actual user data fetching logic
  
  if( !isLogedIn ) {
    return (
      <View style={[styles.container, { paddingTop: insets.top,paddingBottom: Math.max(insets.bottom, 16) + 84 }]}>
        <AppText variant="headline-sm" color="primary">My Page</AppText>
        <EmptyListingsState
          heading="Make it yours"
          description="Sign Up or Log In to save and view listings, and manage your profile."
          actionText="Sign Up / Log In"
          onAction={() => router.push('/(auth)/login')}
      />
      </View>
      )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppText variant="headline-sm" color="primary">My Page</AppText>
        <View style={styles.content}>
          <View style={styles.userInfo}>
            <View style={styles.name}>
              <Image
                source={{ uri: currUser.avatar[0] }}
                style={{ width: 55, height: 55, borderRadius: 999 }}
              />
              <AppText variant="body-md" color="primary">
                {currUser.name}
              </AppText>
            </View>
          </View>
        </View>
        <View style={styles.manuContainer}>
          <Pressable onPress={() => router.push('/(tabs)/account/editProfile')}>
            <View style={styles.manuButton}>
              <Feather name="edit" size={20} color='#fff' />
              <AppText variant="body-md" color="primary">
                Edit
              </AppText>
            </View>
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/account/savedList')}>
            <View style={styles.manuButton}>
              <Feather name="bookmark" size={20} color='#fff' />
              <AppText variant="body-md" color="primary">
                Saved Listings
              </AppText>
            </View>
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/account/myListings')}>
            <View style={styles.manuButton}>
              <Feather name="list" size={20} color='#fff' />
              <AppText variant="body-md" color="primary">
                My Listings
              </AppText>
            </View>
          </Pressable>
        </View>
        <View style={styles.manuContainer}>
          <Pressable onPress={() => router.push('/(tabs)/account/notification')}>
            <View style={styles.manuButton}>
              <Feather name="bell" size={20} color='#fff' />
              <AppText variant="body-md" color="primary">
                Notification
              </AppText>
            </View>
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/account/privacyPolicy')}>
            <View style={styles.manuButton}>
              <Feather name="lock" size={20} color='#fff' />
              <AppText variant="body-md" color="primary">
                Privacy Policy              
              </AppText>
            </View>
          </Pressable>
          <Pressable onPress={() => router.push('/(tabs)/account/contactUs')}>
            <View style={styles.manuButton}>
              <Feather name="mail" size={20} color='#fff' />
              <AppText variant="body-md" color="primary">
                Contact Us
              </AppText>
            </View>
          </Pressable>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    paddingHorizontal: 16,
  },
  imgPlaceHolder:{
    width: 55,
    height: 55,
    backgroundColor: "#f4f4f4",
    borderRadius: 999,
  },
  content: {
    paddingTop: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  name:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
  },
  manuContainer:{
    marginTop: 36,
    backgroundColor: '#535353', 
    paddingVertical: 12,
    borderRadius: 16,
  },
  manuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    paddingVertical: 12
  }
});