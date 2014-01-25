define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, bb) {

	/**
	 * A simple class to store our views
	 */
	var Storage = function() {
		this.storage = {};
	};
	Storage.prototype = {

		get : function(key)
		{
			return this.storage[key];
		},

		set : function(key, val)
		{
			return this.storage[key] = val;
		},

	};

	/**
	 * Base view - only for extending
	 */
	var BaseView = bb.View.extend({
	 
		templateDriver : new Storage,
	 
		viewPath : '/',

		initialize : function()
		{
			console.log('BaseView initiated');
		},
	 
		template : function()
		{
			var view, data, template, self;
	 
			switch(arguments.length) {
				case 1:
					view = this.view;
					data = arguments[0];
					break;
				case 2:
					view = arguments[0];
					data = arguments[1];
					break;
			}
	 
			template = this.getTemplate(view, false);
			self = this;
	 
			return template(data, function(partial)
			{
				return self.getTemplate(partial, true);
			});
		},

		getTemplate : function(view, isPartial)
		{
			return this.templateDriver.get(view) || this.fetch(view, isPartial);
		},

		setTemplate : function(name, template)
		{
			return this.templateDriver.set(name, template);
		},
	 
		fetch : function(view, isPartial)
		{
			var markup = $.ajax({
				async: false,
				url: this.viewPath + view.split('.').join('/') + '.mustache'
			}).responseText;
	 
			return isPartial
				? markup
				: this.setTemplate(view, Mustache.compile(markup));
		}
	});

	return BaseView;

});