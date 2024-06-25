import { View, ScrollView, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import FriendProfile from './components/FriendProfile';

const FriendsPageView = ({ navigation, IDs, setFriendToAdd, friendToAdd, addFriendToList }) => (
    <View style={styles.container}>
        <View style={styles.friendContainer}>
            <TextInput
                style={styles.addFriendBox}
                placeholder="Enter your friend's username to add them."
                onChangeText={setFriendToAdd}
                value={friendToAdd} />
            <Button title='Add Friend' onPress={addFriendToList} />
        </View>
        <ScrollView style={styles.friendsList}>
        {IDs.map((id) =>
            <TouchableOpacity key={id} onPress={() => navigation.navigate("FriendsAquarium", { friendId: id })}>
                <FriendProfile id={id} navigation={navigation} />
            </TouchableOpacity>)}
        </ScrollView>
    </View>
);

export default FriendsPageView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
    addFriendBox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000000',
        width: '75%',
    },
    friendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 5,
    },

    friendsList: {
        height: '100%',
    }
});