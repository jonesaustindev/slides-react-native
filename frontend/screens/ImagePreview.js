import React, { Component } from 'react';
import { Text, View, Button, Image } from 'react-native';

class ImagePreview extends Component {
    render() {
        const { previewUri, navigation } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Button
                    title='Close'
                    onPress={() => {
                        this.props.clearPhoto()
                        navigation.navigate('CameraScreen')
                    }}
                />
                <Image style={{ flex: 1 }} source={{ uri: previewUri }} />
            </View>
        )
    }
}

export default ImagePreview;