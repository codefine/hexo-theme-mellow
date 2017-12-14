$.extend({
	menuInWidth: 1240,
	hideOnMask: [],
	minWidth: 760,
	fixedClick: function() {
		FastClick.attach(document.body);
	},
	page: function () {
		var $elements = $('.fade, .fade-scale');
		var visible = false;
		return {
			loaded: function () {
				$elements.each(function () {
					$(this).addClass('in')
				});
				visible = true;
			},
			unload: function () {
				$elements.each(function () {
					$(this).removeClass('in')
				});
				visible = true;
			},
			visible: visible
		}
	},
	toc: function (toc) {
		var toc = $('.post-widget');
		var bannerH = $('.post-header').outerHeight();
		var headerH = $('#header').outerHeight();
		var titles = $('#post-content').find('h1, h2, h3, h4, h5, h6');
		var scrollTop = $(document).scrollTop();
		var offset = $(document).width() - toc.offset().left - toc.outerWidth();
		toc.find('a[href="#' + titles[0].id + '"]').parent().addClass('active');
		return {
			fixed: function (top) {
				if (top > bannerH - headerH) {
					// toc.css('top', headerH + offset);
					toc.addClass('fixed');
				} else {
					toc.removeClass('fixed');
				}
			},
			actived: function (top) {
				titles.each(function () {
					var plug = $(this).css('marginBottom');
					if (top > $(this).offset().top - headerH) {
						toc.find('li.active').removeClass('active');
						var active = toc.find('a[href="#' + $(this).attr('id') + '"]').parents('.post-toc-item');
						active.addClass('active');
					}
				});
				if (top < titles.eq(0).offset().top) {
					toc.find('li.active').removeClass('active');
					var active = toc.find('a[href="#' + titles.eq(0).attr('id') + '"]').parent();
					active.addClass('active');
				}
			},
			go: function () {
				toc.delegate('a', 'click', function (e) {
					e.preventDefault();
					var id = $(this).attr('href').replace(/^\#/, '');;
					var titles = $('#post-content').find('h1, h2, h3, h4, h5, h6');
					var offset = 10;
					titles.each(function (i, el) {
						if ($(this).attr('id') === id) {
							var top = $(this).offset().top;
							$('body,html').stop(true, false);
							$('body,html').animate({
								scrollTop: top - offset
							}, 300);
						}
					});
				});
			}
		}
	},
	toggleMenu: function () {
		var main = $('#main');
		var menu = $('#menu');
		var root = $('html');
		var mask = $('#mask');
		var headerTitle = $('.header-title');
		var isWX = /micromessenger/i.test(navigator.userAgent);
		return {
			init: function () {
				var menuToggle = $('#menu-toggle');
				var menuOff = $('#menu-off');
				menu.removeClass('hide');
				menuToggle.click(function (e) {
					e.preventDefault();
					$.toggleMenu().show();
				});
				menuOff.click(function (e) {
					e.preventDefault();
					$.toggleMenu().hide();
				});
				if ($(document).width() >= $.menuInWidth) {
					headerTitle.addClass('push');
				}
			},
			show: function () {
				menu.removeClass('hide');
				$.hideOnMask = [];
				$.hideOnMask.push($('#menu-off'));
				if ($(document).width() < $.menuInWidth) {
					mask.addClass('in');
					menu.addClass('show');
					menu.removeClass('hide');
					if (isWX) {
						var top = $(document).scrollTop();
						main.addClass('lock');
						main.scrollTop(top);
					} else {
						root.addClass('lock');
					}
				} else {
					headerTitle.addClass('push');
				}
			},
			hide: function () {
				menu.removeClass('show');
				menu.addClass('hide');
				mask.removeClass('in');
				headerTitle.removeClass('push');
				if (isWX) {
					var top = $(document).scrollTop();
					main.removeClass('lock');
					main.scrollTop(top);
				} else {
					root.removeClass('lock');
				}
			}
		}
	},
	fixedHeader: function (top) {
		var header = $('#header');
		var targetHeight = $('.content-header').outerHeight() - header.outerHeight();
		// headerH = header.height();
		if (top > targetHeight) {
			header.addClass('fixed');
		} else {
			header.removeClass('fixed');
		}
	},
	toggleGoTop: function () {
		var gotop = $('#gotop');
		return {
			active: function () {
				gotop.click(function () {
					$('body,html').stop(true, false);
					$('body,html').animate({
						scrollTop: 0
					}, 300);
				});
			},
			scroll: function (top) {
				if (top > $(document).height() / 5) {
					gotop.addClass('in');
				} else {
					gotop.removeClass('in');
				}
			}
		}
	},
	share: function () {
		var pageShare = $('#pageShare');
		var fabShare = $('#shareFab');
		var menuShare = $('#menuShare');
		var globalShare = $('#globalShare');
		var wxShareBtn = $('.wxFab');
		var wxSharePop = $('#wxShare');
		var mask = $('#mask');

		if (fabShare.length > 0) {
			fabShare.click(function () {
				pageShare.toggleClass('in');
			});

			$(document).click(function (e) {
				if (!fabShare.get(0).contains(e.target)) {
					pageShare.removeClass('in');
				}
			});
		}

		wxShareBtn.click(function () {
			if (wxSharePop.hasClass('in')) {
				mask.removeClass('in');
				wxSharePop.removeClass('in');
				setTimeout(function () {
					wxSharePop.removeClass('ready');
				}, 300)
			} else {
				mask.addClass('in');
				wxSharePop.addClass('ready');
				setTimeout(function () {
					wxSharePop.addClass('in');
				}, 0);
				$.hideOnMask = [];
				$.hideOnMask.push($(this), wxSharePop.find('.close'));
			}
		});
		wxSharePop.find('.close').click(function () {
			mask.removeClass('in');
			wxSharePop.removeClass('in');
			globalShare.removeClass('in');
			$.hideOnMask = [];
			setTimeout(function () {
				wxSharePop.removeClass('ready');
				globalShare.removeClass('ready');
			}, 300)
		});
	},
	search: function () {
		var searchBtn = $('#site_search_btn');
		var searchPanel = $('#site_search');
		var searchClose = searchPanel.find('.close');
		var mask = $('#mask');
		return {
			init: function () {
				searchBtn.click(function () {
					if ($(window).width() < $.minWidth) {
						$('html').addClass('lock');
					} else {
						mask.addClass('in');
					}
					searchPanel.addClass('in');
					$.hideOnMask = [];
					$.hideOnMask.push($(this), searchPanel.find('.close'));
				});
				searchClose.click(function () {
					if ($(window).width() < $.minWidth) {
						$('html').removeClass('lock');
					} else {
						mask.removeClass('in');
					}
					searchPanel.removeClass('in');
				});
			},
			zoom: function () {
				if ($(document).width() < $.menuInWidth) {
					searchPanel.removeClass('shrink');
				} else {
					searchPanel.addClass('shrink');
				}
			},
		}
	},
	reward: function () {
		var reward = $('#reward');
		var rewardBtn = $('#rewardBtn');
		var rewardToggle = $('#rewardToggle');
		var rewardCode = $('#rewardCode');
		var mask = $('#mask');

		rewardBtn.click(function () {
			if (reward.hasClass('in')) {
				mask.removeClass('in');
				reward.removeClass('in');
				setTimeout(function () {
					reward.removeClass('ready');
				}, 300);
			} else {
				mask.addClass('in');
				reward.addClass('ready');
				setTimeout(function () {
					reward.addClass('in');
				}, 0);
				$.hideOnMask = [];
				$.hideOnMask.push($(this), reward.find('.close'));
			}
		});

		reward.find('.close').click(function () {
			mask.removeClass('in');
			reward.removeClass('in');
			$.hideOnMask = [];
			setTimeout(function () {
				reward.removeClass('ready');
			}, 300);
		});

		if (rewardToggle.length != 0) {
			rewardToggle.change(function () {
				rewardCode.attr('src', this.checked ? this.dataset.alipay : this.dataset.wechat);
			});
		}
	},
	mask: function () {
		var mask = $('#mask');
		mask.click(function (e) {
			$.hideOnMask.forEach(function (el) {
				el.trigger('click');
			});
			e.preventDefault();
		});
	},
	waves: function () {
		if (window.Waves) {
			Waves.init();
			Waves.attach('.global-share li', ['waves-block']);
			Waves.attach('.article-tag-list-link, #page-nav a, #page-nav span', ['waves-button']);
		}
	},
	waterfall: function () {

		if ($(window).width() < $.minWidth) return;

		$('.waterfall').each(function () {
			var childs = $(this).find('.waterfall-item');
			var columns = [0, 0];

			childs.each(function () {
				var i = columns[0] <= columns[1] ? 0 : 1;
				// item.style.cssText = 'top:' + columns[i] + 'px;left:' + (i > 0 ? '50%' : 0);

				$(this).css({
					top: columns[i],
					left: i > 0 ? '50%' : 0
				});
				columns[i] += $(this).get(0).offsetHeight;
			})

			// el.style.height = Math.max(columns[0], columns[1]) + 'px';
			$(this).css('height', Math.max(columns[0], columns[1]));
			$(this).addClass('in');
		})
	},
	tabBar: function () {
		var allTagsBtn = $('.tags-list-more');
		if (allTagsBtn.length > 0) {
			allTagsBtn.click(function () {
				$(this).parents('.tabs-bar').toggleClass('expand');
			});
		}
	}
});