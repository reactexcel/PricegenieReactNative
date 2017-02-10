import {StyleSheet, Dimensions} from 'react-native';
var {height, width} = Dimensions.get('window');
module.exports = StyleSheet.create({
    toolbar: {
        height: 50,
        backgroundColor: '#085394'
    },
    touch: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 2,
        borderBottomColor: '#e3e0e0'
    },
    loder: {
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e4e4e4',
        opacity: 1
    }
});
