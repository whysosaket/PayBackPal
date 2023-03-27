import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [friends, setFriends] = useState([]);

  const [popup, setPopup] = useState(false);
  const [name, setName] = useState('');

  const handlePress = () => {
    // Show popup in android
    setPopup(!popup);
  }

  const handleAddFriend = () => {
    // Add friend to list
    setFriends([...friends, name]);
    // Clear input field
    setName('');
    // Hide popup
    setPopup(false);
  }

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.header}>PayBackPal</Text>
      <Text>Welcome to PayBackPal</Text>
      <StatusBar style="auto" />
    </View>
    <View style={styles.addButton} onTouchEndCapture={handlePress} >
      <Text style={styles.addButtonText}>+</Text>
    </View>

    <View style={popup?styles.popup:styles.popupHide}>
      <Text>Add New Friend</Text>
      <TextInput style={styles.inputName} placeholder='Enter Name' value={name} 
  onChangeText={text => setName(text)}  />
      <Button onPress={handleAddFriend} style={styles.addNameButton} title='Add' />
    </View>

    <View style={styles.list}>
      {friends.map((friend, index) => (
        <Text key={index}>{friend}</Text>
      ))}
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    top: -300,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2B369D',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 50,
    backgroundColor: '#2B369D',
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  popup: {
    position: 'absolute',
    zIndex: 12,
    bottom: 270,
    left: 50,
    backgroundColor: '#fff',
    height: 300,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  popupHide: {
    display: 'none',
  },
  inputName: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  addNameButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B369D',
  },
  list : {
    position: 'absolute',
    zIndex: 10,
    bottom: 270,
    left: 50,
    backgroundColor: '#fff',
    height: 300,
    width: 300,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },



});
