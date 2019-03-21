import Vue from "vue";
import { clone } from "../../utilities";
import ValidationServiceInterface from "../../validation/ValidationServiceInterface";

export default class Form {
  protected _rules: object = {};
  protected _messages: object = {};

  protected _initialData: any;
  protected _originalData: any;

  protected _serverValidationErrors = {};
  protected _validationService?: ValidationServiceInterface;

  constructor(
    data: object = {},
    validationService: ValidationServiceInterface
  ) {
    if (validationService) {
      this._validationService = validationService;
    }

    this.$set(data);
    this._setInitialData();
    this.$setAsOriginalData();
  }

  public $set(data: object = {}) {
    return this._merge(data, data);
  }

  public $fill(data: object = {}) {
    return this._merge(data, this.$data());
  }

  protected _merge(data: object = {}, source: object = {}) {
    data = clone(data);
    for (let key in source) {
      if (data.hasOwnProperty(key)) {
        Vue.set(this, key, data[key]);
        if (
          data[key] !== null &&
          Array.isArray(data[key]) === false &&
          typeof data[key] === "object"
        ) {
          this[key] = Vue.observable(Object.assign({}, data[key]));
        }
      }
    }
    return this;
  }

  public _setInitialData() {
    this._initialData = this.$data();
    return this;
  }

  public $setAsOriginalData() {
    this._originalData = this.$data();
    return this;
  }

  public $data() {
    let data = clone(this);
    delete data._rules;
    delete data._messages;
    delete data._initialData;
    delete data._originalData;
    delete data._validationService;
    delete data._serverValidationErrors;
    return data;
  }

  public $reset() {
    for (let dataKey in this.$data()) {
      delete this[dataKey];
    }
    this.$set(this._originalData);
    return this;
  }

  public $resetToInitial() {
    for (let dataKey in this.$data()) {
      delete this[dataKey];
    }
    this.$set(this._initialData).$setAsOriginalData();
    return this;
  }

  public $remove(key: string) {
    Vue.delete(this, key);
    return this;
  }

  public $isDirty() {
    return JSON.stringify(this.$data()) !== JSON.stringify(this._originalData);
  }

  public $validation({ rules, messages }) {
    this._rules = rules;
    this._messages = messages;
    return this;
  }

  public $isValid() {
    if (this._validationService) {
      if (Object.keys(this.$errors()).length) {
        return false;
      }
    }
    return true;
  }

  public $errors(): object {
    if (this._validationService) {
      return this._validationService.validate(
        this.$data(),
        this._rules,
        this._messages
      );
    }
    return {};
  }

  protected _validate() {
    if (this._validationService) {
      return this._validationService.validate(
        this.$data(),
        this._rules,
        this._messages
      );
    }
  }
}
