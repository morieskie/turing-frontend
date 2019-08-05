import {Injectable} from '@angular/core';
import {Ng2IzitoastService} from 'ng2-izitoast';

@Injectable()
export class NotificationService {
  constructor(private toast: Ng2IzitoastService) {

  }

  info(title: string, message?: string, options: object = {}) {
    this.toast.info({title, message, class: 'iziToast-info', ...options});
  }

  success(title: string, message?: string, options: object = {}) {
    this.toast.success({
      title, message,
      class: 'iziToast-success',
      animateInside: !1,
      position: 'topRight',
      progressBar: !1,
      timeout: 3200,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeIn',
      transitionOutMobile: 'fadeOut', ...options
    });
  }

  warning(title: string, message?: string, options: object = {}) {
    this.toast.warning({
      title, message,
      class: 'iziToast-warn',
      animateInside: !1,
      position: 'topRight',
      progressBar: !1,
      timeout: 3200,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeIn',
      transitionOutMobile: 'fadeOut', ...options
    });
  }

  error(title: string, message?: string, options: object = {}) {
    // console.log(message); return true;
    try {
      this.toast.error({
        title, message,
        class: 'iziToast-danger',
        animateInside: !1,
        position: 'topRight',
        progressBar: !1,
        timeout: 3200,
        transitionIn: 'fadeInLeft',
        transitionOut: 'fadeOut',
        transitionInMobile: 'fadeIn',
        transitionOutMobile: 'fadeOut', ...options
      });
    } catch (e) {
      console.log(e);
       throw new Error(e);
    }
  }

  question(title: string, message?: string, options: object = {}) {
    this.toast.question({
      title, message,
      animateInside: !1,
      position: 'topRight',
      progressBar: !1,
      overlayClose: false,
      timeout: 32009,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeIn',
      transitionOutMobile: 'fadeOut', ...options
    });
  }

  show(title: string, message?: string, options: object = {}) {
    this.toast.show({
      title, message,
      class: 'iziToast-question',
      animateInside: !1,
      position: 'topRight',
      progressBar: !1,
      timeout: 3200,
      transitionIn: 'fadeInLeft',
      transitionOut: 'fadeOut',
      transitionInMobile: 'fadeIn',
      transitionOutMobile: 'fadeOut', ...options
    });
  }
}
