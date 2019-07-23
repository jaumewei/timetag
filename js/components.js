// Define a new component called button-counter
Vue.component( 'activity', {
    //props: {'title': {'type': 'String', 'default': 'Ready'},'status':{'type':'String','default':'ready'}},
    //props: ['notifier'],
    data: function () {
        /**
         * @type {Timer}
         */
        var _controller = new Timer();
        
        return {
            'timer' : _controller,
            'button': {
                'title' : 'Start',
                'status': 'ready',
                'displayStatus': false,
                'timeout': 0,
            },
            'strings':{
                'START': 'Start',
                'SAVED': 'Saved'
            }
        };
    },
    methods: {
        'onClick': function ( event ) {
            switch (this.timer.status()) {
                case Timer.Status.CREATED:
                    
                    this.timer.start();
                    
                    this.button.title = this.timer.display( this.button.displayStatus );
                    
                    this.button.timeout = window.setInterval( this.onUpdate , 1000 );
                    
                    this.button.status = Timer.Status.display( this.timer.status() );
                    
                    break;
                case Timer.Status.RUNNING:
                    
                    this.timer.stop();
                    
                    this.button.title = this.timer.summary();
                    
                    this.button.status = Timer.Status.display( this.timer.status() );
                    
                    if( this.button.timeout ){
                        
                        window.clearInterval( this.button.timeout );
                        
                        this.button.timeout = 0;
                    }
                    break;
                case Timer.Status.COMPLETED:

                    if( this.button.status !== 'disabled' ){

                        if( Timer.Register( this.timer ) ){

                            //wait 2 seconds
                            this.button.timeout = window.setTimeout( this.onReset , 1000 );
                            
                            this.button.title = this.strings.SAVED;

                            this.button.status = 'disabled';
                            
                            //console.log( 'Timer ' + this.timer.id() + ' saved!!');
                        }
                        else{
                            //console.log( 'Failed saving ' + this.timer.id() );
                        }
                    }
                    
                    break;
            }
            
            //console.log( this.button.status );
        },
        'onUpdate': function( ){
            this.button.title = this.timer.display( this.displayStatus );
        },
        'onReset': function(){
            this.timer.reset();
            this.button.title = this.strings.START;
            this.button.timeout = 0;
            if( this.button.status === 'disabled' ){
                this.button.status = 'ready';
            }
        }
    },
    template: '<button :class="button.status" @click="onClick($event)">{{button.title}}</button>'
});

Vue.component('activities', {
    data: function(){
        
        var _manager = new ActivityManager();

        return {
            items: _manager.activities()
        };
    },
    template: '<ul class="activity-container">\
        <li v-for="item in items" v-bind:data-id="item.id">\
            <span class="created">{{item.created}}</span>\
            <span class="init">{{item.init}}</span>\
            <span class="status">{{item.status}}</span>\
            <button class="btn icon-edit">Edit</button>\
        </li></ul><!-- ACTIVITY CONTAINER -->'
});


Vue.component( 'notifier', {
    'props':['notifier'],
    'data': function(){
        /**
         * 
         * @type {String[]}
         */
        var _log = [];
        /**
         * @return {String}
         */
        this.message = function(){
            
            return _log.length ? _log[ _log.length - 1 ] : '';
        };
        return {
            'message': this.message(),
            'status': 'active',
            'register': function( message ){
                if( message.length ){
                    _log.push( message );
                }
                return this;
            }
        };
    },
    'template': '<span :class="status">{{message}}</span>',
} );

Vue.component('button-counter', {
    data: function () {
        return {
            count: 0
        }
    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
});

(new Vue({
    'el': '#time-tracker',
    'data': {
        //'notifier': '',
    },
}));


