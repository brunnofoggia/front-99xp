
/**
 * Masks
 */

export default {
    apply($el) {
        
        $('[data-mask-format]', $el).each((x, el) => {
            this.applyEl($(el));
        });
    },
    applyEl($el) {
        if($el.attr('data-mask-format') in this) return this[$el.attr('data-mask-format')]($el);
            
        var opts = ($el.attr('data-mask-options') || '{}').replace(/(\w+)\:/g, '"$1":');
        
        try {
            opts = $.parseJSON(opts);
        } catch(e) {
            opts = {};
        }
        
        $el.mask($el.attr('data-mask-format'), opts);
    },
    applyToValue(v, format, o) {
        var $el = $('<input type="text">').attr('value', v).attr('data-mask-format', format).attr('data-mask-options', JSON.stringify(o || {}));
        this.applyEl($el);

        return $el.val();
    },
    date($el) {
        $el.mask("00/00/0000", {placeholder: "__/__/____", clearIfNotMatch: true});
    },
    percent($el) {
        $el.mask("000,00", {reverse: true, selectOnFocus: true});
    },
    decimal($el) {
        $el.mask("#,00", {reverse: true, selectOnFocus: true});
    },
    money($el) {
        $el.mask("#.##0,00", {reverse: true, selectOnFocus: true});
    },
    cpf($el) {
        $el.mask("000.000.000-00", {placeholder: "000.000.000-00", clearIfNotMatch: true});
    },
    cnpj($el) {
        $el.mask("00.000.000/0000-00", {placeholder: "00.000.000/0000-00", clearIfNotMatch: true});
    },
    cpfcnpj($el) {
        var docBehavior = function (val) {
            return val.replace(/\D/g, '').length <= 11 ? '000.000.000-009' : '00.000.000/0000-00';
        },
                spOptions = {
                    onKeyPress: function (val, e, field, options) {
                        field.mask(docBehavior.apply({}, arguments), options);
                    }
                };

        $el.mask(docBehavior, spOptions);
    },
    phone($el) {
        var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
                spOptions = {
                    onKeyPress: function (val, e, field, options) {
                        field.mask(SPMaskBehavior.apply({}, arguments), options);
                    }
                };

        $el.mask(SPMaskBehavior, spOptions);
    },
};