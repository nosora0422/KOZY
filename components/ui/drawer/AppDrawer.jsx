import { forwardRef, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import AppText from '@/components/ui/appText';
import AppButton from '@/components/ui/appButton';
import { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

import { colors } from '@/constants/colors';

const AppDrawer = forwardRef(
  (
    {
      title,
      children,
      primaryAction,
      secondaryAction,
      primaryActionText,
      secondaryActionText,
      description,
      align,
      buttonText
    },
    ref
  ) => {

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={['60%', '85%']}
        enablePanDownToClose
        backgroundStyle={{
            backgroundColor: colors.semantic.bottomSheet.background,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingHorizontal: 22,
        }}
        backdropComponent={(props) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
            />
        )}
        handleIndicatorStyle ={{ backgroundColor: colors.semantic.bottomSheet.handleIndicator }}
      >
        
        <BottomSheetView style={ styles.sheetContainer }>
            {/* Header */}
            <View style={styles.header}>
                <AppText variant="headline-md" style={ align == "center" ? {textAlign: 'center'} : null }>{title}</AppText>
            </View>
            
            {/* Description */}
            {description && 
            <View style={styles.description}>
                <AppText variant="body-sm" style={ align == "center" ? {textAlign: 'center'} : null }>{description}</AppText>
            </View>}

            {/* Scrollable Content */}
            <View style={styles.content}>
                {children}
            </View>

            {/* Footer */}
            {primaryAction && (
                <View style={[styles.footer, { marginBottom: 12 }]}>
                    <AppButton text={primaryActionText || "Save"} onPress={primaryAction} type="primary" />
                </View>
            )}
            {secondaryAction && (
                <View style={styles.footer}>
                    <AppButton text={secondaryActionText || "Save"} onPress={secondaryAction} type="secondary" />
                </View>
            )}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default AppDrawer;

const styles = StyleSheet.create({
  sheetContainer: {
    paddingTop: 12,
    paddingBottom: 100,
    paddingHorizontal: 46,
  },
  sheetContainerCenter: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 12,
    paddingBottom: 100,
    paddingHorizontal: 46,
  },
  content: {
    paddingVertical: 50,
  },
  description: {
    marginTop: 12,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});