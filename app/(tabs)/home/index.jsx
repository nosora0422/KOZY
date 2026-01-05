import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, AppState, Pressable } from 'react-native';

import { FlatList } from 'react-native'; 
import { VideoView, useVideoPlayer } from 'expo-video';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import AppIconButton from '@/components/ui/appIconButton';
import AppButton from '@/components/ui/appButton';

import { DATA } from '@/data/mockListData';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

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

function ReelItem({ item, isActive, insets }) {
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
      <View style={[styles.rightActions, { bottom: insets.bottom + 100 }]}>
        <AppIconButton icon={<Feather name="heart" />} type="bare" />
        <AppIconButton icon={<Feather name="message-circle" />} type="bare" />
        <AppIconButton icon={<Feather name="repeat" />} type="bare" />
      </View>

      {/* Bottom Left */}
      <View style={[styles.bottomLeft, { bottom: insets.bottom + 100 }]}>
        <Text style={styles.username}>${item.price} / month</Text>
        <Text style={styles.question} numberOfLines={2}>
          {item.city}, {item.province}
        </Text>
        <View style={styles.bottomCTA}> 
          <AppButton 
            text="Detail"
            size="sm"
            type='primary'
            onPress={() => router.push(`/home/${item.id}`)}
          />
        </View>
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
    maxWidth: '70%',
  },
  bottomCTA: {
    marginTop: 12,
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
