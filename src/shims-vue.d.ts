import 'vue-router'
import { Size } from '@/plugins/element'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default DefineComponent
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $ELEMENT:{
      size:Size
    }
  }
}
