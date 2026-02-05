import { View, Text, StyleSheet, Platform, FlatList, Image, Dimensions, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { DATA } from '@/data/mockListData';
import DisplayField from '@/components/ui/displayField';
import AppButton from '@/components/ui/appButton';
import AppText from '@/components/ui/appText';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 12;
const IMAGE_HEIGHT = 228;

export default function PreviewListing() {
  //const { id } = useLocalSearchParams();
  const item = DATA[0];

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
      <AppText variant='body-xsm' style={{ marginBottom: 16 }}>
        Review your room listing before publishing. You can go back to edit any section if needed. Once published, your listing will be visible to seekers.
      </AppText>
      <Text style={styles.sectionTitle}>Room Details</Text>
      <FlatList
        data={item.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + ITEM_SPACING}
        decelerationRate="fast"
        contentContainerStyle={{
            paddingRight: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
        }}
        keyExtractor={(uri, index) => `${uri}-${index}`}
        renderItem={({ item: image }) => (
          <View style={{ width: ITEM_WIDTH, marginRight: ITEM_SPACING }}>
            <Image
                source={{ uri: image }}
                style={styles.image}
                resizeMode="cover"
            />
          </View>
        )}
      />
      
      {/* Details */}
        <View style={styles.content}>
          <DisplayField title="Location">
            {`${item.street}, ${item.city}, ${item.province}`}
          </DisplayField>
          <Image 
            source={require('@/assets/images/map-placeholder.png')}
            style={styles.mapImage}
            resizeMode="cover"
            />
          <DisplayField title="Price">
            ${item.price} / month
          </DisplayField>

          <DisplayField title="Room Type">
            {item.roomType}
          </DisplayField>

          <DisplayField title="Bathroom Type">
            {item.bathroomType}
          </DisplayField>

          <DisplayField title="Available From">
            {item.availableFrom}
          </DisplayField>

          <DisplayField title="Lease Type">
            {item.leaseType}
          </DisplayField>

          <DisplayField title="Furnished">
            {item.furnished ? 'Yes' : 'No'}
          </DisplayField>

          <DisplayField title="Description">
            {item.description}
          </DisplayField>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            {item.amenities.map((a, index) => (
              <Text key={index} style={styles.amenity}>
                • {a}
              </Text>
            ))}
          </View>

          {/* Specs */}
          <View style={styles.specRow}>
            <Text style={styles.spec}>🛏 {item.bedrooms} bed</Text>
            <Text style={styles.spec}>🛁 {item.bathrooms} bath</Text>
            <Text style={styles.spec}>📐 {item.sizeSqft} sqft</Text>
          </View>

          <View style={styles.divider}></View>

          {/* Owner */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Roommate Information</Text>
            <FlatList
              data={item.owner.avatar}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              snapToInterval={ITEM_WIDTH + ITEM_SPACING}
              decelerationRate="fast"
              contentContainerStyle={{
                  paddingRight: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
              }}
              keyExtractor={(uri, index) => `${uri}-${index}`}
              renderItem={({ item: image }) => (
                <View style={{ width: ITEM_WIDTH, marginRight: ITEM_SPACING }}>
                  <Image
                      source={{ uri: image }}
                      style={styles.image}
                      resizeMode="cover"
                  />
                </View>
              )}
            />
            <DisplayField title="Name">
              {item.owner.name}
            </DisplayField>

            <DisplayField title="Age Group">
              {item.owner.ageGroup}
            </DisplayField>

            <DisplayField title="Gender">
              {item.owner.gender}
            </DisplayField>

            <DisplayField title="Occupation">
              {item.owner.occupation}
            </DisplayField>

            <DisplayField title="Personality">
              {item.owner.personality}
            </DisplayField>

            <DisplayField title="Lifestyle">
              {item.owner.lifestyle}
            </DisplayField>

            <DisplayField title="About Me">
              {item.owner.aboutMe}
            </DisplayField>

            {/* <View style={styles.ownerRow}>
              <Image
                source={{ uri: item.owner.avatar[0] }}
                style={styles.avatar}
              />
              <Text style={styles.ownerName}>{item.owner.name}</Text>
            </View> */}
          </View>
        </View>
        <AppButton 
          text="Edit Listing" 
          type="secondary" 
          style={{ marginBottom: 10 }}
          onPress={() => {}}
        />
        <AppButton 
          text="Confirm & Publish" 
          type="primary" 
          onPress={() => {
            router.push({
              pathname: '/(tabs)/post/confirmPublish',
              params: { id: item.id }
            })
          }}
        />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'black', 
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
    overflow: 'hidden'
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
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
    color: 'white',
    fontSize: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 4,
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
});
