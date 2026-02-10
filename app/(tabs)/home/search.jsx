import { useMemo, useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import InputRow from "@/components/ui/layout/inputRow";
import TextField from "@/components/ui/input/textField";
import FormField from '@/components/ui/form/formField';
import PillGroup from '@/components/ui/pill/pillGroup';
import { DATA } from '@/data/mockListData';
import { router } from 'expo-router';

export default function SearchScreen() {
  // default to 0 in budget fields to avoid NaN issues in filtering logic, but treat empty string as no input
  const [budgetFrom, setBudgetFrom] = useState("");
  const [budgetTo, setBudgetTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);
  const [listings, setListings] = useState(Array.isArray(DATA) ? DATA : []);

  // Filter listings based on search term, budget, and lifestyle preferences
  const filteredListings = useMemo(() => {
    const selectedValues = selected.map((value) => String(value).toLowerCase());
    const term = searchTerm.trim().toLowerCase();

    return listings.filter((item) => {
      const price = Number(item?.price);
      const min = Number(budgetFrom);
      const max = Number(budgetTo);

      const hasMin = budgetFrom.trim().length > 0 && Number.isFinite(min);
      const hasMax = budgetTo.trim().length > 0 && Number.isFinite(max);

      const matchesBudget =
        (!hasMin || price >= min) && (!hasMax || price <= max);

      const lifestyleText = `${item?.owner?.lifestyle ?? ""} ${item?.owner?.personality ?? ""}`
        .toLowerCase()
        .trim();
      const matchesLifestyle =
        selectedValues.length === 0 ||
        selectedValues.some((value) => lifestyleText.includes(value));

      const locationText = `${item?.city ?? ""} ${item?.province ?? ""} ${item?.postalCode ?? ""} ${item?.street ?? ""}`
        .toLowerCase()
        .trim();
      const matchesLocation = term.length === 0 || locationText.includes(term);

      return matchesBudget && matchesLifestyle && matchesLocation;
    });
  }, [listings, budgetFrom, budgetTo, selected, searchTerm]);

  //list on the map
  const mapListings = useMemo(() => {
    return filteredListings.filter((item) => {
      const latitude = Number(item?.latitude);
      const longitude = Number(item?.longitude);
      return Number.isFinite(latitude) && Number.isFinite(longitude);
    });
  }, [filteredListings]);

  const defaultRegion = useMemo(() => {
    const initialLatitude = Number(mapListings[0]?.latitude);
    const initialLongitude = Number(mapListings[0]?.longitude);
    return {
      latitude: Number.isFinite(initialLatitude) ? initialLatitude : 49.2827,
      longitude: Number.isFinite(initialLongitude) ? initialLongitude : -123.1207,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    };
  }, [mapListings]);

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <FormField label="Location">
        <View style={styles.inputContainer}>
          <TextInput
            value={searchTerm}
            placeholder="Search by ZIP or area"
            placeholderTextColor={colors.semantic.text.placeholder}
            onChangeText={setSearchTerm}
            style={styles.searchInput}
        />
        <Feather name="search" color={colors.semantic.text.primary} size={24} />
        </View>
      </FormField>
      <View style={styles.mapContainer}>
        <MapView 
          style={StyleSheet.absoluteFill} 
          initialRegion={defaultRegion}
        >
          {mapListings.map((item) => (
            <Marker
              key={item.id}
              coordinate={{
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
              }}
              title={item.title}
              description={`$${item.price}`}
              onPress={() => {
                router.push(`(tabs)/home/${item.id}`);
              }}
            />
          ))}
        </MapView>
      </View>
      <FormField label="Rent Budget" error={error}>
        <InputRow>
          <TextField
            placeholder="From"
            error={!!error}
            value={budgetFrom}
            onChangeText={setBudgetFrom}
            keyboardType="numeric"
          />
          <TextField
            placeholder="To"
            value={budgetTo}
            onChangeText={setBudgetTo}
            keyboardType="numeric"
          />
        </InputRow>
      </FormField>
      <FormField label="Lifestyle Preferences">
        <InputRow>
          <PillGroup
            items={[
              { label: "Friendly", value: "friendly" },
              { label: "Independent", value: "independent" },
              { label: "Calm", value: "calm" },
              { label: "Talkative", value: "talkative" },
              { label: "Respectful", value: "respectful" },
              { label: "Introverted", value: "introverted" },
              { label: "Extroverted", value: "extroverted" },
            ]}
            value={selected}
            onChange={setSelected}
          />
        </InputRow>
      </FormField>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  mapContainer: {
    marginBottom: 24,
    height: 240,
    borderRadius: 16,
    overflow: 'hidden',
  },
  text:{
    color: 'white',
  },
  searchInput: {
    height: 40,
    color: colors.semantic.input.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.semantic.input.border.normal.color,
    borderBottomWidth: 1,
  },
});
