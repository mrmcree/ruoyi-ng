export function resolveTree(tree:any[]):any[]{
  let arr: any[]=[]
  for(let i=0;i<tree.length;i++ ){
    let item=tree[i]
    let obj={
      title:item.label,
      expanded:true,
      key:item.id,
      children:[]
    }
    if(item.children && item.children.length){
      const children= resolveTree(item.children)
      //@ts-ignore
      obj={...obj,children:children}
    }else {
      //@ts-ignore
      obj={...obj,isLeaf:true}
    }
    arr.push(obj)
  }
  return arr

}
