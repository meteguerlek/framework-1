import { Store } from "vuex";
import { injectable } from "inversify";
type GenericObject = { [key: string]: any };

@injectable()
export default class StoreModule {
  public name;
  public modules = {};
  public namespaced = true;
  public state: GenericObject = {};
  public actions: GenericObject = {};
  public getters: GenericObject = {};
  public mutations: GenericObject = {};
  public $modules: Array<StoreModule> = [];

  setName(name: string): this {
    this.name = name;
    return this;
  }

  addState(state: object) {
    this.state = Object.assign({}, this.state, state);
    return this;
  }

  addActions(actions: (() => object) | object): this {
    if (typeof actions === "function") {
      actions = actions();
    }
    this.actions = Object.assign({}, this.actions, actions);
    return this;
  }

  addMutations(mutations: (() => object) | object): this {
    if (typeof mutations === "function") {
      mutations = mutations();
    }
    this.mutations = Object.assign({}, this.mutations, mutations);
    return this;
  }

  addGetters(getters: (() => object) | object): this {
    if (typeof getters === "function") {
      getters = getters();
    }
    this.getters = Object.assign({}, this.getters, getters);
    return this;
  }

  addModule(store: StoreModule): this {
    this.$modules.push(store);
    return this;
  }
}
