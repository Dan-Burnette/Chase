
function makeNewPosition(hm, wm){
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

function animateDiv(hm, wm){
    var newCoords = makeNewPosition(hm,wm);
    $('.target').animate({ top: newCoords[0], left: newCoords[1] });
};

function addPlayer(id){
    var $player = $("<div class='player'></div>");
    $player.addClass(id);
    $('.game').append($player);
};

function movePlayer(id, coordinates){
    $("." + id).animate({ top: coordinates.y, left: coordinates.x });
    console.log('moving to', coordinates);
};

// function getCurrentPosition(){
//     var x = $('.target').css('left');
//     var y = $('.target').css('top');
//     return [x,y];
// }