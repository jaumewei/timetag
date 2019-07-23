/* timetag */
/**
 * @param {Boolean} autostart
 * @returns {Timer}
 */
function Timer(autostart) {

    var _controller = {
        //'status':
        'init': null,
        'end': null,
        'status': Timer.Status.CREATED
    };
    /**
     * @returns {String}
     */
    this.toString = function(){
        return this.time().toString();
    };
    /**
     * @returns {String}
     */
    this.display = function(){
        
        return Timer.Status.display( _controller.status ) + ' : ' + this.time();
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
        }
        return this;
    };
    /**
     * @returns {Number}
     */
    this.status = function () { return _controller.status; };

    return (typeof autostart === 'boolean' && autostart) ? this.start() : this;
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
            case this.CREATED: return 'CREATED';
            case this.RUNNING: return 'RUNNING';
            case this.PAUSED: return 'PAUSED';
            case this.COMPLETED: return 'COMPLETED';
        }
    }
};


