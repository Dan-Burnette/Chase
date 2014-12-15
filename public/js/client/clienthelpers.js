
var makeNewPosition = function(hm, wm){
    var h =  $('.game').height() - $('.target').height();
    var nh = Math.floor(hm * h);

    var wWindow = $(window).width();
    var lmargin = parseInt($('.game').css('marginLeft'));
    var rmargin = parseInt($('.game').css('marginRight'));
    var w = $('.game').width() - $('.target').width();
    var wmax = wWindow - rmargin - $('.target').width();
    var wmin = wWindow - rmargin - w;
    var nw = wm * (wmax - wmin) + wmin;
    
    return [nh,nw];    
}

 var animateDiv = function(hm, wm){
    var newCoords = makeNewPosition(hm,wm);
    var duration = (Math.random()*3000);
    console.log('duration is ', duration);
    $('.target').animate({ top: newCoords[0], left: newCoords[1] }, duration);
};

var addPlayer = function(id){
    var $player = $("<div class='player'></div>");
    $player.addClass(id);
    $('.game').append($player);
};

var movePlayer = function(id, coordinates){
    $("." + id).stop().animate({ top: coordinates.y, left: coordinates.x });
    console.log('moving to', coordinates);
};

