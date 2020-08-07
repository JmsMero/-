// index.js
(function (pkg) {
    var STATE = '_android_back';
    // 維護處理方法的棧
    var _android_back_handles = [];
    // 觸發一次popstate方法，則調用最新處理方法
    var handlePopstate = function () {
        var handle = _android_back_handles.pop();
        handle && handle();
    };
    // 通過調用listen方法添加處理方法
    var listen = function (handle) {
        _android_back_handles.push(handle);
    };
    // 通過調用push方法，新增一條歷史記錄，並添加對應處理方法
    var push = function (state, handle) {
        if (handle) {
            history.pushState(state, null, location.href);
            handle && _android_back_handles.push(handle);
        }
    };
    const init = function () {
        // 通過調用 history.pushState() 方法添加一條歷史記錄
        history.pushState(STATE, null, location.href);
        // 監聽 popstate 事件，當點擊Android物理返回鍵時，會觸發該事件
        window.addEventListener('popstate', handlePopstate);
        this.listen = listen;
        this.push = push;
    };
    init.call(window[pkg] = window[pkg] || {});
})('AndroidBack');
