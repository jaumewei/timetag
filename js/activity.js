/**
 * @returns {Activity}
 */
function Activity(){

    var _atts = {
        'id': Activity.GenerateId(),
        'status': Activity.Status.CREATED,
        'timeset': [ new Timer() ],
    };

    /**
     * @return {String}
     */
    this.id = function(){ return _atts.id; };
    
    /**
     * @returns {Number}
     */
    this.status = function(){
        
        var idx = _atts.timeset.length;
        
        switch( true ){
            //pause timer created, check pause status
            case ( idx > 1 && _atts.timeset[ idx - 1 ].status() < Timer.Status.COMPLETED ) :
                return this.Status.PAUSED;
            //main timer created, check status
            case ( idx > 0 ):
                return ( _atts.timeset[ 0 ].status() < Timer.Status.COMPLETED ) ?
                    this.Status.RUNNING :
                    this.Status.COMPLETED;
            //no timer created
            default: this.Status.CREATED;
        }
    };
    /**
     * @return {Activity}
     */
    this.start = function(){
        
        if( _atts.timeset.length === 0 ){
            
            _atts.timeset.push( new Timer( ) );
            
            console.log( this.id() +  ' Started' );
        }
        
        return this;
    };
    /**
     * @return {Activity}
     */
    this.stop = function(){
        
        if( this.status() > this.Status.CREATED && this.status() < this.Status.COMPLETED ){
            
            _atts.timeset[ 0 ].stop();
            
            console.log( this.id() +  ' Stopped' );
        }

        return this.resume();
    };
    /**
     * @return {Activity}
     */
    this.pause = function(){
        
        if( this.status() === this.Status.RUNNING ){
            
            _atts.timeset.push( new Timer( ) );
            
            console.log( this.id() +  ' Paused' );
        }
        
        return this;
    };
    /**
     * @return {Activity}
     */
    this.resume = function(){
        
        if( this.status() === this.Status.PAUSED ){
            
            _atts.timeset[ _atts.timeset.length - 1 ].stop();
            
            console.log( this.id() +  ' Resumed' );
        }
        
        return this;
    };
    
    this.export = function(){
        
        return {};
    };
    
    return this.start();
}

/**
 * @return {String}
 */
Activity.GenerateId = function(){
    return 'ID' + (new Date()).getTime().toString();
};

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


