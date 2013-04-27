
var ListItem = FruitMachine.define({
	module: 'list-item',
	template: templates.listItem,

	setup: function() {
		var self = this;
		this.button = this.el.querySelector('.list-item_close-button');
		this.button.addEventListener('click', function() {
			self.fire('closebuttonclick', self);
		});
	}
});