const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve([ latitude, longitude ]);
                },
                (error) => {
                    reject(handleGeolocationError(error));
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
};

const handleGeolocationError = (error) => {
    console.log("locationError", error )
    switch(error.code) {
        case error.PERMISSION_DENIED:
            return new Error('You denied the request for Geolocation. Please allow us to access your location.');
        case error.POSITION_UNAVAILABLE:
            return new Error('Location information is unavailable.');
        case error.TIMEOUT:
            return new Error('The request to get user location timed out. Please try again.');
        case error.UNKNOWN_ERROR:
        default:
            return new Error('An unknown error occurred.');
    }
};

export default getLocation;