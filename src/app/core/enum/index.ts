export class Enumify {

  //#################### Static

  static enumKeys: Array<string>;
  static enumValues: Array<Enumify>;
  private name : string;
  private code : number | string;

  constructor(name:string,code:number|string) {
    this.name=  name;
    this.code = code;
  }
  static closeEnum() {
    const enumKeys: Array<string> = [];
    const enumValues: Array<Enumify> = [];
    // Traverse the enum entries
    for (const [key, value] of Object.entries(this)) {
      enumKeys.push(key);

      value.enumKey = key;
      value.enumOrdinal = enumValues.length;
      enumValues.push(value);
    }
    // Important: only add more static properties *after* processing the enum entries
    this.enumKeys = enumKeys;
    this.enumValues = enumValues;
  }

  /** Use case: parsing enum values */
  static enumValueOf(str: string):undefined|Enumify {
    const index = this.enumKeys.indexOf(str);
    if (index >= 0) {
      return this.enumValues[index];
    }
    return undefined;
  }
  static [Symbol.iterator]() {
    return this.enumValues[Symbol.iterator]();
  }

  static getCodeByName(name:string) {
    return this.enumValues.find(item=>item.name===name)?.code;
  }
  static getNameByCode(code:number|string) {
    return this.enumValues.find(item=>item.code===code)?.name;
  }

  //#################### Instance

  enumKey!: string;
  enumOrdinal!: number;

  toString() {
    return this.constructor.name + '.' + this.enumKey;
  }
}

//class Color extends Enumify {
//  static red = new Color();
//  static orange = new Color();
//  static yellow = new Color();
//  static green = new Color();
//  static blue = new Color();
//  static purple = new Color();
//  static _ = this.closeEnum(); // TypeScript: Color.closeEnum()
//}

