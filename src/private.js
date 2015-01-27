/**
 * Created by Tim Martin on 1/11/15.
 */
//TODO temporary placeholder until I figure out how to appropriately do this
Media.private = {
    /**
     * Responsible for actually creating the new player div
     *
     * @method generateHTMLPlayerElement
     * @param element The media element that is being replaced with a new media-type
     * appopriate element. TODO same as returns
     * @param {Object} options The options for creating this element
     * @param {String} extensionType The name of the extension for the media
     * @returns TODO what is a html dom element called in javascript?
     */
    generateHTMLPlayerElement: function(element, options, extensionType){
        var p = new Player(extensionType);
        return p.generate(element, options);
    },

    /**
     * Gets the player for the specified extension
     * TODO need a better way of doing this.
     *
     * @method getPlayerForType
     * @param {string} extensionType The extension type for the player
     * @returns {Object}
     */
    getPlayerForType: function(extensionType){
        for(var player in Media.defaults.players){
            if(Media.defaults.players.hasOwnProperty(player)){
                if($.inArray(extensionType, Media.defaults.players[player].types)){
                    return Media.defaults.players[player];
                }
            }
        }

        throw 'A player for extension type ' + extensionType + ' was not found';
    },

    /**
     * Get a flattend list of the settings for this media object.
     * This should inclde the global defaults, meta, and option obj
     *
     * @method getSettings
     * @param element TODO: type?
     * @param {Object} options
     */
    getSettings: function(element, options){
        var globalMediaSettings, meta, compiledOptions, $element;
        $element = $(element);
        options = options || {};
        meta = Media.private.getMetaSettings(element);
        globalMediaSettings = Media.defaults;
        compiledOptions = $.extend(globalMediaSettings, meta, options);

        if(typeof(compiledOptions.caption === undefined)){ compiledOptions.caption = $element.text()}

        if(compiledOptions.src === undefined){ compiledOptions.src = $element.attr('href') || $element.attr('src');}
        if(compiledOptions.src === undefined){ throw 'No source was defined on the element. Either href or src needs to be set on the element.'}
        if(!compiledOptions.params){ compiledOptions.params = {}; }

        return compiledOptions;
    },

    /**
     * This method is responsible for getting the meta settings on an
     * html element
     *
     * @method getMetaSettings
     * @param element TODO figure out the actual javascript type for a dom element.
     * @returns {Object} The meta settings for the specified object
     */
    getMetaSettings: function(element){
        var meta, attr, attrName;
        var dataName = 'data-'; // TODO fix this.
        var $element = $(element);

        // metadata plugin (v1.0 and v2.0)
        if($.metadata){ meta = $element.metadata(); }
        else if($.meta){ meta = $element.data(); }

        if(!meta){ meta = {}; }

        meta.elementClass = element.className || '';

        // TODO does not look safe....
        if(!meta.width){
            meta.width = parseInt(((meta.elementClass.match(/\bw:(\d+)/)||[])[1]||0),10) || parseInt(((meta.elementClass.match(/\bwidth:(\d+)/)||[])[1]||0),10);
        }
        if(!meta.height){
	        meta.height = parseInt(((meta.elementClass.match(/\bh:(\d+)/)||[])[1]||0),10) || parseInt(((meta.elementClass.match(/\bheight:(\d+)/)||[])[1]||0),10);
        }

        // html5 style data attributed
        // It is necessary to implement it in this manner in order to keep compatibility with IE and Opera
        for(var i=0; i<element.attributes.length; i++){
            attr = element.attributes[i];
            attrName = $.trim(attr);
            // For efficiency purposes, way cheaper and cleaner than indexOf
            if(attrName.slice(0, dataName.length) == dataName){
                meta[attrName] = attr.value;
            }
        }

        return meta;
    },

    /**
     * Gets the extension type for the url specified.
     *
     * @method getExtensionType
     * @param {string} url
     * @returns {string} The extension type.
     */
    getExtensionType: function(url){
        var regExp, extension;
        for(var key in Media.defaults.extensions){
            if(Media.defaults.extensions.hasOwnProperty(key)){
                regExp = new RegExp('\\.(' + key + ')\\b');
                extension = regExp.exec(url);
                if(extension){
                    return extension;
                }
            }
        }
        throw 'No usable extension was found on the url: ' + url;
    }
};