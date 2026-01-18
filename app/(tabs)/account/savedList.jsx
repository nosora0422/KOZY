import { Platform, StyleSheet, View, FlatList, Pressable, Alert } from 'react-native';
import { Image } from 'expo-image';

import { DATA } from '@/data/mockListData';
import { colors } from '@/constants/colors';
import AppButton from '@/components/ui/appButton';
import AppText from '@/components/ui/appText';
import { router } from 'expo-router';
import { useState } from 'react';
import RadioButton from '@/components/ui/input/radioButton';

export default function SavedList() {
  const listings = DATA;
  const [isEditMode, setIsEditMode] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const toogleEdit = () => {setIsEditMode(prev => !prev)};
  const toggleSelectItem = (id) => {
    setSelectedItems(prev => {
        if (prev.includes(id)) {
            return prev.filter(itemId => itemId !== id);
        } else {
            return [...prev, id];
        }
    });
    };



  if (!listings || listings.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.noItemContainer}>
            <AppText variant="body-md" color="primary">
                No Saved Listings Yet
            </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        {/* Bottons */}
        <View style={styles.buttonContainer}>
            {!isEditMode && (
                <AppButton 
                    text="Edit Listings" 
                    size="sm" 
                    type="secondary" 
                    onPress={toogleEdit}
                    style={{ width: 104 }}
                />
            )}
            {isEditMode && (
                <>
                    <AppButton 
                        text="Cancel" 
                        size="sm" 
                        type="secondary"
                        style={{ width: 74 }}
                        onPress={() => {
                            toogleEdit();
                            setSelectedItems([]);
                            }}
                    />
                    <AppButton 
                        text="Delete" 
                        size="sm" 
                        type="secondary" 
                        style={{ width: 74 }}
                        onPress={() => {
                            Alert.alert(
                                'Delete Item',
                                'Are you sure you want to delete this listing?',
                                [{
                                    text: 'Close',
                                    style: 'cancel',
                                },
                                {
                                    text: 'Delete',
                                    style: 'destructive',
                                    onPress: () => {
                                        toogleEdit();
                                        //Delete API
                                    },
                                },]
                            );  
                        }}
                    />
                
                </>
            )}
        </View>
      {/* Saved List */}
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable 
            style={styles.card}
            onPress={() => {
                if (isEditMode) return;
                router.push({
                    pathname: '/home/[id]',
                    params: {
                        id: item.id,
                        from: 'account/savedList',
                    },
                    });}}
        >
            {/* Owner */}
            <View>
                <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                    contentFit="cover"
                />
                <Image
                    source={{ uri: item.owner.avatar[0] }}
                    style={styles.avatar}
                />
            </View>
            {/* Info */}
            <View style={styles.infoWrapper}>
                <AppText 
                    variant="body-sm-strong" 
                    color="primary"
                >
                    ${item.price} / month
                </AppText>
                <AppText
                    variant="body-xsm"
                    color="primary"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{ flexShrink: 1 }}
                >
                    {item.street}, {item.city}, {item.province}
                </AppText>
            
                <AppText 
                    variant="body-xsm" 
                    color="primary"
                    style={{ marginTop: 4 }}
                >
                    Available from {item.availableFrom}
                </AppText>
            </View>
            {isEditMode &&
                <RadioButton
                    selected={selectedItems.includes(item.id)}
                    onPress={() => toggleSelectItem(item.id)}
                />
            }
          </Pressable>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  noItemContainer:{
    flex:1, 
    alignItems: "center", 
    justifyContent: "center"
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginVertical: 12,
    alignItems: 'center',
  },
  image: {
    width: 55,
    aspectRatio: 1,
    borderRadius: 4,
  },
  infoWrapper: {
    flex: 1,
  },
  avatar: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 30,
    height: 30,
    borderRadius: 999,
  },
  buttonContainer:{
    display: 'flex', 
    flexDirection: 'row', 
    gap: 6, 
    marginVertical: 12, 
    marginLeft: 'auto'
  }
});
