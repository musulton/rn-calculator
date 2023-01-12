import React from "react";
import {
    View,
    StyleSheet
} from "react-native";
import Button from "./components/Button";
import Display from "./components/Display";

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
}

export default function Root() {
    // State berupa digit, dipakai untuk ditampilkan di Display komponen
    const [displayValue, setDisplayValue] = React.useState(initialState.displayValue);
    // Menentukan pembersihan value
    const [clearDisplay, setClearDisplay] = React.useState(initialState.clearDisplay);
    // State yang berisi operasi seperti + - * / =
    const [operation, setOperation] = React.useState(initialState.operation);
    // State berisi array, index pertama berupa angka saat ini / jumlah,
    // index kedua adalah angka yang mau dioperasikan dengan index pertama
    const [values, setValues] = React.useState(initialState.values);
    const [current, setCurrent] = React.useState(initialState.current);

    const setStates = (states) => {
        setDisplayValue(states?.displayValue);
        setClearDisplay(states?.clearDisplay);
        setOperation(states?.operation);
        setValues(states?.values);
        setCurrent(states?.current);
    }

    const addDigitHandler = n => {
        const _clearDisplay = displayValue === "0" || clearDisplay;

        if (n === "." && !_clearDisplay && displayValue?.includes(".")){
            return;
        }

        const currentValue = _clearDisplay ? "" : displayValue;
        const _displayValue = currentValue + n;
        setDisplayValue(_displayValue);
        setClearDisplay(false);

        if (n !== "."){
            const newValue = parseFloat(_displayValue);
            const _values = [...values];
            _values[current] = newValue;
            setValues(_values);
        }
    }

    const setOperationHandler = _operation => {
        if (current === 0) {
            setOperation(_operation);
            setCurrent(1);
            setClearDisplay(true);
        } else {
            const equals = _operation === "=";
            const _values = [...values];
            try {
                _values[0] = eval(`${_values[0]} ${operation} ${_values[1]}`);
            } catch (e) {
                _values[0] = values[0];
            }

            _values[1] = 0;
            const newStates = {
                displayValue: `${_values[0]}`,
                operation: equals ? null : _operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values: _values,
            }
            setStates(newStates);
        }
    }

    return (
        <View style={styles.container}>
            <Display value={displayValue}/>
            <View style={styles.buttons}>
                <Button label="AC" type="clear" onClick={() => setStates(initialState)}/>
                <Button label="/" type="operation" onClick={setOperationHandler}/>
                <Button label="7" onClick={addDigitHandler}/>
                <Button label="8" onClick={addDigitHandler}/>
                <Button label="9" onClick={addDigitHandler}/>
                <Button label="*" type="operation" onClick={setOperationHandler}/>
                <Button label="4" onClick={addDigitHandler}/>
                <Button label="5" onClick={addDigitHandler}/>
                <Button label="6" onClick={addDigitHandler}/>
                <Button label="-" type="operation" onClick={setOperationHandler}/>
                <Button label="1" onClick={addDigitHandler}/>
                <Button label="2" onClick={addDigitHandler}/>
                <Button label="3" onClick={addDigitHandler}/>
                <Button label="+" type="operation" onClick={setOperationHandler}/>
                <Button label="0" type="zero" onClick={addDigitHandler}/>
                <Button label="." onClick={addDigitHandler}/>
                <Button label="=" type="operation" onClick={setOperationHandler}/>
            </View>
        </View>
    );
}

// Stylesheet.create
// Membantu pengoptimalkan kinerja / memori saat melakukan pengaturan style
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    buttons:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})
