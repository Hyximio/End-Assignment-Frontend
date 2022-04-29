
function minMaxValue( _typeName, _value ){

    let maxValue;

    switch ( _typeName.toLowerCase() ) {
        case "alcohol":
            maxValue = 55;
            break;
        case "bitterness":
            maxValue = 120;
            break;
        case "acidity":
            maxValue = 8;
            break;
    }
    const roundedVal = Math.floor( ( 100 / maxValue ) * _value );
    return roundedVal.toString() + "%";
}

export default minMaxValue;