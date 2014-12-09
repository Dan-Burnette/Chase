$(document).ready(function(){
    animateDiv();
    
});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h =  $('.game').height() - 50;
    var nh = Math.floor(Math.random() * h);

    var wWindow = $(window).width();
    var lmargin = parseInt($('.game').css('marginLeft'));
    var rmargin = parseInt($('.game').css('marginRight'));
    var w = $('.game').width() - 50;
    var wmax = wWindow - rmargin;
    var wmin = wWindow - rmargin - w;
    var nw = Math.random() * (wmax - wmin) + wmin;
    
    return [nh,nw];    
    
}


function animateDiv(){
    var newq = makeNewPosition();
    $('.target').animate({ top: newq[0], left: newq[1] }, function(){
      animateDiv();        
    });
    getCurrentPosition();
    
};

function getCurrentPosition(){
    var x = $('.target').css('left');
    var y = $('.target').css('top');
    return [x,y];
}