import { useRef, useState, useCallback } from 'react';
import { Image } from 'expo-image';
import { useFocusEffect } from '@react-navigation/native';
import { Platform, StyleSheet, View, Dimensions, ScrollView, FlatList, } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PillGroup from '@/components/ui/pill/pillGroup';
import AppText from '@/components/ui/appText';
import FormField from '@/components/ui/form/formField';
import InputRow from '@/components/ui/layout/inputRow';
import DisplayField from '@/components/ui/displayField';
import AppDrawer from '@/components/ui/drawer/AppDrawer';
import DisplayInput from '@/components/ui/input/displayInput';
import { DATA } from '@/data/mockListData';
import { colors } from '@/constants/colors';
import Dropdown from '@/components/ui/input/dropdown';
import TextField from '@/components/ui/input/textField';
import TextArea from '@/components/ui/input/textArea';
import AppButton from '@/components/ui/appButton';
import MediaInput from '@/components/ui/input/mediaInput';
import mockPickImage from '@/services/mockMediaUpload';
import validateImage from '@/utils/mediaValidation';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_SPACING = 12;
const IMAGE_HEIGHT = 228;


export default function EditProfile() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();
    const { id } = useLocalSearchParams();
    const item = DATA[0];
    const genderDrawerRef = useRef(null);
    const personalityDrawerRef = useRef(null);
    const jobDrawerRef = useRef(null);
    const lifestyleDrawerRef = useRef(null);
    const aboutMeDrawerRef = useRef(null);
    const myEmailDrawerRef = useRef(null);
    const emailConfirmDrawerRef = useRef(null);
    const emailEditDrawerRef = useRef(null);
    const emailCheckDrawerRef = useRef(null);
    const photoDrawerRef = useRef(null);
    const photoConfirmDrawerRef = useRef(null);
    const [personality, setPersonality] = useState([]);
    const [lifestylePreferences, setLifestylePreferences] = useState([]);
    const [gender, setGender] = useState(null);
    const [job, setJob] = useState(null);
    const [aboutMe, setAboutMe] = useState('');
    const [error, setError] = useState(null);
    const [myEmail, setMyEmail] = useState(null);
    // const [photos, setPhotos] = useState(
    //       (item.owner.avatar ?? []).slice(0, 2).map(uri => ({
    //         uri,
    //         type: 'image/jpeg',
    //         fileSize: 0, // existing avatar, not newly uploaded
    //       }))
    //     );
    const [photos, setPhotos] = useState([]);
    const [photoError, setPhotoError] = useState(null);

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

  const addPhoto = async () => {
    if (photos.length >= 2) {
      setPhotoError('You can upload up to 2 profile photos.');
      return;
    }

    try {
      const files = await mockPickImage();

      for (const file of files) {
        if (photos.length >= 2) break;

        const error = validateImage(file);
        if (error) {
          setPhotoError(error);
          return;
        }

        setPhotos(prev => [...prev, file]);
      }

      setPhotoError(null);
    } catch {
      // cancelled
    }
  };


  return (
    <View style={{ flex: 1, overflow: 'visible' }}>
      <FlatList
        data={[{ key: 'content' }]}
        keyExtractor={(item) => item.key}
        keyboardShouldPersistTaps="always"
        renderItem={() => (
          <View style={styles.container}>
            <View style={styles.sliderContainer}>
              {/* Image carousel */}
              <FlatList
                data={item.owner.avatar}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + ITEM_SPACING}
                decelerationRate="fast"
                keyExtractor={(uri, index) => `${uri}-${index}`}
                contentContainerStyle={{
                  paddingRight: (SCREEN_WIDTH - ITEM_WIDTH) / 2,
                  paddingVertical: 20,
                }}
                renderItem={({ item: image }) => (
                  <View style={{ width: ITEM_WIDTH, marginRight: ITEM_SPACING }}>
                    <Image
                      source={{ uri: image }}
                      style={styles.image}
                      contentFit="cover"
                    />
                  </View>
                )}
              />
              <View style={styles.uploadButtonContainer}>
                <AppButton 
                  text="Upload" 
                  onPress={() => photoDrawerRef.current?.snapToIndex(0)} 
                  type="secondary" 
                  size='sm'
                />
              </View>
            </View>
            {/* Help Text */}
            <DisplayField title="My Profile" style={{ marginBottom: 16 }}>
              Keeping your ID, photo, and profile details up to date helps us build trust in the KOZY community.
            </DisplayField>

            {/* Inputs */}
            <DisplayInput
              label="Gender"
              value={gender}
              placeholder="Select an option"
              onPress={() => genderDrawerRef.current?.snapToIndex(0)}
            />
            <DisplayInput
              label="Job or Profession"
              value={job}
              placeholder="Enter your job or profession"
              onPress={() => jobDrawerRef.current?.snapToIndex(0)}
            />
            <DisplayInput
              label="Personality"
              value={personality}
              isMulti={true}
              max={3}
              placeholder="+"
              onPress={() => personalityDrawerRef.current?.snapToIndex(0)}
            />
            <DisplayInput
              label="Lifestyle Preferences"
              value={lifestylePreferences}
              isMulti={true}
              max={3}
              placeholder="+"
              onPress={() => lifestyleDrawerRef.current?.snapToIndex(0)}
            />
            <DisplayInput
              label="About Me"
              value={aboutMe}
              isTextArea={true}
              placeholder="Tap to write"
              onPress={() => aboutMeDrawerRef.current?.snapToIndex(0)}
            />
            <View style={styles.idVerificationContainer}>
              <AppText variant="body-sm-strong" color="primary">
                ID Verification
              </AppText>
              <View style={{ width: 92 }}>
                <AppButton 
                  text="Verify"
                  size="sm"
                  type='secondary'
                  onPress={() => myEmailDrawerRef.current?.snapToIndex(0)}
                />
              </View>
            </View>
            <View style={styles.emailContainer}>
              <DisplayInput
                label="My Email"
                value={myEmail}
                onChangeText={setMyEmail}
                placeholder="Please Verify your email."
                style={{ flex: 1 }}
              />
              <View style={{ width: 92, marginBottom: 14 }}>
                  <AppButton 
                    text="Edit Email"
                    size="sm"
                    type='secondary'
                    onPress={() => emailEditDrawerRef.current?.snapToIndex(0)}
                  />
                </View>
            </View>
          </View>
        )}
      />
      {/* Drawers */}
      <AppDrawer
            ref={genderDrawerRef}
            title="What’s your gender?"
            primaryAction={() => genderDrawerRef.current?.close()}
          >
            <Dropdown
              value={gender}
              onChange={setGender}
              options={[
                { label: "Female", value: "Female" },
                { label: "Male", value: "Male" },
                { label: "Non-binary", value: "Non-binary" },
              ]}
            />
      </AppDrawer>
      <AppDrawer
            ref={jobDrawerRef}
            title="What’s your job or profession?"
            description="Tell us what your profession is."
            primaryAction={() => jobDrawerRef.current?.close()}
          >
            <FormField label="" error={error}>
              <InputRow>
                <TextField placeholder="ex: Software Engineer" error={!!error}/>
              </InputRow>
            </FormField>
      </AppDrawer>
      <AppDrawer
            ref={personalityDrawerRef}
            title="What’s your personality?"
            description="Let others know your vibe. Select words that reflect your personality."
            primaryAction={() => personalityDrawerRef.current?.close()}
          >
            <PillGroup
              items={[
                { label: 'Friendly', value: 'Friendly' },
                { label: 'Independent', value: 'Independent' },
                { label: 'Calm', value: 'Calm' },
                { label: 'Respectful', value: 'Respectful' },
                { label: 'Introverted', value: 'Introverted' },
                { label: 'Extroverted', value: 'Extroverted' },
              ]}
              value={personality}
              onChange={setPersonality}
            />
      </AppDrawer>
      <AppDrawer
            ref={lifestyleDrawerRef}
            title="What’s your lifestyle?"
            description="Your daily habits matter in shared spaces. Choose your lifestyle preferences."
            primaryAction={() => lifestyleDrawerRef.current?.close()}
          >
            <PillGroup
              items={[
                { label: 'Early Bird', value: 'Early Bird' },
                { label: 'Night Owl', value: 'Night Owl' },
                { label: 'Homebody', value: 'Homebody' },
                { label: 'Out & About', value: 'Out & About' },
                { label: 'Clean & Tidy', value: 'Clean & Tidy' },
                { label: 'Easygoing', value: 'Easygoing' },
                { label: 'Smoker', value: 'Smoker' },
                { label: 'Non-Smoker', value: 'Non-Smoker' },
                { label: 'Work from Home', value: 'Work from Home' },
                { label: 'Go to Office', value: 'Go to Office' },
              ]}
              value={lifestylePreferences}
              onChange={setLifestylePreferences}
            />
      </AppDrawer>
      <AppDrawer
            ref={aboutMeDrawerRef}
            title="What your story?"
            description="Tell us what your short story."
            primaryAction={() => aboutMeDrawerRef.current?.close()}
          >
            <FormField label="" error={error}>
                <TextArea placeholder="ex: Software Engineer" error={!!error}/>
            </FormField>
      </AppDrawer>
      <AppDrawer
            ref={myEmailDrawerRef}
            title="Verify Your Identity"
            align="center"
            primaryActionText="Start Verification"
            primaryAction={() => {
              myEmailDrawerRef.current?.close()
              emailConfirmDrawerRef.current?.snapToIndex(0)
            }}
          >
            <AppText variant='body-xsm' style={{ marginBottom: 16, textAlign: 'center' }}>
              For security and trust, please verify your identity. This only takes a few minutes.
            </AppText>
            <AppText variant='body-xsm' style={{ textAlign: 'center' }}>
            *We use [서비스명] to securely verify your ID.
            </AppText>
      </AppDrawer>
      <AppDrawer
            ref={emailConfirmDrawerRef}
            title="Your Identity verified"
            description="Your ID has been verified successfully."
            align="center"
            primaryActionText="Done"
            primaryAction={() => emailConfirmDrawerRef.current?.close()}
          >
      </AppDrawer>
      <AppDrawer
            ref={emailEditDrawerRef}
            title="Update email address"
            align="center"
            description="Enter Your School or Work Email"
            primaryActionText="Send Verification Code"
            primaryAction={() => {
              emailEditDrawerRef.current?.close()
              emailCheckDrawerRef.current?.snapToIndex(0)
            }}
          >
            <View>
              <AppText variant='body-xsm'>
                ✶ We’ll send a verification code to confirm your email.
              </AppText>
              <AppText variant='body-xsm'>
              ✶ For secure matching, please use your school or work email address.
              </AppText>
            </View>
            <View style={{ marginTop: 54 }}>
              <FormField label="" error={error}>
                  <TextField placeholder="youremail@gmail.com" error={!!error} type="auth"/>
              </FormField>
            </View>
      </AppDrawer>
      <AppDrawer
            ref={emailCheckDrawerRef}
            title="Update email address"
            align="center"
            description="We’ve sent a 6-digit code to your email. Enter the code to verify your email address."
            primaryActionText="Verify"
            secondaryActionText="Resend Code"
            primaryAction={() => {
              emailCheckDrawerRef.current?.close()
            }}
            secondaryAction={() => {
              emailCheckDrawerRef.current?.close()
            }}
          >
            
          <FormField label="" error={error}>
              <TextField placeholder="youremail@gmail.com" error={!!error} type="auth"/>
          </FormField>
      </AppDrawer>
      <AppDrawer
            ref={photoDrawerRef}
            title="Upload Profile Pictures"
            align="center"
            description="Upload 2 clear face photos to build trust and increase your match chances."
            primaryActionText="Save"
            primaryDisabled={photos.length === 0}
            primaryAction={() => {
              photoDrawerRef.current?.close();
              photoConfirmDrawerRef.current?.snapToIndex(0);
            }}
          >
          <FormField label="" error={photoError}>
            <MediaInput 
              error={!!photoError}
              onPress={addPhoto}
              photos={photos.map(p => p.uri)}
            />
          </FormField>
      </AppDrawer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 50 : 16,
  },
  mapContainer: {
    marginBottom: 24,
  },
  text:{
    color: 'white',
  },
  searchInput: {
    height: 40,
    color: colors.semantic.input.text,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.semantic.input.border.normal.color,
    borderBottomWidth: 1,
  },
  idVerificationContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginVertical: 24,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor: colors.semantic.input.border.normal.color,
  },
  emailContainer:{
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-end',
  },
  image: {
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: 4,
  },
  sliderContainer: {
    position: 'relative',
  },
  uploadButtonContainer:{
    position: 'absolute',
    bottom: 28,
    right: 12,
  }
});
