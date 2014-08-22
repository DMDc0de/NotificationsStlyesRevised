/**
 * notificationsList.js v1.0.0
 *
 * relies on _.js and Codrops's NotificationFx: https://github.com/codrops/NotificationStyles
 * http://www.dmdcode.it
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, DMDCode
 * http://www.dmdcode.it
 */
;( function( window ) {

  'use strict';

  /**
   * NotificationsList function
   */
  function NotificationsList() {

    this._init();
  }


  /**
   * init function
   * @todo handle notifications position without modifing the original plugin
   */
  NotificationsList.prototype._init = function() {
    this.notifications = [];
  }



  /**
   * remove a notification
   */
  NotificationsList.prototype.pop = function(_id) {
    console.log('will pop...' + _id);
    console.log(this.notifications)
    this.notifications = _.without(this.notifications, _.findWhere(this.notifications, {id: _id}));
    console.log('got ' + this.notifications.length + ' notifications..');
    this.position();
  }

  /**
   * position all the notifications
   */
  NotificationsList.prototype.position = function() {
    console.log('will position my notifications');

    for(var index in this.notifications){
        var elem = this.notifications[index];
        var mul = parseInt(index);
        if((elem.options.layout == 'growl' && elem.options.effect == 'slide') ||
           (elem.options.layout == 'growl' && elem.options.effect == 'genie') ||
           (elem.options.layout == 'attached' && elem.options.effect == 'flip')){

          elem.ntf.style.bottom = ((mul == 0) ? 30 : (elem.ntf.offsetHeight + 10 ) * mul + 30) + 'px';
        }else{
            elem.ntf.style.marginTop = (elem.ntf.offsetHeight + 10 ) * mul + 'px';
        }

    }
  }

  /**
   * add a notification
   */
  NotificationsList.prototype.push = function(_ntfOptions) {
    if(typeof NotificationFx == 'undefined'){
      console.log('this plugin needs NotificationFx to work, plese include that script :) ')
      return;
    }

    var self = this;

    //if the user specified a callback just wrap the callback in our callback
    var onOpenClbk = null;
    var onCloseClbk = null;
    var id = new Date().getTime();

    if(typeof _ntfOptions.onClose == 'function'){
      onCloseClbk = _ntfOptions.onClose;
    }

    if(typeof _ntfOptions.onOpen == 'function'){
      onCloseClbk = _ntfOptions.onOpen;
    }

    _ntfOptions.onClose = function(){
        self.pop(id);
        if(onCloseClbk !== null){
          onCloseClbk();
        }
    };

    _ntfOptions.onOpen = function(){
        self.position();
        if(onOpenClbk !== null){
          onOpenClbk();
        }
    };



    var notification = new NotificationFx(_ntfOptions);
    notification.id = id;
    this.notifications.push(notification);
    console.log('got ' + this.notifications.length + ' notifications..');
    notification.show();
  }

  /**
   * add to global namespace
   */
  window.NotificationsList = NotificationsList;

} )( window );
