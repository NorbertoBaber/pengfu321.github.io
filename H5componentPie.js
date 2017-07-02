var H5componentPie = function (name, cfg )
{
    var component = new H5ComponentBase( name , cfg );

    var w = cfg.width;
    var h = cfg.height;

//背景画布开始
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',1);
    component.append(cns);

    //底图层
    var r = w/2;
    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = .1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

//数据画布开始
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',2);
    component.append(cns);

    var colors = ['red','green','blue','orange','gray'];
    var sAngel = 1.5*Math.PI;
    var eAngel = 0;
    var aAngel = Math.PI*2;

    var step = cfg.data.length;
    for(var i=0;i<step;i++)
    {
        var item = cfg.data[i];
        var color = item[2] || (item[2] = colors.pop());

        eAngel =sAngel + aAngel * item[1];
        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineWidth = .1;
        ctx.moveTo(r,r);
        ctx.arc(r,r,r,sAngel,eAngel);
        ctx.fill();
        ctx.stroke();

        sAngel = eAngel;

        //项目文本
        var text = $('<div class="text">');
        text.text( cfg.data[i][0] );
        var per = $('<div class="per">');
        per.text( cfg.data[i][1]*100 + '%');
        text.append(per);

        var x = r + Math.sin( .5 * Math.PI - sAngel )*r;
        var y = r + Math.cos( .5 * Math.PI - sAngel )*r;

        if(x > w/2){
            text.css('left',x/2);
        }else{
            text.css('right',(w-x)/2);
        }

        if(y > h/2){
            text.css('top',y/2);
        }else{
            text.css('bottom',(h-y)/2);
        }
        if( cfg.data[i][2] ){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);
        component.append(text);


    }

//蒙板层画布开始
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height = h;
    $(cns).css('zIndex',3);
    component.append(cns);

    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = .1;

    //动画
var draw = function(per){
    ctx.clearRect(0,0,w,h);

    ctx.beginPath();
    ctx.moveTo(r,r);
    if(per <=0){
        ctx.arc(r,r,r,0,2*Math.PI);
        component.find('.text').css('opacity',0);
    }
    else{
        ctx.arc(r,r,r,sAngel,sAngel + 2*Math.PI*per, true);
    }

    ctx.fill();
    ctx.stroke();
    if(per >= 1){
        H5componentPie.reSort(component.find('.text'));
        component.find('.text').css('opacity',1);
    }
}

    draw(0);
    component.on('onLoad',function(){
        //雷达图动画生长
        var s = 0;
        for( i=0;i<100;i++){
            setTimeout(function()
            {
                s+=.01;
                draw(s);
            },i*10+500);
        }
    });
    component.on('onLeave',function(){
        //雷达图退场动画
        var s = 1;
        for( i=0;i<100;i++){
            setTimeout(function()
            {
                s-=.01;
                draw(s);
            },i*10);
        }
    });
    return component;
}

    H5componentPie.reSort = function (list) {

       var compare = function( domA, domB )
       {
           var offsetA = $(domA).offset();
           var offsetB = $(domB).offset();

           var shadowA_x = [ offsetA.left,$(domA).width() + offsetA.left ];
           var shadowA_y = [ offsetA.top,$(domA).height() + offsetA.top ];

           var shadowB_x = [ offsetB.left,$(domB).width() + offsetB.left ];
           var shadowB_y = [ offsetB.top,$(domB).height() + offsetB.top ];

            var intersect_x = ( shadowA_x[0] > shadowB_x[0] && shadowA_x[0]< shadowB_x[0])
           || ( shadowA_x[1] > shadowB_x[0] && shadowA_x[1]< shadowB_x[1]);

           var intersect_Y = ( shadowA_Y[0] > shadowB_Y[0] && shadowA_Y[0]< shadowB_Y[0])
               || ( shadowA_Y[1] > shadowB_Y[0] && shadowA_Y[1]< shadowB_Y[1]);

            return intersect_x && intersect_y;
       }

       $.each(list, function(i, domTarget ){
           if( list[i+1]){
               compare(domTarget, list[i+1])
           }
       })
    }



























