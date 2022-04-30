
function getBeerColor( _srm ){

    let image_ = document.getElementById("refCard");

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');

    context.drawImage(image_, 0, 0, 50, 1);

    let color = context.getImageData( _srm, 0, 1, 1).data

    return `rgb(${color[0]} ,${color[1]} ,${color[2]})`;
}


export default getBeerColor;