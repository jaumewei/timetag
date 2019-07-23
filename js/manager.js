/**
 * @return {ActivityManager}
 */
function ActivityManager(){

    var _db = {
        'session_id':'',
        'activities':[
            //database of local actitivies
        ]
    };
    /**
     * @returns {ActivityManager}
     */
    this.import = function(){

        for (var id in localStorage) {

            if (id.length === 15) {
                //console.log( id );
                //console.log( localStorage[ id ] );
                _db.activities.push(JSON.parse(localStorage[ id ]));
            }
        }

        return this;
    };
    /**
     * @returns {Array}
     */
    this.activities = function(){
        return _db.activities;
    };
    
    /**
     * Server Push
     * @param {String} mode 
     * @return {ActivityManager}
     */
    this.sync = function( mode ){
        return this;
    };


    /**
     * @param {Timer} activity 
     * @return {Boolean}
     */
    this.save = function( activity ){
        
        return false;
    };
    
    /**
     * @param {String} id
     * @return {Timer}
     */
    this.load = function( id ){
        
        return new Timer();
    };
    
    return this.import();
};
/**
 * @type {ActivityManagerModes}
 */
ActivityManager.Modes = {
    PUSH:1,
    SAVE:2,
    IMPORT:3
};

/**
 * @return {Boolean}
 */
ActivityManager.CheckGeolocation = function(){
    
    navigator.permissions.query({name: 'geolocation'}).then(function (permissionStatus) {
                
        console.log('geolocation permission state is ', permissionStatus.state);

        permissionStatus.onchange = function () {
            console.log('geolocation permission state has changed to ', this.state);
        };
    });
};


ActivityManager.GrantGeolocation = function(){
    Notification.requestPermission(function (result) {
        if (result === 'denied') {
            console.log('Permission wasn\'t granted. Allow a retry.');
            return;
        } else if (result === 'default') {
            console.log('The permission request was dismissed.');
            return;
        }
        console.log('Permission was granted for notifications');
    });
};

