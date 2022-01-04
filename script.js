var script = {
  vuetify: new Vuetify(),
  data() {
    return {
      password: "",
      useNumbers: true,
      useSpecial: true,
      size: 10,
      copied: false
    };
  },
  methods: {
    copy() {
      const textArea = document.createElement("textarea");

      textArea.style.position = "fixed";
      textArea.style.top = 0;
      textArea.style.left = 0;

      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = 0;

      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";

      textArea.style.background = "transparent";

      textArea.value = this.password;

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");

      document.body.removeChild(textArea);

      this.copied = true;
    },
    getPassword() {
      this.copied = false;
      let pass = "";
      let length = this.size;

      const special = "!#$%&()*+,-./:;<=>?@[\]^_|~".split("");
      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const chars = new Array(26)
        .fill()
        .map((_, i) => String.fromCharCode(i + 65));

      let availableChars = [...chars];
      if (this.useNumbers) {
        // ensuring at least one number in the output
        pass += this.randomPick(numbers);
        length--;
        availableChars = availableChars.concat(numbers);
      }
      if (this.useSpecial) {
        // ensuring at least one special character in the output
        pass += this.randomPick(special);
        length--;
        availableChars = availableChars.concat(special);
      }

      for (let i = 0; i < length; i++) {
        let picked = this.randomPick(availableChars);
        if (/[A-Z]/.test(picked)) {
          let lower = Math.random();
          picked = lower < 0.5 ? picked.toLowerCase() : picked;
        }
        pass += picked;
      }
      this.password = pass;
    },
    randomPick(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c(
        "v-app",
        [
          _c(
            "v-main",
            [
              _c(
                "v-container",
                { attrs: { fluid: "" } },
                [
                  _c("h1", [_vm._v("Generate Password")]),
                  _vm._v(" "),
                  _c("p", [_vm._v("Create a random secure password.")]),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    { attrs: { justify: "center" } },
                    [
                      _c("v-switch", {
                        attrs: {
                          label: "Numbers",
                          color: "indigo darken-3",
                          inset: "",
                          dense: ""
                        },
                        model: {
                          value: _vm.useNumbers,
                          callback: function($$v) {
                            _vm.useNumbers = $$v;
                          },
                          expression: "useNumbers"
                        }
                      }),
                      _vm._v(" "),
                      _c("v-switch", {
                        staticClass: "ml-5",
                        attrs: {
                          label: "Special characters",
                          color: "indigo darken-3",
                          inset: "",
                          dense: ""
                        },
                        model: {
                          value: _vm.useSpecial,
                          callback: function($$v) {
                            _vm.useSpecial = $$v;
                          },
                          expression: "useSpecial"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("p", [_vm._v("Password length")]),
                  _vm._v(" "),
                  _c(
                    "v-row",
                    [
                      _c(
                        "v-col",
                        { staticClass: "mx-auto", attrs: { cols: "8" } },
                        [
                          _c("v-slider", {
                            attrs: {
                              color: "indigo darken-3",
                              min: "8",
                              max: "20",
                              step: "1",
                              ticks: "always",
                              "tick-size": "4",
                              "thumb-label": "always",
                              "thumb-size": "24"
                            },
                            model: {
                              value: _vm.size,
                              callback: function($$v) {
                                _vm.size = $$v;
                              },
                              expression: "size"
                            }
                          })
                        ],
                        1
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { outlined: "", rounded: "", color: "success" },
                      on: { click: _vm.getPassword }
                    },
                    [_vm._v("\n          Generate\n        ")]
                  ),
                  _vm._v(" "),
                  _c("h2", { staticClass: "mt-5 mb-3" }, [
                    _vm._v(_vm._s(_vm.password))
                  ]),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.password,
                          expression: "password"
                        }
                      ],
                      attrs: {
                        outline: "",
                        text: "",
                        rounded: "",
                        "x-small": ""
                      },
                      on: { click: _vm.copy }
                    },
                    [
                      _vm._v("\n          Copy to clipboard\n          "),
                      _c(
                        "v-icon",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.copied,
                              expression: "copied"
                            }
                          ],
                          attrs: { small: "", right: "", color: "primary" }
                        },
                        [
                          _vm._v(
                            "\n            mdi-checkbox-marked-circle\n          "
                          )
                        ]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-9a8a1438_0", { source: "\nbody {\n  background-color: #e8eaf6;\n}\n#app {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n  background-color: inherit;\n}\na,\nbutton {\n  color: #4fc08d;\n}\nbutton {\n  background: none;\n  border: solid 1px;\n  border-radius: 2em;\n  font: inherit;\n  padding: 0.75em 2em;\n}\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue"],"names":[],"mappings":";AA6IA;EACA,yBAAA;AACA;AAEA;EACA,iDAAA;EACA,kBAAA;EACA,cAAA;EACA,gBAAA;EACA,yBAAA;AACA;AAEA;;EAEA,cAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;EACA,kBAAA;EACA,aAAA;EACA,mBAAA;AACA","file":"pen.vue","sourcesContent":["<template>\n  <div id=\"app\">\n    <v-app>\n      <v-main>\n        <v-container fluid>\n          <h1>Generate Password</h1>\n\n          <p>Create a random secure password.</p>\n          <v-row justify=\"center\">\n            <v-switch\n              v-model=\"useNumbers\"\n              label=\"Numbers\"\n              color=\"indigo darken-3\"\n              inset\n              dense\n            ></v-switch>\n            <v-switch\n              class=\"ml-5\"\n              v-model=\"useSpecial\"\n              label=\"Special characters\"\n              color=\"indigo darken-3\"\n              inset\n              dense\n            ></v-switch>\n          </v-row>\n          <p>Password length</p>\n          <v-row>\n            <v-col cols=\"8\" class=\"mx-auto\">\n              <v-slider\n                color=\"indigo darken-3\"\n                v-model=\"size\"\n                min=\"8\"\n                max=\"20\"\n                step=\"1\"\n                ticks=\"always\"\n                tick-size=\"4\"\n                thumb-label=\"always\"\n                thumb-size=\"24\"\n              ></v-slider>\n            </v-col>\n          </v-row>\n          <v-btn outlined rounded color=\"success\" @click=\"getPassword\">\n            Generate\n          </v-btn>\n          <h2 class=\"mt-5 mb-3\">{{ password }}</h2>\n          <v-btn outline text rounded x-small v-show=\"password\" @click=\"copy\">\n            Copy to clipboard\n            <v-icon small right color=\"primary\" v-show=\"copied\">\n              mdi-checkbox-marked-circle\n            </v-icon>\n          </v-btn>\n        </v-container>\n      </v-main>\n    </v-app>\n  </div>\n</template>\n\n<script>\nexport default {\n  vuetify: new Vuetify(),\n  data() {\n    return {\n      password: \"\",\n      useNumbers: true,\n      useSpecial: true,\n      size: 10,\n      copied: false\n    };\n  },\n  methods: {\n    copy() {\n      const textArea = document.createElement(\"textarea\");\n\n      textArea.style.position = \"fixed\";\n      textArea.style.top = 0;\n      textArea.style.left = 0;\n\n      textArea.style.width = \"2em\";\n      textArea.style.height = \"2em\";\n      textArea.style.padding = 0;\n\n      textArea.style.border = \"none\";\n      textArea.style.outline = \"none\";\n      textArea.style.boxShadow = \"none\";\n\n      textArea.style.background = \"transparent\";\n\n      textArea.value = this.password;\n\n      document.body.appendChild(textArea);\n      textArea.focus();\n      textArea.select();\n      document.execCommand(\"copy\");\n\n      document.body.removeChild(textArea);\n\n      this.copied = true;\n    },\n    getPassword() {\n      this.copied = false;\n      let pass = \"\";\n      let length = this.size;\n\n      const special = \"!#$%&()*+,-./:;<=>?@[\\]^_|~\".split(\"\");\n      const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];\n      const chars = new Array(26)\n        .fill()\n        .map((_, i) => String.fromCharCode(i + 65));\n\n      let availableChars = [...chars];\n      if (this.useNumbers) {\n        // ensuring at least one number in the output\n        pass += this.randomPick(numbers);\n        length--;\n        availableChars = availableChars.concat(numbers);\n      }\n      if (this.useSpecial) {\n        // ensuring at least one special character in the output\n        pass += this.randomPick(special);\n        length--;\n        availableChars = availableChars.concat(special);\n      }\n\n      for (let i = 0; i < length; i++) {\n        let picked = this.randomPick(availableChars);\n        if (/[A-Z]/.test(picked)) {\n          let lower = Math.random();\n          picked = lower < 0.5 ? picked.toLowerCase() : picked;\n        }\n        pass += picked;\n      }\n      this.password = pass;\n    },\n    randomPick(arr) {\n      return arr[Math.floor(Math.random() * arr.length)];\n    }\n  }\n};\n</script>\n\n<style>\nbody {\n  background-color: #e8eaf6;\n}\n\n#app {\n  font-family: Avenir, Helvetica, Arial, sans-serif;\n  text-align: center;\n  color: #2c3e50;\n  margin-top: 60px;\n  background-color: inherit;\n}\n\na,\nbutton {\n  color: #4fc08d;\n}\n\nbutton {\n  background: none;\n  border: solid 1px;\n  border-radius: 2em;\n  font: inherit;\n  padding: 0.75em 2em;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;