import _ from 'underscore-99xp';
import toastTpl from './toast.jst';

var setContainer = function(opts) {
    var $p = $('body > .toasts');

    !$p.length && ($p = $('<div class="toasts">').appendTo($('body')).css('position', 'fixed').css(opts.positionY || 'bottom', '10px').css(opts.positionX || 'right', '10px'));

    return $p;
}

export default function(opts={}) {
    var $p = $p = setContainer(opts);
    if(!opts.msg) { return; }

    var tpl = toastTpl(_.extend({color: 'info'}, opts)), $el;


    $el = $(tpl).appendTo($p);
    $el.toast(_.defaults(opts, {close: false, autohide: true, delay: opts.delay || 2500})).toast('show');
    opts.autohide && setTimeout(_.partial(($el)=>{
        $el.remove();
    }, $el), opts.delay + 500);
}