import _ from 'underscore-99xp';
import toastTpl from './toast.jst';

var setContainer = function() {
    var $p = $('body > .toasts');
            
    !$p.length && ($p = $('<div class="toasts">').appendTo($('body')).css('position', 'fixed').css('bottom', '10px').css('right', '10px'));
    
    return $p;
}

export default function(opts={}) {
    var tpl = toastTpl(_.extend({color: 'info'}, opts)), $p = setContainer(), $el;
    

    $el = $(tpl).appendTo($p);
    $el.toast(_.defaults(opts, {autohide: true, delay: 2500})).toast('show');
    setTimeout(_.partial(($el)=>{
        $el.remove();
    }, $el), 3000);
}