import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Platform,
    StyleSheet,
} from 'react-native';
import { Camera, Permissions, FaceDetector, Constants, takeSnapshotAsync } from 'expo';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/cameraStyles';

const landmarkSize = 2;

// {renderLandmark(face.leftEarPosition)}
//                 {renderLandmark(face.rightEarPosition)}
//                 {renderLandmark(face.leftCheekPosition)}
//                 {renderLandmark(face.rightCheekPosition)}
//                 {renderLandmark(face.leftMouthPosition)}
//                 {renderLandmark(face.mouthPosition)}
//                 {renderLandmark(face.rightMouthPosition)}
//                 {renderLandmark(face.noseBasePosition)}
//                 {renderLandmark(face.bottomMouthPosition)}

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
        faceDetecting: true,
        faceDetected: false,
        faces: [],
        ratio: '4:3',
        ratios: [],
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
            const photo = await this.camera.takePictureAsync();
            this.setState({ image: photo.uri })
        }
    };
    snapShot = async () => {
        if (this.camera) {
            const ratios = this.getRatios()
            const photo = await takeSnapshotAsync(this.camera, {
                result: 'file',
                height: this.state.ratio,
                width: this.state.ratio,
                quality: 1,
                format: 'jpg',
            })
            console.log(this.state.ratio)
            console.log(photo)
        }
    }
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

    getRatios = async () => {
        const ratios = await this.camera.getSupportedRatios();
        return ratios;
    };

    setRatio = ratio => this.setState({ ratio });

    onFacesDetected = ({ faces }) => {
        this.setState({ faces })
    };
    onFaceDetectionError = state => {
        console.warn('Faces detection error:', state)
    };
    renderFace({ bounds, faceID, rollAngle, yawAngle }) {
        return (
            <View
                key={faceID}
                transform={[
                    { perspective: 600 },
                    { rotateZ: `${rollAngle.toFixed(0)}deg` },
                    { rotateY: `${yawAngle.toFixed(0)}deg` },
                ]}
                style={[
                    styles.face,
                    {
                        ...bounds.size,
                        left: bounds.origin.x,
                        top: bounds.origin.y,
                    },
                ]}>
                <Text style={styles.faceText}>ID: {faceID}</Text>
                <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
                <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
            </View>
        );
    }

    renderLandmarksOfFace(face) {
        const { height, width } = face.bounds.size
        const renderLandmark = position =>
            position && (
                <View
                    style={[
                        styles.landmark,
                        {
                            left: position.x - landmarkSize / 2,
                            top: position.y - landmarkSize / 2,
                        },
                    ]}
                >
                    <Image
                        source={require('../assets/googly.jpg')}
                        style={[
                            styles.googly,
                            {
                                height: height / 5,
                                width: height / 5,
                            }
                        ]}
                    />
                </View>
            );
        return (
            <View key={`landmarks-${face.faceID}`}>
                {renderLandmark(face.leftEyePosition)}
                {renderLandmark(face.rightEyePosition)}
            </View>
        );
    }
    renderFaces = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderFace)}
        </View>
    )

    renderLandmarks = () => (
        <View style={styles.facesContainer} pointerEvents="none">
            {this.state.faces.map(this.renderLandmarksOfFace)}
        </View>
    )

    render() {
        const { navigation } = this.props;
        const { hasCameraPermission, flashMode, cameraType, capturing, captures, video, image, type, cameraMode, faces } = this.state;

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
                    ratio={this.state.ratio}
                    ref={ref => { this.camera = ref; }}
                    onFacesDetected={this.state.faceDetecting ? this.onFacesDetected : undefined}
                    onFaceDetectionError={this.onFaceDetectionError}
                    faceDetectorSettings={{
                        mode: FaceDetector.Constants.Mode.fast,
                        detectLandmarks: FaceDetector.Constants.Mode.accurate
                    }}
                // autoFocus={on}
                >
                    <View style={styles.Container}>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => {
                                this.setState({
                                    faceDetecting: !this.state.faceDetecting,
                                })
                            }}
                        >
                            <Ionicons
                                style={{ padding: 20 }}
                                name='md-contact'
                                color={'#fff'}
                                size={30}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.goBack()}
                        >
                            <Ionicons
                                style={{ padding: 20 }}
                                name='md-close'
                                color={'#fff'}
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                    {this.state.faceDetecting && this.renderLandmarks()}
                    <View style={styles.ToolbarContainer}>
                        <View style={styles.Container}>
                            <View>
                                <TouchableOpacity
                                // onPress={() => setFlashMode(
                                //     flashMode === this.camera.flashMode.on ? this.camera.flashMode.off : this.camera.flashMode.on
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