import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

const PERSONA_BASE_URL = 'https://inquiry.withpersona.com/verify';

export async function startPersonaVerification(referenceId = 'kozy-test-user') {
  const redirectUri = Linking.createURL('persona-verification');

  const params = new URLSearchParams({
    'inquiry-template-id': process.env.EXPO_PUBLIC_PERSONA_TEMPLATE_ID,
    'environment-id': process.env.EXPO_PUBLIC_PERSONA_ENVIRONMENT_ID,
    'reference-id': referenceId,
    'redirect-uri': redirectUri,
  });

  const result = await WebBrowser.openAuthSessionAsync(
    `${PERSONA_BASE_URL}?${params.toString()}`,
    redirectUri
  );

  return result;
}