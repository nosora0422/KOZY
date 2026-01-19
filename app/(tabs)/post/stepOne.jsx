import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import PillGroup from '@/components/ui/pill/pillGroup';
import AppText from '@/components/ui/appText';
import FormField from '@/components/ui/form/formField';
import InputRow from '@/components/ui/layout/inputRow';
import { colors } from '@/constants/colors';
import TextField from '@/components/ui/input/textField';
import TextArea from '@/components/ui/input/textArea';
import AppButton from '@/components/ui/appButton';


export default function StepOne() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [roomTitle, setroomTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState(null);
    const [province, setProvince] = useState(null);
    const [error, setError] = useState(null);
    const [leaseType, setLeaseType] = useState('');
    const [roomType, setRoomType] = useState('');
    const [bathroomType, setBathroomType] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [additionalAmenities, setAdditionalAmenities] = useState([]);
    const [description, setDescription] = useState([]);

    const insets = useSafeAreaInsets();

    useFocusEffect(
      useCallback(() => {
        const parent = navigation.getParent();
        parent?.setOptions({
          tabBarStyle: { display: 'none' },
        });

        return () => {
          parent?.setOptions({
            tabBarStyle: undefined,
          });
        };
      }, [])
    );

  return (
    <ScrollView 
        contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
        keyboardShouldPersistTaps="handled"
    >
        <View style={styles.titleContainer}>
            <AppText variant='headline-md' color='primary'>Step 1</AppText>
            <AppText variant='body-sm' color='primary'>Add Room Details</AppText>
            <AppText variant='body-xsm' color='primary' style={{ textAlign: 'center' }}>
                Please provide key information about the room to help seekers understand what you're offering.
            </AppText>
        </View>
        <View style={styles.contentContainer}>
            <FormField label="Room Title" error={error}>
                <TextField
                    value={roomTitle}
                    placeholder="e.g., Spacious Master Room in Downtown NYC"
                    placeholderTextColor={colors.semantic.text.placeholder}
                    onChangeText={setroomTitle}
                />
            </FormField>
            <FormField label="Monthly Rent" error={error}>
                <TextField
                    value={price}
                    placeholder="Enter the rent (USD)"
                    placeholderTextColor={colors.semantic.text.placeholder}
                    onChangeText={(text) => {
                        const numbersOnly = text.replace(/[^0-9]/g, '');
                        setPrice(numbersOnly);
                    }}
                    keyboardType="number-pad"
                />
            </FormField>
            <FormField label="Address" error={error}>
                <InputRow>
                    <TextField
                        value={street}
                        placeholder="Street"
                        placeholderTextColor={colors.semantic.text.placeholder}
                        onChangeText={setStreet}
                    />
                    <TextField
                        value={city}
                        placeholder="City"
                        placeholderTextColor={colors.semantic.text.placeholder}
                        onChangeText={setCity}
                    />
                    <TextField
                        value={province}
                        placeholder="Province"
                        placeholderTextColor={colors.semantic.text.placeholder}
                        onChangeText={setProvince}
                    />
                </InputRow>
            </FormField>
            <FormField label="Available From" error={error}>
                <InputRow>
                    <TextField
                        value={street}
                        placeholder="Month"
                        placeholderTextColor={colors.semantic.text.placeholder}
                        onChangeText={setStreet}
                    />
                    <TextField
                        value={city}
                        placeholder="Day"
                        placeholderTextColor={colors.semantic.text.placeholder}
                        onChangeText={setCity}
                    />
                    <TextField
                        value={province}
                        placeholder="Year"
                        placeholderTextColor={colors.semantic.text.placeholder}
                        onChangeText={setProvince}
                    />
                </InputRow>
            </FormField>
            <FormField label="Lease Type" error={error}>
                <PillGroup
                    items={[
                        { label: "Month-to-month", value: "month-to-month" },
                        { label: "Fixed-term", value: "fixed-term" },
                    ]}
                    value={leaseType}
                    onChange={setLeaseType}
                    isMulti={false}
                />
            </FormField>
            <FormField label="Room Type" error={error}>
                <PillGroup
                    items={[
                        { label: "Private", value: "private" },
                        { label: "Shared", value: "shared" },
                    ]}
                    value={roomType}
                    onChange={setRoomType}
                    isMulti={false}
                />
            </FormField>
            <FormField label="Bathroom Type" error={error}>
                <PillGroup
                    items={[
                        { label: "Private", value: "private-room" },
                        { label: "Shared", value: "shared-room" },
                    ]}
                    value={bathroomType}
                    onChange={setBathroomType}
                    isMulti={false}

                />
            </FormField>
            <FormField label="Amenities" error={error}>
                <PillGroup
                    items={[
                        { label: "Wi-Fi", value: "wifi" },
                        { label: "Laundary", value: "Laundary" },
                    ]}
                    value={amenities}
                    onChange={setAmenities}
                />
                <TextField
                    value={additionalAmenities}
                    placeholder="Add more amenities"
                    placeholderTextColor={colors.semantic.text.placeholder}
                    onChangeText={setAdditionalAmenities}
                    style={{ marginTop: 10 }}
                />
            </FormField>
            <FormField label="Description" error={error}>
                <TextArea
                    value={description}
                    placeholder="Write a brief description about the room"
                    placeholderTextColor={colors.semantic.text.placeholder}
                    onChangeText={setDescription}
                    style={{ marginTop: 10 }}
                />
            </FormField>
            <View style={styles.buttonContainer}>
                <View style={{ flex: 1 }}>
                    <AppButton 
                        text="Cancel" 
                        type="secondary" 
                        onPress={() => {
                            Alert.alert(
                                'Exit without saving?',
                                'Are you sure you want to exit? Your changes may not be saved.',
                                [{
                                    text: 'Stay'
                                },
                                {
                                    text: 'Exit without saving',
                                    style: 'destructive',
                                    onPress: () => {
                                        router.back();
                                    },
                                },]
                            );  
                        }}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <AppButton text="Continue" onPress={() => router.push('/post/stepTwo')}/>
                </View>
            </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  buttonContainer:{
    width: '100%',
    flexDirection: 'row',
    gap: 8,
  },
  titleContainer:{
    alignItems: 'center',
    gap: 8,
  },
  contentContainer:{
    marginTop: 24,
  }
});
