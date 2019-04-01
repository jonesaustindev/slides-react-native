import React, { Component } from 'react';
import { 
    Text, 
    View, 
    Button, 
    TouchableOpacity, 
    Image, 
    TouchableWithoutFeedback, 
    Platform 
} from 'react-native';
import { Camera, Permissions } from 'expo';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/cameraStyles';

class CameraScreen extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        cameraMode: true,
        flashMode: null,
        capturing: null,
        image: null,
        video: null,
        videoData: null,
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    }

    setFlashMode = (flashMode) => this.setState({ flashMode });

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.setState({ image: photo.uri })
        }
    };
    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, video: videoData.uri, videoData: videoData });
    }
    handleCaptureIn = () => this.setState({ capturing: true });
    handleCaptureOut = () => {
        if (this.state.capturing) {
            this.camera.stopRecording();
        }
    }

    clearPhoto = () => {
        this.setState({
            video: null,
            image: null,
        })
    }

    render() {
        const { navigation } = this.props;
        const { hasCameraPermission, flashMode, cameraType, capturing, captures, video, image, type, cameraMode } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        if (this.state.image) {
            return (
                <ImagePreview
                    imageFromCamera={navigation.state.params.imageFromCamera}
                    previewUri={this.state.image}
                    clearPhoto={this.clearPhoto}
                    {...this.props}
                />
            )
        }

        if (this.state.video) {
            return (
                <VideoPreview
                    videoFromCamera={navigation.state.params.videoFromCamera}
                    video={this.state.video}
                    videoData={this.state.videoData}
                    clearPhoto={this.clearPhoto}
                    {...this.props}
                />
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <Camera
                    style={{ flex: 1 }}
                    type={this.state.type}
                    getSupportedRatiosAsync='1:1'
                    ref={ref => { this.camera = ref; }}
                >
                    <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            style={{ padding: 20 }}
                            name='md-close'
                            color={'#fff'}
                            size={30}
                        />
                    </TouchableOpacity>
                    <View style={styles.ToolbarContainer}>
                        <View style={styles.Container}>
                            <View>
                                <TouchableOpacity
                                // onPress={() => setFlashMode(
                                //     flashMode === CameraFlashModes.on ? CameraFlashModes.off : CameraFlashModes.on
                                // )}
                                >
                                    <Ionicons
                                        name={'md-flash-off'}
                                        color='white'
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableWithoutFeedback
                                    onPress={this.snap}
                                    onPressIn={this.handleCaptureIn}
                                    onLongPress={this.handleLongCapture}
                                    onPressOut={this.handleCaptureOut}
                                >
                                    <View style={[styles.CaptureButton, capturing && styles.CaptureButtonActive]}>
                                        {capturing && <View style={styles.CaptureButtonInternal} />}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({
                                            type: this.state.type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back,
                                        });
                                    }}
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
                </Camera>
            </View>
        )
    }
}

export default CameraScreen;