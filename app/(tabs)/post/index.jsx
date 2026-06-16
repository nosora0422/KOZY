import { router, usePathname, useFocusEffect, useNavigation } from "expo-router";
import { useCallback } from 'react';
import { Platform, StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppText from '@/components/ui/appText';
import EmptyListingsState from '@/components/ui/emptyListingsState';


export default function PostScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isLogedIn = true; // Replace with actual authentication logic

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: {
          position: 'absolute',
          alignSelf: 'center',
          bottom: insets.bottom + 10,
          overflow: 'hidden',
          borderRadius: 16,
          borderTopWidth: 0,
          height: 56,
          maxWidth: 400,
          width: '100%',
          paddingTop: 7,
          marginHorizontal: 16,
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          elevation: 10,
        },
      });
    }, [navigation])
  );
  

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppText variant="headline-sm" color="primary">Add New Listing</AppText>
         <View style={{ flex: 1, paddingBottom: Math.max(insets.bottom, 16) + 84 }}>
           <EmptyListingsState
            heading="Let’s List Your Space"
            description="Just a few quick steps to share your room with the right people."
            actionText={isLogedIn ? "Share a room" : "Sign up / Log in"}
            onAction={() => {
              if (isLogedIn) {
                router.push('/(tabs)/post/stepOne');
              } else {
                router.push('/(auth)/login');
              }
            }}
            imageSource = {require('@/assets/images/3d-house.png')}
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
    gap: 56,
    flexDirection: 'column',
  },
});