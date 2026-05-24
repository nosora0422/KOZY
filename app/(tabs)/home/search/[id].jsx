import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Share, Pressable } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';

import AppIconButton from '@/components/ui/appIconButton';
import AppButton from '@/components/ui/appButton';
import AppText from '@/components/ui/appText';
import { DATA } from '@/data/mockListData';
import { colors } from '@/constants/colors';

const { height } = Dimensions.get('window');

export default function SearchResultListItem() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    id,
    location,
    budgetFrom,
    budgetTo,
    gender,
    roomTypes,
    lifestyleMatches,
  } = useLocalSearchParams();
  const item = id ? DATA.find(d => d.id === id) : DATA[0];
  const [isSaved, setIsSaved] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleBack = () => {
    router.replace({
      pathname: '/home/search/searchResult',
      params: {
        location: getParamString(location),
        budgetFrom: getParamString(budgetFrom),
        budgetTo: getParamString(budgetTo),
        gender: getParamString(gender),
        roomTypes: getParamString(roomTypes),
        lifestyleMatches: getParamString(lifestyleMatches),
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* 🔝 Top Bar */}
      <View style={[styles.topBar, { top: insets.top + 12 }]}>
        <AppIconButton
          icon={<Feather name="arrow-left" size={32} />}
          type="ghost"
          size="lg"
          onPress={handleBack}
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

      {/* Right Actions */}
      <View style={[styles.rightActions, { bottom: insets.bottom + 92 }]}>
        <AppIconButton
          icon={<MaterialIcons name={isSaved ? "favorite" : "favorite-border"} />}
          type='bare'
          onPress={handleToggleSave}
        />
        <AppIconButton icon={<Feather name="share-2" />} type="bare" onPress={onShare} />
        <AppIconButton icon={<Feather name="more-horizontal" />} type="bare" onPress={toggleDropdown} />
        {isDropdownOpen && (
          <Pressable
            style={styles.rightActionsdDropdown}
            onPress={() =>
              router.push({
                pathname: '/(tabs)/account/contactUs',
                params: { backTo: '/(tabs)/home/search' },
              })
            }
          >
            <AppText variant="caption" color="error">Report</AppText>
          </Pressable>
        )}
      </View>

      {/* Bottom Left */}
      <View style={[styles.bottomLeft, { bottom: insets.bottom + 92 }]}>
        <View style={styles.bottomRoomInfo}>
          <Avatar
            source={{ uri: item.owner.avatar[0] }}
            size={44}
            rounded
            containerStyle={{ backgroundColor: 'gray' }}
          />
          <View style={styles.bottomInfo}>
            <AppText variant='body-sm-strong'>{item.title}</AppText>
            <AppText variant='body-sm'>${item.price} / month</AppText>
          </View>
          <View style={styles.bottomCTA}>
            <AppButton
              text="Detail"
              size="sm"
              type='primary'
              onPress={() => router.push({
                pathname: '/home/[id]',
                params: {
                  id: item.id,
                  backTo: JSON.stringify({
                    pathname: '/home/search/[id]',
                    params: {
                      id: item.id,
                      location: getParamString(location),
                      budgetFrom: getParamString(budgetFrom),
                      budgetTo: getParamString(budgetTo),
                      gender: getParamString(gender),
                      roomTypes: getParamString(roomTypes),
                      lifestyleMatches: getParamString(lifestyleMatches),
                    },
                  }),
                },
              })}
            />
          </View>
        </View>
        <AppText variant='body-sm-strong' numberOfLines={2}>
          #{item.city} #{item.province}
        </AppText>
      </View>
    </Pressable>
    </View>
  );
}

function getParamString(value) {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
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
    maxWidth: '80%',
  },
  bottomCTA: {
    width: 67,
  },
  rightActions: {
    position: 'absolute',
    right: 20,
    gap: 22,
    alignItems: 'center',
  },
  rightActionsdDropdown: {
    width: 200,
    position: 'absolute',
    top: 28,
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
    marginBottom: 8,
  },
});
