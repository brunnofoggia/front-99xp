/**
 *
 */
import _ from "underscore-99xp";
import Bb from "backbone";

var utils = {};

/**
 * Wait for a function return to be true before executes another function
 * @param waitFunction function
 * @param afterWait function
 * @param interval integer microseconds interval between checks
 */
utils.when = function (
    waitFunction,
    afterWait,
    interval,
    afterPassed,
    passed = 0
) {
    var test = waitFunction();
    !interval && (interval = 200);

    if (!test) {
        let afterPassedEndProccess =
            typeof afterPassed === "function" ? afterPassed(passed) : false;
        if (afterPassedEndProccess === true) {
            return;
        }

        return _.delay(
            _.bind(
                function (
                    waitFunction,
                    afterWait,
                    interval,
                    afterPassed,
                    passed
                ) {
                    passed += interval;
                    utils.when(
                        waitFunction,
                        afterWait,
                        interval,
                        afterPassed,
                        passed
                    );
                },
                this,
                waitFunction,
                afterWait,
                interval,
                afterPassed,
                passed
            ),
            interval
        );
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
        c(e.originalEvent.clipboardData.getData("text"));
    } else if (e.clipboardData) {
        // used in some browsers for clipboardData
        c(e.clipboardData.getData("text/plain"));
    } else if (window.clipboardData) {
        // Older clipboardData version for Internet Explorer only
        c(window.clipboardData.getData("Text"));
    } else {
        // Last resort fallback, using a timer
        setTimeout(() => {
            c(el.value);
        }, 100);
    }
};

utils.addCssTag = function (o, preload = true, head = true) {
    !_.isObject(o) && (o = { href: o });
    var d = !preload
        ? {
              rel: "stylesheet",
              type: "text/css",
          }
        : {
              type: "text/css",
              rel: "preload",
              onload: "this.rel='stylesheet';document.onloadFired=true",
              as: "style",
              media: "all",
          };

    o = _.defaults(o, d);

    var link = document.createElement("link");
    _.each(o, (v, k) => {
        link[k] = v;
    });

    document[head ? "head" : "body"].appendChild(link);
    return link;
};

window.URL = window.URL || window.webkitURL;
utils.openBlobPDF = function (url) {
    Bb.ajax({
        url: url,
        method: "GET",
        xhrFields: {
            responseType: "blob",
        },
        success(response) {
            utils.openBlob(response);
        },
    });
};

utils.openBlob = function (content, type, filename) {
    if (type) content = new Blob(content, { type });

    var fileURL = URL.createObjectURL(content);
    if (!filename) window.open(fileURL);
    else {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = fileURL;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(fileURL);
    }
};

export default utils;
