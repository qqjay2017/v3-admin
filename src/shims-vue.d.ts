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

declare module '*.css';
declare module '*.png';
declare module '*.svg';
declare module '*.less';
declare module '*.md';
