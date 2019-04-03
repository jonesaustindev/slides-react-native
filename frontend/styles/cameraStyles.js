import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');
const landmarkSize = 2;

const styles = StyleSheet.create({
    ToolbarContainer: {
        flex: 1,
        flexDirection: 'column-reverse',
        padding: 20,
    },
    Container: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    CaptureButton: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    CaptureButtonActive: {
        width: 80,
        height: 80,
    },
    CaptureButtonInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    detectors: {
        flex: 0.5,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
        width: landmarkSize,
        height: landmarkSize,
        position: 'absolute',
        backgroundColor: 'red',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    row: {
        flexDirection: 'row',
    },
});

export default styles;