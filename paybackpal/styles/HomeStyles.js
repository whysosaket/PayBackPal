import { StyleSheet } from 'react-native';

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
      position: 'absolute',
      top: 80,
      zIndex: 13,
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
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
    },
    list: {
      position: 'absolute',
      top: '21%',
      width: '90%',
      height: '60%',
      padding: 10,
      backgroundColor: '#fff',
      zIndex: 12,
      borderRadius: 10,
    },
    centerList: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    friendTile: {
      width: '90%',
      height: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      alignItems: 'center',
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
    alert: {
        position: 'absolute',
        zIndex: 11,
        top: '17%',
        color: 'red',
        fontSize: 10,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    trash: {
        position: 'absolute',
        bottom: '15%',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 13,
    }, 
    
  });

  export { styles };