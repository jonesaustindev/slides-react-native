import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import ImagePreview from './ImagePreview';
import VideoPreview from './VideoPreview';
import CameraToolbar from './CameraToolbar';

// <View
//                         style={{
//                             flex: 1,
//                             backgroundColor: 'transparent',
//                             flexDirection: 'row',
//                         }}>
//                         <TouchableOpacity
//                             style={{
//                                 flex: 0.1,
//                                 alignSelf: 'flex-end',
//                                 alignItems: 'center',
//                             }}
//                             onPress={() => {
//                                 this.setState({
//                                     type: this.state.type === Camera.Constants.Type.back
//                                         ? Camera.Constants.Type.front
//                                         : Camera.Constants.Type.back,
//                                 });
//                             }}>
//                             <Text
//                                 style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                                 {' '}Flip{' '}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>

class CameraScreen extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        flashMode: null,
        capturing: null,
        cameraType: null,
        image: null,
        video: null,
        captures: [],
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    }

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });

    handleShortCapture = async () => {
        const imageData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, image: photoData });
    }

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, video: videoData });
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
        const { hasCameraPermission, flashMode, cameraType, capturing, captures, video, image } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        if (this.state.image) {
            return (
                <ImagePreview
                    imageFromCamera={navigation.state.params.imageFromCamera}
                    previewUri={this.state.image.uri}
                    clearPhoto={this.clearPhoto}
                    {...this.props}
                />
            )
        }

        if (this.state.video) {
            return (
                <VideoPreview
                    videoFromCamera={navigation.state.params.videoFromCamera} 
                    video={video.uri} 
                    clearPhoto={this.clearPhoto}
                    {...this.props}
                />
            )
        }

        console.log(this.state)

        return (
            <View style={{ flex: 1 }}>
                <Button
                    title='Close'
                    onPress={() => navigation.goBack()}
                />
                <Camera
                    style={{ flex: 1 }}
                    type={this.state.type}
                    ref={ref => { this.camera = ref; }}
                >
                    <CameraToolbar
                        capturing={capturing}
                        flashMode={flashMode}
                        cameraType={cameraType}
                        setFlashMode={this.setFlashMode}
                        setCameraType={this.setCameraType}
                        onCaptureIn={this.handleCaptureIn}
                        onCaptureOut={this.handleCaptureOut}
                        onLongCapture={this.handleLongCapture}
                        onShortCapture={this.handleShortCapture}
                    />
                </Camera>
            </View>
        )
    }
}

export default CameraScreen;