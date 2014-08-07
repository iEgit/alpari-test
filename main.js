var $ = require('jquery'),
	Backbone = require('backbone')

// hook for backbone
Backbone.$ = $;

require('jquery-ui/droppable');
require('jquery-ui/sortable');
require('jquery.transit');

// offsets for initial transition
// first element - x axis, second - y
var offsets = [40, 80]

// Backbone view for the list
var ulView = Backbone.View.extend({
	initialize: function (opts) {
		
		var $el = this.$el = $(opts.el),
			self = this;
		this.index = opts.index;
		$el.css({
			display: 'block'
		}).transition({ translate: [this.index*($el.width() + offsets[0]), Math.abs(this.index)*offsets[1]],
			duration: 1000,
			easing: 'cubic-bezier(0.230, 0.795, 0.465, 1.270)',
			complete: function () {

				//initialize sortable list
				$el.sortable({
				  connectWith: $el.siblings(),
				  receive: function ($evt, obj) {
					//copying only html of the element since it has a lot of rubbish attached

					if (opts.index === 1) {
						views[0].$el.append('<li>' + $(obj.item).html())
					}
				  },
				  tolerance: 'pointer',
				  revert: 200,
				  zIndex: 9999
				}).droppable({ // to properly handle highlighting
					over: function () {
						//adding highlight to lists
						if (opts.index === 1) {
							$el.addClass('highlight-third')
						} else if (opts.index === 0) {
							$el.addClass('highlight-second')
						}
					},
					out: function (argument) {
						$el.removeClass('highlight-second highlight-third')
					},
					drop: function () {
						$el.removeClass('highlight-second highlight-third')
					}
				})
			}
		}).on('mousedown', function () {
			$el.css('z-index', 3)
		}).on('mouseup', function () {
			$el.css('z-index', 2)
		})
	}
})

var views = []

function onload () {

	//firstly create and show the welcome banner
	var $welcome = $('<div class="welcome">')
		.appendTo('body').css({opacity:0, scale: [2,2]})
		.html('<h1>Welcome for Alpari</h1><h2>Thank you for your attention!</h2>')
		.transition({opacity:1, 
			scale: [1,1],
			complete: function () {
				//wait 2 seconds, hide it and initialize views
				setTimeout(function () {
					$welcome.transition({
						opacity:0,
						scale: [2,2],
						complete: function () {
							$('ul').each(initView);
						}
					})					
				}, 2000)
			}})
}


 // creates new ulView
function initView (index, el) {
	views.push(new ulView({
			el: el,
			index: index - 1,
	}));
}

$(onload);