import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, Share, Pressable, Image } from 'react-native';
import { FlatList } from 'react-native'; 
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppIconButton from '@/components/ui/appIconButton';
import AppButton from '@/components/ui/appButton';
import AppText from '@/components/ui/appText';
import { DATA } from '@/data/mockListData';
import { colors } from '@/constants/colors';
import { Avatar } from 'react-native-elements';

const { height } = Dimensions.get('window');
const SAVED_LISTINGS_KEY = 'savedListings';

export default function HomeScreen() {
  
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const [savedListings, setSavedListings] = useState([]);
  const [savedIds, setSavedIds] = useState(new Set());

  const loadSavedListings = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem(SAVED_LISTINGS_KEY);
      const parsed = stored ? JSON.parse(stored) : [];
      setSavedListings(parsed);
      setSavedIds(new Set(parsed.map((item) => item.id)));
    } catch (error) {
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
function ReelItem({ item, isActive, insets, isSaved, onToggleSave, onShare, onMorePress }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const player = useVideoPlayer(item.videoUrl, (player) => {
    player.loop = true;
    player.muted = true;
  });
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  }

  // 🔑 THIS is what actually starts video playback
  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive]);

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
      
      {/* Right Actions */}
      <View style={[styles.rightActions, { bottom: insets.bottom + 76 }]}>
        <AppIconButton
          icon={<MaterialIcons name={isSaved ? "favorite" : "favorite-border"} />}
          type='bare'
          onPress={() => onToggleSave(item)}
        />
        <AppIconButton icon={<Feather name="share-2" />} type="bare" onPress={() => onShare(item)} />
         <AppIconButton icon={<Feather name="more-horizontal" />} type="bare" onPress={toggleDropdown} />
         {isDropdownOpen && (
          <Pressable 
            style={styles.rightActionsdDropdown} 
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/account/contactUs',
                  params: { backTo: '/(tabs)/home' },
                })
              }
          >
            <AppText varient="caption" color="error">Report</AppText>
          </Pressable>
         )}
         
      </View>

      {/* Bottom Left */}
      <View style={[styles.bottomLeft, { bottom: insets.bottom + 76 }]}>
        <View style={styles.bottomRoomInfo}>
          <Avatar
            source={{ uri: item.owner.avatar[0] }}
            size={44}
            rounded
            containerStyle={{ backgroundColor: 'gray' }}
          />
          <View style={styles.bottomInfo}>
            <AppText variant='body-md-strong'>{item.title}</AppText>
            <AppText variant='body-md'>${item.price} / month</AppText>
          </View>
          <View style={styles.bottomCTA}> 
            <AppButton 
              text="Detail"
              size="sm"
              type='primary'
              onPress={() => router.push(`/home/${item.id}`)}
            />
          </View>
        </View>
        <AppText variant='body-sm-strong' numberOfLines={2}>
            #{item.city} #{item.province}
          </AppText>
      </View>
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
  rightActions: {
    position: 'absolute',
    right: 20,
    gap: 12,
    alignItems: 'center',
  },
  bottomLeft: {
    position: 'absolute',
    left: 20,
    maxWidth: '80%',
  },
  bottomCTA: {
    width: 67,
  },
  username: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  tag: {
    color: 'white',
    fontSize: 14,
    marginTop: 6,
  },
  rightActionsdDropdown: {
    width: 200,
    position: 'absolute',
    top: 10,
    right: 0,
    backgroundColor: colors.base.gray700,
    padding: 12,
    borderRadius: 10,
    zIndex: 200,
  },
  bottomInfo:{
    flex: 1,
  },
  bottomRoomInfo:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    gap: 10,
  }
});
