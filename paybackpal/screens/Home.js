import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FriendContext from '../context/friendContext';
import {styles} from '../styles/HomeStyles';
import {popupstyles} from '../styles/ProfileStyles';
import {globalstyle} from '../styles/GlobalStyles';

export default function Home() {
  const navigation = useNavigation();

  const [popup, setPopup] = useState(false);
  const [name, setName] = useState('');
  const [friendsName, setFriendsName] = useState([]);
  const [alert, setAlert] = useState(false);

  const context = useContext(FriendContext);

  const {friends,allData, getData, storeName, removeAllData} = context;

    // navigation.navigate('Scanner');

    const handlePress = () => {
    // Show popup in android
    setPopup(!popup);
    }

    const handleAdd = async () => {
    // Add friend to list
    if(name==='') return;
    const data = await storeName(name);
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
    }, [friends]);

    const handleTyping = (e) => {
    setName(e.nativeEvent.text);
    }

    const handleDelete = async () => {
    // Delete all friends
      removeAllData();
      setFriendsName([]);
      setPopup(false);
    }

  return (
    <>
    
    <View style={styles.container}>
      <View style={globalstyle.background}></View>
      <View style={styles.headerview}>
      <Text style={styles.header}>PayBackPal</Text>
      <Text>Welcome to PayBackPal</Text>
      </View>
      <Text style={alert?styles.alert:{height: 0}} >Request Unsuccessful! Already Exists!</Text>
      <Image onTouchEndCapture={handlePress} source={require('../assets/trash.png')} style={styles.trash} />

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
        <FriendTile key={index} name={friend[0]} amount={friend[1]} />
      ))}
    </ScrollView>
    </SafeAreaView>

    {/* <Button title="Profile" onPress={() => navigation.navigate('Profile')} /> */}

    </View>
    {popup && <>
      <View style={popupstyles.popupBackground} onTouchEndCapture={handlePress}>
      <View style={popupstyles.popup}>
      <Text style={popupstyles.cross} onPress={handlePress}>X</Text>
      <Text style={popupstyles.text}>Are you sure you want to delete all entries?</Text>
      <Text style={popupstyles.delete} onPress={handleDelete}>DELETE</Text>
      </View>
      </View>
    </>}
    </>
  );
}

const FriendTile = ({name, amount}) => {
  const navigation = useNavigation();
  if(!amount) amount=0;
  return (
    <View style={styles.friendTile} onTouchEndCapture={() => navigation.navigate('Profile', {name})}>
      <Text>{name}</Text>
      <Text style={{...styles.moneyText, color: amount<0?'red':'green' }}>₹{amount}</Text>
    </View>
  )
}

