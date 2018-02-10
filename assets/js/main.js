var charArr = [{
  name: 'char-one',
  hp: 50,
  img: 'assets/img/char-1.png'
}, {
  name: 'char-two',
  hp: 40,
  img: 'assets/img/char-2.png'
}, {
  name: 'char-three',
  hp: 70,
  img: 'assets/img/char-3.png'
}, {
  name: 'char-four',
  hp: 90,
  img: 'assets/img/char-4.png'
}, {
  name: 'char-five',
  hp: 90,
  img: 'assets/img/char-5.png'
}, {
  name: 'char-six',
  hp: 90,
  img: 'assets/img/char-6.png'
}]
var chosenHero,
  isHeroChosen,
  isHeroAlive,
  chosenEnemy,
  isEnemyChosen,
  isEnemyAlive;
///////////// -------- Audio Functions
function loadAudio(target) {
  target.trigger('load');
}
function playAudio(target) {
  target.trigger('play');
}
function stopAudio(target) {
  target.trigger('pause');
  target.prop('currentTime', 0);
}

///////////// -------- MAIN GAME INIT
function initGame() {
  isHeroChosen = false
  isEnemyChosen = false
  var num = Math.floor(12 / charArr.length)
  for (let i = 0; i < charArr.length; i++) {
    // const character = array[i];
    var charCol = $('<div id="character-' + i + '" class="char animated infinite col-md-' + num + '" value="' + i + '"></div>')
    var $characters = $('.characters')
    charCol.html('<img src="' + charArr[i].img + '"></h3>' + charArr[i].name + '</h3>')
    $characters.append(charCol)
  }
  loadAudio($('#audio-vs-screen'))
  // playAudio($('#audio-vs-screen'))
}
$(document).on('mouseenter', '.char', function () {
  $(this).addClass('pulse')
})
$(document).on('mouseleave', '.char', function () {
  $(this).removeClass('pulse')
})
// Evenet handing for Hero Selection
$(document).on('click', '.char', function () {
  var characterIndex = $(this).attr('value')
  var $gameDirections = $('#game-direction');
  isHeroChosen = true
  if (isEnemyChosen === false) {
    if (isHeroChosen === true) {
      var chosenHero = charArr[characterIndex]
      var $heroSelection = $('#character-' + characterIndex).detach()
      $('.hero').append('<h2>'+chosenHero.name+' <span class="small hp">'+chosenHero.hp+' HP</span><h2>')
                .append($heroSelection);
      $gameDirections.text('Select Your Enemy')
      isEnemyChosen = true
    }
  } else {
    // Hero has been selected (isEnemyChosen ===)
    var chosenEmeney = charArr[characterIndex]
    var $enemeySelection = $('#character-' + characterIndex).detach()
    $('.enemey').append('<h2>' + chosenEmeney.name + ' <span class="small hp">' + chosenEmeney.hp +' HP</span><h2>')             .append($enemeySelection);
    $gameDirections.text('')
    // reset globals
    isEnemyChosen = false
    isHeroChosen = false

    $('.characters').addClass('fadeOut')
    $('#fight-bar').css('visibility', 'visible')
  }
  // END Char Selection
})

initGame()