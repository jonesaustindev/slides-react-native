import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ButtonContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        margin: 8,
    },
    SignOutButton: {
        padding: 8,
        width: 75,
        backgroundColor: '#00aacc',
        justifyContent: 'center',
    },
    ButtonText: {
        color: '#fff',
    },
    UserContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
        paddingBottom: 35,
    },
    UserImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor: 'black',
    },
    UserName: {
        marginTop: 16,
        fontSize: 24,
    },
    PostsTitleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    PostsTitle: {
        fontSize: 16,
    },
});

export default styles;