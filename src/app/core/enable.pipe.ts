import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enable'
})
export class EnablePipe implements PipeTransform {

  transform(status: number, ...args: unknown[]): string {
    return status ===0 ? '关闭' :'开启'
  }

}
