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

export default utils;