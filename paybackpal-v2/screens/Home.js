import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FriendContext from '../context/FriendContext';



export default function Home() {
    const navigation = useNavigation();

    const [popup, setPopup] = useState(false);
  const [name, setName] = useState('');

  const context = useContext(FriendContext);

  const {friends} = context;

    // navigation.navigate('Scanner');

    const handlePress = () => {
    // Show popup in android
    setPopup(!popup);
    }


  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
      <Text style={styles.header}>PayBackPal</Text>
      <Text>Welcome to PayBackPal</Text>
      </View>

      {/* This below is the button that will help add friends */}
      <View style={styles.bottomBar} >
      <TextInput style={styles.inputName} placeholder='Enter Name' value={name} />

      <View style={styles.addButton} onTouchEndCapture={handlePress}>
      <Text style={styles.addButtonText}>+</Text>
      </View>
      </View>

    {/* This below will be the list of friends */}
    <SafeAreaView style={styles.list}>
    <ScrollView style={styles.scrollView}>
      {friends.map((friend, index) => (
        <FriendTile key={index} name={friend} />
      ))}
    </ScrollView>
    </SafeAreaView>

    </View>
  );
}

const FriendTile = ({name}) => {
  return (
    <View style={styles.friendTile}>
      <Text>{name}</Text>
      <Text style={styles.moneyText}>$10.00</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2B369D',
  },
  headerview: {
    top: -320,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
  bottomBar: {
    position: 'absolute',
    zIndex: 13,
    bottom: 50,
    height: 50,
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    left: 100,
    backgroundColor: '#2B369D',
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  inputName: {  
    position: 'absolute',
    zIndex: 11,
    left: -150,
    width: 200,
    height: 50,
    bottom: -10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 10,
    
  },
  addNameButton: {
    width: 100,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B369D',
  },
  list: {
    position: 'absolute',
    top: 100,
    left: 25,
    width: 350,
    height: 500,
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendTile: {
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
  },
  moneyText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
});