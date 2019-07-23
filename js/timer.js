/* timetag */
/**
 * @param {Boolean} autostart
 * @returns {Timer}
 */
function Timer( autostart ) {

    var _controller = {
        'id': '',
        'created': null,
        'location': LocationProvider ? new LocationProvider() : null,
        'init': null,
        'end': null,
        'status': '',
        
        //activity attachked to project route
        'path': []
    };
    /**
     * @return {String}
     */
    this.id = function(){ return _controller.id; };
    /**
     * @param {Boolean} start 
     * @return {Timer}
     */
    this.reset = function( start ){
        
        _controller.id = Timer.GenerateId();
        _controller.created = new Date();
        _controller.init = null;
        _controller.end = null;
        _controller.status = Timer.Status.CREATED;
        
        return start === true ? this.start() : this;
    };
    /**
     * @param {String} ID
     * @param {String} root
     * @return {Timer}
     */
    this.register = function( ID , root ){
        
        _controller.id = ID;
        
        _controller.path = root.split('.');
        
        return this;
    };
    /**
     * @return {Object}
     */
    this.export = function(){
        
        var init = _controller.init.getTime() !== null ? _controller.init.getTime() : 0;

        var end = _controller.end.getTime() !== null ? _controller.end.getTime() : 0;
        
        return {
            'id': _controller.id,
            'created': _controller.created.getTime(),
            'init': init,
            'end': end,
            'status': _controller.status,
            'location': this.location()
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
            Timer.Status.display( _controller.status ) + ' : ' + output.join(':') :
            output.join(':');
    };
    /**
     * @returns {Number}
     */
    this.time = function(){
        
        if( _controller.init !== 'undefined' ){
            
            var start = _controller.init.getTime();
            
            var end = ( _controller.end !== null ) ?
                    _controller.end.getTime() :
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
     * @returns {String}
     */
    this.displayHours = function(){
        
        var hour = this.hours();
        
        return ( hour > 9 ) ? hour.toString() : '0' + hour.toString();
    };
    /**
     * @returns {Number}
     */
    this.minutes = function(){ return parseInt( this.time() / 60 ) ; };
    /**
     * @returns {Number}
     */
    this.hours = function(){ return parseInt( this.time() / 3600 ) ; };
    /**
     * 
     * @returns {Timer}
     */
    this.start = function () {

        _controller.init = new Date();
        
        _controller.end = null;
        
        _controller.status = Timer.Status.RUNNING;
        
        if( _controller.location !== null ){
            _controller.location.request();
        }

        return this;
    };
    /**
     * 
     * @returns {Timer}
     */
    this.stop = function () {
        if (_controller.status === Timer.Status.RUNNING ) {
            _controller.end = new Date();
            _controller.status = Timer.Status.COMPLETED;
        
            if( _controller.location !== null ){
                console.log( _controller.location.export());
            }
        }
        return this;
    };
    /**
     * @returns {Number}
     */
    this.status = function () { return _controller.status; };
    /**
     * @return {Number}
     */
    this.started = function(){
        return _controller.init !== null ? _controller.init.getTime() : 0;
    };
    /**
     * @return {Number}
     */
    this.completed = function(){
        return _controller.end !== null ? _controller.end.getTime() : 0;
    };
    /**
     * @return {Date}
     */
    this.created = function(){ return _controller.created; };
    /**
     * @return {Object|null}
     */
    this.location = function(){
        
        return _controller.location !== null ? _controller.location.export() : null;
    };

    return this.reset( autostart );
}
/**
 * @return {Timer.Status}
 */
Timer.Status = {
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
Timer.Register = function( timer ){
  
    if (typeof timer === 'object' && timer instanceof Timer) {

        localStorage.setItem( timer.id(), JSON.stringify(timer.export()));
            
        return true;
    }
  
    return false;
};
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