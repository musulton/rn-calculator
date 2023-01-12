import React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight
} from 'react-native'

const Button = props => {
    let stylesButton = { ...styles.button };

    if (props.type === "zero" ) stylesButton = { ...stylesButton, ...styles.buttonDouble }
    if (props.type === "clear") stylesButton = { ...stylesButton, ...styles.buttonTriple }
    if (props.type === "operation") stylesButton = { ...stylesButton, ...styles.operationButton }

    return (
        <TouchableHighlight onPress={() => props.onClick(props.label)}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableHighlight>
    )
}

export default Button;

// Stylesheet.create
// Membantu pengoptimalkan kinerja / memori saat melakukan pengaturan style
const styles = StyleSheet.create({
    button: {
        fontSize: 30,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#888',
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#fa8231',
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2,
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3,
    },
})
