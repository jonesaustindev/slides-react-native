import React, { Component } from 'react';
import { View, Dimensions, Button } from 'react-native';
import { Video } from 'expo';

const win = Dimensions.get('window');

class VideoPreview extends Component {
    render() {
        const { video, navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Button
                    title='Close'
                    onPress={() => {
                        this.props.clearPhoto()
                        navigation.navigate('CameraScreen')
                    }}
                />
                <Button
                    title='Save'
                    onPress={() => {
                        this.props.videoFromCamera(video)
                        navigation.navigate('PostForm')
                        this.props.clearPhoto()
                    }}
                />
                <Video
                    source={{ uri: video }}
                    rate={1.0}
                    volume={1.0}
                    isMuted={false}
                    resizeMode="cover"
                    shouldPlay
                    isLooping
                    style={{ width: win.width, height: win.height }}
                />
            </View>
        );
    }
}

export default VideoPreview;