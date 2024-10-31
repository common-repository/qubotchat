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
 *                          WordPress qubot embed environement
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotWPEmbedEnv extends QuBotEnv{
    constructor(conf){
        super(conf)
        this.qb = new QuBotWPQBEnv(conf.ajaxURL)
    }
    /**************************************************************************
     * Start environement
     */
    async run(){
        await this.qb.create()  
        //load bot data
        this.qb.load({param: "qubotUpload"})
            .then((data) => 
            {
                if(!data)                              
                    return

                if(!('wp' in data) || !data.wp.upload)
                    return

                let loader = document.getElementById('qubot-preloader');
                    if (loader) loader.parentNode.removeChild(loader)

                let qubotUpload = data;
                this.qb.isToken = data.wp.isToken;   

                let showOnPage = false;
                if(!qubotUpload.wp.all){
                    showOnPage = this.conf.currPage in qubotUpload.wp.pages;
                }
                if(showOnPage || qubotUpload.wp.all){
                    this.qb.lib.setBotID(qubotUpload.wp.bid, {analytics: !!this.qb.isToken})
                        .then(() =>{

                            if(qubotUpload.wp.time > 0)
                            {
                                setTimeout(()=>{
                                    this.qb.lib.open()
                                }, qubotUpload.wp.time * 1000)            
    
                            }
                            else
                                this.qb.lib.open(); 
                        });
                }
            });
    }

    /**************************************************************************
     * Before unload event
     */
    async onBeforeUnloadEvent()
    {
        await this.qb.onBeforeUnloadEvent();
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

