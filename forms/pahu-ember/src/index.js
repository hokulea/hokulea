"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createForm = createForm;
var ember_modifier_1 = require("ember-modifier");
var ember_resources_1 = require("ember-resources");
var pahu_1 = require("@hokulea/pahu");
var signalFactory = function (t) {
    var reactive = (0, ember_resources_1.cell)(t);
    return {
        get: function () {
            return reactive.current;
        },
        set: function (val) {
            reactive.set(val);
        }
    };
};
function createForm(config) {
    if (config === void 0) { config = {}; }
    var form = (0, pahu_1.createForm)(__assign(__assign({}, config), { subtle: { signalFactory: signalFactory } }));
    // eslint-disable-next-line @typescript-eslint/unbound-method
    var createField = form.createField;
    form.registerForm = (0, ember_modifier_1.modifier)(function (element) {
        form.subtle.registerElement(element);
    });
    form.createField = function (fieldConfig) {
        var field = createField(fieldConfig);
        field.registerField = (0, ember_modifier_1.modifier)(function (element) {
            field.subtle.registerElement(element);
        });
        return field;
    };
    return form;
}
