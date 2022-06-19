import { CommonModule } from '@angular/common';
import { NgModule,  } from '@angular/core';
import { FormsModule,  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SHARED_ZORRO_MODULES } from './shared-zorro.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    ...SHARED_ZORRO_MODULES,

  ],
  declarations: [
    // your components

  ],
  exports: [

    ...SHARED_ZORRO_MODULES,

  ]
})
export class SharedModule {}
