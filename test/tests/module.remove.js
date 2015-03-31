var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase('View#remove()', {

  "Should remove the child passed from the parent's children array": function() {
    var list = new helpers.Views.Layout();
    var Apple = helpers.Views.Apple;
    var apple1 = new Apple();
    var apple2 = new Apple();

    list
      .add(apple1)
      .add(apple2);

    list.remove(apple1);

    assert(!~list.children.indexOf(apple1));
  },

  "Should remove all lookup references": function() {
    var list = new helpers.Views.Layout();
    var Apple = helpers.Views.Apple;
    var apple = new Apple({ id: 'foo' });

    list.add(apple);

    assert(list._ids.foo);
    assert.equals(list._modules.apple[0], apple);

    list.remove(apple);

    refute(list._ids.foo);
    refute(list._modules.apple[0]);
  },

  "Should remove the child from the DOM by default": function() {
    var sandbox = helpers.createSandbox();
    var list = new helpers.Views.Layout();
    var Apple = helpers.Views.Apple;
    var apple = new Apple({ slot: 1 });

    list
      .add(apple)
      .render()
      .inject(sandbox)
      .setup();

    assert(!!sandbox.querySelector('#' + apple._fmid));

    list.remove(apple);

    refute(!!sandbox.querySelector('#' + apple._fmid));
  },

  "Should *not* remove the child from the DOM if `fromDOM` option is false": function() {
    var sandbox = document.createElement('div');
    var list = new helpers.Views.Layout();
    var Apple = helpers.Views.Apple;
    var apple = new Apple();

    list
      .add(apple, 1)
      .render()
      .setup()
      .inject(sandbox);

    assert(sandbox.querySelector('#' + apple._fmid));

    list.remove(apple, { fromDOM: false });

    assert(sandbox.querySelector('#' + apple._fmid));
  },

  "Should remove itself if called with no arguments": function() {
    var list = new helpers.Views.Layout();
    var Apple = helpers.Views.Apple;
    var apple = new Apple({ id: 'foo' });

    list.add(apple);
    apple.remove();

    refute(~list.children.indexOf(apple));
    refute(list._ids.foo);
  },

  "Should remove the reference back to the parent view": function() {
    var layout = new Layout();
    var apple = new Apple({ slot: 1 });

    layout.add(apple);

    assert.equals(apple.parent, layout);

    layout.remove(apple);

    refute(apple.parent);
  },

  "Should remove slot reference": function() {
    var layout = new Layout();
    var apple = new Apple({ slot: 1 });

    layout.add(apple);

    assert.equals(layout.slots[1], apple);

    layout.remove(apple);

    refute(layout.slots[1]);
  },

  "Should not remove itself if first argument is undefined": function() {
    var layout = new Layout();
    var apple = new Apple({ slot: 1 });

    layout.add(apple);
    apple.remove(undefined);

    assert(layout.module('apple'));
  }
});
