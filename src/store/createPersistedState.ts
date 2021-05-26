import { MutationPayload, Store } from 'vuex'
import merge from 'deepmerge'
import * as shvl from 'shvl'
import { toRaw } from 'vue'

interface Storage {
  getItem: (key: string) => any;
  setItem: (key: string, value: any) => void;
  removeItem: (key: string) => void;
}

export default function createPersistedState1<State> (options: {
  key?: string;
  paths?: string[];
  reducer?: (state: State, paths: string[]) => Record<string, any>;
  subscriber?: (
    store: Store<State>
  ) => (handler: (mutation: any, state: State) => void) => void;
  storage?: Storage;
  getState?: (key: string, storage: Storage) => any;
  setState?: (key: string, state: any, storage: Storage) => void;
  filter?: (mutation: MutationPayload) => boolean;
  arrayMerger?: (state: any[], saved: any[]) => any;
  rehydrated?: (store: Store<State>) => void;
  fetchBeforeUse?: boolean;
  overwrite?: boolean;
  assertStorage?: (storage: Storage) => void | Error;
}) {
  const storage = options.storage || (window && window.localStorage)
  const key = options.key || 'vuex'

  function getState (key: string, storage: Storage) {
    const value = storage.getItem(key)
    try {
      return (typeof value !== 'undefined')
        ? JSON.parse(value)
        : undefined
    } catch (err) {

    }
    return undefined
  }
  function reducer (state: any, paths: string[] | undefined) {
    return Array.isArray(paths)
      ? paths.reduce(function (substate, path) {
        return shvl.set(substate, path, shvl.get(state, path))
      }, {})
      : state
  }

  function setState (key: string, state: any, storage: Storage) {
    return storage.setItem(key, JSON.stringify(state))
  }

  let savedState
  return (store: Store<any>) => {
    savedState = getState(key, storage)

    if (typeof savedState === 'object' && savedState !== null) {
      store.replaceState(
        merge(store.state, savedState)
      )
    }

    store.subscribe((mutation, state) => {
      setState(
        key,
        reducer(state, options.paths),
        storage
      )
    })
  }
}
