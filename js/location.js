/**
 * 
 * @return {LocationProvider}
 */
function LocationProvider(){
    
    var _atts = {
        'longitude':0,
        'latitude':0,
        'accuracy':0,
        'errorCode': 0,
        'ts':0
    };
    /**
     * @return {LocationProvider}
     */
    this.request = function(){
        
        window.navigator.geolocation.getCurrentPosition(position => {

            _atts.longitude = position.coords.longitude;
            _atts.latitude = position.coords.latitude;
            _atts.accuracy = position.coords.accuracy;
            _atts.ts = position.timestamp;
            
            //console.log(  _atts );

        }, error => {
            
            _atts.errorCode = error.code;
            
            LocationProvider.CheckPermission();

        });
        
        return this;
    };
    /**
     * @return {Object}
     */
    this.export = function(){
        
        return {
            'longitude':_atts.longitude,
            'latitude':_atts.latitude,
            'accuracy': _atts.accuracy,
            'timestamp': _atts.ts
        };
        
    };

    /**
     * @return {Number}
     */
    this.longitude = function(){ return _atts.longitude; };
    /**
     * @return {Number}
     */
    this.latitude = function(){ return _atts.latitude; };
    /**
     * @return {Number}
     */
    this.accuracy = function(){ return _atts.accuracy; };
    /**
     * @return {Number}
     */
    this.timestamp = function(){ return _atts.ts; };

    return this;
    //return this.request();
};


LocationProvider.CheckPermission = function(){
    
    navigator.permissions.query({name: 'geolocation'}).then(function (permissionStatus) {
                
        console.log('geolocation permission state is ', permissionStatus.state);
        
        if( permissionStatus.state === 'denied' ){
            
            LocationProvider.QueryPermission();
        }

        permissionStatus.onchange = function () {

            console.log('geolocation permission state has changed to ', this.state);
        };
    });
};
/**
 * @return {Boolean}
 */
LocationProvider.QueryPermission = function(){
    
    if( Notification ){
        Notification.requestPermission(function (result) {
            switch( result ){
                case 'denied':
                    console.log('Permission wasn\'t granted. Allow a retry.');
                    return;
                case 'default':
                    console.log('The permission request was dismissed.');
                    return;
                default:
                    console.log('Permission was granted for notifications');
                    return;
            }
        });
        
        return true;
    }
    
    return false;
};


