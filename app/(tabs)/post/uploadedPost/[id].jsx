import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Share, AppState, Pressable } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';
import { Feather } from '@expo/vector-icons';

import AppIconButton from '@/components/ui/appIconButton';
import ListingReelOverlay from '@/components/ui/listingReelOverlay';
import { DATA } from '@/data/mockListData';

const { height } = Dimensions.get('window');

export default function UploadedPost() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const item = id ? DATA.find(d => d.id === id) : DATA[0];

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      parent?.setOptions({
        tabBarStyle: { display: 'none' },
      });

      return () => {
        parent?.setOptions({
          tabBarStyle: { 
            display: 'flex',
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
    }, [navigation, insets])
  );
  

  const player = useVideoPlayer(item?.videoUrl, (player) => {
    if (!player) return;
    player.loop = true;
    player.muted = true;
  });

  const toggleMute = () => {
    player.muted = !player.muted;
  };


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
          icon={<Feather name="arrow-left" size={32} />}
          type="ghost"
          size="lg"
          onPress={() => router.push('(tabs)/post')}
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
        bottom={insets.bottom}
        onShare={onShare}
        onPressDetail={() => router.push(`/(tabs)/post/uploadedPost/detail/${item.id}`)}
        showMoreAction
        showShareAction
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
  bottomLeft: {
    position: 'absolute',
    left: 20,
    maxWidth: '70%',
  },
  bottomCTA: {
    marginTop: 12,
    width: 67,
  },
  username: {
    color: 'white',
    fontWeight: '600',
    marginBottom: 4,
  },
  question: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
});
