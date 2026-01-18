import { useState } from 'react';
import { Platform, StyleSheet, View, Alert } from 'react-native';


import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import TextField from '@/components/ui/input/textField';
import FormField from '@/components/ui/form/formField';
import TextArea from '@/components/ui/input/textArea';

export default function ContactUs() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [error, setError] = useState('');
    const [body, setBody] = useState('');

  return (
    <View style={styles.container}>
        <AppText variant="body-sm" color="primary">
            Have a question, feedback, or need support? We’re here to help. Reach out and we’ll get back to you as soon as possible.
        </AppText>

        <View style={{ paddingHorizontal:36 }}>
            <FormField error={error}>
                <TextField
                    value={name}
                    placeholder="Your Name"
                    onChangeText={(n) => setName(n)}
                    type='auth'
                />
            </FormField>
            <FormField error={error}>
                <TextField
                    value={email}
                    placeholder="Your Email"
                    onChangeText={(n) => setEmail(n)}
                    type='auth'
                />
            </FormField>
            <FormField error={error}>
                <TextArea
                    value={body}
                    placeholder="Tell us what you need help with."
                    onChangeText={(n) => setBody(n)}
                    
                />
            </FormField>
        </View>
        <View style={styles.buttonContainer}>
            <AppButton 
                text="Send Message"
                size="lg"
                type='primary'
                onPress={() => {
                    Alert.alert(
                        'Thank you for reaching out! We\'ll review your message and respond within 1–2 business days.',
                        `Still need help? \n Email us at \n [support@kozy.com]`,
                        {
                            text: 'Close',
                            style: 'cancel',
                        }
                    );
                }}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 50,
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
