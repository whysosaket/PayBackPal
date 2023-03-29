import { StyleSheet } from 'react-native';

const globalstyle = StyleSheet.create({
    background: {
        backgroundColor: '#d3d6f2',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30%',
        zIndex: 1,
        borderBottomEndRadius: 70,
        borderBottomStartRadius: 70,      
    },
    profileBackground: {
        backgroundColor: '#d3d6f2',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '28%',
        zIndex: 1,
        borderBottomEndRadius: 100,
        borderBottomStartRadius: 100,      
    },
});

export {globalstyle}