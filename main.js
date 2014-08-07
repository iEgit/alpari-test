var $ = require('jquery'),
	Backbone = require('backbone')

Backbone.$ = $;

require('jquery-ui/droppable');
require('jquery-ui/sortable');
require('jquery.transit');


var offsets = [40, 80]




var ulView = Backbone.View.extend({
	initialize: function (opts) {
		
		var $el = this.$el = $(opts.el),
			self = this;
		this.index = opts.index;
		console.log(this.index*($el.width() + offsets[0]));
		$el.css({
			display: 'block'
		}).transition({ translate: [this.index*($el.width() + offsets[0]), Math.abs(this.index)*offsets[1]],
			duration: 1000,
			easing: 'cubic-bezier(0.230, 0.795, 0.465, 1.270)',
			complete: function () {
				$el.sortable({
				  connectWith: $el.siblings(),
				  receive: function ($evt, obj) {
					if (opts.index === 1) {
						views[0].$el.append('<li>' + $(obj.item).html())
					}
				  },
				  over: function () {
				  	
				  },
				  activate: function ($evt, obj) {
				  	if (this !== obj.sender[0]) return;
				  	// $(this.)
				  },
				  tolerance: 'pointer',
				  revert: 200,
				  zIndex: 9999
				}).droppable({
					over: function () {
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
	var $welcome = $('<div class="welcome">')
		.appendTo('body').css({opacity:0, scale: [2,2]})
		.html('<h1>Welcome for Alpari</h1><h2>Thank you for your attention!</h2>')
		.transition({opacity:1, 
			scale: [1,1],
			complete: function () {
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

function initView (index, el) {
	
	views.push(new ulView({
			el: el,
			index: index - 1,
	}));
}

$(onload);