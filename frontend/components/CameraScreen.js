import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';
import ImagePreview from './ImagePreview';

class CameraScreen extends Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        previewUri: null,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            this.setState({ previewUri: photo.uri })
        }
    };

    clearPhoto = () => {
        this.setState({
            previewUri: null
        })
    }

    render() {
        const { navigation } = this.props;
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }

        if (this.state.previewUri) {
            return (
                <ImagePreview
                    imageFromCamera={navigation.state.params.imageFromCamera} 
                    previewUri={this.state.previewUri}
                    clearPhoto={this.clearPhoto}
                    {...this.props}
                />
            )
        }

        return (
            <View style={{ flex: 1 }}>
                <Button
                    title='Close'
                    onPress={() => navigation.goBack()}
                />
                <Button
                    title='Take Photo'
                    onPress={this.snap}
                />
                <Camera
                    style={{ flex: 1 }}
                    type={this.state.type}
                    ref={ref => { this.camera = ref; }}
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            style={{
                                flex: 0.1,
                                alignSelf: 'flex-end',
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                });
                            }}>
                            <Text
                                style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                                {' '}Flip{' '}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }
}

export default CameraScreen;