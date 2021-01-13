/**
 * 
 */
import _ from 'underscore-99xp';

var utils = {};

/**
 * Wait for a function return to be true before executes another function
 * @param waitFunction function
 * @param afterWait function
 * @param interval integer microseconds interval between checks
 */
utils.when = function (waitFunction, afterWait, interval, afterPassed, passed=0) {
    var test = waitFunction();
    !interval && (interval = 200);

    if (!test) {
        let afterPassedEndProccess = typeof afterPassed === 'function' ? afterPassed(passed) : false;
        if(afterPassedEndProccess===true) {
            return;
        }

        return _.delay(_.bind(function (waitFunction, afterWait, interval, afterPassed, passed) {
            passed += interval;
            utils.when(waitFunction, afterWait, interval, afterPassed, passed);
        }, this, waitFunction, afterWait, interval, afterPassed, passed), interval);
    }

    afterWait();
};

/**
 * Catch paste value
 * @param evt event
 * @param elem function
 * @param interval integer microseconds interval between checks
 */
utils.catchPaste = function (e, el, c) {
    if (navigator.clipboard && navigator.clipboard.readText) {
      // modern approach with Clipboard API
      navigator.clipboard.readText().then(c);
    } else if (e.originalEvent && e.originalEvent.clipboardData) {
      // OriginalEvent is a property from jQuery, normalizing the event object
      c(e.originalEvent.clipboardData.getData('text'));
    } else if (e.clipboardData) {
      // used in some browsers for clipboardData
      c(e.clipboardData.getData('text/plain'));
    } else if (window.clipboardData) {
      // Older clipboardData version for Internet Explorer only
      c(window.clipboardData.getData('Text'));
    } else {
      // Last resort fallback, using a timer
      setTimeout(() => {
        c(el.value)
      }, 100);
    }
};

utils.addCssTag = function (o) {
    !_.isObject(o) && (o = {href: o});
    o = _.defaults(o, {
        rel: 'stylesheet',
        type: 'text/css'
    });

    var link = document.createElement('link');
    _.each(o, (v, k) => {
        link[k] = v;
    });

    document.head.appendChild(link);
}

export default utils;