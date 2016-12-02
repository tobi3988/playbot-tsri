
function transmitPosition(position) {
    $.ajax({
        url: '/transmit',
        type: 'POST',
        data:position,
        success: function(response) {
            console.log('location transmitted')
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(transmitPosition);
    } else {
        console.log( "Geolocation is not supported by this browser.");
    }

}
