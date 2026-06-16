import { Image, StyleSheet, View } from 'react-native';

import { DATA } from '@/data/mockListData';
import AppText from '@/components/ui/appText';
import Badge from '@/components/ui/badge';
import DisplayField from '@/components/ui/displayField';

export default function ProfileSection({ userId, listing, title = 'Meet Your Roomate' }) {
  const item = listing ?? DATA.find((dataItem) => dataItem.owner.id === userId);
  const owner = item?.owner;

  if (!item || !owner) {
    return null;
  }

  return (
    <View style={styles.profileSection}>
      <Image
        source={{ uri: owner.avatar[0] }}
        style={styles.avatarImage}
        resizeMode="cover"
      />
      <View style={styles.ownerName}>
        <AppText variant="headline-md">
          {owner.name} {owner.ageGroup ? `, ${owner.ageGroup}` : ''}
        </AppText>
      </View>

      <DisplayField title="Profile" type="pill">
        {[owner.gender, owner.occupation]}
      </DisplayField>

      <DisplayField title="Personality" type="pill">
        {owner.personality}
      </DisplayField>

      <DisplayField title="Lifestyle" type="pill">
        {owner.lifestyle}
      </DisplayField>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  avatarImage: {
    width: '50%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 9999,
    marginHorizontal: 'auto',
  },
  ownerName: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  moveInText: {
    lineHeight: 14,
  },
});
