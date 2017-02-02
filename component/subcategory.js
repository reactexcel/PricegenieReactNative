import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    View,
    Text,
    StyleSheet,
    ToolbarAndroid,
    Dimensions,
    ListView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
export class Subcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subcat: ''
        }
        this._genrateSubcat = this._genrateSubcat.bind(this);
    }
    componentWillMount() {
        let sub_name = this.props.name;
        this.setState({subcat: sub_name});
        this._genrateSubcat()
    }
    _genrateSubcat() {}
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                backgroundColor: '#e3e0e0'
            }}>
                <Icon.ToolbarAndroid logo={require('../img/genie-logo-g.png')} title='' style={styles.toolbar} titleColor='white' overflowIconName="md-more" actions={[
                    {
                        title: 'fav',
                        iconName: 'md-notifications',
                        iconSize: 25,
                        show: 'always'
                    }, {
                        title: 'Login',
                        iconSize: 25
                    }
                ]}></Icon.ToolbarAndroid>
                <ScrollView>
                    <View style={{
                        flex: 1,
                        marginLeft: 15,
                        marginRight: 15,
                        marginTop: 10
                    }}>
                        <View style={{
                            flex: 1,
                            marginTop: 5,
                            backgroundColor: 'white'
                        }}>
                            <Text>
                                hello
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    toolbar: {
        height: 50,
        backgroundColor: '#085394'
    }
});
