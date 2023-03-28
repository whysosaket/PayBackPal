import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerview: {
      top: -250,
    },
    profile: {
      width: 120,
      height: 120,
      borderRadius: 100,
      alignSelf: 'center',
    },
    header: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#2B369D',
      alignSelf: 'center',
    },
    delete: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      alignSelf: 'center',
      top: 5,
      borderColor: 'red',
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      backgroundColor: 'red',
    },
  
  });
  
  const popupstyles = StyleSheet.create({
    popup: {
      position: 'absolute',
      zIndex: 12,
      top: '35%',
      left: 50,
      backgroundColor: '#fff',
      height: 150,
      width: 300,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    text: {
      fontSize: 12,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'center',
      textAlign: 'center',
    },
    delete: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      alignSelf: 'center',
      borderColor: 'red',
      borderWidth: 1,
      borderRadius: 10,
      padding: 5,
      backgroundColor: 'red',
      top: 10
    },
    cross: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'black',
      alignSelf: 'center',
      padding: 5,
      backgroundColor: 'white',
      position: 'absolute',
      top: 2,
      right: 5,
    },
  });
  
  const inputStyles = StyleSheet.create({
    bottomBar: {
      position: 'absolute',
      zIndex: 13,
      bottom: 50,
      height: 50,
    },
    addButton: {
      position: 'absolute',
      zIndex: 11,
      bottom: 0,
      left: 100,
      backgroundColor: 'green',
      width: 70,
      height: 70,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 8,
    },
    inputAmount: {  
      position: 'absolute',
      zIndex: 11,
      left: -150,
      width: 200,
      height: 50,
      bottom: 40,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      elevation: 10,
      
    },
    addButtonText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
    },
    inputNote: {
      position: 'absolute',
      zIndex: 11,
      left: -150,
      width: 200,
      height: 50,
      bottom: -25,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      elevation: 10,
    },
  });

  const scrollViewStyles = StyleSheet.create({
    list: {
        position: 'absolute',
        top: 240,
        left: 25,
        width: 350,
        height: 300,
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
      moneyCredit: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
      },
      moneyDebit: {
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        },
    });


export { styles, popupstyles, inputStyles, scrollViewStyles };