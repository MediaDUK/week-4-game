// Only modify your own prototypes.
// Never modify the prototypes of standard JavaScript objects.
function character(name, hp, img, attack) {
  this.name = name;
  this.hp = hp;
  this.img = img;
  this.attack = attack;
  this.counter = 1;
  this.counterAttack = function() {
    return 5
  };
  this.takeDamage = function(damage) {
    this.hp -= 10*this.counter
    this.counter+=1
  };
}

function makeCharacter(name, hp, img, attack) {
  return new character(name, hp, img, attack)
}

// new character('Vero', 100, 'assets/img/char-1.png', 10);

var charArr = [
  makeCharacter('Vero', 100, 'assets/img/char-1.png', 10),
  makeCharacter('Naka', 80, 'assets/img/char-2.png', 30),
  makeCharacter('Lugdog', 70, 'assets/img/char-3.png', 30),
  makeCharacter('Maduga', 80, 'assets/img/char-4.png', 30),
  makeCharacter('Agloc', 80, 'assets/img/char-5.png', 30),
  makeCharacter('Tomas', 80, 'assets/img/char-6.png', 30)
]
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
    charCol.html('<h3 class="char-name">' + charArr[i].name + '</h3><img src="' + charArr[i].img + '">')
    $characters.append(charCol)
  }
  loadAudio($('#audio-vs-screen'))
  playAudio($('#audio-vs-screen'))
}
// $(document).on('mouseenter', '.char', function () {
//   $(this).addClass('pulse')
// })
// $(document).on('mouseleave', '.char', function () {
//   $(this).removeClass('pulse')
// })
// Evenet handing for Hero Selection
$(document).on('click', '.char', function () {
  var characterIndex = $(this).attr('value')
  var $gameDirections = $('#game-direction');
  isHeroChosen = true
  if (isEnemyChosen === false) {
    if (isHeroChosen === true) {
      isEnemyChosen = true
      // get hero clicked
      chosenHero = charArr[characterIndex]
      console.log(chosenHero)
      var $heroSelection = $('#character-' + characterIndex);
      // $heroSelection.addClass('hero-selected')
      setTimeout(function () {
        $heroSelection.detach().removeClass('hero-selected')
        $heroSelection.find('.char-name').remove()
        $('#fight-bar').append('<div class="hero-side"><h2 class="fightbar-name">' + chosenHero.name + ' <span class="small hp">' + chosenHero.hp + ' HP</span></h2></div>')
        var $heroAttackBtn = $('<button id="hero-attack" type="button" class="btn btn-outline-light attack-btn">Attack</button>')
        var $heroSide = $('.hero-side');
        $heroSide.append($heroSelection).append($heroAttackBtn)
        $gameDirections.html('Select Your <br>Enemy')
      }, 1000)
    }
  } else {
    // Hero has already been selected so reset everything
    isEnemyChosen = false
    isHeroChosen = false

    // get enemeny clicked
    var chosenEmeney = charArr[characterIndex]
    var $enemeySelection = $('#character-' + characterIndex)
    $enemeySelection.addClass('enemey-selected')
    setTimeout(function () {
      $enemeySelection.detach().removeClass('enemey-selected').addClass('flip-enemey')
      $enemeySelection.find('.char-name').remove()
      $('#fight-bar').append('<div class="enemey-side animated"><h2>' + chosenEmeney.name + ' <span id="hp" class="small hp">' + chosenEmeney.hp + '</span> <span class="small hp">HP</span></h2></div>')
      // var $enemeyAttackBtn = '<button type="button" class="btn btn-outline-light">Attack</button>'
      var $enemeySide = $('.enemey-side');
      $enemeySide.append($enemeySelection)
      // .append($enemeyAttackBtn);
      $('.characters').addClass('fadeOut').css('display', 'none')
      $('#fight-bar').addClass('fadeIn').css('zIndex', 99)
      // .css('visibility', 'visible')
      setTimeout(function () {
        $gameDirections.html('</br>Fight')
      }, 1000)
    }, 1000)

    var $heroAttackBtn = $('#hero-attack');
    $heroAttackBtn.on('click', function (event) {
      event.preventDefault();
      console.log('------------------'+chosenHero.name+' is attacking----------------------------')
      $('.enemey-side').addClass('shake')
      $('#hero-attack').prop('disabled', true);
      chosenEmeney.takeDamage(chosenHero.attack)
     $('#hp').text(chosenEmeney.hp);
      var hitPoints = $('#hp').text();
      if (parseInt(hitPoints) < 0) {
        alert(chosenEmeney.name+ 'has died');
        $enemeySelection.detach().addClass('make-small')

        $('#dead-opponents').removeClass('hide-bar').append($enemeySelection)
      }
      console.log('typeof hitPoints === ', typeof hitPoints)
      console.log('parseInt(hitPoints) === ', parseInt(hitPoints))
      console.log('typeof parseInt(hitPoints) === ', typeof parseInt(hitPoints))
      
      
      setTimeout(function () {
        $('.enemey-side').removeClass('shake')
        $('#hero-attack').prop('disabled', false);
      }, 2000)
    });
    $(document).off('click');
  }
  // END Char Selection
})

initGame()