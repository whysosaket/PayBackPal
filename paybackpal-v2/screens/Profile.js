import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { styles, inputStyles, popupstyles, scrollViewStyles } from '../styles/ProfileStyles';
import FriendContext from '../context/friendContext';

export default function Profile() {

  const [popup, setPopup] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const context = useContext(FriendContext);

  const {money, getData, storeData} = context;

  const handlePress = () => {
    // Show popup in android
    setPopup(!popup);
  };

  const handleAmount = (e) => {
      setAmount(e.nativeEvent.text); 
  }

  const handleNote = (e) => {
    setNote(e.nativeEvent.text);
  }

  return (
    <>
    <View style={styles.container}>
      {/* <Text >This is the Scanning page</Text> */}
      <View style={styles.headerview}>
      <Image source={require('../assets/Profile.jpg')} style={styles.profile} />
      <Text style={styles.header}>Akshat Kumar</Text>
      <Text style={styles.delete} onPress={handlePress} >Delete</Text>
      </View>

      <View style={inputStyles.bottomBar} >
      <TextInput style={inputStyles.inputAmount} placeholder='Enter Amount' value={amount} onChange={handleAmount} keyboardType='numeric' />
      <TextInput style={inputStyles.inputNote} placeholder='Add Note' value={note} onChange={handleNote} />
      <View style={inputStyles.addButton}>
      <Text style={inputStyles.addButtonText}>+</Text>
      </View>
      </View>

      <SafeAreaView style={scrollViewStyles.list}>
    <ScrollView style={scrollViewStyles.scrollView}>
      {money.map((money, index) => (
        <FriendTile key={index} reason={money.reason} amount={money.amount} type={money.type} />
      ))}
    </ScrollView>
    </SafeAreaView>

    </View>

    


    {popup && <>
      <View style={popupstyles.popup}>
      <Text style={popupstyles.cross} onPress={handlePress}>X</Text>
      <Text style={popupstyles.text}>Are you sure you want to delete this account?</Text>
      <Text style={popupstyles.delete}>DELETE</Text>
    </View>
    </>
    }
    </>
  );
}

const FriendTile = ({reason, amount, type}) => {

  if(reason.length>20) reason = reason.substring(0, 20) + '...';

  return (
    <View style={scrollViewStyles.friendTile}>
      <Text>{reason}</Text>
      <Text style={type==='credit'?scrollViewStyles.moneyCredit:scrollViewStyles.moneyDebit}>${amount}</Text>
    </View>
  )
}