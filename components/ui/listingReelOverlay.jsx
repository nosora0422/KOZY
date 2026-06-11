import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';

import AppButton from '@/components/ui/appButton';
import AppIconButton from '@/components/ui/appIconButton';
import AppText from '@/components/ui/appText';
import { colors } from '@/constants/colors';

export default function ListingReelOverlay({
  item,
  bottom,
  isSaved,
  onToggleSave,
  onShare,
  onPressDetail,
  onPressReport,
  showMoreAction = false,
  showRepeatAction = false,
  showSaveAction = false,
  showShareAction = false,
  onRepeat,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const hasRightActions = showMoreAction || showRepeatAction || showSaveAction || showShareAction;

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handlePressReport = () => {
    setIsDropdownOpen(false);
    onPressReport?.();
  };

  return (
    <>
    {hasRightActions ? (
        <View style={[styles.rightActions, { bottom }]}>
          {showSaveAction ? (
            <AppIconButton
              icon={<MaterialIcons name={isSaved ? 'favorite' : 'favorite-border'} />}
              type="bare"
              onPress={() => onToggleSave?.(item)}
            />
          ) : null}
          {showShareAction ? (
            <AppIconButton
              icon={<Feather name="share-2" />}
              type="bare"
              onPress={() => onShare?.(item)}
            />
          ) : null}
          {showMoreAction ? (
            <>
              <AppIconButton
                icon={<Feather name="more-horizontal" />}
                type="bare"
                onPress={handleToggleDropdown}
              />
              {isDropdownOpen ? (
                <Pressable style={styles.dropdown} onPress={handlePressReport}>
                  <AppText variant="caption" color="error">
                    Report
                  </AppText>
                </Pressable>
              ) : null}
            </>
          ) : null}
          {showRepeatAction ? (
            <AppIconButton icon={<Feather name="repeat" />} type="bare" onPress={onRepeat} />
          ) : null}
        </View>
        ) : null
      }
      <View style={[styles.bottomLeft, { bottom, maxWidth: hasRightActions ? '80%' : '90%' }]}>
        <View style={styles.bottomRoomInfo}>
          <Avatar
            source={{ uri: item?.owner?.avatar?.[0] }}
            size={44}
            rounded
            containerStyle={styles.avatar}
          />
          <View style={styles.bottomInfo}>
            <AppText variant="body-sm-strong" numberOfLines={1}>
              {item?.title}
            </AppText>
            <AppText variant="body-sm">
              ${item?.price} / month
            </AppText>
          </View>
          <View style={styles.bottomCTA}>
            <AppButton text="Detail" size="sm" type="primary" onPress={onPressDetail} />
          </View>
        </View>
        <AppText variant="body-sm-strong" numberOfLines={2}>
          #{item?.city} #{item?.province}
        </AppText>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  rightActions: {
    position: 'absolute',
    right: 20,
    gap: 22,
    alignItems: 'center',
  },
  dropdown: {
    width: 200,
    position: 'absolute',
    top: 28,
    right: 0,
    backgroundColor: colors.base.gray700,
    padding: 12,
    borderRadius: 10,
    zIndex: 200,
  },
  bottomLeft: {
    position: 'absolute',
    left: 20,
  },
  bottomRoomInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: 'gray',
  },
  bottomInfo: {
    flex: 1,
  },
  bottomCTA: {
    width: 67,
  },
});
