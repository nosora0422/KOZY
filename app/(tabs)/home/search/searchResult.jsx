import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { VideoView, useVideoPlayer } from 'expo-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppText from '@/components/ui/appText';
import { colors } from '@/constants/colors';
import { DATA } from '@/data/mockListData';

export default function SearchResultScreen() {
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const roomTypes = useMemo(() => parseParamArray(params.roomTypes), [params.roomTypes]);
  const lifestyleMatches = useMemo(
    () => parseParamArray(params.lifestyleMatches),
    [params.lifestyleMatches]
  );

  const results = useMemo(() => {
    const location = getParamString(params.location).trim().toLowerCase();
    const budgetFrom = getParamString(params.budgetFrom);
    const budgetTo = getParamString(params.budgetTo);
    const gender = getParamString(params.gender);
    const min = Number(budgetFrom);
    const max = Number(budgetTo);
    const hasMin = budgetFrom.trim().length > 0 && Number.isFinite(min);
    const hasMax = budgetTo.trim().length > 0 && Number.isFinite(max);

    return DATA.filter((item) => {
      const price = Number(item?.price);
      const locationText = `${item?.street ?? ''} ${item?.city ?? ''} ${item?.province ?? ''} ${item?.postalCode ?? ''}`.toLowerCase();
      const lifestyleText = `${item?.owner?.lifestyle ?? ''} ${item?.owner?.personality ?? ''}`.toLowerCase();
      const roomText = `${item?.roomType ?? ''} ${item?.bathroomType ?? ''} ${item?.furnished ? 'Furnished' : 'Unfurnished'} ${item?.amenities ?? ''}`.toLowerCase();

      const matchesLocation = location.length === 0 || locationText.includes(location);
      const matchesBudget = (!hasMin || price >= min) && (!hasMax || price <= max);
      const matchesGender = !gender || item?.owner?.gender === gender;
      const matchesRoom =
        roomTypes.length === 0 ||
        roomTypes.some((type) => roomText.includes(String(type).toLowerCase()));
      const matchesLifestyle =
        lifestyleMatches.length === 0 ||
        lifestyleMatches.some((type) => lifestyleText.includes(String(type).toLowerCase()));

      return matchesLocation && matchesBudget && matchesGender && matchesRoom && matchesLifestyle;
    });
  }, [lifestyleMatches, params.budgetFrom, params.budgetTo, params.gender, params.location, roomTypes]);

  const handlePressListing = (id) => {
    router.push({
      pathname: '/home/search/[id]',
      params: {
        id,
        location: getParamString(params.location),
        budgetFrom: getParamString(params.budgetFrom),
        budgetTo: getParamString(params.budgetTo),
        gender: getParamString(params.gender),
        roomTypes: getParamString(params.roomTypes),
        lifestyleMatches: getParamString(params.lifestyleMatches),
      },
    });
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Math.max(insets.bottom, 16) + 24 },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.summary}>
        <AppText variant="body-xsm" color="placeholder">
          {results.length} {results.length === 1 ? 'listing' : 'listings'} found
        </AppText>
      </View>

      {results.length > 0 ? (
        <View style={styles.grid}>
          {results.map((item) => (
            <ResultVideoCard
              key={item.id}
              item={item}
              onPress={() => handlePressListing(item.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.emptyResults}>
          <AppText variant="body-sm" color="placeholder" style={styles.emptyResultsText}>
            No listings match these filters.
          </AppText>
        </View>
      )}
    </ScrollView>
  );
}

function ResultVideoCard({ item, onPress }) {
  const player = useVideoPlayer(item.videoUrl, (playerInstance) => {
    playerInstance.loop = true;
    playerInstance.muted = true;
    playerInstance.play();
  });

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.title}`}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.video}>
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          pointerEvents="none"
        />
      </View>
      <View style={styles.cardInfo}>
        <AppText variant="body-xsm-strong" color="primary" numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText variant="body-xsm" color="placeholder" numberOfLines={1}>
          {item.city}, {item.province}
        </AppText>
        <AppText variant="body-xsm-strong" color="primary">
          ${item.price} / month
        </AppText>
      </View>
    </Pressable>
  );
}

function parseParamArray(value) {
  const stringValue = getParamString(value);
  if (!stringValue) return [];

  try {
    const parsed = JSON.parse(stringValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getParamString(value) {
  if (Array.isArray(value)) return value[0] ?? '';
  return value ?? '';
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.base.background,
  },
  content: {
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  summary: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47.5%',
    gap: 8,
  },
  video: {
    width: '100%',
    aspectRatio: 0.78,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.base.gray800,
  },
  cardInfo: {
    gap: 2,
  },
  pressed: {
    opacity: 0.75,
  },
  emptyResults: {
    minHeight: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultsText: {
    textAlign: 'center',
  },
});
