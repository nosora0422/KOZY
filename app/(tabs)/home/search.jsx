import { useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, TextInput, ScrollView } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';

import InputRow from "@/components/ui/layout/inputRow";
import TextField from "@/components/ui/input/textField";
import FormField from '@/components/ui/form/formField';
import PillGroup from '@/components/ui/pill/pillGroup';

export default function SearchScreen() {
  const [budget, setBudget] = useState("");
  const [lifestyle, setLifestyle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState([]);

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
        <Image
          source={require('@/assets/images/map-placeholder.png')}
          style={{ width: '100%', borderRadius: 16, marginBottom: 16, aspectRatio: 1/1 }}
        />
      </View>
      <FormField label="Rent Budget" error={error}>
        <InputRow>
          <TextField placeholder="From" error={!!error}/>
          <TextField placeholder="To" />
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
