<?php
/*
Plugin Name: QuBotChat
Plugin URI: https://qudata.com/en/qubot/wordpress/
Description: Add QuBot to your website and build personalized live chats without coding. Enjoy the simple visual setup editor and various ready-to-use templates.
Version: 1.1.10
Author: QuData
Author URI: https://qudata.com
*/
$qubotchat_plugin_data = get_file_data(__FILE__, array('Version' => 'Version'), false);
$qubotchat_plugin_version = $qubotchat_plugin_data['Version'];
define('QUBOTCHAT_CURRENT_VERSION', $qubotchat_plugin_version);
$qubotchat_plugurldir = get_option('siteurl').'/'.PLUGINDIR.'/qubotchat/';
$qubotchat_qubotchat_domain = 'qubotchat';
load_plugin_textdomain($qubotchat_qubotchat_domain, false, PLUGINDIR.'/qubotchat');
add_action('init', 'qubotchat_init');
add_action('wp_footer', 'qubotchat_script', 1000);

register_activation_hook(__FILE__, 'qubotchat_activate');
register_uninstall_hook(__FILE__, 'qubotchat_uninstall');

function qubotchat_activate() {
     //Init database
     global $wpdb;
     $collate = ''; 
     if ( $wpdb->has_cap( 'collation' ) ) {
        if ( ! empty( $wpdb->charset ) ) {
            $collate .= "DEFAULT CHARACTER SET $wpdb->charset";
        }
        if ( ! empty( $wpdb->collate ) ) {
            $collate .= " COLLATE $wpdb->collate";
        }
    }

    $tableUsersData = $wpdb->prefix.'qubotchat_data';     
    $tableBots = $wpdb->prefix.'qubotchat_bots';     

    //Bot configuration table
    $sqlTableBots = "
        CREATE TABLE IF NOT EXISTS `$tableBots` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `botID`   varchar(32), 
            `name`    TEXT, 
            `data`    LONGTEXT, 
            PRIMARY KEY (`id`)
        )  $collate AUTO_INCREMENT=1 ";


    //Bot users data table
    $sqlTableUsersData = "
        CREATE TABLE IF NOT EXISTS `$tableUsersData` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `ownerID` varchar(32), 
            `botID`   varchar(32), 
            `time`    DATETIME, 
            `uid`     varchar(32), 
            `value`   TEXT, 
            PRIMARY KEY (`id`)
        )  $collate AUTO_INCREMENT=1 ";
        
    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta( $sqlTableBots );
    dbDelta( $sqlTableUsersData );
    add_option('qubotchat_do_activation_redirect', true);
}

function qubotchat_init() {
    if(function_exists('current_user_can') && current_user_can('manage_options')) {
        add_action('admin_menu', 'qubotchat_create_menu');
    }
	if (is_admin() && !empty($_GET["page"]) && $_GET["page"] == "qubotchat_dashboard") {
		add_action('admin_enqueue_scripts', 'qubotchat_admin_scripts');
	}
    if (get_option('qubotchat_do_activation_redirect', false)) {
        delete_option('qubotchat_do_activation_redirect');
        exit(wp_redirect(admin_url('admin.php?page=qubotchat_dashboard')));
    }
}

/**
 * Include admin scripts
 */
function qubotchat_admin_scripts()
{
	if (!empty($_GET["page"]) && $_GET["page"] == "qubotchat_dashboard") {
		wp_register_style('qubotchat_console', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/console/css/console.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_console');
		wp_register_style('qubotchat_qubot', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/qb/css/qubot.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_qubot');
		wp_register_style('qubotchat_editor', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/editor/css/editor.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_editor');
		wp_register_style('qubotchat_code_input', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/editor/css/code-input.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_code_input');
		wp_register_style('qubotchat_prism', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/editor/css/prism.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_prism');
		wp_register_style('qubotchat_bots', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/pages/bots/css/bots.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_bots');
		wp_register_style('qubotchat_data', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/pages/data/css/data.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_data');
		wp_register_style('qubotchat_setup', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/pages/setup/css/setup.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_setup');
		wp_register_style('qubotchat_upload', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/pages/upload/css/upload.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
		wp_enqueue_style('qubotchat_upload');
		
		wp_register_script('qubotchat_qubot', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/qb/qb.js', basename(__FILE__)), array(), QUBOTCHAT_CURRENT_VERSION, false);
		wp_enqueue_script('qubotchat_qubot');
		wp_register_script('qubotchat_editor', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/editor/editor.js', basename(__FILE__)), array(), QUBOTCHAT_CURRENT_VERSION, false);
		wp_enqueue_script('qubotchat_editor');
		wp_register_script('qubotchat_console', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/console/console.js', basename(__FILE__)), array(), QUBOTCHAT_CURRENT_VERSION, false);
		wp_enqueue_script('qubotchat_console');
		wp_register_script('qubotchat_plugin', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/qubot_plugin.js', basename(__FILE__)), array(), QUBOTCHAT_CURRENT_VERSION, false);
		wp_enqueue_script('qubotchat_plugin');
	}
}

function qubotchat_dashboard() {
    global $wpdb;
    $pagesDB = '';
    $pages = get_pages();
    foreach($pages as $key=>$page){
        if($page->post_type == "page"){
            if($key) $pagesDB .= ',';
            $pagesDB .= '{"id":"'.$page->post_name.'","name":"'.$page->post_title.'"}';
        }
    }
    $pagesDB = '{"id":"index","name":"main"},{"id":"blog","name":"blog"}'.(!empty($pagesDB)?','.$pagesDB:'');
    if(!get_option('qubotSitePages')){
        add_option('qubotSitePages', "[{$pagesDB}]");
    } else {
        update_option('qubotSitePages', "[{$pagesDB}]");
    }?>
    
<script>   
	let envConf = {
		'pluginURL': '<?php echo plugin_dir_url( __FILE__ ); ?>',
		'ajaxURL': '<?php echo admin_url('admin-ajax.php'); ?>',
		'onLoad': true
	}
	var qubotEnv = new QuBotWPPluginEnv(envConf)
	var qubotSetup = qubotEnv.console.pageSetup

	qubotEnv.create()

</script>


      
<!---------------------------------------------------------->
<div class="console">

    <div class="header">
        <div class="caption">
            QuBot Control Panel   
        </div>
        
    </div> <!-- header -->

    <div class="content">
        <div id="qubot-console-menu" class="menu qubot-disable-select"> </div> <!-- left menu -->
        <div class="pages">        
    <!--BEGIN_PAGE_BOTS-->
            <!---------------------------------------------------------------------------------------------------------------------------->
            <div id="qubot-page-bots" class="page-bots">
                <p>
                    Follow three simple steps to place a chatbot on your website:
                </p>                
                <ol>
                    <li> Configure logic and content on the <b>Editor</b> tab. 
                        You can choose one of the available templates and change only text to the necessary language. 
                        Or you can create a new bot with a simple yet very powerful constructor. 
                        <li> Adjust your bot's appearance on the <b>Setup</b> tab. 
                        You can use one of the offered designs or customize any elements of the bot window to your liking. 
                        <li> Define on the <b>Launch</b> tab which one of your bots will appear on the site pages. 
                        You can set the place and time of its appearance. 
                </ol>                                  
                <p>
                    In addition,
                </p>                
                <ul>
                    <li> Access the <b>Data</b> tab where you can view information from the bot, 
                        if it is set up to collect data while communicating with site visitors.
                </ul> 
                <p>
                    You can always order a unique chatbot developed and customized especially for your business needs. 
                </p>
                <p>                
                    Find out <a href = "https://qudata.com/en/qubot/wordpress/" target="_blank"> what QuBot can offer</a> for your company.
                </p>
                <p>                
                    <a href = "https://qudata.com/en/tutorials/" target="_blank"> Watch our educational videos and tutorials</a> to learn how QuBot chat builder works.
                </p>
                <p>
                    Please note that graphics assets included or referenced by url in the templates are for demo purposes only. You will need to replace them by your own before releasing your new chatbot.
                </p>
                <p>               
                    A brief description of the templates available in the editor is presented below: 
                </p>
                <div class="bots-list" id="bots-list">
                    <div class="bot-card">
                        <div class="title">Сollecting contact information</div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/contacts.jpg', __FILE__));?>" style="float:left;" >
                            <p class="abstract">
                                A chatbot is more effective at collecting customer information than any form on a website. 
                            </p>
                            <p>
                                This bot will offer the visitor to choose a convenient communication channel (phone or email). 
                                While entering data, it will check the format accuracy. 
                                After conversation, it will repeat the received information 
                                and offer to correct possible errors or imprecisions, 
                                as well as ask to leave a text message. 
                            </p>
                            <p>
                                The filled in data will be saved and available for viewing on the <b>Data</b> tab. 
                            </p>
                        </div>
                    </div>

                    <div class="bot-card" >
                        <div class="title">FAQ-assistant</div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/faq.jpg', __FILE__));?>" style="float:left;">
                            <p class="abstract">
                                Getting a reply during conversation is more convenient than looking for static information on the site. 
                            </p>
                            <p>
                                The chosen template is devoted to answering questions about chatbots.  
                                Available form, while demonstrating a good example of how to implement such a bot by yourself, 
                                requires additional settings. You can easily do it in the editor. 
                                No programming knowledge is required. If you know your customers’ typical questions, 
                                creating such a bot will take no time.
                            </p>
                        </div>
                    </div>

                    <div class="bot-card" >
                        <div class="title">HR-assistant</div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/hr.jpg', __FILE__));?>" style="float:left;">
                            <p class="abstract">
                                HR-assistant will help you in recruiting personnel.  
                            </p>
                            <p>
                                The bot can briefly present your company and conduct an interview for two current vacancies. 
                            </p>                                                      
                            <p>
                                You can simply remove a button according to your recruitment needs, 
                                for example, if there is only one job opening. 
                                Of course, all the card texts should be adjusted to match your company information. 
                            </p>
                            <p>
                                The bot will save interview results and applicants’ contact information for you  
                                to view it on the <b>Data</b> tab.
                            </p>
                        </div>
                    </div>                

                    <div class="bot-card" >
                        <div class="title">Scheduling 
                        </div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/scheduling.jpg', __FILE__));?>" style="float:left;">
                            <p class="abstract">
                                Let chatbot organize your company calendar so the business runs smoothly. 
                            </p>
                            <p>
                                This bot through a simple conversation helps your website visitors plan and set up required appointments. It will discuss all available options in date, time and place as well as collect all the necessary customer information. In the end, chatbot will confirm the details and add new meetings to the schedule.
                            </p>
                            <p>
                                There will be no more confusion in appointments. Entrust your work calendar to the QuBot by QuData and maximize your team’s productivity via automated scheduling.
                            </p>
                        </div>
                    </div>

                    <div class="bot-card" >
                        <div class="title">Booking 
                        </div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/booking.jpg', __FILE__));?>" style="float:left;">
                            <p class="abstract">
                                Confidently delegate your routine work of handling the booking to the chatbot.
                            </p>
                            <p>
                                Available template offers to build a booking chatbot. Customers can navigate through its set of options while answering questions according to their preferences.
                            </p>
                            <p>
                                This chatbot can easily find out all the important information for the check in. It learns customer wishes and offers acceptable pricing options. In the end booking bot reconciles all data.
                            </p>
                        </div>
                    </div>

                    <div class="bot-card" >
                        <div class="title">About us
                        </div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/about.jpg', __FILE__));?>" style="float:left;">
                            <p class="abstract">
                                Introducing your company while chatting is easier and more interesting
                            </p>
                            <p>
                                This bot demonstrates an excellent example of how to present a company, its purposes and contacts. It can give detailed information about products and services, explain organizational structure and introduce the team. To use the chosen template you need to set it up and fill its card data with your own company information. 
                            </p>
                            <p>
                                While all this information can already be on your website, getting it while chatting is more fun and unpretentious. Make your company closer to the customers!
                            </p>
                        </div>
                    </div>                 

                    <div class="bot-card" >
                        <div class="title">Blackjack
                        </div>
                        <div class=info>
                            <img src="<?php echo esc_url(plugins_url('qubot/editor/css/bots/blackjack.jpg', __FILE__));?>" style="float:left;">
                            <p class="abstract">
                                Keep your site visitors entertained and they’ll become regulars! 
                            </p>
                            <p>
                                This bot will offer your customers to play Blackjack. 
                                If the client runs out of virtual money, he can replenish it by leaving his contact information.                            
                            </p>
                            <p>
                                The chosen bot demonstrates the powerful capabilities of the QuBot 
                                engine by QuData. With its help you can create engaging content 
                                for your website effortlessly. Games, quizzes and other entertaining 
                                activities become possible in the best visual editor.
                            </p>
                        </div>
                    </div>



                </div>
            </div>
    <!--END_PAGE_BOTS-->
    <!--BEGIN_PAGE_EDITOR-->
            <!---------------------------------------------------------------------------------------------------------------------------->
            <div id="qubot-page-editor" class="page-editor" style="display:none"> 
                <div class="qubot-editor" id="qubot-editor" style="width: 100%">
                    <div class="qubot-editor-body" id="qubot-editor-body">

                        <div class="state-editor" id = "qubot-state-editor" > </div>        
                        <div id = "qubot-collapse-button" ></div>                 
                        <div id="qubot-editor-splitter" ></div>  
                        <div class='qubot-info-list-states-wrapper'>                  
                            <div class='qubot-info-list-states qubot-disable-select' id="qubot-states-list-header" style="margin-left:20px">
                                <div id="qubot-list_state-title"></div>
                                <!--<div id="qubot-search-state">
                                    <input id="qubot-search-state-input" />
                                </div> -->
                                <div id="qubot-zoom"></div>
                            </div>
                            <div class="states-list"  id = "qubot-states-list"> 
                                
                                <svg class="qubot-svg" id="qubot-svg-drawing" width="3000" height="5000"  xmlns="http://www.w3.org/2000/svg">
                                    <defs>                        
                                        <marker id="qubot-arrow-blue"  viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse" ><path d="M 0 0 L 10 5 L 0 10 z" style="fill:blue;    fill-opacity: .66; " /></marker>
                                        <marker id="qubot-arrow-green"  viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse" ><path d="M 0 0 L 10 5 L 0 10 z" style="fill:rgb(66, 184, 66);    fill-opacity: 0.66; " /></marker>
                                        <marker id="qubot-arrow-gray"  viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse" ><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#747474; fill-opacity: .66; " /></marker>
                                        <marker id="qubot-circle-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse" ><circle cx="5" cy="5" r="5"     style="fill:blue;    fill-opacity: .66; " /></marker>
                                        <marker id="qubot-circle-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse" ><circle cx="5" cy="5" r="5"     style="fill:rgb(66, 184, 66);    fill-opacity: 0.66; " /></marker>
                                        <marker id="qubot-circle-gray" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="3" markerHeight="3" orient="auto-start-reverse" ><circle cx="5" cy="5" r="5"     style="fill:#747474; fill-opacity: .66; " /></marker>                                                                                                                                                                        
                                        <marker id="qubot-big-circle-green" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse" ><circle cx="5" cy="5" r="5"     style="fill:rgb(66, 184, 66);    fill-opacity: 0.66; " /></marker>                                
                                    </defs>                    
                                </svg>                        
                                <div class="qubot-state-space"  id = "qubot-state-space"> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="qubot-editor-header"   id="qubot-editor-header"> </div>
                </div>            
            </div>
    <!--END_PAGE_EDITOR-->
    <!--BEGIN_PAGE_UPLOAD-->
            <!---------------------------------------------------------------------------------------------------------------------------->
            <div class="page-upload" id="qubot-page-upload"> 
            </div>
    <!--END_PAGE_UPLOAD-->
    <!--BEGIN_PAGE_USERS-->
        <!---------------------------------------------------------------------------------------------------------------------------->
            <div class="qubot-page-users" id="qubot-page-users"> 
            </div>        
    <!--END_PAGE_USERS-->
    <!--BEGIN_PAGE_DATA-->
            <!---------------------------------------------------------------------------------------------------------------------------->
            <div class="page-data"  id="qubot-page-data">            
                <div class="caption">
                    <div class="group">
                        <div class="label">My bot: </div>
                        <select class="select" id="qubot-data-mybots"> </select>
                    </div>
                    <div class="group">
                        <div class="label">From: </div>
                        <input class="date"  type="date" id="qubot-data-from"></input>
                    </div>
                    <div class="group">
                        <div class="label">To: </div>
                        <input class="date"  type="date" id="qubot-data-to"></input>
                    </div>
                </div>
                <div class="data-table-wrapper" id="qubot-data-table"> </div>
                <div class="data-info"> 
                    The WordPress repository contains only the 100 most recent data records from the bot.
                    For more records, you need to use other repositories.
                    More information can be found at <a href="https://qudata.com/en/qubot/wordpress" target="_blank">qudata.com/en/qubot/wordpress</a>.
                </div>
            </div>
    <!--END_PAGE_DATA-->
    <!--BEGIN_PAGE_SETUP-->
            <!---------------------------------------------------------------------------------------------------------------------------->
            <div class="page-setup" id = "qubot-page-setup" style="display:none"> 
                <style>
                    #qubot-page-setup table tr td { 
                        border:   none;
                        min-width: 100px;                     
                        vertical-align: middle;
                        text-align: center;
                    }
                    #qubot-page-setup table tr th { 
                        border:   none;
                        font-size: 18px;
                        min-width: 150px; 
                        text-align: left;
                        vertical-align: middle;
                    }
                </style>


                <div class="icons">
                    <h2>Icons</h2>                
                    <div class="description">
                        Choose the icons you like:
                    </div>
                    <div class="list" id = "icons-logo"> 
                        <div class="title"><b>Logo</b> - on the window title and open button:</div>
                    </div>

                    
                    <div class="list" id = "icons-agent"> 
                        <div class="title"><b>Agent</b> - on every message:</div>
                    </div>

                    
                    <div class="list" id = "icons-human"> 
                        <div class="title"><b>Human</b> - on every human answer:</div>
                    </div>

                </div>  <!-- icons -->
                <div class="names">
                    <h2>Texts</h2>   
                    <div class="description">   
                        Basic texts in the bot window:
                    </div>
                    <table class="table-setup">
                        <tr>
                            <th>Bot name:</th>
                            <td><input class="input"   id="qubot-text-bot-name"  style="width:500px" onchange='qubotSetup.set(`text-bot-name`, `"${this.value}"`)' ></input></td>
                        </tr>
                        <tr>
                            <th>Agent name:</th>  
                            <td><input class="input"   id="qubot-text-sender-name" style="width:500px" onchange='qubotSetup.set(`text-sender-name`, `"${this.value}"`)' ></input></td>
                        </tr>       
                        <tr>
                            <th>Info text:</th>  
                            <td><input class="input"   id="qubot-text-info" style="width:500px" onchange='qubotSetup.set(`text-info`, `"${this.value}"`)' ></input></td>
                        </tr>                                               
                    </table>
                </div>
                <div class="sizes">                            
                    <h2>Size and position</h2>
                    <div class="description">You can change the size of the bot window and its position on the screen:</div>
                    <div class="size-pos">                    
                        <div class="size">
                            <div class="checkboxes" id="qubot-sizes" style="width: 200px">
                                <div class="caption">Sizes</div>
                                <div class="item"><input type="checkbox" class="checkbox" value="[400,600]" onClick="qubotSetup.checkSize(this, 'qubot-sizes')" /> <label>normal</label> </div>
                                <div class="item"><input type="checkbox" class="checkbox" value="[400,800]" onClick="qubotSetup.checkSize(this, 'qubot-sizes')" /> <label>long</label> </div>
                                <div class="item"><input type="checkbox" class="checkbox"value="[600,800]" onClick="qubotSetup.checkSize(this, 'qubot-sizes')"/> <label>huge </label>   </div>             
                                <div class="item"><input type="checkbox" class="checkbox" value="[-1,-1]"   onclick="qubotSetup.checkSize(this, 'qubot-sizes')" checked/> <label>custom </label>   </div>             
                            </div>                                                      
                            <div style="display: flex; align-items: center;">                            
                                <div style="width: 80px;"><b>Width:</b></div>
                                <input class="input" type="number" id="qubot-width" value="0" min="100" max="800"  value="400" onchange="if(this.value > 800){this.value = 800}; if(this.value < 100){this.value = 100};qubotSetup.set('width', this.value+'px')" ></input>
                            </div>
                            <div style="display: flex; align-items: center;">                            
                                <div style="width: 80px;"><b>Height:</b></div>
                                <input class="input" type="number" id="qubot-height" value="0" min="100" max="800" value="600" onchange="if(this.value > 800){this.value = 800}; if(this.value < 100){this.value = 100};qubotSetup.set('height', this.value+'px')"></input>
                            </div>                                                    
                        </div>
                        <div class="pos">
                            <div class="window" id = "qubot-pos">
                                <div class="caption">Position</div>
                                <div class="row"><div class="block"><input class="lt checkbox" type="checkbox" id="qubot-pos-lt" onClick="qubotSetup.checkPos('lt')"/></div> <div class="block"></div>  <div class="block"><input class="rt checkbox"  id="qubot-pos-rt" type="checkbox" onClick="qubotSetup.checkPos('rt')"/></div> </div>
                                <div class="row"><div class="block"></div>                                                                    <div class="block"></div>      <div class="block"></div> </div>
                                <div class="row"><div class="block"><input class="lb checkbox" type="checkbox" id="qubot-pos-lb" onClick="qubotSetup.checkPos('lb')"/></div> <div class="block"></div>  <div class="block"><input class="rb checkbox"  id="qubot-pos-rb" type="checkbox" onClick="qubotSetup.checkPos('rb')" checked/></div> </div>
                            </div>                        
                            
                            <div style="display: flex; align-items: center;">                            
                                <div style="width: 80px;"><span id="qubot-pos-x-name"><b>Right</b></span>:</div>
                                <input class="input"  type="number" min="10" max="100" id="qubot-pos-x" value="30"     onchange="if(this.value > 100){this.value = 100}; if(this.value < 10){this.value = 10};   qubotSetup.editPos()" ></input>
                            </div>
                            <div style="display: flex; align-items: center;">                            
                                <div style="width: 80px;"><span id="qubot-pos-y-name"><b>Bottom</b></span>:</div>
                                    <input class="input"  type="number" min="10" max="100" id="qubot-pos-y" value="30" onChange="if(this.value > 100){this.value = 100};  if(this.value < 10){this.value = 10}; qubotSetup.editPos()" ></input>
                            </div>
                            
                        </div>
                    </div>                        
                </div>  <!-- sizes -->

                <div class="styles" >
                    <h2 onClick="localStorage.clear();">Styles</h2>
                    <div class="description">
                        Choose one of the styles prepared by our designers:
                    </div>
                    <div class="list" id="styles-list">
                    </div>

                </div>  <!-- styles -->            


                <div class="custom">                
                    <h2 onClick="qubotSetup.getParams()">Custom</h2>
                    <div class="description">
                        You can customize the appearance of the bot yourself:
                    </div>
                    <div class="frame" style="margin-top:20px;">
                        <div class="title">Window</div>
                        <table class="table-setup">
                            <tr>
                                <th>Shadow</th>
                                <td><input class="input" title="Shift shadow right and down" type="number" min="0" max="100"  id="qubot-shadow-size"   onchange="qubotSetup.set('shadow-size', this.value+'px')" /></td>     
                                <td><input class="input" title="Shadow blur level" type="number" min="0" max="100"  id="qubot-shadow-blur"   onchange="qubotSetup.set('shadow-blur', this.value+'px')" /></td>     
                                <td><input type="color"  title="Shadow color" class="input-color"                id="qubot-shadow-color"  oninput="qubotSetup.set('shadow-color', this.value+'b2')"></td>
                            </tr>
                        </table>
                    </div>

                    <div class="frame">
                        <div class="title">Header</div>
                        <table class="table-setup">
                            <tr>
                                <th>Fill</th>
                                <td><input type="color"  title="The color of the header" class="input-color"                                                      id="qubot-header-background"       oninput ="qubotSetup.set('header-background', qubotSetup.color(this.value, 'qubot-header-background-alpha' ))"></td>
                                <td><input class="input" title="Header transparency (0 - transparent, 100 - opaque)"  type="number" min="0" max="100" value="100" id="qubot-header-background-alpha" onChange="qubotSetup.set('header-background-alpha', this.value); qubotSetup.set('header-background', qubotSetup.color(document.getElementById('qubot-header-background').value, 'qubot-header-background-alpha' ))" /></td>
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"   title="The color of the border around the header" class="input-color" id="qubot-header-line-color"  oninput="qubotSetup.set('header-line-color', this.value)"></td>
                                <td><input class="input"  title="Line weight around the header" type="number" min="0" max="10" id="qubot-header-line-width"    onchange="qubotSetup.set('header-line-width', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Text</th>
                                <td><input type="color"   title="Bot name text color"  class="input-color" id="qubot-header-color"       oninput="qubotSetup.set('header-color', this.value)"></td>                            
                                <td><input class="input"  title="Bot name font size"    type="number" min="5" max="48"  id="qubot-header-font-size"    onchange="qubotSetup.set('header-font-size', this.value+'px')" /></td>                        
                                <td><input class="input"  title="Bot name font line height" type="number" min="5" max="48"  id="qubot-header-font-line"    onchange="qubotSetup.set('header-font-line', this.value+'px')" /></td>                        
                            </tr>
                            <tr>
                                <th>Info</th>
                                <td><input type="color"   title="Info line font color" class="input-color" id="qubot-header-info-color"       oninput="qubotSetup.set('header-info-color', this.value)"></td>                            
                                <td><input class="input"  title="Info line font size" type="number" min="5" max="48"  id="qubot-header-info-size"    onchange="qubotSetup.set('header-info-size', this.value+'px')" /></td>                        
                                <td><input class="input"  title="Info line font line height" type="number" min="5" max="48"  id="qubot-header-info-line"    onchange="qubotSetup.set('header-info-line', this.value+'px')" /></td>                        
                            </tr>
                            <tr>
                                <th>Radius</th>
                                <td><input class="input"  title="Radius of the left and right corners of the bot window"  type="number" min="0" max="1000"  id="qubot-top-radius"    onchange="qubotSetup.set('top-radius', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Shadow</th>
                                <td><input class="input"  title="Shift shadow to the down"  type="number" min="0" max="100"  id="qubot-header-shadow-size"   onchange="qubotSetup.set('header-shadow-size', this.value+'px')" /></td>     
                                <td><input class="input"  title="Shadow blur level"  type="number" min="0" max="100"  id="qubot-header-shadow-blur"   onchange="qubotSetup.set('header-shadow-blur', this.value+'px')" /></td>     
                                <td><input type="color"   title="Shadow color"   class="input-color"                id="qubot-header-shadow-color"  oninput ="qubotSetup.set('header-shadow-color', this.value+'b2')"></td>
                            </tr>
                            <tr>
                                <th>Close</th>
                                <td><input type="color"   title="Window close button color in normal state" class="input-color"   id="qubot-close-color1"       oninput="qubotSetup.set('close-color1', this.value)"></td>                            
                                <td><input type="color"   title="Color of the window close button when the mouse is hovering over it" class="input-color"   id="qubot-close-color2"       oninput="qubotSetup.set('close-color2', this.value)"></td>                                                        
                            </tr>
                        </table>
                    </div>                
                    <div class="frame">
                        <div class="title">Body</div>
                        <table class="table-setup">
                            <tr>
                                <th>Fill</th>
                                <td><input type="color"  title="The color of the body chat"   class="input-color"                                                   id="qubot-body-background"         oninput="qubotSetup.set('body-background', qubotSetup.color(this.value, 'qubot-body-background-alpha' ))"></td>
                                <td><input class="input" title="Body chat transparency (0 - transparent, 100 - opaque)" type="number" min="0" max="100" value="100" id="qubot-body-background-alpha"   onchange="qubotSetup.set('body-background-alpha', this.value); qubotSetup.set('body-background', qubotSetup.color(document.getElementById('qubot-body-background').value, 'qubot-body-background-alpha' ))" /></td>                                                        
                                <td>
                                    <select name="select" title="Chat background picture" class="select"   onchange="qubotSetup.set('body-backround-image', this.options[this.selectedIndex].value);">                                     
                        <option value="none" selected>None</option>
                                        <option value="url('backs/01.jpg')">Wood</option>
                                        <option value="url('backs/02.jpg')">Net</option>
                                        <option value="url('backs/03.jpg')">Textile</option>
                                        <option value="url('backs/04.jpg')">Stars</option>
                                        <option value="url('backs/05.jpg')">Paper</option>
                                        <option value="url('backs/06.jpg')">Metal</option>
                                        <option value="url('backs/07.jpg')">Paints</option>
                                        <option value="url('backs/08.jpg')">Sky</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"   title="The color of the border around the chat"  class="input-color"              id="qubot-body-line-color"  onchange="qubotSetup.set('body-line-color', this.value)"></td>
                                <td><input class="input"  title="Line weight around the chat"  type="number" min="0" max="10" id="qubot-body-line-width"    onchange="qubotSetup.set('body-line-width', this.value+'px')" /></td>                                                        
                            </tr>                    
                            <tr>
                                <th>Time</th>
                                <td><input type="color"   title="The color of the date and time"  class="input-color"             id="qubot-body-time-color"  onchange="qubotSetup.set('body-time-color', this.value)"></td>
                                <td><input class="input"  title="Font size of the date and time"  type="number" min="5" max="32" id="qubot-body-time-size"    onchange="qubotSetup.set('body-time-size', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Shadow</th>
                                <td><input class="input"  title="Shift shadow right and down for all messages"  type="number" min="0" max="100"  id="qubot-mes-shadow-size"   onchange="qubotSetup.set('mes-shadow-size', this.value+'px')" /></td>
                                <td><input class="input"  title="Shadow blur level for all messages"  type="number" min="0" max="100"  id="qubot-mes-shadow-blur"   onchange="qubotSetup.set('mes-shadow-blur', this.value+'px')" /></td>                                                                                                                                            
                                <td><input type="color"   title="Shadow color"   class="input-color"                id="qubot-header-shadow-color"  oninput ="qubotSetup.set('header-shadow-color', this.value+'b2')"></td>
                            </tr>
                            <tr>
                                <th>Radius</th>
                                <td><input class="input"  title="Radius of corners for all messages"  type="number" min="0" max="1000"  id="qubot-mes-radius"    onchange="qubotSetup.set('mes-radius', this.value+'px')" /></td>                                                                                
                            </tr>
                            <tr>
                                <th>Padding</th>
                                <td><input class="input"  title="Padding for all messages"  type="number" min="0" max="1000"  id="qubot-mes-padding"    onchange="qubotSetup.set('mes-padding', this.value+'px')" /></td>                                                                                
                            </tr>

                        </table>                   
                    </div>

                    <div class="frame">
                        <div class="title">Agent</div>
                        <table class="table-setup">
                            <tr>
                                <th>Fill</th>
                                <td><input type="color" title="Background color for agent messages"  class="input-color" id="qubot-message-background" oninput="qubotSetup.set('message-background', this.value)"></td>                            
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"   title="The color of the border around the agent messages"  class="input-color" id="qubot-message-line-color" oninput="qubotSetup.set('message-line-color', this.value)"></td>                            
                                <td><input class="input"  title="Line weight around the agent messages"   type="number" min="0" max="10" id="qubot-message-line-width"    onchange="qubotSetup.set('message-line-width', this.value+'px')" /></td>                            
                            </tr>
                            <tr>
                                <th>Text</th>                            
                                <td><input type="color"  title="Font color for agent messages"  class="input-color" id="qubot-message-color"      oninput="qubotSetup.set('message-color', this.value)"></td>                            
                                <td><input class="input" title="Message font size"   type="number" min="5" max="48"  id="qubot-message-font-size"    onchange="qubotSetup.set('message-font-size', this.value+'px')" /></td>                                                    
                                <td><input class="input" title="Message font line height"   type="number" min="5" max="48"  id="qubot-message-font-line"    onchange="qubotSetup.set('message-font-line', this.value+'px')" /></td>                                                    
                            </tr>
                            <tr>
                                <th>Name</th>                            
                                <td><input type="color"   title="Font color for sender name"  class="input-color" id="qubot-sender-color"      oninput="qubotSetup.set('sender-color', this.value)"></td>                            
                                <td><input class="input"  title="Sender name font size"  type="number" min="5" max="48"  id="qubot-sender-font-size"    onchange="qubotSetup.set('sender-font-size', this.value+'px')" /></td>                                                    
                                <td><input class="input"  title="Sender name font line height"  type="number" min="5" max="48"  id="qubot-sender-font-line"    onchange="qubotSetup.set('sender-font-line', this.value+'px')" /></td>                                                    
                            </tr>

                            <tr>
                                <th>Icon</th>                            
                                <td><input class="input"  title="Agent icon size"  type="number" min="0" max="100" id="qubot-icon-agent-size"    onchange="qubotSetup.set('icon-agent-size', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Animation</th>
                                <td>
                                    <select name="select"  title="" id="qubot-animation-msg" class="select" onchange="qubotSetup.set('anime-msg', this.options[this.selectedIndex].value)"> 
                                        <option value="scrolling" selected>Scrolling</option>
                                        <option value="opacity">Opacity</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="frame">
                        <div class="title">Human</div>
                        <table class="table-setup">
                            <tr>
                                <th>Fill</th>
                                <td><input type="color"  title="Background color for human answers"  class="input-color" id="qubot-answer-background"  oninput="qubotSetup.set('answer-background',  this.value)"></td>
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"  title="The color of the border around the human answers"  class="input-color" id="qubot-answer-line-color"  oninput="qubotSetup.set('answer-line-color', this.value)"></td>
                                <td><input class="input" title="Line weight around the human answers"  type="number" min="0" max="10" id="qubot-answer-line-size"    onchange="qubotSetup.set('answer-line-size', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Text</th>
                                <td><input type="color"  title="Font color for human answers"  class="input-color" id="qubot-answer-color"       oninput="qubotSetup.set('answer-color', this.value)"></td>                            
                                <td><input class="input" title="Human answer font size"   type="number" min="5" max="48"  id="qubot-answer-font-size"    onchange="qubotSetup.set('answer-font-size', this.value+'px')" /></td>                        
                                <td><input class="input" title="Human answer font line height"   type="number" min="5" max="48"  id="qubot-answer-font-line"    onchange="qubotSetup.set('answer-font-line', this.value+'px')" /></td>                        
                            </tr>
                            <tr>
                                <th>Icon</th>                            
                                <td><input class="input" title="Human icon size"  type="number" min="0" max="100" id="qubot-icon-human-size"    onchange="qubotSetup.set('icon-human-size', this.value+'px')" /></td>                                                        
                            </tr>                        
                        </table>
                    </div>
                    
                    <div class="frame">
                        <div class="title">Buttons</div>
                        <table class="table-setup">
                            <tr>
                                <th>Text</th>
                                <td><input type="color"  title="Font color for button text"  class="input-color" id="qubot-button-color"        oninput="qubotSetup.set('button-color', this.value)"></td>
                                <td><input class="input" title="Button text font size"  type="number" min="5" max="48"  id="qubot-button-font-size"    onchange="qubotSetup.set('button-font-size', this.value+'px')" /></td>                        
                                <td><input class="input" title="Button text font line height"  type="number" min="5" max="48"  id="qubot-button-font-line"    onchange="qubotSetup.set('button-font-line', this.value+'px')" /></td>                        
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"   title="The color of the border around the button"  class="input-color" id="qubot-button-line-color"   oninput="qubotSetup.set('button-line-color', this.value)"></td>
                                <td><input class="input"  title="Line weight around the button"  type="number" min="0" max="10" id="qubot-button-line-width" onChange="qubotSetup.set('button-line-width', this.value+'px')" /></td>
                            </tr>
                            <tr>
                                <th>Radius</th>
                                <td><input class="input" title="Button radius"   type="number" min="0" max="1000"  id="qubot-button-radius" onChange="qubotSetup.set('button-radius', this.value+'px')"/></td>                            
                            </tr>
                            <tr>
                                <th>Fill</th>
                                <td><input type="color" title="Button color in normal state"  class="input-color" id="qubot-button-background1"  oninput="qubotSetup.set('button-background1', this.value)"></td>
                                <td><input type="color" title="Mouse over button color"  class="input-color" id="qubot-button-background2"  oninput="qubotSetup.set('button-background2', this.value)"></td>                                 
                                <td><input type="color" title="Button color on mouse click"  class="input-color" id="qubot-button-background3"  oninput="qubotSetup.set('button-background3', this.value)"></td>
                            </tr>
                            <tr>
                                <th>Height</th>
                                <td><input class="input" title="Button height"  type="number" min="0" max="100"  id="qubot-button-height" value="50" onChange="qubotSetup.set('button-height', this.value+'px')"/></td>                                                    
                            </tr>
                            <tr>
                                <th>Margin</th>
                                <td><input class="input" title="Vertical buttons padding"  type="number" min="0" max="100"  id="qubot-button-margin" value="50" onChange="qubotSetup.set('button-margin', this.value+'px')"/></td>                                                    
                            </tr>
                        
                        </table>
                    </div>

                    <div class="frame">
                        <div class="title">Footer</div>
                        <table class="table-setup">
                            <tr>
                                <th>Fill</th>
                                <td><input type="color"  title="The color of the footer" class="input-color"                                                           id="qubot-footer-background"       oninput="qubotSetup.set ('footer-background', qubotSetup.color(this.value, 'qubot-footer-background-alpha' ))"></td>
                                <td><input class="input" title="Footer chat transparency (0 - transparent, 100 - opaque)"  type="number" min="0" max="100" value="100" id="qubot-footer-background-alpha" onChange="qubotSetup.set('footer-background-alpha', this.value);  qubotSetup.set('footer-background', qubotSetup.color(document.getElementById('qubot-footer-background').value, 'qubot-footer-background-alpha' ))" /></td> 
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"  title="The color of the border around the footer"  class="input-color" id="qubot-footer-line-color"              oninput="qubotSetup.set('footer-line-color', this.value)"></td>
                                <td><input class="input" title="Line weight around the footer"  type="number" min="0" max="10" id="qubot-footer-line-width" onChange="qubotSetup.set('footer-line-width', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Height</th>                            
                                <td><input class="input" title="Footer height"  type="number" min="0" max="100" id="qubot-footer-height" onChange="qubotSetup.set('footer-height', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Radius</th>
                                <td><input class="input" title="Radius of the footer"  type="number" min="0" max="1000"  id="qubot-bottom-radius"    onchange="qubotSetup.set('bottom-radius', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Shadow</th>
                                <td><input class="input" title="Shift shadow up"  type="number" min="-100" max="100"  id="qubot-footer-shadow-size"   onchange="qubotSetup.set('footer-shadow-size', this.value+'px')" /></td>     
                                <td><input class="input" title="Shadow blur level for the footer"  type="number" min="-100" max="100"  id="qubot-footer-shadow-blur"   onchange="qubotSetup.set('footer-shadow-blur', this.value+'px')" /></td>     
                                <td><input type="color"  title="Shadow footer color" class="input-color"                   id="qubot-footer-shadow-color"  oninput ="qubotSetup.set('footer-shadow-color', this.value+'b2')"></td>
                            </tr>
                        </table>

                    </div>


                    <div class="frame">
                        <div class="title">Input</div>
                        <table class="table-setup">
                            <tr>
                                <th>Radius</th>                            
                                <td><input class="input"  title="Input field radius"  type="number" min="0" max="200" id="qubot-input-radius" onChange="qubotSetup.set('input-radius', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Height</th>                            
                                <td><input class="input"  title="Input field height"  type="number" min="0" max="100" id="qubot-input-height" onChange="qubotSetup.set('input-height', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Margins</th>                            
                                <td><input class="input"  title="Vertical padding of the input field"    type="number" min="0" max="100" id="qubot-input-margin-y" onChange="qubotSetup.set('input-margin-y', this.value+'px')" /></td>                                                        
                                <td><input class="input"  title="Horizontal padding of the input field"  type="number" min="0" max="100" id="qubot-input-margin-x" onChange="qubotSetup.set('input-margin-x', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Fill</th>
                                <td><input type="color"  title="Color of the the input field"  class="input-color" id="qubot-input-background"              oninput="qubotSetup.set('input-background', this.value)"></td>
                                <td><input type="color"  title="Color of the the disabled input field"  class="input-color" id="qubot-input-background-disabled" oninput="qubotSetup.set('input-background-disabled', this.value)"></td>
                            </tr>
                            <tr>
                                <th>Border</th>
                                <td><input type="color"  title="Line color around the input field"  class="input-color" id="qubot-input-line-color"   oninput="qubotSetup.set('input-line-color', this.value)"></td>
                                <td><input class="input" title="Line width around the input field"  type="number" min="0" max="10" id="qubot-input-line-width" onChange="qubotSetup.set('input-line-width', this.value+'px')" /></td>
                            </tr>
                            <tr>
                                <th>Font</th>
                                <td><input type="color"   title="Input field font color"  class="input-color" id="qubot-input-font-color"              oninput="qubotSetup.set('input-font-color', this.value)"></td>
                                <td><input class="input"  title="Input field font size"   type="number" min="0" max="100" id="qubot-input-font-size" onChange="qubotSetup.set('input-font-size', this.value+'px')" /></td>                                                        
                            </tr>
                            <tr>
                                <th>Send</th>
                                <td><input type="color"   title="Color of the submit text button in normal state"  class="input-color" id="qubot-send-color1"       oninput="qubotSetup.set('send-color1', this.value)"></td>                            
                                <td><input type="color"   title="Color of the submit text button on hover"  class="input-color" id="qubot-send-color2"       oninput="qubotSetup.set('send-color2', this.value)"></td>                                                        
                            </tr>


                        </table>

                    </div>

                    <div class="frame">
                        <div class="title">Сhat-window  оpen button </div>
                        <table class="table-setup">
                            <tr>
                                <tr>
                                    <th>Radius</th>
                                    <td><input class="input" title="The radius of the bot window open button"  type="number" min="0" max="1000"  id="qubot-open-radius"   oninput="qubotSetup.set('open-radius', this.value+'px')"/></td>                            
                                    <td><input class="input" title="The radius of the icon on the bot window open button"  type="number" min="0" max="1000"  id="qubot-open-radius-img"   oninput="qubotSetup.set('open-radius-img', this.value+'px')"/></td>                            
                                </tr>    
                                <tr><th>Border</th>     
                                    <td><input type="color"   title="Color of the line around the bot window open button"  class="input-color"    id="qubot-open-color"   oninput="qubotSetup.set('open-color', this.value)"></td>                                                       
                                    <td><input class="input" title="Line width around the bot window open button"  type="number" min="0" max="10" id="qubot-open-line"   oninput="qubotSetup.set('open-line', this.value+'px')" /></td>
                                </tr>                            
                            </tr>
                        </table>
                    </div>

                    <div class="frame">
                        <div class="title">Page (for testing)</div>
                        <table class="table-setup">
                            <tr>
                                <th>Fill</th>
                                <td><input type="color"   title="Background color under the bot window (console only)"  class="input-color" id="qubotsetup-page-background" value="#f0ffff" oninput="qubotSetup.pageSet(this.value)"></td>
                                <td>
                                    <select name="select"  title="Background picture under the bot window (only for the console)"  class="select" onChange="document.documentElement.style.setProperty('--console-background', this.options[this.selectedIndex].value);"> 
                                        <option value="none" selected>Empty</option>
                                        <option value="url('backs/chess.png') repeat">Chess</option>
                                        <option value="url('backs/sky.jpg')  repeat">Sky</option>
                                    </select>
                                </td>
                            </tr>
                        </table>
                    </div>
                    

                </div>  <!-- styles -->                
            </div>  <!-- page-setup -->
    <!--END_PAGE_SETUP-->
        </div>
    </div>  <!-- content -->

    <!--
<div class="footer">
    <span>Powered by <a href="https://qudata.com" target="_blank">QuData.com</a></span>
</div> 
-->
</div> <!-- console -->






<?php
}

function qubotchat_validate_post($post) {
	foreach($post as $name=>$value){
		if(!qubotchat_validate_post_name($name) || empty($value))
			return false;
		elseif(!empty($value)) {
			if($name == 'analytics'){
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['request'])) return false;
			} 
			elseif($name == 'botManager'){
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['request'])) return false;
			} 
			elseif($name == 'saveBot') {
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['botID']) || 
					!isset($postValue['name']) || 
					!isset($postValue['data'])) return false;
			}
			elseif($name == 'loadBot') {
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['botID'])) return false;
			}
			elseif($name == 'deleteBot') {
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['botID'])) return false;
			}
			elseif($name == 'sendUserData') {
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['storage']) || 
					!isset($postValue['ownerID']) || 
					!isset($postValue['botID']) || 
					!isset($postValue['uid']) || 
					!isset($postValue['time']) || 
					!isset($postValue['value'])) return false;
			}
			elseif($name == 'receiveUserData') {
				$postValue = json_decode(stripcslashes($value), true);
				if(!isset($postValue['storage']) || 
					!isset($postValue['ownerID']) || 
					!isset($postValue['botID'])) return false;
			}
		}
	}
	return true;
}

function qubotchat_validate_post_name($name) {
	if(in_array($name, array(
		"action",
		"loadSetup",
		"qubotEditorHelp",
		"qubotEditorMyBots",
		"qubotToken",
		"qubotUpload",
		"qubotSetup",
		"analytics",
		"botManager",
		"sendUserData",
		"receiveUserData",
		"saveBot",
		"loadBot",
		"deleteBot",
		"botID",
		"fileName",
		"arrayBuffer"
	)))
		return true;
	return false;
}

function qubotchat_sanitize_option_value($value) {
	if(is_array($value)){
		foreach($value as $k=>$v){
			$value[$k] = wp_kses_post($v);
		}
		return $value;
	} else return wp_kses_post($value);
}

add_action( 'wp_ajax_ajaxSetup', 'qubotchat_ajaxSetup' );
add_action( 'wp_ajax_nopriv_ajaxSetup', 'qubotchat_ajaxSetup' );

function qubotchat_ajaxSetup(){
	global $wpdb;
	if(!qubotchat_validate_post($_POST))
		die;
	
	$tableUsersData = $wpdb->prefix.'qubotchat_data';
	$tableBots = $wpdb->prefix.'qubotchat_bots';
	$channelToken  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJjaWQiOiI3YjZkNzcwMTlmNGZmMzg3NjdiYjUyNTZhYTIyMjYyYyIsInZlcnNpb24iOjEsInR5cGUiOiJjaGFubmVsIiwiY2hhbm5lbCI6IndvcmRwcmVzcyIsInRpbWVvdXQiOi0xLCJ0aWQiOiI1OTcyYjViNjE2ZjRhODA3OWQ0OTAxYjVjMjE0YmY5ZiJ9.RGKGnejHlEDMvUskxl7CdKgcoVlpjj11fC9t8_s13ce7KWo3iPZG_ZAHqLoYfah2QtudG1sdhb5c_-Zy-SvC1Wi352w5iWQ8_HwjIZxU6zVTJnYGHO85Um8hRd8Bt6NJf3LJZ4l9aqq7OFEeCyN1ARaE_nAgKwF4ZYWjSwRN4PlI-Rmkw_oG0LDMUuhZLkjxgzEaJeH9lf5CMX3yhv7gauv4eDy9HyC-MtnHwn2a1Ps1zG-BiX_n6Z40ljqbmP0_ylzrKnn4zv_ZCVGxK7RvNM6xy_jsSfxhF0621rZQecYMKgA9g7Tl-4PpeckZ_Aepa5wapvv-yQqqWblh58kkcg";
	$botManagerUrl = "https://services.qudata.com/bot/manager/api/";
	$analyticsUrl  = "https://services.qudata.com/bot/analytics/api/v1/";
	$extensionsUrl = "https://services.qudata.com/bot/extensions/";
	
	foreach($_POST as $name=>$value){
		$_POST[$name] = stripslashes($value);
	}
	
	if(isset($_POST['botID']) && !empty($_POST['botID']) && isset($_POST['botID']) && !empty($_POST['botID']) && isset($_POST['arrayBuffer']) && !empty($_POST['arrayBuffer'])){
		$filename = $_POST['fileName'];
		$location = "/wp-content/uploads/".$_POST['botID']."/".time()."_".$filename;
		if(strpos($filename,".jpg") !== false || strpos($filename, ".jpeg") !== false || strpos($filename, ".png") !== false 
			|| strpos($filename, ".gif") !== false || strpos($filename, ".webp") !== false){
			if(!file_exists(ABSPATH."wp-content/uploads/".$_POST['botID']."/")) {
				mkdir(ABSPATH."wp-content/uploads/".$_POST['botID']."/", 0775, true);
			}
			file_put_contents(ABSPATH."wp-content/uploads/".$_POST['botID']."/".time()."_".$filename, base64_decode(str_replace(' ', '+', $_POST['arrayBuffer'])));
			chmod(ABSPATH."wp-content/uploads/".$_POST['botID']."/".time()."_".$filename, 0664);
			echo get_option('siteurl').$location;
		} else echo "error";
	} 
	elseif(isset($_POST['analytics']) && !empty($_POST['analytics'])){
		$clientToken = "";
		$res = get_option('qubotToken');
		if($res){
			$clientToken = qubotchat_sanitize_option_value(json_decode(get_option('qubotToken'), true)['token']);
		}
		if(!empty($clientToken)){
			$requestName = qubotchat_sanitize_option_value(json_decode($_POST['analytics'], true)['request']);
			$response = wp_remote_post(
				$analyticsUrl.$requestName.'/',
				array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'sslverify' => false,
					'headers' => array(
						'Content-Type' => 'application/json',
						'Qubot-Token-Channel' => $channelToken,
						'Qubot-Token-Client' => $clientToken
					),
					'body' => qubotchat_sanitize_option_value($_POST['analytics']),
					'cookies' => array()
				)
			);
			if ( is_wp_error( $response ) ) {
			   $error_message = $response->get_error_message();
			   echo qubotchat_sanitize_option_value("Something went wrong: $error_message");
			} else print_r( $response );
		}
	} 
	elseif(isset($_POST['botManager']) && !empty($_POST['botManager'])){
		$clientToken = "";
		$res = get_option('qubotToken');
		if($res){
			$clientToken = qubotchat_sanitize_option_value(json_decode(get_option('qubotToken'), true)['token']);
		}
		if(!empty($clientToken)){
			$requestName = qubotchat_sanitize_option_value(json_decode($_POST['botManager'], true)['request']);
			$response = wp_remote_post(
				$botManagerUrl.$requestName.'/',
				array(
					'method' => 'POST',
					'timeout' => 45,
					'redirection' => 5,
					'httpversion' => '1.0',
					'sslverify' => false,
					'headers' => array(
						'Content-Type' => 'application/json',
						'Qubot-Token-Channel' => $channelToken,
						'Qubot-Token-Client' => $clientToken
					),
					'body' => qubotchat_sanitize_option_value($_POST['botManager']),
					'cookies' => array()
				)
			);
			if ( is_wp_error( $response ) ) {
			   $error_message = $response->get_error_message();
			   echo qubotchat_sanitize_option_value("Something went wrong: $error_message");
			} else print_r( $response );
		}
	} 
	elseif(isset($_POST['saveBot'])) {
		$botData = qubotchat_sanitize_option_value(json_decode($_POST['saveBot'],true));
		if (!$botData['botID'])
			exit;
		$bot_exists = $wpdb->get_row("SELECT * FROM ".$tableBots." where botID='".$botData['botID']."'");
		if(empty($bot_exists)){
				$wpdb->insert(
					$tableBots,
					[
						'botID'     => $botData['botID'],
						'name'      => $botData['name'],
						'data'      => $botData['data'],
					]
				);
		}
		else{
				$wpdb->update(
					$tableBots,
					[
						'name'      => $botData['name'],
						'data'      => $botData['data'],
					],
					[
						'botID' =>  $botData['botID']
					],
					[
						'%s',
						'%s'
					],
					['%s']
				);
		}
	}
	elseif(isset($_POST['loadBot'])) {
		$botData = qubotchat_sanitize_option_value(json_decode($_POST['loadBot'],true));
		$botID   = $botData['botID'];
		if (!$botData['botID'])
			exit;
		$sqlResults = $wpdb->get_results("SELECT * FROM ".$tableBots." where botID='".$botID."'");
		$results = array();
		if(!empty($sqlResults)){
			echo qubotchat_sanitize_option_value(json_encode($sqlResults[0]));
		} 
	}
	elseif(isset($_POST['deleteBot'])) {
		WP_Filesystem();
		global $wp_filesystem;
		$botData = qubotchat_sanitize_option_value(json_decode($_POST['deleteBot'],true));
		$botID   = $botData['botID'];
		if (!$botData['botID'])
			exit;    
		$wpdb->delete(
			$tableBots,
			[ 'botID' => $botID ],
			[ '%s' ]
		);
		$wpdb->delete(
			$tableUsersData,
			[ 'botID' => $botID ],
			[ '%s' ]
		);
		$wp_filesystem->rmdir(ABSPATH."wp-content/uploads/".$botID."/", true);
	}
	elseif(isset($_POST['sendUserData'])) {
		$userData = qubotchat_sanitize_option_value(json_decode($_POST['sendUserData'],true));
		$storage = $userData['storage'];
		$body = array(
			'ownerID'   => qubotchat_sanitize_option_value($userData['ownerID']),
			'botID'     => qubotchat_sanitize_option_value($userData['botID']),
			'uid'       => qubotchat_sanitize_option_value($userData['uid']),
			'time'      => qubotchat_sanitize_option_value($userData['time']),
			'value'     => qubotchat_sanitize_option_value($userData['value']),
		);
		$wpdb->insert(
			$tableUsersData,
			$body
		);
		//rotate    
		$recordsSave = 200;
		$recordsNow  = $wpdb->get_results("SELECT max(id) as id FROM ".$tableUsersData);   
		$recordsLast = $recordsNow[0]->id - $recordsSave;
		$query = "DELETE FROM ".$tableUsersData." WHERE id<".$recordsLast.";";
		$wpdb->query($query);  
		//save to qudata storage if need
		if ($storage == "qudata")
		{
			$clientToken = "";
			$res = get_option('qubotToken');
			if($res){
				$clientToken = qubotchat_sanitize_option_value(json_decode(get_option('qubotToken'), true)['token']);
			}
			if(!empty($clientToken)){
				//send to qudata
				$body['value'] = qubotchat_sanitize_option_value(json_decode($body['value'], true));
				$requestBody = array(
					'rows' => array(0 => $body)
				);
				$requestBodyStr = json_encode($requestBody);
				
				$response = wp_remote_post(
					$extensionsUrl.'qudata_save/api/v1/insert/',
					array(
						'method' => 'POST',
						'timeout' => 45,
						'redirection' => 5,
						'httpversion' => '1.0',
						'sslverify' => false,
						'headers' => array(
							'Content-Type' => 'application/json',
							'Qubot-Token-Channel' => $channelToken,
							'Qubot-Token-Client' => $clientToken
						),
						'body' => qubotchat_sanitize_option_value($requestBodyStr),
						'cookies' => array()
					)
				);
				if ( is_wp_error( $response ) ) {
				   $error_message = $response->get_error_message();
				   echo qubotchat_sanitize_option_value("Something went wrong: $error_message");
				} else print_r( $response );
			}
		}
	}
	elseif(isset($_POST['receiveUserData'])) {
		$userData = qubotchat_sanitize_option_value(json_decode($_POST['receiveUserData'],true));
		$ownerID = $userData['ownerID'];
		$botID   = $userData['botID'];
		$sqlResults = $wpdb->get_results("SELECT * FROM ".$tableUsersData." where ownerID='".$ownerID."' and botID='".$botID."'");
		$results = array();
		if(!empty($sqlResults)){
			foreach($sqlResults as $result){
				array_push($results,$result);
			}
		}
		echo qubotchat_sanitize_option_value(json_encode($results));
	}
	elseif(!isset($_POST['loadSetup']) && count($_POST)){
		$postName = "";
		foreach($_POST as $name=>$value){
			if($name != "action"){
				$postName = str_replace(".","_",$name);
				$_POST[$postName] = $value;
				break;
			}
		}
		if($postName == 'qubotEditorHelp'){
			$tmp = qubotchat_sanitize_option_value(json_decode($_POST[$postName],true));
			$tmp['langWP'] = explode("_", qubotchat_get_wp_locale())[0];
			$_POST[$postName] = json_encode($tmp);
		}
	
		
		if(!empty($postName)){
			$res = get_option($postName);
			if(!$res){
				$res = add_option($postName, qubotchat_sanitize_option_value($_POST[$postName]));
			} else {
				$res = update_option($postName, qubotchat_sanitize_option_value($_POST[$postName]));
			}
		}
	} 
	elseif(isset($_POST['loadSetup']) && !empty($_POST['loadSetup'])){
		$param = str_replace(".","_", sanitize_text_field($_POST['loadSetup']));
		echo qubotchat_sanitize_option_value(get_option($param));    
	}
	die;
}

function qubotchat_get_wp_locale() {
	global $locale, $wp_local_package;
	if ( isset( $locale ) ) {
		return apply_filters('locale', $locale);
	}
	if ( isset( $wp_local_package ) ) {
		$locale = $wp_local_package;
	}
	if ( defined( 'WPLANG' ) ) {
		$locale = WPLANG;
	}
	if ( is_multisite() ) {
		if ( wp_installing() ) {
			$ms_locale = get_site_option('WPLANG');
		} else {
			$ms_locale = get_option('WPLANG');
			if ( false === $ms_locale ) {
				$ms_locale = get_site_option('WPLANG');
			}
		}
		if ( false !== $ms_locale ) {
			$locale = $ms_locale;
		}
	} else {
		$db_locale = get_option('WPLANG');
		if ( false !== $db_locale ) {
			$locale = $db_locale;
		}

	}
	if ( empty( $locale ) ) {
		$locale = 'en';
	}
	return apply_filters('locale', $locale);
}
	
/**
 * Proper way to enqueue scripts and styles
 */
function qubotchat_wp_scripts() {
    wp_register_style('qubotchat_qubot', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/qb/css/qubot.css', basename(__FILE__)), '', QUBOTCHAT_CURRENT_VERSION, 'screen');
	wp_enqueue_style('qubotchat_qubot');
	
	wp_register_script('qubotchat_qubot', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/qb/qb.js', basename(__FILE__)), array(), QUBOTCHAT_CURRENT_VERSION, true);
	wp_enqueue_script('qubotchat_qubot');
	wp_register_script('qubotchat_qubot_embed', plugins_url(basename(plugin_dir_path(__FILE__)) . '/qubot/qubot_embed.js', basename(__FILE__)), array(), QUBOTCHAT_CURRENT_VERSION, true);
	wp_enqueue_script('qubotchat_qubot_embed');
}
add_action( 'wp_enqueue_scripts', 'qubotchat_wp_scripts' );

/**
* The actual qubotchat script to create the chat button on the wordpress site.
*/
function qubotchat_script() {
    global $current_user;
    $qubotchat_currPage = add_query_arg(array());
    if(get_post_type() == 'post') $qubotchat_currPage = "blog";
    if(is_home()) $qubotchat_currPage = "index";
    echo("<script>            

	    let envConf = {
		'pluginURL': '".plugin_dir_url( __FILE__ )."',
		'ajaxURL': '".admin_url('admin-ajax.php')."',
		'currPage': '".sanitize_text_field($qubotchat_currPage)."'
	    }
	    var qubotEnv = new QuBotWPEmbedEnv(envConf)
	    qubotEnv.create()

        </script>");
}

function qubotchat_create_menu(){
    //create new top-level menu
    add_menu_page('Account Configuration', 'QuBotChat', 'administrator', 'qubotchat_dashboard', 'qubotchat_dashboard', plugin_dir_url( __FILE__ ).'logo.png');
}

function qubotchat_uninstall() {
    /*if(get_option('botId')) {
        delete_option( 'botId');
    }*/
}?>
