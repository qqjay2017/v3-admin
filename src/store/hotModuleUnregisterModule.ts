import store from '@/store'

export function hotModuleUnregisterModule (name: string) {
  if (!name) return
  if (store && store.state && store.state[name]) {
    store.unregisterModule(name)
  }
}
