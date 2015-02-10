# ng-multibind
Multibinding and map binding for angluarjs injector.

Map binders and multibinders are meant to enable modular
application development by allowing easy plugin support.

This module modifies the angular global directly, the angular
modules create with `angular.module` will have two additional
methods `array(key)` and `map(key)` allowing for specifying
named and unnamed multiple bindings. A call to either of
these creates (or fetches previously created) binder which may
be used to attach bindings. The entire key becomes an
injectable. Here are a few examples:

```
angular.module ('app', [])
       .map ('words').value ('hi', 'hello')
       .value ('something', 'anything')
       .map('words').value ('bie', 'goodbye')
       .map ('words').factory ('other', function (something) {
         return '.' + something;
       })
       .array ('words2').value ('hio')
       .array ('words2').factory (function (something) { return '.' + something; })
       .run (function (words, words2) { console.log (words, words2); });
```

Currently only value and factory provider patterns are
supported. This is not an angular module (since modifications
must take place before any module bootstrapping is done)
