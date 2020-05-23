import Bb from 'backbone';
import tpl from './loading.jst';

var loading = new (Bb.View.extend({
    template: tpl,
    initialize() {
        this.collection = new (Bb.Collection.extend({}));
        
        this.listenTo(this.collection, 'add', ()=>this.onAdded(this.collection.last()));
        this.listenTo(this.collection, 'remove', ()=>this.onRemoved(this.collection.last()));
        
        this.render();
    },
    render() {
        this.$el.html(this.template());
        this.removeWrapper();
        
        this.hide();
        this.$el.appendTo($('body'));
    },
    add(x='') {
        typeof x === 'string' && (x = {text: x});
        if(!Object.isPlain(x)) throw Error('Only plain obects are alowed');
        
        return this.collection.add(x).cid;
    },
    remove(x) {
        if(typeof x !== 'string' || !x.trim()) return false;
        return !!this.collection.remove(x.trim());
    },
    changeText(text) {
        var $t = $('.text', this.$el);
        
        text = text.trim();
        
        if(!text) $t.hide();
        else $t.html(text).show();
        
        return this;
    },
    show() {
        this.$el.show().addClass('showup');
        return this;
    },
    hide() {
        this.$el.removeClass('showup');
        setTimeout(()=>this.$el.hide(), 300); // timer to conclude opacity effect
        return this;
    },
    onAdded(last) {
        this.changeText(last.get('text') || '').show();
    },
    onRemoved(last) {
        last ? this.changeText(last.get('text') || '') : this.hide();
    },
    removeWrapper() {
        if ('wrapperRemoved' in this)
            return this;
        this.$el = this.$el.children();
        this.$el.unwrap();
        this.setElement(this.$el);
        this.wrapperRemoved = true;
    },
}));

export default loading;