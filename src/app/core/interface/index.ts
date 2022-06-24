export interface Dict {
  dictValue : string,
  dictLabel : string
}
export interface response{
  code: number,
  msg?:string,
  rows?:any[],
  data?:object | [],
  total?:number
}
