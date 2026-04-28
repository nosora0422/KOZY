import { Platform, StyleSheet, View, FlatList, Alert } from 'react-native';
import { router} from 'expo-router';
import { useState } from 'react';

import SwipeToDeleteRow from '@/components/ui/layout/swipeRow';
import AppButton from '@/components/ui/appButton';
import { DATA } from '@/data/mockListData';
import { colors } from '@/constants/colors';
import AppText from '@/components/ui/appText';

export default function MyListings() {
  const [listings, setListings] = useState(null);

  const handleDeleteListing = (id) => {
    Alert.alert(
      'Delete Listing',
      'Are you sure you want to delete this listing?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setListings((prev) => prev.filter((item) => item.id !== id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (!listings || listings.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.noItemContainer}>
            <View style={{ width: 300, height: 150, backgroundColor: 'gray'}}></View>
            <View>
              <AppText 
                  variant="headline-md"
                  color="primary"
              >Have a room to share?</AppText>
              <AppText 
                  variant="body-sm"
                  color="primary"
              >List it and connect with verified seekers.</AppText>
            </View>
            <AppButton 
                text="Share a room"
                onPress={() => router.push("(tabs)/post")} 
            />
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={listings}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
      style={styles.flatList}
      scrollEnabled={true}
      renderItem={({ item }) => (
        <SwipeToDeleteRow
          item={item}
          onDelete={handleDeleteListing}
        />
      )}
    />
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  flatList: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  noItemContainer:{
    width: '100%',
    alignItems: "center", 
    justifyContent: "center",
    gap: 64,
  }
});
