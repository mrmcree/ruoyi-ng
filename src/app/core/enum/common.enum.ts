import { Enumify } from "@/app/core/enum/index";

export class CommonEnum extends Enumify{
  static enable = new CommonEnum('开启',1);
  static close = new CommonEnum('关闭',0);
  static _ =this.closeEnum()
}
