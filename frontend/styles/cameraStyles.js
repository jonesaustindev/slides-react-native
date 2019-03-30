import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

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
});

export default styles;