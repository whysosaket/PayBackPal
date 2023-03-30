import FriendContext from "./friendContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";


const FriendState = (props) => {

    const [friends, setFriends] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const getFriends = async () => {
            const jsonValue = await AsyncStorage.getItem('FriendName')
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            setFriends(parsedValue);
        }
        getFriends();
    }, [update]);

    const profileFormat = {
        name: '',
        transaction: [],
        total: 0,
        totalDebit: 0,
        totalCredit: 0
    }

    const storeName = async (value) => {

        // set name's each first letter to uppercase
        value = value.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        try {
          // get the value from the storage
          const jsonValue = await AsyncStorage.getItem('FriendName')
          // save the previous value with the new value
        
          // check if the value is already in the storage
          const alreadyInStorage = jsonValue != null ? JSON.parse(jsonValue).includes(value) : false;
          if(alreadyInStorage) return "BadRequest";

          const newValue = jsonValue != null ? [...JSON.parse(jsonValue), value] : [value];
          await AsyncStorage.setItem('FriendName', JSON.stringify(newValue));
          setFriends(newValue);
          return newValue;
        } catch (e) {
          // saving error
        }
      }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('FriendName')
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null
            // return parsedValue;
            if(parsedValue===null) return null;
            let data = [];
            for(let i=0; i<parsedValue.length; i++) {
                let smallName = parsedValue[i].toLowerCase().replace(/\s/g, '');
                const currData = await getProfile(smallName);
                data.push([parsedValue[i],currData]);
                
            }
            return data;

        } catch(e) {
            // error reading value
        }
    }

    const getProfile = async (name) => {
        name = name.toLowerCase().replace(/\s/g, '');
        try {
            const jsonValue = await AsyncStorage.getItem(name);
            const parsedValue = jsonValue != null ? JSON.parse(jsonValue) : null;
            return parsedValue.total;
        } catch(e) {
            // error reading value
        }
    }

   const removeAllData = async () => {
        try {
            await AsyncStorage.clear();
        } catch(e) {
            // error reading value
        }
    }

    const addTransaction = async (name, transaction) => {
        name = name.toLowerCase().replace(/\s/g, '');
        const {amount, type} = transaction;
        const date = new Date();
        transaction.date = date;
        try {
            const jsonValue = await AsyncStorage.getItem(name);
            // add transaction to the profile
            let transactionArray = jsonValue != null ? JSON.parse(jsonValue).transaction : [];
            transactionArray = [transaction,...transactionArray];
            // update the total
            let total = jsonValue != null ? JSON.parse(jsonValue).total : 0;
            total = type==='credit' ? total+amount : total-amount;
            // update the totalDebit
            let totalDebit = jsonValue != null ? JSON.parse(jsonValue).totalDebit : 0;
            totalDebit = type==='debit' ? totalDebit+amount : totalDebit;
            // update the totalCredit
            let totalCredit = jsonValue != null ? JSON.parse(jsonValue).totalCredit : 0;
            totalCredit = type==='credit' ? totalCredit+amount : totalCredit;
            // save the new profile
            const newProfile = {
                name,
                transaction: transactionArray,
                total,
                totalDebit,
                totalCredit,
            }
            await AsyncStorage.setItem(name, JSON.stringify(newProfile));
            // add dummy value in friends array
            setFriends([...friends, 'xyz123@#@#@#@#%^@*']);
            setFriends(friends.filter((item) => item!=='xyz123@#@#@#@#%^@*'));
            return newProfile;
        } catch(e) {
            // error reading value
        }
    }

    const removeTransaction = async (name, transaction) => {
        name = name.toLowerCase().replace(/\s/g, '');
        const {amount, type} = transaction;
        const date = new Date(transaction.date);
        try {
            const jsonValue = await AsyncStorage.getItem(name);
            // remove transaction from the profile
            let transactionArray = jsonValue != null ? JSON.parse(jsonValue).transaction : [];
            transactionArray = transactionArray.filter((item) => { 
                return new Date(item.date).toString()!=date.toString();
            });
            // update the total
            let total = jsonValue != null ? JSON.parse(jsonValue).total : 0;
            if(!transaction.paid) total = type==='credit' ? total-amount : total+amount;
            // update the totalDebit
            let totalDebit = jsonValue != null ? JSON.parse(jsonValue).totalDebit : 0;
            if(!transaction.paid) totalDebit = type==='debit' ? totalDebit-amount : totalDebit;
            // update the totalCredit
            let totalCredit = jsonValue != null ? JSON.parse(jsonValue).totalCredit : 0;
            if(!transaction.paid) totalCredit = type==='credit' ? totalCredit-amount : totalCredit;
            // update the profile
            const newValue = {...profileFormat, name, transaction: transactionArray, total, totalDebit, totalCredit};
            await AsyncStorage.setItem(name, JSON.stringify(newValue));
            setUpdate(!update);
            // console.log(newValue);
            return newValue;
        } catch(e) {
            // error reading value
        }
    }

   const paidTransaction = async (name, transaction) => {
        name = name.toLowerCase().replace(/\s/g, '');
        const {amount, type} = transaction;
        const date = new Date(transaction.date);
        try {
            const jsonValue = await AsyncStorage.getItem(name);
            // remove transaction from the profile
            let transactionArray = jsonValue != null ? JSON.parse(jsonValue).transaction : [];
            transactionArray = transactionArray.map((item) => {
                if(new Date(item.date).toString()==date.toString()) {
                    item.paid = true;
                }
                return item;
            });
            // update the total
            let total = jsonValue != null ? JSON.parse(jsonValue).total : 0;
            total = type==='credit' ? total-amount : total+amount;
            // update the totalDebit
            let totalDebit = jsonValue != null ? JSON.parse(jsonValue).totalDebit : 0;
            totalDebit = type==='debit' ? totalDebit-amount : totalDebit;
            // update the totalCredit
            let totalCredit = jsonValue != null ? JSON.parse(jsonValue).totalCredit : 0;
            totalCredit = type==='credit' ? totalCredit-amount : totalCredit;
            // update the profile
            const newValue = {...profileFormat, name, transaction: transactionArray, total, totalDebit, totalCredit};
            await AsyncStorage.setItem(name, JSON.stringify(newValue));
            setUpdate(!update);
            return newValue;
        } catch(e) {
            // error reading value
        }
    }

    const getTransaction = async (name) => {
        name = name.toLowerCase().replace(/\s/g, '');
        try {
            const jsonValue = await AsyncStorage.getItem(name);
            return jsonValue != null ? JSON.parse(jsonValue).transaction : null;
        } catch(e) {
            // error reading value
        }
    }

    const removeProfile = async (name) => {
        let lname = name.toLowerCase().replace(/\s/g, '');
        try {
            await AsyncStorage.removeItem(lname);
            let jsonValue = await AsyncStorage.getItem('FriendName');
            let newValue = jsonValue != null ? JSON.parse(jsonValue).filter((item) => item!==name) : [];
            await AsyncStorage.setItem('FriendName', JSON.stringify(newValue));
            setFriends(newValue);
        } catch(e) {
            // error reading value
            console.log(e);
        }
    }

    


    return(
        <FriendContext.Provider value={{friends,update, getData, storeName, removeAllData, addTransaction, getTransaction, removeProfile, paidTransaction, removeTransaction}}>
            {props.children}
        </FriendContext.Provider>
    )
}

export default FriendState