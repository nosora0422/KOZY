import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';

import { DATA } from '@/data/mockListData';
import DisplayField from '@/components/ui/displayField';
import AppButton from '@/components/ui/appButton';
import Badge from "@/components/ui/badge";
import AppText from '@/components/ui/appText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 12;
const IMAGE_HEIGHT = 228;

export default function DetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const item = DATA.find(d => d.id === id);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Helper to format personality and lifestyle arrays into a readable string
  const formatList = (value) => {
    if (Array.isArray(value)) {
      return value.filter(Boolean).join(' · ');
    }
    return value ?? '';
  };

  const defaultRegion = useMemo(() => {
      const initialLatitude = Number(item?.latitude);
      const initialLongitude = Number(item?.longitude);
      return {
        latitude: Number.isFinite(initialLatitude) ? initialLatitude : 49.2827,
        longitude: Number.isFinite(initialLongitude) ? initialLongitude : -123.1207,
        latitudeDelta: 0.08,
        longitudeDelta: 0.08,
      };
    }, [item]);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <AppText variant='headline-sm'>{item.title}</AppText>
      <AppText variant='body-sm'>${item.price}</AppText>
      {/* Slider */}
      <FlatList
        data={item.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri, index) => `${uri}-${index}`}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setActiveIndex(index);
        }}
        style={styles.slider}
        renderItem={({ item: image }) => (
          <View style={{ width: SCREEN_WIDTH - 32 }}>
            <Image
              source={{ uri: image }}
              style={styles.fullImage}
              resizeMode="cover"
            />
          </View>
        )}
      />
      <View style={styles.pagination}>
        {item.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index && styles.activeDot,
            ]}
          />
        ))}
      </View>
      
      {/* Details */}
        <View style={styles.content}>
          <DisplayField title="Location">
            {`${item.street}, ${item.city}, ${item.province}`}
          </DisplayField>
          <View style={styles.mapContainer}>
            <MapView 
              style={StyleSheet.absoluteFill} 
              initialRegion={defaultRegion}
            >
              <Marker
                key={item.id}
                coordinate={{
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude),
                }}
              >
              </Marker>
            </MapView>
          </View>

          {/* Owner */}
          <View style={styles.section}>
            <AppText variant='headline-sm'>Meet Your Roomate</AppText>
            <Image
              source={{ uri: item.owner.avatar[0] }}
              style={styles.avatarImage}
              resizeMode="cover"
            />
            <View style={styles.ownerName}>
              <AppText variant="headline-md">
                {item.owner.name} {item.owner.ageGroup ? `, ${item.owner.ageGroup}` : ''}
              </AppText>
              <Badge status='varified'/>
            </View>

            <DisplayField title="Profile" type="pill">
              {[item.owner.gender, item.owner.occupation]}
            </DisplayField>

            <DisplayField title="Personality" type="pill">
              {item.owner.personality}
            </DisplayField>

            <DisplayField title="Lifestyle" type="pill">
              {item.owner.lifestyle}
            </DisplayField>

            <DisplayField title="About Room & House" type="pill">
              {[`${item.bedrooms} Bed`, `${item.bathrooms} Bath`, `${item.roomType}`, `${item.sizeSqft} sqft`, item.furnished ? 'Furnished' : 'Unfurnished', ...item.amenities]}
            </DisplayField>

            <DisplayField title="Looking For" type="pill">
              {item.owner.lookingFor}
            </DisplayField>
            <AppText variant="body-sm-strong">Move-in Details</AppText>
            <AppText variant='body-sm' style={{lineHeight: 14}}>• {item.availableFrom}</AppText>
            <AppText variant='body-sm' style={{lineHeight: 14}}>• Rent: ${item.price} / {item.leaseType == "Month-to-Month" ? "Month" : "Fixed Term"}</AppText>
            <AppText variant='body-sm' style={{lineHeight: 14}}>• Utility: {item.utilityIncluded ? 'Included' : 'Not Included'}</AppText>
            <AppText variant='body-sm' style={{lineHeight: 14}}>• Deposit: ${item.deposit}</AppText>
          </View>
        </View>
        <AppButton 
          text="Send Chat Request" 
          type="primary" 
          onPress={() => {
            Alert.alert(
              'Complete your profile to start chatting ✨',
              'Add a few more details so we can build trust and better matches.',
              [{
                text: 'Close',
                style: 'cancel',
              },
              {
                text: 'Complete Profile',
                onPress: () => {
                  router.push('/(tabs)/account/editProfile');
                },
              },]
            );
          }}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'black', 
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 120 : 16,
    overflow: 'hidden'
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  slider:{
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 6,
  },
  price: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  location: {
    color: '#bbb',
    marginBottom: 12,
  },
  mapContainer: {
    height: 80,
    borderRadius: 6,
    overflow: 'hidden',
  },
  description: {
    color: 'white',
    lineHeight: 20,
    marginBottom: 16,
  },
  specRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  spec: {
    color: 'white',
  },
  section: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  sectionTitle: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  amenity: {
    color: '#ccc',
    marginBottom: 4,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  ownerName: {
     display: 'flex', 
     flexDirection: 'column', 
     justifyContent: 'center', 
     alignItems: 'center', 
     gap: 4
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 9999,
    marginHorizontal: 'auto'
  },
  mapImage: {
    width: '100%',
    height: 78,
    borderRadius: 4,
  },
  content: {
    marginTop: 16,
    flexDirection: 'column',
    gap: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff',
    marginVertical: 8,
  },
  fullImage: {
    width: '100%',
    height: 260,
    borderRadius: 0,
  },
  
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 6,
  },
  
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#666',
  },
  
  activeDot: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
  },

});
