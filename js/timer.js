/* timetag */
/**
 * @param {Boolean} autostart
 * @returns {Timer}
 */
function Timer( ) {

    var _atts = {
        'id': this.GenerateId(),
        'created': new Date(),
        'init': new Date(),
        'end': null,
    };
    /**
     * @return {String}
     */
    this.id = function(){ return _atts.id; };
    /**
     * @return {Object}
     */
    this.export = function(){
        
        var init = _atts.init.getTime() !== null ? _atts.init.getTime() : 0;

        var end = _atts.end.getTime() !== null ? _atts.end.getTime() : 0;
        
        return {
            'id': _atts.id,
            'created': _atts.created.getTime(),
            'init': init,
            'end': end,
        };
    };
    /**
     * @returns {String}
     */
    this.toString = function(){
        return this.time().toString();
    };
    /**
     * @return {String}
     */
    this.summary = function(){
    
        var time = this.time();
        
        var output = [];
        
        if( parseInt( time / 3600 > 0 ) ){
            output.push( this.hours().toString() + ' ' + Timer.Strings.hrs );
        }
        
        if( parseInt( time / 60 > 0 ) ){
            var min = this.minutes() % 60;
            output.push( min + ' ' + Timer.Strings.min );
        }
        
        if( output.length === 0 ){
            output.push( time.toString() + ' ' + Timer.Strings.sec );
        }
        
        return output.join(' : ');
    };
    /**
     * @returns {String}
     */
    this.display = function( status ){
        
        var time = this.time();
        var hours = this.hours();
        var minutes = this.minutes() % 60;
        var seconds = time % 60;
        
        var output = [];
        //add hours range
        output.push( hours < 10 ? '0' + hours.toString() : hours );
        //add minutes raneg
        output.push( minutes < 10 ? '0' + minutes.toString() : minutes );
        //add seconds range
        output.push( seconds < 10 ? '0' + seconds.toString() : seconds );
        
        return ( status === true ) ?
            Timer.Status.display( _atts.status ) + ' : ' + output.join(':') :
            output.join(':');
    };
    /**
     * @returns {Number}
     */
    this.time = function(){
        
        if( _atts.init !== 'undefined' ){
            
            var start = _atts.init.getTime();
            
            var end = ( _atts.end !== null ) ?
                    _atts.end.getTime() :
                    (new Date()).getTime();
            
            return parseInt( Math.abs( ( start - end ) / 1000 ) );
        }
        
        return 0;
    };
    /**
     * @returns {Number}
     */
    this.seconds = function(){ return this.time() };
    /**
     * @returns {String}
     */
    this.displaySeconds = function(){
        
        var sec = this.time() % 60;
        
        var min = this.minutes() % 60;
        
        var hour = this.hours();
        
        return ( hour > 9 ) ? hour.toString() : '0' + hour.toString()
                + ':' +
                ( min > 9 ) ? min.toString() : '0' + min.toString()
                + ':' +
                ( sec > 9 ) ? sec.toString() : '0' + sec.toString();
    };
    /**
     * @returns {Number}
     */
    this.minutes = function(){ return parseInt( this.time() / 60 ) ; };
    /**
     * @returns {String}
     */
    this.displayMinutes = function(){
        
        var min = this.minutes() % 60;
        
        var hour = this.hours();
        
        return ( hour > 9 ) ? hour.toString() : '0' + hour.toString()
                + ':' +
                ( min > 9 ) ? min.toString() : '0' + min.toString();
    };
    /**
     * @returns {Number}
     */
    this.hours = function(){ return parseInt( this.time() / 3600 ) ; };
    /**
     * @returns {String}
     */
    this.displayHours = function(){
        
        var hour = this.hours();
        
        return ( hour > 9 ) ? hour.toString() : '0' + hour.toString();
    };
    /**
     * 
     * @returns {Timer}
     */
    this.start = function () {

        if( this.status() === this.Status.CREATED ){
            _atts.init = new Date();
            console.log( this.id() +  ' Paused' );
        }

        return this;
    };
    /**
     * 
     * @returns {Timer}
     */
    this.stop = function () {
        if ( this.status() === Timer.Status.RUNNING ) {
            _atts.end = new Date();
            console.log( this.id() +  ' Stopped' );
        }
        return this;
    };
    /**
     * @returns {Number}
     */
    this.status = function () {
        switch( true ){
            case ( this.completed() > 0 ): return this.Status.COMPLETED;
            case ( this.started() > 0 ): return this.Status.RUNNING;
            default: return this.Status.CREATED;
        }
    };
    /**
     * @return {Number}
     */
    this.started = function(){
        return _atts.init !== null ? _atts.init.getTime() : 0;
    };
    /**
     * @return {Number}
     */
    this.completed = function(){
        return _atts.end !== null ? _atts.end.getTime() : 0;
    };
    /**
     * @return {Date}
     */
    this.created = function(){ return _atts.created; };

    return this;
}
/**
 * @return {Timer.Status}
 */
Timer.Status = {
    'CREATED': 0,
    'RUNNING': 1,
    'COMPLETED': 2,
    'display': function( status ){
        switch( status ){
            case this.CREATED: return 'created';
            case this.RUNNING: return 'running';
            case this.COMPLETED: return 'completed';
        }
    }
};
/**
 * @return {String}
 */
Timer.GenerateId = function(){
    return 'ID' + (new Date()).getTime().toString();
};
/**
 * @param {Timer} timer
 * @return {Boolean}
 */
/*Timer.Register = function( timer ){
  
    if (typeof timer === 'object' && timer instanceof Timer) {

        localStorage.setItem( timer.id(), JSON.stringify(timer.export()));
            
        return true;
    }
  
    return false;
};*/
/**
 * @type {Timer.Strings}
 */
Timer.Strings = {
    'sec':'sec',
    'SEC':'Seconds',
    'min':'min',
    'MIN':'Minutes',
    'hrs':'hs',
    'HRS':'Hours',
    'translate': function( string , lang ){
        return '';
    }
};