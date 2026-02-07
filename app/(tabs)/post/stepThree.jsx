import { useState, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, StyleSheet, View, Dimensions, ScrollView, Alert, FlatList, Pressable } from 'react-native';
import { useLocalSearchParams, useNavigation, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { VideoView, useVideoPlayer } from 'expo-video';
import * as ImagePicker from 'expo-image-picker';

import { DATA } from '@/data/mockListData';

import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import InfoList from '@/components/ui/appList';
import AppDrawer from '@/components/ui/drawer/AppDrawer';
import { colors } from '@/constants/colors';
import AppIconButton from '@/components/ui/appIconButton';
import { Feather } from '@expo/vector-icons';


export default function StepThree() {
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const [error, setError] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const item = DATA[0]
    const drawerRef = useRef(null);
    const selectedVideoPlayer = useVideoPlayer(
            selectedVideo?.uri ?? null,
            (player) => {
                player.loop = true;
            }
            );

    const exampleVideo1 = useVideoPlayer(
        'https://www.w3schools.com/html/mov_bbb.mp4',
        (player) => {
        player.loop = true;
        }
    );
    const exampleVideo2 = useVideoPlayer(
        'https://www.w3schools.com/html/mov_bbb.mp4',
        (player) => {
        player.loop = true;
        }
    );

    const openAlbum = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert(
            'Permission required',
            'We need access to your photos to upload a file.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];

            setSelectedVideo(asset);
            drawerRef.current?.snapToIndex(0);
        }
    };


    useFocusEffect(
        useCallback(() => {
          const parent = navigation.getParent();
          parent?.setOptions({
            tabBarStyle: { display: 'none' },
          });
        }, [navigation])
      );


  return (
    <View style={{ flex: 1, overflow: 'visible' }}>
        <FlatList 
            data={[{ key: 'content' }]}
            keyExtractor={(item) => item.key}
            keyboardShouldPersistTaps="always"
            renderItem={() => (
                <View style={[styles.container]}>
                    <View style={{ paddingHorizontal: 24, gap: 40 }}>
                        <View style={styles.titleContainer}>
                            <AppText variant='headline-md' color='primary'>Step 3</AppText>
                            <AppText variant='body-sm' color='primary'>Capture a Vertical Walkthrough Room Video</AppText>
                            <AppText variant='body-xsm' color='primary' style={{ textAlign: 'center' }}>
                                Show the entire space clearly in a single take. Record a vertical (portrait) video that captures all areas the room seeker will have access to — just like a real-time tour.
                            </AppText>
                        </View>
                        <InfoList
                            title="Video Requirements"
                            items={[
                                'Shoot in portrait mode (vertical)',
                                'Walk steadily through the space (like a live tour)',
                                'Include bedroom, bathroom, kitchen, common areas',
                                'Keep it under 1 minute',
                            ]}
                        />
                        <View>
                            <AppText variant='body-sm-strong' color='primary' style={{ marginBottom: 16 }}>
                                Sample Tour Videos
                            </AppText>
                            <View style={styles.videoContainer}>
                                <View>
                                    <VideoView
                                        player={exampleVideo1}
                                        style={styles.video}
                                        contentFit="cover"
                                    />
                                    <View style={styles.overlay}>
                                        <AppText variant="body-sm" style={styles.overlayText}>
                                        Good Example Video
                                        </AppText>
                                    </View>
                                </View>
                                <View>
                                    <VideoView
                                        player={exampleVideo2}
                                        style={styles.video}
                                        contentFit="cover"
                                    />
                                    <View style={styles.overlay}>
                                        <AppText variant="body-sm" style={styles.overlayText}>
                                        Bad Example Video
                                        </AppText>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <AppButton text="Upload File" onPress={openAlbum}/>
                        </View>
                    </View>
                </View>
            )}
        />   

            
        <AppDrawer 
            ref={drawerRef}
            snapPoints={['50%','100%']}
            title='Preview Tour Video'
        >
            <View style={styles.sheetContent}>

                {selectedVideo && (
                <View style={styles.previewWrapper}>
                    <VideoView
                        player={selectedVideoPlayer}
                        style={styles.previewVideo}
                        contentFit="cover"
                    />
                    {/* Right Actions */}
                    <View style={[styles.rightActions, { bottom: 16 }]}>
                        <AppIconButton icon={<Feather name="heart" />} type="bare" />
                        <AppIconButton icon={<Feather name="message-circle" />} type="bare" />
                        <AppIconButton icon={<Feather name="repeat" />} type="bare" />
                    </View>

                    {/* Bottom Left */}
                    <View style={[styles.bottomLeft, { bottom: 16 }]}>
                        <AppText variant='body-md-strong'>${item.price} / month</AppText>
                        <AppText variant='body-sm' numberOfLines={2}>
                            {item.city}, {item.province}
                        </AppText>
                        <View style={styles.bottomCTA}> 
                        <AppButton 
                            text="Detail"
                            size="sm"
                            type='primary'
                        />
                        </View>
                    </View>
                </View>
                )}
                <Pressable 
                    style={styles.replaceButton} 
                    onPress={() => {
                                drawerRef.current?.close();
                                openAlbum();
                                }}
                >
                    <AppText variant='button-sm'>Replace Video</AppText>
                </Pressable>

                <View style={styles.sheetButtons}>
                    <View style={{ flex: 1 }}>
                        <AppButton
                            text="Cancel"
                            type='secondary'
                            onPress={() => {
                                setSelectedVideo(null)
                                drawerRef.current?.close();
                                router.push('/(tabs)/post');
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <AppButton
                            text="Continue"
                            onPress={() => {
                                drawerRef.current?.close();
                                router.push('post/stepFour');
                                // TODO: save video to form / upload
                            }}
                        />
                    </View>
                </View>
            </View>
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
    marginTop: 24,
  },
  titleContainer:{
    alignItems: 'center',
    gap: 8,
  },
  videoContainer:{
    paddingHorizontal: 56,
    gap: 12,
  },
  video: {
    width: '100%',
    aspectRatio: '9/16',
    backgroundColor: 'black',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // fills the video
    justifyContent: 'center',
    alignItems: 'center',
},
    overlayText: {
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    sheetContent: {
        gap: 20,
    },

    previewWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'black',
        borderWidth:1,
        borderColor: colors.semantic.input.border.normal.color,
    },

    previewVideo: {
        width: '100%',
        aspectRatio: 9 / 16,
    },

    sheetButtons: {
        width: '100%',
        flexDirection: 'row',
        gap: 12,
    },
    replaceButton:{
        margin: 'auto',
        borderBottomWidth:1,
        borderColor: '#ffffff'
    },
    bottomLeft: {
        position: 'absolute',
        left: 20,
        maxWidth: '70%',
    },
    bottomCTA: {
        marginTop: 12,
        width: 67,
    },
    rightActions: {
        position: 'absolute',
        right: 20,
        gap: 12,
        alignItems: 'center',
  },
});
