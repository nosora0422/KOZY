import { Platform, StyleSheet, View, FlatList, Alert } from 'react-native';
import { router} from 'expo-router';
import { useState } from 'react';

import SwipeToDeleteRow from '@/components/ui/layout/swipeRow';
import AppButton from '@/components/ui/appButton';
import { DATA } from '@/data/mockListData';

export default function MyListings() {
  const [listings, setListings] = useState(DATA);

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
            <AppButton 
                text="Upload a Room Listing"
                onPress={() => router.push("(tabs)/post")} />
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
  flatList: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'ios' ? 0 : 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  noItemContainer:{
    flex:1, 
    alignItems: "center", 
    justifyContent: "center"
  }
});
