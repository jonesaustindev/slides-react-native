import React from 'react';
import { View, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native';
import { Camera } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/cameraStyles';

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default ({
    capturing = false,
    cameraType = CameraTypes.back,
    flashMode = CameraFlashModes.off,
    setFlashMode, setCameraType, onCaptureIn,
    onCaptureOut, onLongCapture, onShortCapture,
}) => (
        <View style={styles.ToolbarContainer}>
            <View style={styles.Container}>
                <View>
                    <TouchableOpacity
                        onPress={() => setFlashMode(
                            flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
                        )}
                    >
                        <Ionicons
                            name={flashMode == CameraFlashModes.on ? 'md-flash' : 'md-flash-off'}
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableWithoutFeedback
                        onPressIn={onCaptureIn}
                        onPressOut={onCaptureOut}
                        onLongPress={onLongCapture}
                        onPress={onShortCapture}
                    >
                        <View style={[styles.CaptureButton, capturing && styles.CaptureButtonActive]}>
                            {capturing && <View style={styles.CaptureButtonInternal} />}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => setCameraType(
                            cameraType === CameraTypes.back ? CameraTypes.front : CameraTypes.back
                        )}
                    >
                        <Ionicons
                            name='md-reverse-camera'
                            color='white'
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )