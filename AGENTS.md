# AGENTS.md

## Project Overview
KOZY is an Expo React Native mobile app for roommate and room/listing discovery. The app uses video-first listing feeds, account/listing management screens, chat screens, and a multi-step post/listing flow.

Primary goals for changes in this repository:
- Keep implementation simple, readable, and production-oriented.
- Preserve the existing Expo Router structure and shared UI component patterns.
- Reuse theme tokens and existing UI components before adding new styles or components.
- Keep mobile UX, safe areas, keyboard behavior, and accessibility in mind.
- Minimize regression risk and avoid unrelated refactors.

## Tech Stack
- Expo SDK 54 with React Native 0.81 and React 19.
- Expo Router for file-based navigation.
- JavaScript and JSX. TypeScript is installed but this codebase currently uses JS/JSX.
- React Native `StyleSheet` for styling.
- `react-native-elements` is used in places and is theme-wrapped at the root.
- `@expo/vector-icons`, `expo-video`, `expo-image-picker`, `expo-blur`, `expo-haptics`, AsyncStorage, Reanimated, Gesture Handler, and Safe Area Context are available.
- npm is the package manager.

## Important Commands
- Install dependencies: `npm install`
- Start Expo: `npm start`
- iOS development build/simulator: `npm run ios`
- Android development build/simulator: `npm run android`
- Web preview: `npm run web`
- Lint: `npm run lint`

Before completing code changes, run `npm run lint` when practical. If a change affects routing, native behavior, media, or keyboard flows, manually verify the related screen in Expo as well.

## Repository Structure
- `app/` contains Expo Router routes and layouts.
- `app/_layout.jsx` loads fonts and wraps the app with Gesture Handler, React Navigation theme, React Native Elements theme, and `Slot`.
- `app/(auth)/` contains login, forgot password, and sign-up routes.
- `app/(auth)/signUp/` contains the multi-step signup flow.
- `app/(tabs)/` contains the main tab navigator.
- `app/(tabs)/home/` contains the video listing feed, search, and listing detail routes.
- `app/(tabs)/chat/` contains chat list and chat detail routes.
- `app/(tabs)/post/` contains listing creation, preview, confirmation, and uploaded listing routes.
- `app/(tabs)/account/` contains account, saved listing, my listing, edit profile, notification, privacy, trust, and contact routes.
- `components/ui/` contains shared app UI components.
- `components/ui/input/`, `form/`, `layout/`, `pill/`, `chat/`, and `drawer/` contain grouped component families.
- `constants/` contains theme, typography, font, and color tokens.
- `context/SignupContext.jsx` owns signup flow state.
- `data/` contains mock list/chat data.
- `services/` contains mock service helpers.
- `utils/` contains shared utilities such as media validation.
- `assets/videos/` contains local sample listing videos.
- `ios/` contains the generated iOS native project. Android config remains in `app.json`; do not regenerate or edit native Android files unless specifically asked.

## Navigation Patterns
- Use Expo Router primitives: `router.push`, `router.replace`, `router.back`, `usePathname`, `useLocalSearchParams`, and `useFocusEffect`.
- Keep route files inside the current grouped structure instead of introducing a parallel navigation system.
- Use grouped route paths consistently, for example `/(auth)/login`, `/(tabs)/home`, `/home/[id]`, `/post/stepOne`, and `chat/${id}`.
- Tab configuration lives in `app/(tabs)/_layout.jsx`; root providers live in `app/_layout.jsx`.
- Respect safe area insets on full-screen and tab screens with `useSafeAreaInsets`.

## Import and File Conventions
- Use the `@/` alias for app-local imports. It is configured in `jsconfig.json`.
- Components use PascalCase filenames or established existing filenames. Many existing shared UI files are camelCase, so match the local folder style when editing nearby code.
- Prefer named route/component helpers already present over creating duplicate utilities.
- Read nearby files before editing; this app has several repeated patterns that should stay visually consistent.

## UI and Styling Conventions
- Prefer shared components from `components/ui/`:
  - `AppText` for tokenized text.
  - `AppButton` for primary, secondary, ghost, and bare button styles.
  - `AppIconButton` for icon buttons.
  - `TextField`, `TextArea`, `Dropdown`, `RadioButton`, `CheckBox`, and `MediaInput` for form inputs.
  - `FormField` and `ErrorMessage` for labeled/error states.
  - `AppHeader`, `AppList`, pills, badges, chat bubbles, drawer, and layout helpers where applicable.
- Prefer colors from `constants/colors/` and typography from `constants/typography.js` or `getTypeStyle` in `constants/typographyStyles.js`.
- The current visual direction is dark, high-contrast, rounded, and mobile-first. Avoid introducing a separate palette or one-off hardcoded styling unless there is a specific reason.
- Use `StyleSheet.create` for component styles. Keep inline styles limited to dynamic values such as safe area padding, route params, or one-off layout overrides.
- Use OpenSans font tokens through existing typography helpers when possible.
- Avoid hardcoded dimensions that break on different device sizes, but preserve fixed dimensions where the existing UI intentionally uses compact controls, avatars, videos, or tab bar sizing.

## Accessibility and UX
- Add `accessibilityRole`, `accessibilityLabel`, and accessible press targets for interactive elements, especially icon-only buttons.
- Preserve keyboard-safe behavior on auth and form screens. Existing auth screens use `KeyboardAvoidingView` and `KeyboardAwareScrollView`.
- Handle loading, empty, and error states for new async flows.
- Avoid silent failures. Existing mock/local flows sometimes swallow errors; improve that only in the touched feature area.
- Verify text fits on small mobile screens and does not overlap tab bars, safe areas, or keyboard-driven layouts.

## State and Data Patterns
- Keep state local when it is screen-specific.
- Use context only for multi-screen flow state, following `SignupContext` as the current example.
- Existing listings and chat screens use mock data from `data/`. Keep mock data separate from UI and avoid hardcoding new data directly into screens.
- Existing saved listings use AsyncStorage with the `savedListings` key. Be careful to preserve item shape compatibility with `data/mockListData.js`.
- Media upload/picking is currently represented by mock helpers and local validation. Do not introduce backend/API assumptions without being asked.

## Media and Native Behavior
- Home feed videos use `expo-video` with `VideoView` and `useVideoPlayer`; keep playback scoped to active items to avoid performance regressions.
- Full-screen feed UI depends on absolute overlays and safe-area-aware bottom spacing for the floating tab bar.
- Image selection and validation should go through existing utility patterns before adding new file handling code.
- Reanimated's Babel plugin must remain last in `babel.config.js`.

## Known Local Sharp Edges
Check for these before assuming a pattern is safe to copy:
- Some files contain typos or temporary code, such as `varient`, `maxwidth`, `isLogedIn`, temporary auth booleans, placeholder share URLs, and mock data comments.
- Some shared components may need import or token cleanup before reuse in new places. For example, verify `AppHeader` imports and typography variants before extending it.
- `constants/colors/semantic.js` references `gray200` for disabled input borders, but `baseColors` currently does not define `gray200`.
- `README.md` is still mostly the default Expo README, so prefer this file and the codebase over README assumptions.
- The worktree may contain user changes. Never revert unrelated modified/deleted files unless explicitly asked.

## Code Quality Rules
- Prefer readable, focused functions over clever abstractions.
- Keep changes narrowly scoped to the requested feature or bug.
- Reuse existing shared components and utilities before creating new ones.
- Do not add dependencies unless the task clearly requires one and the existing stack cannot reasonably solve it.
- Avoid large refactors, route rewrites, design-system rewrites, or native project regeneration unless requested.
- Preserve existing behavior while improving the touched area.

## Testing Expectations
When modifying functionality:
- Run `npm run lint` when practical.
- Manually verify the affected route in Expo when UI behavior changes.
- For auth/form work, check empty, invalid, valid, keyboard, and back navigation states.
- For listing/feed work, check video playback, save/unsave state, share/report actions, and detail navigation.
- For post/listing creation work, check each step, validation, preview, and confirmation navigation.
- For account saved/my listing work, check list/detail paths and item shape assumptions.

## Completion Expectations
When finishing a task:
- Summarize what changed and why.
- Mention commands run and any commands that could not be run.
- Call out notable side effects, assumptions, or follow-up work.
- Keep the response concise and technical.
