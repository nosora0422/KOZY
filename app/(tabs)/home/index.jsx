import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Share, Pressable, FlatList } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppIconButton from '@/components/ui/appIconButton';
import ListingReelOverlay from '@/components/ui/listingReelOverlay';
import { DATA } from '@/data/mockListData';

const { height } = Dimensions.get('window');
const SAVED_LISTINGS_KEY = 'savedListings';

export default function HomeScreen() {
  
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const [, setSavedListings] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());

  const loadSavedListings = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(SAVED_LISTINGS_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setSavedListings(parsed);
      setSavedIds(new Set(parsed.map((item) => item.id)));
    } catch (_error) {
      // noop
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSavedListings();
    }, [loadSavedListings])
  );

  const handleToggleSave = useCallback((item) => {
    setSavedListings((prev) => {
      const exists = prev.some((saved) => saved.id === item.id);
      const next = exists
        ? prev.filter((saved) => saved.id !== item.id)
        : [item, ...prev];

      setSavedIds(new Set(next.map((saved) => saved.id)));
      AsyncStorage.setItem(SAVED_LISTINGS_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const onShare = async () => {
    try {
      await Share.share({
        message: "Check this out! 👀",
        url: "https://example.com", // iOS
        title: "Share link",        // Android
      });
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔝 Top Bar */}
      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <AppIconButton
          icon={<Feather name="search" />}
          type="ghost"
          size="lg"
          onPress={() => router.push('/home/search')}
        />
      </View>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item: reel, index }) => (
          <ReelItem
            item={reel}
            isActive={index === activeIndex}
            insets={insets}
            isSaved={savedIds.has(reel.id)}
            onToggleSave={handleToggleSave}
            onShare={onShare}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
        windowSize={3}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
      />
    </View>
  );
}

/* Reel Item*/
function ReelItem({ item, isActive, insets, isSaved, onToggleSave, onShare }) {
  const player = useVideoPlayer(item.videoUrl, (player) => {
    player.loop = true;
    player.muted = true;
  });

  // 🔑 THIS is what actually starts video playback
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  const toggleMute = () => {
    player.muted = !player.muted;
  };

  return (
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
        bottom={insets.bottom + 92}
        isSaved={isSaved}
        onToggleSave={onToggleSave}
        onShare={onShare}
        onPressDetail={() => router.push(`/home/${item.id}`)}
        onPressReport={() =>
          router.push({
            pathname: '/(tabs)/account/contactUs',
            params: { backTo: '/(tabs)/home' },
          })
        }
        showMoreAction
      />
    </Pressable>
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
