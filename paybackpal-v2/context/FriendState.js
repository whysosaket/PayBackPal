import FriendContext from "./friendContext";
import AsyncStorage from '@react-native-async-storage/async-storage';


const FriendState = (props) => {

    const money = [
        {reason: 'Bought me a drink', amount: 10, type: 'debit'},
        {reason: 'Bought me Pen', amount: 25, type: 'debit'},
        {reason: 'Momos', amount: 50, type: 'credit'},
        {reason: 'Chole Bhature', amount: 100, type: 'credit'},
        {reason: 'Bought me a drink', amount: 10, type: 'debit'},
        {reason: 'Bought me Pen', amount: 25, type: 'debit'},
        {reason: 'Momos', amount: 50, type: 'credit'},
        {reason: 'Chole Bhature asdkjabhskjdbkasdk asdnm askdjabedkjbk', amount: 100, type: 'credit'},
    ]


    const storeData = async (value) => {
        try {
          // get the value from the storage
          const jsonValue = await AsyncStorage.getItem('firendName')
          // save the previous value with the new value
        
          // check if the value is already in the storage
          const alreadyInStorage = jsonValue != null ? JSON.parse(jsonValue).includes(value) : false;
          if(alreadyInStorage) return "BadRequest";

          const newValue = jsonValue != null ? [...JSON.parse(jsonValue), value] : [value];
          await AsyncStorage.setItem('firendName', JSON.stringify(newValue));
          return newValue;
        } catch (e) {
          // saving error
        }
      }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('firendName')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
        }
    }
    


    return(
        <FriendContext.Provider value={{money, getData, storeData}}>
            {props.children}
        </FriendContext.Provider>
    )
}

export default FriendState