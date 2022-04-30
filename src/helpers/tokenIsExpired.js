import jwt_decode from 'jwt-decode';

function tokenIsValid( _token, _expMin ) {

    const decodedToken = jwt_decode(_token);

    const dateIat = new Date(decodedToken.iat);
    const dateNow = new Date() / 1000; // to seconds
    const difTime = -dateIat.getTime() + dateNow;

    // If token exist and expired it removes it from the storage
    if (Math.floor(difTime / 60) > _expMin){
        localStorage.removeItem('token');
        return false
    }else{
        return true
    }
}

export default tokenIsValid;