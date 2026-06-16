import { useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppButton from '@/components/ui/appButton';
import AppDrawer from '@/components/ui/drawer/AppDrawer';
import AppText from '@/components/ui/appText';
import DisplayInput from '@/components/ui/input/displayInput';
import PillGroup from '@/components/ui/pill/pillGroup';
import TextField from '@/components/ui/input/textField';
import Dropdown from '@/components/ui/input/dropdown';
import FormField from '@/components/ui/form/formField';
import { colors } from '@/constants/colors';
import { DATA } from '@/data/mockListData';

const ROOM_TYPE_OPTIONS = [
  { label: 'Private Room', value: 'Private Room' },
  { label: 'Shared room', value: 'Shared room' },
  { label: 'Master bedroom', value: 'Master bedroom' },
  { label: 'Furnished', value: 'Furnished' },
  { label: 'Unfurnished', value: 'Unfurnished' },
  { label: 'Shared bathroom', value: 'Shared bathroom' },
  { label: 'Ensuite bathroom', value: 'Ensuite bathroom' },
  { label: 'Kitchen access', value: 'Kitchen access' },
  { label: 'Laundry in building', value: 'Laundry in building' },
  { label: 'Laundry in unit', value: 'Laundry in unit' },
];

const LIFESTYLE_OPTIONS = [
  { label: 'Early Bird', value: 'Early Bird' },
  { label: 'Night Owl', value: 'Night Owl' },
  { label: 'Homebody', value: 'Homebody' },
  { label: 'Out & About', value: 'Out & About' },
  { label: 'Clean & Tidy', value: 'Clean & Tidy' },
  { label: 'Easygoing', value: 'Easygoing' },
  { label: 'Smoker', value: 'Smoker' },
  { label: 'Non-Smoker', value: 'Non-Smoker' },
  { label: 'Work from Home', value: 'Work from Home' },
  { label: 'Go to Office', value: 'Go to Office' },
];

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const genderDrawerRef = useRef(null);
  const roomTypeDrawerRef = useRef(null);
  const lifestyleDrawerRef = useRef(null);

  const [location, setLocation] = useState('');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [gender, setGender] = useState('Male');
  const [roomTypes, setRoomTypes] = useState([]);
  const [lifestyleMatches, setLifestyleMatches] = useState([]);

  const [error, setError] = useState(null);

  const mapListings = useMemo(() => {
    return DATA.filter((item) => {
      const latitude = Number(item?.latitude);
      const longitude = Number(item?.longitude);
      return Number.isFinite(latitude) && Number.isFinite(longitude);
    });
  }, []);

  const handleOpenResults = () => {
    router.push({
      pathname: '/home/search/searchResult',
      params: {
        location,
        budgetFrom,
        budgetTo,
        gender,
        roomTypes: JSON.stringify(roomTypes),
        lifestyleMatches: JSON.stringify(lifestyleMatches),
      },
    });
  };

  const defaultRegion = useMemo(() => {
    const initialLatitude = Number(mapListings[0]?.latitude);
    const initialLongitude = Number(mapListings[0]?.longitude);
    return {
      latitude: Number.isFinite(initialLatitude) ? initialLatitude : 40.7736,
      longitude: Number.isFinite(initialLongitude) ? initialLongitude : -73.9566,
      latitudeDelta: 0.018,
      longitudeDelta: 0.018,
    };
  }, [mapListings]);

  return (
    <>
      <View style={styles.screen}>
        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + 20 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.heroBlock}>
            <SearchSection label="Location">
              <View style={styles.locationInput}>
                <TextInput
                  value={location}
                  placeholder="1423 3rd Ave"
                  placeholderTextColor={colors.semantic.input.textDisabled}
                  onChangeText={setLocation}
                  returnKeyType="search"
                  accessibilityLabel="Location"
                  style={styles.locationText}
                />
                <Feather name="search" color={colors.semantic.text.primary} size={28} />
              </View>
            </SearchSection>

            <View style={styles.mapContainer}>
              <MapView
                style={StyleSheet.absoluteFill}
                initialRegion={defaultRegion}
                scrollEnabled={false}
                zoomEnabled={false}
                rotateEnabled={false}
                pitchEnabled={false}
                pointerEvents="none"
              >
                {mapListings.slice(0, 3).map((item) => (
                  <Marker
                    key={item.id}
                    coordinate={{
                      latitude: Number(item.latitude),
                      longitude: Number(item.longitude),
                    }}
                  />
                ))}
              </MapView>
            </View>
          </View>

          <View style={styles.filters}>
            <SearchSection label="Rent Budget">
              <View style={styles.budgetRow}>
                <TextField
                  placeholder="MIN"
                  value={budgetFrom}
                  onChangeText={setBudgetFrom}
                  keyboardType="numeric"
                  containerStyle={styles.budgetInput}
                />
                <TextField
                  placeholder="MAX"
                  value={budgetTo}
                  onChangeText={setBudgetTo}
                  keyboardType="numeric"
                  containerStyle={styles.budgetInput}
                />
              </View>
            </SearchSection>
            <FormField label="Gender Preference" error={error}>
              <DisplayInput
                value={gender}
                onPress={() => genderDrawerRef.current?.snapToIndex(0)}
                rightIcon={<Feather name="chevron-down" size={22} color={colors.semantic.text.primary} />}
                accessibilityLabel="Gender Preference filter"
              />
            </FormField>
            <FormField label="Room & House Type" error={error}>
              <DisplayInput
                value={roomTypes}
                onPress={() => roomTypeDrawerRef.current?.snapToIndex(0)}
                isMulti
              />
            </FormField>
            <FormField label="Lifestyle Match" error={error}>
              <DisplayInput
                value={lifestyleMatches}
                onPress={() => lifestyleDrawerRef.current?.snapToIndex(0)}
                isMulti
              />
            </FormField>
            <AppButton text="Search" onPress={handleOpenResults} style={styles.searchButton} />
          </View>
        </ScrollView>

        <AppDrawer
          ref={genderDrawerRef}
          primaryAction={() => genderDrawerRef.current?.close()}
          primaryActionText="Save"
        >
          <Dropdown
            value={gender}
            onChange={setGender}
            options={[
              { label: "Female", value: "Female" },
              { label: "Male", value: "Male" },
              { label: "Non-binary", value: "Non-binary" },
            ]}
          />
        </AppDrawer>

        <AppDrawer
          ref={roomTypeDrawerRef}
          title="Room & House Type"
          description={'Find the type of room and home you prefer\nSelect all that apply'}
          primaryAction={() => roomTypeDrawerRef.current?.close()}
          primaryActionText="Save"
        >
          <PillGroup 
            items={ROOM_TYPE_OPTIONS} 
            value={roomTypes} 
            onChange={setRoomTypes} 
          />
        </AppDrawer>

        <AppDrawer
          ref={lifestyleDrawerRef}
          primaryAction={() => lifestyleDrawerRef.current?.close()}
          primaryActionText="Save"
          title="Lifestyle Match"
          description={'Find homes that match your lifestyle\nSelect all that apply'}
        >
          <PillGroup 
            items={LIFESTYLE_OPTIONS} 
            value={lifestyleMatches} 
            onChange={setLifestyleMatches} 
          />
        </AppDrawer>
      </View>
    </>
  );
}

function SearchSection({ label, children }) {
  return (
    <View style={styles.section}>
      <AppText variant="body-md-strong" color="primary">
        {label}
      </AppText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.base.background,
  },
  content: {
    paddingHorizontal: 22,
  },
  backButton: {
    width: 42,
    height: 42,
    marginLeft: -8,
    marginBottom: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heroBlock: {
    gap: 13,
  },
  section: {
    width: '100%',
    gap: 4,
  },
  locationInput: {
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: colors.semantic.input.border.normal.color,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  locationText: {
    flex: 1,
    color: colors.semantic.input.text,
    paddingVertical: 4,
    fontFamily: 'OpenSans_400Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  mapContainer: {
    height: 320,
    width: '100%',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: colors.base.gray500,
  },
  filters: {
    marginTop: 25,
  },
  budgetRow: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 12,
  },
  budgetInput: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 22,
    right: 22,
    bottom: 0,
    paddingTop: 12,
    backgroundColor: colors.base.background,
  },
  searchButton: {
    marginTop: 12,
  },
  genderDrawer: {
    gap: 20,
    paddingTop: 28,
  },
  genderOption: {
    width: '100%',
    height: 29,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: colors.base.gray800Alpha,
    borderWidth: 1,
    borderColor: colors.base.gray800Alpha,
  },
  genderOptionText: {
    textAlign: 'center',
  },
  filterDrawer: {
    gap: 50,
    paddingTop: 8,
  },
  drawerHeader: {
    gap: 10,
  },
  drawerDescription: {
    lineHeight: 17,
  },
});
