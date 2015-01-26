/**
 * Blah blah blah media class... TODO
 *
 *
 * @class Media
 * @type {{convertToMedia: Function, undo: Function}}
 */
var Media;
Media = {
    /**
     * Chainable method that converts the element into rich media.
     * It provides a pre-conversion callback and a post conversion callback
     *
     * @method convertToMedia
     * @param {Array} elements An array of elements to convert to media
     * @param {function} beforeConversion The callback that will be run before the
     * conversion of the element
     * @param {function} afterConversion The callback that will be run after the
     * conversion of the element.
     * @param {Object} options TODO: figure out what the hell the options can be
     */
    convertToMedia: function (elements, options, beforeConversion, afterConversion) {
        var settings, generatedHTMLElement;
        return elements.each(function(){
            var $this = $(this);
            options = options || {};
            settings = Media.private.getSettings(this, options);

            // Run the beforeConversion callback
            if(beforeConversion){ beforeConversion(this, settings); }

            if(!settings.type){
                settings.type = Media.private.getExtensionType(settings.src.toLowerCase());
            }

            generatedHTMLElement = Media.private.generateHTMLPlayerElement(this, settings, settings.type);
            $this.replaceWith(generatedHTMLElement);
            if(afterConversion){ afterConversion(this, generatedHTMLElement, settings, settings.type); }
        });

    },

    /**
     * Resets the html on all found media elements to their original
     * state, i.e. it undoes all of it's actions.
     * This method is also chainable
     *
     * @method undo
     * @class Media
     */
    undo: function (elements) {
        return elements.each(function () {
            var $this = this;
            var html = $this.data('media.origHTML'); // TODO: fix this access pattern
            if (html) {
                $this.replaceWith(html);
            } else {
                console.info('No original HTML was found on a media object.');
            }
        });
    }
};

$.fn.media = function(options, beforeConversion, afterConversion){
    if(options === 'undo'){
        Media.undo(this);
    }else{
        Media.convertToMedia(this, options, beforeConversion, afterConversion);
    }
};