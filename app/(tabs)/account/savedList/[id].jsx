import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Share, Pressable } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppIconButton from '@/components/ui/appIconButton';
import ListingReelOverlay from '@/components/ui/listingReelOverlay';
import { DATA } from '@/data/mockListData';

const { height } = Dimensions.get('window');

export default function SavedList() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const item = id ? DATA.find(d => d.id === id) : DATA[0];
  const [isSaved, setIsSaved] = useState(false);

  const loadSavedState = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('savedListings');
      const parsed = stored ? JSON.parse(stored) : [];
      setIsSaved(parsed.some((saved) => saved.id === item?.id));
    } catch (_error) {
      setIsSaved(false);
    }
  }, [item?.id]);

  useFocusEffect(
    useCallback(() => {
      loadSavedState();
    }, [loadSavedState])
  );

  const handleToggleSave = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('savedListings');
      const parsed = stored ? JSON.parse(stored) : [];
      const exists = parsed.some((saved) => saved.id === item?.id);
      const next = exists
        ? parsed.filter((saved) => saved.id !== item?.id)
        : [item, ...parsed];

      await AsyncStorage.setItem('savedListings', JSON.stringify(next));
      setIsSaved(!exists);
      router.back();
    } catch (_error) {
      // noop
    }
  }, [item]);

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

  const onShare = async () => {
      try {
        await Share.share({
          message: "Check this out! 👀",
          url: "https://example.com", // iOS uses this
          title: "Share link",        // Android uses this
        });
      } catch (error) {
        console.error("Share error:", error);
      }
    };

  const player = useVideoPlayer(item?.videoUrl, (player) => {
    if (!player) return;
    player.loop = true;
    player.muted = true;
  });

  const toggleMute = () => {
    player.muted = !player.muted;
  };

  return (
    <View style={styles.container}>
      {/* 🔝 Top Bar */}
      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <AppIconButton
          icon={<Feather name="arrow-left" size={32} />}
          type="ghost"
          size="lg"
          onPress={() => router.back()}
        />
      </View>
      <Pressable style={styles.reel} onPress={toggleMute}>
      {/* 🎥 Video */}
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        pointerEvents="none"
      />

      <ListingReelOverlay
        item={item}
        bottom={insets.bottom + 20}
        isSaved={isSaved}
        onToggleSave={handleToggleSave}
        onShare={onShare}
        onPressDetail={() => router.push(`/(tabs)/account/savedList/detail/${item.id}`)}
        showRepeatAction
      />
    </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  reel: {
    height,
    width: '100%',
    backgroundColor: 'black',
  },
  topBar: {
    position: 'absolute', 
    left: 16,
    zIndex: 10,
  },
});
