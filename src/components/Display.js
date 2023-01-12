import React from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'

/*
Komponen ini digunakan untuk menampilkan digit angka
hanya menerima value props
 */
const Display = props => {
    return (
        <View style={styles.display}>
            {/* menampilkan digit hanya sebaris dengan menggunakan numberOfLines props */}
            <Text style={styles.displayValue} numberOfLines={1}>{props.value}</Text>
        </View>
    )
}

export default Display;

// Stylesheet.create
// Membantu pengoptimalkan kinerja / memori saat melakukan pengaturan style
const styles = StyleSheet.create({
    display:{
        flex:1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'flex-end',
    },
    displayValue: {
        fontSize: 60,
        color: '#fff',
    }
})
