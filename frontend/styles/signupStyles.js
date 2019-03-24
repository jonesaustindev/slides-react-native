import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        color: '#fff',
        justifyContent: 'center',
        paddingRight: 32,
        paddingLeft: 32,
    },
    TextContainer: {
        borderWidth: 1,
        borderColor: '#89da59',
        padding: 16,
    },
    Text: {
        fontSize: 16,
        color: '#89da59',
        alignSelf: 'center',
    },
    BigText: {
        fontSize: 52,
        color: '#89da59',
        alignSelf: 'center',
    },
    SubmitButtonContainer: {
        marginTop: 48,
        backgroundColor: '#89da59',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        width: 200,
        borderRadius: 100,
    },
    SubmitButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    ChangeButton: {
        color: '#89da59',
    }
});

export default styles;