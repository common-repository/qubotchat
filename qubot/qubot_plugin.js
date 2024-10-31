/*
* QuData Chat Builder Plugin.
*
* @copyright Copyright (C) 2023, qudata.com
*/
/******************************************************************************
 *                          Base class for environement
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotEnv{
    constructor(conf)
    {
        this.conf = conf
    }
    /**************************************************************************
     * Create environement
     */
    async create()
    {
        window.addEventListener('beforeunload', this.onBeforeUnloadEvent.bind(this));
        window.addEventListener('resize', this.onResizeEvent.bind(this), true);
        if (!document.body || this.conf.onLoad)
        {
            window.addEventListener('load', this.onLoadEvent.bind(this));    
        }
        else
        {
            this.run()
        }
        // !!! В WordPress вызывает окно "Данные могут быть не сохранены...", которое пугает некоторых клиентов
        //window.onbeforeunload = this.onBeforeUnloadEvent.bind(this)
    }

    /**************************************************************************
     * Run environement
     */
    async run()
    {

    }

    /**************************************************************************
     * Load window event
     */
    onLoadEvent()
    {           
        this.run() 
    }

    /**************************************************************************
     * Resize window event
     */
    async onResizeEvent(event)
    {            
    }

    /**************************************************************************
     * Before unload event
     */
    async onBeforeUnloadEvent()
    {
    }

    static log(...args) {
          console.log.apply(null, ["[qubot]", ...args]);
    }

    static warn(...args) {
          console.warn.apply(null, ["[qubot]", ...args]);
    }

    static error(...args) {
          console.error.apply(null, ["[qubot]", ...args]);       
    }
}



/******************************************************************************
 *                          WordPress qubot environement
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/

class QuBotWPQBEnv extends QuBotQBEnv{
    constructor(ajaxUrl){
        super()
        this.type        = 'wp'
        this.cid         = '7b6d77019f4ff38767bb5256aa22262c'  
	    this.ajaxURL     = ajaxUrl;
        this.lib         = new QuBotWPQBManager(this)
    }

    /**************************************************************************
     * Create bot environement
     */
    async create() {
        let params = {actions: 'local'}
        return this.lib.create(params)
    }


    /**************************************************************************
     * Run remote action
     * 
     * @param {*} action  - action name
     * @param {*} params  - action params
     */
    async runAction({action, params}){  
        switch (action)
        {
            case 'save': return this.runActionSave(params)
        }
    }

    /**************************************************************************
     * Run remote action save
     * 
     * @param {*} action  - action name
     * @param {*} params  - action params
     */
    async runActionSave(params){  
        return new Promise((resolve, reject)=>{
            let data = { 
                        'storage': params.storage,
                        'ownerID': 1,
                        'botID': params.bid,
                        'uid':   params.uid,
                        'time':  params.time, 
                        'value': JSON.stringify(params.value) }

            let datacEnc = encodeURIComponent(JSON.stringify(data))
            
            const request = new XMLHttpRequest();         
            //request.responseType =  "json";
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    resolve({'status': true})
                }
            });
            request.send("action=ajaxSetup&sendUserData="+datacEnc);    
        })
    }

    /**************************************************************************
     * Load bot
     */
    async loadBot({botID}) { 
        return new Promise((resolve, reject)=>{
            let data = { 
                'botID': botID
            }
    
            let dataStr  = JSON.stringify(data)
            let datacEnc = encodeURIComponent(dataStr)
                
            const request = new XMLHttpRequest();         
            //request.responseType =  "json";
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let dataEncoded = request.response;
                    try {
                        let data = this.decodeStr(dataEncoded)
                        let bot = JSON.parse(data)
                        let botData = JSON.parse(bot['data'])
                        resolve(botData);
                    }
                    catch (e)
                    {
                        resolve(null);
                    }
                }
            }.bind(this));
            request.send("action=ajaxSetup&loadBot="+datacEnc);   
        })
    }

    /**************************************************************************
     * Load editor param
     */
    async load({param}){  
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();         
            request.open("POST", this.ajaxURL, true);
            //request.responseType = 'json'
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    try {
                        let obj = JSON.parse(data)
                        resolve(obj);
                    }
                    catch (e)
                    {
                        resolve(null);
                    }
                }
            });
            request.send("action=ajaxSetup&loadSetup="+param);   
        })
    }

    /**************************************************************************
     * Load setup params
     */
    async loadSetup({botID}){  
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();         
            request.open("POST", this.ajaxURL, true);
            //request.responseType = 'json'
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    try {
                        let obj = JSON.parse(data)
                        resolve(obj);
                    }
                    catch (e)
                    {
                        resolve(null);
                    }
                }
            });
            request.send("action=ajaxSetup&loadSetup=qubotSetup");   
        })
    }


    /**************************************************************************
     * Send analytics request
     * 
     * * @param {*} request - request object.
     */
    async sendAnalytics(request){
        if (!this.isToken)
            return 
            
        let datacEnc = encodeURIComponent(JSON.stringify(request))
        let url = this.ajaxURL;
        let headers = {"Content-type":  "application/x-www-form-urlencoded"}
        this.sendPost(url, "action=ajaxSetup&analytics=" + datacEnc, headers) 
    }

    /**************************************************************************
     * Before unload event
     */
    async onBeforeUnloadEvent()
    {
        await this.lib.onBeforeUnloadEvent()
    }

    /**************************************************************************
     * Decode str
     */
    decodeStr(str) {
        if (!str) return str;
        var mapObj = {
            "__qlt;": "<",
            "__qgt;": ">",
            "__qamp;": "&"
        };
        return str.replace(/__qlt;|__qgt;|__qamp;/gi, function(matched) {
            return mapObj[matched];
        });
    }
}

/******************************************************************************
 *                      WordPress editor environement
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/

class QuBotWPEditorEnv extends QuBotEditorEnv{
    constructor(qbEnv, ajaxURL){
        super()
        this.type        = 'wp'
        this.lib         = new QuBotEditor(this)
		this.ajaxURL     = ajaxURL;        
        this.cid         = '7b6d77019f4ff38767bb5256aa22262c'    
        this.qbEnv       = qbEnv           

        //disable emojies
        //window._wpemojiSettings = null        
    }

    /**************************************************************************
     * Create editor environement
     */
    async create() {
        let params = {
            div: document.getElementById("qubot-page-editor"),
            loadBots: true,
            botLib: this.qbEnv.lib
        }
        return this.lib.create(params)
    }

    /**************************************************************************
     * Save editor param
     */
    async save({param, data}) {     
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();  
            let dataEnc = encodeURIComponent(data)
            request.open("POST", this.ajaxURL, true);
            request.responseType = 'json'
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");                 
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let obj = request.response; 
                    resolve({'status': true})
                }
            });
            request.send(param+"="+dataEnc+"&action=ajaxSetup");    
        })
    }

    /**************************************************************************
     * Load editor param
     */
    async load({param}){  
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();         
            request.open("POST", this.ajaxURL, true);
            //request.responseType = 'json'
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    try {
                        let obj = JSON.parse(data)
                        resolve(obj);
                    }
                    catch (e)
                    {
                        resolve(null);
                    }
                }
            });
            request.send("action=ajaxSetup&loadSetup="+param);   
        })
    }

    /**************************************************************************
     * Save bot
     */
    async saveBot({botID, name, data}) {  
        return new Promise((resolve, reject)=>{
            let row = { 
                'botID': botID,
                'name':  name,
                'data':  data
            }
    
            let rowStr = JSON.stringify(row)
            let rowStrEnc = this.encodeStr(rowStr)
            let rowStrEncURI = encodeURIComponent(rowStrEnc)
            
            const request = new XMLHttpRequest();         
            //request.responseType =  "json";
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    resolve({'status': true})
                }
            });
            request.send("action=ajaxSetup&saveBot="+rowStrEncURI);
        })      
    }

    /**************************************************************************
     * Load bot
     */
    async loadBot({botID}) { 
        return new Promise((resolve, reject)=>{
            let data = { 
                'botID': botID
            }
    
            let dataStr  = JSON.stringify(data)
            let datacEnc = encodeURIComponent(dataStr)
                
            const request = new XMLHttpRequest();         
            //request.responseType =  "json";
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let dataEncoded = request.response;
                    try {
                        let data = this.decodeStr(dataEncoded)
                        let bot = JSON.parse(data)
                        let botData = JSON.parse(bot['data'])
                        resolve(botData);
                    }
                    catch (e)
                    {
                        resolve(null);
                    }
                }
            }.bind(this));
            request.send("action=ajaxSetup&loadBot="+datacEnc);   
        })
    }
    
    /**************************************************************************
     * Save file into bot
     */
    async saveFile({botID, fileName, arrayBuffer}){
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
		    if(data) resolve(data);
                }
            });
	    let binary = '';
	    let bytes = new Uint8Array(arrayBuffer);
	    let len = bytes.byteLength;
	    for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
            request.send("action=ajaxSetup&botID="+botID+"&fileName="+fileName+"&arrayBuffer="+window.btoa(binary));   
        });
    }
	
    /**************************************************************************
     * New bot
     */
    async newBot() {        
        return null
    }
    
    /**************************************************************************
     * Delete bot
     */
    async deleteBot({botID}) { 
        return new Promise((resolve, reject)=>{
            let data = { 
                'botID': botID
            }
    
            let datacEnc = encodeURIComponent(JSON.stringify(data))
                
            const request = new XMLHttpRequest();         
            //request.responseType =  "json";
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    resolve({'status': true})
                }
            });
            request.send("action=ajaxSetup&deleteBot="+datacEnc);   
        })
    }
    
    /**************************************************************************
     * Retrieving data from storage.
     * 
     * * @param {*} last - How many recent entries. If last < 0 then everything.
     */
    async receive({storage, ownerID, botID, last = -1}){
        return new Promise((resolve, reject)=>{
            let data = {
                storage: storage,
                ownerID: ownerID,
                botID: botID                
            }
            let datacEnc = encodeURIComponent(JSON.stringify(data))
                
            const request = new XMLHttpRequest();         
            //request.responseType =  "json";
            request.open("POST", this.ajaxURL, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    var data = request.response;
                    try {
                        let rows = JSON.parse(data);
                        if (rows)
                        {
                            rows.forEach(row => {
                                row.value && (row.value = JSON.parse(row.value))
                            })
                            resolve(rows)
                        }
                    } catch (e) {
                        resolve(null);
                    }
                }
            });
            request.send("action=ajaxSetup&receiveUserData="+datacEnc); 
        })
    }

    /**************************************************************************
     * Send bot manager request
     * 
     * * @param {*} request - request object.
     */
    async sendBotManager(request){
        if (!this.isToken)
            return 
        request['plugin'] = "wordpress"
        let datacEnc = encodeURIComponent(JSON.stringify(request))
        let url = this.ajaxURL;
        let headers = {"Content-type":  "application/x-www-form-urlencoded"}
        this.sendPost(url, "action=ajaxSetup&botManager=" + datacEnc, headers) 
    }

    /**************************************************************************
     * Run extension method
     * 
     * * @param {*} extensionName - extension name
     * * @param {*} version - version of extension/request
     * * @param {*} requestName - request name
     * * @param {*} requestParams - request params
     */
    async runExtension(extensionName, version, requestName, requestParams){
        return null
    }

    /**************************************************************************
     * Before unload event
     */
    async onBeforeUnloadEvent()
    {
        await this.lib.onBeforeUnloadEvent()
    }

    /**************************************************************************
     * Encode str
     */
    encodeStr(str) {
        if (!str) return str;
        var mapObj = {
            "<": "__qlt;",
            ">": "__qgt;",
            "&": "__qamp;"
        };
        return str.replace(/<|>|&/gi, function(matched) {
            return mapObj[matched];
        });
    }

    /**************************************************************************
     * Decode str
     */
    decodeStr(str) {
        if (!str) return str;
        var mapObj = {
            "__qlt;": "<",
            "__qgt;": ">",
            "__qamp;": "&"
        };
        return str.replace(/__qlt;|__qgt;|__qamp;/gi, function(matched) {
            return mapObj[matched];
        });
    }

}

/******************************************************************************
 *                      WP setup environement
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/

class QuBotWPSetupEnv extends QuBotSetupEnv{
    constructor(qbEnv, pluginURL, ajaxURL){
        super()
        this.type        = 'wp'
        this.pathIcons   = pluginURL + 'qubot/editor/css/icons/';
		this.pathStyles  = pluginURL + 'qubot/editor/css/styles/';
        this.ajaxURL     = ajaxURL;
        this.qbEnv       = qbEnv         
    }

    /**************************************************************************
     * Create bot environement
     */
    async create() {
        let params = {
            botLib: this.qbEnv.lib,
            pathIcons:  this.pathIcons,
            pathStyles: this.pathStyles
        }
        return this.lib.create(params)
    }

    /**************************************************************************
     * Save setup params
     */
    async saveSetup({botID, params}) {     
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();  
            let dataEnc = JSON.stringify(params)
            request.open("POST", this.ajaxURL, true);
            request.responseType = 'json'
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");                 
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let obj = request.response; 
                    resolve({'status': true})
                }
            });
            request.send("qubotSetup="+dataEnc+"&action=ajaxSetup");    
        })
    }

    /**************************************************************************
     * Load setup params
     */
    async loadSetup({botID}){  
        return new Promise((resolve, reject)=>{
            const request = new XMLHttpRequest();         
            request.open("POST", this.ajaxURL, true);
            //request.responseType = 'json'
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.addEventListener("readystatechange", function(){
                if (request.readyState === 4 && request.status === 200) {
                    let data = request.response;
                    try {
                        let obj = JSON.parse(data)
                        resolve(obj);
                    }
                    catch (e)
                    {
                        resolve(null);
                    }
                }
            });
            request.send("action=ajaxSetup&loadSetup=qubotSetup");   
        })
    }
}

/******************************************************************************
 *                          WordPress console
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotWPConsole extends QuBotConsole{
    constructor(editor, qb, setup){
        super(editor, qb, setup)
    }
    /**************************************************************************
     * Start menu
     */
    setInterface(){        
        this.menu(document.getElementById("menu-qubot-page-bots")) 
    }

}
/******************************************************************************
 *                          WordPress plugin environement
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotWPPluginEnv extends QuBotEnv{
    constructor(conf){
        super(conf)
        this.qb         = new QuBotWPQBEnv(conf.ajaxURL)        
        this.editor     = new QuBotWPEditorEnv(this.qb, conf.ajaxURL)   
        this.pageSetup  = new QuBotWPSetupEnv(this.qb, conf.pluginURL, conf.ajaxURL)       
        this.console    = new QuBotWPConsole(this.editor.lib, this.qb.lib, this.pageSetup.lib)
    }
    /**************************************************************************
     * Start environement
     */
    async run(){
        await this.qb.create()        
        await this.editor.create(); 
        await this.pageSetup.create()        
        await this.console.create()
    }

    /**************************************************************************
     * Resize window event
     */
    async onResizeEvent(event)
    {
        await this.editor.onResizeEvent();          
    }

    /**************************************************************************
     * Before unload event
     */
    async onBeforeUnloadEvent()
    {
        await this.editor.onBeforeUnloadEvent();
    }
}










/*******************************************************************************
 *                            Manager of bots for WP
 ******************************************************************************/

 class QuBotWPQBManager extends QuBotManager {
    constructor(env) {
        super(env)
        this.bots = {}
        this.uid = null     // user id
        this.bot = null     // current bot instance
    }

    /**************************************************************************
     * Open bot
     */
    open() {
        let wpLang = document.documentElement.lang
        let i = wpLang.indexOf('-')
            if (i > -1) {wpLang = wpLang.substring(0, i)}
        this.start(true, wpLang)
    }
}

