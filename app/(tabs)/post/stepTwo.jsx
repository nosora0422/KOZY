import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, StyleSheet, View, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import MediaInput from '@/components/ui/input/mediaInput';
import InfoList from '@/components/ui/appList';


export default function StepTwo() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [error, setError] = useState(null);

    const insets = useSafeAreaInsets();

    useFocusEffect(
        useCallback(() => {
          const parent = navigation.getParent();
          parent?.setOptions({
            tabBarStyle: { display: 'none' },
          });
        }, [navigation])
      );



  return (
    <ScrollView 
        contentContainerStyle={[styles.container, { paddingTop: insets.top }]}
        keyboardShouldPersistTaps="handled"
    >   
        <View style={{ paddingHorizontal: 24, gap: 40 }}>
            <View style={styles.titleContainer}>
                <AppText variant='headline-md' color='primary'>Step 2</AppText>
                <AppText variant='body-sm' color='primary'>Upload Room Photos</AppText>
                <AppText variant='body-xsm' color='primary' style={{ textAlign: 'center' }}>
                    Show your space! Clear photos help others trust your listing and understand what the room looks like.
                </AppText>
            </View>
            <InfoList
                title="Tips"
                items={[
                    'Upload at least 3 photos',
                    'Include views of the room, common areas, bathroom, and building (if applicable)',
                ]}
            />
            <View style={{ paddingHorizontal: 8 }}>
                <MediaInput />
            </View>
        </View>
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
                <AppButton text="Continue" onPress={() => router.push('/post/stepThree')}/>
            </View>
        </View>
    </ScrollView>
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
    marginTop: 24,
  },
  titleContainer:{
    alignItems: 'center',
    gap: 8,
  },
});
