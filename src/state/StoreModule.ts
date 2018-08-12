import { injectable } from "inversify";
type GenericObject = { [key: string]: any };

@injectable()
export default class StoreModule {
  public name;
  public state: GenericObject = {};
  public actions: GenericObject = {};
  public getters: GenericObject = {};
  public mutations: GenericObject = {};
  public namespaced = true;

  setName(name) {
    this.name = name;
    return this;
  }

  addState(state) {
    this.state = Object.assign({}, this.state, state);
    return this;
  }

  addActions(actions) {
    if (typeof actions === "function") {
      actions = actions();
    }
    this.actions = Object.assign({}, this.actions, actions);
    return this;
  }

  addMutations(mutations) {
    if (typeof mutations === "function") {
      mutations = mutations();
    }
    this.mutations = Object.assign({}, this.mutations, mutations);
    return this;
  }

  addGetters(getters) {
    if (typeof getters === "function") {
      getters = getters();
    }
    this.getters = Object.assign({}, this.getters, getters);
    return this;
  }
}