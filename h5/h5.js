function H5() {

    this.id = ('h5_' + Math.random()).replace('.', '_');
    this.el = $('<div class="h5" id="' + this.id + '">').hide();
    this.page = [];
    $('body').append(this.el);

    // this.addPage = function(name , text){
    //     var page = $('<div class="h5_page section">');
    //
    //     if( name != undefined)
    //     {
    //         page.addClass('h5_page_'+name);
    //     }
    //     if( text != undefined )
    //     {
    //         page.text(text);
    //     }
    //     this.el.append(page);
    //     this.page.push(page);
    //
    //     if( typeof this.whenAddPage === 'function')
    //     {
    //         this.whenAddPage();
    //     }
    //
    //
    //     return this;
    // }
    //
    // this.addComponent = function(name, cfg)
    // {
    //     var cfg = cfg || {};
    //     cfg = $.extend({
    //         type:'base'
    //     },cfg);
    //     var component;
    //     var page = this.page.slice(-1)[0];
    //     switch( cfg.type ){
    //         case 'base':
    //              component = new H5ComponentBase(name, cfg);
    //         break;
    //         case 'polyline':
    //             component = new H5ComponentPolyline(name, cfg);
    //             break;
    //         case 'pie':
    //             component = new H5componentPie(name, cfg);
    //             break;
    //         case 'bar':
    //             component = new H5ComponentBar(name, cfg);
    //             break;
    //         case 'radar':
    //             component = new H5ComponentRadar(name, cfg);
    //             break;
    //         case 'point':
    //             component = new H5ComponentPoint(name, cfg);
    //             break;
    //         default:
    //     }
    //     page.append(component);
    //     return this;
    // }

    // this.loader = function()
    // {
    //     this.el.fullpage(
    //     {
    //         onLeave:function(index,nextIndex, direction){
    //             $(this).find('.h5_component').trigger('onLeave');
    //         },
    //         afterLoad:function( anchorLink, index ){
    //             $(this).find('.h5_component').trigger('onLoad');
    //         }
    //     });
    //     this.page[0].find('.h5_component').trigger('onload');
    //     this.el.show();
    // }
    this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader;
}

H5.prototype = {

    addPage: function (name, text) {
        var page = $('<div class="h5_page section">');

        if (name != undefined) {
            page.addClass('h5_page_' + name);
        }
        if (text != undefined) {
            page.text(text);
        }
        this.el.append(page);
        this.page.push(page);

        if (typeof this.whenAddPage === 'function') {
            this.whenAddPage();
        }

        return this;
    },

    addComponent: function (name, cfg) {
        var cfg = cfg || {};

        //添加component的默认类型
        cfg = $.extend({
            type: 'base'
        }, cfg);

        var component;
        //找到最后一页
        var page = this.page.slice(-1)[0];

        switch (cfg.type) {
            case 'base':
                component = new H5ComponentBase(name, cfg);
                break;
            case 'polyline':
                component = new H5ComponentPolyline(name, cfg);
                break;
            case 'pie':
                component = new H5componentPie(name, cfg);
                break;
            case 'bar':
                component = new H5ComponentBar(name, cfg);
                break;
            case 'radar':
                component = new H5ComponentRadar(name, cfg);
                break;
            case 'point':
                component = new H5ComponentPoint(name, cfg);
                break;
            default:
        }

        page.append(component);
        return this;
    },

    loader: function () {
        this.el.fullpage(
            {
                onLeave: function (index, nextIndex, direction) {

                    $(this).find('.h5_component').trigger('onLeave');
                },
                afterLoad: function (anchorLink, index) {
                    $(this).find('.h5_component').trigger('onLoad');
                }
            });
        // this.page[0].find('.h5_component').trigger('onload');
        this.el.show();

    },
};























