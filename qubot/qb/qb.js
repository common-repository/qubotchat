/*
* QuData Chat Builder Plugin.
*
* @copyright Copyright (C) 2023, qudata.com
*/
window.editorConfig = JSON.parse(`{
    "version":    "1.1.10"
  }`);

class QuBotQBEnv {
    constructor() {
        this.type = null, this.lib = new QuBotManager(this), this.isToken = !1, 
        this.cid = null;
    }
    async loadBot({}) {}
    async loadSetup({}) {}
    async send({}) {
        return null;
    }
    async sendAnalytics({}) {
        return null;
    }
    sendPost(url, request, headers = null, callback = function(obj) {}) {
        let xhrRequest = new XMLHttpRequest();
        for (var header in xhrRequest.responseType = "json", xhrRequest.open("POST", url, !0), 
        headers) xhrRequest.setRequestHeader(header, headers[header]);
        xhrRequest.addEventListener("readystatechange", function() {
            var result;
            4 === xhrRequest.readyState && 200 === xhrRequest.status && (result = xhrRequest.response, 
            callback(result));
        }), xhrRequest.send(request);
    }
}

class QuBotQBLib {
    constructor(env) {
        this.env = env;
    }
    async create(params) {}
    async initActions(type) {}
    async setBotConfig(bot, params) {}
    async setBotID(botID, params) {}
    upgradeBotFormat(bot) {}
    open() {}
    showButton() {}
    showState(state) {}
    hide() {}
    close() {}
    start(restart, lang = 0) {}
    clear() {}
    save() {}
    setLang(lang) {}
    setStyle(params) {}
    getDefaultStyle() {}
    botName() {}
    botID() {}
    userID() {}
    debugCreate() {}
    debugShow() {}
    debugClear() {}
    async onBeforeUnloadEvent() {}
}

class QuBotColor {
    constructor(r, g, b) {
        this.set(r, g, b);
    }
    toString() {
        return `rgb(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)})`;
    }
    set(r, g, b) {
        this.r = this.clamp(r), this.g = this.clamp(g), this.b = this.clamp(b);
    }
    hueRotate(angle = 0) {
        angle = angle / 180 * Math.PI;
        var sin = Math.sin(angle), angle = Math.cos(angle);
        this.multiply([ .213 + .787 * angle - .213 * sin, .715 - .715 * angle - .715 * sin, .072 - .072 * angle + .928 * sin, .213 - .213 * angle + .143 * sin, .715 + .285 * angle + .14 * sin, .072 - .072 * angle - .283 * sin, .213 - .213 * angle - .787 * sin, .715 - .715 * angle + .715 * sin, .072 + .928 * angle + .072 * sin ]);
    }
    grayscale(value = 1) {
        this.multiply([ .2126 + .7874 * (1 - value), .7152 - .7152 * (1 - value), .0722 - .0722 * (1 - value), .2126 - .2126 * (1 - value), .7152 + .2848 * (1 - value), .0722 - .0722 * (1 - value), .2126 - .2126 * (1 - value), .7152 - .7152 * (1 - value), .0722 + .9278 * (1 - value) ]);
    }
    sepia(value = 1) {
        this.multiply([ .393 + .607 * (1 - value), .769 - .769 * (1 - value), .189 - .189 * (1 - value), .349 - .349 * (1 - value), .686 + .314 * (1 - value), .168 - .168 * (1 - value), .272 - .272 * (1 - value), .534 - .534 * (1 - value), .131 + .869 * (1 - value) ]);
    }
    saturate(value = 1) {
        this.multiply([ .213 + .787 * value, .715 - .715 * value, .072 - .072 * value, .213 - .213 * value, .715 + .285 * value, .072 - .072 * value, .213 - .213 * value, .715 - .715 * value, .072 + .928 * value ]);
    }
    multiply(matrix) {
        var newR = this.clamp(this.r * matrix[0] + this.g * matrix[1] + this.b * matrix[2]), newG = this.clamp(this.r * matrix[3] + this.g * matrix[4] + this.b * matrix[5]), matrix = this.clamp(this.r * matrix[6] + this.g * matrix[7] + this.b * matrix[8]);
        this.r = newR, this.g = newG, this.b = matrix;
    }
    brightness(value = 1) {
        this.linear(value);
    }
    contrast(value = 1) {
        this.linear(value, -.5 * value + .5);
    }
    linear(slope = 1, intercept = 0) {
        this.r = this.clamp(this.r * slope + 255 * intercept), this.g = this.clamp(this.g * slope + 255 * intercept), 
        this.b = this.clamp(this.b * slope + 255 * intercept);
    }
    invert(value = 1) {
        this.r = this.clamp(255 * (value + this.r / 255 * (1 - 2 * value))), this.g = this.clamp(255 * (value + this.g / 255 * (1 - 2 * value))), 
        this.b = this.clamp(255 * (value + this.b / 255 * (1 - 2 * value)));
    }
    hsl() {
        var r = this.r / 255, g = this.g / 255, b = this.b / 255, max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) h = s = 0; else {
            var d = max - min;
            switch (s = .5 < l ? d / (2 - max - min) : d / (max + min), max) {
              case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

              case g:
                h = (b - r) / d + 2;
                break;

              case b:
                h = (r - g) / d + 4;
            }
            h /= 6;
        }
        return {
            h: 100 * h,
            s: 100 * s,
            l: 100 * l
        };
    }
    clamp(value) {
        return 255 < value ? value = 255 : value < 0 && (value = 0), value;
    }
    hexToRgb(hex) {
        hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
        hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return hex ? [ parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16) ] : null;
    }
}

class QuBotColorSolver {
    constructor(target, baseColor) {
        this.target = target, this.targetHSL = target.hsl(), this.reusedColor = new QuBotColor(0, 0, 0);
    }
    solve() {
        var result = this.solveNarrow(this.solveWide());
        return {
            values: result.values,
            loss: result.loss,
            filter: this.css(result.values)
        };
    }
    solveWide() {
        var a = [ 60, 180, 18e3, 600, 1.2, 1.2 ];
        let best = {
            loss: 1 / 0
        };
        for (let i = 0; 25 < best.loss && i < 3; i++) {
            var result = this.spsa(5, a, 15, [ 50, 20, 3750, 50, 100, 100 ], 1e3);
            result.loss < best.loss && (best = result);
        }
        return best;
    }
    solveNarrow(wide) {
        var A = wide.loss, A1 = A + 1;
        return this.spsa(A, [ .25 * A1, .25 * A1, A1, .25 * A1, .2 * A1, .2 * A1 ], 2, wide.values, 500);
    }
    spsa(A, a, c, values, iters) {
        let best = null, bestLoss = 1 / 0;
        var deltas = new Array(6), highArgs = new Array(6), lowArgs = new Array(6);
        for (let k = 0; k < iters; k++) {
            var ck = c / Math.pow(k + 1, .16666666666666666);
            for (let i = 0; i < 6; i++) deltas[i] = .5 < Math.random() ? 1 : -1, 
            highArgs[i] = values[i] + ck * deltas[i], lowArgs[i] = values[i] - ck * deltas[i];
            var lossDiff = this.loss(highArgs) - this.loss(lowArgs);
            for (let i = 0; i < 6; i++) {
                var g = lossDiff / (2 * ck) * deltas[i], ak = a[i] / Math.pow(A + k + 1, 1);
                values[i] = function(value, idx) {
                    let max = 100;
                    2 === idx ? max = 7500 : 4 !== idx && 5 !== idx || (max = 200);
                    3 === idx ? value > max ? value %= max : value < 0 && (value = max + value % max) : value < 0 ? value = 0 : value > max && (value = max);
                    return value;
                }(values[i] - ak * g, i);
            }
            var loss = this.loss(values);
            loss < bestLoss && (best = values.slice(0), bestLoss = loss);
        }
        return {
            values: best,
            loss: bestLoss
        };
    }
    loss(filters) {
        var color = this.reusedColor, filters = (color.set(0, 0, 0), color.invert(filters[0] / 100), 
        color.sepia(filters[1] / 100), color.saturate(filters[2] / 100), color.hueRotate(3.6 * filters[3]), 
        color.brightness(filters[4] / 100), color.contrast(filters[5] / 100), color.hsl());
        return Math.abs(color.r - this.target.r) + Math.abs(color.g - this.target.g) + Math.abs(color.b - this.target.b) + Math.abs(filters.h - this.targetHSL.h) + Math.abs(filters.s - this.targetHSL.s) + Math.abs(filters.l - this.targetHSL.l);
    }
    css(filters) {
        function fmt(idx, multiplier = 1) {
            return Math.round(filters[idx] * multiplier);
        }
        return `invert(${fmt(0)}%) sepia(${fmt(1)}%) saturate(${fmt(2)}%) hue-rotate(${fmt(3, 3.6)}deg) brightness(${fmt(4)}%) contrast(${fmt(5)}%)`;
    }
}

function hexToRgb(hex) {
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
    hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return hex ? [ parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16) ] : null;
}

class QuBotVisual {
    constructor(qb) {
        this.qb = qb, this.chat = null, this.content = null, this.images = null, 
        this.btnWrap = null, this.row = null, this.medias = [], this.clearThisMessage = !1, 
        this.isClearZero = !1, this.audioList = [], this.animation = "scrolling";
    }
    create(bot, params) {
        this.bot = bot;
        let parent = null;
        params.parent && (parent = document.getElementById(params.parent));
        var btn = this.add(parent, "qubot-open");
        btn.id = "qubot-open", btn.onclick = this.bot.onUserOpen.bind(this.bot);
        this.add(btn, "qubot-preloader").id = "qubot-preloader", "local" === bot.params.actions || bot.params.id ? btn.classList.add("qubot-show") : btn.classList.add("qubot-hide");
        var bot = this.add(parent, "qubot"), btn = (bot.id = "qubot-wrapper", this.add(bot, "qubot-header")), body = this.add(bot, "qubot-body"), bot = (this.add(bot, "qubot-msg-invalid").id = "qubot-msg-invalid", 
        this.add(bot, "qubot-footer")), body = (this.chat = this.add(body, "qubot-chat"), 
        this.chat.id = "qubot", this.add(body, "qubot-scroll-down")), h_content = (body.id = "qubot-scroll-down", 
        this.add(body, "qubot-scroll-down-icon"), this.add(btn, "qubot-content")), reload = (this.add(h_content, "qubot-logo"), 
        this.add(h_content, "qubot-name"), this.add(h_content, "qubot-reload")), h_content = this.add(h_content, "qubot-close"), btn = (this.add(btn, "qubot-info"), 
        this.add(bot, "qubot-content")), bot = this.add(btn, "qubot-container"), btn = this.add(bot, "qubot-input-attach-btn", "label"), labelDnD = this.add(bot, "qubot-input-drop-area", "label"), btn = (this.setupLabelAttach(btn), 
        this.setupLabel(labelDnD), this.add(bot, "qubot-input-geo", "label")), cancelGeo = this.add(bot, "qubot-cancel-geo", "button"), btn = (this.setupGeo(btn), 
        this.setupCancelGeo(cancelGeo), this.add(bot, "qubot-input", "input")), cancelGeo = (btn.id = "qubot-input", 
        this.add(bot, "qubot-send"));
        cancelGeo.id = "qubot-send", params.userVoice && (this.voiceRecorder = this.add(bot, "qubot-voice-recorder"), 
        this.voiceRecorder.onclick = this.voiceRecorderClick.bind(this)), reload.onclick = this.bot.onUserBeforeReload.bind(this.bot), 
        h_content.onclick = this.bot.onUserClose.bind(this.bot), cancelGeo.onclick = this.input.bind(this), 
        btn.onkeypress = this.inputEnter.bind(this), labelDnD.onchange = this.inputFile.bind(this), 
        btn.onclick = this.gotoBottom.bind(this), body.onclick = this.gotoBottom.bind(this), 
        this.chat.onscroll = this.onChatScroll.bind(this), window.addEventListener("orientationchange", () => {
            this.changeOrientation();
        }), this.HEIGHT = parseInt(window.getComputedStyle(document.getElementById("qubot-wrapper")).height), 
        window.addEventListener("resize", () => {
            this.initSizes();
        });
    }
    initSizes() {
        var qb = document.getElementById("qubot-wrapper"), qbStyles = window.getComputedStyle(qb);
        parseInt(qbStyles.bottom) < 0 || parseInt(qbStyles.bottom);
        window.innerHeight > window.innerWidth && window.innerWidth < 768 ? qb.style.height = window.innerHeight + "px" : qb.style.height = this.HEIGHT + "px";
    }
    onClickGeo() {
        navigator.geolocation.getCurrentPosition(function(pos) {
            pos = {
                lon: (pos = pos.coords).longitude,
                lat: pos.latitude
            }, this.inputGeo(pos);
        }.bind(this), function(err) {
            console.log(`ERROR(${err.code}): ` + err.message), this.inputGeo(!1);
        }.bind(this));
    }
    setupGeo(label) {
        label.id = "qubot-input-geo", label.setAttribute("for", "qubot-input"), 
        label.style.display = "none", label.style.cursor = "pointer", navigator.geolocation ? label.onclick = () => {
            this.onClickGeo();
        } : label.style.opacity = .5;
    }
    setupCancelGeo(btn) {
        btn.id = "qubot-cancel-geo", btn.style.display = "none", btn.innerHTML = "❌", 
        btn.onclick = () => {
            this.inputGeo(!1);
        };
    }
    async inputFile(e) {
        var lblArea = document.getElementById("qubot-input-drop-area"), e = e.target.files || e.dataTransfer.files, e = !!e && e[0];
        e && (this.fileBase64 = await this.toBase64(e), this.fileType = e.type, 
        this.fileName = e.name, lblArea.innerHTML = e.name);
    }
    setupLabelAttach(label) {
        label.id = "qubot-input-attach-btn", label.setAttribute("for", "qubot-input"), 
        label.style.display = "none";
    }
    setupLabel(label) {
        label.id = "qubot-input-drop-area", label.setAttribute("for", "qubot-input"), 
        label.style.display = "none", label.setAttribute("def", "<b>Choose a file</b> or drag it here <div class='qubot-download-icon'></div>"), 
        label.innerHTML = label.getAttribute("def"), label.addEventListener("dragover", event => {
            event.stopPropagation(), event.preventDefault(), event.dataTransfer.dropEffect = "copy", 
            label.style.backgroundColor = "#ccc";
        }), label.addEventListener("dragleave", event => {
            event.stopPropagation(), event.preventDefault(), label.style.backgroundColor = "#eee";
        }), label.addEventListener("drop", event => {
            event.stopPropagation(), event.preventDefault(), this.inputFile(event), 
            label.style.backgroundColor = "#ccc";
        });
    }
    changeOrientation() {
        var wrap = document.getElementById("qubot-wrapper"), oriHelp = document.getElementById("qubot-ori-help");
        wrap.classList.contains("qubot-show") && 90 === window.orientation ? (this.showOriHelp(), 
        this.close()) : oriHelp ? (this.hideOriHelp(), this.open()) : this.hideOriHelp();
    }
    showOriHelp() {
        console.log("show tuto after open");
        var oriHelp = this.add(document.body, "qubot-ori-help");
        oriHelp.setAttribute("id", "qubot-ori-help"), oriHelp.addEventListener("click", this.hideOriHelp);
    }
    hideOriHelp() {
        var oriHelp = document.getElementById("qubot-ori-help");
        oriHelp && oriHelp.remove();
    }
    open() {
        var wrap, open;
        90 === window.orientation ? this.showOriHelp() : (wrap = document.getElementById("qubot-wrapper"), 
        open = document.getElementById("qubot-open"), wrap.classList.add("qubot-show"), 
        wrap.classList.remove("qubot-hide"), open.classList.add("qubot-hide"), open.classList.remove("qubot-show"), 
        this.initSizes(), this.gotoBottom(), document.getElementById("qubot-input").focus());
    }
    showButton() {
        var loader = document.getElementById("qubot-preloader"), loader = (loader && loader.classList.remove("qubot-preloader"), 
        document.getElementById("qubot-open"));
        loader.classList.add("qubot-show"), loader.classList.add("qubot-open-shadow"), 
        loader.classList.remove("qubot-hide");
    }
    hide() {
        var wrap = document.getElementById("qubot-wrapper"), open = document.getElementById("qubot-open");
        open.classList.add("qubot-hide"), open.classList.remove("qubot-show"), this.bot.wasClose || (wrap.classList.add("qubot-hide"), 
        wrap.classList.remove("qubot-show"));
    }
    close() {
        var wrap = document.getElementById("qubot-wrapper"), open = document.getElementById("qubot-open");
        wrap && open && (wrap.classList.remove("qubot-show"), wrap.classList.add("qubot-hide"), 
        open.classList.remove("qubot-hide"), open.classList.add("qubot-show"), wrap = document.getElementById("qubot-debug")) && wrap.remove();
    }
    clear() {
        if (this.isClearZero = !1, this.chat) for (;this.chat.firstChild; ) this.chat.removeChild(this.chat.lastChild);
    }
    setStyle(params) {
        for (var param in params) {
            var val = params[param];
            this.setStyleParam(param, val), "text-bot-name" === param && (this.bot.name = val);
        }
    }
    setAssetsPath(path) {
        this.assetsPath = path;
    }
    setStyleParam(param, val) {
        var color, rgb;
        0 === param.indexOf("text-") && 0 != val.indexOf('"') && (val = '"' + val + '"'), 
        0 === param.indexOf("close-") || 0 === param.indexOf("send-") ? (rgb = (color = new QuBotColor(0, 0, 0)).hexToRgb(val), 
        color.set(rgb[0], rgb[1], rgb[2]), rgb = new QuBotColorSolver(color).solve(), 
        document.documentElement.style.setProperty("--qubot-" + param, rgb.filter)) : document.documentElement.style.setProperty("--qubot-" + param, val);
    }
    inputEnter(event) {
        13 === (event.keyCode || event.which) && this.input();
    }
    inputGeo(value) {
        this.bot.onUserGeo(value);
    }
    input() {
        var inp, lblArea;
        this.isValidInput() && ("file" === (inp = document.getElementById("qubot-input")).type ? (this.bot.onUserInputFile(this.fileType, this.fileBase64, this.fileName), 
        this.fileType = "", this.fileBase64 = "", this.fileName = "", (lblArea = document.getElementById("qubot-input-drop-area")).innerHTML = lblArea.getAttribute("def")) : (lblArea = inp.value.trim(), 
        lblArea = this.prepareInput(lblArea), (inp.value = "") !== lblArea && this.bot.onUserInput(lblArea)));
    }
    prepareInput(text) {
        return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }
    isValidInput() {
        var input = document.getElementById("qubot-input");
        return "email" === input.type ? this.checkValidEmail(input.value) : "number" === input.type ? this.checkValidNumber(input.value) : "tel" === input.type ? this.checkValidPhone(input.value) : "file" !== input.type || this.checkValidFile(this.fileName);
    }
    checkValidFile(value) {
        return !!value || (this.shakeField(document.getElementById("qubot-input-drop-area")), 
        !1);
    }
    checkValidPhone(value) {
        return !(value.length < 5) && !(18 < value.length) && new RegExp("^\\+?[0-9]*$").test(value) ? !(9 <= value.length && 0 == value.indexOf("00") && (this.shakeField(), 
        1)) : (this.shakeField(), !1);
    }
    checkValidNumber(value) {
        return !!new RegExp("\\+?[0-9]*$").test(value) || (this.shakeField(), !1);
    }
    checkValidEmail(value) {
        return !!new RegExp("[a-z0-9]+@[a-z]+.+[a-z]{2,3}").test(value) || (this.shakeField(), 
        !1);
    }
    showInvalidAnim(err) {
        let warn = document.getElementById("qubot-msg-invalid");
        this.add(warn, "qubot-error-message").innerHTML = err, warn.classList.add("qubot-show"), 
        setTimeout(() => {
            warn.classList.remove("qubot-show"), warn.innerHTML = "";
        }, 2400);
    }
    shakeField(elem, type = "error") {
        (elem = elem || document.getElementById("qubot-input")).classList.add("qubot-shake"), 
        elem.classList.add("qubot-input-" + type), setTimeout(() => {
            elem.classList.remove("qubot-shake"), elem.classList.remove("qubot-input-" + type);
        }, 700);
    }
    voiceRecorderClick() {
        this.bot.onUserMicrophoneClick();
    }
    visualRecMicro() {
        this.bot.recorder.isRecording ? this.voiceRecorder.classList.remove("qubot-voice-recorder-active") : this.voiceRecorder.classList.add("qubot-voice-recorder-active");
    }
    initMessage() {
        this.stopMedia(), this.removeButtons(), this.removeMenu(), this.clearThisMessage && (this.clearMessages(1), 
        this.clearThisMessage = !1, this.gotoBottom()), this.content = null, this.images = null;
    }
    addMessage() {
        this.content = this.addBlock("qubot-message msg-appear");
    }
    addBlock(className) {
        var block = this.add(this.chat, className), block = (this.add(block, "qubot-logo"), 
        this.add(block, "qubot-container")), className = ("qubot-message" == className && this.add(block, "qubot-sender"), 
        this.add(block, "qubot-content")), block = this.add(block, "qubot-time"), today = new Date(), dt = this.strDigit(today.getHours()) + ":" + this.strDigit(today.getMinutes()) + ":" + this.strDigit(today.getSeconds()), today = this.strDigit(today.getFullYear()) + "-" + this.strDigit(today.getMonth() + 1) + "-" + this.strDigit(today.getDate());
        return block.innerHTML = dt + " " + today, className;
    }
    addUserText(item) {
        var block;
        null != item.text && "disappear" != (this.chat.lastChild ? this.chat.lastChild.getAttribute("kind") : null) && ((block = this.addBlock("qubot-answer msg-appear")).innerHTML = item.text, 
        this.content = block, this.runAnimate());
    }
    addBotText(item) {
        let text = item.text;
        this.content || this.addMessage();
        let p;
        p = item.pre ? this.add(this.content, null, "pre") : (text = text.replace(/\n/g, "<br>"), 
        this.add(this.content, null, "p")), text = this.clearTextFromSpecial(text), 
        p.innerHTML = text, void 0 !== item.color && (p.style.color = item.color), 
        item.center && (p.style.textAlign = "center");
    }
    addBotImagesRow() {
        this.content || this.addMessage(), this.images = this.add(this.content, "qubot-images");
    }
    addBotImage(image) {
        this.content || this.addMessage();
        let src = image.url || image.image || "";
        src.indexOf("://") < 0 && this.assetsPath && (src = this.assetsPath + src), 
        this.images || this.addBotImagesRow();
        var imageItem = this.add(this.images, "qubot-image");
        let width = image.width;
        width = width || 100, imageItem.style.width = width + "%", 0 === image.center && (this.images.style.justifyContent = "flex-start");
        var cond, img = this.add(imageItem, "not-loaded", "img");
        img.style.setProperty("--qubot-icon", 'url("svg/image.svg")'), image.file_height && image.file_width && (cond = imageItem.getBoundingClientRect().width / image.r_width, 
        img.style.height = image.file_height * width / 100 * cond + "px"), this.bot;
        img.onload = function(event) {
            this.classList.remove("not-loaded");
        }, img.setAttribute("src", "" + src), image.caption && (this.add(imageItem, "qubot-caption").innerHTML = image.caption);
    }
    addBotButtonsRow() {
        this.row = this.add(this.btnWrap, "qubot-row");
    }
    addBtnWrapper() {
        this.content || this.addMessage(), this.btnWrap = this.add(this.content, "qubot-btn-container");
    }
    addBotButton(btn) {
        var text = btn.button;
        let url = btn.url;
        var text = this.clearTextFromSpecial(text), button = document.createElement("div"), divInside = (button.className = "qubot-button", 
        btn.params && btn.params.icon && this.add(button, "button-icon", "img").setAttribute("src", btn.params.icon), 
        document.createElement("span"));
        button.append(divInside), "check" === btn.kind ? divInside.innerHTML = (btn.checked ? "✅&nbsp;" : "⬜️&nbsp;") + text : "radio" === btn.kind ? divInside.innerHTML = (btn.checked ? "◉&nbsp;" : "○&nbsp;") + text : (btn.kind, 
        divInside.innerHTML = text);
        let bot = this.bot;
        switch (url ? (0 !== url.indexOf("http://") && 0 !== url.indexOf("https://") && (url = "https://" + url), 
        button.onclick = function() {
            window.open(url, "_blank"), bot.onUserButtonClick(btn);
        }, (divInside = document.createElement("span")).innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather align-middle me-2"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>', 
        button.append(divInside)) : button.onclick = function() {
            bot.onUserButtonClick(btn);
        }, btn.align || btn.text_align) {
          case "left":
            button.style.textAlign = "left", button.style.justifyContent = "flex-start";
            break;

          case "right":
            button.style.textAlign = "right", button.style.justifyContent = "flex-end";
            break;

          default:
            button.style.textAlign = "", button.style.justifyContent = "";
        }
        btn.params && btn.params.border && ("default" != btn.params.border.style && (button.style.borderStyle = btn.params.border.style), 
        btn.params.border.size && (button.style.borderWidth = btn.params.border.size + "px"), 
        btn.params.border.color) && (button.style.borderColor = btn.params.border.color), 
        this.row.append(button);
    }
    addBotVideo(item) {
        this.addBotMedia(item, "video");
    }
    addBotAudio(item) {
        this.addBotMedia(item, "audio");
    }
    addBotMedia(item, kind) {
        if ("voice" === item.type) {
            this.content || this.addMessage();
            let media = this.add(this.content, "qubot-" + item.type, kind);
            media.setAttribute("controls", "true"), media.setAttribute("src", "data:audio/wav;base64," + item.data), 
            void this.audioList.push(media);
        } else if (item.url && item.url.length) {
            this.content || this.addMessage();
            let media = document.createElement(kind);
            media.classList.add("qubot-" + kind), "video" == kind && media.classList.add("not-loaded"), 
            media.style.setProperty("--qubot-icon", 'url("svg/video.svg")'), media.classList.add("qubot-disable-select"), 
            item.play && media.setAttribute("autoplay", "true"), item.control && media.setAttribute("controls", "true"), 
            item.loop && media.setAttribute("loop", "true"), this.medias.push({
                media: media,
                item: item
            });
            var source = this.add(media, null, "source");
            "audio" === kind ? source.type = "audio/mpeg" : "video" === kind && (source.type = "video/mp4"), 
            media.setAttribute("muted", "true"), media.setAttribute("playsinline", "true"), 
            media.onloadeddata = function(event) {
                this.classList.remove("not-loaded");
            }, source.setAttribute("src", item.url), this.add(media, null, "p").innerHTML = "<a href='" + item.url + "'>Link to the " + kind + "</a>", 
            this.content.appendChild(media), setTimeout(() => {
                media.setAttribute("muted", "false");
            }, 100);
        }
    }
    addBotMap(item) {
        this.content || this.addMessage();
        var mapElem = this.add(this.content, "qubot-map"), map = (mapElem.classList.add("qubot-disable-select"), 
        item.url || item.map);
        if (map) {
            let src = `src="${map}"`;
            if (0 <= map.indexOf("iframe")) {
                if (!(src = map.match(/src\s*=\s*".+?"/)) || !src.length) return;
                src = src[0];
            }
            map = this.getInt(item.height, 200, 50, 600);
            mapElem.innerHTML = `<iframe ${src} width="100%" height="${map}" style="border:0;" loading="lazy"></iframe>`;
        }
    }
    addTyping() {
        document.querySelectorAll("#qubot-wrapper .qubot-body .qubot-chat .qubot-message .qubot-typing").forEach(x => {
            x.parentNode.parentNode.removeChild(x.parentNode);
        });
        var block = this.add(this.chat, "qubot-message");
        this.add(block, "qubot-logo");
        this.add(block, "qubot-typing"), this.typingBlock = block, this.gotoBottom();
    }
    removeTyping() {
        this.typingBlock && (this.typingBlock.remove(), this.typingBlock = null);
    }
    stopMedia() {
        for (let i = 0; i < this.medias.length; i++) try {
            this.medias[i].item.stop && this.medias[i].media.pause();
        } catch (e) {}
        this.medias = [];
    }
    inputDisable() {
        document.getElementById("qubot-send").style.display = "block";
        var inp = document.getElementById("qubot-input"), inp = (inp.style.display = "block", 
        inp.type = "text", inp.value = "", inp.className = "qubot-input", inp.disabled = !0, 
        document.getElementById("qubot-input-drop-area")), lblAtt = document.getElementById("qubot-input-attach-btn"), lblGeo = document.getElementById("qubot-input-geo"), cancelGeo = document.getElementById("qubot-cancel-geo");
        inp.style.display = "none", lblAtt.style.display = "none", lblGeo.style.display = "none", 
        cancelGeo.style.display = "none";
    }
    inputEnable() {
        document.getElementById("qubot-input").disabled = !1;
    }
    inputSetKind(msg) {
        var input = document.getElementById("qubot-input"), lblDnD = (input.onchange = null, 
        document.getElementById("qubot-input-drop-area")), lblAtt = document.getElementById("qubot-input-attach-btn"), lblGeo = document.getElementById("qubot-input-geo"), cancelGeo = document.getElementById("qubot-cancel-geo"), btnSend = document.getElementById("qubot-send");
        switch (input.style.display = "block", input.maxLength = "255", btnSend.style.display = "block", 
        lblDnD.style.display = "none", lblAtt.style.display = "none", lblGeo.style.display = "none", 
        cancelGeo.style.display = "none", msg.input.kind) {
          case "ai":
          case "text":
            input.type = "text";
            break;

          case "int":
          case "number":
          case "float":
            input.type = "number", input.value = "0";
            break;

          case "time":
            input.type = "time";
            break;

          case "MMDDYYYY":
          case "DDMMYYYY":
            input.type = "date";
            break;

          case "datetime":
            if (msg.input.params) switch (msg.input.params.time) {
              case "date":
                input.type = "date";
                break;

              case "time":
                input.type = "time";
                break;

              default:
                input.type = "datetime-local";
            }
            break;

          case "email":
            input.type = "email";
            break;

          case "phone":
            input.type = "tel", input.maxLength = 18;
            break;

          case "file":
            input.type = "file", input.style.display = "none", lblDnD.innerHTML = lblDnD.getAttribute("def"), 
            lblDnD.style.display = "flex", lblAtt.style.display = "flex", input.onchange = e => {
                this.inputFile(e);
            };
            break;

          case "range":
            input.type = "range", input.min = msg.input.params ? msg.input.params.min : 0, 
            input.max = msg.input.params ? msg.input.params.max : 0;
            break;

          case "geo":
            input.type = "text", input.style.display = "none", btnSend.style.display = "none", 
            lblGeo.style.display = "flex", cancelGeo.style.display = "block";
            let geoText = msg.input.params.getGeoButtonText;
            "object" == typeof geoText && (geoText = (geoText = geoText[this.bot.lang]) || ""), 
            lblGeo.innerHTML = geoText + "<div class='qubot-map-pin'></div>";
        }
        "range" === msg.input.kind ? input.className = "qubot-input-range" : void 0 !== msg.input.kind && (input.className = "qubot-input");
    }
    inputFocus() {
        document.getElementById("qubot-input").focus();
    }
    clearEmptyContent() {
        this.content && !this.content.childElementCount && (this.content.parentNode.parentNode.remove(), 
        this.content = null);
    }
    removeButtons() {
        for (var buttons = this.chat.getElementsByClassName("qubot-row"); 0 < buttons.length; ) parent = buttons[0].parentNode, 
        buttons[0].remove(), 0 == parent.children.length && (parent.style.opacity = ".10");
    }
    removeMenu() {
        var items = document.querySelectorAll(".qubot .qubot-widget-menu");
        let i = 0;
        for (;i < items.length; ) {
            items[i].remove();
            i++;
        }
    }
    showExternalLink(link) {
        window.open(state, "_blank"), this.clearThisMessage = !0, this.clearMessages(1), 
        this.clearThisMessage = !1, this.gotoBottom();
    }
    clearTextFromSpecial(text) {
        return text = (text = (text = text.replace(/\\{\\{/g, "{{")).replace(/\\}\\}/g, "}}")).replace(/\\\$/, "$");
    }
    backgroundColor(color) {
        this.content || this.addMessage(), this.content.style.backgroundColor = color;
    }
    setAgent(agent) {
        var icon;
        this.content || this.addMessage(), agent.avatar && 0 < (icon = document.querySelectorAll(".qubot-message .qubot-logo")).length && (0 != agent.avatar.indexOf("https://") && (agent.avatar = "https://" + agent.avatar), 
        icon[icon.length - 1].classList.add("qudata-agent-livechat"), icon[icon.length - 1].style.setProperty("--qubot-icon-agent", "url('" + agent.avatar + "')")), 
        agent.name && 0 < (icon = document.querySelectorAll(".qubot-message .qubot-sender")).length && (icon[icon.length - 1].classList.add("qudata-agent-livechat"), 
        icon[icon.length - 1].style.setProperty("--qubot-text-sender-name", "'" + agent.name + "'"));
    }
    addMenu(menu) {
        var input = document.querySelector(".qubot-footer .qubot-content"), input = (menu.position && menu.position, 
        this.insert(input, "qubot-widget-menu"));
        if (this.add(input, "qubot-widget-menu-title", "label").innerHTML = menu.title || "MENU", 
        menu.content) {
            let bot = this.bot;
            var qbMenuContent = this.add(input, "qubot-widget-menu-content");
            for (let i = 0; i < menu.content.length; i++) {
                var item = this.add(qbMenuContent, "qubot-widget-menu-item");
                menu.content[i].icon ? this.add(item, "qubot-widget-menu-icon") : this.add(item, ""), 
                item.innerHTML += menu.content[i].button, menu.content[i].action ? item.onclick = function() {
                    bot.onRunAction(menu.content[i].action, !1);
                } : menu.content[i].callback && (item.onclick = function() {
                    bot.onUserButtonClick(menu.content[i], !1);
                });
            }
        }
    }
    strDigit(d) {
        return d < 10 ? "0" + d : d;
    }
    getInt(text, def, min, max) {
        let val = def;
        try {
            val = parseInt(text);
        } catch (e) {
            val = def;
        }
        return val = (val = val < min ? min : val) > max ? max : val;
    }
    clearMessages(cnt) {
        if (this.chat) {
            cnt = parseInt(cnt);
            var children = this.chat.children;
            if (0 === cnt) for (let i = this.chat.children.length - 1; -1 < i; i--) "disappear" === this.chat.children[i].getAttribute("kind") && this.chat.removeChild(this.chat.children[i]); else if (-1 === cnt) {
                for (;0 < children.length; ) this.chat.removeChild(this.chat.firstChild);
                this.content = null;
            } else if (0 < cnt) {
                for (let i = 0; i < cnt; i++) this.chat.lastChild && ("qubot-answer" === this.chat.lastChild.className && this.chat.removeChild(this.chat.lastChild), 
                "qubot-message" === this.chat.lastChild.className) && this.chat.removeChild(this.chat.lastChild);
                this.content = null;
            }
            this.gotoBottom();
        }
    }
    beforeReload() {
        this.addMessage();
        this.add(this.content, null, "p").innerHTML = {
            ru: "✔ Вы собираетесь очистить историю чата.<br>Вы уверены?",
            uk: "✔ Ви збираєтеся очистити історію чату.<br>Ви впевнені?",
            de: "✔ Sie sind dabei, den Chatverlauf zu löschen.<br>Sind Sie sicher?",
            fr: "✔ Vous êtes sur le point d'effacer l'historique des discussions.<br>Êtes-vous sûr ?",
            es: "✔ Está a punto de borrar el historial de chat.<br>¿Está seguro?",
            jp: "チャット履歴を消去しようとしています。<br>よろしいですか?"
        }[this.bot.lang] || "You are about to clear the chat history.<br>Are you sure?";
        var row = this.add(this.content, "qubot-row");
        let bot = this.bot, btn = this.add(row, "qubot-button");
        btn.innerHTML = {
            en: "✔ Yes",
            ru: "✔ Да",
            uk: "✔ Так",
            de: "✔ Ja",
            fr: "✔ Oui",
            es: "✔ Sí",
            jp: "✔ はい"
        }[this.bot.lang] || "✔", btn.onclick = function() {
            bot.onUserReloadYes();
        }, (btn = this.add(row, "qubot-button")).innerHTML = {
            en: "❌ No",
            ru: "❌ Нет",
            uk: "❌ Ні",
            de: "❌ Nein",
            fr: "❌ Non",
            es: "❌ No",
            jp: "❌ いいえ"
        }[this.bot.lang] || "❌", btn.onclick = function() {
            bot.onUserReloadNo();
        }, this.runAnimate();
    }
    gotoBottom(animate = !0, scrollTop = !1) {
        var div = document.getElementById("qubot");
        animate ? (div.scrollTop = scrollTop && scrollTop < div.scrollHeight ? scrollTop : div.scrollHeight, 
        div.lastChild && div.lastChild.classList.remove("opacity" === this.animation && "msg-appear")) : (div.style.scrollBehavior = "auto", 
        div.scrollTop = scrollTop && scrollTop < div.scrollHeight ? scrollTop : div.scrollHeight, 
        div.style.scrollBehavior = ""), this.onChatScroll();
    }
    opacityAnimate(div, animate = !1, top = !1) {
        var elems = div.querySelectorAll(".qubot .qubot-body .qubot-chat .msg-appear");
        0 < elems.length && elems.forEach(elem => {
            div.style.scrollBehavior = "auto", animate ? div.scrollTop = div.scrollHeight : 0 != top && (div.scrollTop = top), 
            div.style.scrollBehavior = "", elem.classList.remove("msg-appear");
        }), animate && this.onChatScroll();
    }
    scrollAnimate(div, animate = !0, top = !1) {
        let sum = 0;
        var elems = div.querySelectorAll(".qubot .qubot-body .qubot-chat .msg-appear");
        0 < elems.length && elems.forEach(elem => {
            elem.classList.remove("msg-appear"), sum += elem.getBoundingClientRect().height;
        }), animate ? (div.scrollTop = div.scrollHeight, div.scrollTop -= sum, div.scrollTop = div.scrollHeight, 
        this.onChatScroll()) : 0 != top && (div.style.scrollBehavior = "auto", div.scrollTop = top, 
        div.style.scrollBehavior = "");
    }
    runAnimate(animate = !0, top = !1) {
        var div = document.getElementById("qubot");
        "scrolling" === this.animation ? this.scrollAnimate(div, animate, top) : this.opacityAnimate(div, animate, top);
    }
    onChatScroll() {
        var chat = document.getElementById("qubot"), scrollDown = document.getElementById("qubot-scroll-down");
        chat.scrollTop + chat.clientHeight < chat.scrollHeight - 100 ? (scrollDown.style.visibility = "visible", 
        scrollDown.style.opacity = 1) : (scrollDown.style.visibility = "hidden", 
        scrollDown.style.opacity = 0);
    }
    deleteButtons() {
        let btns = document.getElementById("qubot").lastChild.querySelectorAll(".qubot-btn-container");
        for (let i = 0; i < btns.length; i++) btns[i].style.maxHeight = btns[i].clientHeight + "px", 
        setTimeout(() => {
            btns[i].style.maxHeight = "0px", btns[i].style.opacity = "0";
        });
        return new Promise((res, rej) => {
            setTimeout(() => {
                for (let i = 0; i < btns.length; i++) btns[i].parentNode.removeChild(btns[i]);
                res();
            }, 700);
        });
    }
    add(parent, className, element = "div") {
        element = document.createElement(element);
        return null !== className && (element.className = className), (null !== parent ? parent : document.body).append(element), 
        element;
    }
    insert(parent, className, element = "div", pos) {
        element = document.createElement(element);
        return null !== className && (element.className = className), null !== parent ? parent.insertBefore(element, parent.firstChild) : document.body.insertBefore(element, document.body.firstChild), 
        element;
    }
    toBase64(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file), reader.onload = () => {
                let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
                0 < encoded.length % 4 && (encoded += "=".repeat(4 - encoded.length % 4)), 
                resolve(encoded);
            }, reader.onerror = error => reject(error);
        });
    }
}

class QuBotActions {
    constructor(bot) {
        this.bot = bot;
    }
    type() {}
    async init(params) {}
    async setBot(conf) {}
    async lastState(params) {}
    async runState(params) {}
    async userAction(params) {}
    async runAction(params) {}
    async ping(params) {}
    save() {}
}

class QuBotDebug {
    constructor() {
        this.debugInfo = "", this.changedSlots = {};
    }
    create(state) {
        var close;
        document.getElementById("qubot-debug") || (this.debugWindow = this.div(document.body, "qubot-debug"), 
        this.debugWindow.id = "qubot-debug", this.debugHeader = this.div(this.debugWindow, "qubot-header"), 
        this.debugHeader.onmousedown = this.mousedownDebug.bind(this), (close = this.div(this.debugHeader, "qubot-close-button", "span")).innerHTML = "&times;", 
        close.setAttribute("onclick", "this.parentNode.parentNode.remove()"), this.debugState = this.div(this.debugHeader, null, "span"), 
        this.debugState.innerHTML = state, close = this.div(this.debugWindow, "qubot-content"), 
        this.debugSlots = this.div(close, "qubot-slots"), this.debugDebug = this.div(close, "qubot-c-debug"), 
        this.clear());
    }
    is() {
        return !!document.getElementById("qubot-debug");
    }
    clear() {
        this.debugInfo = "", this.changedSlots = {}, this.debugState && (this.debugState.innerHTML = ""), 
        this.debugDebug && (this.debugDebug.innerHTML = ""), this.debugSlots && (this.debugSlots.innerHTML = "");
    }
    add(info) {
        this.debugInfo += info;
    }
    addChangedSlot(slot) {
        this.changedSlots[slot] = 1;
    }
    show(state, slots) {
        if (document.getElementById("qubot-debug")) {
            this.debugState.innerHTML = state;
            let res = "<table>";
            for (var slot in slots) {
                var val = slots[slot] ? JSON.stringify(slots[slot]) : null;
                slot in this.changedSlots ? res += `<tr><td>${slot}</td><td class="qubot-red"><pre>${this.JSONstringify(JSON.parse(val))}</pre></td></tr>` : res += `<tr><td>${slot}</td><td>${val}</td></tr>`;
            }
            res += "</table>", this.debugSlots.innerHTML = res, this.debugDebug.innerHTML = "<pre>" + this.debugInfo + "</pre>";
        }
    }
    mousedownDebug(e) {
        e.stopPropagation(), this.mousePosX = e.clientX, this.mousePosY = e.clientY, 
        this.debugWindow.style.left = this.debugWindow.offsetLeft + "px", this.debugWindow.style.top = this.debugWindow.offsetTop + "px", 
        document.onmouseup = this.mouseupDebug.bind(this), document.onmousemove = this.mousemoveDebug.bind(this);
    }
    mousemoveDebug(e) {
        e.stopPropagation();
        var dX = this.mousePosX - e.clientX, dY = this.mousePosY - e.clientY;
        0 < this.debugWindow.offsetLeft - dX && (this.mousePosX = e.clientX, this.debugWindow.style.left = this.debugWindow.offsetLeft - dX + "px"), 
        0 < this.debugWindow.offsetTop - dY && (this.mousePosY = e.clientY, this.debugWindow.style.top = this.debugWindow.offsetTop - dY + "px");
    }
    mouseupDebug(e) {
        e.stopPropagation(), document.onmouseup = null, document.onmousemove = null;
    }
    div(parent, className, element = "div") {
        element = document.createElement(element);
        return null !== className && (element.className = className), null !== parent && parent.append(element), 
        element;
    }
    JSONstringify(json) {
        var arr = [];
        return json = (json = "string" != typeof json ? JSON.stringify(json, void 0, "\t") : json).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
            return match;
        }), arr.unshift(json), arr;
    }
}

class QuBotStyle {
    static default = {
        botID: "hello",
        setup_pos: "rb",
        setup_pos_x: "50",
        setup_pos_y: "50",
        setup_logo_id: "0",
        setup_agent_id: "1",
        setup_human_id: "6",
        "text-sender-name": "Qu",
        "text-bot-name": "QuBot",
        "text-info": "We are always in touch with you",
        "icon-logo1": 'url("icons/logo01a.png")',
        "icon-logo2": 'url("icons/logo01b.png")',
        "icon-agent": 'url("icons/logo01a.png")',
        "icon-human": 'url("icons/robot09.png")',
        "icon-close": "url(svg/close.svg)",
        "icon-send": "url(svg/send.svg)",
        width: "400px",
        height: "600px",
        left: "none",
        right: "50px",
        top: "none",
        bottom: "50px",
        "shadow-size": "10px",
        "shadow-blur": "20px",
        "shadow-color": "#646464b2",
        "header-background": "#ffffff",
        "header-line-width": "1px",
        "header-line-color": "#ffffff",
        "header-color": "#0000ff",
        "header-font-size": "18px",
        "header-font-line": "18px",
        "header-info-color": "#0000ff",
        "header-info-size": "12px",
        "header-info-line": "12px",
        "header-shadow-size": "5px",
        "header-shadow-blur": "20px",
        "header-shadow-color": "#646464b2",
        "top-radius": "20px",
        "body-background": "#ffffff",
        "body-line-color": "#ffffff",
        "body-line-width": "1px",
        "body-backround-image": "none",
        "body-time-size": "10px",
        "body-time-color": "#000000",
        "mes-shadow-size": "0px",
        "mes-shadow-blur": "0px",
        "mes-shadow-color": "#646464b2",
        "mes-radius": "20px",
        "mes-padding": "10px",
        "footer-background": "#ffffff",
        "footer-line-width": "1px",
        "footer-line-color": "#ffffff",
        "footer-shadow-size": "3px",
        "footer-shadow-blur": "15px",
        "footer-shadow-color": "#646464b2",
        "footer-height": "30px",
        "bottom-radius": "20px",
        "input-background": "#ffffff",
        "input-font-color": "#000000",
        "input-font-size": "16px",
        "input-radius": "100px",
        "input-height": "30px",
        "input-margin-x": "5px",
        "input-margin-y": "5px",
        "input-line-width": "1px",
        "input-line-color": "#000000",
        "answer-background": "#0079fe",
        "answer-line-color": "#0079fe",
        "answer-line-size": "1px",
        "answer-color": "#ffffff",
        "answer-font-size": "18px",
        "answer-font-line": "20px",
        "icon-human-size": "30px",
        "message-background": "#f7f7f7",
        "message-line-color": "#212529",
        "message-line-width": "1px",
        "message-color": "#212529",
        "message-font-size": "18px",
        "message-font-line": "20px",
        "sender-color": "#0000ff",
        "sender-font-size": "13px",
        "sender-font-line": "15px",
        "icon-agent-size": "30px",
        "open-radius": "70px",
        "open-radius-img": "70px",
        "button-background1": "#ffffff",
        "button-background2": "#f0f0f0",
        "button-background3": "#a0a0a0",
        "button-line-color": "#212529",
        "button-line-width": "1px",
        "button-radius": "20px",
        "button-height": "30px",
        "button-color": "#212529",
        "button-font-size": "18px",
        "button-font-line": "20px",
        "button-margin": "3px",
        "icon-human-display": "block",
        "icon-agent-display": "block",
        "open-line": "0px",
        "open-color": "black",
        "close-color1": "#00aaff",
        "close-color2": "#00ccff",
        "send-color1": "#00aaff",
        "send-color2": "#00ccff"
    };
}

class QuBotEvents {
    constructor(env) {
        this.enable = !1, this.env = env, this.bid = null, this.uid = null, this.lid = 1, 
        this.delay = 1e5, this.events = [];
    }
    init(enable, bid, uid) {
        this.send(), this.enable = enable, this.bid = bid, this.uid = uid, localStorage ? (enable = localStorage.getItem("qubotLID." + this.bid), 
        this.lid = enable ? parseInt(enable) : 0) : this.lid = 0, this.bid && this.uid || (this.enable = !1), 
        this.enable && setTimeout(this.timer.bind(this), this.delay);
    }
    push(name, target = !1, params = null) {
        this.enable && (name = {
            name: name,
            time: new Date().getTime(),
            uid: this.uid,
            bid: this.bid,
            cid: this.env.cid,
            lid: this.lid
        }, params && (name.params = params), target && (name.target = target), this.lid++, 
        this.events.push(name));
    }
    addUsersEvent() {
        this.enable && this.env.sendAnalytics({
            request: "addUsers",
            users: [ {
                time: new Date().getTime(),
                uid: this.uid,
                bid: this.bid,
                cid: this.env.cid
            } ]
        });
    }
    clear() {
        this.events = [];
    }
    timer() {
        this.send(), setTimeout(this.timer.bind(this), this.delay);
    }
    send() {
        this.enable && this.events.length && (localStorage && localStorage.setItem("qubotLID." + this.bid, this.lid), 
        this.env.sendAnalytics({
            request: "addEvents",
            events: this.events
        }), this.events = []);
    }
}

var QSNodeKind = {
    ADD: "add",
    AND: "and",
    ARGUMENTS: "arguments",
    ARRAY: "array",
    ARRAY_ACCESSOR: "arr-acc",
    AS: "as",
    AS_DOC: "as-doc",
    ASSIGN: "assign",
    B_AND: "b-and",
    B_NOT: "b-not",
    B_OR: "b-or",
    B_XOR: "b-xor",
    BLOCK: "block",
    BREAK: "break",
    BUTTON: "button",
    CALL: "call",
    CASE: "case",
    CASES: "cases",
    CATCH: "catch",
    CLASS: "class",
    COMPILATION_UNIT: "compilation-unit",
    COND: "cond",
    CONDITION: "condition",
    CONDITIONAL: "conditional",
    CONCAT: "concat",
    CONST: "const",
    CONST_LIST: "const-list",
    CONTENT: "content",
    CONTINUE: "continue",
    DEFAULT: "default",
    DEFAULT_XML_NAMESPACE: "default-xml-namespace",
    DELETE: "delete",
    DO: "do",
    DOT: "dot",
    DIVISION: "div",
    E4X_FILTER: "e4x-filter",
    ENCAPSULATED: "encapsulated",
    EQUALITY: "equality",
    EXPR_LIST: "expr-list",
    EXTENDS: "extends",
    FINALLY: "finally",
    FOR: "for",
    FOREACH: "foreach",
    FORIN: "forin",
    FUNCTION: "function",
    GET: "get",
    IF: "if",
    IMPLEMENTS: "implements",
    IMPLEMENTS_LIST: "implements-list",
    IMPORT: "import",
    IN: "in",
    INCLUDE: "include",
    INIT: "init",
    INTERFACE: "interface",
    ITER: "iter",
    LOCAL: "local",
    LAMBDA: "lambda",
    LEFT_CURLY_BRACKET: "{",
    META: "meta",
    META_LIST: "meta-list",
    MINUS: "minus",
    MOD_LIST: "mod-list",
    MODIFIER: "mod",
    MODULO: "modulo",
    MULTI_LINE_COMMENT: "multi-line-comment",
    MULTIPLICATION: "mul",
    NAME: "name",
    NAME_TYPE_INIT: "name-type-init",
    NEW: "new",
    NON_EQUAL: "non-equal",
    NOT: "not",
    OBJECT: "object",
    OP: "op",
    OR: "or",
    PACKAGE: "package",
    PARAMETER: "parameter",
    PARAMETER_LIST: "parameter-list",
    PLUS: "plus",
    POST_DEC: "post-dec",
    POST_INC: "post-inc",
    PRE_DEC: "pre-dec",
    PRE_INC: "pre-inc",
    PROP: "prop",
    RELATION: "relation",
    REST: "rest",
    RETURN: "return",
    THROW: "throw",
    SET: "set",
    SHIFT: "shift",
    STAR: "star",
    STMT_EMPTY: "stmt-empty",
    SWITCH: "switch",
    SWITCH_BLOCK: "switch-block",
    TRY: "try",
    TYPE: "type",
    TYPEOF: "typeof",
    USE: "use",
    VALUE: "value",
    VAR: "var",
    VAR_LIST: "var-list",
    VECTOR: "vector",
    SHORT_VECTOR: "short_vector",
    VOID: "void",
    WHILE: "while",
    WITH: "with",
    XML_LITERAL: "xml_literal",
    XML_LIST_LITERAL: "xml_list_literal",
    REGEXP_LITERAL: "regexp_literal",
    LITERAL: "literal",
    IDENTIFIER: "identifier"
}, QSKeyWords = {
    AS: "as",
    BREAK: "break",
    BUTTON: "button",
    CASE: "case",
    CATCH: "catch",
    CLASS: "class",
    CONST: "const",
    CONTINUE: "continue",
    DEFAULT: "default",
    DELETE: "delete",
    DO: "do",
    DYNAMIC: "dynamic",
    EACH: "each",
    ELSE: "else",
    EOF: "__END__",
    EXTENDS: "extends",
    FINAL: "final",
    FINALLY: "finally",
    FOR: "for",
    FUNCTION: "def",
    GET: "get",
    IF: "if",
    IMPLEMENTS: "implements",
    IMPORT: "import",
    IN: "in",
    OF: "of",
    INCLUDE: "include",
    INSTANCE_OF: "instanceof",
    INTERFACE: "interface",
    INTERNAL: "internal",
    INTRINSIC: "intrinsic",
    IS: "is",
    LOCAL: "local",
    NAMESPACE: "namespace",
    NEW: "new",
    OVERRIDE: "override",
    PACKAGE: "package",
    PRIVATE: "private",
    PROTECTED: "protected",
    PUBLIC: "public",
    VIRTUAL: "virtual",
    RETURN: "return",
    THROW: "throw",
    SET: "set",
    STATIC: "static",
    SUPER: "super",
    SWITCH: "switch",
    TRY: "try",
    TYPEOF: "typeof",
    USE: "use",
    VAR: "var",
    VOID: "void",
    WHILE: "while",
    WITH: "with",
    TRUE: "true",
    FALSE: "false",
    NULL: "null",
    NONE: "none",
    THIS: "this"
};

class QSToken {
    constructor(text, index, isNumeric = !1) {
        this.text = text, this.index = index, this.isNumeric = isNumeric;
    }
    get end() {
        return this.index + this.text.length;
    }
}

class QSScanner {
    static END = "__END__";
    static REGEXP_IDENTIFIER = /[A-Za-zА-ЯЁа-яё0-9_§]/;
    constructor() {
        this.content = "";
    }
    setContent(content) {
        this.content = content, this.index = -1;
    }
    get length() {
        return this.content ? this.content.length : 0;
    }
    static isHexChar(currentCharacter) {
        return "0" <= currentCharacter && currentCharacter <= "9" || "A" <= currentCharacter && currentCharacter <= "Z" || "a" <= currentCharacter && currentCharacter <= "z";
    }
    nextToken() {
        let currentCharacter, nextCharacter;
        if (!(null != this.content && this.index < this.content.length)) return new QSToken(QSScanner.END, this.index);
        currentCharacter = this.nextNonWhitespaceCharacter();
        var currentIndex = this.index;
        return nextCharacter = this.nextChar(), this.index = currentIndex, "\n" === currentCharacter ? new QSToken("\n", this.index) : "/" === currentCharacter || "#" === currentCharacter ? this.scanCommentRegExpOrOperator() : '"' === currentCharacter || "'" === currentCharacter || "`" === currentCharacter ? this.scanString(currentCharacter) : "0" <= currentCharacter && currentCharacter <= "9" || "." === currentCharacter ? this.scanNumberOrDots(currentCharacter) : "$" === currentCharacter || "{" === currentCharacter || "}" === currentCharacter || "(" === currentCharacter || ")" === currentCharacter || "[" === currentCharacter || "]" === currentCharacter || ";" === currentCharacter || "," === currentCharacter || "?" === currentCharacter || "~" === currentCharacter ? this.scanSingleCharacterToken(currentCharacter) : ":" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "::" ]) : "@" === currentCharacter && "*" === nextCharacter ? this.scanCharacterSequence(currentCharacter, [ "@*" ]) : "*" === currentCharacter ? ":" !== this.getPreviousCharacter() ? this.scanCharacterSequence(currentCharacter, [ "*=" ]) : new QSToken("*", this.index) : "+" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "++", "+=" ]) : "-" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "--", "-=" ]) : "%" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "%=" ]) : "&" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "&&", "&=", "&&=" ]) : "|" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "||", "|=", "||=" ]) : "^" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "^=" ]) : ">" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ ">>>=", ">>>", ">>=", ">>", ">=" ]) : "<" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "<<<=", "<<<", "<<=", "<<", "<=" ]) : "=" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "===", "==" ]) : "!" === currentCharacter ? this.scanCharacterSequence(currentCharacter, [ "!==", "!=" ]) : 0 === (currentIndex = this.scanWord(currentCharacter)).text.length ? this.nextToken() : currentIndex;
    }
    nextStrToken() {
        let currentCharacter;
        if (!(null != this.content && this.index < this.content.length - 1)) return new QSToken(QSScanner.END, this.index);
        if (currentCharacter = this.nextNonWhitespaceCharacter(), !QSScanner.isIdentifierCharacter(currentCharacter)) return this.scanSingleCharacterToken(currentCharacter);
        let buffer = "", peekPos = (buffer += currentCharacter, 1);
        for (;;) {
            if (!(currentCharacter = this.peekChar(peekPos))) break;
            if (!QSScanner.isIdentifierCharacter(currentCharacter)) break;
            peekPos += 1, buffer += currentCharacter;
        }
        var result = new QSToken(buffer, this.index);
        return this.skipChars(buffer.length - 1), result;
    }
    scanRegExp() {
        var currentIndex = this.index, token = this.scanUntilDelimiter(!1, "/");
        let peekPos = 1, flagBuffer = "";
        for (;;) {
            var currentCharacter = this.peekChar(peekPos++);
            if (!/[a-z]/.test(currentCharacter)) break;
            flagBuffer += currentCharacter;
        }
        return flagBuffer.length && (null != token && (token.text += flagBuffer), 
        this.index += flagBuffer.length), null != token && QSScanner.isValidRegExp(token.text) ? token : (this.index = currentIndex, 
        null);
    }
    getCheckPoint() {
        return {
            index: this.index
        };
    }
    rewind(checkpoint) {
        this.index = checkpoint.index;
    }
    nextCharIs(char, skip) {
        skip = skip || [];
        let i = this.index;
        for (var len = this.content.length; ++i < len; ) {
            var ch = this.content[i] || "";
            if (ch === char) return !0;
            if (!(0 <= skip.indexOf(ch))) break;
        }
        return !1;
    }
    contentByRange(from, to) {
        return this.content.substring(from, to);
    }
    computePossibleMatchesMaxLength(possibleMatches) {
        return possibleMatches.reduce((max, possibleMatch) => Math.max(max, possibleMatch.length), 0);
    }
    getPreviousCharacter() {
        let currentIndex = -1, currentChar;
        for (;" " == (currentChar = this.peekChar(currentIndex--)) || " " == currentChar; );
        return currentChar;
    }
    static isIdentifierCharacter(currentCharacter) {
        return QSScanner.REGEXP_IDENTIFIER.test(currentCharacter);
    }
    tryFixNullToken() {
        var ch = this.content[this.index];
        return "'" == ch || '"' == ch ? new QSToken(ch, this.index) : null;
    }
    subContentAtIndex(left, right) {
        return this.content.substring(this.index - left, this.index + right);
    }
    static isProcessingInstruction(text) {
        return "<" === text[0] && "?" === text[1];
    }
    static isValidRegExp(pattern) {
        try {
            return eval(QSScanner.toJSRegExp(pattern)) instanceof RegExp;
        } catch (e) {
            return !1;
        }
    }
    static toJSRegExp(pattern) {
        var flags, end = pattern.lastIndexOf("/");
        return pattern = 0 < end ? (pattern = (pattern = -1 < (flags = pattern.substr(end)).indexOf("x") ? pattern.substr(0, end) + flags.replace("x", "") : pattern).replace(/\(\?P</g, "(<")).replace(/\u2028/g, " ").replace(/\u2029/g, " ") : pattern;
    }
    nextChar(ignoreBOM) {
        this.index++;
        let currentChar = this.content[this.index] || "";
        if (!ignoreBOM) for (;"\ufeff" == currentChar; ) this.index++, currentChar = this.content[this.index] || "";
        return currentChar;
    }
    nextNonWhitespaceCharacter() {
        let result;
        for (;(result = this.nextChar()) && (" " == result || " " == result || "\t" == result || 13 == result.charCodeAt(0)); );
        return result;
    }
    peekChar(offset) {
        offset = this.index + offset;
        return -1 == offset ? "\0" : this.content[offset] || "";
    }
    peekChars(offset, length) {
        offset = this.index + offset;
        return -1 == offset ? "\0" : this.content.substr(offset, length);
    }
    scanCharacterSequence(currentCharacter, possibleMatches) {
        let peekPos = 1, buffer = "";
        var maxLength = this.computePossibleMatchesMaxLength(possibleMatches);
        let found = (buffer += currentCharacter).toString();
        for (;peekPos < maxLength; ) {
            buffer += this.peekChar(peekPos), peekPos++;
            for (let i = 0; i < possibleMatches.length; i++) {
                var possibleMatche = possibleMatches[i];
                buffer.toString() === possibleMatche && (found = buffer.toString());
            }
        }
        currentCharacter = new QSToken(found, this.index);
        return this.skipChars(found.length - 1), currentCharacter;
    }
    scanCommentRegExpOrOperator() {
        var prevCharacter = this.peekChar(0), firstCharacter = this.peekChar(1);
        if ("#" == prevCharacter) return this.scanSingleLineComment();
        if ("/" == firstCharacter) return this.scanSingleLineComment();
        if ("*" == firstCharacter) return this.scanMultiLineComment();
        let result;
        return "=" == firstCharacter ? (result = new QSToken("/=", this.index), 
        this.skipChars(1)) : result = new QSToken("/", this.index), result;
    }
    scanDecimal(currentCharacter) {
        let currentChar = currentCharacter, buffer = "", peekPos = 1;
        for (;QSScanner.isDecimalChar(currentChar); ) buffer += currentChar, currentChar = this.peekChar(peekPos++);
        if ("." == currentChar) for (buffer += currentChar, currentChar = this.peekChar(peekPos++); QSScanner.isDecimalChar(currentChar); ) buffer += currentChar, 
        currentChar = this.peekChar(peekPos++);
        if ("E" == currentChar || "e" == currentChar) for (buffer += currentChar, 
        "-" == (currentChar = this.peekChar(peekPos++)) && (buffer += currentChar, 
        currentChar = this.peekChar(peekPos++)); QSScanner.isDecimalChar(currentChar); ) buffer += currentChar, 
        currentChar = this.peekChar(peekPos++);
        currentCharacter = new QSToken(buffer.toString(), this.index, !0);
        return this.skipChars(currentCharacter.text.length - 1), currentCharacter;
    }
    scanDots() {
        var text, result;
        return "." == this.peekChar(1) ? (text = "." == this.peekChar(2) ? "..." : "..", 
        result = new QSToken(text, this.index), this.skipChars(text.length - 1), 
        result) : null;
    }
    scanHex() {
        let buffer = "0x", peekPos = 2;
        for (;;) {
            var character = this.peekChar(peekPos++);
            if (!QSScanner.isHexChar(character)) break;
            buffer += character;
        }
        var result = new QSToken(buffer, this.index, !0);
        return this.skipChars(result.text.length - 1), result;
    }
    scanMultiLineComment() {
        let buffer = "", currentCharacter = " ";
        var previousCharacter;
        for (buffer += "/*", this.skipChar(); previousCharacter = currentCharacter, 
        currentCharacter = this.nextChar(), buffer += currentCharacter, currentCharacter && ("/" !== currentCharacter || "*" != previousCharacter); );
        return new QSToken(buffer.toString(), this.index + 1);
    }
    scanNumberOrDots(characterToBeScanned) {
        if ("." == characterToBeScanned) {
            var result = this.scanDots();
            if (null != result) return result;
            result = this.peekChar(1);
            if (!QSScanner.isDecimalChar(result)) return new QSToken(".", this.index);
        }
        if ("0" == characterToBeScanned) {
            let firstCharacter = this.peekChar(1);
            if ("x" == firstCharacter || "X" == firstCharacter) return this.scanHex();
        }
        return this.scanDecimal(characterToBeScanned);
    }
    scanSingleCharacterToken(character) {
        return new QSToken(character, this.index);
    }
    scanSingleLineComment() {
        let char, buffer = this.content[this.index];
        for (;char = this.nextChar(), buffer += char, "\n" !== char && "\r" !== char && this.index < this.content.length - 1; );
        return new QSToken(buffer.toString(), this.index);
    }
    scanString(startingCharacter) {
        return this.scanUntilDelimiter("`" === startingCharacter, startingCharacter);
    }
    scanUntilDelimiter(multiline, start, delimiter) {
        void 0 === delimiter && (delimiter = start);
        let buffer = "", peekPos = 1, numberOfBackslashes = 0;
        for (buffer += start; ;) {
            var result, currentCharacter = this.peekChar(peekPos++);
            if (!multiline && "\n" === currentCharacter || this.index + peekPos >= this.content.length) return null;
            if (buffer += currentCharacter, (1 === delimiter.length ? currentCharacter : this.peekChars(peekPos - delimiter.length, delimiter.length)) === delimiter && 0 == numberOfBackslashes) return result = new QSToken(buffer, this.index), 
            this.skipChars(buffer.toString().length - 1, !0), result;
            numberOfBackslashes = "\\" === currentCharacter ? (numberOfBackslashes + 1) % 2 : 0;
        }
    }
    scanWord(startingCharacter) {
        var currentChar;
        let buffer = "", peekPos = (buffer += startingCharacter, 1);
        for (;currentChar = this.peekChar(peekPos++), QSScanner.isIdentifierCharacter(currentChar); ) buffer += currentChar;
        startingCharacter = new QSToken(buffer, this.index);
        return this.skipChars(buffer.length - 1), startingCharacter;
    }
    scanOperator(startingCharacter) {
        return this.scanCharacterSequence(startingCharacter, [ "<<<=", "<<<", "<<=", "<<", "<=" ]);
    }
    skipChar() {
        this.nextChar();
    }
    skipChars(count, ignoreBOM) {
        for (;0 < count--; ) this.nextChar(ignoreBOM);
    }
    static isDecimalChar(currentCharacter) {
        return "0" <= currentCharacter && currentCharacter <= "9";
    }
    static endsWith(string, suffix) {
        return -1 !== string.indexOf(suffix, string.length - suffix.length);
    }
}

var QSOperators = {
    LOGICAL_NOT: "not",
    AND: "and",
    LOGICAL_AND_ASSIGNMENT: "&&=",
    AND_EQUAL: "&=",
    AT: "@",
    B_AND: "&",
    B_OR: "|",
    B_XOR: "^",
    COLUMN: ":",
    COMMA: ",",
    DECREMENT: "--",
    DIVIDED_EQUAL: "/=",
    DOT: ".",
    DESCENDANT_ACCESSOR: "..",
    DOUBLE_COLUMN: "::",
    DOUBLE_EQUAL: "==",
    DOUBLE_QUOTE: '"',
    DOUBLE_SHIFT_LEFT: "<<",
    DOUBLE_SHIFT_RIGHT: ">>",
    DOUBLE_SHIFT_LEFT_AND_ASSIGNMENT: "<<=",
    DOUBLE_SHIFT_RIGHT_AND_ASSIGNMENT: ">>=",
    EQUAL: "=",
    INCREMENT: "++",
    INFERIOR: "<",
    INFERIOR_OR_EQUAL: "<=",
    LEFT_CURLY_BRACKET: "{",
    LEFT_PARENTHESIS: "(",
    LEFT_SQUARE_BRACKET: "[",
    LOGICAL_OR: "or",
    LOGICAL_OR_ASSIGNMENT: "||=",
    MINUS: "-",
    MINUS_EQUAL: "-=",
    MODULO: "%",
    MODULO_EQUAL: "%=",
    NON_EQUAL: "!=",
    NON_STRICTLY_EQUAL: "!==",
    IN: "in",
    OR_EQUAL: "|=",
    PLUS: "+",
    PLUS_EQUAL: "+=",
    QUESTION_MARK: "?",
    REST_PARAMETERS: "...",
    RIGHT_CURLY_BRACKET: "}",
    RIGHT_PARENTHESIS: ")",
    RIGHT_SQUARE_BRACKET: "]",
    SEMI_COLUMN: ";",
    SIMPLE_QUOTE: "'",
    BACKTRICK: "`",
    SLASH: "/",
    STRICTLY_EQUAL: "===",
    SUPERIOR: ">",
    SUPERIOR_OR_EQUAL: ">=",
    TIMES: "*",
    TIMES_EQUAL: "*=",
    POWER: "**",
    TRIPLE_SHIFT_LEFT: "<<<",
    TRIPLE_SHIFT_RIGHT: ">>>",
    TRIPLE_SHIFT_LEFT_AND_ASSIGNMENT: "<<<=",
    TRIPLE_SHIFT_RIGHT_AND_ASSIGNMENT: ">>>=",
    VECTOR_START: ".<",
    XOR_EQUAL: "^=",
    EQUAL_MORE: "=>"
};

class QSNode {
    constructor(kind, start, end, text, children, parent, label) {
        this.kind = kind, this.start = start, this.end = end, this.text = text, 
        this.children = children, this.parent = parent, this.label = label, this.children || (this.children = []);
    }
    get nameText() {
        return this.findChild(QSNodeKind.NAME) ? QSNode.text : null;
    }
    get isThisDot() {
        let parent = this.parent;
        for (;parent && (parent.kind == QSNodeKind.DOT || parent.kind == QSNodeKind.CALL); ) parent = parent.parent;
        return !(!parent || parent.kind != QSNodeKind.DOT) && parent.firstChild.findChildren(QSNodeKind.IDENTIFIER).some(n => n.text == QSKeyWords.THIS);
    }
    get isCall() {
        let parent = this.parent;
        if (parent.kind == QSNodeKind.CALL) return !0;
        for (;parent && (parent.findParent(QSNodeKind.DOT) || parent.findParent(QSNodeKind.ARRAY_ACCESSOR) || parent.findParent(QSNodeKind.ENCAPSULATED)); ) parent = parent.parent;
        return parent.kind == QSNodeKind.CALL;
    }
    get isNew() {
        let parent = this.parent;
        for (;parent.kind == QSNodeKind.DOT || parent.kind == QSNodeKind.CALL || parent.kind == QSNodeKind.ARRAY_ACCESSOR; ) parent = parent.parent;
        return parent.kind == QSNodeKind.NEW;
    }
    get isStatic() {
        var modList = this.findChild(QSNodeKind.MOD_LIST);
        return Boolean(modList && 0 < modList.children.filter(n => !!n && "static" == n.text).length);
    }
    get isOverride() {
        var modList = this.findChild(QSNodeKind.MOD_LIST);
        return Boolean(modList && 0 < modList.children.filter(n => !!n && "override" == n.text).length);
    }
    get isVoid() {
        return Boolean(this.kind == QSNodeKind.VOID || this.kind == QSNodeKind.LITERAL && "undefined" == this.text);
    }
    get isVoidOrNull() {
        return Boolean(this.kind == QSNodeKind.VOID || this.kind == QSNodeKind.LITERAL && ("null" == this.text || "undefined" == this.text));
    }
    get isAtClass() {
        var parent = this.parent;
        return null != parent && parent.kind == QSNodeKind.CLASS;
    }
    get isAtPackage() {
        var parent = this.parent;
        return null != parent && parent.kind == QSNodeKind.PACKAGE;
    }
    get isAtCompilationUnit() {
        var parent = this.parent;
        return null != parent && parent.kind == QSNodeKind.COMPILATION_UNIT;
    }
    get simpleType() {
        if (this.kind == QSNodeKind.LITERAL) {
            var thisText = this.text || "";
            if ("null" == thisText || "undefined" == thisText) return thisText;
            if ("true" == thisText || "false" == thisText) return "Boolean";
            var char0 = thisText.charAt(0);
            if ('"' == char0 || "'" == char0) return "String";
            var numStarts = /^[0-9]/.test(thisText);
            if ((numStarts || /0x[0-9a-f]/gi.test(thisText)) && thisText.indexOf(".") < 0) {
                let type = "int";
                var i = parseInt(thisText);
                return 2147483647 <= i && (type = "uint"), type = 4294967295 <= i ? "Number" : type;
            }
            if (numStarts || "." === char0 || "NaN" == thisText || "Infinity" == thisText) return "Number";
        }
        return null;
    }
    get simpleText() {
        var text;
        return "String" == this.simpleType ? (text = this.text.trim()).substring(1, text.length - 1) : this.text;
    }
    findParent(type) {
        let p = this.parent;
        for (;p; ) {
            if (p.kind === type) return p;
            p = p.parent;
        }
        return null;
    }
    findParents(type) {
        var list = [];
        let p = this.parent;
        for (;p; ) p.kind === type && list.push(p), p = p.parent;
        return list;
    }
    contains(node) {
        if (node === this || -1 < this.childIndex(node)) return !0;
        for (let i = 0; i < this.children.length; i++) if (this.children[i].contains(node)) return !0;
        return !1;
    }
    findChild(type, recursive) {
        var nodeStack = QSNode.nodeStack;
        let nodeStackSize = 0, nodeStackSizeMax = 0;
        var currentNode, children = this.children;
        for (let i = children.length - 1; 0 <= i; --i) {
            var child = children[i];
            child && (nodeStack[nodeStackSize++] = child);
        }
        for (nodeStackSize > nodeStackSizeMax && (nodeStackSizeMax = nodeStackSize); 0 < nodeStackSize; ) {
            if (currentNode = nodeStack[--nodeStackSize], !type || currentNode.kind === type) {
                for (;0 < nodeStackSizeMax; ) nodeStack[--nodeStackSizeMax] = null;
                return currentNode;
            }
            if (recursive) {
                let children = currentNode.children;
                for (let i = children.length - 1; 0 <= i; --i) {
                    let child = children[i];
                    child && (nodeStack[nodeStackSize++] = child);
                }
                nodeStackSize > nodeStackSizeMax && (nodeStackSizeMax = nodeStackSize);
            }
        }
        for (;0 < nodeStackSizeMax; ) nodeStack[--nodeStackSizeMax] = null;
        return null;
    }
    findChildren(type, recursive) {
        var result = [], nodeStack = QSNode.nodeStack;
        let nodeStackSize = 0, nodeStackSizeMax = 0;
        var currentNode, children = this.children;
        for (let i = children.length - 1; 0 <= i; --i) {
            var child = children[i];
            child && (nodeStack[nodeStackSize++] = child);
        }
        for (nodeStackSize > nodeStackSizeMax && (nodeStackSizeMax = nodeStackSize); 0 < nodeStackSize; ) if (currentNode = nodeStack[--nodeStackSize], 
        type && currentNode.kind !== type || (result[result.length] = currentNode), 
        recursive) {
            let children = currentNode.children;
            for (let i = children.length - 1; 0 <= i; --i) {
                let child = children[i];
                child && (nodeStack[nodeStackSize++] = child);
            }
            nodeStackSize > nodeStackSizeMax && (nodeStackSizeMax = nodeStackSize);
        }
        for (;0 < nodeStackSizeMax; ) nodeStack[--nodeStackSizeMax] = null;
        return result;
    }
    findChildrenWithMods(kind, mods, lookAtTheContent) {
        if (lookAtTheContent && this.kind !== QSNodeKind.CONTENT && this.findChild(QSNodeKind.CONTENT, !0) && 0, 
        !mods) return QSNode.findChildren(kind);
        var result = [], children = QSNode.findChildren(kind);
        for (let i = 0; i < children.length; ++i) {
            var n = children[i], modList = n.findChildren(QSNodeKind.MOD_LIST), modsStr = [];
            for (let j = 0; j < modList.length; ++j) {
                var modifiers = modList[j].findChildren(QSNodeKind.MODIFIER);
                for (let h = 0; h < modifiers.length; ++h) {
                    var m = modifiers[h];
                    modsStr[modsStr.length] = m.text;
                }
            }
            let len = mods.length, c = 0;
            for (let i = 0; i < len; ++i) {
                var md = mods[i];
                "!" === md[0] ? -1 == modsStr.indexOf(md.substr(1)) && c++ : 0 <= modsStr.indexOf(md) && c++;
            }
            c == len && (result[result.length] = n);
        }
        return result;
    }
    findChildText(type, recursive) {
        return this.findChild(type, recursive) ? QSNode.text : null;
    }
    getChildrenUntil(type) {
        var type = this.findChild(type), children = this.children;
        return type ? (type = children.indexOf(type), children.slice(0, type)) : children.splice(0);
    }
    getChildAfterNode(node, kind, text) {
        node = this.childIndex(node);
        if (-1 != node) {
            var children = this.children;
            for (let i = node + 1; i < children.length; i++) {
                var child = children[i];
                if (child) {
                    var childKind = child.kind;
                    if (childKind !== QSNodeKind.AS_DOC && childKind !== QSNodeKind.MULTI_LINE_COMMENT && (!kind || childKind === kind)) {
                        if (!text) return child;
                        if (child.text === text) return child;
                        break;
                    }
                }
            }
        }
        return null;
    }
    getChildrenAfterType(type) {
        var type = this.findChild(type), children = this.children;
        return type ? (type = children.indexOf(type), children.slice(type + 1)) : children.slice(0);
    }
    childIndex(node) {
        return this.children.indexOf(node);
    }
    get root() {
        let p = this;
        for (;p.parent; ) p = p.parent;
        return p;
    }
    get firstChild() {
        var children = this.children;
        for (let i = 0; i < children.length; ++i) {
            var child = children[i];
            if (null != child) return child;
        }
        return null;
    }
    get lastChild() {
        var children = this.children;
        for (let i = children.length - 1; 0 <= i; --i) {
            var child = children[i];
            if (null != child) return child;
        }
        return this;
    }
    get secondChild() {
        let count = 0;
        var children = this.children;
        for (let i = 0; i < children.length; ++i) {
            var child = children[i];
            if (null != child && 1 < ++count) return child;
        }
        return null;
    }
    get thirdChild() {
        let count = 0;
        var children = this.children;
        for (let i = 0; i < children.length; ++i) {
            var child = children[i];
            if (null != child && 2 < ++count) return child;
        }
        return null;
    }
    get firstEntryRecursive() {
        var firstChild;
        return this.kind == QSNodeKind.IDENTIFIER || this.kind == QSNodeKind.LITERAL ? this : (firstChild = this.firstChild) ? firstChild.firstEntryRecursive : null;
    }
    get lastEntryRecursive() {
        var lastChild;
        return this.kind == QSNodeKind.IDENTIFIER || this.kind == QSNodeKind.LITERAL ? this : (lastChild = this.lastChild) != this ? lastChild.lastEntryRecursive : null;
    }
    static findCommonParent(object1, object2) {
        let currentObject = object1;
        for (;currentObject; ) currentObject = (QSNode.tempArray[QSNode.tempArray.length] = currentObject).parent;
        for (currentObject = object2; currentObject && -1 == QSNode.tempArray.indexOf(currentObject); ) currentObject = currentObject.parent;
        return QSNode.tempArray.length = 0, currentObject;
    }
    static transformAST(node, parentNode) {
        var parentNode = new QSNode(QSNode.kind, QSNode.start, QSNode.end, QSNode.text, [], parentNode, QSNode.label), nodeStack = QSNode.nodeStack;
        let nodeStackSize = 0, nodeStackSizeMax = 0;
        for (nodeStack[nodeStackSize++] = node, nodeStack[nodeStackSize++] = parentNode, 
        nodeStackSize > nodeStackSizeMax && (nodeStackSizeMax = nodeStackSize); 0 < nodeStackSize; ) {
            var currentNewNode = nodeStack[--nodeStackSize], children = nodeStack[--nodeStackSize].children, newChildren = currentNewNode.children;
            for (let i = 0; i < children.length; ++i) {
                var newChild, child = children[i];
                child && child.kind !== QSNodeKind.AS_DOC && child.kind !== QSNodeKind.MULTI_LINE_COMMENT && (newChild = new QSNode(child.kind, child.start, child.end, child.text, [], currentNewNode, child.label), 
                newChildren[newChildren.length] = newChild, nodeStack[nodeStackSize++] = child, 
                nodeStack[nodeStackSize++] = newChild);
            }
            nodeStackSize > nodeStackSizeMax && (nodeStackSizeMax = nodeStackSize);
        }
        for (;0 < nodeStackSizeMax; ) nodeStack[--nodeStackSizeMax] = null;
        return parentNode;
    }
    static connectComments(node, content) {
        var list = QSNode.findChildren(QSNodeKind.IDENTIFIER, !0);
        for (let i = 0; i < list.length; ++i) {
            var n = list[i];
            let start = n.start, chars = content.substring(start - 2, start);
            if ("*/" === chars) for (;0 < start; ) {
                if ("/*" === chars) {
                    n.commentsStart = start - 2, n.commentsEnd = n.start;
                    break;
                }
                start--, chars = content.substring(start - 2, start);
            }
        }
        return node;
    }
}

QSNode.nodeStack = [], QSNode.tempArray = [];

class QSParser {
    static ASDOC_COMMENT = "/**";
    static MULTIPLE_LINES_COMMENT = "/*";
    static CARET_RETURN = "\r";
    static NEW_LINE = "\n";
    static SINGLE_LINE_COMMENT_JS = "//";
    static SINGLE_LINE_COMMENT_PY = "#";
    static VECTOR = "Vector";
    static CARRIAGE_RETURN = 13;
    static LINE_FEED = 10;
    static LINE_SEPARATOR = 8232;
    static PARAGRAPH_SEPARATOR = 8233;
    static NEXT_LINE = 133;
    constructor(debug = null) {
        this.scn = new QSScanner(), this.isInFor = !1, this.debug = debug;
    }
    static throwError(error) {
        throw error;
    }
    build(filePath, content, options) {
        return this.options = options || {}, this.lineMap = QSParser.buildLineMap(content), 
        this.setFileName(filePath), this.scn = new QSScanner(), this.scn.setContent(content), 
        this.parseCompilationUnit();
    }
    buildExpression(content, options) {
        this.options = options || {}, this.lineMap = QSParser.buildLineMap(content), 
        this.scn = new QSScanner(), this.scn.setContent(content), this.nextTokenIgnoringDocumentation();
        try {
            return this.parseExpression();
        } catch (error) {
            return this.parseError(error), null;
        }
    }
    buildScript(content, options) {
        this.options = options || {}, this.lineMap = QSParser.buildLineMap(content), 
        this.scn = new QSScanner(), this.scn.setContent(content), this.nextTokenIgnoringDocumentation();
        try {
            return this.parseScript();
        } catch (error) {
            return this.parseError(error), null;
        }
    }
    parseError(error) {
        this.debug.add(`<span class='qubot-red'>Parse error: ${error.message}</span><br>`), 
        console.log(error);
    }
    nextToken(ignoreDocumentation = !1, ignoreXMLLiteral) {
        for (;ignoreDocumentation ? this.nextTokenIgnoringDocumentation() : this.nextTokenAllowNewLine(), 
        this.tok.text === QSParser.NEW_LINE; );
    }
    getCheckPoint() {
        var checkpoint = this.scn.getCheckPoint();
        return checkpoint.tok = this.tok, checkpoint;
    }
    rewind(checkpoint) {
        this.scn.rewind(checkpoint), this.tok = checkpoint.tok;
    }
    tryParse(func) {
        var checkPoint = this.getCheckPoint();
        try {
            return func();
        } catch (e) {
            return this.rewind(checkPoint), null;
        }
    }
    parseClassContent() {
        for (var result = new QSNode(QSNodeKind.CONTENT, this.tok.index, -1), modifiers = [], meta = []; !this.tokIs(QSOperators.RIGHT_CURLY_BRACKET); ) {
            var condition = this.parseConditionalCompilation();
            condition && result.children.push(condition), this.tokIs(QSOperators.LEFT_CURLY_BRACKET) ? condition ? (this.consume(QSOperators.LEFT_CURLY_BRACKET), 
            result.children.push(this.parseClassContent()), this.consume(QSOperators.RIGHT_CURLY_BRACKET)) : result.children.push(this.parseBlockOrObjectLiteral()) : this.tokIs(QSOperators.LEFT_SQUARE_BRACKET) ? meta.push(this.parseMetaData()) : this.tokIs(QSKeyWords.VAR) || this.tokIs(QSKeyWords.NAMESPACE) ? this.parseClassField(result, modifiers, meta) : this.tokIs(QSKeyWords.CONST) ? this.parseClassConstant(result, modifiers, meta) : this.tokIs(QSKeyWords.IMPORT) ? result.children.push(this.parseImport()) : this.tokIs(QSKeyWords.INCLUDE) ? result.children.push(this.parseIncludeExpression()) : this.tokIs(QSKeyWords.IMPORT) ? result.children.push(this.parseImport()) : this.tokIs(QSKeyWords.FUNCTION) ? this.parseClassFunctions(result, modifiers, meta) : ((condition = !this.tryToParseCommentNode()) && modifiers && modifiers.push(this.tok), 
            this.nextToken(condition));
        }
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.start), 
        result;
    }
    parseCompilationUnit() {
        var result = new QSNode(QSNodeKind.COMPILATION_UNIT, -1, -1);
        return this.nextTokenIgnoringDocumentation(), this.tokIs(QSKeyWords.PACKAGE) && result.children.push(this.parsePackage()), 
        result.children.push(this.parsePackageContent()), result;
    }
    parseExpression() {
        return this.parseAssignmentExpression();
    }
    parseInterfaceContent() {
        for (var result = new QSNode(QSNodeKind.CONTENT, this.tok.index, -1), meta = []; !this.tokIs(QSOperators.RIGHT_CURLY_BRACKET); ) this.tokIs(QSKeyWords.IMPORT) ? result.children.push(this.parseImport()) : this.tokIs(QSOperators.LEFT_SQUARE_BRACKET) ? meta.push(this.parseMetaData()) : this.tokIs(QSKeyWords.FUNCTION) ? (result.children.push(this.parseFunctionSignature(meta)), 
        meta.length = 0) : this.tokIs(QSKeyWords.INCLUDE) ? result.children.push(this.parseIncludeExpression()) : (this.tryToParseCommentNode(), 
        this.nextToken());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.start), 
        result;
    }
    parsePackageContent() {
        let result = new QSNode(QSNodeKind.CONTENT, this.tok.index, -1);
        for (var content, index, modifiers = [], meta = []; !this.tokIs(QSOperators.RIGHT_CURLY_BRACKET) && !this.tokIs(QSKeyWords.EOF); ) this.tokIs(QSKeyWords.IMPORT) ? result.children.push(this.parseImport()) : this.tokIs(QSKeyWords.USE) ? result.children.push(this.parseUse()) : this.tokIs(QSKeyWords.DEFAULT) ? result.children.push(this.parseDefaultXMLNamespace()) : this.tokIs(QSKeyWords.INCLUDE) ? result.children.push(this.parseIncludeExpression()) : this.tokIs(QSOperators.LEFT_SQUARE_BRACKET) ? meta.push(this.parseMetaData()) : this.tokIs(QSOperators.LEFT_CURLY_BRACKET) ? (index = this.tok.index, 
        this.consume(QSOperators.LEFT_CURLY_BRACKET), content = this.parsePackageContent(), 
        this.consume(QSOperators.RIGHT_CURLY_BRACKET), content.start = index, content.end = this.tok.index, 
        result.children.push(content)) : this.tokIs(QSKeyWords.CLASS) ? (result.children.push(this.parseClass(meta, modifiers)), 
        modifiers.length = 0, meta.length = 0) : this.tokIs(QSKeyWords.INTERFACE) ? (result.children.push(this.parseInterface(meta, modifiers)), 
        modifiers.length = 0, meta.length = 0) : this.tokIs(QSKeyWords.IF) ? result = this.parseIf() : this.tokIs(QSKeyWords.VAR) || this.tokIs(QSKeyWords.NAMESPACE) ? this.parseClassField(result, modifiers, meta) : this.tokIs(QSKeyWords.CONST) ? this.parseClassConstant(result, modifiers, meta) : this.tokIs(QSKeyWords.FUNCTION) ? this.parseClassFunctions(result, modifiers, meta) : this.tok.text.startsWith(QSParser.ASDOC_COMMENT) ? (this.currentAsDoc = new QSNode(QSNodeKind.AS_DOC, this.tok.index, -1, this.tok.text), 
        this.nextToken()) : this.tok.text.startsWith(QSParser.MULTIPLE_LINES_COMMENT) ? (this.currentMultiLineComment = new QSNode(QSNodeKind.MULTI_LINE_COMMENT, this.tok.index, -1, this.tok.text), 
        this.nextToken()) : (index = this.parseConditionalCompilation()) ? result.children.push(index) : (modifiers.push(this.tok), 
        this.nextTokenIgnoringDocumentation());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.start), 
        result;
    }
    parseConditionalCompilation() {
        if (this.tokIs("CONFIG")) {
            var condition = this.tryParse(() => {
                var expr = this.parsePrimaryExpression();
                if (expr.kind === QSNodeKind.IDENTIFIER && this.tokIs(QSOperators.DOUBLE_COLUMN)) return this.parseDot(expr);
                QSParser.throwError(new Error());
            });
            if (condition) return condition;
        }
        return null;
    }
    parsePrimaryExpression() {
        let result;
        if (this.tokIs(QSOperators.LEFT_SQUARE_BRACKET)) return this.parseArrayLiteral();
        if (this.tokIs(QSOperators.LEFT_CURLY_BRACKET)) return this.parseObjectLiteral();
        if (this.tokIs(QSKeyWords.FUNCTION)) return this.parseLambdaExpression();
        if (this.tokIs(QSKeyWords.NEW)) return this.parseNewExpression();
        if (this.tokIs(QSOperators.LEFT_PARENTHESIS)) return this.parseEncapsulatedExpression();
        if (this.tok.text === QSParser.VECTOR) return this.parseVector();
        if (this.tokIs(QSOperators.INFERIOR)) {
            var res = this.tryParse(() => this.parseShortVector());
            if (res) return res;
        }
        if ("/" === this.tok.text || "/=" === this.tok.text) {
            res = this.scn.scanRegExp();
            if (res) return this.nextToken(!0), new QSNode(QSNodeKind.REGEXP_LITERAL, res.index, res.end, res.text);
        } else if (/['"`]/.test(this.tok.text[0])) result = this.parseString(this.tok, 1, this.tok.text.length - 1); else if (this.tok.isNumeric || "true" == this.tok.text || "false" == this.tok.text || "NaN" == this.tok.text || "Infinity" == this.tok.text || "none" == this.tok.text || "null" == this.tok.text) result = new QSNode(QSNodeKind.LITERAL, this.tok.index, this.tok.end, this.tok.text); else {
            result = new QSNode(QSNodeKind.IDENTIFIER, this.tok.index, this.tok.end, this.tok.text), 
            "$" == this.tok.text && (this.nextToken(!0), result.text += this.tok.text, 
            result.end = this.tok.end);
            var res = result.text, AT_TIMES = "" + QSOperators.AT + QSOperators.TIMES;
            if ((-1 < res.indexOf("/") || -1 < res.indexOf("*")) && res != AT_TIMES) return this.tryToSkipCommentNode(), 
            null;
        }
        return this.nextToken(!0, !0), result;
    }
    parseStatement() {
        let result;
        return this.tokIs(QSKeyWords.USE) ? result = this.parseUse() : this.tokIs(QSKeyWords.DEFAULT) ? result = this.parseDefaultXMLNamespace() : this.tokIs(QSKeyWords.FOR) ? result = this.parseFor() : this.tokIs(QSKeyWords.IF) ? result = this.parseIf() : this.tokIs(QSKeyWords.SWITCH) ? result = this.parseSwitch() : this.tokIs(QSKeyWords.DO) ? result = this.parseDo() : this.tokIs(QSKeyWords.WHILE) ? result = this.parseWhile() : this.tokIs(QSKeyWords.BUTTON) ? result = this.parseButton() : this.tokIs(QSKeyWords.WITH) ? result = this.parseWith() : this.tokIs(QSKeyWords.TRY) ? result = this.parseTry() : this.tokIs(QSKeyWords.CATCH) ? result = this.parseCatch() : this.tokIs(QSKeyWords.FINALLY) ? result = this.parseFinally() : this.tokIs(QSOperators.LEFT_CURLY_BRACKET) ? result = this.parseBlock() : this.tokIs(QSKeyWords.VAR) ? result = this.parseVar() : this.tokIs(QSKeyWords.LOCAL) ? result = this.parseLocal() : this.tokIs(QSKeyWords.CONST) ? result = this.parseConst() : this.tokIs(QSKeyWords.RETURN) ? result = this.parseReturnStatement() : this.tokIs(QSKeyWords.THROW) ? result = this.parseThrowStatement() : this.tokIs(QSKeyWords.BREAK) || this.tokIs(QSKeyWords.CONTINUE) ? result = this.parseBreakOrContinueStatement() : this.tokIs(QSOperators.SEMI_COLUMN) ? result = this.parseEmptyStatement() : (result = this.parseExpressionList(), 
        this.skip(QSOperators.SEMI_COLUMN)), result;
    }
    parseUnaryExpression() {
        let result, index = this.tok.index;
        if (this.tokIs(QSOperators.INCREMENT)) this.nextToken(), this.tryToSkipCommentNode(), 
        (result = new QSNode(QSNodeKind.PRE_INC, index, -1, null, [ this.parseUnaryExpression() ])).end = result.firstChild.end; else if (this.tokIs(QSOperators.DECREMENT)) this.nextToken(), 
        this.tryToSkipCommentNode(), (result = new QSNode(QSNodeKind.PRE_DEC, index, -1, null, [ this.parseUnaryExpression() ])).end = result.firstChild.end; else if (this.tokIs(QSOperators.MINUS)) this.nextToken(), 
        this.tryToSkipCommentNode(), (result = new QSNode(QSNodeKind.MINUS, index, -1, null, [ this.parseUnaryExpression() ])).end = result.firstChild.end; else {
            if (!this.tokIs(QSOperators.PLUS)) return this.parseUnaryExpressionNotPlusMinus();
            this.nextToken(), this.tryToSkipCommentNode(), (result = new QSNode(QSNodeKind.PLUS, index, -1, null, [ this.parseUnaryExpression() ])).end = result.firstChild.end;
        }
        return result;
    }
    parseString(parentTok, parentStart, parentEnd) {
        var text = parentTok.text.substring(parentStart, parentEnd);
        if (!/[${]/.test(text)) return this.parseStringLiteral(parentTok, parentStart, parentEnd);
        var nextChar, result = new QSNode(QSNodeKind.CONCAT, parentTok.index + parentStart, parentTok.index + parentEnd, null), scn = new QSScanner();
        scn.setContent(text);
        let tok = void 0, strStart = 0, embedStart = void 0, embedEnd = void 0, slotEmbedding = !1, exprEmbedding = !1, sqBracket = 0, dots = 0;
        do {
            if ((tok = scn.nextStrToken()).text == QSKeyWords.EOF) break;
            if (slotEmbedding) {
                let literal = !1;
                tok.text == QSOperators.LEFT_SQUARE_BRACKET ? sqBracket++ : tok.text == QSOperators.RIGHT_SQUARE_BRACKET ? sqBracket-- : tok.text == QSOperators.DOT ? dots++ : literal = !0, 
                literal && (0 < dots ? (embedEnd != tok.index && (result.children.push(this.parseStringEmbedding(parentTok, parentStart + embedStart, parentStart + embedEnd - 1)), 
                strStart = embedEnd - 1, slotEmbedding = !1), dots--) : 0 == sqBracket && (result.children.push(this.parseStringEmbedding(parentTok, parentStart + embedStart, parentStart + embedEnd)), 
                strStart = embedEnd, slotEmbedding = !1)), slotEmbedding && (embedEnd = tok.index + tok.text.length);
            }
            if ("\\" == tok.text) {
                if (tok = scn.nextStrToken()) continue;
                break;
            }
            exprEmbedding || "$" != tok.text ? !slotEmbedding && tok && tok.text == QSOperators.LEFT_CURLY_BRACKET ? (embedStart = tok.index + 1, 
            exprEmbedding = !0) : !slotEmbedding && exprEmbedding && tok && tok.text == QSOperators.RIGHT_CURLY_BRACKET && (embedStart - 1 > strStart && result.children.push(this.parseStringLiteral(parentTok, parentStart + strStart, parentStart + embedStart - 1)), 
            result.children.push(this.parseStringEmbedding(parentTok, parentStart + embedStart, parentStart + tok.index)), 
            exprEmbedding = !1, embedStart = void 0, strStart = tok.index + 1) : (nextChar = scn.peekChar(1), 
            QSScanner.isIdentifierCharacter(nextChar) && (slotEmbedding ? 0 == sqBracket && (result.children.push(this.parseStringEmbedding(parentTok, parentStart + embedStart, parentStart + tok.index)), 
            embedStart = tok.index + 1) : (slotEmbedding = !0, (embedStart = tok.index + 1) - 1 > strStart && result.children.push(this.parseStringLiteral(parentTok, parentStart + strStart, parentStart + tok.index)), 
            tok = scn.nextStrToken(), embedEnd = tok.index + tok.text.length)));
        } while (tok);
        return (strStart = slotEmbedding ? 0 < dots ? (result.children.push(this.parseStringEmbedding(parentTok, parentStart + embedStart, embedEnd - dots + 1)), 
        embedEnd - dots) : (result.children.push(this.parseStringEmbedding(parentTok, parentStart + embedStart, parentEnd)), 
        parentEnd) : strStart) < parentEnd && result.children.push(this.parseStringLiteral(parentTok, parentStart + strStart, parentEnd)), 
        result;
    }
    parseStringLiteral(parentTok, parentStart, parentEnd) {
        let text = parentTok.text.substring(parentStart, parentEnd);
        return text = text.replace(/(\\([\${}]))/g, "$2"), new QSNode(QSNodeKind.LITERAL, parentTok.index + parentStart - 1, parentTok.index + parentEnd + 1, "" + parentTok.text[0] + text + parentTok.text[0]);
    }
    shiftNodePos(node, offset) {
        node.start += offset, node.end += offset;
        for (var ch of node.children) this.shiftNodePos(ch, offset);
    }
    parseStringEmbedding(parentTok, start, end) {
        end = parentTok.text.substring(start, end), end = new QSParser(this.debug).buildExpression(end);
        return this.shiftNodePos(end, parentTok.index + start), end;
    }
    collectVarListContent(result, tok) {
        for (result.children.push(this.parseNameTypeInit(tok)); this.tokIs(QSOperators.COMMA); ) this.nextToken(!0), 
        result.children.push(this.parseNameTypeInit(tok));
        return result;
    }
    consume(text) {
        for (;this.tok.text.startsWith("//"); ) this.nextToken();
        this.tokIs(text) || QSParser.throwError(new Error(`unexpected token : ${this.tok.text}, expected: ${text}
` + this.scn.subContentAtIndex(128, 128)));
        text = this.tok;
        return this.nextToken(), text;
    }
    consumeOpt(text) {
        return this.consume(text);
    }
    convertMeta(metadataList) {
        var result;
        return null == metadataList || 0 === metadataList.length ? null : ((result = new QSNode(QSNodeKind.META_LIST, this.tok.index, -1)).children = metadataList ? metadataList.slice(0) : [], 
        result.lastChild && (result.end = result.lastChild.end), result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), result.start), 
        result);
    }
    convertModifiers(modifierList) {
        var result;
        return null == modifierList || 0 === modifierList.length ? null : ((result = new QSNode(QSNodeKind.MOD_LIST, this.tok.index, -1)).children = modifierList.map(tok => new QSNode(QSNodeKind.MODIFIER, tok.index, tok.index + tok.text.length, tok.text)), 
        result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), result.start), 
        result.end = result.lastChild ? result.lastChild.end : result.start, result);
    }
    doParseSignature() {
        var tok = this.consume(QSKeyWords.FUNCTION);
        let type = new QSNode(QSNodeKind.TYPE, tok.index, tok.end, QSKeyWords.FUNCTION);
        !this.tokIs(QSKeyWords.SET) && !this.tokIs(QSKeyWords.GET) || this.scn.nextCharIs("(", [ "\t", " " ]) || (type = new QSNode(QSNodeKind.TYPE, tok.index, this.tok.end, this.tok.text), 
        this.nextToken());
        var tok = new QSNode(QSNodeKind.NAME, this.tok.index, this.tok.end, this.tok.text), params = (QSParser.isInvalidQualifiedName(tok.text) ? (tok.text = this.parseQualifiedName(!0), 
        tok.end = this.tok.index) : this.nextToken(), this.parseParameterList()), returnType = this.parseOptionalType();
        return [ type, tok, params, returnType ];
    }
    static findFunctionTypeFromSignature(signature) {
        for (let i = 0; i < signature.length; i++) {
            var node = signature[i];
            if (node.kind === QSNodeKind.TYPE) return "set" === node.text ? QSNodeKind.SET : "get" === node.text ? QSNodeKind.GET : QSNodeKind.FUNCTION;
        }
        return QSNodeKind.FUNCTION;
    }
    nextTokenAllowNewLine() {
        for (;this.tok = this.scn.nextToken(), null == this.tok && (this.tok = this.scn.tryFixNullToken(), 
        null == this.tok) && QSParser.throwError(new Error(this.fileName)), null == this.tok.text && QSParser.throwError(new Error(this.fileName)), 
        this.tok.text.startsWith(QSParser.SINGLE_LINE_COMMENT_JS) || this.tok.text.startsWith(QSParser.SINGLE_LINE_COMMENT_PY); );
    }
    nextTokenIgnoringDocumentation() {
        for (;this.nextToken(), this.tok.text.startsWith(QSParser.MULTIPLE_LINES_COMMENT); );
    }
    parseAdditiveExpression() {
        for (var result = new QSNode(QSNodeKind.ADD, this.tok.index, this.tok.end, null, [ this.parseSubstractionExpression() ]); this.tokIs(QSOperators.PLUS); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseSubstractionExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseSubstractionExpression() {
        for (var result = new QSNode(QSNodeKind.MINUS, this.tok.index, this.tok.end, null, [ this.parseMultiplicativeExpression() ]); this.tokIs(QSOperators.MINUS); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseMultiplicativeExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseAndExpression() {
        for (var result = new QSNode(QSNodeKind.AND, this.tok.index, this.tok.end, null, [ this.parseBitwiseOrExpression() ]); this.tokIs(QSOperators.AND); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseBitwiseOrExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseArgumentList() {
        for (var tok = this.consume(QSOperators.LEFT_PARENTHESIS), result = new QSNode(QSNodeKind.ARGUMENTS, tok.index, -1); !this.tokIs(QSOperators.RIGHT_PARENTHESIS) && !this.tokIs(QSKeyWords.EOF) && (this.tryToSkipCommentNode(), 
        !this.tokIs(QSOperators.RIGHT_PARENTHESIS)); ) result.children.push(this.parseExpression()), 
        this.tryToSkipCommentNode(), this.skip(QSOperators.COMMA), this.tryToSkipCommentNode();
        return tok = this.consumeOpt(QSOperators.RIGHT_PARENTHESIS), result.end = tok.end, 
        result;
    }
    parseArrayAccessor(node) {
        let result = new QSNode(QSNodeKind.ARRAY_ACCESSOR, node.start, -1);
        for (result.children.push(node); this.tokIs(QSOperators.LEFT_SQUARE_BRACKET); ) {
            var acc;
            this.nextToken(!0), 1 < result.children.length && ((acc = new QSNode(QSNodeKind.ARRAY_ACCESSOR, node.start, -1)).children.push(result), 
            result = acc), result.children.push(this.parseExpression()), result.end = this.consumeOpt(QSOperators.RIGHT_SQUARE_BRACKET).end;
        }
        return result;
    }
    parseArrayLiteral() {
        var tok = this.consume(QSOperators.LEFT_SQUARE_BRACKET), result = new QSNode(QSNodeKind.ARRAY, tok.index, -1);
        for (this.tryToSkipCommentNode(); !this.tokIs(QSOperators.RIGHT_SQUARE_BRACKET) && !this.tokIs(QSKeyWords.EOF); ) result.children.push(this.parseExpression()), 
        this.tryToSkipCommentNode(), this.skip(QSOperators.COMMA), this.tryToSkipCommentNode();
        return result.end = this.consume(QSOperators.RIGHT_SQUARE_BRACKET).end, 
        result;
    }
    parseAssignmentExpression() {
        for (var result = new QSNode(QSNodeKind.ASSIGN, this.tok.index, this.tok.end, null, [ this.parseConditionalExpression() ]); this.tokIs(QSOperators.EQUAL) || this.tokIs(QSOperators.PLUS_EQUAL) || this.tokIs(QSOperators.MINUS_EQUAL) || this.tokIs(QSOperators.TIMES_EQUAL) || this.tokIs(QSOperators.DIVIDED_EQUAL) || this.tokIs(QSOperators.MODULO_EQUAL) || this.tokIs(QSOperators.AND_EQUAL) || this.tokIs(QSOperators.OR_EQUAL) || this.tokIs(QSOperators.LOGICAL_AND_ASSIGNMENT) || this.tokIs(QSOperators.LOGICAL_OR_ASSIGNMENT) || this.tokIs(QSOperators.XOR_EQUAL) || this.tokIs(QSOperators.DOUBLE_SHIFT_LEFT_AND_ASSIGNMENT) || this.tokIs(QSOperators.DOUBLE_SHIFT_RIGHT_AND_ASSIGNMENT) || this.tokIs(QSOperators.TRIPLE_SHIFT_LEFT_AND_ASSIGNMENT) || this.tokIs(QSOperators.TRIPLE_SHIFT_RIGHT_AND_ASSIGNMENT); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseBitwiseAndExpression() {
        for (var result = new QSNode(QSNodeKind.B_AND, this.tok.index, this.tok.end, this.tok.text, [ this.parseEqualityExpression() ]); this.tokIs(QSOperators.B_AND); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseEqualityExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseBitwiseOrExpression() {
        for (var result = new QSNode(QSNodeKind.B_OR, this.tok.index, this.tok.end, this.tok.text, [ this.parseBitwiseXorExpression() ]); this.tokIs(QSOperators.B_OR); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseBitwiseXorExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseBitwiseXorExpression() {
        for (var result = new QSNode(QSNodeKind.B_XOR, this.tok.index, this.tok.end, this.tok.text, [ this.parseBitwiseAndExpression() ]); this.tokIs(QSOperators.B_XOR); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseBitwiseAndExpression());
        return result.lastChild && (result.end = result.lastChild.end), 1 < result.children.length ? result : result.lastChild;
    }
    parseScript() {
        for (var tok = this.tok, result = new QSNode(QSNodeKind.BLOCK, tok.index, this.tok.end); !this.tokIs(QSKeyWords.EOF); ) this.tok.text.startsWith(QSParser.MULTIPLE_LINES_COMMENT) ? (this.currentFunctionNode && this.currentFunctionNode.children.push(new QSNode(QSNodeKind.MULTI_LINE_COMMENT, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken()) : this.tokIs(QSKeyWords.IMPORT) ? result.children.push(this.parseImport()) : this.tokIs(QSKeyWords.FUNCTION) ? result.children.push(this.parseExpressionLabel(result, this.parseLambdaExpression())) : result.children.push(this.parseExpressionLabel(result, this.parseStatement()));
        return result.end = this.tok.end, result;
    }
    parseBlock(result) {
        var tok = this.consume(QSOperators.LEFT_CURLY_BRACKET);
        for (result ? result.start = tok.index : result = new QSNode(QSNodeKind.BLOCK, tok.index, this.tok.end); !this.tokIs(QSOperators.RIGHT_CURLY_BRACKET) && !this.tokIs(QSKeyWords.EOF); ) this.tok.text.startsWith(QSParser.MULTIPLE_LINES_COMMENT) ? (this.currentFunctionNode && this.currentFunctionNode.children.push(new QSNode(QSNodeKind.MULTI_LINE_COMMENT, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken()) : this.tokIs(QSKeyWords.IMPORT) ? result.children.push(this.parseImport()) : this.tokIs(QSKeyWords.FUNCTION) ? result.children.push(this.parseExpressionLabel(result, this.parseLambdaExpression())) : result.children.push(this.parseExpressionLabel(result, this.parseStatement()));
        return result.end = this.consume(QSOperators.RIGHT_CURLY_BRACKET).end, result;
    }
    parseNativeBlock(result) {
        var tok = this.consume(QSOperators.LEFT_CURLY_BRACKET);
        result ? result.start = tok.index : result = new QSNode(QSNodeKind.BLOCK, tok.index, this.tok.end);
        let start = tok.index + 1, end = -1, enter = 1;
        for (;0 < enter; ) {
            if (this.tokIs(QSOperators.LEFT_CURLY_BRACKET)) enter++; else if (this.tokIs(QSOperators.RIGHT_CURLY_BRACKET) && --enter <= 0) break;
            end = this.tok.end, this.nextToken();
        }
        return this.currentFunctionNode.children.push(new QSNode(QSNodeKind.MULTI_LINE_COMMENT, start, end, this.scn.contentByRange(start, end))), 
        result.end = this.consume(QSOperators.RIGHT_CURLY_BRACKET).end, result;
    }
    parseBlockOrObjectLiteral() {
        return this.tryParse(() => this.parseBlock()) || this.parseObjectLiteral();
    }
    parseExpressionLabel(result, statement) {
        if (result && statement) {
            let brokenIf, column, label;
            for (let i = result.children.length - 1; 0 <= i; --i) {
                var n = result.children[i];
                if (n.kind == QSNodeKind.IDENTIFIER) {
                    if (column) {
                        label = n;
                        break;
                    }
                    n.text == QSOperators.COLUMN && (column = n);
                } else if (n.kind == QSNodeKind.IF && n.lastChild.kind == QSNodeKind.IDENTIFIER && column) {
                    label = (brokenIf = n).lastChild;
                    break;
                }
            }
            column && (label ? (brokenIf ? (brokenIf.children.splice(brokenIf.children.indexOf(label), 1), 
            brokenIf.children.push(statement), brokenIf.end = statement.end) : result.children.splice(result.children.indexOf(label), 1), 
            result.children.splice(result.children.indexOf(column), 1), statement.label = label.text, 
            statement.start = label.start) : QSParser.throwError(new Error(`Internal parser error: can't process label of expression "${this.scn.subContentAtIndex(128, 128)}"`)));
        }
        return statement;
    }
    parseCatch() {
        var tok = this.consume(QSKeyWords.CATCH), tok = (this.consume(QSOperators.LEFT_PARENTHESIS), 
        new QSNode(QSNodeKind.CATCH, tok.index, tok.end, null, [ new QSNode(QSNodeKind.NAME, this.tok.index, this.tok.end, this.tok.text) ])), parseBlock = (this.nextToken(!0), 
        tok.children.push(this.parseOptionalType()), this.consume(QSOperators.RIGHT_PARENTHESIS), 
        this.parseBlock());
        return tok.children.push(parseBlock), tok.end = parseBlock.end, tok;
    }
    parseClass(meta, modifier) {
        var startIndex = this.tok.index, tok = this.consume(QSKeyWords.CLASS), result = new QSNode(QSNodeKind.CLASS, tok.index, tok.end);
        this.attachCurrentDocsAndComments(result);
        let index = this.tok.index, name = this.parseQualifiedName(!0);
        for (result.children.push(this.convertMeta(meta)), result.children.push(this.convertModifiers(modifier)), 
        result.children.push(new QSNode(QSNodeKind.NAME, index, index + name.length, name)); this.tokIs(QSKeyWords.EXTENDS) ? (this.nextToken(!0), 
        index = this.tok.index, name = this.parseQualifiedName(!1), result.children.push(new QSNode(QSNodeKind.EXTENDS, index, index + name.length, name))) : this.tokIs(QSKeyWords.IMPLEMENTS) ? result.children.push(this.parseImplementsList()) : this.tryToSkipCommentNode(), 
        !this.tokIs(QSOperators.LEFT_CURLY_BRACKET) && !this.tokIs(QSKeyWords.EOF); );
        return this.consume(QSOperators.LEFT_CURLY_BRACKET), result.children.push(this.parseClassContent()), 
        tok = this.consume(QSOperators.RIGHT_CURLY_BRACKET), result.end = tok.end, 
        result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), index), 
        0 == modifier.length && (result.start = startIndex), result;
    }
    parseClassConstant(result, modifiers, meta) {
        var list = this.parseConstList(meta, modifiers);
        result.children.push(list), this.attachCurrentDocsAndComments(result), this.tokIs(QSOperators.SEMI_COLUMN) && this.nextToken(), 
        meta.length = 0, modifiers.length = 0;
    }
    parseClassField(result, modifiers, meta) {
        var list = this.parseVarList(meta, modifiers);
        result.children.push(list), this.attachCurrentDocsAndComments(result), this.tokIs(QSOperators.SEMI_COLUMN) && this.nextToken(), 
        meta.length = 0, modifiers.length = 0;
    }
    parseClassFunctions(result, modifiers, meta) {
        result.children.push(this.parseFunction(meta, modifiers)), meta.length = 0, 
        modifiers.length = 0;
    }
    parseCondition() {
        var tok = this.consume(QSOperators.LEFT_PARENTHESIS), result = (this.tryToSkipCommentNode(), 
        new QSNode(QSNodeKind.CONDITION, tok.index, -1, null, [ this.parseExpression() ])), tok = this.consume(QSOperators.RIGHT_PARENTHESIS);
        return result.end = tok.end, result;
    }
    parseConditionalExpression() {
        var conditional, result = this.parseOrExpression();
        return this.tokIs(QSOperators.QUESTION_MARK) ? (conditional = new QSNode(QSNodeKind.CONDITIONAL, result.start, -1, null, [ result ]), 
        this.nextToken(!0), conditional.children.push(this.parseExpression()), this.nextToken(!0), 
        conditional.children.push(this.parseExpression()), conditional.end = conditional.lastChild.end, 
        conditional) : result;
    }
    parseConst() {
        var result = this.parseConstList(null, null);
        return this.skip(QSOperators.SEMI_COLUMN), result;
    }
    parseConstList(meta, modifiers) {
        var tok = this.consume(QSKeyWords.CONST), result = new QSNode(QSNodeKind.CONST_LIST, tok.index, tok.end);
        return result.children.push(this.convertMeta(meta)), result.children.push(this.convertModifiers(modifiers)), 
        this.collectVarListContent(result, tok), result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), tok.index), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), tok.end), 
        result;
    }
    parseDecrement(node) {
        var result = new QSNode(QSNodeKind.POST_DEC, node.start, this.tok.end);
        return result.children.push(node), this.nextToken(!0), result;
    }
    parseDo() {
        var tok = this.consume(QSKeyWords.DO), tok = new QSNode(QSNodeKind.DO, tok.index, -1, null, [ this.parseStatement() ]), cond = (this.consume(QSKeyWords.WHILE), 
        this.parseCondition());
        return tok.children.push(cond), tok.end = cond.end, this.tokIs(QSOperators.SEMI_COLUMN) && this.nextToken(!0), 
        tok;
    }
    parseDot(node) {
        if (this.nextToken(!0), this.tokIs(QSOperators.LEFT_PARENTHESIS)) {
            this.nextToken(!0);
            let result = new QSNode(QSNodeKind.E4X_FILTER, node.start, -1);
            for (result.children.push(node), result.children.push(this.parseExpression()); this.tokIs(QSOperators.COMMA); ) this.nextToken(!0), 
            result.children.push(this.parseExpression());
            return result.end = this.consume(QSOperators.RIGHT_PARENTHESIS).end, 
            result;
        }
        var result = new QSNode(QSNodeKind.DOT, node.start, -1);
        return result.children.push(node), this.tokIs(QSOperators.LEFT_SQUARE_BRACKET) ? result.children.push(this.parseArrayLiteral()) : result.children.push(new QSNode(QSNodeKind.LITERAL, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0, !0), result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        result;
    }
    parseEmptyStatement() {
        var result = new QSNode(QSNodeKind.STMT_EMPTY, this.tok.index, this.tok.end, QSOperators.SEMI_COLUMN);
        return this.nextToken(!0), result;
    }
    parseEncapsulatedExpression() {
        var tok = this.consume(QSOperators.LEFT_PARENTHESIS), result = new QSNode(QSNodeKind.ENCAPSULATED, tok.index, -1);
        return this.tryToSkipCommentNode(), result.children.push(this.parseExpressionList()), 
        tok = this.consume(QSOperators.RIGHT_PARENTHESIS), result.end = tok.end, 
        result;
    }
    parseEqualityExpression() {
        var result = new QSNode(QSNodeKind.EQUALITY, this.tok.index, -1, null, [ this.parseNonEqualityExpression() ]);
        for (this.tryToSkipCommentNode(); this.tokIs(QSOperators.DOUBLE_EQUAL) || this.tokIs(QSOperators.STRICTLY_EQUAL); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseNonEqualityExpression()), 
        this.tryToSkipCommentNode();
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        1 < result.children.length ? result : result.children[0];
    }
    parseNonEqualityExpression() {
        var result = new QSNode(QSNodeKind.NON_EQUAL, this.tok.index, -1, null, [ this.parseRelationalExpression() ]);
        for (this.tryToSkipCommentNode(); this.tokIs(QSOperators.NON_EQUAL) || this.tokIs(QSOperators.NON_STRICTLY_EQUAL); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseRelationalExpression()), 
        this.tryToSkipCommentNode();
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        1 < result.children.length ? result : result.children[0];
    }
    parseExpressionList() {
        for (var result = new QSNode(QSNodeKind.EXPR_LIST, this.tok.index, -1, null, [ this.parseAssignmentExpression() ]); this.tokIs(QSOperators.COMMA); ) this.nextToken(!0), 
        result.children.push(this.parseAssignmentExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        1 < result.children.length ? result : result.children[0];
    }
    parseFinally() {
        var index = this.tok.index, block = (this.nextToken(!0), this.parseBlock());
        return new QSNode(QSNodeKind.FINALLY, index, block.end, null, [ block ]);
    }
    parseFor() {
        var tok = this.consume(QSKeyWords.FOR);
        return this.tokIs(QSKeyWords.EACH) ? (this.nextToken(), this.parseForEach(tok.index)) : this.parseTraditionalFor(tok.index);
    }
    parseForEach(index) {
        this.consume(QSOperators.LEFT_PARENTHESIS), this.tryToSkipCommentNode();
        var result = new QSNode(QSNodeKind.FOREACH, index, -1);
        if (this.tokIs(QSKeyWords.VAR)) {
            var tok = this.tok, node = new QSNode(QSNodeKind.VAR, this.tok.index, -1), tok = (this.nextToken(), 
            this.parseNameTypeInit(tok));
            node.children.push(tok), node.end = tok.end, result.children.push(node);
        } else {
            tok = this.getCheckPoint();
            let exp = new QSNode(QSNodeKind.IDENTIFIER, this.tok.index, this.tok.end, this.tok.text);
            this.nextToken(), (this.tokIs(QSOperators.LEFT_PARENTHESIS) || this.tokIs(QSOperators.DOT) || this.tokIs(QSOperators.DOUBLE_COLUMN) || this.tokIs(QSOperators.DESCENDANT_ACCESSOR) || this.tokIs(QSOperators.LEFT_SQUARE_BRACKET)) && (this.rewind(tok), 
            exp = this.parseAccessExpression()), result.children.push(exp);
        }
        index = this.tok.index, this.nextToken(), this.tryToSkipCommentNode();
        node = this.parseExpression(), result.children.push(new QSNode(QSNodeKind.IN, index, node.end, null, [ node ])), 
        this.consume(QSOperators.RIGHT_PARENTHESIS), tok = this.parseStatement();
        return result.children.push(tok), result.end = tok.end, result;
    }
    parseForIn(result) {
        var index = this.tok.index, expr = (this.nextToken(), this.tryToSkipCommentNode(), 
        this.parseExpression()), index = (result.children.push(new QSNode(QSNodeKind.IN, index, expr.end, null, [ expr ])), 
        result.kind = QSNodeKind.FORIN, this.consume(QSOperators.RIGHT_PARENTHESIS), 
        this.parseStatement());
        return result.children.push(index), result.end = index.end, result;
    }
    parseFunction(meta, modifiers) {
        var signature = this.doParseSignature(), result = new QSNode(QSParser.findFunctionTypeFromSignature(signature), signature[0].start, -1, signature[0].text);
        return this.tryToSkipCommentNode(), this.attachCurrentDocsAndComments(result), 
        result.children.push(this.convertMeta(meta)), result.children.push(this.convertModifiers(modifiers)), 
        result.children.push(signature[1]), result.children.push(signature[2]), 
        result.children.push(signature[3]), this.tokIs(QSOperators.SEMI_COLUMN) ? this.consume(QSOperators.SEMI_COLUMN) : result.children.push(this.parseFunctionBlock(meta)), 
        this.currentFunctionNode = null, result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), result.start), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        result;
    }
    parseFunctionBlock(meta) {
        var block = new QSNode(QSNodeKind.BLOCK, this.tok.index, -1), meta = (this.currentFunctionNode = block, 
        meta && meta.some(v => "[native]" == v.text));
        return meta ? this.parseNativeBlock(block) : this.parseBlock(block), block;
    }
    parseFunctionCall(node) {
        var result = new QSNode(QSNodeKind.CALL, node.start, -1);
        for (result.children.push(node); this.tokIs(QSOperators.LEFT_PARENTHESIS); ) result.children.push(this.parseArgumentList());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        result;
    }
    parseFunctionSignature(meta) {
        var signature = this.doParseSignature(), result = (this.skip(QSOperators.SEMI_COLUMN), 
        new QSNode(QSParser.findFunctionTypeFromSignature(signature), signature[0].start, -1, signature[0].text));
        return result.children.push(this.convertMeta(meta)), result.children.push(signature[1]), 
        result.children.push(signature[2]), result.children.push(signature[3]), 
        this.tokIs(QSOperators.LEFT_CURLY_BRACKET) && result.children.push(this.parseFunctionBlock(null)), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        result;
    }
    parseIf() {
        var tok = this.consume(QSKeyWords.IF), tok = new QSNode(QSNodeKind.IF, tok.index, -1, null, [ this.parseCondition() ]);
        return tok.children.push(this.parseStatement()), this.tokIs(QSKeyWords.ELSE) && (this.nextToken(!0), 
        tok.children.push(this.parseStatement())), tok.end = tok.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        tok;
    }
    parseImplementsList() {
        this.consume(QSKeyWords.IMPLEMENTS);
        var result = new QSNode(QSNodeKind.IMPLEMENTS_LIST, this.tok.index, -1), index = this.tok.index, name = this.parseQualifiedName(!1);
        for (result.children.push(new QSNode(QSNodeKind.IMPLEMENTS, index, index + name.length, name)); this.tokIs(QSOperators.COMMA); ) {
            this.nextToken(!0);
            let index = this.tok.index, name = this.parseQualifiedName(!1);
            result.children.push(new QSNode(QSNodeKind.IMPLEMENTS, index, index + name.length, name));
        }
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        result;
    }
    parseImport() {
        var tok = this.consume(QSKeyWords.IMPORT), name = this.parseImportName(), tok = new QSNode(QSNodeKind.IMPORT, tok.index, tok.index + name.length, name);
        return tok.end += QSKeyWords.IMPORT.length + 1, this.skip(QSOperators.SEMI_COLUMN) && (tok.end += QSOperators.SEMI_COLUMN.length), 
        tok;
    }
    parseImportName() {
        let result = "";
        for (result += this.tok.text, this.nextToken(); this.tokIs(QSOperators.DOT); ) result += QSOperators.DOT, 
        this.nextToken(), result += this.tok.text, this.nextToken();
        return result;
    }
    parseIncludeExpression() {
        var result = new QSNode(QSNodeKind.INCLUDE, this.tok.index, -1);
        let tok;
        return (tok = this.tokIs(QSKeyWords.INCLUDE) ? this.consume(QSKeyWords.INCLUDE) : tok) && (result.start = tok.index), 
        result.children.push(this.parsePrimaryExpression()), result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), 0), 
        result;
    }
    parseIncrement(node) {
        var result = new QSNode(QSNodeKind.POST_INC, node.start, this.tok.end);
        return result.children.push(node), this.nextToken(!0), result;
    }
    parseInterface(meta, modifier) {
        var startIndex = this.tok.index, tok = this.consume(QSKeyWords.INTERFACE), result = new QSNode(QSNodeKind.INTERFACE, tok.index, tok.end), index = (this.attachCurrentDocsAndComments(result), 
        this.tok.index), name = this.parseQualifiedName(!0);
        for (result.children.push(this.convertMeta(meta)), result.children.push(this.convertModifiers(modifier)), 
        result.children.push(new QSNode(QSNodeKind.NAME, index, index + name.length, name)); this.tokIs(QSKeyWords.EXTENDS) || this.tokIs(QSOperators.COMMA) ? (this.nextToken(!0), 
        index = this.tok.index, name = this.parseQualifiedName(!1), result.children.push(new QSNode(QSNodeKind.EXTENDS, index, index + name.length, name))) : this.tryToSkipCommentNode(), 
        !this.tokIs(QSOperators.LEFT_CURLY_BRACKET) && !this.tokIs(QSKeyWords.EOF); );
        return this.consume(QSOperators.LEFT_CURLY_BRACKET), result.children.push(this.parseInterfaceContent()), 
        tok = this.consume(QSOperators.RIGHT_CURLY_BRACKET), result.end = tok.end, 
        result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), tok.index), 
        0 == modifier.length && (result.start = startIndex), result;
    }
    parseLambdaExpression() {
        var tok = this.consume(QSKeyWords.FUNCTION);
        let result;
        return this.tok.text === QSOperators.LEFT_PARENTHESIS ? result = new QSNode(QSNodeKind.LAMBDA, tok.index, this.tok.end) : (result = new QSNode(QSNodeKind.FUNCTION, tok.index, this.tok.end, this.tok.text), 
        this.nextToken(!0)), result.children.push(this.parseParameterList()), result.children.push(this.parseBlock()), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        result;
    }
    parseMetaData() {
        let buffer = "";
        for (var index = this.consume(QSOperators.LEFT_SQUARE_BRACKET).index; !this.tokIs(QSOperators.RIGHT_SQUARE_BRACKET); ) buffer += this.tok.text, 
        this.nextToken();
        var end = this.tok.end;
        return this.skip(QSOperators.RIGHT_SQUARE_BRACKET), new QSNode(QSNodeKind.META, index, end, "[" + buffer + "]");
    }
    parseMultiplicativeExpression() {
        for (var result = new QSNode(QSNodeKind.MULTIPLICATION, this.tok.index, -1, null, [ this.parseModuloExpression() ]); this.tokIs(QSOperators.TIMES); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseModuloExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        1 < result.children.length ? result : result.children[0];
    }
    parseModuloExpression() {
        for (var result = new QSNode(QSNodeKind.MODULO, this.tok.index, -1, null, [ this.parseDivisionExpression() ]); this.tokIs(QSOperators.MODULO); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseDivisionExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        1 < result.children.length ? result : result.children[0];
    }
    parseDivisionExpression() {
        for (var result = new QSNode(QSNodeKind.DIVISION, this.tok.index, -1, null, [ this.parseUnaryExpression() ]); this.tokIs(QSOperators.SLASH); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseUnaryExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        1 < result.children.length ? result : result.children[0];
    }
    parseNamespaceName() {
        return this.parseExpression();
    }
    parseNameTypeInit(tok) {
        var result = new QSNode(QSNodeKind.NAME_TYPE_INIT, this.tok.index, -1, tok ? tok.text : void 0);
        return result.children.push(new QSNode(QSNodeKind.NAME, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseOptionalType()), this.tryToSkipCommentNode(), 
        result.children.push(this.parseOptionalInit()), tok && tok.text === QSKeyWords.NAMESPACE && result.children.push(new QSNode(QSNodeKind.TYPE, -1, -1, "global.Namespace")), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        result;
    }
    parseNewExpression() {
        var index, vec, tok = this.consume(QSKeyWords.NEW), tok = (this.tryToSkipCommentNode(), 
        new QSNode(QSNodeKind.NEW, tok.index, -1));
        return tok.children.push(this.parseAccessExpression()), this.tokIs(QSOperators.VECTOR_START) && (index = this.tok.index, 
        vec = this.parseVector(), tok.children.push(new QSNode(QSNodeKind.VECTOR, index, vec.end, null, [ vec ]))), 
        this.tokIs(QSOperators.LEFT_PARENTHESIS) && tok.children.push(this.parseArgumentList()), 
        tok.end = tok.children.reduce((index, child) => Math.max(index, child ? child.end : 0), tok.end), 
        tok;
    }
    parseObjectLiteral() {
        for (var tok = this.consume(QSOperators.LEFT_CURLY_BRACKET), result = new QSNode(QSNodeKind.OBJECT, tok.index, tok.end); !this.tokIs(QSOperators.RIGHT_CURLY_BRACKET) && !this.tokIs(QSKeyWords.EOF); ) this.tryToSkipCommentNode(), 
        result.children.push(this.parseObjectLiteralPropertyDeclaration()), this.skip(QSOperators.COMMA);
        return tok = this.consume(QSOperators.RIGHT_CURLY_BRACKET), result.end = tok.end, 
        result;
    }
    parseObjectLiteralPropertyDeclaration() {
        var result = new QSNode(QSNodeKind.PROP, this.tok.index, -1), exp = (this.tokIs(QSOperators.LEFT_PARENTHESIS) ? (exp = this.parseEncapsulatedExpression(), 
        result.children.push(exp)) : (exp = new QSNode(QSNodeKind.NAME, this.tok.index, this.tok.end, this.tok.text), 
        result.children.push(exp), this.nextToken()), this.consume(QSOperators.COLUMN), 
        this.tryToSkipCommentNode(), this.parseExpression()), exp = new QSNode(QSNodeKind.VALUE, this.tok.index, exp.end, null, [ exp ]);
        return result.children.push(exp), result.end = exp.end, result;
    }
    parseOptionalInit() {
        let result = null;
        var index, expr;
        return this.tokIs(QSOperators.EQUAL) && (this.nextToken(!0), index = this.tok.index, 
        expr = this.parseExpression(), result = new QSNode(QSNodeKind.INIT, index, expr.end, null, [ expr ])), 
        result;
    }
    parseOptionalType() {
        let result = null;
        return this.tokIs(QSOperators.COLUMN) && (this.nextToken(!0), result = this.parseType()), 
        result;
    }
    parseOrExpression() {
        for (var result = new QSNode(QSNodeKind.OR, this.tok.index, -1, null, [ this.parseAndExpression() ]); this.tokIs(QSOperators.LOGICAL_OR); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseAndExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        1 < result.children.length ? result : result.children[0];
    }
    parsePackage() {
        for (var tok = this.consume(QSKeyWords.PACKAGE), result = new QSNode(QSNodeKind.PACKAGE, tok.index, -1), index = this.tok.index; !this.tokIs(QSOperators.LEFT_CURLY_BRACKET); ) this.nextToken();
        let length = this.tok.index - index;
        for (;0 < length && /\s/.test(this.scn.contentByRange(index + length - 1, index + length)); ) length--;
        var nameBuffer = this.scn.contentByRange(index, index + length);
        return result.children.push(new QSNode(QSNodeKind.NAME, index, index + nameBuffer.length, nameBuffer)), 
        this.consume(QSOperators.LEFT_CURLY_BRACKET), result.children.push(this.parsePackageContent()), 
        tok = this.consume(QSOperators.RIGHT_CURLY_BRACKET), result.end = tok.end, 
        result;
    }
    parseParameter() {
        var index, result = new QSNode(QSNodeKind.PARAMETER, this.tok.index, -1);
        return this.tokIs(QSOperators.REST_PARAMETERS) ? (index = this.tok.index, 
        this.nextToken(!0), index = new QSNode(QSNodeKind.REST, index, this.tok.end, this.tok.text), 
        this.nextToken(!0), result.children.push(index), this.tryToSkipCommentNode(), 
        result.children.push(this.parseOptionalType())) : (result.children.push(new QSNode(QSNodeKind.NAME, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(True)), result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        result;
    }
    parseParameterList() {
        for (var tok = this.consume(QSOperators.LEFT_PARENTHESIS), result = new QSNode(QSNodeKind.PARAMETER_LIST, tok.index, -1); !this.tokIs(QSOperators.RIGHT_PARENTHESIS) && !this.tokIs(QSKeyWords.EOF) && (this.tryToSkipCommentNode(), 
        !this.tokIs(QSOperators.RIGHT_PARENTHESIS)) && (result.children.push(this.parseParameter()), 
        this.tryToSkipCommentNode(), !this.tokIs(QSOperators.RIGHT_PARENTHESIS)) && this.tokIs(QSOperators.COMMA); ) this.nextToken(!0);
        return this.tryToSkipCommentNode(), tok = this.consume(QSOperators.RIGHT_PARENTHESIS), 
        result.end = tok.end, result;
    }
    parseQualifiedName(skipPackage) {
        var tok = this.tok;
        let buffer = this.tok.text;
        for (this.nextToken(), buffer = this.parseInvalidQualifiedName(buffer, tok); this.tokIs(QSOperators.DOT) || this.tokIs(QSOperators.DOUBLE_COLUMN); ) buffer += this.tok.text, 
        this.nextToken(), buffer += this.tok.text, this.nextToken();
        return skipPackage ? buffer.substring(buffer.lastIndexOf(QSOperators.DOT) + 1) : buffer;
    }
    static isInvalidQualifiedName(name) {
        return "§" == name[0] && (1 == name.length || "§" != name[name.length - 1]);
    }
    parseInvalidQualifiedName(buffer, tok) {
        if (QSParser.isInvalidQualifiedName(buffer)) for (;QSParser.isInvalidQualifiedName(buffer); ) buffer += this.scn.contentByRange(tok.end, this.tok.end), 
        tok = this.tok, this.nextToken();
        return buffer;
    }
    parseRelationalExpression() {
        for (var result = new QSNode(QSNodeKind.RELATION, this.tok.index, -1, null, [ this.parseShiftExpression() ]); this.tokIs(QSOperators.INFERIOR) || this.tokIs(QSOperators.INFERIOR_OR_EQUAL) || this.tokIs(QSOperators.SUPERIOR) || this.tokIs(QSOperators.SUPERIOR_OR_EQUAL) || this.tokIs(QSKeyWords.IS) || this.tokIs(QSKeyWords.IN) && !this.isInFor || this.tokIs(QSKeyWords.AS) || this.tokIs(QSKeyWords.INSTANCE_OF); ) this.tokIs(QSKeyWords.AS) ? result.children.push(new QSNode(QSNodeKind.AS, this.tok.index, this.tok.end, this.tok.text)) : result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseShiftExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        1 < result.children.length ? result : result.children[0];
    }
    parseReturnStatement() {
        var result = new QSNode(QSNodeKind.RETURN, this.tok.index, this.tok.end), lostSemiColumn = (this.tryToParseCommentNode(), 
        this.nextToken(!0), this.tokIs(QSParser.NEW_LINE) || this.tokIs(QSOperators.RIGHT_CURLY_BRACKET));
        return this.tokIs(QSOperators.SEMI_COLUMN) || lostSemiColumn ? (lostSemiColumn || this.nextToken(!0), 
        result.text = "") : (lostSemiColumn = this.parseExpression(), result.end = lostSemiColumn.end, 
        result.children = [ lostSemiColumn ], this.skip(QSOperators.SEMI_COLUMN)), 
        result;
    }
    parseThrowStatement() {
        var tok = this.consume(QSKeyWords.THROW), expr = this.parseExpression();
        return new QSNode(QSNodeKind.THROW, tok.index, expr.end, null, [ expr ]);
    }
    parseBreakOrContinueStatement() {
        var pos, tok = this.tok;
        let kind;
        this.tokIs(QSKeyWords.BREAK) || this.tokIs(QSKeyWords.CONTINUE) ? (kind = this.tokIs(QSKeyWords.BREAK) ? QSNodeKind.BREAK : QSNodeKind.CONTINUE, 
        this.nextToken(!0)) : (pos = QSParser.getLineAndCharacterFromPosition(this.scn, this.tok.index, this.lineMap), 
        QSParser.throwError(new Error("unexpected token : " + this.tok.text + "(" + pos.line + "," + pos.col + ") expected: continue or break")));
        let ident;
        return this.tokIs(QSParser.NEW_LINE) || this.tokIs(QSParser.CARET_RETURN) || this.tokIs(QSOperators.SEMI_COLUMN) ? this.nextToken(!0) : /[\n\r]/g.test(this.scn.contentByRange(tok.index, this.tok.index)) || (ident = this.tryParse(() => {
            var expr = this.parsePrimaryExpression();
            if (expr.kind === QSNodeKind.IDENTIFIER && expr.text && QSScanner.isIdentifierCharacter(expr.text)) return expr;
            QSParser.throwError(new Error());
        })), pos = new QSNode(kind, tok.index, (ident || tok).end, ident && ident.text || ""), 
        this.skip(QSOperators.SEMI_COLUMN), pos;
    }
    parseShiftExpression() {
        for (var result = new QSNode(QSNodeKind.SHIFT, this.tok.index, -1, null, [ this.parseAdditiveExpression() ]); this.tokIs(QSOperators.DOUBLE_SHIFT_LEFT) || this.tokIs(QSOperators.DOUBLE_SHIFT_RIGHT) || this.tokIs(QSOperators.TRIPLE_SHIFT_LEFT) || this.tokIs(QSOperators.TRIPLE_SHIFT_RIGHT); ) result.children.push(new QSNode(QSNodeKind.OP, this.tok.index, this.tok.end, this.tok.text)), 
        this.nextToken(!0), result.children.push(this.parseAdditiveExpression());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        1 < result.children.length ? result : result.children[0];
    }
    parseSwitch() {
        var tok = this.consume(QSKeyWords.SWITCH), tok = new QSNode(QSNodeKind.SWITCH, tok.index, tok.end, null, [ this.parseCondition() ]);
        return this.tokIs(QSOperators.LEFT_CURLY_BRACKET) && (this.nextToken(), 
        tok.children.push(this.parseSwitchCases()), tok.end = this.consume(QSOperators.RIGHT_CURLY_BRACKET).end), 
        tok;
    }
    parseSwitchBlock() {
        for (var result = new QSNode(QSNodeKind.SWITCH_BLOCK, this.tok.index, this.tok.end); !(this.tokIs(QSKeyWords.CASE) || this.tokIs(QSKeyWords.DEFAULT) || this.tokIs(QSOperators.RIGHT_CURLY_BRACKET) || this.tokIs(QSKeyWords.EOF)); ) result.children.push(this.parseStatement());
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        result;
    }
    parseSwitchCases() {
        for (var result = new QSNode(QSNodeKind.CASES, this.tok.index, this.tok.end); this.tryToSkipCommentNode(), 
        !this.tokIs(QSOperators.RIGHT_CURLY_BRACKET); ) if (this.tokIs(QSKeyWords.CASE)) {
            for (var index = this.tok.index, expr = (this.nextToken(!0), this.parseExpression()), index = new QSNode(QSNodeKind.CASE, index, expr.end, null, [ expr ]); this.tokIs(QSOperators.COMMA); ) this.consume(QSOperators.COMMA), 
            result.children.push(this.parseExpression());
            this.consume(QSOperators.COLUMN);
            expr = this.parseSwitchBlock();
            index.children.push(expr), index.end = expr.end, result.children.push(index);
        } else if (this.tokIs(QSKeyWords.DEFAULT)) {
            let index = this.tok.index, caseNode = (this.nextToken(!0), this.consume(QSOperators.COLUMN), 
            new QSNode(QSNodeKind.CASE, index, -1, null, [ new QSNode(QSNodeKind.DEFAULT, index, this.tok.end, QSKeyWords.DEFAULT) ])), block = this.parseSwitchBlock();
            caseNode.end = block.end, caseNode.children.push(block), result.children.push(caseNode);
        }
        return result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), result.end), 
        result;
    }
    parseTraditionalFor(index) {
        this.consume(QSOperators.LEFT_PARENTHESIS), this.tryToSkipCommentNode();
        index = new QSNode(QSNodeKind.FOR, index, -1);
        if (!this.tokIs(QSOperators.SEMI_COLUMN) && (this.tryToSkipCommentNode(), 
        this.tokIs(QSKeyWords.VAR) ? index.children.push(this.parseVarList(null, null)) : (this.isInFor = !0, 
        index.children.push(this.parseExpressionList()), this.isInFor = !1), this.tokIs(QSKeyWords.IN))) return this.parseForIn(index);
        if (this.consume(QSOperators.SEMI_COLUMN), this.tryToSkipCommentNode(), 
        this.tokIs(QSOperators.SEMI_COLUMN) || (expr = this.parseExpression(), index.children.push(new QSNode(QSNodeKind.COND, expr.start, expr.end, null, [ expr ]))), 
        this.consume(QSOperators.SEMI_COLUMN), this.tryToSkipCommentNode(), !this.tokIs(QSOperators.RIGHT_PARENTHESIS)) {
            this.tryToSkipCommentNode();
            let expr = this.parseExpressionList();
            index.children.push(new QSNode(QSNodeKind.ITER, expr.start, expr.end, null, [ expr ]));
        }
        this.consume(QSOperators.RIGHT_PARENTHESIS);
        var expr = this.parseStatement();
        return index.children.push(expr), index.end = expr.end, index;
    }
    parseTry() {
        var index = this.tok.index, block = (this.nextToken(!0), this.parseBlock());
        return new QSNode(QSNodeKind.TRY, index, block.end, null, [ block ]);
    }
    parseType() {
        let result;
        var index, name;
        return result = this.tok.text === QSParser.VECTOR ? this.parseVector() : (index = this.tok.index, 
        name = this.parseQualifiedName(!1), new QSNode(QSNodeKind.TYPE, index, index + name.length, name));
    }
    parseUnaryExpressionNotPlusMinus() {
        let result;
        var index = this.tok.index, end = this.tok.end;
        if (this.tokIs(QSKeyWords.DELETE)) {
            this.nextToken(!0);
            var expr = this.parseUnaryExpressionNotPlusMinus();
            result = new QSNode(QSNodeKind.DELETE, index, expr.end, null, [ expr ]);
        } else if (this.tokIs(QSKeyWords.VOID)) if (this.nextToken(!0), this.tokIs(QSOperators.QUESTION_MARK) || this.tokIs(QSOperators.SEMI_COLUMN) || this.tokIs(QSOperators.COLUMN) || this.tokIs(QSOperators.COMMA) || this.tokIs(QSOperators.RIGHT_SQUARE_BRACKET) || this.tokIs(QSOperators.RIGHT_CURLY_BRACKET) || this.tokIs(QSOperators.RIGHT_PARENTHESIS) || this.tokIs(QSOperators.SUPERIOR) || this.tokIs(QSOperators.AND) || this.tokIs(QSOperators.LOGICAL_OR) || this.tokIs(QSOperators.EQUAL) || this.tokIs(QSOperators.DOUBLE_EQUAL) || this.tokIs(QSOperators.STRICTLY_EQUAL) || this.tokIs(QSOperators.NON_EQUAL) || this.tokIs(QSOperators.NON_STRICTLY_EQUAL)) result = new QSNode(QSNodeKind.VOID, index, end); else {
            let expr = this.parseUnaryExpressionNotPlusMinus();
            result = new QSNode(QSNodeKind.VOID, index, expr.end, null, [ expr ]);
        } else if (this.tokIs(QSKeyWords.TYPEOF)) {
            this.nextToken(!0);
            let expr = this.parseUnaryExpressionNotPlusMinus();
            result = new QSNode(QSNodeKind.TYPEOF, index, expr.end, null, [ expr ]);
        } else if (this.tokIs(QSOperators.LOGICAL_NOT) || this.tokIs("not")) {
            this.nextToken(!0);
            let expr = this.parseUnaryExpressionNotPlusMinus();
            result = new QSNode(QSNodeKind.NOT, index, expr.end, null, [ expr ]);
        } else if (this.tokIs("~")) {
            this.nextToken(!0);
            let expr = this.parseUnaryExpressionNotPlusMinus();
            result = new QSNode(QSNodeKind.B_NOT, index, expr.end, null, [ expr ]);
        } else result = this.parseUnaryPostfixExpression();
        return result;
    }
    parseUnaryPostfixExpression() {
        let node = this.parseAccessExpression();
        return this.tokIs(QSOperators.INCREMENT) ? node = this.parseIncrement(node) : this.tokIs(QSOperators.DECREMENT) && (node = this.parseDecrement(node)), 
        node;
    }
    parseAccessExpression() {
        let node = this.parsePrimaryExpression();
        for (this.tryToSkipCommentNode(); ;) if (this.tokIs(QSOperators.LEFT_PARENTHESIS)) node = this.parseFunctionCall(node); else if (this.tokIs(QSOperators.DOT) || this.tokIs(QSOperators.DOUBLE_COLUMN) || this.tokIs(QSOperators.DESCENDANT_ACCESSOR)) node = this.parseDot(node); else {
            if (!this.tokIs(QSOperators.LEFT_SQUARE_BRACKET)) break;
            node = this.parseArrayAccessor(node);
        }
        return node;
    }
    parseUse() {
        var tok = this.consume(QSKeyWords.USE), namespace = (this.consume(QSKeyWords.NAMESPACE), 
        this.parseNamespaceName()), tok = new QSNode(QSNodeKind.USE, tok.index, namespace.end);
        return tok.children.push(namespace), this.skip(QSOperators.SEMI_COLUMN), 
        tok;
    }
    parseDefaultXMLNamespace() {
        var tok = this.consume(QSKeyWords.DEFAULT), namespace = (this.consume("xml"), 
        this.consume(QSKeyWords.NAMESPACE), this.consume(QSOperators.EQUAL), this.parseNamespaceName()), tok = new QSNode(QSNodeKind.DEFAULT_XML_NAMESPACE, tok.index, namespace.end);
        return tok.children.push(namespace), tok.children.push(new QSNode(QSNodeKind.TYPE, -1, -1, "global.XML")), 
        this.skip(QSOperators.SEMI_COLUMN), tok;
    }
    parseVar() {
        var result = this.parseVarList(null, null);
        return this.skip(QSOperators.SEMI_COLUMN), result;
    }
    parseLocal() {
        var tok = this.consume(QSKeyWords.LOCAL), tok = new QSNode(QSNodeKind.LOCAL, tok.index, tok.end);
        return tok.children.push(this.parseAssignmentExpression()), this.skip(QSOperators.SEMI_COLUMN), 
        tok;
    }
    parseVarList(meta, modifiers) {
        var tok = this.tokIs(QSKeyWords.NAMESPACE) ? this.consume(QSKeyWords.NAMESPACE) : this.consume(QSKeyWords.VAR), result = new QSNode(QSNodeKind.VAR_LIST, tok.index, tok.end);
        return result.children.push(this.convertMeta(meta)), result.children.push(this.convertModifiers(modifiers)), 
        this.collectVarListContent(result, tok), result.start = result.children.reduce((index, child) => Math.min(index, child ? child.start : 1 / 0), tok.index), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), tok.end), 
        result;
    }
    parseVector() {
        var result = new QSNode(QSNodeKind.VECTOR, this.tok.index, -1, "");
        return this.tok.text === QSParser.VECTOR && this.nextToken(), this.tokIs(QSOperators.VECTOR_START) ? (this.consume(QSOperators.VECTOR_START), 
        this.tryToSkipCommentNode(), result.children.push(this.parseType()), result.end = this.consume(QSOperators.SUPERIOR).end) : result.end = result.start + QSParser.VECTOR.length, 
        result;
    }
    parseShortVector() {
        var vector = new QSNode(QSNodeKind.VECTOR, this.tok.index, -1, ""), arrayLiteral = (this.consume(QSOperators.INFERIOR), 
        this.tryToSkipCommentNode(), vector.children.push(this.parseType()), this.tryToSkipCommentNode(), 
        vector.end = this.consume(QSOperators.SUPERIOR).end, this.parseArrayLiteral());
        return new QSNode(QSNodeKind.SHORT_VECTOR, vector.start, arrayLiteral.end, null, [ vector, arrayLiteral ]);
    }
    parseWhile() {
        var tok = this.consume(QSKeyWords.WHILE), result = new QSNode(QSNodeKind.WHILE, tok.index, tok.end);
        return result.children.push(this.parseCondition()), result.children.push(this.parseStatement()), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), tok.end), 
        result;
    }
    parseButton() {
        var tok = this.consume(QSKeyWords.BUTTON), result = new QSNode(QSNodeKind.BUTTON, tok.index, tok.end);
        return result.children.push(this.parseArgumentList()), result.children.push(this.parseStatement()), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), tok.end), 
        result;
    }
    parseWith() {
        var tok = this.consume(QSKeyWords.WITH), result = new QSNode(QSNodeKind.WITH, tok.index, tok.end);
        return result.children.push(this.parseCondition()), result.children.push(this.parseStatement()), 
        result.end = result.children.reduce((index, child) => Math.max(index, child ? child.end : 0), tok.end), 
        result;
    }
    setFileName(fileNameToParse) {
        this.fileName = fileNameToParse;
    }
    skip(text) {
        return !!this.tokIs(text) && (this.nextToken(), !0);
    }
    tokIs(text) {
        return this.tok.text === text;
    }
    tryToParseCommentNode() {
        let found = !1;
        return this.tok.text.startsWith(QSParser.ASDOC_COMMENT) ? (this.currentAsDoc = new QSNode(QSNodeKind.AS_DOC, this.tok.index, -1, this.tok.text), 
        found = !0) : this.tok.text.startsWith(QSParser.MULTIPLE_LINES_COMMENT) && (this.currentMultiLineComment = new QSNode(QSNodeKind.MULTI_LINE_COMMENT, this.tok.index, -1, this.tok.text), 
        found = !0), found;
    }
    tryToSkipCommentNode() {
        for (;this.tok.text.startsWith(QSParser.ASDOC_COMMENT); ) this.nextToken();
        for (;this.tok.text.startsWith(QSParser.MULTIPLE_LINES_COMMENT); ) this.nextToken();
    }
    attachCurrentDocsAndComments(result) {
        null != this.currentAsDoc && (result.children.push(this.currentAsDoc), this.currentAsDoc = null), 
        null != this.currentMultiLineComment && (result.children.push(this.currentMultiLineComment), 
        this.currentMultiLineComment = null);
    }
    static isAnyLineBreakCharacter(c) {
        return c === QSParser.LINE_FEED || c === QSParser.CARRIAGE_RETURN || c === QSParser.NEXT_LINE || c === QSParser.LINE_SEPARATOR || c === QSParser.PARAGRAPH_SEPARATOR;
    }
    static getLengthOfLineBreak(text, index) {
        var c = text.charCodeAt(index);
        return c > QSParser.CARRIAGE_RETURN && c <= 127 ? 0 : c === QSParser.CARRIAGE_RETURN ? (index = index + 1) < text.length && QSParser.LINE_FEED === text.charCodeAt(index) ? 2 : 1 : QSParser.isAnyLineBreakCharacter(c) ? 1 : 0;
    }
    static buildLineMap(text) {
        var result, length = text.length;
        if (0 === length) return (result = []).push(0), result;
        let position = 0, index = 0;
        var arrayBuilder = [];
        let lineNumber = 0;
        for (;index < length; ) {
            var c = text.charCodeAt(index);
            let lineBreakLength;
            13 < c && c <= 127 ? index++ : 0 === (lineBreakLength = 13 === c && index + 1 < length && 10 === text.charCodeAt(index + 1) ? 2 : 10 === c ? 1 : QSParser.getLengthOfLineBreak(text, index)) ? index++ : (arrayBuilder.push(position), 
            index += lineBreakLength, position = index, lineNumber++);
        }
        return arrayBuilder.push(position), arrayBuilder;
    }
    static getLineAndCharacterFromPosition(scn, position, lineStarts) {
        (!scn || position < 0 || position > scn.length) && QSParser.throwError(new Error("invalid position " + position));
        let lineNumber = -1;
        if (position === scn.length) lineNumber = lineStarts.length - 1; else {
            for (let i = 0; i < lineStarts.length && !(lineStarts[i] > position); i++) lineNumber = i;
            lineNumber = 0 < lineNumber ? lineNumber : 0;
        }
        return {
            line: lineNumber,
            col: position - lineStarts[lineNumber]
        };
    }
}

class QSScope {
    constructor(parent = null, globalVars = {}, localVars = {}, skipErrors = !1) {
        this.localVars = localVars, this.globalVars = globalVars, (this.parent = parent) && (this.globalVars = this.parent.globalVars), 
        this.skipErr = skipErrors;
    }
    isVar(name) {
        return name in this.localVars || (this.parent ? this.parent.isVar(name) : name in this.globalVars);
    }
    getVarValue(name) {
        return name in this.localVars ? this.localVars[name] : this.parent ? this.parent.getVarValue(name) : name in this.globalVars ? this.globalVars[name] : void 0;
    }
    setVarValue(name, val) {
        name in this.localVars ? this.localVars[name] = val : this.parent ? this.parent.setVarValue(name, val) : name in this.globalVars && (this.globalVars[name] = val);
    }
    newGlobalVar(name, val = void 0) {
        return this.globalVars[name] = val;
    }
    newLocalVar(name, val = void 0) {
        return this.localVars[name] = val;
    }
    static deepCloneVal(val) {
        return null == val || "object" != typeof val && !Array.isArray(val) ? val : JSON.parse(JSON.stringify(val));
    }
    cloneLocals(locals = {}) {
        for (var v in this.localVars) v in locals || (locals[v] = QSScope.deepCloneVal(this.localVars[v]));
        return this.parent && this.parent.cloneLocals(locals), locals;
    }
    skipErrors() {
        return this.skipErr;
    }
    skip() {
        let offset = "";
        return this.parent && (offset += "   " + this.parent.skip()), offset;
    }
}

class QSEvaluator {
    constructor(debug = null, functions = {}) {
        this.debug = debug, this.functions = functions, this.evalFactory = {
            [QSNodeKind.BLOCK]: this.evalBlock,
            [QSNodeKind.SWITCH_BLOCK]: this.evalBlock,
            [QSNodeKind.ASSIGN]: this.evalAssign,
            [QSNodeKind.LOCAL]: this.evalLocal,
            [QSNodeKind.ADD]: this.evalAdd,
            [QSNodeKind.MINUS]: this.evalMinus,
            [QSNodeKind.MULTIPLICATION]: this.evalMult,
            [QSNodeKind.MODULO]: this.evalModulo,
            [QSNodeKind.DIVISION]: this.evalDiv,
            [QSNodeKind.RELATION]: this.evalRelation,
            [QSNodeKind.EQUALITY]: this.evalEquality,
            [QSNodeKind.NON_EQUAL]: this.evalNonEquality,
            [QSNodeKind.AND]: this.evalAnd,
            [QSNodeKind.OR]: this.evalOr,
            [QSNodeKind.NOT]: this.evalNot,
            [QSNodeKind.ENCAPSULATED]: this.evalEncapsulated,
            [QSNodeKind.LITERAL]: this.evalLiteral,
            [QSNodeKind.REGEXP_LITERAL]: this.evalRegexpLiteral,
            [QSNodeKind.IF]: this.evalIf,
            [QSNodeKind.WHILE]: this.evalWhile,
            [QSNodeKind.FORIN]: this.evalForIn,
            [QSNodeKind.SWITCH]: this.evalSwitch,
            [QSNodeKind.BUTTON]: this.evalButton,
            [QSNodeKind.CALL]: this.evalCall,
            [QSNodeKind.IDENTIFIER]: this.evalIdentifier,
            [QSNodeKind.CONDITION]: this.evalCondition,
            [QSNodeKind.CONDITIONAL]: this.evalConditional,
            [QSNodeKind.CONCAT]: this.evalConcat,
            [QSNodeKind.POST_INC]: this.evalPostInc,
            [QSNodeKind.POST_DEC]: this.evalPostDec,
            [QSNodeKind.OBJECT]: this.evalObject,
            [QSNodeKind.ARRAY]: this.evalArray,
            [QSNodeKind.NAME]: this.evalName,
            [QSNodeKind.VALUE]: this.evalValue,
            [QSNodeKind.ARRAY_ACCESSOR]: this.evalArrayAcc,
            [QSNodeKind.DOT]: this.evalDot,
            [QSNodeKind.BREAK]: this.evalBreak,
            [QSNodeKind.CONTINUE]: this.evalContinue
        };
    }
    run(ast, scope, script = null) {
        return this.script = script, this.evalNode(ast, scope);
    }
    nodeScript(node) {
        return this.script.substring(node.start, node.end).trim();
    }
    evalNode(node, scope) {
        var nodeEval;
        if (!(this.wasInterrupt || this.wasBreak || this.wasContinue)) return (nodeEval = this.evalFactory[node.kind]) ? nodeEval.bind(this)(node, scope) : (this.evalError(scope, "evalNode: can't evaluate node with kind: " + node.kind), 
        null);
    }
    interrupt() {
        this.wasInterrupt = !0;
    }
    evalBlock(node, scope) {
        var childNode, blockScope = new QSScope(scope);
        let val = void 0;
        for (childNode of node.children) val = this.evalNode(childNode, blockScope);
        return val;
    }
    evalFunction(node, scope) {
        var name = node.text;
        null != this.functions.global[name] ? this.evalError(scope, `function with name: ${name} already defined`) : this.functions.global[name] = node;
    }
    evalCall(node, scope) {
        this.debug.add(`${scope.skip()}<span class='qubot-blue2'>${this.nodeScript(node)}</span>`);
        var funcArgs = node.children[1].children, node = node.children[0];
        let res = void 0;
        if (node.kind == QSNodeKind.IDENTIFIER) {
            var globalFuncName = node.text, func = this.functions.global[globalFuncName];
            res = func ? this.callFunc(func, scope, null, funcArgs) : void this.evalError(scope, "evalCall: unknown function name: " + globalFuncName);
        } else if (node.kind == QSNodeKind.DOT) {
            globalFuncName = this.evalNode(node.children[0], scope), node = node.children[1].text;
            if (globalFuncName instanceof Array) {
                let func = this.functions.array[node];
                res = func ? this.callFunc(func, scope, globalFuncName, funcArgs) : void this.evalError(scope, `evalCall: unknown function name: ${node} for array`);
            } else if ("string" == typeof globalFuncName) {
                let func = this.functions.string[node];
                res = func ? this.callFunc(func, scope, globalFuncName, funcArgs) : void this.evalError(scope, `evalCall: unknown function name: ${node} for string`);
            } else "object" == typeof globalFuncName && (this.evalError(scope, `evalCall: unknown function name: ${node} for dictionary`), 
            res = void 0);
        }
        return void 0 !== res ? this.debug.add(`<span class='qubot-small'>: ${this.toDebug(res)}</span><br>`) : this.debug.add("<br>"), 
        res;
    }
    evalArgs(args, scope) {
        var arg, argVals = [];
        for (arg of args) {
            var argVal = this.evalNode(arg, scope);
            argVals.push(argVal);
        }
        return argVals;
    }
    callFunc(func, scope, obj, args) {
        return "function" == typeof func ? this.callFuncNative(func, scope, obj, args) : this.callFuncQS(func, scope, args);
    }
    callFuncNative(func, scope, obj, args) {
        return obj || "string" == typeof obj ? func(this, scope, obj, args) : func(this, scope, args);
    }
    callFuncQS(self, func, scope, args) {
        var params = func.children[0], localVars = (params.children.length, {}), argVals = this.evalArgs(args, scope);
        for (let i = 0; i < params.children.length; i++) param = param.children[i], 
        localVars[paramName = this.evalNode(param.children[i], scope)] = argVals[i];
        args = QSScope(scope, {}, localVars), func = func.children[1];
        return this.evalNode(func, args);
    }
    evalLiteral(node, scope) {
        node = node.text;
        switch (node) {
          case QSKeyWords.TRUE:
            return !0;

          case QSKeyWords.FALSE:
            return !1;

          case QSKeyWords.NONE:
            return;
        }
        let val = void 0;
        return val = /['"`]/.test([ node[0] ]) ? node.substring(1, node.length - 1) : parseFloat(node);
    }
    evalRegexpLiteral(node, scope) {
        node = node.text;
        return new RegExp(node.substring(1, node.length - 1));
    }
    evalIdentifier(node, scope) {
        var varName = node.text;
        if (scope.isVar(varName)) return scope.getVarValue(node.text);
        this.evalError(scope, "evalIdentifier: unknown identifier: " + node.text);
    }
    evalObject(node, scope) {
        var propNode, obj = {};
        for (propNode of node.children) {
            let propName = this.evalNode(propNode.children[0], scope);
            var propValue = this.evalNode(propNode.children[1], scope);
            obj[propName = propName.startsWith("'") || propName.startsWith('"') ? propName.substring(1, propName.length - 1) : propName] = propValue;
        }
        return obj;
    }
    evalName(node, scope) {
        return node.text;
    }
    evalValue(node, scope) {
        return this.evalNode(node.children[0], scope);
    }
    evalArray(node, scope) {
        var childNode, arr = [];
        for (childNode of node.children) arr.push(this.evalNode(childNode, scope));
        return arr;
    }
    evalArrayAcc(node, scope) {
        var obj = this.evalNode(node.children[0], scope);
        if (obj) {
            let objKey = this.evalNode(node.children[1], scope);
            return Array.isArray(obj) ? (objKey = objKey < 0 ? obj.length + objKey : objKey) >= obj.length ? void 0 : obj[objKey] : "object" == typeof obj ? obj[objKey] : "string" == typeof obj ? Number.isInteger(objKey) ? obj[objKey] : void this.evalError(scope, `evalArrayAcc: unsuported accessor type: ('${typeof obj}')`) : void 0;
        }
    }
    evalDot(node, scope) {
        var obj = this.evalNode(node.children[0], scope), node = node.children[1].text;
        if (void 0 === obj) this.evalError(scope, `evalDot: cannot read properties of undefined (reading '${node}')`); else if (obj instanceof Array) {
            var func = this.functions.array[node];
            if (func) return this.callFunc(func, scope, obj, []);
            this.evalError(scope, "evalDot: unknown getter with name: " + node);
        } else if ("string" == typeof obj || obj instanceof String) {
            let func = this.functions.string[node];
            if (func) return this.callFunc(func, scope, obj, []);
            this.evalError(scope, "evalDot: unknown getter with name: " + node);
        } else if ("object" == typeof obj) {
            if (obj) return obj[node];
            this.evalError(scope, "evalDot: object is null");
        } else this.evalError(scope, "evalDot: object has incorrect type");
    }
    evalAssign(node, scope) {
        var leftNode = node.children[0], op = node.children[1].text, rightNode = node.children[2], rightNode = this.evalNode(rightNode, scope), isLocal = node.parent && node.parent.kind == QSNodeKind.LOCAL;
        this.debug.add(`${isLocal ? "" : scope.skip()}<span class='qubot-blue2'>${this.nodeScript(node)}</span>`);
        let result = void 0;
        if (leftNode.kind == QSNodeKind.IDENTIFIER) {
            node = leftNode.text, isLocal = (isLocal ? scope.newLocalVar(node) : scope.isVar(node) || scope.newGlobalVar(node), 
            scope.getVarValue(node)), isLocal = this.applyAssign(isLocal, op, rightNode);
            scope.setVarValue(node, isLocal), result = isLocal;
        } else if (leftNode.kind == QSNodeKind.ARRAY_ACCESSOR) {
            node = this.evalNode(leftNode.children[0], scope);
            if (void 0 === node) return;
            isLocal = this.evalNode(leftNode.children[1], scope);
            node[isLocal] = this.applyAssign(node[isLocal], op, rightNode), result = node[isLocal];
        } else if (leftNode.kind == QSNodeKind.DOT) {
            node = this.evalNode(leftNode.children[0], scope);
            if (void 0 === node) return;
            isLocal = leftNode.children[1].text;
            node[isLocal] = this.applyAssign(node[isLocal], op, rightNode), result = node[isLocal];
        }
        return this.debug.add(`<span class='qubot-small'>: ${this.toDebug(result)}</span><br>`), 
        result;
    }
    evalLocal(node, scope) {
        this.debug.add(scope.skip() + "<span class='qubot-blue2'>local </span>");
        var initNode = node.children[0], node = (initNode.parent = node, this.evalNode(initNode, scope));
        return node;
    }
    applyAssign(val, op, newVal) {
        switch (op) {
          case QSOperators.EQUAL:
            val = newVal;
            break;

          case QSOperators.PLUS_EQUAL:
            val += newVal;
            break;

          case QSOperators.MINUS_EQUAL:
            val -= newVal;
            break;

          case QSOperators.TIMES_EQUAL:
            val *= newVal;
            break;

          case QSOperators.DIVIDED_EQUAL:
            val /= newVal;
            break;

          case QSOperators.MODULO_EQUAL:
            val %= newVal;
            break;

          case QSOperators.AND_EQUAL:
            val &= newVal;
            break;

          case QSOperators.OR_EQUAL:
            val |= newVal;
            break;

          case QSOperators.XOR_EQUAL:
            val ^= newVal;
        }
        return val;
    }
    evalEncapsulated(node, scope) {
        return this.evalNode(node.children[0], scope);
    }
    evalRelation(node, scope) {
        var left = this.evalNode(node.children[0], scope), op = node.children[1].text, right = this.evalNode(node.children[2], scope);
        switch (op) {
          case QSOperators.SUPERIOR:
            return right < left;

          case QSOperators.SUPERIOR_OR_EQUAL:
            return right <= left;

          case QSOperators.INFERIOR:
            return left < right;

          case QSOperators.INFERIOR_OR_EQUAL:
            return left <= right;

          case QSOperators.DOUBLE_EQUAL:
            return left == right;

          case QSOperators.IN:
            return Array.isArray(right) ? -1 != right.indexOf(left) : "object" == typeof right ? left in right : void this.evalError(scope, "evalIn: object has incorrect type");
        }
    }
    evalEquality(node, scope) {
        return this.evalNode(node.children[0], scope) == this.evalNode(node.children[2], scope);
    }
    evalNonEquality(node, scope) {
        return this.evalNode(node.children[0], scope) != this.evalNode(node.children[2], scope);
    }
    evalAdd(node, scope) {
        let val = 0, wasOp = !1;
        for (let i = 0; i < node.children.length; i++) node.children[i].kind == QSNodeKind.OP ? wasOp = !0 : val = wasOp ? val + this.evalNode(node.children[i], scope) : this.evalNode(node.children[i], scope);
        return val;
    }
    evalConcat(node, scope) {
        let val = "";
        for (let i = 0; i < node.children.length; i++) node.children[i].kind != QSNodeKind.OP && (val += this.evalNode(node.children[i], scope));
        return val;
    }
    evalMinus(node, scope) {
        let val = 0, wasOp = !1;
        for (let i = 0; i < node.children.length; i++) node.children[i].kind == QSNodeKind.OP ? wasOp = !0 : val = wasOp ? val - this.evalNode(node.children[i], scope) : this.evalNode(node.children[i], scope);
        return wasOp || (val *= -1), val;
    }
    evalMult(node, scope) {
        let res = 1;
        for (let i = 0; i < node.children.length; i++) if (node.children[i].kind != QSNodeKind.OP) {
            var val = this.evalNode(node.children[i], scope);
            if (null == val) return void this.evalError(scope, `evalMult: '*' operand: ${this.nodeScript(node.children[i])} is null`);
            res *= val;
        }
        return res;
    }
    evalModulo(node, scope) {
        let val = this.evalNode(node.children[0], scope);
        for (let i = 1; i < node.children.length; i++) {
            if (!val) return val;
            node.children[i].kind != QSNodeKind.OP && (val %= this.evalNode(node.children[i], scope));
        }
        return val;
    }
    evalDiv(node, scope) {
        let val = this.evalNode(node.children[0], scope);
        for (let i = 1; i < node.children.length; i++) node.children[i].kind != QSNodeKind.OP && (val /= this.evalNode(node.children[i], scope));
        return val;
    }
    evalAnd(node, scope) {
        let res = this.evalNode(node.children[0], scope) && !0;
        for (let i = 1; i < node.children.length; i++) {
            if (!res) return res;
            var val;
            node.children[i].kind != QSNodeKind.OP && (val = this.evalNode(node.children[i], scope), 
            res = res && val);
        }
        return res;
    }
    evalOr(node, scope) {
        let res = this.evalNode(node.children[0], scope) && !0;
        for (let i = 1; i < node.children.length; i++) {
            if (res) return res;
            var val;
            node.children[i].kind != QSNodeKind.OP && (val = this.evalNode(node.children[i], scope), 
            res = res || val);
        }
        return res;
    }
    evalNot(node, scope) {
        return !this.evalNode(node.children[0], scope);
    }
    evalCondition(node, scope) {
        return this.evalNode(node.children[0], scope);
    }
    evalConditional(node, scope) {
        var cond = this.evalNode(node.children[0], scope);
        return this.evalNode(node.children[cond ? 1 : 2], scope);
    }
    evalIf(node, scope) {
        var condNode = node.children[0], thenBlockNode = node.children[1], node = 2 < node.children.length ? node.children[2] : void 0, condResult = this.evalNode(condNode, scope);
        this.debug.add(`${scope.skip()}<span class='qubot-blue2'>if ${this.nodeScript(condNode)}: </span> `), 
        this.debug.add(`<span class='qubot-small'> ${this.toDebug(condResult)}</span><br>`), 
        condResult ? this.evalNode(thenBlockNode, scope) : node && this.evalNode(node, scope);
    }
    evalWhile(node, scope) {
        var condNode = node.children[0], blockNode = node.children[1];
        this.debug.add(`${scope.skip()}<span class='qubot-blue2'>while ${this.nodeScript(condNode)}: </span><br>`);
        let iter = 0;
        for (;this.evalNode(condNode, scope); ) {
            if (this.debug.add(`${scope.skip()}<span class='qubot-small'> iter ${iter++}:</span><br>`), 
            this.evalNode(blockNode, scope), 1e3 < iter) {
                this.evalError(scope, "evalWhile: maximum iterations was reached");
                break;
            }
            if (this.wasBreak) {
                this.wasBreak = !1;
                break;
            }
            this.wasContinue && (this.wasContinue = !1);
        }
    }
    evalForIn(node, scope) {
        this.debug.add(scope.skip() + "<span class='qubot-blue2'>for: </span><br>");
        let iterValName = void 0, iterKeyName = void 0;
        var localScope = new QSScope(scope), obj = (node.children[0].kind == QSNodeKind.IDENTIFIER ? iterValName = node.children[0].text : node.children[0].kind == QSNodeKind.EXPR_LIST && (iterKeyName = node.children[0].children[0].text, 
        iterValName = node.children[0].children[1].text, localScope.newLocalVar(iterKeyName)), 
        localScope.newLocalVar(iterValName), this.evalNode(node.children[1].children[0], scope)), blockNode = node.children[2];
        if (obj) for (var key in obj) {
            var val = obj[key];
            if (iterKeyName ? (this.debug.add(`${scope.skip()}<span class='qubot-small'> ${iterKeyName}: ${key}, ${iterValName}: ${this.toDebug(val)}:</span><br>`), 
            localScope.setVarValue(iterKeyName, +key)) : this.debug.add(`${scope.skip()}<span class='qubot-small'> iter: ${key}, ${iterValName}: ${this.toDebug(val)}:</span><br>`), 
            localScope.setVarValue(iterValName, val), this.evalNode(blockNode, localScope), 
            this.wasBreak) {
                this.wasBreak = !1;
                break;
            }
            this.wasContinue && (this.wasContinue = !1);
        }
    }
    evalSwitch(node, scope) {
        var caseNode, condNode = node.children[0], condResult = this.evalNode(condNode, scope), condNode = (this.debug.add(`${scope.skip()}<span class='qubot-blue2'>switch ${this.nodeScript(condNode)}: </span> `), 
        this.debug.add(`<span class='qubot-small'> ${this.toDebug(condResult)}</span><br>`), 
        node.children[1]);
        let switched = !1;
        for (caseNode of condNode.children) {
            var caseValNode = caseNode.children[0];
            if (caseValNode.kind != QSNodeKind.DEFAULT) {
                caseValNode = this.evalNode(caseValNode, scope);
                if (condResult != caseValNode && !switched) continue;
                this.debug.add(scope.skip() + `<span class='qubot-small'>case ${caseValNode}:</span><br>`);
            } else this.debug.add(scope.skip() + "<span class='qubot-small'>default:</span><br>");
            switched = !0;
            caseValNode = caseNode.children[1];
            if (this.evalNode(caseValNode, scope), this.wasBreak) {
                this.wasBreak = !1;
                break;
            }
        }
    }
    evalButton(node, scope) {
        this.debug.add(scope.skip() + "<span class='qubot-blue2'>button</span>");
        var funcArgs = node.children[0].children, funcArgs = this.evalArgs(funcArgs, scope), node = (this.debug.add(`<span class='qubot-small'>: ${this.toDebug(funcArgs)}:</span><br>`), 
        node.children[1]), node = this.nodeScript(node), blockLocals = scope.cloneLocals(), func = this.functions.global.button;
        return this.callFunc(func, scope, null, [ funcArgs[0], node, blockLocals ]);
    }
    setNodeValue(node, val, scope) {
        var varName;
        node.kind == QSNodeKind.IDENTIFIER ? (varName = node.text, scope.isVar(node.text) ? scope.setVarValue(varName, val) : this.evalError(scope, "setNodeValue: unknown identifier " + node.text)) : node.kind == QSNodeKind.ARRAY_ACCESSOR ? this.evalNode(node.children[0], scope)[this.evalNode(node.children[1], scope)] = val : node.kind == QSNodeKind.DOT && (this.evalNode(node.children[0], scope)[node.children[1].text] = val);
    }
    evalPostInc(node, scope) {
        var val = this.evalNode(node.children[0], scope), res = val;
        if (null != val) return this.setNodeValue(node.children[0], ++val, scope), 
        res;
        this.evalError(scope, "evalPostInc: unknown identifier");
    }
    evalPostDec(node, scope) {
        var val = this.evalNode(node.children[0], scope), res = val;
        if (null != val) return this.setNodeValue(node.children[0], --val, scope), 
        res;
        this.evalError(scope, "evalPostDec: unknown identifier");
    }
    evalBreak(node, scope) {
        this.wasBreak = !0;
    }
    evalContinue(node, scope) {
        this.wasContinue = !0;
    }
    evalError(scope, err) {
        scope.skipErrors() || (this.debug.add(`<br><span class="qubot-red">${scope.skip()}${err}</span><br>`), 
        console.log(err));
    }
    toDebug(val) {
        return void 0 === val ? "none" : (Array.isArray(val) || "object" == typeof val ? val = JSON.stringify(val) : "string" == typeof val && (val = `'${val}'`), 
        val);
    }
}

class QS {
    static evalScript(script, scope = null, functions = {}, debug = null) {
        var ast = QS.compileScript(script + " " + QSKeyWords.EOF, debug);
        if (ast) return QS.evalAST(ast, scope, functions, script, debug);
    }
    static evalExpr(script, scope = null, functions = {}, debug = null) {
        var ast = QS.compileExpr(script + " " + QSKeyWords.EOF, debug);
        if (ast) return QS.evalAST(ast, scope, functions, script, debug);
    }
    static evalAST(ast, scope = null, functions = {}, script = null, debug = null) {
        return scope = scope || new QSScope(), new QSEvaluator(debug, functions).run(ast, scope, script);
    }
    static compileScript(script, debug = null) {
        return new QSParser(debug).buildScript(script);
    }
    static compileExpr(script, debug = null) {
        return new QSParser(debug).buildExpression(script);
    }
}

class QuBotLocalMessages {
    constructor() {
        this.init();
    }
    init() {
        this.messages = [], this.newMessage({});
    }
    newMessage(params) {
        this.message = this.copyParams(params), this.message.content = [], this.messages.push(this.message);
    }
    clearMessages(cnt) {
        cnt = parseInt(cnt), this.message.clear = cnt;
    }
    addContent(content) {
        this.message.content.push(content);
    }
    curContent() {
        return 0 == this.message.content.length ? null : this.message.content[this.message.content.length - 1];
    }
    addText(text, params) {
        params = this.copyParams(params);
        params.type = "text", params.text = text, this.addContent(params);
    }
    addRow() {
        this.curContent() && "buttons" == this.curContent().type || this.addContent({
            type: "buttons",
            buttons: []
        }), this.curContent().buttons.push([]);
    }
    addButton(text, btn, btnIndex) {
        let content = this.curContent();
        content && "buttons" == content.type || (this.addRow(), content = this.curContent());
        var buttons = content.buttons, btn = this.copyParams(btn);
        return btn.button = text, btn.callback = btnIndex, buttons[buttons.length - 1].push(btn), 
        btn;
    }
    addImagesRow() {
        this.curContent() && "images" == this.curContent().type || this.addContent({
            type: "images",
            images: []
        }), this.curContent().images.push([]);
    }
    addImage(params) {
        let content = this.curContent();
        content && "images" == content.type || (this.addImagesRow(), content = this.curContent());
        var images = content.images;
        images[images.length - 1].push(this.copyParams(params));
    }
    appendMedia(params, type) {
        params = this.copyParams(params);
        params.type = type, this.addContent(params);
    }
    appendMap(params) {
        params = this.copyParams(params);
        params.type = "map", this.addContent(params);
    }
    addAnswer(answer) {
        this.newMessage({
            user: !0
        }), this.addText(answer), this.newMessage({});
    }
    inputKind(item) {
        var {
            actions: item,
            kind,
            params
        } = item;
        item.length && (this.message.input = {
            kind: kind
        }, params) && (this.message.input = {
            ...this.message.input,
            params: {
                ...params
            }
        });
    }
    copyParams(params) {
        var copy = {};
        return Object.assign(copy, params), copy;
    }
    get() {
        return this.messages;
    }
    clear() {
        this.init();
    }
}

class QuBotLocalExtractor {
    constructor() {
        this.regexs = {
            int: /[+-]?[0-9]*$/,
            float: /[+-]?\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/,
            email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
            http: /\b[A-Za-z0-9._-]+\.[A-Z|a-z]{2,4}[/\?A-Za-z0-9._-|%|\=]*\b/,
            phone: /(?:[\(]?[ ]?\d[ \-\.\)]?){10,12}(?![\w%&@\-])/,
            date1: /\b(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})\b/,
            date2: /\b(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})\b/,
            time: /\b(\d{1,2})[:\-\.](\d{1,2})([:\-\.](\d{1,2}))?\b/
        };
    }
    extractData(text, args) {
        var i, res = [];
        let x = "", pos;
        for (i in args) {
            var arg = args[i];
            if ("DDMMYYYY" === arg) x = this.extractDate(text, res); else if ("MMDDYYYY" === arg) x = this.extractDate(text, res, !1); else if ("time" === arg) x = this.extractTime(text, res); else if (arg in this.regexs) {
                var arr = this.regexs[arg].exec(text);
                if (x = arr && arr[0], null == arr) res.push(null); else {
                    let val = arr[0];
                    "int" === arg ? val = parseInt(val) : "float" === arg && (val = parseFloat(val)), 
                    res.push(val);
                }
            } else res.push(null);
            x && (pos = text.indexOf(x), text = text.substring(0, pos) + text.substring(pos + x.length));
        }
        return res;
    }
    extractDate(text, res, dayFirst = !0) {
        let arr = this.regexs.date1.exec(text), dd, mm, yyyy;
        if (arr ? (dd = parseInt(arr[1]), mm = parseInt(arr[2]), yyyy = parseInt(arr[3])) : (arr = this.regexs.date2.exec(text)) && (yyyy = parseInt(arr[1]), 
        dd = parseInt(arr[2]), mm = parseInt(arr[3])), arr) {
            if (dayFirst || (text = mm, mm = dd, dd = text), 12 < mm && dd <= 12) {
                let t = mm;
                mm = dd, dd = t;
            }
            return dd < 1 || 31 < dd || mm < 1 || 12 < mm ? res.push(null) : (dd = dd < 10 ? "0" + dd : "" + dd, 
            mm = mm < 10 ? "0" + mm : "" + mm, res.push(yyyy + "-" + mm + "-" + dd)), 
            arr && arr[0];
        }
        res.push(null);
    }
    extractTime(text, res) {
        text = this.regexs.time.exec(text);
        if (text && 2 < text.length) {
            var hh = parseInt(text[1]), mm = parseInt(text[2]);
            if (24 < hh || 59 < mm) return void res.push(null);
            res.push((hh < 10 ? "0" + hh : "" + hh) + ":" + (mm < 10 ? "0" + mm : "" + mm));
        } else res.push(null);
        return text && text[0];
    }
}

class QuBotLocalNLU {
    constructor() {
        this.intents = {}, this.vocab = null, this.words = null, this.vocabLen = null, 
        this.futures = null, this.ngramWords = 3, this.ngramChars = 3, this.replaces = [ [ /\bisn't\b/, " is not " ], [ /\baren't\b/, " are not " ], [ /\bwasn't\b/, " was not " ], [ /\bweren't\b/, " were not " ], [ /\bdon't\b/, " do not " ], [ /\bdidn't\b/, " did not " ], [ /\bdoesn't\b/, " does not " ], [ /\bhaven't\b/, " have not " ], [ /\bhadn't\b/, " had not " ], [ /\bhasn't\b/, " has not " ], [ /\bcan't\b/, " can not " ], [ /\bmustn't\b/, " must not " ], [ /\bcouldn't\b/, " could not " ], [ /\bcouldn't\b/, " could not " ], [ /\bshouldn't\b/, " should not " ], [ /\bwouldn't\b/, " would not " ], [ /\bneedn't\b/, " need not " ], [ /\bwon't\b/, " will not " ] ];
    }
    createVocab() {
        for (var intent in this.vocab = {}, this.words = {}, this.intents) {
            var lang, examples = this.intents[intent];
            for (lang in examples) {
                var sents = examples[lang].split(/;+/);
                examples[lang] = [];
                for (let i = 0; i < sents.length; i++) {
                    var tokens = this.tokenize(sents[i]);
                    examples[lang].push(tokens);
                }
            }
        }
        for (let intent in this.intents) {
            let examples = this.intents[intent];
            for (let lang in examples) {
                lang in this.vocab || (this.vocab[lang] = {}, this.words[lang] = []);
                var voc = this.vocab[lang];
                let sents = examples[lang];
                for (let i = 0; i < sents.length; i++) {
                    var words = this.tokensToWords(sents[i]);
                    for (let j = 0; j < words.length; j++) {
                        var w = words[j];
                        w in voc ? voc[w].num++ : voc[w] = {
                            id: 0,
                            num: 1
                        };
                    }
                }
            }
        }
        this.vocabLen = {};
        for (let lang in this.vocab) {
            let voc = this.vocab[lang], wrds = this.words[lang], id = 0;
            for (let w in voc) voc[w].id = id, wrds.push(w), id++;
            this.vocabLen[lang] = id;
        }
    }
    tokensToWords(words) {
        var res = [];
        for (let i = 0; i < words.length; i++) res.push(words[i]);
        for (let n = 1; n < this.ngramWords; n++) for (let i = 0; i < words.length - n; i++) {
            let w = words[i];
            for (let j = 1; j <= n; j++) w += " " + words[i + j];
            res.push(w);
        }
        if (this.ngramChars) for (let i = 0; i < words.length; i++) {
            var word = words[i];
            if (word.length > this.ngramChars) for (let j = 0; j < word.length - this.ngramChars + 1; j++) {
                var w = word.substring(j, j + this.ngramChars), w = (0 == j ? "^" : "~") + w;
                w += j === word.length - this.ngramChars ? "#" : "~", res.push(w);
            }
        }
        return res;
    }
    createFutures() {
        for (var intent in this.futures = {}, this.intents) {
            this.futures[intent] = {};
            var lang, examples = this.intents[intent];
            for (lang in examples) {
                this.futures[intent][lang] = new Array(this.vocabLen[lang]).fill(0);
                var voc = this.vocab[lang], fut = this.futures[intent][lang], sents = examples[lang];
                for (let i = 0; i < sents.length; i++) {
                    var tokens = sents[i], words = this.tokensToWords(tokens);
                    for (let j = 0; j < words.length; j++) fut[voc[words[j]].id] = 1;
                }
            }
        }
    }
    learn() {
        this.createVocab(), this.createFutures();
    }
    tokenize(st) {
        st = st.toLowerCase();
        for (let i = 0; i < this.replaces.length; i++) st = st.replace(this.replaces[i][0], this.replaces[i][1]);
        var ar = (st = (st = st.replace(/\?/g, " ? ")).replace(/[,;!"]/g, " ")).split(/\s+/);
        for (let i = 0; i < ar.length; i++) 0 === ar[i].length && ar.splice(i, 1);
        return ar;
    }
    isInExamples(tokens, intent, lang = "en") {
        var sentents = this.intents[intent][lang];
        for (let i = 0; i < sentents.length; i++) {
            var sent = sentents[i];
            if (sent.length === tokens.length) {
                let j = 0;
                for (;j < sent.length && sent[j] === tokens[j]; j++);
                if (j >= sent.length) return !0;
            }
        }
        return !1;
    }
    intent(st, lang = "en") {
        if (!(lang in this.vocab)) return "UNKNOWN";
        var intent, tokens = this.tokenize(st);
        let res = [], significant = [], totSum = 0;
        for (intent in this.intents) this.isInExamples(tokens, intent, lang) && (res.push({
            intent: intent,
            score: 1
        }), significant.push([ {
            word: -1,
            score: 1
        } ]), totSum++);
        if (totSum) for (let i = 0; i < res.length; i++) res[i].score /= totSum; else {
            var words = this.tokensToWords(tokens), fut = new Array(this.vocabLen[lang]).fill(0), voc = this.vocab[lang];
            for (let i = 0; i < words.length; i++) {
                var word = words[i];
                word in voc && (fut[voc[word].id] = 1);
            }
            for (let intent in this.futures) {
                var f = this.futures[intent][lang];
                let sum = 0;
                for (let i = 0; i < fut.length; i++) sum += fut[i] * f[i];
                totSum += sum, res.push({
                    intent: intent,
                    score: sum
                });
            }
            res = res.sort(function(a, b) {
                return b.score - a.score;
            });
            for (let i = 0; i < Math.min(3, res.length); i++) {
                let f = this.futures[res[i].intent][lang], words = this.words[lang];
                var signif = [];
                for (let j = 0; j < fut.length; j++) 0 < fut[j] * f[j] && signif.push({
                    word: words[j],
                    score: fut[j] * f[j]
                });
                significant.push(signif);
            }
            if (totSum) for (let i = 0; i < res.length; i++) res[i].score /= totSum;
        }
        return {
            intents: res,
            futures: significant
        };
    }
}

class QuBotLocalBotBase extends QuBotActions {
    type() {
        return "local";
    }
    async init(params) {
        this.uid = params.uid, this.id = 0, this.startState = "", this.states = {}, 
        this.slots = {}, this.name = "Unknown", this.wasClose = !1, this.buttons = [], 
        this.checks = [], this.radios = [], this.nlu = null, this.extractor = new QuBotLocalExtractor(), 
        this.debug = this.bot.debug, this.events = this.bot.events, this.curState = "", 
        this.newState = "", this.timers = [], this.wasGoto = !1;
    }
    async setBot(bot, params) {
        this.states = bot.states || {}, this.slots = bot.slots || {}, this.startState = bot.start, 
        this.id = bot.id, this.name = bot.name, this.msgs = new QuBotLocalMessages(), 
        this.events.init(params.analytics, this.id, this.uid), this.events.send(), 
        this.events.clear();
    }
    async setHelpBot(kind, params) {
        this.setBot(kind, params);
    }
    async start(parms) {
        if (parms) {
            if (localStorage) {
                let data = localStorage.getItem("qubotBotsUID");
                data ? (data = JSON.parse(data), this.id in data || (data[this.id] = 1, 
                localStorage.setItem("qubotBotsUID", JSON.stringify(data)), this.events.addUsersEvent(this.uid, this.id))) : ((data = {})[this.id] = 1, 
                localStorage.setItem("qubotBotsUID", JSON.stringify(data)), this.events.addUsersEvent(this.uid, this.id));
            }
            document.getElementById("qubot").innerHTML = "", await this.START_STATE(parms.restart, parms.lang);
        }
    }
    async START_STATE(restart, lang = "en") {
        this.events.push("start"), this.curState = this.newState = this.startState, 
        !restart && this.load() || (this.slots = {}, this.slots.LANGUAGE = lang, 
        this.slots.INPUT = ""), this.buttons = [], this.checks = [], this.radios = [], 
        this.createNLU(), await this.showState(this.curState);
    }
    async showState(state) {
        (state = (state = state || this.newState) || this.curState) ? 0 === state.indexOf("http://") || 0 === state.indexOf("https://") ? (this.newState = this.curState, 
        await this.showState()) : (0 < state.length && (this.curState = state), 
        state in this.states ? (this.events.push("ST_" + state), this.save(), this.debug.add(`<b>step</b> <span class="qubot-green">${state}</span><br>`), 
        this.clearTimers(), this.newState = "", this.wasGoto = !1, await this.showStateItems(this.states[state])) : this.debug.add('<span class="qubot-red">Unknown step:</span> ' + state)) : this.debug.add(`<span class="qubot-red">Empty step:</span> "${state}"`);
    }
    async showStateItems(items) {
        let itemID = 0;
        for (;itemID < items.length && !this.wasGoto; itemID++) {
            var item = items[itemID];
            if ("message" === item.type) this.msgs.newMessage(item); else if ("text" === item.type) {
                var text = this.getText(item.text, !0);
                this.msgs.addText(text, item);
            } else if ("buttons" === item.type) item.items.forEach(row => {
                this.msgs.addRow(), row.items.forEach(btn => {
                    this.addButton(btn);
                });
            }); else if ("image" === item.type) this.msgs.addImagesRow(), item.caption && (item.caption = this.getText(item.caption)), 
            this.msgs.addImage(item); else if ("images" === item.type) this.msgs.addImagesRow(), 
            item.items.forEach(image => {
                image.caption && (image.caption = this.getText(image.caption)), 
                this.msgs.addImage(image);
            }); else if ("map" === item.type) this.msgs.appendMap(item); else if ("video" === item.type) this.msgs.appendMedia(item, "video"); else if ("audio" === item.type) this.msgs.appendMedia(item, "audio"); else if ("timer" === item.type) this.addTimer(item); else if ("input" === item.type) this.msgs.inputKind(item); else if ("actions" === item.type && (await this.runActions(item.actions), 
            this.wasGoto)) break;
        }
        (itemID >= items.length || this.wasGoto) && (this.correctRadio(), this.wasGoto && await this.showState(), 
        this.debug.show(this.curState, this.slots));
    }
    addButton(btn) {
        var text = this.getText(btn.button, !0), text = this.msgs.addButton(text, btn, this.buttons.length);
        "check" === btn.kind ? this.checks.push({
            item: btn,
            button: text
        }) : "radio" === btn.kind && this.radios.push({
            item: btn,
            button: text
        }), this.buttons.push(btn);
    }
    correctRadio() {
        if (this.radios.length) {
            let numChecks = 0;
            for (let i = 0; i < this.radios.length; i++) this.radios[i].item.checked && numChecks++;
            if (numChecks) {
                if (1 < numChecks) {
                    this.radios[0].item.checked = !0;
                    for (let i = 1; i < this.radios.length; i++) this.radios[i].item.checked = !1;
                }
            } else this.radios[0].item.checked = !0;
        }
    }
    async inputText(text) {
        this.debug.clear(), this.debug.add(`<b>input</b>: ${text}<br>`), this.slots.INPUT = text;
        for (let i = this.states[this.curState].length - 1; 0 <= i; i--) {
            var item = this.states[this.curState][i], args = [];
            if ("input" === item.type) {
                if ("text" !== item.kind) if ("number" === item.kind) {
                    item.params && "int" == item.params.type ? args.push("int") : item.params && "float" == item.params.type && args.push("float");
                    var res = this.extractor.extractData(text, args);
                    this.slots.INPUT = res[0];
                } else if ("range" !== item.kind) if ("datetime" === item.kind) {
                    if (item.params) switch (item.params.time) {
                      case "datetime":
                        item.params.format && args.push(item.params.format), args.push("time");
                        break;

                      case "date":
                        item.params.format && args.push(item.params.format);
                        break;

                      case "time":
                        args.push("time");
                    }
                    let res = this.extractor.extractData(text, args);
                    res[0] && res[1] ? this.slots.INPUT = res[0] + res[1] : res[0] || res[1] ? this.slots.INPUT = res[0] : this.slots.INPUT = null;
                } else if ("email" === item.kind) {
                    let res = this.extractor.extractData(text, [ "email" ]);
                    res[0] ? this.slots.INPUT = res[0] : this.slots.INPUT = null;
                } else if ("phone" === item.kind) {
                    let res = this.extractor.extractData(text, [ "phone" ]);
                    res[0] ? this.slots.INPUT = res[0] : this.slots.INPUT = null;
                } else if ("intent" === item.kind) this.nlu && this.runNLU(text); else if ("ai" === item.kind) {
                    res = {
                        en: "I'm sorry, but I don't work on the local version.",
                        ru: "Мне очень жаль, но я не работаю в локальной версии.",
                        uk: "Мені дуже шкода, але я не працюю у локальній версії."
                    };
                    this.slots.INPUT = text, this.slots.OUTPUT = res[this.slots.LANGUAGE] || res.en;
                } else if ("int" === item.kind) {
                    let res = this.extractor.extractData(text, [ "int" ]);
                    this.slots.INPUT = res[0];
                } else if ("float" === item.kind) {
                    let res = this.extractor.extractData(text, [ "float" ]);
                    this.slots.INPUT = res[0];
                } else if ("DDMMYYYY" === item.kind) {
                    let res = this.extractor.extractData(text, [ "DDMMYYYY" ]);
                    res[0] ? this.slots.INPUT = res[0] : this.slots.INPUT = null;
                } else if ("MMDDYYYY" === item.kind) {
                    let res = this.extractor.extractData(text, [ "MMDDYYYY" ]);
                    res[0] ? this.slots.INPUT = res[0] : this.slots.INPUT = null;
                } else if ("time" === item.kind) {
                    let res = this.extractor.extractData(text, [ "time" ]);
                    res[0] ? this.slots.INPUT = res[0] : this.slots.INPUT = null;
                }
                await this.runActions(item.actions), this.newState.length && (this.curState = this.newState), 
                this.debug.addChangedSlot("INPUT"), this.debug.add("<br>"), this.debug.show(this.curState, this.slots), 
                this.buttons = [], this.checks = [], this.radios = [];
                break;
            }
        }
        await this.showState();
    }
    runNLU(text) {
        this.debug.add("<b>NLU futures</b>: ");
        var lang, tm = performance.now(), res = this.nlu.intent(text, this.slots.LANGUAGE), tm = performance.now() - tm;
        for (lang in this.nlu.vocabLen) this.debug.add(`${lang}:${this.nlu.vocabLen[lang]}, `);
        if (this.debug.add(`<b>intents</b>: ${Object.keys(this.nlu.futures).length},  ${Math.round(1e3 * tm) / 1e3} ms<br>`), 
        this.slots.INTENT = "UNKNOWN", res.intents && res.intents.length) {
            0 < res.intents[0].score && (this.slots.INTENT = res.intents[0].intent), 
            this.slots.CONFIDENCE = Math.round(100 * res.intents[0].score);
            for (let i = 0; i < Math.min(3, res.intents.length); i++) {
                this.debug.add(`${Math.round(100 * res.intents[i].score)}: ${res.intents[i].intent}: `);
                for (let j = 0; j < res.futures[i].length; j++) this.debug.add(res.futures[i][j].word + ", ");
                this.debug.add("<br>");
            }
            this.debug.add("<br>");
        }
    }
    isInputActions(state) {
        var items = this.states[state];
        if (items) {
            for (let i = items.length - 1; 0 <= i; i--) {
                var item = items[i];
                if ("input" === item.type) return "actions" in item && 0 !== item.actions.length && !(1 === item.actions.length && "state" in item.actions && !item.actions.state);
            }
            return !1;
        }
    }
    clearTimers(num = 0) {
        this.timers.length = 0;
    }
    addTimer(item) {
        if (0 != item.time.length) {
            var res = this.evalExpr(item.time);
            if (/^[0-9]*$/.test(res)) {
                let time = 100 < res ? res : 100;
                "number" == typeof item.time ? time = item.time : "string" == typeof item.time && item.time.length && !isNaN(item.time) && (time = parseInt(item.time)), 
                time < 100 && (time = 100), this.timers.push({
                    timeout: Date.now() + time,
                    actions: item.actions
                }), this.timers.sort((a, b) => a.timeout > b.timeout ? 1 : a.timeout < b.timeout ? -1 : 0), 
                this.debug.add(`<span class="qubot-blue2">timer</span> add: ${time} ms (id: ${this.timers[this.timers.length - 1].id}, total: ${this.timers.length})<br>`);
            }
        }
    }
    async checkTimers() {
        for (let i = 0; i < this.timers.length; i++) {
            var timer = this.timers[i];
            if (Date.now() >= timer.timeout) return void await this.runTimer(i);
        }
    }
    async runTimer(i) {
        this.timers.length && (this.debug.clear(), this.debug.add(`<b>timer</b>:  (id: ${this.timers[this.timers.length - 1].id}, i: ${i}, total: ${this.timers.length})<br>`), 
        await this.runActions(this.timers[i].actions), this.clearTimers(i), this.debug.show(this.curState, this.slots), 
        this.buttons = [], this.checks = [], this.radios = [], this.newState || (this.newState = this.curState), 
        await this.showState(this.newState));
    }
    save() {
        if (localStorage) {
            let data = localStorage.getItem("qubotBotsData");
            if (data) try {
                data = JSON.parse(data);
            } catch (e) {
                data = {};
            } else data = {};
            data[this.id] = {
                state: this.curState,
                slots: this.slots,
                close: this.wasClose
            }, localStorage.setItem("qubotBotsData", JSON.stringify(data));
        }
    }
    load() {
        let data = localStorage.getItem("qubotBotsData");
        if (!data) return !1;
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = {};
        }
        return this.id in data && ((data = data[this.id]).slots && (this.slots = data.slots || {}), 
        data.state && (this.curState = data.state || {}), null !== data.close && (this.wasClose = data.close), 
        !0);
    }
    clear() {
        for (var slot in this.slots) this.slots[slot] = null, "LANGUAGE" === slot && (this.slots[slot] = "en");
        for (var state in this.curState = this.startState, this.checks = [], this.radios = [], 
        this.states) for (let i = 0; i < this.states[state].length; i++) {
            var item = this.states[state][i];
            if ("buttons" === item.type) for (let j = 0; j < item.items.length; j++) for (let j2 = 0; j2 < item.items[j].items.length; j2++) {
                var button = item.items[j].items[j2];
                "check" !== button.kind && "radio" !== button.kind || (button.checked = !1);
            }
        }
        this.wasClose = !1, this.save();
    }
    createNLU() {
        performance.now();
        var state, intents = {};
        for (state in this.states) {
            var items = this.states[state];
            for (let i = 0; i < items.length; i++) if ("intents" === items[i].type) {
                var actions = items[i].actions;
                if (actions) for (let j = 0; j < actions.length; j++) {
                    var intent = actions[j];
                    if (intent.intent && intent.words) for (var lang in intent.intent in intents || (intents[intent.intent] = {}), 
                    intent.words) intents[intent.intent][lang] ? intents[intent.intent][lang] += " " + intent.words[lang] : intents[intent.intent][lang] = intent.words[lang];
                }
            }
        }
        this.nlu = new QuBotLocalNLU(), this.nlu.intents = intents, this.nlu.learn(), 
        performance.now();
    }
}

class QuBotLocalBotActions extends QuBotLocalBotBase {
    async userActionButton(params) {
        params = params.data;
        if (this.debug.clear(), this.debug.add(`<b>button</b> <span class="qubot-green">${params}</span><br>`), 
        params < 0 || params >= this.buttons.length) this.debug.add(`<span class="qubot-red">Wrong button index = ${params}</span><br>`); else {
            params = this.buttons[params];
            if ("check" === params.kind) params.checked = !params.checked; else if ("radio" === params.kind) {
                for (let i = 0; i < this.radios.length; i++) this.radios[i].item.checked = !1;
                params.checked = !0;
            }
            await this.runActions(params.actions, "    ", {
                IF: null,
                SWITCH: null
            }, params.context), this.debug.add("<br>"), this.debug.show(this.curState, this.slots), 
            this.newState || (this.newState = this.curState), this.buttons = [], 
            this.checks = [], this.radios = [], await this.showState();
        }
    }
    breakConnection() {
        var elem = document.getElementById("qubot-input");
        elem && (elem.value = "");
    }
    async userActionInput(params) {
        let value = params.data;
        if ((value = value.trim()).length) if ("/help" == value) this.msgs.addText(`
                    <b>/start</b> - start the bot from start state
                    <b>/restart</b> - restart  (slots=null)
                    <b>/debug</b> - show debug window
                    <b>/info</b>  - info about current state
                    <b>/data</b>  - 10 recently saved records
                `); else if ("/start" == value) await this.START_STATE(); else if ("/restart" == value) this.clear(), 
        this.debug.clear(), this.debug.show(this.curState, this.slots); else if ("/debug" == value) this.debug.create(this.curState), 
        this.debug.show(this.curState, this.slots); else if ("/info" == value) {
            let txt = "bid: " + this.id + "<br>";
            txt = (txt = (txt += "uid: " + this.uid + "<br>") + ("state: " + this.curState + "<br>")) + ("start: " + this.startState), 
            this.msgs.addText(txt);
        } else await this.inputText(value);
        this.debug.add("<br>");
    }
    async userActionVoice(params) {}
    async runActions(actions, skip = "    ", last = {
        IF: null,
        SWITCH: null
    }, context = null) {
        if (actions) {
            for (let i = 0; i < actions.length && !this.wasGoto; i++) {
                var action = actions[i];
                if ("state" in action) this.runActionState(action, skip); else if ("goto" in action) {
                    if (this.runActionGoto(action, skip)) break;
                } else if ("run" in action) await this.runActionRun(action, skip); else if ("slot" in action) this.runActionSlot(action, skip); else if ("clear" in action) this.actionClear(action, skip); else if ("script" in action) {
                    if (this.runScript(action.script, context), this.wasGoto) break;
                } else "if" in action ? last = await this.runActionIF(action, skip, last) : "else" in action ? last = await this.runActionELSE(action, skip, last) : "switch" in action ? last = await this.runActionSwitch(action, skip, last) : "case" in action ? last = await this.runActionCase(action, skip, last) : "default" in action ? last = await this.runActionDefault(action, skip, last) : "action" in action && ("load" === action.action ? last = await this.runActionLoad(action, skip, last) : "save" === action.action ? last = await this.runActionSave(action, skip, last) : "event" === action.action && (last = this.runActionEvent(action, skip, last)));
            }
            return last;
        }
    }
    runScript(script, context) {
        return null;
    }
    checkState(state) {
        return "$" !== state[0] && ("{" != state[0] || "}" != state[state.length - 1]) || (state = 1 < (state = this.evalText(state)).length && ("'" === state[0] || '"' === state[0]) ? state.substring(1, state.length - 1) : state) in this.states ? state : (this.debug.add(skip + `<span class='qubot-red'>Unknown step name </span>: ${state}<br>`), 
        "");
    }
    runActionState(action, skip) {
        var state;
        action.state && (state = this.removeQuotes(action.state), this.debug.add(skip + `<span class='qubot-blue2'>step</span> ${state} `), 
        state = this.checkState(state)) && (this.newState = state, this.removeQuotes(action.state) === state ? this.debug.add(skip + "<br>") : this.debug.add(skip + `<span class="qubot-small">= ${state}</span><br>`));
    }
    runActionGoto(action, skip) {
        var state;
        return !!action.goto && (action = this.removeQuotes(action.goto), this.debug.add(skip + `<span class='qubot-blue2'>goto</span> ${action} `), 
        (state = this.checkState(state = action)) ? (this.newState = state, this.wasGoto = !0, 
        action === state ? this.debug.add(skip + "<br>") : this.debug.add(skip + `<span class="qubot-small">= ${state}</span><br>`), 
        !0) : void 0);
    }
    async runActionRun(action, skip) {
        var state;
        action.run && (state = this.removeQuotes(action.run), this.debug.add(skip + `<span class='qubot-blue2'>run</span> ${state} `), 
        state = this.checkState(state)) && (this.removeQuotes(action.state) === state ? this.debug.add(skip + "<br>") : this.debug.add(skip + `<span class="qubot-small">= ${state}</span><br>`), 
        action = this.curState, await this.showStateItems(this.states[state]), this.curState = action);
    }
    runActionSlot(action, skip = "") {
        let slot = action.slot, val = action.value;
        this.debug.add(skip + '<span class="qubot-blue2">slot</span> ' + slot + " = " + val), 
        "LANGUAGE" === slot ? (2 !== (val = (val = val.replace(/'/g, "")).replace(/"/g, "")).length && this.debug.add(skip + '<br>    <span class="qubot-red">Wrong name of language (must be 2 letter)</span><br>'), 
        this.slots[slot] = val) : (val = this.evalExpr(action.value), (this.slots[slot] = val) != this.removeQuotes(action.value) ? this.debug.add(" = <span class='qubot-small'>" + val + "</span><br>") : this.debug.add("<br>")), 
        this.debug.addChangedSlot(slot);
    }
    async runActionIF(action, skip, last) {
        var cond = this.evalExpr(action.if);
        return this.debug.add(skip + '<b class="qubot-blue2">if</b>  (' + action.if + ") = "), 
        cond ? (this.debug.add("<b class='qubot-green'>" + cond + "</b><br>"), await this.runActions(action.actions, skip + "    ")) : this.debug.add("<b class='qubot-red'>" + cond + "</b><br>"), 
        {
            IF: cond,
            SWITCH: last.SWITCH
        };
    }
    async runActionELSE(action, skip, last) {
        var cond, elif = action.else.trim();
        if (!last.IF) {
            if (0 < elif.length) return cond = this.evalExpr(elif), this.debug.add(skip + '<b class="qubot-blue2">elif</b>(' + elif + ") = "), 
            cond ? (this.debug.add("<b class='qubot-green'>" + cond + "</b><br>"), 
            await this.runActions(action.actions, skip + "    ")) : this.debug.add("<b class='qubot-red'>" + cond + "</b><br>"), 
            {
                IF: cond,
                SWITCH: last.SWITCH
            };
            this.debug.add(skip + "<b class='qubot-blue2'>else:</b><br>"), await this.runActions(action.actions, skip + "    ");
        }
        return {
            IF: !0,
            SWITCH: last.SWITCH
        };
    }
    async runActionSwitch(action, skip, last) {
        var SWITCH = action.switch.trim();
        return 0 < SWITCH.length ? (SWITCH = this.evalExpr(SWITCH), this.debug.add(skip + '<b class="qubot-blue2">switch</b>(' + action.switch + ") = "), 
        this.debug.add("<b class='qubot-small'>" + SWITCH + "</b><br>"), last = {
            IF: last.IF,
            SWITCH: SWITCH
        }, await this.runActions(action.actions, skip + "    ", last)) : {
            IF: last.IF,
            SWITCH: null
        };
    }
    async runActionCase(action, skip, last) {
        if (null !== last.SWITCH) {
            var CASES = action.case.trim().split(";");
            if (0 !== CASES.length) for (let i = 0; i < CASES.length; i++) {
                var CASE = CASES[i].trim(), cond = this.evalExpr(CASE) == last.SWITCH;
                if (this.debug.add(skip + '<b class="qubot-blue2">case</b>(' + CASE + ") = "), 
                cond) {
                    this.debug.add("<b class='qubot-green'>" + cond + "</b><br>"), 
                    (last = await this.runActions(action.actions, skip + "    ", last)).SWITCH = null;
                    break;
                }
                this.debug.add("<b class='qubot-red'>" + cond + "</b><br>");
            }
        }
        return last;
    }
    async runActionDefault(action, skip, last) {
        return null !== last.SWITCH && (this.debug.add(skip + '<b class="qubot-blue2">default:</b><br>'), 
        (last = await this.runActions(action.actions, skip + "    ", last)).SWITCH = null), 
        last;
    }
    actionClear(action, skip) {
        action.clear && (this.debug.add(skip + "<span class='qubot-blue2'>clear</span>: " + action.clear + "<br>"), 
        this.msgs.clearMessages(action.clear));
    }
    async runExternalAction(action, params, skip) {
        action = await this.bot.env.runAction({
            action: action,
            params: params
        });
        if (null === action) this.debug.add(skip + '<span class="red">response is empty</span>'); else if ("error" in action) this.debug.add(skip + `<span class="red">error: ${action.error.errorMessage}</span><br>`); else {
            if ("result" in action) return action.result;
            this.debug.add(skip + '<span class="red">empty result</span>');
        }
        this.debug.show(this.curState, this.slots);
    }
    async runActionLoad(action, skip, last) {
        this.debug.add(skip + `<span class="qubot-blue2">load(${action.storage})</span>: start<br>`);
        var val = await this.runExternalAction(action.action, action, skip), slot = action.slot_name;
        return this.slots[slot] = val, this.debug.addChangedSlot(slot), this.debug.add(skip + `<span class="qubot-blue2">load(${action.storage})</span> ` + slot + " = " + val + "<br>"), 
        last;
    }
    async runActionSave(action, skip, last) {
        var value = this.evalExpr(action.value), params = (this.debug.add(skip + `<span class="qubot-blue2">save(${action.storage}, ${value})</span>: start<br>`), 
        Object.assign({}, action));
        return params.storage = action.storage, params.time = this.getDateTime(new Date()), 
        params.bid = this.id, params.uid = this.uid, params.value = value, await this.runExternalAction("save", params, skip), 
        this.debug.add(skip + `<span class="qubot-blue2">save(${action.storage})</span> complete<br>`), 
        last;
    }
    runActionEvent(action, skip, last) {
        return this.debug.add(skip + '<span class="qubot-blue2">event</span>: ' + action.value), 
        this.events.push(action.key, action.target), last;
    }
    getText(obj) {
        let st = this.getTextFromObject(obj);
        return st = (st = "object" == typeof st ? Object.keys(st)[0] : st) ? this.evalText(st) : "";
    }
    evalText(st) {
        if ((st += "") && 0 === (st = st.trim()).length) return null;
        if (!/[${]/.test(st)) return st;
        let res = 0;
        try {
            res = this.runScript(`\`${st}\``);
        } catch (e) {
            this.debug.add(`<br><span class="qubot-red">Can not eval</span>: ${st}<br>`);
        }
        return res || "";
    }
    evalExpr(st) {
        let res = 0;
        try {
            res = this.runExpr(st);
        } catch (e) {
            this.debug.add(`<br><span class="qubot-red">Can not eval</span>: ${st}<br>`);
        }
        return null == res ? "" : res;
    }
    getTextFromObject(obj, noCommas = 0) {
        let res = obj;
        if ("string" == typeof obj) res = obj; else if ("object" == typeof obj) {
            let lang = this.slots.LANGUAGE;
            switch (lang) {
              case "ua":
                lang = "uk";
                break;

              case "ja":
                lang = "jp";
            }
            if (lang in obj) res = obj[lang]; else for (var k in obj) {
                res = obj[k];
                break;
            }
        }
        return res;
    }
    removeQuotes(txt) {
        return txt = txt && txt.length && ("'" === txt[0] && "'" === txt[txt.length - 1] || '"' === txt[0] && '"' === txt[txt.length - 1]) ? txt.substring(1, txt.length - 1) : txt;
    }
    getArrayValue(slot, index, noCommas) {
        slot = this.getSlotValue(slot);
        if (Array.isArray(slot)) {
            try {
                index = parseInt(index);
            } catch (e) {
                return;
            }
            let res = null;
            return 0 <= index && index < slot.length && (res = slot[index]), index < 0 && 0 <= slot.length + index && (res = slot[slot.length + index]), 
            res = noCommas || this.isDict(res) ? res : '"' + res + '"';
        }
    }
    getObjectValue(slot, key, noCommas) {
        slot = this.getSlotValue(slot, noCommas);
        if (this.isDict(!slot) && key in slot) {
            let res = slot.key;
            return res = res && !noCommas ? '"' + res + '"' : res;
        }
    }
    getScalarValue(slot, noCommas) {
        let val = this.getSlotValue(slot);
        return val = Array.isArray(val) ? "[" + val + "]" : this.getScalarValueIfString(val, noCommas);
    }
    getScalarValueIfString(val, noCommas) {
        if ("string" == typeof val) {
            if (noCommas) return this.removeQuotes(val);
            val = '"' + (val = this.removeQuotes(val)) + '"';
        }
        return val;
    }
    getSlotValue(slot) {
        let val;
        return val = slot in this.slots ? this.slots[slot] : val;
    }
    isDict(obj) {
        return obj && "object" == typeof obj && !Array.isArray(obj);
    }
    getDate(today) {
        let mm = (today.getMonth() + 1).toString(), dd = today.getDate().toString();
        return 1 === mm.length && (mm = "0" + mm), 1 === dd.length && (dd = "0" + dd), 
        today.getFullYear() + "-" + mm + "-" + dd;
    }
    getTime(today) {
        let hh = today.getHours().toString(), mm = today.getMinutes().toString(), ss = today.getSeconds().toString();
        return 1 === hh.length && (hh = "0" + hh), 1 === mm.length && (mm = "0" + mm), 
        1 === ss.length && (ss = "0" + ss), hh + ":" + mm + ":" + ss;
    }
    getDateTime(today) {
        return this.getDate(today) + " " + this.getTime(today);
    }
}

class QuBotLocalBotScripts extends QuBotLocalBotActions {
    constructor(bot) {
        super(bot), this.initFuncFactory();
    }
    initFuncFactory() {
        this.funcFactory = {
            global: {
                run: this.runScriptRun.bind(this),
                step: this.runScriptStep.bind(this),
                goto: this.runScriptGoto.bind(this),
                text: this.runScriptText.bind(this),
                images: this.runScriptImages.bind(this),
                image: this.runScriptImage.bind(this),
                buttons: this.runScriptButtons.bind(this),
                button: this.runScriptButton.bind(this),
                get_check: this.runScriptGetCheck.bind(this),
                set_check: this.runScriptSetCheck.bind(this),
                get_radio: this.runScriptGetRadio.bind(this),
                set_radio: this.runScriptSetRadio.bind(this),
                print: this.runScriptPrint.bind(this),
                floor: this.runScriptFloor.bind(this),
                trunc: this.runScriptTrunc.bind(this),
                ceil: this.runScriptCeil.bind(this),
                round: this.runScriptRound.bind(this),
                randint: this.runScriptRandint.bind(this),
                random: this.runScriptRandom.bind(this),
                date: this.runScriptDate.bind(this)
            },
            array: {
                push: this.runScriptArrayPush.bind(this),
                pop: this.runScriptArrayPop.bind(this),
                shift: this.runScriptArrayShift.bind(this),
                unshift: this.runScriptArrayUnshift.bind(this),
                length: this.runScriptArrayLength.bind(this),
                slice: this.runScriptArraySlice.bind(this),
                splice: this.runScriptArraySplice.bind(this),
                clear: this.runScriptArrayClear.bind(this),
                find: this.runScriptArrayFind.bind(this),
                total: this.runScriptArrayTotal.bind(this),
                count: this.runScriptArrayCount.bind(this),
                sort: this.runScriptArraySort.bind(this),
                reverse: this.runScriptArrayReverse.bind(this)
            },
            string: {
                length: this.runScriptStrLength.bind(this),
                substring: this.runScriptStrSubstring.bind(this),
                search: this.runScriptStrSearch.bind(this)
            }
        };
    }
    runScript(script, conext) {
        conext = new QSScope(null, this.slots, conext ? conext.locals : {});
        return QS.evalScript(script, conext, this.funcFactory, this.debug);
    }
    runExpr(script, conext) {
        conext = new QSScope(null, this.slots, conext ? conext.locals : {});
        return QS.evalExpr(script, conext, this.funcFactory, this.debug);
    }
    checkFunArgs(args, min, max) {
        return args ? !(args.length < min || args.length > max) || (this.debug.add(": <span class='qubot-red'>wrong count of args (expected "), 
        min == max ? this.debug.add(min + ")") : this.debug.add(`from ${min} to ${max})`), 
        this.debug.add("</span><br>"), !1) : (this.debug.add(": <span class='qubot-red'>args is undefined</span>"), 
        !1);
    }
    async runScriptRun(ev, scope, args) {
        this.checkFunArgs(args, 1, 1) && (ev = ev.evalArgs(args, scope)[0], ev = this.checkState(ev)) && (args = this.curState, 
        await this.showStateItems(this.states[ev]), this.curState = args);
    }
    runScriptStep(ev, scope, args) {
        this.checkFunArgs(args, 1, 1) && (ev = ev.evalArgs(args, scope)[0], ev = this.evalText(ev), 
        this.newState = ev, this.debug.add(`<span class='qubot-small'> ${ev}</span><br>`));
    }
    runScriptGoto(ev, scope, args) {
        this.checkFunArgs(args, 1, 1) && (args = ev.evalArgs(args, scope)[0], args = this.evalText(args), 
        this.newState = args, this.wasGoto = !0, ev.interrupt(), this.debug.add(`<span class='qubot-small'> ${args}</span><br>`));
    }
    runScriptText(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 1)) {
            let text = ev.evalArgs(args, scope)[0];
            text = text || "", this.msgs.addText(this.getText(text, !0));
        }
    }
    runScriptButtons(ev, scope, args) {
        this.checkFunArgs(args, 0, 0) && this.msgs.addRow();
    }
    runScriptButton(ev, scope, argVals) {
        var arg0 = argVals[0], arg1 = argVals[1];
        let btn = void 0;
        null == arg0 ? ev.evalError("button: first argument is undefined") : ("string" == typeof arg0 ? btn = {
            button: this.getText(arg0)
        } : "number" == typeof arg0 ? btn = {
            button: arg0 + ""
        } : "object" == typeof arg0 && (btn = {
            button: this.getText(arg0)
        }), btn.type = "button", btn.actions = [ {
            script: arg1
        } ], btn.context = {
            locals: argVals[2]
        }, this.addButton(btn));
    }
    runScriptImages(ev, scope, args) {
        this.checkFunArgs(args, 0, 0) && this.msgs.addImagesRow();
    }
    runScriptImage(ev, scope, args) {
        this.checkFunArgs(args, 1, 2) && (ev = ev.evalArgs(args, scope), args = this.getText(ev[0]), 
        scope = {
            image: args = this.removeQuotes(args)
        }, 1 < ev.length && (scope.width = this.evalText(ev[1])), this.msgs.addImage(scope));
    }
    runScriptGetCheck(ev, scope, args) {
        if (this.checkFunArgs(args, 0, 0)) {
            var list = [];
            for (let i = 0; i < this.checks.length; i++) list.push(this.checks[i].item.checked ? 1 : 0);
            return list;
        }
    }
    runScriptSetCheck(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 1)) {
            var list = ev.evalArgs(args, scope)[0];
            if (Array.isArray(list)) {
                var count = Math.min(list.length, this.checks.length);
                for (let i = 0; i < count; i++) this.checks[i].item.checked = list[i] ? 1 : 0, 
                this.checks[i].button.checked = !!list[i];
            } else this.debug.add("<span class='qubot-red'>In set_check first argument must be list!</span>: <br>");
        }
    }
    runScriptGetRadio(ev, scope, args) {
        if (this.checkFunArgs(args, 0, 0)) {
            var list = [];
            for (let i = 0; i < this.radios.length; i++) list.push(this.radios[i].item.checked ? 1 : 0);
            return list;
        }
    }
    runScriptSetRadio(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 1)) {
            var list = ev.evalArgs(args, scope)[0];
            if (Array.isArray(list)) {
                var count = Math.min(list.length, this.radios.length);
                for (let i = 0; i < count; i++) this.radios[i].item.checked = list[i] ? 1 : 0, 
                this.radios[i].button.checked = !!list[i];
            } else this.debug.add("<span class='qubot-red'>In set_radio first argument must be list!</span>: <br>");
        }
    }
    runScriptPrint(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 100)) {
            var arg, args = ev.evalArgs(args, scope);
            this.debug.add("<br><span class='qubot-small'>");
            for (arg of args) this.debug.add(ev.toDebug(arg));
            this.debug.add("</span><br>"), console.log.call(null, ...args);
        }
    }
    runScriptArrayLength(ev, scope, arr, args) {
        return arr.length;
    }
    runScriptArrayPush(ev, scope, arr, args) {
        ev = ev.evalArgs(args, scope);
        arr.push(...ev);
    }
    runScriptArrayPop(ev, scope, arr, args) {
        return arr.pop();
    }
    runScriptArrayUnshift(ev, scope, arr, args) {
        ev = ev.evalArgs(args, scope);
        arr.unshift(...ev);
    }
    runScriptArrayShift(ev, scope, arr, args) {
        return arr.shift();
    }
    runScriptArraySlice(ev, scope, arr, args) {
        if (this.checkFunArgs(args, 1, 2)) return 1 == (ev = ev.evalArgs(args, scope)).length ? arr.slice(ev[0]) : arr.slice(ev[0], ev[1]);
    }
    runScriptArraySplice(ev, scope, arr, args) {
        if (this.checkFunArgs(args, 1, 2)) return 1 == (ev = ev.evalArgs(args, scope)).length ? arr.splice(ev[0]) : arr.splice(ev[0], ev[1]);
    }
    runScriptArrayClear(ev, scope, arr, args) {
        this.checkFunArgs(args, 0, 0) && (arr.length = 0);
    }
    runScriptArrayFind(ev, scope, arr, args) {
        if (this.checkFunArgs(args, 1, 1)) {
            var elem, localScope, res = [];
            for (elem of arr) "object" == typeof elem && (localScope = new QSScope(scope, {}, elem, !0), 
            ev.evalArgs(args, localScope)[0]) && res.push(elem);
            return res;
        }
    }
    runScriptArraySort(ev, scope, arr, args) {
        if (0 == arr.length) return arr;
        if (this.checkFunArgs(args, 0, 1)) {
            let sort_func = null, arr_type = typeof arr[0];
            if (0 == args.length) {
                if ("number" != arr_type && "string" != arr_type) return void ev.evalError(scope, "sorting witout key is only supported for the following types of elements: number, string");
                sort_func = function(par, arr_type) {
                    if (typeof par == arr_type) return 0 < par.length ? "string" == arr_type ? par.charCodeAt(0) : par : 0;
                    throw "all elements of an array must be of the same type";
                };
            } else {
                if ("object" != arr_type || Array.isArray(arr[0])) return void ev.evalError(scope, "sorting with key is only supported for the following types of elements: object");
                sort_func = function(par) {
                    if ("object" == typeof par) return ev.evalArgs(args, new QSScope(scope, {}, par, !0)) || Number.MAX_SAFE_INTEGER;
                    throw "the type of objects in an array must be a dict";
                }, key = args[0].text;
            }
            try {
                arr.sort((a, b) => {
                    return sort_func(a, arr_type) - sort_func(b, arr_type);
                });
            } catch (err) {
                return void ev.evalError(scope, err);
            }
            return arr;
        }
    }
    runScriptArrayTotal(ev, scope, arr, args) {
        if (this.checkFunArgs(args, 1, 1)) {
            let res = 0;
            for (var elem of arr) "object" == typeof elem && (elem = new QSScope(scope, {}, elem, !0), 
            elem = ev.evalArgs(args, elem), res += elem[0]);
            return res;
        }
    }
    runScriptArrayCount(ev, scope, arr, args) {
        if (this.checkFunArgs(args, 1, 1)) {
            let res = 0;
            for (var elem of arr) "object" == typeof elem && (elem = new QSScope(scope, {}, elem, !0), 
            ev.evalArgs(args, elem)[0]) && (res += 1);
            return res;
        }
    }
    runScriptArrayReverse(ev, scope, arr, args) {
        if (this.checkFunArgs(args, 0, 0)) return arr.reverse(), arr;
    }
    runScriptStrLength(ev, scope, str, args) {
        if (this.checkFunArgs(args, 0, 0)) return str.length;
    }
    runScriptStrSubstring(ev, scope, str, args) {
        if (this.checkFunArgs(args, 1, 2)) return 1 == (ev = ev.evalArgs(args, scope)).length ? str.substring(ev[0]) : str.substring(ev[0], ev[1]);
    }
    runScriptStrSearch(ev, scope, str, args) {
        if (this.checkFunArgs(args, 1, 1)) return ev = ev.evalArgs(args, scope), 
        str.search(ev[0]);
    }
    runScriptFloor(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 1)) return ev = ev.evalArgs(args, scope), 
        Math.floor(ev[0]);
    }
    runScriptTrunc(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 1)) return ev = ev.evalArgs(args, scope), 
        Math.trunc(ev[0]);
    }
    runScriptCeil(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 1)) return ev = ev.evalArgs(args, scope), 
        Math.ceil(ev[0]);
    }
    runScriptRound(ev, scope, args) {
        if (this.checkFunArgs(args, 1, 2)) return ev = ev.evalArgs(args, scope), 
        1 == args.length ? Math.round(ev[0]) : Math.round(ev[0] * Math.pow(10, ev[1])) / Math.pow(10, ev[1]);
    }
    runScriptRandint(ev, scope, args) {
        if (this.checkFunArgs(args, 2, 2)) return args = ev.evalArgs(args, scope), 
        Number.isInteger(args[0]) && Number.isInteger(args[1]) ? args[0] + Math.floor(Math.random() * (args[1] - args[0] + 1)) : void ev.evalError(scope, "randint: incorrect types of arguments (int expected)");
    }
    runScriptRandom(ev, scope, args) {
        if (this.checkFunArgs(args, 0, 0)) return Math.random();
    }
    runScriptDate(ev, scope, args) {
        if (this.checkFunArgs(args, 0, 1)) {
            ev = ev.evalArgs(args, scope);
            let date_str = 0 < ev.length ? ev[0] : "%d/%m/%Y %H:%M:%S";
            var args = new Date(), scope = args.getFullYear(), ev = scope.toString().substring(2), m = (m = args.getMonth() + 1) < 10 ? "0" + m : m, d = (d = args.getDate()) < 10 ? "0" + d : d, H = (H = args.getHours()) < 10 ? "0" + H : H, M = (M = args.getMinutes()) < 10 ? "0" + M : M, args = (args = args.getSeconds()) < 10 ? "0" + args : args;
            return date_str = (date_str = (date_str = (date_str = (date_str = (date_str = (date_str = date_str.replace(/%Y/g, scope)).replace(/%y/g, ev)).replace(/%m/g, m)).replace(/%d/g, d)).replace(/%H/g, H)).replace(/%M/g, M)).replace(/%S/g, args);
        }
    }
}

class QuBotLocalBot extends QuBotLocalBotScripts {
    async lastState(params) {
        return this.msgs.clear(), this.curState || await this.start({
            lang: "en"
        }), this.response();
    }
    async runState(params) {
        return this.msgs && this.msgs.clear(), params.state ? await this.showState(params.state) : await this.start(params), 
        this.response();
    }
    async userAction(params) {
        this.msgs.clear();
        var action = params.action;
        switch (action.type) {
          case "button":
            await this.userActionButton(action);
            break;

          case "input":
            await this.userActionInput(action);
            break;

          case "voice":
            await this.userActionVoice(action);
        }
        return this.response();
    }
    async ping(params) {
        return await this.checkTimers(), this.response();
    }
    response() {
        var ping, resp = {
            state: this.curState,
            messages: this.msgs.get()
        };
        return 0 < this.timers.length && (ping = this.timers[0].timeout - Date.now(), 
        resp.ping = ping = ping < 0 ? 0 : ping), this.msgs.clear(), resp;
    }
}

class QuBot {
    constructor(env) {
        this.setVisual(), this.env = env, this.debug = new QuBotDebug(), this.events = new QuBotEvents(env), 
        this.wasClose = !0, this.curState = null, this.messages = [], this.timers = [], 
        this.timeout = null, this.lang = "en";
        let wpLang = document.documentElement.lang;
        wpLang && (-1 < (env = wpLang.indexOf("-")) && (wpLang = wpLang.substring(0, env)), 
        this.lang = wpLang);
    }
    setVisual() {
        this.visual = new QuBotVisual();
    }
    async create(params) {
        (this.params = params)?.lang && (this.lang = params.lang), await this.initActions(this.params.actions || "local"), 
        this.visual.create(this, this.params), this.params.userVoice && (this.recorder = new Recorder(this));
    }
    async initActions(actionsType) {
        if (!this.actions || this.actions.type() != actionsType) {
            switch (actionsType) {
              case "local":
                this.actions = new QuBotLocalBot(this);
                break;

              case "remote":
                this.actions = new QuBotRemoteActions(this);
            }
            await this.actions.init(this.params, this.onBotMessage.bind(this));
        }
    }
    set(conf, params) {
        this.close(), this.curState = null, this.clearTimers(), this.visual.clear(), 
        this.actions.setBot(conf, params), this.visual.setAssetsPath(`https://${this.params.host}/bot/fs/${conf.id}/assets/`);
    }
    setStyle(params) {
        this.visual.setStyle(params);
    }
    showButton() {
        this.visual.showButton();
    }
    hide() {
        this.visual.hide();
    }
    open() {
        this.clear(), this.runState({
            restart: !0
        });
    }
    runState(params) {
        params.debug = this.debug.is() ? [ "*" ] : [], this.visual.open(), this.lang = params.lang || this.lang, 
        params.lang = this.lang, this.wasClose = !1, this.timeout = setTimeout(() => this.visual.addTyping(), 500), 
        this.actions.runState(params).then(response => this.callbackResponse(response));
    }
    ping(params) {
        this.actions.ping(params).then(response => {
            this.onBotResponse(response);
        });
    }
    close() {
        this.save(), this.events.send(), this.wasClose = !0, this.visual.close(), 
        this.actions.breakConnection();
    }
    save() {
        this.actions.save();
    }
    clear() {
        this.visual.clear();
    }
    addTimer(type, time, callback) {
        this.timers.push({
            id: setTimeout(callback, time),
            type: type
        });
    }
    clearTimers(type = null) {
        this.timers.forEach((timer, i, timers) => {
            null != type && type != timer.type || (clearTimeout(timer.id), timers.splice(i, 1));
        });
    }
    isEffects() {
        return !!this.timers.find(timer => "typing" == timer.type);
    }
    async onUserOpen() {
        var tuto = document.getElementById("qubot-editor-run-tuto"), tuto1 = document.getElementById("qubot-run-tuto");
        tuto && (tuto.style.display = "none"), tuto1 && (tuto1.style.display = "none"), 
        this.open();
    }
    async onUserClose(params) {
        this.close();
    }
    async onUserBeforeReload() {
        this.clearTimers(), this.visual.beforeReload();
    }
    async onUserReloadYes() {
        this.visual.clear(), this.actions.breakConnection(), this.actions.runState({
            restart: !0,
            lang: this.lang
        }).then(response => {
            this.onBotResponse(response);
        });
    }
    async onUserReloadNo() {
        this.visual.clearMessages(1);
    }
    async onUserButtonClick(button, show_user = !0) {
        this.visual.saveScrollTop = document.getElementById("qubot").scrollTop;
        "disappear" != (this.visual.chat.lastChild ? this.visual.chat.lastChild.getAttribute("kind") : null) && await this.visual.deleteButtons();
        var callback = button.callback;
        this.clearTimers(), show_user && ((show_user = button.answer || button.button) && this.visual.addUserText({
            text: show_user
        }), await this.awaitFunc()), this.timeout = setTimeout(() => this.visual.addTyping(), 500), 
        this.actions.userAction({
            action: {
                type: "button",
                data: callback
            }
        }).then(response => this.callbackResponse(response));
    }
    awaitFunc() {
        return new Promise(res => {
            setTimeout(() => {
                res();
            }, 500);
        });
    }
    async onRunAction(action, callback = !0) {
        this.clearTimers(), callback ? this.actions.runAction(action).then(response => this.callbackResponse(response)) : this.actions.runAction(action);
    }
    async onUserInputEnter(text) {}
    async onUserInputFile(typeFile, base64, fileName) {
        this.clearTimers(), this.visual.addUserText({
            fileName: fileName
        }), this.timeout = setTimeout(() => this.visual.addTyping(), 500), this.actions.userAction({
            action: {
                type: "file",
                mimetype: typeFile,
                data: base64,
                file_name: fileName
            }
        }).then(response => this.callbackResponse(response));
    }
    async onUserGeo(value) {
        this.clearTimers(), this.visual.addUserText({
            value: value
        }), this.timeout = setTimeout(() => this.visual.addTyping(), 500), this.actions.userAction({
            action: {
                type: "data",
                data: value
            }
        }).then(response => this.callbackResponse(response));
    }
    async onUserInput(text) {
        if ("/debug" == text) await this.onDebugCommand(); else {
            this.clearTimers();
            var child, messages = [];
            for (child of this.visual.chat.children) {
                let text = "";
                "qubot-message" === child.className ? (child.querySelectorAll(".qubot-content p").forEach(x => {
                    text += x.innerText;
                }), messages.push({
                    assistant: text
                })) : "qubot-answer" === child.className && 0 < (text = child.querySelectorAll(".qubot-content")).length && messages.push({
                    user: text[0].innerText
                });
            }
            this.visual.addUserText({
                text: text
            }), this.timeout = setTimeout(() => this.visual.addTyping(), 500), this.actions.userAction({
                action: {
                    type: "input",
                    data: text,
                    messages: messages
                }
            }).then(response => this.callbackResponse(response));
        }
    }
    async onDebugCommand() {
        this.actions.userAction({
            action: {
                type: "input",
                data: "/debug"
            }
        }).then(response => {
            this.updateDebugWindow(response);
        });
    }
    async onUserMicrophoneClick(params) {
        this.curAduio && (this.curAduio.pause(), this.visual.audioList.length = 0), 
        this.recorder.toggleRecord(this);
    }
    async onUserVoice(voiceData) {
        this.clearTimers(), this.actions.userAction({
            action: {
                type: "voice",
                data: voiceData.data
            }
        }).then(async response => {
            response.messages && await this.onUserMicrophoneClick(), this.onBotResponse(response);
        });
    }
    async onBotResponse(response) {
        this.updateDebugWindow(response), response.error ? 16 === response.error.errorCode && (this.showBotMessageContent([ {
            type: "text",
            text: "<center>404\nNot Found\nChannel disabled. Try later!</center>"
        } ]), this.visual.inputDisable()) : (this.curState = response.state, null != response.ping && this.addTimer("ping", response.ping, this.ping.bind(this)), 
        response.messages && this.messages.push(...response.messages), this.processMessages());
    }
    callbackResponse(response) {
        this.timeout ? (clearTimeout(this.timeout), this.visual.removeTyping(), 
        this.onBotResponse(response)) : setTimeout(() => {
            this.visual.removeTyping(), this.onBotResponse(response);
        }, 300);
    }
    async onBotMessage(response) {
        this.onBotResponse(response);
    }
    processMessages() {
        if (!this.isEffects()) {
            var last_kind = this.visual.chat.lastChild ? this.visual.chat.lastChild.getAttribute("kind") : null, qubot = document.getElementById("qubot"), bool = qubot.scrollTop > (qubot.scrollHeight - qubot.offsetHeight) / 2.35 && 0 < qubot.scrollTop;
            this.visual.clearMessages(0);
            for (let i = 0; i < this.messages.length; i++) {
                var item, message = this.messages[i];
                if (0 < message.content.length) {
                    if (!message.user && !this.processMessage(message)) break;
                    this.visual.content && (item = this.visual.content.parentNode.parentNode).classList.contains("qubot-message") && item.setAttribute("kind", message.kind || ""), 
                    this.visual.runAnimate("disappear" != last_kind || bool, this.visual.saveScrollTop);
                }
                this.messages.shift(), i--;
            }
        }
    }
    processMessage(message) {
        if (this.visual.initMessage(), message.typing && !isNaN(message.typing) && 0 < message.typing) return this.runTypingEffect(message.typing), 
        message.typing = null, !1;
        message.clear && this.visual.clearMessages(message.clear), message.input ? (this.visual.inputEnable(), 
        this.visual.inputSetKind(message), this.visual.inputFocus()) : this.params.nlp || this.visual.inputDisable(), 
        message.back && this.visual.backgroundColor(message.back), message.agent && this.visual.setAgent(message.agent), 
        message.menu && this.visual.addMenu(message.menu);
        message = message.content;
        return this.showBotMessageContent(message), !0;
    }
    updateDebugWindow(response) {
        if (response.error && this.debug.is()) this.debug.clear(), this.debug.add(`<span class="qubot-red">error: ${response.error.errorMessage}</span>`), 
        this.debug.show("", {}); else if (response.debug && response.debug.enable) {
            if (this.debug.create(), this.debug.clear(), response.debug.messages) for (var message of response.debug.messages) this.debug.add(message);
            if (response.debug.changed_slots) for (var slot of response.debug.changed_slots) this.debug.addChangedSlot(slot);
            this.debug.show(response.state || "", response.debug.slots);
        }
    }
    runTypingEffect(time) {
        this.visual.inputDisable(), this.visual.addTyping(), this.addTimer("typing", time, this.stopTypingEffect.bind(this));
    }
    stopTypingEffect() {
        this.visual.removeTyping(), this.visual.inputEnable(), this.clearTimers("typing"), 
        this.processMessages();
    }
    showUserMessageContent(content) {
        for (var item of content) "text" === item.type && this.showUserTextContent(item);
    }
    showUserTextContent(item) {
        this.visual.addUserText(item);
    }
    showBotMessageContent(content) {
        for (var item of content) switch (item.type) {
          case "text":
            this.showBotTextContent(item);
            break;

          case "images":
            this.showBotImagesContent(item);
            break;

          case "image":
            this.showBotImageContent(item);
            break;

          case "buttons":
            this.showBotButtonsContent(item);
            break;

          case "video":
            this.showBotVideoContent(item);
            break;

          case "audio":
            this.showBotAudioContent(item);
            break;

          case "voice":
            this.showBotVoiceContent(item);
            break;

          case "map":
            this.showBotMapContent(item);
            break;

          case "table":
            this.showBotTableContent(item);
        }
    }
    showBotTextContent(item) {
        this.visual.addBotText(item);
    }
    showBotImagesContent(item) {
        var imagesRow;
        for (imagesRow of item.images) {
            this.visual.addBotImagesRow();
            for (var image of imagesRow) this.visual.addBotImage(image);
        }
    }
    showBotImageContent(item) {
        this.visual.addBotImagesRow(), this.visual.addBotImage(item);
    }
    showBotButtonsContent(item) {
        var buttonRow;
        this.visual.addBtnWrapper();
        for (buttonRow of item.buttons) {
            this.visual.addBotButtonsRow();
            for (var button of buttonRow) (button.button || button.params && button.params.icon) && this.visual.addBotButton(button);
        }
    }
    showBotVideoContent(item) {
        this.visual.addBotVideo(item);
    }
    showBotAudioContent(item) {
        this.visual.addBotAudio(item);
    }
    showBotVoiceContent(item) {
        this.params.botVoice && (this.visual.addBotAudio(item), this.playAudioList());
    }
    playAudioList() {
        this.curAduio = this.visual.audioList[0], this.visual.audioList.length && this.curAduio.paused && (this.curAduio.play(), 
        this.curAduio.onpause = () => {
            this.curAduio.ended || (this.visual.audioList.length = 0), this.curAduio = null;
        }, this.curAduio.addEventListener("ended", () => {
            this.curAduio = null, this.visual.audioList.shift(), this.playAudioList();
        }));
    }
    showBotMapContent(item) {
        this.visual.addBotMap(item);
    }
    showBotTableContent(item) {}
}

class QuBotWebVisual extends QuBotVisual {}

class QuBotWeb extends QuBot {
    setVisual() {
        this.visual = new QuBotWebVisual();
    }
}

class QuBotManager extends QuBotQBLib {
    constructor(env) {
        super(env), this.bots = {}, this.uid = null, this.bot = null;
    }
    async create(params) {
        var old = document.getElementById("qubot"), old = (old && old.remove(), 
        this.uid = params.uid, params.bot), botType = (this.uid || (localStorage && (this.uid = localStorage.getItem("qubotUID"), 
        this.uid || (this.uid = this.uidGenerator(), localStorage.setItem("qubotUID", this.uid))), 
        params.uid = this.uid), params.botType || "web");
        "web" === botType && (this.bot = new QuBotWeb(this.env)), this.bot && (await this.bot.create(params), 
        old) && this.set(old, {
            analytics: params.analytics
        });
    }
    async initActions(type) {
        await this.bot.initActions(type);
    }
    setHelpBot(kind, params) {
        this.bot.actions.setHelpBot(kind, params);
    }
    async setBotConfig(bot, params, location) {
        return this.bot.set(bot, params), this.id = bot.id, new Promise(async (resolve, reject) => {
            let params = await this.env.loadSetup({
                botID: this.id
            });
            if (params) if (this.bot.visual.animation = params["anime-msg"], location) {
                let src = params["icon-logo1"];
                var loader;
                src && ((loader = document.getElementById("qubot-preloader")) && loader.classList.add("qubot-preloader"), 
                src = src.slice(src.indexOf("icons"), src.indexOf(".png") + 4), 
                (loader = document.createElement("img")).src = location + "/css/" + src, 
                loader.onload = () => {
                    this.setStyle(params), resolve();
                    var loader = document.getElementById("qubot-preloader");
                    loader && loader.classList.remove("qubot-preloader");
                });
            } else this.setStyle(params), resolve(); else this.setStyle(QuBotStyle.default), 
            resolve();
        });
    }
    async setBotID(botID, params, location) {
        return new Promise(async (resolve, reject) => {
            var bot = await this.env.loadBot({
                botID: botID
            });
            if (bot) return await this.setBotConfig(bot, params, location), resolve(), 
            this.bot;
            throw new Error("load bot with id ", botID, " error");
        });
    }
    botID() {
        return this.id;
    }
    userID() {
        return this.uid;
    }
    setStyle(params) {
        this.bot.setStyle(params);
    }
    getDefaultStyle() {
        return QuBotStyle.default;
    }
    showButton() {
        this.bot && this.bot.showButton();
    }
    hide() {
        this.bot.hide();
    }
    start(restart, lang = "en") {
        this.bot && this.bot.runState({
            restart: !0,
            lang: lang
        });
    }
    showState(state, lang = "en") {
        this.bot.runState({
            state: state,
            lang: lang
        });
    }
    clear() {
        this.bot.clear();
    }
    save() {
        this.bot.save();
    }
    setLang(lang) {
        this.bot.lang = lang;
    }
    botName() {
        return this.bot.name;
    }
    debugCreate() {
        this.bot.debug.create();
    }
    debugClear() {
        this.bot.debug.clear();
    }
    uidGenerator(a = null) {
        return a ? (a ^ 16 * Math.random() >> a / 4).toString(16) : ("10000000100040008000" + 1e11).replace(/[018]/g, this.uidGenerator);
    }
    add(id, bot) {
        this.bot = this.bots[id] = bot;
    }
    defaultBot(bot, name, id) {
        bot.id = id || 0, bot.name = name || "empty", bot.start = "MAIN", bot.states = {
            MAIN: [ {
                type: "text",
                text: {
                    en: "Text"
                }
            }, {
                type: "buttons",
                items: [ {
                    items: [ {
                        type: "button",
                        button: {
                            en: "Button"
                        },
                        actions: []
                    } ]
                } ]
            }, {
                type: "input",
                kind: "text",
                actions: []
            } ]
        }, bot.slots = {
            LANGUAGE: "en",
            INPUT: ""
        }, bot.cards = {
            states: {
                MAIN: {
                    r: 0,
                    c: 0,
                    x: 0,
                    y: 0
                }
            },
            folders: {}
        };
    }
    upgradeBotFormat(bot) {
        if (!bot) return bot;
        if ("states" in bot || this.defaultBot(bot, bot.name, bot.id), !("cards" in bot)) {
            var state, stateCards = {};
            for (state in bot.posFree) state in stateCards || (stateCards[state] = {
                c: 0,
                r: 0,
                x: 0,
                y: 0
            }), stateCards[state].x = bot.posFree[state].x, stateCards[state].y = bot.posFree[state].y;
            for (let state in bot.posGrid) state in stateCards || (stateCards[state] = {
                c: 0,
                r: 0,
                x: 0,
                y: 0
            }), stateCards[state].r = bot.posGrid[state].r, stateCards[state].c = bot.posGrid[state].c;
            bot.cards = {
                states: stateCards,
                folders: {}
            }, delete bot.posFree, delete bot.posGrid;
        }
    }
    async onBeforeUnloadEvent() {
        this.bot && (this.bot.save(), this.bot.events.send());
    }
}