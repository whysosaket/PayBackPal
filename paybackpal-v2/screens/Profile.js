import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, SafeAreaView, ScrollView } from 'react-native';
import { styles, inputStyles, popupstyles, scrollViewStyles } from '../styles/ProfileStyles';
import FriendContext from '../context/friendContext';

export default function Profile({route, navigation}) {

  const {name} = route.params;

  const [popup, setPopup] = useState(false);
  const [typePopup, setTypePopup] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [transactions, setTransactions] = useState([]);

  const context = useContext(FriendContext);

  const {money, addTransaction, removeTransaction, paidTransaction, getTransaction, removeProfile} = context;

  const handlePress = () => {
    setPopup(!popup);
  };
  const handleTypePress = () => {
    if(amount==='') return;
    setTypePopup(!typePopup);
  };

  const handleAmount = (e) => {
      setAmount(e.nativeEvent.text); 
  }

  const handleNote = (e) => {
    setNote(e.nativeEvent.text);
  }

  const handleDeleteProfile = () => {
    removeProfile(name);
    navigation.navigate('Home');
  }

  const getTransactions = async () => {
    const data = await getTransaction(name);
    if(data===null) return;
    setTransactions(data);
  }

  const handleAddTransaction = async (type) => {
    if(amount==='') return;
    let amountN = parseInt(amount);
    let noteN = note===''? 'No note': note;
    const transaction = {
      reason: noteN,
      amount: amountN,
      type: type
    }
    const data = await addTransaction(name, transaction);
    if(data==="BadRequest") {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
      return;
    }
    setTransactions(data.transaction);
    setAmount('');
    setNote('');
  }

  const handleCredit = () => {
    handleAddTransaction('credit');
    setTypePopup(false);
  }

  const handleDebit = () => {
    handleAddTransaction('debit');
    setTypePopup(false);
  }



  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
    <View style={styles.container}>
      {/* <Text >This is the Scanning page</Text> */}
      <View style={styles.headerview}>
      <Image source={require('../assets/Profile.jpg')} style={styles.profile} />
      <Text style={styles.header}>{name}</Text>
      </View>
      <Image onTouchEndCapture={handlePress} source={require('../assets/trash.png')} style={styles.trash} />

      <View style={inputStyles.bottomBar} >
      <TextInput style={inputStyles.inputAmount} placeholder='Enter Amount' value={amount} onChange={handleAmount} keyboardType='numeric' />
      <TextInput style={inputStyles.inputNote} placeholder='Add Note' value={note} onChange={handleNote} />
      <View style={inputStyles.addButton}>
      <Text style={inputStyles.addButtonText} onPress={handleTypePress}>+</Text>
      </View>
      </View>

      <SafeAreaView style={scrollViewStyles.list}>
    <ScrollView style={scrollViewStyles.scrollView}>

      { transactions.length===0 && <Text style={scrollViewStyles.noTransactions}>No Transactions</Text> }
      {transactions.map((money, index) => (
        <FriendTile key={index} reason={money.reason} amount={money.amount} type={money.type} />
      ))}
    </ScrollView>
    </SafeAreaView>

    </View>

    


    {popup && <>
      <View style={popupstyles.popup}>
      <Text style={popupstyles.cross} onPress={handlePress}>X</Text>
      <Text style={popupstyles.text}>Are you sure you want to delete this account?</Text>
      <Text style={popupstyles.delete} onPress={handleDeleteProfile}>DELETE</Text>
    </View>
    </>
    }

  {typePopup && <>
      <View style={popupstyles.popup}>
      <Text style={popupstyles.cross} onPress={handleTypePress}>X</Text>
      <Text style={popupstyles.text}>Add ₹{amount} Transaction as?</Text>
      <Text style={popupstyles.creditbutton} onPress={handleCredit}>CREDIT</Text>
      <Text style={popupstyles.debitbutton} onPress={handleDebit}>DEBIT</Text>
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
      <Text style={type==='credit'?scrollViewStyles.moneyCredit:scrollViewStyles.moneyDebit}>₹{amount}</Text>
    </View>
  )
}