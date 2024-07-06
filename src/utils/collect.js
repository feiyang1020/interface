
(function (root, nekyEeport) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = nekyEeport;
  else if (typeof define === 'function' && define.amd) define([], nekyEeport);
  else if (typeof exports === 'object') exports['nekyEeport'] = nekyEeport;
  else root['nekyEeport'] = nekyEeport;
})(
  this,
  (function () {
    if (typeof window === 'undefined') {
      return;
    }

    let _win = window || null;

    let _doc = _win.document;

    if (_win._neky_rpt_ && _win._neky_rpt_.loaded === !0) return;

    (_win._neky_rpt_ = _win._neky_rpt_ || {}), (_win._neky_rpt_.loaded = !0);
    _win._neky_rpt_.version = '1.0.1';

    let nekyType = {
      //获取对象类型
      getObjectType(value) {
        return Object.prototype.toString.call(value);
      },

      //是否字符串
      isString(value) {
        return (
          typeof value == 'string' ||
          (typeof value == 'object' &&
            value != null &&
            !Array.isArray(value) &&
            this.getObjectType(value) == '[object String]')
        );
      },

      //是否数字
      isNumber(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
      },

      //是否boolean
      isBoolean(value) {
        return (
          value === true ||
          value === false ||
          this.getObjectType(value) === '[object Boolean]'
        );
      },

      //是否为null
      isNull(value) {
        return value === null;
      },

      //是否undefined
      isUndefined(value) {
        return value === undefined;
      },

      //是否对象
      isObject(value) {
        return (
          typeof value != null &&
          (typeof value == 'object' || typeof value == 'function')
        );
      },

      //是否函数
      isFunction(value) {
        if (!this.isObject(value)) {
          return false;
        }
        let tag = this.getObjectType(value);
        return (
          tag == '[object Function]' ||
          tag == '[object AsyncFunction]' ||
          tag == '[object GeneratorFunction]' ||
          tag == '[object Proxy]'
        );
      },

      //是否数组
      isArray(value) {
        return (
          (typeof Array.isArray === 'function' && Array.isArray(value)) ||
          this.getObjectType(value) === '[object Array]'
        );
      },

      //是否时间
      isDate(value) {
        return this.getObjectType(value) === '[object Date]';
      },

      //是否正则
      isRegExp(value) {
        return this.getObjectType(value) === '[object RegExp]';
      },

      //是否错误对象
      isError(value) {
        let tag = this.getObjectType(value);
        return (
          tag == '[object Error]' ||
          tag == '[object DOMException]' ||
          value instanceof Error
        );
      },

      //是否为空
      isEmpty(value) {
        return value == null;
      },

      //是否为空对象
      isEmptyObject(value) {
        if (this.isBoolean(value) || this.isNumber(value) || this.isDate(value))
          return false;
        for (let key in value) {
          if (value.hasOwnProperty(key)) {
            return false;
          }
        }
        return true;
      },

      //是否为简单对象,常用于判断是否为JSON
      isPlainObject(value) {
        if (this.isNull(value) || this.isUndefined(value)) return false;
        return this.isObject(value) && value.__proto__ === Object.prototype;
      },

      //是否false
      isFalse(value) {
        if (
          value == '' ||
          value == undefined ||
          value == null ||
          value == 'null' ||
          value == 'undefined' ||
          value == 0 ||
          value == false ||
          value == NaN
        )
          return true;
        return false;
      },

      //是否true
      isTrue(value) {
        return !this.isFalse(value);
      },
    };

    /**
     * 设置cookie
     *
     * @param {string} key 键
     * @param {string} val 值
     * @param {string} time 有效期/天
     **/
    function setCookie(key, val, time) {
      time = time || 0;
      let date = new Date();
      date.setTime(date.getTime() + time);
      _doc.cookie =
        key + '=' + escape(val) + ';path=/;expires=' + date.toGMTString();
    }

    /**
     * 获取cookie
     *
     * @param {string} key 键
     * @return {string} 返回cookie值
     **/
    function getCookie(key) {
      let arr = document.cookie.match(
        new RegExp('(^| )' + key + '=([^;]*)(;|$)'),
      );
      return null != arr ? unescape(arr[2]) : null;
    }

    /**
     * 删除cookie
     *
     * @param {string} key 键
     * @return {string} 删除cookie值
     **/
    function removeCookie(key) {
      setCookie(key, '1', -1);
    }

    //Json转url参数
    function parseParam(param, key) {
      let paramStr = '';
      if (
        typeof param == 'string' ||
        typeof param == 'number' ||
        typeof param == 'boolean'
      ) {
        paramStr += '&' + key + '=' + encodeURIComponent(param);
      } else {
        for (let i in param) {
          let k =
            key == null
              ? i
              : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
          paramStr += '&' + parseParam(param[i], k);
        }
      }
      return paramStr.substr(1) + '';
    }

    //url参数转Json
    // function queryString(url){
    //     let arr = [],
    //     res = {};
    //     if(url){
    //         arr = url.split('&');
    //         for(let i=0; i< arr.length; i++){
    //             res[arr[i].split('=')[0]] = decodeURIComponent(arr[i].split('=')[1]);
    //         }
    //     }else{
    //         res = {};
    //     }
    //     return res;
    // };

    //json合并
    function mergeJSON(jsonOne, jsonTwo) {
      let JsonObject = {};

      for (let attr in jsonOne) {
        JsonObject[attr] = jsonOne[attr];
      }

      for (let attr in jsonTwo) {
        JsonObject[attr] = jsonTwo[attr];
      }

      return JsonObject;
    }

    //获取hash

    function getHash() {
      let hashData = document.location.hash;
      if (hashData) {
        hashData = hashData.replace('#', '');
        hashData = hashData.split('?');
      }
      return hashData;
    }

    //浏览器信息
    function browserInfo() {
      let u = navigator.userAgent;
      let self = {};
      let match = {
        //内核
        Trident: u.indexOf('Trident') > 0 || u.indexOf('NET CLR') > 0,
        Presto: u.indexOf('Presto') > 0,
        WebKit: u.indexOf('AppleWebKit') > 0,
        Gecko: u.indexOf('Gecko/') > 0,
        //浏览器
        Safari: u.indexOf('Safari') > 0,
        Chrome: u.indexOf('Chrome') > 0 || u.indexOf('CriOS') > 0,
        IE: u.indexOf('MSIE') > 0 || u.indexOf('Trident') > 0,
        Edge: u.indexOf('Edge') > 0,
        Firefox: u.indexOf('Firefox') > 0,
        Opera: u.indexOf('Opera') > 0 || u.indexOf('OPR') > 0,
        Vivaldi: u.indexOf('Vivaldi') > 0,
        UC: u.indexOf('UC') > 0 || u.indexOf(' UBrowser') > 0,
        QQBrowser: u.indexOf('QQBrowser') > 0,
        QQ: u.indexOf('QQ/') > 0,
        Baidu: u.indexOf('Baidu') > 0 || u.indexOf('BIDUBrowser') > 0,
        Maxthon: u.indexOf('Maxthon') > 0,
        LBBROWSER: u.indexOf('LBBROWSER') > 0,
        '2345Explorer': u.indexOf('2345Explorer') > 0,
        Sogou: u.indexOf('MetaSr') > 0 || u.indexOf('Sogou') > 0,
        Wechat: u.indexOf('MicroMessenger') > 0,
        Taobao: u.indexOf('AliApp(TB') > 0,
        Alipay: u.indexOf('AliApp(AP') > 0,
        Weibo: u.indexOf('Weibo') > 0,
        Suning: u.indexOf('SNEBUY-APP') > 0,
        iQiYi: u.indexOf('IqiyiApp') > 0,
        //操作系统平台
        Windows: u.indexOf('Windows') > 0,
        Linux: u.indexOf('Linux') > 0,
        Mac: u.indexOf('Macintosh') > 0,
        Android: u.indexOf('Android') > 0 || u.indexOf('Adr') > 0,
        WP: u.indexOf('IEMobile') > 0,
        BlackBerry:
          u.indexOf('BlackBerry') > 0 ||
          u.indexOf('RIM') > 0 ||
          u.indexOf('BB') > 0,
        MeeGo: u.indexOf('MeeGo') > 0,
        Symbian: u.indexOf('Symbian') > 0,
        iOS: u.indexOf('like Mac OS X') > 0,
        //移动设备
        Mobile:
          u.indexOf('Mobi') > 0 || u.indexOf('iPh') > 0 || u.indexOf('480') > 0,
        Tablet:
          u.indexOf('Tablet') > 0 ||
          u.indexOf('iPad') > 0 ||
          u.indexOf('Nexus 7') > 0,
      };
      if (match.Mobile) {
        match.Mobile = !(u.indexOf('iPad') > 0);
      }
      //基本信息
      let hash = {
        engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
        browser: [
          'Safari',
          'Chrome',
          'IE',
          'Edge',
          'Firefox',
          'Opera',
          'Vivaldi',
          'UC',
          'QQBrowser',
          'QQ',
          'Baidu',
          'Maxthon',
          'Sogou',
          'LBBROWSER',
          '2345Explorer',
          'Wechat',
          'Taobao',
          'Alipay',
          'Weibo',
          'Suning',
          'iQiYi',
        ],
        os: [
          'Windows',
          'Linux',
          'Mac',
          'Android',
          'iOS',
          'WP',
          'BlackBerry',
          'MeeGo',
          'Symbian',
        ],
        device: ['Mobile', 'Tablet'],
      };
      self.device = 'PC';
      self.language = (function () {
        let g = navigator.browserLanguage || navigator.language;
        let arr = g.split('-');
        if (arr[1]) {
          arr[1] = arr[1].toUpperCase();
        }
        return arr.join('-');
      })();
      for (let s in hash) {
        for (let i = 0; i < hash[s].length; i++) {
          let value = hash[s][i];
          if (match[value]) {
            self[s] = value;
          }
        }
      }
      //系统版本信息
      let osVersion = {
        Windows: function () {
          let v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1');
          let hash = {
            6.4: '10',
            6.3: '8.1',
            6.2: '8',
            6.1: '7',
            '6.0': 'Vista',
            5.2: 'XP',
            5.1: 'XP',
            '5.0': '2000',
          };
          return hash[v] || v;
        },
        Android: function () {
          return u.replace(/^.*Android ([\d.]+);.*$/, '$1');
        },
        iOS: function () {
          return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.');
        },
        Mac: function () {
          return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.');
        },
      };
      self.osVersion = '';
      if (osVersion[self.os]) {
        self.osVersion = osVersion[self.os]();
      }
      //浏览器版本信息
      let version = {
        Chrome: function () {
          return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1');
        },
        IE: function () {
          let v = u.replace(/^.*MSIE ([\d.]+).*$/, '$1');
          if (v == u) {
            v = u.replace(/^.*rv:([\d.]+).*$/, '$1');
          }
          return v != u ? v : '';
        },
        Edge: function () {
          return u.replace(/^.*Edge\/([\d.]+).*$/, '$1');
        },
        Firefox: function () {
          return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1');
        },
        Safari: function () {
          return u.replace(/^.*Version\/([\d.]+).*$/, '$1');
        },
        Opera: function () {
          return u.replace(/^.*Opera\/([\d.]+).*$/, '$1');
        },
        Vivaldi: function () {
          return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1');
        },
        Maxthon: function () {
          return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1');
        },
        QQBrowser: function () {
          return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1');
        },
        QQ: function () {
          return u.replace(/^.*QQ\/([\d.]+).*$/, '$1');
        },
        Baidu: function () {
          return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1');
        },
        UC: function () {
          return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1');
        },
        '2345Explorer': function () {
          return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1');
        },
        Wechat: function () {
          return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1');
        },
        Taobao: function () {
          return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1');
        },
        Alipay: function () {
          return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1');
        },
        Weibo: function () {
          return u.replace(/^.*weibo__([\d.]+).*$/, '$1');
        },
        Suning: function () {
          return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1');
        },
        iQiYi: function () {
          return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1');
        },
      };
      self.version = '';
      if (version[self.browser]) {
        self.version = version[self.browser]();
      }
      return self;
    }

    let a = 0;
    let nekyEeport = {
      //初始化参数
      version: '1.0.1',
      loadTime: new Date().getTime(),
      zca: null,
      zcb: null,
      vid: null,
      referer: document.referrer || _win.location.origin,
      twoYears: 365 * 2 * 24 * 60 * 60000,
      semih: 30 * 60000,
      startTime: null,
      endTime: null,
      browserInfo: browserInfo(),
      accessPath: [],
      getHash: getHash() || [],
      hashOne: '',
      eventType: null,
      XMLHttpRequest: XMLHttpRequest,
      apiData: [],
      noFun: function () {},
      isTouchmove: false,
      eventList: [
        {
          eventName: 'load',
          eventType: _win,
        },
        {
          eventName: 'beforeunload',
          eventType: _win,
        },
        {
          eventName: 'popstate',
          eventType: _win,
        },
        // {
        //     eventName: 'pushstate',
        //     eventType: _win
        // },
        {
          eventName: 'unload',
          eventType: _win,
        },
        {
          eventName: 'click',
          eventType: _doc,
        },
        // {
        //     eventName: 'touchend',
        //     eventType: _win
        // },
        // {
        //     eventName: 'touchmove',
        //     eventType: _win
        // },
      ],
      //可配置项
      config: {
        url: 'http://localhost:3000/zc.gif',
        uid: undefined,
        channel: undefined,
        isClick: false,
        version: '1.0.0',
        clickAttr: {
          dom: [],
          attr: [],
        },
      },
      //程序初始化
      init: function () {
        let vm = this;
        vm.readZcaData();
        vm.readZcbData();
        vm.hashOne =
          vm.getHash && vm.getHash.length > 0
            ? _win.location.pathname + '#' + vm.getHash[0]
            : _win.location.pathname + _win.location.search;
        for (let i = 0; i < vm.eventList.length; i++) {
          vm.on(
            vm.eventList[i].eventType,
            vm.eventList[i].eventName,
            eval('vm.' + vm.eventList[i].eventName + 'Event') || vm.noFun,
          );
        }
        // PushState

        (function (history) {
          var replaceState = history.replaceState;
          if (replaceState) {
            history.replaceState = function (state, param) {
              var url = arguments[2];

              if (typeof vm.pushstateEvent == 'function') {
                vm.pushstateEvent({ state: state, param: param, url: url });
              }
              return replaceState.apply(history, arguments);
            };
          }
        })(window.history);

        (function (history) {
          var pushState = history.pushState;
          if (pushState) {
            history.pushState = function (state, param) {
              var url = arguments[2];
              if (typeof vm.pushstateEvent == 'function') {
                vm.pushstateEvent({ state: state, param: param, url: url });
              }
              return pushState.apply(history, arguments);
            };
          }
        })(window.history);
        window.onerror = function (msg, url, lineNo, columnNo, error) {
          let message = '';
          var string = msg.toLowerCase();
          var substring = 'script error';
          if (string.indexOf(substring) > -1) {
            message = 'Script Error: See Browser Console for Detail';
          } else {
            message = [
              'Message: ' + msg,
              'URL: ' + url,
              'Line: ' + lineNo,
              'Column: ' + columnNo,
              'Error object: ' + JSON.stringify(error),
            ].join(' - ');
          }

          console.log(arguments, 'window.onerror');
          let data = {};
          let param = vm.loadEventData(vm);
          data.eventType = 'error';
          data.pageUrl = _win.location.href;
          data.extra = message;
          console.log(vm.compress(mergeJSON(param, data)));
          vm.sendData(vm.compress(mergeJSON(param, data)));
          return false;
        };
      },
      //事件绑定
      on: function (element, eventName, callback) {
        if (!element) {
          return;
        }
        if (element.addEventListener) {
          element.addEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + eventName, callback);
        }
      },
      off: function (element, eventName, callback) {
        if (!element) {
          return;
        }
        if (element.addEventListener) {
          element.removeEventListener(eventName, callback, false);
        } else if (element.attachEvent) {
          element.detachEvent('on' + eventName, callback);
        }
      },
      loadEvent: function () {
        let vm = nekyEeport;
        let getData = new Date().getTime();
        vm.zcb = getData;
        vm.hashOne = vm.getHash
          ? _win.location.pathname + '#' + vm.getHash[0]
          : '';
        vm.accessPath.push(_win.location.origin + vm.hashOne);
        vm.startTime = getData;
        vm.eventType = 'load';
        vm.writeZcaData(vm);
        vm.writeZcbData(vm);
        let param = vm.loadEventData(vm);
        vm.sendData(vm.compress(param));
      },
      popstateEvent: function () {
        let vm = nekyEeport;
        let getData = new Date().getTime();
        if (typeof Promise == 'function') {
          var runAsync = function () {
            var p = new Promise(function (resolve, reject) {
              vm.eventType = 'unload';
              let param = {
                pageUrl: vm.pageUrl,
                referer: vm.referer,
                time: new Date().getTime(),
              };
              vm.sendData(vm.compress(param));
              resolve();
            });
            return p;
          };
          runAsync().then(function () {
            (vm.startDate = new Date().getTime()),
              (vm.referer = vm.pageUrl),
              (vm.pageUrl = document.URL);
            vm.eventType = 'insideload';
            let param = vm.loadEventData(vm);
            vm.sendData(vm.compress(param));
          });
        }
      },
      pushstateEvent: function (_state) {
        let vm = nekyEeport;
        vm.eventType = 'unload';
        vm.pageUrl = _win.location.href;
        let data = {
          time: new Date().getTime(),
          pageUrl: _win.location.href,
          referer: vm.referer,
        };
        vm.sendData(vm.compress(data));
        setTimeout(function () {
          vm.eventType = 'insideload';
          let param = {
            pageUrl: _win.location.href,
            referer: vm.pageUrl,
            time: new Date().getTime(),
          };
          vm.referer = vm.pageUrl;
          vm.pageUrl = _win.location.href;

          vm.sendData(vm.compress(param));
        }, 300);
      },
      loadEventData: function (vm) {
        return {
          pv: vm.fullPv(),
        };
      },
      beforeunloadEvent: function () {
        let vm = nekyEeport;
        vm.endTime = new Date().getTime();
        vm.eventType = 'beforeunload';
      },
      beforeunloadData: function (vm) {
        return {
          startTime: vm.startTime,
          endTime: vm.endTime,
        };
      },
      unloadEvent: function () {
        let vm = nekyEeport;
        let time = new Date().getTime() - vm.endTime;
        if (time <= 5) {
          vm.eventType = 'unload';
          removeCookie('_zcb');
        }
        let param = vm.beforeunloadData(vm);
        if (vm.startTime) {
          vm.sendData(vm.compress(param));
        }
      },
      clickEvent: function (event) {
        event = event || arguments.callee.caller.arguments[0] || window.event;
        let vm = nekyEeport;
        let target = null;
        let path = event.path || (event.composedPath && event.composedPath());
        if (!path) return;
        for (var i = 0; i < path.length - 2; i++) {
          if (path[i].getAttribute('data-collect')) {
            target = path[i];
            break;
          }
        }

        if (!target) {
          return;
        }
        vm.eventType = 'click';
        let data = {
          pageX: event.pageX || event.changedTouches[0].pageX,
          pageY: event.pageY || event.changedTouches[0].pageY,
          eventType: vm.eventType,
          pageUrl: _win.location.href,
          referer: vm.referer,
        };
        const eid = target.getAttribute('data-collect');
        const extra = target.getAttribute('data-extra');
        if (eid) {
          data.eid = eid;
        }
        if (extra) {
          data.extra = extra;
        }
        vm.sendData(vm.compress(data));
        return;
      },
      touchendEvent: function (event) {
        let vm = nekyEeport;
        if (vm.isTouchmove) {
          vm.isTouchmove = false;
        } else {
          vm.clickEvent(event);
        }
      },
      touchmoveEvent: function (event) {
        let vm = nekyEeport;
        vm.isTouchmove = true;
      },
      //生成用户ID
      setUid() {
        return (
          this.loadTime.toString(36) +
          ('' + Math.random()).slice(-8).toString(36).substr(2, 5)
        );
      },
      //cookie生成
      readZcaData: function () {
        let _zca = getCookie('_zca');
        if (_zca) {
          let a = _zca.split('.');
          a.length == 6 && (this.zca = a);
        }
        if (!this.zca) {
          let time = this.loadTime;
          this.zca = [time, this.setUid().toString(36), time, time, 0, 0];
          setCookie('_zca', this.zca.join('.'), this.twoYears);
        }
      },
      readZcbData: function () {
        let _zcb = getCookie('_zcb');
        if (_zcb) {
          this.zcb = _zcb;
        }
        if (!this.zcb) {
          this.zcb = this.loadTime;
          setCookie('_zcb', this.zcb, this.semih);
        }
      },
      writeZcaData: function (vm) {
        let b = new Date().getTime();
        vm.zca[5] = parseInt(vm.zca[5]) + 1;
        if (vm.zcb == vm.loadTime || b - vm.zcb > vm.semih) {
          vm.zca[2] = vm.zca[3];
          vm.zca[3] = b;
          vm.zca[4] = parseInt(vm.zca[4]) + 1;
        }
        setCookie('_zca', vm.zca.join('.'), vm.twoYears);
      },
      writeZcbData: function (vm) {
        setCookie('_zcb', vm.zcb, vm.semih);
      },
      //数据提交
      fullPv: function () {
        this.vid = this.zca[0] + '.' + this.zca[1];
        return (
          this.zca[0] +
          '.' +
          this.zca[1] +
          '.' +
          this.zca[4] +
          '.' +
          this.zca[5]
        );
      },
      compress: function (param) {
        let data = {
          os: this.browserInfo.os,
          browser: this.browserInfo.browser,
          screen: _win.screen.availHeight + 'x' + _win.screen.availWidth,
          pageUrl: _win.location.href,
          referer: this.referer,
          language: this.browserInfo.language,
          time: new Date().getTime(),
          eventType: this.eventType,
          accessPath: this.accessPath.join(','),
        };
        return parseParam(mergeJSON(data, param));
      },
      impressionData: function (param) {
        let vm = nekyEeport;
        let data = {
          eventType: 'impression',
          pageUrl: _win.location.href,
          time: new Date().getTime(),
          pv: vm.fullPv() || '',
        };
        if (param) {
          return vm.sendData(parseParam(mergeJSON(data, param)));
        }
      },
      basicData: function (param) {
        this.vid ? (param += '&vid=' + this.vid) : '';
        this.config.uid ? (param += '&uid=' + this.config.uid) : '';
        this.config.channel ? (param += '&channel=' + this.config.channel) : '';
        this.version ? (param += '&jv=' + this.version) : '';
        param += '&device=' + this.browserInfo.device;
        // this.accessPath.length > 0 ? param += '&accessPath=' + this.accessPath.join(',') : ''
        return param;
      },
      sendData: function (param) {
        let url = this.config.url;
        url += '?' + this.basicData(param) || '';
        let img = new Image();
        (img.onload = img.onerror =
          function () {
            img = null;
          }),
          (img.src = url);
      },
      //请求监听
      xmlFun: function (event) {
        let target = event.target;
        let vm = nekyEeport;
        let funData = null;
        if ('readystatechange' === event.type) {
          if (target.readyState == 4) {
            if (target.status == 200) {
              for (let i = 0; i < vm.apiData.length; i++) {
                if (
                  _win.location.origin + '/' + vm.apiData[i].apiName ==
                  target.responseURL
                ) {
                  if (nekyType.isPlainObject(target.response)) {
                    funData = vm.apiData[i].apiFun(target.response);
                  } else {
                    funData = vm.apiData[i].apiFun(JSON.parse(target.response));
                  }
                  if (
                    funData &&
                    nekyType.isArray(funData) &&
                    funData.length > 0
                  ) {
                    for (let i = 0; i < funData.length; i++) {
                      vm.impressionData(funData[i]);
                    }
                  } else if (
                    funData &&
                    nekyType.isPlainObject(funData) &&
                    !nekyType.isEmptyObject(funData)
                  ) {
                    vm.impressionData(funData);
                  }
                }
              }
            }
          }
        }
      },
      //开放接口
      api: {
        watchApi: function (apiName, apiFun) {
          let vm = nekyEeport;
          if (apiName) {
            vm.apiData.push({
              apiName: apiName,
              apiFun: apiFun || vm.noFun,
            });
          }
        },
        watchRead: function (apiFun) {
          let vm = nekyEeport;
          let data = apiFun();
          if (data && nekyType.isArray(data) && data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              vm.impressionData(data[i]);
            }
          } else if (
            data &&
            nekyType.isPlainObject(data) &&
            !nekyType.isEmptyObject(data)
          ) {
            vm.impressionData(data);
          }
        },
        setData: function (data) {
          data = data || null;
          if (
            data &&
            nekyType.isPlainObject(data) &&
            !nekyType.isEmptyObject(data)
          ) {
            for (let key in data) {
              nekyEeport.config[key] = data[key];
            }
          }
        },
        dispatch: function (data, eventType) {
          let vm = nekyEeport;
          data = data || null;
          if (
            data &&
            nekyType.isPlainObject(data) &&
            !nekyType.isEmptyObject(data)
          ) {
            let param = vm.loadEventData(vm);
            data.eventType = eventType || 'click';
            data.pageUrl = _win.location.href;
            vm.sendData(vm.compress(mergeJSON(param, data)));
          }
        },
      },
    };

    _win.XMLHttpRequest = function () {
      let XML = new nekyEeport.XMLHttpRequest();
      XML.addEventListener('readystatechange', nekyEeport.xmlFun);
      XML.addEventListener('error', nekyEeport.xmlFun);
      XML.addEventListener('timeout', nekyEeport.xmlFun);
      XML.addEventListener('loadstart', nekyEeport.xmlFun);
      XML.addEventListener('loadend', nekyEeport.xmlFun);
      return XML;
    };

    _win._neky_rpt_.init = function (configData) {
      configData = configData || {};
      nekyEeport.config = {
        url: configData.url,
        uid: configData.uid,
        channel: configData.channel,
        isClick: configData.isClick,
        clickAttr: configData.clickAttr,
        version: configData.version,
      };
      // nekyEeport.version = this.version
      nekyEeport.init();
      return _win._neky_rpt_;
    };

    _win._neky_rpt_.watchApi = nekyEeport.api.watchApi;
    _win._neky_rpt_.watchRead = nekyEeport.api.watchRead;
    _win._neky_rpt_.setData = nekyEeport.api.setData;
    _win._neky_rpt_.dispatch = nekyEeport.api.dispatch;

    return _win._neky_rpt_;
  })(),
);
