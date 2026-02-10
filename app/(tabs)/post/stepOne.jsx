import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, StyleSheet, View, FlatList, ScrollView, Alert } from 'react-native';
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
import AppDrawer from '@/components/ui/drawer/AppDrawer';
import Dropdown from '@/components/ui/input/dropdown';


export default function StepOne() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [roomTitle, setRoomTitle] = useState(null);
    const [price, setPrice] = useState(null);
    const [street, setStreet] = useState(null);
    const [additionalAddress, setAdditionalAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [province, setProvince] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [error, setError] = useState(null);
    const [leaseType, setLeaseType] = useState('');
    const [roomType, setRoomType] = useState('');
    const [bathroomType, setBathroomType] = useState('');
    const [amenities, setAmenities] = useState([]);
    const [additionalAmenities, setAdditionalAmenities] = useState([]);
    const [description, setDescription] = useState('');
    const [availableMonth, setAvailableMonth] = useState(null);
    const [availableDay, setAvailableDay] = useState(null);
    const [availableYear, setAvailableYear] = useState(null);
    const availableMonthDrawerRef = useRef(null);
    const availableDayDrawerRef = useRef(null);
    const availableYearDrawerRef = useRef(null);

    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
        const parent = navigation.getParent();
        parent?.setOptions({
            tabBarStyle: { display: 'none' },
        });

        return () => {
            parent?.setOptions({
                tabBarStyle: {
                    position: 'absolute',
                    alignSelf: 'center', 
                    bottom: insets.bottom + 10,
                    borderRadius: 16,
                    borderTopWidth: 0,
                    height: 56,
                    backgroundColor: 'rgba(0,0,0,1)',
                    maxWidth: 400,
                    paddingTop: 7,
                    marginHorizontal: 16,
                },
            });
        };
        }, [navigation, insets.bottom])
    );

  return (
    <View style={{ flex: 1, overflow: 'visible' }}>
        <FlatList 
            data={[{ key: 'content' }]}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="always"
            renderItem={() => ( 
                <View style={styles.container}>
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
                                onChangeText={setRoomTitle}
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
                            </InputRow>
                            <InputRow>
                                <TextField
                                    value={additionalAddress}
                                    placeholder="Additional Address (e.g., Apt, Suite)"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    onChangeText={setAdditionalAddress}
                                />
                            </InputRow>
                            <InputRow>
                                <TextField
                                    value={city}
                                    placeholder="City or Town"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    onChangeText={setCity}
                                />
                            </InputRow>
                            <InputRow>
                                <TextField
                                    value={province}
                                    placeholder="State, Province, or Region"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    onChangeText={setProvince}
                                />
                            </InputRow>
                            <InputRow>
                                <TextField
                                    value={postalCode}
                                    placeholder="Postal or ZIP Code"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    onChangeText={setPostalCode}
                                />
                            </InputRow>
                        </FormField>
                        <FormField label="Available From" error={error}>
                            <InputRow>
                                <TextField
                                    value={availableMonth}
                                    placeholder="Month"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    showSoftInputOnFocus={false}
                                    onFocus={() => availableMonthDrawerRef.current?.snapToIndex(0)}
                                />
                                <TextField
                                    value={availableDay}
                                    placeholder="Day"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    onChangeText={setAvailableDay}
                                    showSoftInputOnFocus={false}
                                    onFocus={() => availableDayDrawerRef.current?.snapToIndex(0)}
                                />
                                <TextField
                                    value={availableYear}
                                    placeholder="Year"
                                    placeholderTextColor={colors.semantic.text.placeholder}
                                    onChangeText={setAvailableYear}
                                    showSoftInputOnFocus={false}
                                    onFocus={() => availableYearDrawerRef.current?.snapToIndex(0)}
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
                                    { label: "Laundry", value: "laundry" },
                                ]}
                                value={amenities}
                                onChange={setAmenities}
                            />
                            {/* <TextField
                                value={additionalAmenities}
                                placeholder="Add more amenities"
                                placeholderTextColor={colors.semantic.text.placeholder}
                                onChangeText={setAdditionalAmenities}
                                style={{ marginTop: 10 }}
                            /> */}
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
                                                    router.push('/(tabs)/post');
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
                </View>
             )}
        />
        <AppDrawer
            ref={availableMonthDrawerRef}
            snapPoints={['70%']}
            primaryAction={() => availableMonthDrawerRef.current?.close()}
        >
            <View style={styles.dropdownRow}>
                <Dropdown
                    value={availableMonth}
                    onChange={setAvailableMonth}
                    style={styles.dropdownItem}
                    options={[
                        { label: "Jan", value: "Jan" },
                        { label: "Feb", value: "Feb" },
                        { label: "Mar", value: "Mar" },
                        { label: "Apr", value: "Apr" },
                        { label: "May", value: "May" },
                        { label: "Jun", value: "Jun" },
                        { label: "Jul", value: "Jul" },
                        { label: "Aug", value: "Aug" },
                        { label: "Sep", value: "Sep" },
                        { label: "Oct", value: "Oct" },
                        { label: "Nov", value: "Nov" },
                        { label: "Dec", value: "Dec" },
                    ]}
                />
            </View>
        </AppDrawer>
        <AppDrawer
            ref={availableDayDrawerRef}
            snapPoints={['80%']}
            primaryAction={() => availableDayDrawerRef.current?.close()}
        >
            <Dropdown
                value={availableDay}
                onChange={setAvailableDay}
                style={styles.dropdownItem}
                options={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6", value: "6" },
                    { label: "7", value: "7" },
                    { label: "8", value: "8" },
                    { label: "9", value: "9" },
                    { label: "10", value: "10" },
                    { label: "11", value: "11" },
                    { label: "12", value: "12" },
                    { label: "13", value: "13" },
                    { label: "14", value: "14" },
                    { label: "15", value: "15" },
                    { label: "16", value: "16" },
                    { label: "17", value: "17" },
                    { label: "18", value: "18" },
                    { label: "19", value: "19" },
                    { label: "20", value: "20" },
                    { label: "21", value: "21" },
                    { label: "22", value: "22" },
                    { label: "23", value: "23" },
                    { label: "24", value: "24" },
                    { label: "25", value: "25" },
                    { label: "26", value: "26" },
                    { label: "27", value: "27" },
                    { label: "28", value: "28" },
                    { label: "29", value: "29" },
                    { label: "30", value: "30" },
                    { label: "31", value: "31" },
                ]}
            />
        </AppDrawer>
        <AppDrawer
            ref={availableYearDrawerRef}
            snapPoints={['80%']}
            primaryAction={() => availableYearDrawerRef.current?.close()}
        >
            <Dropdown
                value={availableYear}
                onChange={setAvailableYear}
                options={[
                    { label: "2026", value: "2026" },
                    { label: "2027", value: "2027" },
                    { label: "2028", value: "2028" },
                    { label: "2029", value: "2029" },
                    { label: "2030", value: "2030" },
                    { label: "2031", value: "2031" },
                    { label: "2032", value: "2032" },
                    { label: "2033", value: "2033" },
                    { label: "2034", value: "2034" },
                    { label: "2035", value: "2035" },
                    { label: "2036", value: "2036" },
                ]}
            />
        </AppDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 50 : 16,
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
  },
    dropdownRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
        width: '100%'
    },
    dropdownItem: {
        flex: 1,
        minWidth: 0,
    }
});
