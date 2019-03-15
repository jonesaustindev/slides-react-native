import { StyleSheet, Dimensions } from 'react-native';

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    ////// SINGLE POST ///////
    ScrollContainer: {
        flex: 1,
    },
    TextBold: {
        fontWeight: 'bold',
    },
    HR: {
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
    },
    ContentContainer: {
        marginTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
        width: win.width,
    },
    ButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    ButtonText: {
        color: 'white',
    },
    Button: {
        flexDirection: 'row',
        backgroundColor: 'red',
        padding: 8,
        borderRadius: 6,
        width: 60,
        justifyContent: 'space-around',
    },
    Image: {
        borderRadius: 6,
    },
    Meta: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 80,
        paddingTop: 8,
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 16,
    },
    UserContainer: {
        // flex: 4,
        flexDirection: 'row',
        paddingTop: 8,
        paddingRight: 8,
        paddingLeft: 8,
        paddingBottom: 8,
    },
    User: {
        flex: 1,
    },
    UserText: {
        paddingTop: 4,
        marginRight: 16,
    },
    UserImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'black',
        marginRight: 8,
    },
    CommentsContainer: {
        minHeight: 100,
    },
    CommentsTitle: {
        paddingLeft: 8,
        paddingTop: 8,
        paddingBottom: 16,
    },
    Comments: {
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
    },
    CommentUserContainer: {
        flex: 1,
    },
    CommentUser: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'red',
    },

    //////// ALL POSTS ////////
    postContainer: {
        flex: 1,
        width: win.width,
        paddingRight: 8,
        paddingLeft: 8,
        flexDirection: 'column',
        margin: 10,
    },
    postTitleContainer: {
        marginBottom: 12,
    },
    postTitleText: {
        fontSize: 20,
    },
    postImages: {
        borderRadius: 6,
    },
});

export default styles;