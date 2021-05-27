interface colorAst {
  type:string;
  name:string;
  arguments:colorAst[];

}

declare module 'css-color-function' {
  export function convert(color: string): string;
  export function parse(color: string): colorAsts;
}
