
function minMaxValue( _typeName, _value ){

    let maxValue;

    switch ( _typeName.toLowerCase() ) {
        case "alcohol":
            maxValue = 55;
            break;
        case "bitterness":
            maxValue = 1157;
            break;
        case "acidity":
            if (_value > 10) { _value /= 10 } // fix in the data
            maxValue = 6;
            break;
    }
    const roundedVal = Math.floor( ( 100 / maxValue ) * _value );
    return roundedVal.toString() + "%";
}

export default minMaxValue;