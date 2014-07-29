var app = app || {};

app.TodoView = Backbone.View.extend({
  tagname: 'li',
  template: _.template( $('#item-template').html() ),

  events: {
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'clear',
    'dblclick label': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close'
  },

  intialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {
    this.$el.html(this.template( this.model.attributes));
    this.$input = this.$('.edit');
    return this;
  },
  toggleVisible: function() {
    this.$el.toggleClass('hidden', this.isHidden());
  },

  isHidden: function() {
    var isCompleted = this.model.get('completed');
    return (
      (!isCompleted && app.TodoFilter === 'completed') || (isCompleted && app.TodoFilter === 'active')
      );
  },

  togglecompleted: function() {
    this.model.toggle();
  },

  edit: function() {
    this.$el.addClass('editing');
    this.$input.focus();
  },

  close: function() {
    var value = this.$input.val().trim();

    if( value ) {
      this.model.save({title: value});
    } else {
      this.clear();
    }

    this.$el.removeClass('editing');
  },

  updateOnEnter: function(event) {
    if (event.which === ENTER_KEY) {
      this.close();
    }
  },

  clear: function() {
    this.model.destroy();
  }

})