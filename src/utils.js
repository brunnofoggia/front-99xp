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
utils.when = function (waitFunction, afterWait, interval) {
    var test = waitFunction();
    !interval && (interval = 200);

    if (!test) {
        return _.delay(_.bind(function (waitFunction, afterWait, interval) {
            utils.when(waitFunction, afterWait, interval);
        }, this, waitFunction, afterWait, interval), interval);
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

export default utils;