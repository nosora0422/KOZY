import { useState } from 'react';
import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Dimensions, ScrollView,FlatList } from 'react-native';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

import InputRow from "@/components/ui/layout/inputRow";
import TextField from "@/components/ui/input/textField";
import FormField from '@/components/ui/form/formField';
import PillGroup from '@/components/ui/pill/pillGroup';
import AppText from '@/components/ui/appText';
import DisplayField from '@/components/ui/displayField';
import { DATA } from '@/data/mockListData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
    const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
    const ITEM_SPACING = 12;
    const IMAGE_HEIGHT = 228;

export default function EditProfile() {
    const { id } = useLocalSearchParams();
    const item = DATA[1];

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
        <AppText variant="headline-md" color="primary">
            Edit Profile
        </AppText>
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
            style={{ marginBottom: 12 }}
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
        <DisplayField title="My Profile">
            Keeping your ID, photo, and profile details up to date helps us build trust in the KOZY community.
        </DisplayField>
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
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 4,
  },
});
