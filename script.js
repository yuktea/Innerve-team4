

let i=0;

$(document).ready(function() {
	navNumbers();
	backToDefault();
	
	// show hovered li stuff
	$('.main-menu').on('mouseover', 'li', function() {
		showTarget($(this));
	});

	// show default .active li stuff
	$('.main-menu').on('mouseleave', backToDefault);
	
	// change active list item
	$('.main-menu').on('click', 'li', function() {
		changeActive($(this));
	});
	
	// toggle menu
	$('.toggle').on('click', toggleMenu);
	
	// for showcase only
	var tl = new TimelineMax(),
			body = $('body'),
			header = $('header'),
			content = $('.content p'),
			toggle = $('.toggle'),
			nav = $('nav');
	
	
	
	tl.to(header, .25, {
		opacity: 1,
		// delay: .5
	});
	
	tl.to(content, .25, {
		opacity: 1
	}, '-=.25');
	// changed from 3 to 0
	tl.call(function() {
		toggleMenu();
	}, null, null, 0);
	// changed from 4 to 0
	tl.call(function() {
		toggleMenu();
	}, null, null, 0);

});

// toggle menu
function toggleMenu() {
	var toggle = $('.toggle');
	var nav = $('nav');
	
	if(toggle.hasClass('clicked')) {
		toggle.removeClass('clicked');
		nav.removeClass('open');
		console.log('remove open');
		setTimeout(function() {
			console.log('add hidden');
			nav.addClass('hidden');
		}, 500);
	} else {
		nav.removeClass('hidden');
		toggle.addClass('clicked');
		nav.addClass('open');
	}
}

// give the list items numbers
function navNumbers() {
	var sum = $('.main-menu li').length;
	var i = 0;
	var x = 0;

	$('.showcase-menu li').each(function() {
		$(this).attr('data-target', x);
		x++;
	});
	
	$('.main-menu li').each(function() {
		var number = ('0' + i).slice(-2);
		var numberElement = '<div class="number"><span>'+number+'</span></div>';
		$(this).prepend(numberElement);
		$(this).attr('data-target', i);
		i++;
	});
}


// show the hovered list item stuff
function showTarget(e) {
	$('.main-menu li').removeClass('hover');
	
	var target = $(e).attr('data-target');
	var showcaseHeight = $('.showcase-menu').outerHeight();
	
	showcaseHeight = (showcaseHeight * target) * -1;
	
	$('.showcase-menu').css({
		top: showcaseHeight
	});
	
	$(e).addClass('hover');
}

// show the list item stuff of .active
function backToDefault() {
	$('.main-menu li').removeClass('hover');
	
	var activeItem = $('.main-menu li.active');
	var target = activeItem.attr('data-target');
	var showcaseHeight = $('.showcase-menu').outerHeight();
	
	showcaseHeight = (showcaseHeight * target) * -1;
	
	$('.showcase-menu').css({
		top: showcaseHeight
	});
	
	activeItem.addClass('hover');
}


// change active list item
function changeActive(e) {
	$('.main-menu li').removeClass('active');
	$(e).addClass('active');
}










var ping = new Audio('http://tmp.janustech.net/notes/pin.mp3');
var timelines = {};

$('.content .circle').each(function () {
  var $this = $(this);
  var id = '#' + $this.attr('id');
  var tl = new mojs.Timeline();

  const circle = new mojs.Html({
    el: id,
    left: '50%',
    top: '50%',
    scale: {
      1: 0 },

    duration: 500,
    easing: 'cubic.out' }).
  then({
    scale: {
      0: 1,
      duration: 500 } });



  const burst = new mojs.Burst({
    parent: id,
    radius: {
      0: 200 },

    count: 7,
    children: {
      fill: { 'cyan': 'yellow' },
      radius: 10,
      duration: 2000 } });



  tl.add(circle, burst);

  timelines[$this.attr('id')] = tl;
});

var stopX = $('#main-notice').parent().width();

stopX += $('#main-notice').width() / 2 - 100;

const notice = new mojs.Html({
  el: '#main-notice',
  x: {
    0: 1000 },

  duration: 2000,
  easing: 'cubic.in' });


notice.play();

//new MojsPlayer({ add: notice });

$('.circle').on('click', function (e) {
  var tl = timelines[$(this).attr('id')];

  ping.play();
  tl.replay();
});



