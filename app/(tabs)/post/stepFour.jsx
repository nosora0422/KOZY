import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, StyleSheet, View, Dimensions, ScrollView, Alert, FlatList, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';

import { DATA } from '@/data/mockListData';
import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import DisplayField from '@/components/ui/displayField';
import Badge from '@/components/ui/badge';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 12;

export default function StepFour() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const item = DATA[0]

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
    <View style={{ flex: 1, overflow: 'visible' }}>
        <FlatList 
            data={[{ key: 'content' }]}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="always"
            renderItem={() => (
                <View style={styles.container}>
                    <View style={{ gap: 40 }}>
                        <View style={styles.titleContainer}>
                            <AppText variant='headline-md' color='primary'>Step 4</AppText>
                            <AppText variant='body-sm' color='primary'>Review Your Profile</AppText>
                            <AppText variant='body-xsm' color='primary' style={{ textAlign: 'center' }}>
                                Your profile will appear with your listing. Make sure it looks just right.
                            </AppText>
                        </View>
                        <View>
                            <AppText variant='headline-sm' color='primary'>Roommate Information</AppText>
                            <FlatList
                                data={item.owner.avatar}
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                                decelerationRate="fast"
                                keyExtractor={(uri, index) => `${uri}-${index}`}
                                contentContainerStyle={{
                                    paddingRight: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
                                    paddingVertical: 16,
                                }}
                                renderItem={({ item: image }) => (
                                    <View style={{ width: ITEM_WIDTH, marginRight: ITEM_SPACING }}>
                                    <Image
                                        source={{ uri: image }}
                                        style={styles.image}
                                        contentFit="cover"
                                    />
                                    </View>
                                )}
                                />
                        </View>
                        <View style={styles.content}>
                            <View style={{ 
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <DisplayField title="Name">
                                    {item.owner.name}
                                </DisplayField>
                                <Badge status='varified' />
                            </View>
                
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
                        </View>
                        <Pressable 
                            style={styles.replaceButton} 
                            onPress={() => {}}
                        >
                            <AppText variant='button-sm'>Edit Profile</AppText>
                        </Pressable>
                        <View style={styles.buttonContainer}>
                            <View style={{ flex: 1 }}>
                                <AppButton
                                    text="Cancel"
                                    type='secondary'
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
                                <AppButton
                                    text="Continue"
                                    onPress={() => router.push('post/previewListing')}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            )}
        />   
    </View>
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
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  content: {
    flexDirection: 'column',
    gap: 20,
  },
  replaceButton:{
        margin: 'auto',
        borderBottomWidth:1,
        borderColor: '#ffffff'
    },
});
