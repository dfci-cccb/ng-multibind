/* The MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function (define) {
  define ('ng-multibind', [ 'angular' ], function (ng) {
    ng = ng || angular;
    (function (bindings, createModule) {
      return ng.module = function () {
        var module = createModule.apply (createModule, arguments);

        module.map = function (key) {
          return (bindings[key] || (bindings[key] = (function (providers) {
            module.factory (key, [ '$injector', function ($injector) {
              var elements = {};
              Object.keys (providers).forEach (function (name) {
                elements[name] = $injector.invoke (providers[name]);
              });
              return elements;
            } ]);

            return {
              providers : providers,
              binder : {
                factory : function (name, factory) {
                  providers[name] = factory;
                  return module;
                },
                value : function (name, value) {
                  providers[name] = function () {
                    return value;
                  };
                  return module;
                }
              }
            };
          }) ({}))).binder;
        };

        module.array = function (key) {
          return (bindings[key] || (bindings[key] = (function (providers) {
            module.factory (key, [ '$injector', function ($injector) {
              var elements = [];
              providers.forEach (function (provider) {
                elements.push ($injector.invoke (provider));
              });
              return elements;
            } ]);

            return {
              providers : providers,
              binder : {
                factory : function (factory) {
                  providers.push (factory);
                  return module;
                },
                value : function (value) {
                  providers.push (function () {
                    return value;
                  });
                  return module;
                }
              }
            };
          }) ([]))).binder;
        };

        return module;
      };
    }) ({}, ng.module);
  });
}) (typeof (define) !== 'undefined' ? define : function (name, deps, fn) {
  fn ();
});
