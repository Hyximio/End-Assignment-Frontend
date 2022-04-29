
function getBeerColor( _srm ){
    // let image_ = new Image();
    // image_.src = url;
    let image_ = document.getElementById("refCard");

    // console.log( image_ );
    // image_.crossOrigin = "Anonymous"
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    context.drawImage(image_, 0, 0, 50, 1);

    // console.log( "srm", _srm, Math.floor(_srm/10));
    // let color = context.getImageData( Math.floor(_srm/10), 0, 1, 1).data
    let color = context.getImageData( _srm, 0, 1, 1).data

    // const color = showData( 'assets/srm_reference_card.png', 20, 10);

    // console.log( color );
    // console.log( color[0] );
    // console.log( `rgb(${color[0]} ,${color[1]} ,${color[2]})` );
    return `rgb(${color[0]} ,${color[1]} ,${color[2]})`;
}

// function getBeerColor( _srm ) {
//     // 1- 40
//     // 1- 33
//     // 45 - 359
//
//     // Het Hue
//     let hue = ( 45 - ( _srm * 1.2 ) );
//     hue = hue < 0 ? 360 - hue : hue;
//
//     // Get Saturation
//     let saturation;
//     if (_srm < 6){
//         saturation = 40 + (_srm * 10)
//     }else if (_srm > 30){
//         saturation = 100 - ( _srm - 30 ) * 0.6667;
//     }else{
//         saturation = 100
//     };
//
//     // Get Brightness
//     const brightness = ( 100 - (_srm * 2) );
//     console.log( _srm );
//     console.log( `hsl(${hue} ,${saturation}% ,${brightness}%)` )
//     return `hsl(${hue} ,${saturation}% ,${brightness}%)`;
// }

export default getBeerColor;