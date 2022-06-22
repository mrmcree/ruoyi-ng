import { CommonService } from "@/app/core/common.service";
import { AuthService } from "@/app/routers/auth.service";
import { Injectable,Injector  } from '@angular/core';


import { HttpClient,HttpHeaders,HttpParams,  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponseBase } from '@angular/common/http';
import {
  ErrorObserver,
  timeout,
  BehaviorSubject ,
  Observable ,
  of ,
  throwError ,
  catchError ,
  retry ,
  filter ,
  mergeMap ,
  switchMap ,
  take ,
  subscribeOn
} from 'rxjs';


import { environment } from '@/environments/environment';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: AuthService.getToken() as string
  })
};
const CODE_MESSAGE:{ [key: number]: string }= {
  '0': '请求超时，请检查网络是否断开或者链接是否正确',
  "400": "错误的请求。由于语法错误，该请求无法完成。",
  "401": "未经授权。服务器拒绝响应。",
  "403": "已禁止。服务器拒绝响应。",
  "404": "未找到。无法找到请求的位置。",
  "405": "方法不被允许。使用该位置不支持的请求方法进行了请求。",
  "406": "不可接受。服务器只生成客户端不接受的响应。",
  "407": "需要代理身份验证。客户端必须先使用代理对自身进行身份验证。",
  "408": "请求超时。等待请求的服务器超时。",
  "409": "冲突。由于请求中的冲突，无法完成该请求。",
  "410": "过期。请求页不再可用。",
  "411": "长度必需。未定义“内容长度”。",
  "412": "前提条件不满足。请求中给定的前提条件由服务器评估为 false。",
  "413": "请求实体太大。服务器不会接受请求，因为请求实体太大。",
  "414": "请求 URI 太长。服务器不会接受该请求，因为 URL 太长。",
  "415": "不支持的媒体类型。服务器不会接受该请求，因为媒体类型不受支持。",
  "416": "HTTP 状态代码 {0}",
  "500": "内部服务器错误。",
  "501": "未实现。服务器不识别该请求方法，或者服务器没有能力完成请求。",
  "503": "服务不可用。服务器当前不可用(过载或故障)。"
};

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  private http : any;
  private readonly restServer : string;
  private defaultTimeout=10000
  constructor(private Http : HttpClient , private injector : Injector) {
    this.http = Http;
    this.restServer = environment.APP_BASE_API
  }

  /**
   * 提示
   * @returns {NzMessageService}
   * @private
   */
  private get NzMessage() : NzMessageService {
    return this.injector.get(NzMessageService);
  }

  /**
   * 路由跳转
   * @param {string} url
   * @private
   */
  private goTo(url : string) : void {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }


  /**
   * 处理请求失败的错误
   * @param ev
   * @param req
   * @param next
   */
  private handleError(ev : HttpResponseBase , req : HttpRequest<any> , next : HttpHandler) : Observable<any> {
//    console.log("response",ev)

    this.checkStatus(ev)
    //@ts-ignore
    if(ev.body.code===401){

      this.toLogin()
      //@ts-ignore
    }else if(ev.body.code!==200){
      //@ts-ignore
      this.NzMessage.error(ev.body.msg);
    }
    // 业务处理：一些通用操作
    switch (ev.status) {
      case 200:
        // 业务层级错误处理，以下是假定restful有一套统一输出格式（指不管成功与否都有相应的数据格式）情况下进行处理
        // 例如响应内容：
        //  错误内容：{ status: 1, msg: '非法参数' }
        //  正确内容：{ status: 0, response: {  } }
        // 则以下代码片断可直接适用
        // if (ev instanceof HttpResponse) {
        //   const body = ev.body;
        //   if (body && body.status !== 0) {
        //     this.injector.get(NzMessageService).error(body.msg);
        //     // 注意：这里如果继续抛出错误会被行254的 catchError 二次拦截，导致外部实现的 Pipe、subscribe 操作被中断，例如：this.http.get('/').subscribe() 不会触发
        //     // 如果你希望外部实现，需要手动移除行254
        //     return throwError({});
        //   } else {
        //     // 忽略 Blob 文件体
        //     if (ev.body instanceof Blob) {
        //        return of(ev);
        //     }
        //     // 重新修改 `body` 内容为 `response` 内容，对于绝大多数场景已经无须再关心业务状态码
        //     return of(new HttpResponse(Object.assign(ev, { body: body.response })));
        //     // 或者依然保持完整的格式
        //     return of(ev);
        //   }
        // }
        break;
      case 401:
        this.toLogin();
        AuthService.removeToken()
        break;
      case 403:
//        this.goTo(`/exception/${ev.status}?url=${req.urlWithParams}`);
        break;
      case 404:
//        this.goTo(`/exception/${ev.status}?url=${req.urlWithParams}`);
        break;
      case 500:
        this.goTo(`/exception/${ev.status}?url=${req.urlWithParams}`);
        break;
      default:
        if ( ev instanceof HttpErrorResponse ) {
          console.warn(
            '未可知错误，大部分是由于后端不支持跨域CORS或无效配置引起，请参考 https://ng-alain.com/docs/server 解决跨域问题' ,
            ev
          );
        }
        break;
    }
  //@ts-ignore
//    if(ev.body.code===500){
//      subscribeOn(ev)
//    }
    if ( ev instanceof HttpErrorResponse ) {
      return throwError(ev);
    } else {
      return of(ev);
    }
  }

  /**
   * 检查状态码
   * @param {HttpResponseBase} ev
   * @private
   */
  private checkStatus(ev : HttpResponseBase) : void {
    if ( (ev.status >= 200 && ev.status < 300) || ev.status === 401 ) {
      return;
    }


    const errorText = CODE_MESSAGE[ev.status] || ev.statusText;
    this.NzMessage.error(`请求错误 ${ev.status}: ${ev.url}`);
  }

  /**
   * 登录
   * @private
   */
  private toLogin() : void {
    this.NzMessage.error(`未登录或登录已过期，请重新登录。`);
    this.goTo('/login');
  }

  intercept(req : HttpRequest<any> , next : HttpHandler) : Observable<HttpEvent<any>> {
//    console.log('req',req)
    const token = AuthService.getToken()
    let url = req.url;
    if ( !url.startsWith('https://') && !url.startsWith('http://') ) {
      const baseUrl = this.restServer
      url = baseUrl + (baseUrl.endsWith('/') && url.startsWith('/') ? url.substring(1) : url);
    }
//    console.log(url)
// 如果有token，就添加
    req = req.clone({
      url ,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(req).pipe(
      timeout(this.defaultTimeout),
      mergeMap((ev:any) => {
        // 允许统一对请求错误处理
        if ( ev instanceof HttpResponseBase ) {
          return this.handleError(ev , req , next);
//          return ErrorObserver.create(ev)
        }

        // 若一切都正常，则后续操作
        return of(ev);

      }) ,
      catchError((err : HttpErrorResponse) => this.handleError(err , req , next))
    )
  }
}

