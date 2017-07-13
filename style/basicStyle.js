import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');
const style = StyleSheet.create({
  toolbar: {
    height: 65,
    backgroundColor: '#085394',
  },
  touch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 2,
    borderBottomColor: '#e3e0e0',
  },
  loder: {
    height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e4e4',
    opacity: 1,
  },
  shortinglist: {
    flex: 1,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,

  },
  loder_inside: {
    height: height - 116,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e4e4e4',
    opacity: 1,
  },
});
export default style;
