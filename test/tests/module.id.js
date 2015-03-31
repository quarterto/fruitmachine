var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase('View#id()', {
  setUp: helpers.createView,

  "Should return a child by id.": function() {
    var layout = new Layout({
      children: {
        1: {
          module: 'apple',
          id: 'some_id'
        }
      }
    });

    var child = layout.id('some_id');
    assert.defined(child);
  },

  "Should return the view's own id if no arguments given.": function() {
    var id = 'a_view_id';
    var view = new Apple({ id: id });

    assert.equals(view.id(), id);
  },

  "Should not return the view's own id the first argument is undefined": function() {
    var id = 'a_view_id';
    var view = new Apple({ id: id });
    refute(view.id(undefined));
  },

  tearDown: helpers.tearDown
});
