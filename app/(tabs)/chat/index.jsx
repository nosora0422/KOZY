import { useState } from 'react';
import { router, usePathname } from "expo-router";
import { StyleSheet, View, FlatList, Pressable, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import { DATA } from '@/data/mockListData';
import CheckBox from '@/components/ui/input/checkbox';
import { colors } from '@/constants/colors';



export default function Chat() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const isLoggedIn = true; // Replace with actual authentication logic
  const [isEditMode, setIsEditMode] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const listings = DATA; // Replace with actual message owner data
  

  if (!isLoggedIn) {
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
    )
  }

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

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppText variant="headline-sm" color="primary">Messages</AppText>
        <View style={styles.content}>
          {listings ? (
            <>            
              {/* Buttons */}
              <View style={styles.buttonContainer}>
                  {!isEditMode && (
                      <AppButton 
                          text="Edit Chats" 
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
                        router.push(`chat/${item.id}`);
                    }}
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
                            {item.owner.name}
                        </AppText>
                        <AppText
                            variant="body-xsm"
                            color="primary"
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={{ flexShrink: 1 }}
                        >
                            {item.street}, {item.city}
                        </AppText>
                        <AppText 
                            variant="body-xsm" 
                            color="primary"
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{ marginTop: 4, flexShrink: 1 }}
                          >
                            Hi, I'm interested in your listing at {item.street}, {item.city}. Is it still available?
                        </AppText>
                    </View>
                    <AppText variant="body-xsm" >17mins ago</AppText>
                    {isEditMode &&
                        <CheckBox
                            selected={selectedItems.includes(item.id)}
                            onPress={() => toggleSelectItem(item.id)}
                        />
                    }
                  </Pressable>
                )}
              />
            </>

          ) : (
            <AppText variant="body-md" color="primary">No messages yet</AppText>
          )}
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.base.background,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
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
