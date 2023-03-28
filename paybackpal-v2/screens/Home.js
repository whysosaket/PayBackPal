import { StatusBar } from 'expo-status-bar';
import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FriendContext from '../context/friendContext';
import {styles} from '../styles/HomeStyles';


export default function Home() {
    const navigation = useNavigation();

  const [popup, setPopup] = useState(false);
  const [name, setName] = useState('');
  const [friendsName, setFriendsName] = useState([]);
  const [alert, setAlert] = useState(false);

  const context = useContext(FriendContext);

  const {friends, getData, storeData} = context;

    // navigation.navigate('Scanner');

    const handlePress = () => {
    // Show popup in android
    setPopup(!popup);
    }

    const handleAdd = async () => {
    // Add friend to list
    if(name==='') return;
    const data = await storeData(name);
    setName('');
    if(data==="BadRequest") {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return;
    }
    setFriendsName(data);
    setName('');
    }

    useEffect(() => {
    // Get friends from storage
    const getFriends = async () => {
      const data = await getData();
      if(data===null) return;
      setFriendsName(data);
    }
    getFriends();
    }, []);

    const handleTyping = (e) => {
    setName(e.nativeEvent.text);
    }

  return (
    <View style={styles.container}>
      <View style={styles.headerview}>
      <Text style={styles.header}>PayBackPal</Text>
      <Text>Welcome to PayBackPal</Text>
      </View>
      <Text style={alert?styles.alert:{height: 0}} >Request Unsuccessful! Already Exists!</Text>

      {/* This below is the button that will help add friends */}
      <View style={styles.bottomBar} >
      <TextInput style={styles.inputName} placeholder='Enter Name' value={name} onChange={handleTyping} />

      <View style={styles.addButton} onTouchEndCapture={handleAdd}>
      <Text style={styles.addButtonText}>+</Text>
      </View>
      </View>

    {/* This below will be the list of friends */}
    <SafeAreaView style={styles.list}>
    <ScrollView style={styles.scrollView}>
      {friendsName.map((friend, index) => (
        <FriendTile key={index} name={friend} />
      ))}
    </ScrollView>
    </SafeAreaView>

    <Button title="Profile" onPress={() => navigation.navigate('Profile')} />

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

