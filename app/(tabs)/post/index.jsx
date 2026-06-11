import { router, usePathname, useFocusEffect, useNavigation } from "expo-router";
import { Platform, StyleSheet, View} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppText from '@/components/ui/appText';
import EmptyListingsState from '@/components/ui/emptyListingsState';


export default function PostScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isLogedIn = true;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppText variant="headline-sm" color="primary">Add New Listing</AppText>
         <View style={{ flex: 1, paddingBottom: Math.max(insets.bottom, 16) + 84 }}>
           <EmptyListingsState
            heading="Have a room to share?"
            description="List it and connect with verified seekers."
            actionText="Share a room"
            onAction={() => router.push('/(tabs)/post/stepOne')}
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