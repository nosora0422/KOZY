import { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AppText from '@/components/ui/appText';

import DisplayField from '@/components/ui/displayField';
import RadioButton  from '@/components/ui/input/radioButton';
import AppButton from '@/components/ui/appButton';

export default function Notification() {
    const [value, setValue] = useState(null);
    const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <View>
            <AppText variant="body-md-strong" color="primary">
                Notification Settings
            </AppText>
            <DisplayField title="Chat Notifications" style={{ marginTop: 24, marginBottom: 16 }}>
                Receive notifications for all chat messages and chat requests.
            </DisplayField>
            <View style={{ gap: 20 }}>
                <RadioButton
                    label="Off"
                    selected={value === 'off'}
                    onPress={() => setValue('off')}
                />
                <RadioButton
                    label="Push Notification"
                    selected={value === 'pushNotification'}
                    onPress={() => setValue('pushNotification')}
                />
                <RadioButton
                    label="Email"
                    selected={value === 'email'}
                    onPress={() => setValue('email')}
                />
                <RadioButton
                    label="Both Push & Email"
                    selected={value === 'both'}
                    onPress={() => setValue('both')}
                />
            </View>
      </View>
      <View style={styles.buttonContainer}>
        <AppButton 
            text="Save"
            size="lg"
            type='primary'
            onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
