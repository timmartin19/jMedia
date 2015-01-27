/**
 * Created by Tim Martin on 1/11/15.
 */
// global defautls; override as needed
Media.defaults = {
    /**
     * use object tags only (no embeds for non-IE browsers)
     * @property standards
     * @type {boolean}
     */
    standards: true,

    /**
     * tells plugin to store the original markup so it can be reverted via: $(sel).mediaUndo()
     * @property canUndo
     * @type {boolean}
     */
    canUndo: true,

    /**
     * @property width
     * @type {int}
     */
    width: 400,

    /**
     * @property height
     * @type {int}
     */
    height: 400,

    /**
     * normalized cross-player setting
     * @property autoplay
     * @type {int}
     */
    autoplay: 0,

    /**
     *  background color
     *  @property bgColor
     *  @type {string}
     */
    bgColor: '#FFFFFF',

    /**
     * added to object element as param elements; added to embed element as attrs
     * @property params
     * @type {Object}
     */
    params: {wmode: 'transparent'},

    /**
     *  added to object and embed elements as attrs
     * @property attrs
     * @type {Object}
     */
    attrs: {},

    /**
     * key used for object src param (thanks to Andrea Ercolino)
     * @property flvKeyName
     * @type {string}
     */
    flvKeyName: 'file',

    /**
     * added to flash content as flashvars param/attr
     * @property flashvars
     * @type {Object}
     */
    flashvars: {},

    /**
     * required flash version
     * @property flashVersion
     * @type {string}
     */
    flashVersion: '7',

    /**
     * src for express installer
     * @property expressInstaller
     * @type {string}
     */
    expressInstaller: null,

    /**
     * default flash video (@see: http://jeroenwijering.com/?item=Flash_Media_Player)
     * @property flvPlayer
     * @type {string}
     */
    flvPlayer: 'mediaplayer.swf',

    /**
     * default mp3 player (@see: http://jeroenwijering.com/?item=Flash_Media_Player)
     * @property mp3Player
     * @type {string}
     */
    mp3Player: 'mediaplayer.swf',

    /**
     * @see http://msdn2.microsoft.com/en-us/library/bb412401.aspx
     *
     * @property silverlight
     * @type {Object}
     */
    silverlight: {
        /**
         * display in-place install prompt?
         * @property inplaceInstallPrompt
         * @type {string}
         */
        inplaceInstallPrompt: 'true',

        /**
         * windowless mode (false for wrapping markup)
         * @property isWindowless
         * @type {string}
         */
        isWindowless: 'true',

        /**
         * maximum framerate
         * @property framerate
         * @type {string}
         */
        framerate: '24',

        /**
         * Silverlight version
         * @property version
         * @type {string}
         */
        version: '0.9',

        /**
         * onError callback
         * @property onError
         * @type {function}
         */
        onError: null,

        /**
         * onLoad callback
         * @property onLoad
         * @type {function}
         */
        onLoad: null,

        /**
         * object init params
         * @property initParams
         * @type TODO: Figure what the fuck this is
         */
        initParams: null,

        /**
         * callback arg passed to the load callback
         * @property userContext
         * @type TODO: this too. Figure it out
         */
        userContext: null
    }
};

/**
 * These are all of the available players currently in this library
 * If you would like to add more submit a pull request.
 *
 * @property players
 * @type {Object}
 */
Media.defaults.players = {
    flash: {
        name: 'flash',
        title: 'Flash',
        mimetype: 'application/x-shockwave-flash',
        pluginspage: 'http://www.adobe.com/go/getflashplayer',
        ieAttrs: {
            classid: 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000',
            type: 'application/x-oleobject',
            codebase: 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=' + Media.defaults.flashVersion
        }
    },
    quicktime: {
        name: 'quicktime',
        title: 'QuickTime',
        mimetype: 'video/quicktime',
        pluginspage: 'http://www.apple.com/quicktime/download/',
        ieAttrs: {
            classid: 'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B',
            codebase: 'http://www.apple.com/qtactivex/qtplugin.cab'
        }
    },
    realplayer: {
        name: 'real',
        title: 'RealPlayer',
        mimetype: 'audio/x-pn-realaudio-plugin',
        pluginspage: 'http://www.real.com/player/',
        autoplayAttr: 'autostart',
        ieAttrs: {
            classid: 'clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA'
        }
    },
    winmedia: {
        name: 'winmedia',
        title: 'Windows Media',
        mimetype: 'application/x-mplayer2',
        pluginspage: 'http://www.microsoft.com/Windows/MediaPlayer/',
        autoplayAttr: 'autostart',
        oUrl: 'url',
        ieAttrs: {
            classid: 'clsid:6BF52A52-394A-11d3-B153-00C04F79FAA6',
            type: 'application/x-oleobject'
        }
    },
    // special cases
    img: {
        name: 'img',
        title: 'Image'
    },
    iframe: {
        name: 'iframe'
    },
    silverlight: {
        name: 'silverlight'
    }
};

Media.defaults.extensions = {
    // flash
    flv: Media.defaults.players.flash,
    mp3: Media.defaults.players.flash,
    swf: Media.defaults.players.flash,

    //quicktime
    aif: Media.defaults.players.quicktime,
    aiff: Media.defaults.players.quicktime,
    aac: Media.defaults.players.quicktime,
    au: Media.defaults.players.quicktime,
    bmp: Media.defaults.players.quicktime,
    gsm: Media.defaults.players.quicktime,
    mov: Media.defaults.players.quicktime,
    mid: Media.defaults.players.quicktime,
    midi: Media.defaults.players.quicktime,
    mpg: Media.defaults.players.quicktime,
    mpeg: Media.defaults.players.quicktime,
    mp4: Media.defaults.players.quicktime,
    m4a: Media.defaults.players.quicktime,
    psd: Media.defaults.players.quicktime,
    qt: Media.defaults.players.quicktime,
    qtif: Media.defaults.players.quicktime,
    qif: Media.defaults.players.quicktime,
    qti: Media.defaults.players.quicktime,
    snd: Media.defaults.players.quicktime,
    tif: Media.defaults.players.quicktime,
    tiff: Media.defaults.players.quicktime,
    wav: Media.defaults.players.quicktime,
    '3g2': Media.defaults.players.quicktime,
    '3gp': Media.defaults.players.quicktime,

    //realplayer
    ra: Media.defaults.players.realplayer,
    ram: Media.defaults.players.realplayer,
    rm: Media.defaults.players.realplayer,
    rpm: Media.defaults.players.realplayer,
    rv: Media.defaults.players.realplayer,
    smi: Media.defaults.players.realplayer,
    smil: Media.defaults.players.realplayer,

    // iframe
    html: Media.defaults.players.iframe,
    pdf: Media.defaults.players.iframe,

    //img
    gif: Media.defaults.players.img,
    png: Media.defaults.players.img,
    jpg: Media.defaults.players.img,

    //silverlight
    silverlight: Media.defaults.players.silverlight,

    // winmedia
    asx: Media.defaults.players.winmedia,
    asf: Media.defaults.players.winmedia,
    avi: Media.defaults.players.winmedia,
    wma: Media.defaults.players.winmedia,
    wmv: Media.defaults.players.winmedia
};