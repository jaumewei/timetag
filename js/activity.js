/**
 * @returns {Activity}
 */
function Activity(){

    var _settings = {
        'status': Activity.Status.CREATED
    };
    
    var _location = null;
    
    var _timer = new Timer();
    
    var _pauses = [
        
    ];
    /**
     * @returns {Number}
     */
    this.status = function(){
        return _settings.status;
    };
    
    this.start = function(){
        
        return this;
    };
    
    this.stop = function(){
        
        return this;
    };
    
    this.pause = function(){
        
        return this;
    };
    
    this.resume = function(){
        
        return this;
    };
    
    this.export = function(){
        
        return this;
    };
    
    return this.start();
}

/**
 * @return {Timer.Status}
 */
Activity.Status = {
    'CREATED': 0,
    'RUNNING': 1,
    'PAUSED': 2,
    'COMPLETED': 3,
    'display': function( status ){
        switch( status ){
            case this.CREATED: return 'created';
            case this.RUNNING: return 'running';
            case this.PAUSED: return 'paused';
            case this.COMPLETED: return 'completed';
        }
    }
};


