/*
* QuData Chat Builder Plugin.
*
* @copyright Copyright (C) 2023, qudata.com
*/
/******************************************************************************
 *                          Setup library API
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotSetupLib{
    constructor(env){
        this.env = env  //current environement
    }

    /**************************************************************************
     * Create lib
     */
    async create(params) {}

    /**************************************************************************
     * Select bot
     */
    async selectBot({botID}) {}

    /**************************************************************************
     * Show page
     */
    show(){}

    /**************************************************************************
     * Hide page
     */
    hide(){}
}
/******************************************************************************
 *                      Setup environement API
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotSetupEnv{
    constructor(){
        this.type       = null    //type of environement
        this.lib        = new QuBotSetup(this)
    }  

    /**************************************************************************
     * Save bot visual settings
     */
     async saveSetup({botID, params}) {}

     /**************************************************************************
      * Load bot visual settings
      */
     async loadSetup({botID}) {}
}
﻿
class QuBotSetupStyles extends QuBotSetupLib{
    constructor(env){
        super(env)
        
        this.styles = [
            {
                'file': "style1.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "0",
                    "setup_agent_id" : "1",
                    "setup_human_id" : "6",
                    "icon-logo1" : "url('icons/logo01a.png')",
                    "icon-logo2" : "url('icons/logo01b.png')",
                    "icon-human" : "url('icons/robot09.png')",  
                    "icon-agent" : "url('icons/logo01a.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "none",
                    "right" : "50px",
                    "top" : "none",
                    "bottom" : "50px",
                    "shadow-size" : "10px",
                    "shadow-blur" : "20px",
                    "shadow-color" : "#646464b2",
                    "header-background" : "#ffffff",
                    "header-line-width" : "1px",
                    "header-line-color" : "#ffffff",
                    "header-color" : "#0000ff",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#0000ff",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "5px",
                    "header-shadow-blur" : "20px",
                    "header-shadow-color" : "#646464b2",
                    "top-radius" : "20px",
                    "body-background" : "#ffffff",
                    "body-line-color" : "#ffffff",
                    "body-line-width" : "1px",
                    "body-backround-image" : "none",
                    'body-time-size':       '10px',
                    'body-time-color':      '#000000',        
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "20px",
                    "mes-padding" : "10px",
                    "footer-background" : "#ffffff",
                    "footer-line-width" : "1px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "3px",
                    "footer-shadow-blur" : "15px",
                    "footer-shadow-color" : "#646464b2",
                    "bottom-radius" : "20px",
                    "answer-background" : "#0079fe",
                    "answer-line-color" : "#0079fe",
                    "answer-line-size" : "1px",
                    "answer-color" : "#ffffff",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#f7f7f7",
                    "message-line-color" : "#212529",
                    "message-line-width" : "1px",
                    "message-color" : "#212529",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#0000ff",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#ffffff",
                    "button-background2" : "#f0f0f0",
                    "button-background3" : "#a0a0a0",
                    "button-line-color" : "#212529",
                    "button-line-width" : "1px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#212529",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    'input-background':      '#ffffff',
                    'input-font-color':      '#000000',
                    "icon-human-display" : "block",
                    "icon-agent-display" : "block",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#00aaff",
                    "close-color2" : "#00ccff",                                        
                    "send-color1" : "#00aaff",
                    "send-color2" : "#00ccff",                                    
                },
            },
            {
                'file': "style_linux_az1.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "0",
                    "setup_agent_id" : "2",
                    "setup_human_id" : "0",
                    "icon-logo1" : "url('icons/logo01a.png')",
                    "icon-logo2" : "url('icons/logo01b.png')",
                    "icon-human" : "url('icons/empty.png')",
                    "icon-agent" : "url('icons/robot02.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "none",
                    "right" : "50px",
                    "top" : "none",
                    "bottom" : "50px",
                    "shadow-size" : "0px",
                    "shadow-blur" : "0px",
                    "shadow-color" : "#c8c8c8b2",
                    "header-background" : "#f0f0f0",
                    "header-line-width" : "0px",
                    "header-line-color" : "#404040",
                    "header-color" : "#000000",
                    "header-font-size" : "20px",
                    "header-font-line" : "20px",
                    "header-info-color" : "#000001",
                    "header-info-size" : "14px",
                    "header-info-line" : "5px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "0px",
                    "header-shadow-color" : "#646464b2",
                    "top-radius" : "14px",
                    "body-background" : "#ffffffff",
                    "body-line-color" : "#404040",
                    "body-line-width" : "0px",
                    "body-backround-image" : "none",
                    'body-time-size':       '10px',
                    'body-time-color':      '#000000',        
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "14px",
                    "mes-padding" : "10px",
                    "footer-background" : "#f0f0f0",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#404040",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "0px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "14px",
                    "input-background" : "#ffffff",
                    "input-font-color" : "#000000",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#000000",
                    "answer-background" : "#ffffff",
                    "answer-line-color" : "#646464",
                    "answer-line-size" : "1px",
                    "answer-color" : "#000000",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#7f7f7f",
                    "message-line-color" : "#212529",
                    "message-line-width" : "1px",
                    "message-color" : "#ffffff",
                    "message-font-size" : "20px",
                    "message-font-line" : "20px",
                    "sender-font-size" : "15px",
                    "sender-font-line" : "18px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#ffffff",
                    "button-background2" : "#f0f0f0",
                    "button-background3" : "#a0a0a0",
                    "button-line-color" : "#212529",
                    "button-line-width" : "1px",
                    "button-radius" : "14px",
                    "button-height" : "24px",
                    "button-color" : "#212529",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "none",
                    "icon-agent-display" : "block",
                    "open-line" : "1px",
                    'open-color': 'black',
                    "close-color1" : "#646464",
                    "close-color2" : "#e01010",
                    "send-color1" : "#646464",
                    "send-color2" : "#e01010",
                    "win-line" : "1px",
                    "mes-line" : "1px",                                        
                },
            },

            {
                'file': "style_k01.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "0",
                    "setup_agent_id" : "0",
                    "setup_human_id" : "0",
                    "icon-logo1" : "url('icons/logo01a.png')",
                    "icon-logo2" : "url('icons/logo01b.png')",
                    "icon-human" : "url('icons/empty.png')",
                    "icon-agent" : "url('icons/empty.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "auto",
                    "right" : "50px",
                    "top" : "auto",
                    "bottom" : "50px",
                    "shadow-size" : "4px",
                    "shadow-blur" : "12px",
                    "shadow-color" : "#646464b2",
                    "header-background" : "#efeff3",
                    "header-line-width" : "0px",
                    "header-line-color" : "#ffffff",
                    "header-color" : "#307aff",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#307aff",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "2px",
                    "header-shadow-color" : "#646464b2",
                    "top-radius" : "12px",
                    "body-background" : "#ffffffff",
                    "body-line-color" : "#ffffff",
                    "body-line-width" : "0px",
                    'body-time-size':       '10px',
                    'body-time-color':      '#000000',        
                    "body-backround-image" : "none",
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "12px",
                    "mes-padding" : "8px",
                    "footer-background" : "#efeff3",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "2px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "20px",
                    "input-background" : "#ffffff",
                    "input-font-color" : "#000000",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#cbcbce",
                    "answer-background" : "#1e82fe",
                    "answer-line-color" : "#1e82fe",
                    "answer-line-size" : "0px",
                    "answer-color" : "#ffffff",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#f0f0f4",
                    "message-line-color" : "#212529",
                    "message-line-width" : "0px",
                    "message-color" : "#000000",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#307aff",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#ffffff",
                    "button-background2" : "#f0f0f4",
                    "button-background3" : "#cbcbce",
                    "button-line-color" : "#cbcbce",
                    "button-line-width" : "1px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#307aff",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "none",
                    "icon-agent-display" : "none",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#307aff",
                    "close-color2" : "#71a1f9",
                    "send-color1" : "#307aff",
                    "send-color2" : "#71a1f9",
                    "close-color3" : "#00ccff",
                    "right-hide" : "50px",
                    "left-hide" : "auto",
                    "bottom-hide" : "-100vh",
                    "top-hide" : "auto",
                    "win-line" : "1px",
                    "mes-line" : "1px",
                },
            },
            {
                'file': "style_k02.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "0",
                    "setup_agent_id" : "0",
                    "setup_human_id" : "0",
                    "icon-logo1" : "url('icons/logo01a.png')",
                    "icon-logo2" : "url('icons/logo01b.png')",
                    "icon-human" : "url('icons/empty.png')",
                    "icon-agent" : "url('icons/empty.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "auto",
                    "right" : "50px",
                    "top" : "auto",
                    "bottom" : "50px",
                    "shadow-size" : "4px",
                    "shadow-blur" : "12px",
                    "shadow-color" : "#646464b2",
                    "header-background" : "#323c50",
                    "header-line-width" : "0px",
                    "header-line-color" : "#ffffff",
                    "header-color" : "#30a6ff",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#30a6ff",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "2px",
                    "header-shadow-color" : "#646464b2",
                    "top-radius" : "12px",
                    "body-background" : "#19232dff",
                    "body-line-color" : "#ffffff",
                    "body-line-width" : "0px",
                    'body-time-size':       '10px',
                    'body-time-color':      '#808080',        
                    "body-backround-image" : "none",                    
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "12px",
                    "mes-padding" : "8px",
                    "footer-background" : "#323c50",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "2px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "20px",
                    "input-background" : "#19232d",
                    "input-font-color" : "#ffffff",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#cbcbce",
                    "answer-background" : "#406a96",
                    "answer-line-color" : "#406a96",
                    "answer-line-size" : "0px",
                    "answer-color" : "#ffffff",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#203042",
                    "message-line-color" : "#203042",
                    "message-line-width" : "0px",
                    "message-color" : "#ffffff",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#30a6ff",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#203042",
                    "button-background2" : "#ffffff",
                    "button-background3" : "#cbcbce",
                    "button-line-color" : "#cbcbce",
                    "button-line-width" : "1px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#3ba6ff",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "none",
                    "icon-agent-display" : "none",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#30a6ff",
                    "close-color2" : "#0091ff",
                    "send-color1" : "#25a4ff",
                    "send-color2" : "#0091ff",
                    "close-color3" : "#00ccff",
                    "right-hide" : "50px",
                    "left-hide" : "auto",
                    "bottom-hide" : "-100vh",
                    "top-hide" : "auto",
                    "win-line" : "1px",
                    "mes-line" : "1px",
                },
            },
            {
                'file': "style_k03.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "0",
                    "setup_agent_id" : "0",
                    "setup_human_id" : "0",
                    "icon-logo1" : "url('icons/logo01a.png')",
                    "icon-logo2" : "url('icons/logo01b.png')",
                    "icon-human" : "url('icons/empty.png')",
                    "icon-agent" : "url('icons/empty.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "auto",
                    "right" : "50px",
                    "top" : "auto",
                    "bottom" : "50px",
                    "shadow-size" : "0px",
                    "shadow-blur" : "2px",
                    "shadow-color" : "#646464b2",
                    "header-background" : "#efeff33f",
                    "header-line-width" : "0px",
                    "header-line-color" : "#ffffff",
                    "header-color" : "#307aff",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#307aff",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "2px",
                    "header-shadow-color" : "#646464b2",
                    "top-radius" : "12px",
                    "body-background" : "#ffffff3f",
                    "body-line-color" : "#ffffff",
                    "body-line-width" : "0px",
                    'body-time-size':       '10px',
                    'body-time-color':      '#000000',        
                    "body-backround-image" : "none",
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "6px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "12px",
                    "mes-padding" : "8px",
                    "footer-background" : "#efeff33f",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "2px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "20px",
                    "input-background" : "#ffffff",
                    "input-font-color" : "#000000",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "4px",
                    "input-margin-y" : "4px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#cbcbce",
                    "answer-background" : "#1e82fe",
                    "answer-line-color" : "#1e82fe",
                    "answer-line-size" : "0px",
                    "answer-color" : "#ffffff",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#f0f0f4",
                    "message-line-color" : "#212529",
                    "message-line-width" : "0px",
                    "message-color" : "#000000",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#307aff",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#ffffff",
                    "button-background2" : "#f0f0f4",
                    "button-background3" : "#cbcbce",
                    "button-line-color" : "#cbcbce",
                    "button-line-width" : "1px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#307aff",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "none",
                    "icon-agent-display" : "none",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#307aff",
                    "close-color2" : "#71a1f9",
                    "send-color1" : "#307cff",
                    "send-color2" : "#71a1f9",
                    "close-color3" : "#00ccff",
                    "right-hide" : "50px",
                    "left-hide" : "auto",
                    "bottom-hide" : "-100vh",
                    "top-hide" : "auto",
                    "win-line" : "1px",
                    "mes-line" : "1px",
                },
            },
            {
                'file': "style_k04.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "9",
                    "setup_agent_id" : "9",
                    "setup_human_id" : "6",
                    "text-sender-name" : "Qu",
                    "text-bot-name" : "QuBot",
                    "text-info" : "We are always in touch with you",
                    "icon-logo1" : "url('icons/robot07.png')",
                    "icon-logo2" : "url('icons/robot07.png')",
                    "icon-human" : "url('icons/robot09.png')",
                    "icon-agent" : "url('icons/robot06.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "auto",
                    "right" : "50px",
                    "top" : "auto",
                    "bottom" : "50px",
                    "shadow-size" : "4px",
                    "shadow-blur" : "12px",
                    "shadow-color" : "#646464b2",
                    "header-background" : "#fcfcfcff",
                    "header-line-width" : "0px",
                    "header-line-color" : "#ffffff",
                    "header-color" : "#212121",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#212121",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "2px",
                    "header-shadow-color" : "#646464b2",
                    "top-radius" : "12px",
                    "body-background" : "#ffffffff",
                    "body-line-color" : "#ffffff",
                    "body-line-width" : "0px",
                    'body-time-size':       '10px',
                    'body-time-color':      '#000000',        
                    "body-backround-image" : "url('backs/sky.jpg')  ",
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "12px",
                    "mes-padding" : "8px",
                    "footer-background" : "#fcfcfcff",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "2px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "20px",
                    "input-background" : "#fcfcfc",
                    "input-font-color" : "#000000",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#222222",
                    "answer-background" : "#8cbcff",
                    "answer-line-color" : "#6586ae",
                    "answer-line-size" : "1px",
                    "answer-color" : "#202020",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#dfdef5",
                    "message-line-color" : "#b8b7c2",
                    "message-line-width" : "1px",
                    "message-color" : "#212121",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#7077e5",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#f65e93",
                    "button-background2" : "#ea90b6",
                    "button-background3" : "#e50358",
                    "button-line-color" : "#a30041",
                    "button-line-width" : "1px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#ffffff",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "block",
                    "icon-agent-display" : "block",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#212121",
                    "close-color2" : "#636363",
                    "send-color1" : "#222222",
                    "send-color2" : "#636363",
                    "right-hide" : "50px",
                    "left-hide" : "auto",
                    "bottom-hide" : "-100vh",
                    "top-hide" : "auto",
                    "close-color3" : "#00ccff",
                    "win-line" : "1px",
                    "mes-line" : "1px",
                    "styleID" : "5",                    
                },
            },

            {
                'file': "style_k06.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "7",
                    "setup_agent_id" : "8",
                    "setup_human_id" : "5",
                    "text-sender-name" : "Qu",
                    "text-bot-name" : "QuBot",
                    "text-info" : "We are always in touch with you",
                    "icon-logo1" : "url('icons/robot05.png')",
                    "icon-logo2" : "url('icons/robot05.png')",
                    "icon-human" : "url('icons/robot08.png')",
                    "icon-agent" : "url('icons/robot05.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "auto",
                    "right" : "50px",
                    "top" : "auto",
                    "bottom" : "50px",
                    "shadow-size" : "4px",
                    "shadow-blur" : "12px",
                    "shadow-color" : "#6b6d73b2",
                    "header-background" : "#ffffffff",
                    "header-line-width" : "0px",
                    "header-line-color" : "#ffffff",
                    "header-color" : "#a5a8b1",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#a5a8b1",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "2px",
                    "header-shadow-color" : "#6b6d73b2",
                    "top-radius" : "12px",
                    "body-background" : "#ffffffff",
                    "body-line-color" : "#ffffff",
                    "body-line-width" : "0px",
                    "body-backround-image" : "none",
                    'body-time-size':       '10px',
                    'body-time-color':      '#000000',        
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "12px",
                    "mes-padding" : "8px",
                    "footer-background" : "#ffffffff",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "2px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "20px",
                    "input-background" : "#ffffff",
                    "input-font-color" : "#6b6d73",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#a5a8b1",
                    "answer-background" : "#f6fbfc",
                    "answer-line-color" : "#f6fbfc",
                    "answer-line-size" : "0px",
                    "answer-color" : "#202020",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#f3fbf5",
                    "message-line-color" : "#b8b7c2",
                    "message-line-width" : "0px",
                    "message-color" : "#212121",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#6377e4",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#6377e4",
                    "button-background2" : "#b0b9ef",
                    "button-background3" : "#8098ef",
                    "button-line-color" : "#6377e4",
                    "button-line-width" : "0px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#ffffff",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "block",
                    "icon-agent-display" : "block",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#a5a8b1",
                    "close-color2" : "#6b6d73",
                    "send-color1" : "#a5a8b1",
                    "send-color2" : "#6b6d73",
                    "right-hide" : "50px",
                    "left-hide" : "auto",
                    "bottom-hide" : "-100vh",
                    "top-hide" : "auto",
                    "close-color3" : "#00ccff",
                    "win-line" : "1px",
                    "mes-line" : "1px",
                    "styleID" : "5",                    
                },
            },

            
            {
                'file': "style_k07.jpg",
                'params': {
                    "botID" : "hello",
                    "setup_pos" : "rb",
                    "setup_pos_x" : "50",
                    "setup_pos_y" : "50",
                    "setup_logo_id" : "1",
                    "setup_agent_id" : "21",
                    "setup_human_id" : "4",
                    "text-sender-name" : "Qu",
                    "text-bot-name" : "QuBot",
                    "text-info" : "We are always in touch with you",
                    "icon-logo1" : "url('icons/logo02a.png')",
                    "icon-logo2" : "url('icons/logo02b.png')",
                    "icon-human" : "url('icons/smile04.png')",
                    "icon-agent" : "url('icons/animal01.png')",
                    "icon-close" : "url(svg/close.svg)",
                    "icon-send" : "url(svg/send.svg)",
                    "width" : "400px",
                    "height" : "600px",
                    "left" : "auto",
                    "right" : "50px",
                    "top" : "auto",
                    "bottom" : "50px",
                    "shadow-size" : "4px",
                    "shadow-blur" : "12px",
                    "shadow-color" : "#6b6d73b2",
                    "header-background" : "#47476bff",
                    "header-line-width" : "0px",
                    "header-line-color" : "#47476b",
                    "header-color" : "#f0eff2",
                    "header-font-size" : "18px",
                    "header-font-line" : "18px",
                    "header-info-color" : "#9fa2b1",
                    "header-info-size" : "12px",
                    "header-info-line" : "12px",
                    "header-shadow-size" : "0px",
                    "header-shadow-blur" : "0px",
                    "header-shadow-color" : "#6b6d73b2",
                    "top-radius" : "12px",
                    "body-background" : "#3b3d5bff",
                    "body-line-color" : "#3b3e5c",
                    "body-line-width" : "0px",
                    "body-backround-image" : "none",
                    'body-time-size':       '10px',
                    'body-time-color':      '#808080',        
                    "mes-shadow-size" : "0px",
                    "mes-shadow-blur" : "0px",
                    "mes-shadow-color" : "#646464b2",
                    "mes-radius" : "12px",
                    "mes-padding" : "8px",
                    "footer-background" : "#47476bff",
                    "footer-line-width" : "0px",
                    "footer-line-color" : "#ffffff",
                    "footer-shadow-size" : "0px",
                    "footer-shadow-blur" : "2px",
                    "footer-shadow-color" : "#646464b2",
                    "footer-height" : "30px",
                    "bottom-radius" : "20px",
                    "input-background" : "#ffffff",
                    "input-font-color" : "#9fa2b1",
                    "input-font-size" : "16px",
                    "input-radius" : "100px",
                    "input-height" : "30px",
                    "input-margin-x" : "5px",
                    "input-margin-y" : "5px",
                    "input-line-width" : "1px",
                    "input-line-color" : "#9a72e7",
                    "answer-background" : "#9a72e7",
                    "answer-line-color" : "#9a72e7",
                    "answer-line-size" : "0px",
                    "answer-color" : "#dfdee5",
                    "answer-font-size" : "18px",
                    "answer-font-line" : "20px",
                    "icon-human-size" : "30px",
                    "message-background" : "#47476b",
                    "message-line-color" : "#47476b",
                    "message-line-width" : "0px",
                    "message-color" : "#dfdee5",
                    "message-font-size" : "18px",
                    "message-font-line" : "20px",
                    "sender-color" : "#9b9ead",
                    "sender-font-size" : "13px",
                    "sender-font-line" : "15px",
                    "icon-agent-size" : "30px",
                    "open-radius" : "70px",
                    "open-radius-img" : "70px",
                    "button-background1" : "#5d4df6",
                    "button-background2" : "#928cff",
                    "button-background3" : "#463abd",
                    "button-line-color" : "#5d4df6",
                    "button-line-width" : "0px",
                    "button-radius" : "20px",
                    "button-height" : "30px",
                    "button-color" : "#ffffff",
                    "button-font-size" : "18px",
                    "button-font-line" : "20px",
                    "button-margin" : "3px",
                    "icon-human-display" : "block",
                    "icon-agent-display" : "block",
                    "open-line" : "0px",
                    'open-color': 'black',
                    "close-color1" : "#eae9ee",
                    "close-color2" : "#9fa2b1",
                    "send-color1" : "#eaeaee",
                    "send-color2" : "#9fa2b1",
                    "right-hide" : "50px",
                    "left-hide" : "auto",
                    "bottom-hide" : "-100vh",
                    "top-hide" : "auto",
                    "close-color3" : "#00ccff",
                    "win-line" : "1px",
                    "mes-line" : "1px",
                    "styleID" : "5",                    
                },
            },
            



        ]

    }

}
class QuBotSetup extends QuBotSetupStyles{

    constructor(env){
        super(env);
        
        this.logos1  = ['logo01a.png', 'logo02a.png', 'logo03a.png', 'robot01.png', 'robot02.png', 'robot03.png', 'robot04.png', 'robot05.png', 'robot06.png', 'robot07.png', 'robot08.png', 'robot09.png',];
        this.logos2  = ['logo01b.png', 'logo02b.png', 'logo03b.png', 'robot01.png', 'robot02.png', 'robot03.png', 'robot04.png', 'robot05.png', 'robot06.png', 'robot07.png', 'robot08.png', 'robot09.png',];
        this.agents  = ['empty.png', 'logo01a.png', 'logo02a.png', 'logo03a.png', 'robot01.png', 'robot02.png', 'robot03.png', 'robot04.png', 'robot05.png', 'robot06.png', 'robot07.png', 'robot08.png', 'robot09.png', 'human01.png', 'human02.png', 'human03.png', 'human04.png', 'human05.png', 'human06.png', 'human07.png' , 'human08.png', 'animal01.png', 'animal02.png', 'animal03.png', 'animal04.png', 'animal05.png', 'animal06.png', 'animal07.png','smile01.png', 'smile02.png', 'smile03.png', 'smile04.png',] ;
        this.humans  = ['empty.png', 'smile01.png', 'smile02.png', 'smile03.png', 'smile04.png', 'robot08.png', 'robot09.png',]        
        this.dontSave = false
        this.botID    = null
        this.setPage  = false
        this.params   = {}

    }

    /**************************************************************************
     * Create lib
     */
    async create(params) {
        this.qb         = params.botLib
        this.pathIcons  = params.pathIcons
        this.pathStyles = params.pathStyles
        this.createGUI()        
    }

    /**************************************************************************
     * Set default style
     */
    setDefaultParams(){
        this.params = {}
        Object.assign(this.params, this.qb.getDefaultStyle());
    }

    /**************************************************************************
     * Select bot
     */
    async selectBot({botID}) {
        this.botID   = botID
        return this.qb.setBotID(botID, {})
                    .then(()=>{
                        return this.load();
                    })
    }

    /**************************************************************************
     * Show page
     */
    show(){
        let page = document.getElementById('qubot-page-setup')
        page.style.display = 'flex';
        this.qb.showButton()
    }

    /**************************************************************************
     * Hide page
     */
    hide(){
        let page = document.getElementById('qubot-page-setup')
        page.style.display = 'none';
        this.qb.hide()
    }

    set(param, val, save=true){
        if (param === "anime-msg") {
            this.qb.bot.visual.animation = val;
        }
        this.params[param] = val;
        this.qb.setStyle({[param]:val})
        if(save)
            this.save();     
    }

    get(param){
        let val = getComputedStyle(document.documentElement).getPropertyValue('--qubot-'+param).trim() 
        return val;        
    }

    getParams(){
        let res = ""
        for(let p in this.params){
            res += `"${p}" : "${this.params[p]}",\n`;
        }            
        navigator.clipboard.writeText(res);             
    }

    color(color, alphaID){
        let alpha = parseInt(document.getElementById(alphaID).value);
        alpha = Math.floor(alpha*255/100).toString(16);
        if (alpha.length == 1){ alpha = "0"+ alpha; }
        return color + alpha;
    }
    
    addIcons(id, icons){
        let list = document.getElementById(id);
        for (let i=0; i < icons.length; i++){
            let icon = this.add(list, "icon")
            let img  = this.add(icon, null, "img")            
            let chk  = this.add(icon, null, "input")
            img.setAttribute("src", `${this.pathIcons}${icons[i]}`);
            chk.type = "checkbox";
            let pageSetup = this
            chk.onclick = function() {pageSetup.checkIcon(this, id)}
            chk.name = `${i}`
            chk.id   = 'qubot-'+id+'-'+i
        }
    }
    /**************************************************************************
     * Click on checkbox with id in section Icons
     * @param {*} checkbox 
     * @param {*} id 
     */
    checkIcon(checkbox, id) {
        let dontSave = this.dontSave
        this.dontSave = true

        let div = document.getElementById(id);         
        let icon = div.getElementsByClassName("icon")
        
        Array.from(icon).forEach(item => { item.childNodes[1].checked = false } )                                               
        checkbox.checked = true;
        let i = parseInt(checkbox.name);    
        if(id == "icons-logo"){
            this.params['setup_logo_id'] = i;                   
            this.set('icon-logo1', `url('icons/${this.logos1[i]}')`);                 
            this.set('icon-logo2', `url('icons/${this.logos2[i]}')`);                 
        }
        else if(id == "icons-agent"){
            this.params['setup_agent_id'] = i;
            if(i==0){ this.set('icon-agent-display', 'none'); }
            else    { this.set('icon-agent-display', 'block'); }                        
            this.set('icon-agent', `url('icons/${this.agents[i]}')`);
        }
        else if(id == "icons-human"){            
            this.params['setup_human_id'] = i;
            if(i==0){ this.set('icon-human-display', 'none'); }
            else    { this.set('icon-human-display', 'block'); }            
            this.set('icon-human', `url('icons/${this.humans[i]}')`);
        }           
        
        this.dontSave = dontSave
        this.save()        
    }
    /****************************************************************************
     * 
     * @param {*} id 
     * @param {*} styles 
     */
    addStyles(id, styles){
        let icon = document.getElementsByClassName("icon")    
        Array.from(icon).forEach(item => { if(item.childNodes.length > 1) item.childNodes[1].checked = false } )     

        let list = document.getElementById(id);
        let params = this.params
        let styleID = params['styleID'] === undefined ? 0 : params['styleID']
        for (let i=0; i < styles.length; i++){
            let item = this.add(list, "item")
            let img  = this.add(item, null, "img")            
            let chk  = this.add(item, "qubot-setup-sheck-style", "input")
            if ( i == styleID) { chk.checked = true; }
            let pageSetup = this
            img.onclick = function() {pageSetup.checkStyle(this, id)}
            img.setAttribute("src", `${this.pathStyles}${styles[i].file}`);
            chk.type = "checkbox";
            chk.onclick = function() {pageSetup.checkStyle(this, id)}
            chk.name = `${i}`
        }        
    }        
    /************************************************************************
     * 
     * @param {*} checkbox 
     * @param {*} id 
     */
    checkStyle(checkbox, id) {
        let dontSave = this.dontSave
        this.dontSave = true

        let icon = document.getElementsByClassName("icon")    
        Array.from(icon).forEach(item => { item.childNodes[1].checked = false } )     

        let div = document.getElementById(id);         
        icon = div.getElementsByClassName("item")        
         
        Array.from(icon).forEach(item => { item.childNodes[1].checked = false } )              
        if(checkbox.localName === 'img'){
            checkbox = checkbox.nextSibling    
        }
        checkbox.checked = true;
        let i = parseInt(checkbox.name);    

        let params = this.styles[i].params;
        params['styleID'] = i
        this.setParams(params);
        this.setInterfaceData()

        this.dontSave = dontSave
        this.save()
    }
    /**************************************************************************
     * Click on checkbox with id in section size
     * @param {*} checkbox 
     * @param {*} id 
     */
    checkSize(checkbox, id) {        
        let dontSave = this.dontSave
        this.dontSave = true

        let div = document.getElementById(id);                        
        div.childNodes.forEach((item) => { 
            if (item.className == "item"){ item.firstChild.checked = false  }
        })
        checkbox.checked = true;
        let w = document.getElementById("qubot-width");
        let h = document.getElementById("qubot-height");

        if(checkbox.value == "[-1,-1]"){ 
            w.disabled = h.disabled = false; 
            w.value = this.params.width.replace('px','');
            h.value = this.params.height.replace('px','');
        }
        else { 
            let size = JSON.parse(checkbox.value);                        
            this.set('width',  size[0]+'px')
            this.set('height', size[1]+'px')                
            w.value = size[0]; h.value = size[1];
            w.disabled = h.disabled = true; 
        }
        this.dontSave = dontSave
        this.save()
    }

    /**************************************************************************
     * Edit size of bot window from input obj in section size
     * @param {*} obj 
     */
    editSize(obj){
        let val = this.getInt(obj.value, 400);
        obj.value = val;
        let w = this.getInt(document.getElementById("qubot-width").value, 400)
        let h = this.getInt(document.getElementById("qubot-height").value, 600)
        this.set('width', w)
        this.set('height', h)
    }                            
    
    /**************************************************************************
     * Click on checkbox  in section position
     * @param {*} item 
     */
    checkPos(pos) {
        let dontSave = this.dontSave
        this.dontSave = true

        let win = document.getElementById("qubot-pos")        // clear all lines
        let items = win.getElementsByClassName("block")        
        Array.from(items).forEach(item => { item.style.borderStyle = 'none';} )                                

        document.getElementById("qubot-pos-lt").checked = false;  // unchecked all
        document.getElementById("qubot-pos-rt").checked = false;
        document.getElementById("qubot-pos-rb").checked = false;
        document.getElementById("qubot-pos-lb").checked = false;

        let chk = document.getElementById('qubot-pos-'+pos);
        let div = chk.parentElement;                      

        chk.checked = true;
        if      (pos === 'lt') { 
            document.getElementById("qubot-pos-x-name").innerHTML = "Left"; 
            document.getElementById("qubot-pos-y-name").innerHTML = "Top"; 
            div.style.borderBottomStyle = div.style.borderRightStyle = 'dotted';    
            div.style.borderBottomWidth = div.style.borderRightWidth = 'thin';    

        }
        else if (pos === 'rt') { 
            document.getElementById("qubot-pos-x-name").innerHTML = "Right"; 
            document.getElementById("qubot-pos-y-name").innerHTML = "Top"; 
            div.style.borderBottomStyle = div.style.borderLeftStyle = 'dotted';    
            div.style.borderBottomWidth = div.style.borderLeftWidth = 'thin';    

        }
        else if (pos === 'lb') { 
            document.getElementById("qubot-pos-x-name").innerHTML = "Left"; 
            document.getElementById("qubot-pos-y-name").innerHTML = "Bottom"; 
            div.style.borderTopStyle = div.style.borderRightStyle = 'dotted';    
            div.style.borderTopWidth = div.style.borderRightWidth = 'thin';    

        }
        else if (pos === 'rb') { 
            document.getElementById("qubot-pos-x-name").innerHTML = "Right"; 
            document.getElementById("qubot-pos-y-name").innerHTML = "Bottom"; 
            div.style.borderTopStyle = div.style.borderLeftStyle  = 'dotted';    
            div.style.borderTopWidth = div.style.borderLeftWidth  = 'thin';    
        }

        this.params.setup_pos = pos;
        this.editPos();
        this.dontSave = dontSave
        this.save("fromCheckPos")
    }   
    /***************************************************************************
     * Edit of bot window position  in section position
     * @param {*} obj 
     */    
    editPos(){
        this.setPos(document.getElementById("qubot-pos-x").value ,
                    document.getElementById("qubot-pos-y").value, this.params.setup_pos);
    }
    /**************************************************************************
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} org 
     */
    setPos(x,y,org){
        let dontSave = this.dontSave
        this.dontSave = true
        this.params.setup_pos = org;
        this.params.setup_pos_x = x;
        this.params.setup_pos_y = y;

        let pos_t = -1000;  // 0 - лево, право анимация
        let pos_b = -1000;  // 0 - лево, право анимация

        if( org[0] == 'l' ){ this.set('left', x+'px');   this.set('right', 'auto');   this.set('left-hide',  x+'px');  this.set('right-hide', 'auto');}  
        else               { this.set('right', x+'px');  this.set('left',  'auto');   this.set('right-hide', x+'px');  this.set('left-hide', 'auto');}    

        if( org[1] == 't' ){ this.set('top', y+'px');    this.set('bottom', 'auto');  this.set('top-hide', pos_t+'px');    this.set('bottom-hide', 'auto');}  
        else               { this.set('bottom', y+'px'); this.set('top', 'auto');     this.set('bottom-hide', pos_b+'px'); this.set('top-hide', 'auto');}      

        this.dontSave = dontSave
        this.save()
    }

    /**************************************************************************
     * Add new element to the page
     * @param {*} parent of element
     * @param {*} className - class of element
     * @param {*} element 
     * @returns 
     */
    add(parent, className, element="div"){
        let block = document.createElement(element);
        if (className !== null)
            block.className = className;
        if (parent !== null)
            parent.append(block);
        return block;
    }    

    getInt(str, def){
        if ( isNaN(str) )
            return def;
        return parseInt(str);
    }

    invertColor(hex) {
        function padZero(str, len) {
            len = len || 2;
            var zeros = new Array(len).join('0');
            return (zeros + str).slice(-len);
        }
    
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        // convert 3-digit hex to 6-digits.
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        // invert color components
        var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
            g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
            b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
        // pad each with zeros and return
        return '#' + padZero(r) + padZero(g) + padZero(b);
    }    
    /**************************************************************************
     * 
     */
    pageSet(color){
        let inv = this.invertColor(color);
        document.documentElement.style.setProperty('--console-menu-color', color);        
        document.documentElement.style.setProperty('--console-menu-font-color', inv);                
    }
    /**************************************************************************
     *      
     */
    checkBot(obj, botID){
        let list = document.getElementById("bots-list")
        let chks = list.getElementsByClassName("checkbox")
        Array.from(chks).forEach(item => { item.checked = false;} )       
        obj.checked = true;
        this.params['botID'] = botID;

        this.qb.close()
        //this.qb.set(this.params['botID'])
        this.qb.start()
        //this.qb.open()
        
        this.save();
    }    
    /**************************************************************************
     * 
     */
    setInterface(){        
        this.load()  
    }

    setInterfaceData(){
        for(let p in this.params){
            let div = document.getElementById("qubot-"+p);
            if (div != undefined){
                let val = this.params[p]
                if (typeof val === 'string' && val.length > 0){
                    val = val.replace('px','');
                    val = val.replace(/"/g, '');
                    val = val.replace(new RegExp("^[s]+|[s]+$", "g"), "")       // remove s in transition
                    if(val[0]=='#' && val.length == 9){  // remove alpha-channal
                        val = val.substring(0, 7);
                    }
                    //console.log()
                }                
                div.value  = val;    
            }
        }
        // set lines and pos in position section:
        document.getElementById('qubot-pos-x').value = this.params['setup_pos_x'];
        document.getElementById('qubot-pos-y').value = this.params['setup_pos_y'];
        this.checkPos(this.params['setup_pos']);

        document.getElementById('qubot-width').value = this.params['width'].replace('px','');
        document.getElementById('qubot-height').value = this.params['height'].replace('px','');
        document.getElementById('qubot-animation-msg').value = this.params['anime-msg'] || "scrolling";

        this.clearCheck("icons-logo")
        this.clearCheck("icons-agent")
        this.clearCheck("icons-human")

        let lo = document.getElementById('qubot-icons-logo-' +this.params['setup_logo_id']);  if(lo!=undefined) lo.checked = true;
        let ag = document.getElementById('qubot-icons-agent-'+this.params['setup_agent_id']); if(ag!=undefined) ag.checked = true;
        let hu = document.getElementById('qubot-icons-human-'+this.params['setup_human_id']); if(hu!=undefined) hu.checked = true;                      
    }

    clearCheck(id){
        let div = document.getElementById(id);
        let icon = div.getElementsByClassName("icon")
        
        Array.from(icon).forEach(item => { item.childNodes[1].checked = false } )    
    }

    setParams(params){
        if (params["anime-msg"]) {
            this.qb.bot.visual.animation = params["anime-msg"];
        }
        this.qb.setStyle(params)
        for(let param in params){      // it need for text vars:
            let val = params[param];
            this.params[param] = val;
        }
    }

    save(from){
        if(this.dontSave)
            return

        for(let param in this.params){
            let val = this.params[param];
            if (typeof val === 'string' && val.length > 0)    // it need for text vars:
                this.params[param] = val.replace('"', '');                   
        }
        if (!this.botID)
            return   

        this.env.saveSetup({botID: this.botID, params: this.params}, from)
    }

    async load(){                
        if (!this.botID)
            return    

        return this.env.loadSetup({botID: this.botID})
            .then((params)=>{
                if(params)
                {
                    this.setParams(params);    
                    
                }     
                else
                {
                    this.setDefaultParams()                    
                }   
                this.setInterfaceData();                                    
            })
            .catch((error) => {
                console.log('load setup error', error)   
                this.setDefaultParams()             
                this.setInterfaceData();    
            })
    }

    createGUI(){
        if(this.setPage)
            return

        this.setDefaultParams()

        this.addIcons("icons-logo",  this.logos1)
        this.addIcons("icons-agent", this.agents)
        this.addIcons("icons-human",  this.humans)

        this.addStyles("styles-list",  this.styles);
        this.setInterfaceData();
        
        window.scrollTo( 0, 0 ); 
            
        this.setPage = true        
    }
}

/******************************************************************************
 *                        Show the data saved by the bot.
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotMyBotsData extends QuBotEditorBase{
    constructor(editor) {
        super(editor)
        this.editor   = editor
        this.botID    = null
        this.dateFrom = null
        this.dateTo   = null
        //this.key      = null
    }
    /**************************************************************************
    *                                 Data page                               */
    /**************************************************************************
     *
     */
    create(){
        let pageData = this
        let dtFrom = document.getElementById('qubot-data-from')       
            dtFrom.value = this.getDate(new Date())
            dtFrom.onchange = function() {pageData.onchangeDateFrom(this)}
        this.dateFrom = dtFrom.value

        let dtTo   = document.getElementById('qubot-data-to')       
            dtTo.value = this.getDate(new Date())
            dtTo.onchange = function() {pageData.onchangeDateTo(this)}  
        this.dateTo = dtTo.value
/*
        let k = document.getElementById('qubot-data-key')    
        k.onchange = function() {pageData.onchangeKey(this)}
        this.key = k.value.trim()
*/        
        this.wrapper = document.getElementById('qubot-data-table')        
                
        let mybots = document.getElementById('qubot-data-mybots')
        while (mybots.firstChild)
            mybots.removeChild(mybots.lastChild);
        
        mybots.onchange = function() {pageData.onchangeBot(this)}
        for(let i = 0; i < this.editor.myBots.bots.length; i++){
            let op = this.add(mybots, null, 'option')
                op.value = this.editor.myBots.bots[i].id
                op.innerHTML = this.editor.myBots.bots[i].name
        }
        if (this.editor.myBots.bots.length > this.editor.myBots.botNumber){
            this.botID = this.editor.myBots.bots[this.editor.myBots.botNumber].id
            mybots.value = this.botID
        } 
        else
            this.botID = this.editor.myBots.bots[0].id
        this.showTable()
    }
    /**************************************************************************
     *
     */
    showTable(){
        while (this.wrapper.firstChild)
            this.wrapper.removeChild(this.wrapper.firstChild);
        
        let params = {
            storage: this.editor.env.type,
            ownerID: 1,
            botID: this.botID
        }
        
        this.editor.env.receive(params)
            .then((data)=>{
            if(!data)  
                return

            let keys = {}, col = 0
            for(let i=0; i < data.length; i++){
                let vals = data[i].value
                for(let k in vals)
                    if(!(k in keys))
                        keys[k] = col++                    
            }

            let table = this.add(this.wrapper, null, 'table')
            let tr = this.add(table, null, 'tr'), th
            th = this.add(tr, null, 'th').innerHTML = 'date'
            th = this.add(tr, null, 'th').innerHTML = 'time'
            th = this.add(tr, null, 'th').innerHTML = 'uid'
            for(let k in keys)
                this.add(tr, null, 'th').innerHTML = k            

            for(let i=0; i < data.length; i++){
                if(data[i].date < this.dateFrom)
                    continue
                if(data[i].date > this.dateTo)
                    break

                let tr = this.add(table, null, 'tr'), td
                td = this.add(tr, null, 'td'); td.innerHTML = data[i].time.split(' ')[0]
                td = this.add(tr, null, 'td'); td.innerHTML = data[i].time.split(' ')[1]
                td = this.add(tr, null, 'td'); td.innerHTML = data[i].uid.substring(0,8)

                let vals = data[i].value
                let tds  = []
                for(let k in keys)
                    tds.push(this.add(tr, null, 'td'))
                for(let k in vals)                
                    tds[keys[k]].innerHTML = vals[k]                
            }                
        }).catch((error) => {
            console.log('load data error', error)      
        })                       
    }
    /**************************************************************************
     *
     */
    onchangeBot(obj){    
        this.botID = obj.value        
        this.showTable()
    }
    onchangeKey(obj){
        this.key = obj.value.trim()
        this.showTable()
    }
    onchangeDateTo(obj){
        this.dateTo = obj.value
        this.showTable()
    }    
    onchangeDateFrom(obj){
        this.dateFrom = obj.value
        this.showTable()
    }    

    /**************************************************************************
     */
    getDate(today){
        let mm = (today.getMonth()+1).toString(), dd = today.getDate().toString()
        if(mm.length === 1){ mm = '0'+mm }
        if(dd.length === 1){ dd = '0'+dd }
        return  today.getFullYear()+ '-' + mm + '-' + dd
    }
}
/******************************************************************************
 *                               Show upload status
 * 
 *                                                   (c) 2021 qudata.com, steps
*******************************************************************************/
class QuBotMyBotsUpload extends QuBotEditorBase{
    constructor(qb, editor){
        super(editor)
        this.qb = qb
        this.editor = editor
    }
    /**************************************************************************
     *
     */
    async create(){
        //this.editor.env.save({param: "qubotSitePages", data: JSON.stringify([{id:'index', name:'main'}, {id:'blog', name:'blog'}, {id:'contacts', name:'contacts'}, {id:'about_us', name:'about us'}, {id:'faq', name:'faq'}, {id:'job', name:'job'}, {id:'products', name:'products'}])})

        this.pageUpload = document.getElementById("qubot-page-upload")        
        while (this.pageUpload.firstChild)                               // clear all
            this.pageUpload.removeChild(this.pageUpload.lastChild);

        return this.editor.env.load({param: "qubotUpload"})                // 1. info about previous uploaded
            .then((data)=>{
                if(! data )
                    data = {}    

                if(  !('wp' in data) )
                    data = { 
                        'wp': {                      // site id (just in case)
                            'isToken': false,        // token status
                            'upload': false,         // status                              
                            'bid':    "",            // bot id (by default)                        
                            'time':    0,            // time of opening in sec
                            'all':     true,         // all pages
                            'pages': {               // pages (if not all)
                                // 'index': {},      // unique parameters for the page
                            },
                        },            
                    }
                
                this.uploadData = data
                
                //this.startInfo = this.add(this.pageUpload, null, 'p')        
                return this.editor.env.load({param: "qubotEditorMyBots"})                        
            })
            .then((data)=>{
                if (!data)     
                    return

                this.myBots = data
        
                let botName = ""
                for(let i = 0; i < this.myBots.bots.length; i++)
                    if(this.uploadData.wp.bid == this.myBots.bots[i].id){
                        botName = this.myBots.bots[i].name
                    }                    
        
                let group = this.add(this.pageUpload, 'group')
                this.startInfo = this.add(group, 'label')
                let pageUpload = this
                let btn = this.add(group, 'qubot-button', 'button')
                btn.onclick = function() {pageUpload.onclickUploadBot(this)}
                if( this.uploadData.wp.upload){
                    this.startInfo.innerHTML = `<b>Bot "${botName}" is ENABLED</b>`
                    btn.innerHTML = "Stop"            
                }
                else{
                    this.startInfo.innerHTML = '<b>No bot is running:</b>'
                    btn.innerHTML = "Start"
                }
                this.add(group, null, 'hr')
        
                group = this.add(this.pageUpload, 'group')
                let label = this.add(group, 'label')
                label.innerHTML = '<b>1. Select bot:</b>'
                this.selectMyBots = this.add(group, 'select', 'select')            
                this.selectMyBots.onchange = function(){pageUpload.onchangeUploadBot(this)}
                for(let i = 0; i < this.myBots.bots.length; i++){
                    let op = this.add(this.selectMyBots, null, 'option')
                    op.value     = this.myBots.bots[i].id
                    op.innerHTML = this.myBots.bots[i].name                            
                    if(this.uploadData.wp.bid == this.myBots.bots[i].id)
                        op.setAttribute('selected', 'selected')
                }    
                return this.editor.env.load({param: "qubotSitePages"})
            })
            .then((data)=>{
                let group =  this.add(this.pageUpload, 'group')
                let label = this.add(group, 'label')
                label.innerHTML = '<b>2. Select page:</b>'
    
                let pageUpload = this
                let item =  this.add(group, 'item')
                this.checkAll  = this.add(item, 'checkbox', 'input')
                this.checkAll.type = 'checkbox'
                this.checkAll.onchange = function() {pageUpload.onchangeAllPages(this)}
                if(this.uploadData.wp.all)
                    this.checkAll.checked = true            
    
                label = this.add(item, null, 'label')
                label.innerHTML= "All pages"
                
                if(data){                
                    group = this.add(this.pageUpload, 'group')
                    label = this.add(group, 'label')
                    label.innerHTML = 'Selected pages:'
                    this.pagesList = this.add(group, 'pages-list')            
                    for(let i = 0; i < data.length; i++){
                        let item = this.add(this.pagesList, 'item')
                        let chk = this.add(item, 'checkbox', 'input')                
                        chk.type = 'checkbox'
    
                        if(this.uploadData.wp.all || data[i].id in this.uploadData.wp.pages)
                            chk.checked = true
                        
                        chk.setAttribute('value', data[i].id)
                        chk.onchange = function() {pageUpload.onchangePage(this)}
    
                        let label = this.add(item, 'label', 'label')
                        label.innerHTML = data[i].name                
                    }
                } 

                group = this.add(this.pageUpload, 'group')
                label = this.add(group, 'label')
                label.innerHTML = '<b>3. Set time until the bot opens (sec):</b>'
        
                this.uploadTime = this.add(group, 'input', 'input')
                this.uploadTime.value = this.uploadData.wp.time
                                    
                return this.editor.env.load({param: "qubotToken"})                
            })
            .then((data)=>{
                let token = data ? data.token : ''
                let group = this.add(this.pageUpload, 'group')
                let label = this.add(group, null, 'p')
                label.innerHTML = 'To use extended data storage option instead of the WordPress default database, you will need to visit ' +  '<a href="https://console.qudata.com?from=wp">' + "https://console.qudata.com" + '</a>' + ' and obtain your ID. <br>Filling the ID field below signifies the acceptance of access from the plugin to the external servers.'
                label = this.add(group, 'label')
                label.innerHTML = "ID:"

                this.uploadToken = this.add(group, 'input', 'input')
                this.uploadToken.value = token
                this.uploadToken.onchange = this.onchangeToken.bind(this)
                this.editor.env.setClientToken(token)
            })
            .catch((error) => {
                this.editor.critical('create upload error', error)
                throw new Error('create upload error')
            })
    }
    /**************************************************************************
     *
     */
    startAnalitics(){
        if(localStorage){
            localStorage.setItem('qubotBotsUID', '{}')
        }         
        this.editor.addBotEvent(this.selectMyBots.value, this.selectMyBots.options[this.selectMyBots.selectedIndex].text)
    }
    /**************************************************************************
     *
     */
    onchangeAllPages(obj){
        let pages =  this.pagesList.getElementsByTagName('input')
        for(let i=0; i < pages.length; i++)
            pages[i].checked = obj.checked
        //alert(obj.checked)
    }
    /**************************************************************************
     *
     */
    onchangeToken(obj){
        this.editor.env.setClientToken(this.uploadToken.value)        
        this.editor.env.save({param: 'qubotToken', data: JSON.stringify({token: this.uploadToken.value})})          
        this.uploadData.wp.isToken  = (this.uploadToken.value && this.uploadToken.value.length > 10)
        this.editor.env.save({param: 'qubotUpload', data: JSON.stringify(this.uploadData)})  
        this.startAnalitics()      
    }
    /**************************************************************************
     *
     */
    onchangePage(obj){
        if(!obj.checked)
            this.checkAll.checked = false
    }
    /**************************************************************************
     *
     */
    onchangeUploadBot(obj){    
        //alert(obj.value)        
    }    
    /**************************************************************************
     *
     */
    onclickUploadBot(obj){
        this.uploadData.wp.upload  = this.uploadData.wp.upload ? false : true
        this.uploadData.wp.bid     = this.selectMyBots.value
        this.uploadData.wp.all     = this.checkAll.checked 
        this.uploadData.wp.time    = this.uploadTime.value
        this.uploadData.wp.isToken = (this.uploadToken.value && this.uploadToken.value.length > 10)

        //save token
        let token = {token: this.uploadData.wp.isToken ? this.uploadToken.value : ''}
        this.editor.env.save({param: 'qubotToken', data: JSON.stringify(token)})
        
        this.uploadData.wp.pages = {}
        if( ! this.uploadData.wp.all){
            let pages =  this.pagesList.getElementsByTagName('input')            
            for(let i=0; i < pages.length; i++)
                if(pages[i].checked)
                    this.uploadData.wp.pages[pages[i].value] = {}
        }
        //console.log(this.uploadData)
        this.editor.env.save({param: 'qubotUpload', data: JSON.stringify(this.uploadData)})
            .then((status)=>{
                let botName = ""
                for(let i = 0; i < this.myBots.bots.length; i++)
                    if(this.uploadData.wp.bid == this.myBots.bots[i].id){
                        botName = this.myBots.bots[i].name
                        this.qb.setBotConfig(this.myBots.bots[i],{analytics: false})        
                        this.qb.clear()
                        this.qb.save()
                        break
                    }                    
    
                if(this.uploadData.wp.upload){
                    this.editor.help.alert('UploadBot')
                    obj.innerHTML = "Stop"
                    this.startInfo.innerHTML = `<b>Bot "${botName}" is ENABLED</b>`     
                     
                    this.startAnalitics()          
                }
                else{
                    this.editor.help.alert('UnUploadBot')
                    obj.innerHTML = "Start"
                    this.startInfo.innerHTML = '<b>No bot is running:</b>'
                }    
            })
    }
}
class QuBotConsole{
    constructor(editor, qb, setup){
        this.editor      = editor
        this.qb          = qb
        this.pageSetup   = setup
        this.pageData    = new QuBotMyBotsData(this.editor)
        this.pageUpload  = new QuBotMyBotsUpload(this.qb, this.editor)     
        this.pageID      = null    //current page id
        //this.pageUsers   = new QuBotUsersPage()
    }

    /**************************************************************************
     * Create console
     */
    async create()
    {
        this.createMenu()
        this.setInterface()
    }

    /***************************************************************************
     * Create menu
     */
    createMenu(){
        let menu  = document.getElementById("qubot-console-menu")
        let items = [
            ["menu-qubot-page-bots",    "Intro"],
            ["menu-qubot-page-editor",  "Editor"],
            ["menu-qubot-page-setup",   "Setup"],
            ["menu-qubot-page-upload",  "Launch"],
            ["menu-qubot-page-data",    "Data"]
        ]
        for(let i=0;i<items.length;i++)
        {
            this.createMenuItem(menu, items[i][0], items[i][1])
        }
    }

    /***************************************************************************
     * Create menu item
     */
    createMenuItem(parent, id, value){
        let el = document.createElement('a');
        let console = this
        el.id = id
        el.onclick = function() {console.menu(this)}
        el.innerText = value;
        parent.append(el)
    }

    /**************************************************************************
     * Start menu
     */
    setInterface(){
        this.menu(document.getElementById("menu-qubot-page-bots"))        
        //this.menu(document.getElementById("menu-qubot-page-editor"))
        //this.menu(document.getElementById("menu-qubot-page-users"))          
    }
    /**************************************************************************
     * Select item of menu obj. Start page in window.onload = function (editor.html)
     */
    async menu(obj){
        this.qb.hide()
        let pages = [ 'qubot-page-bots',  'qubot-page-editor', 
                      'qubot-page-setup', 'qubot-page-upload', 
                      'qubot-page-data'] //,  'qubot-page-users']
        


        for(let i = 0; i < pages.length; i++){ 
            let p = document.getElementById(pages[i]);    
            p.style.display = 'none'            
            document.getElementById('menu-'+pages[i]).className = ""
        }

        obj.className = "active";

        let id = obj.id.substring(5)
        let page = document.getElementById(id)

        if(this.pageID === 'qubot-page-editor' && id !== this.pageID){ 
            await this.editor.hide({})
        }

        if(id === 'qubot-page-editor'){   
        }
        else if(id === 'qubot-page-setup'){            
        }
        else if(id === 'qubot-page-data'){
            this.pageData.create()
        } 
        else if(id === 'qubot-page-upload'){
            this.pageUpload.create()
        } 
        else if(id === 'qubot-page-users'){
            this.pageUsers.create()
        } 
        else{
            //this.qb.set(this.params['botID'])                     
        }
        //this.qb.start()
        //this.qb.open()

        page.style.display = 'flex';
        window.scrollTo( 0, 0 );

        if(id === 'qubot-page-editor'){ 
            this.showPageEditor()
        }
        else if(id === 'qubot-page-setup'){      
            this.showPageSetup()      
        }
        this.pageID = id
    }

    /**************************************************************************
     * Get active bot id
     */
    async activeBotID(){
        return this.editor.env.load({param: "qubotEditorMyBots"})
            .then((data)=>{
                if (!data){                    
                    return null
                }
                
                if(! ('bots' in data) ){      // get list of bots                                   
                    return null
                }            
         
                if('botNumber' in data){
                    return data.bots[data.botNumber].id
                }    
            })
            .catch((error)=>{            
                return null
            })
    }

    /**************************************************************************
     * Show editor page
     */
    async showPageEditor()
    {
        await this.editor.show({})
        this.editor.resetEditorAndAllCards()
    }

    /**************************************************************************
     * Show setup page
     */
    async showPageSetup()
    {
        //get active bot
        let botID = await this.activeBotID()
        if (botID)
            await this.pageSetup.selectBot({botID})

        await this.pageSetup.show({})
    }
}

 


