import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    FormContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 20,
        minHeight: 400,
        marginTop: 10,
        marginLeft: 8,
        marginRight: 8,
    },
    FormInput: {
        paddingTop: 6,
        paddingBottom: 6,
    },
    ButtonContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    ButtonText: {
        color: 'white',
        fontSize: 16,
        padding: 10,
    },
    Button: {
        flexDirection: 'row',
        backgroundColor: '#89da59',
        padding: 8,
        borderRadius: 6,
        width: 60,
        justifyContent: 'space-around',
    },
    UploadButton: {
        backgroundColor: '#00aacc',
    },
    FormSubmitButton: {
        backgroundColor: '#89da59',
        width: 200,
        justifyContent: 'center',
    },
    FormSubmitButtonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 32,
    },
    UploadedImageContainer: {
        // flex: 1,
        display: 'flex',
        alignSelf: 'center',
        justifyContent: 'center',
        width: 200,
        height: 'auto',
    },
    UploadedImage: {
        maxWidth: '100%',
        height: 'auto',
        marginTop: 16,
        marginBottom: 16,
    },
    UploadedVideoContainer: {
        display: 'flex',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        margin: 36,
    },
    UploadedVideo: {
        width: '80%',
        height: win.height,
        marginTop: 16,
        marginBottom: 16,
    },
});

export default styles;