import { Platform, StyleSheet, ScrollView, View, Text } from 'react-native';
import { colors } from '@/constants/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Privacy() {
    const insets = useSafeAreaInsets();
  
  return (
    <ScrollView>
        <View style={styles.container}>
            <Text style={{color: colors.semantic.text.primary}}>
                Effective Date: [MM/DD/YYYY]
            </Text>
            <Text style={{
                color: colors.semantic.text.primary,
                marginVertical: 12,
                }}>
                Welcome to KOZY (“we,” “us,” or “our”). Your privacy is important to us, and we are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and protect your data when you use our app and services.
            </Text>
        <View>
            <Text style={{color: colors.semantic.text.primary, fontWeight: 'bold', fontSize: 18, marginBottom: 8}}>
                1. Information We Collect
            </Text>
            <View style={{ gap: 4 }}>
                {/* Intro */}
                <Text style={{ color: colors.semantic.text.primary }}>
                    We collect the following types of information:
                </Text>

                {/* a. Personal Information */}
                <Text style={{ color: colors.semantic.text.primary }}>
                    a. Personal Information
                </Text>
                <View style={{ paddingLeft: 12 }}>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Name, email address, gender, date of birth
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • School or workplace email for verification
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Profile information, preferences, and photos
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Uploaded content such as room listings, videos, or messages
                    </Text>
                </View>

                {/* b. Usage Data */}
                <Text style={{ color: colors.semantic.text.primary }}>
                    b. Usage Data
                </Text>
                <View style={{ paddingLeft: 12 }}>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • App usage behavior (e.g. likes, matches, saved listings)
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Interaction history with other users
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Device and log information (e.g. IP address, app version)
                    </Text>
                </View>

                {/* c. Location Information */}
                <Text style={{ color: colors.semantic.text.primary }}>
                    c. Location Information
                </Text>

                <Text style={{ color: colors.semantic.text.primary, paddingLeft: 12 }}>
                    • We may collect your location data (with permission) to show nearby
                    listings and improve search results.
                </Text>
            </View>
        </View>
        <View>
            <Text style={{
                color: colors.semantic.text.primary,
                fontWeight: 'bold', 
                fontSize: 18, 
                marginBottom: 8,
                paddingTop: 12
            }}>
                2. How We Use Your Information
            </Text>
             <View style={{ gap: 4 }}>
                {/* Intro */}
                <Text style={{ color: colors.semantic.text.primary }}>
                    We use your information to:
                </Text>
                <View style={{ paddingLeft: 12 }}>
                    {/* a. Personal Information */}
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Create and manage your user account
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Enable listing uploads, browsing, and chat functionality
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Match you with compatible users and listings
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary  }}>
                        • Maintain user safety and trust (via Trust Score features)
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Analyze and improve our services
                    </Text>
                    <Text style={{ color: colors.semantic.text.primary }}>
                        • Communicate with you about updates, offers, and support
                    </Text>
                </View>
                
            </View>

        </View>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 100 : 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
