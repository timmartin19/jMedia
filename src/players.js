/**
 * Created by Tim Martin on 1/11/15.
 */
function Player(extension){
    extension = extension[1];  // TODO this is stupid...
    this.types = [];
    this.ieAttrs = [];
    this.name = null;
    this.isMSIE = /MSIE/.test(navigator.userAgent);
    this.isOldIE = this.isMSIE && (/MSIE (6|7|8)\.0/.test(navigator.userAgent) || mode < 9);
    var player = Media.defaults.extensions[extension];
    for(var key in player) {
        if (player.hasOwnProperty(key)) {
            this[key] = player[key];
        }
    }
}

Player.prototype.generate = function(element, options){
    var $tag = this.generateHTML(options);
    var $div = $('<div></div>');
    $div.append($tag);
    if(element.id){ $div.attr('id', element.id); }
    if(element.class){ $div.attr('class', element.class); }
    if(options.caption){ $('<div>').appendTo($div).html(options.caption); }
    return $div;
};

/**
 * This method in particular needs to be rewritten.  But I
 * should probably just rewrite the whole file.
 *
 * @param options
 * @returns {*}
 */
Player.prototype.generateHTML = function(options){
    var $tag;
    if(this.name === 'iframe'){
        $tag = $('<iframe' + ' width="' + options.width + '" height="' + options.height + '" >');
        $tag.attr('src', options.src);
    }
    else if(this.isOldIE){
        $tag = $('<object></object>');
        $tag = this.setAttributesOnElement($tag, options.attrs);
        if(this.ieAttrs){ this.setAttributesOnElement($tag, this.ieAttrs); }

        $tag = this.setParameterTags($tag, options);
    }
    else if(options.standards){
        $tag = $('<object></object>');
        // Rewritten to be standards compliant by Richard Connamacher
        $tag.attr('type', this.mimetype);
        $tag = this.setHeightAndWidthTag($tag, options);
        if(options.src){ $tag.attr('data', options.src); }

        if(this.isMSIE){ $tag = this.setAttributesOnElement($tag, this.ieAttrs); }

        $tag = this.setParameterTags($tag, options);
        $tag.append($('<div><p><strong>' + this.title+ ' Required</strong></p><p>' + this.title +
            ' is required to view this media. <a href="' + this.pluginspage + '">Download Here</a>.</p></div>'));
    }else{
        $tag = $('<embed></embed>');
        $tag = this.setHeightAndWidthTag($tag, options);
        if(options.src){ $tag.attr('src', options.src); }

        $tag = this.setAttributesOnElement($tag, options.attrs);
        $tag = this.setAttributesOnElement($tag, this.eAttrs);
        $tag = this.setAttributesOnElement($tag, options.params);
    }
    // TODO wmode stuff // FF3/Quicktime borks on wmode (from original)
    return $tag;
};

/**
 * Sets the height and width of the element.
 *
 * @param tag TODO javascript html element
 * @param {Object} options needs height and width parameters
 * @returns TODO ditto
 */
Player.prototype.setHeightAndWidthTag = function(tag, options){
    return tag.attr('width', options.width).attr('height', options.height);
};

/**
 * Sets the specified attributes on the jquery element passed into it
 *
 * @param $element
 * @param attrs
 * @returns {*} $element updated with attributes
 */
Player.prototype.setAttributesOnElement = function($element, attrs){
    for(var key in attrs){
        if(attrs.hasOwnProperty(key)){
            $element.attr(key, attrs[key]);
        }
    }
    return $element
};

Player.prototype.setParameterTags = function($tag, options){
    var parameters = [];
    var $parameter = $('<parameter/>');
    $parameter.attr('name', (this.oUrl || 'src')).attr('value', options.src);
    parameters.push($parameter);
    for(key in options.params){
        if (options.params.hasOwnProperty(key)){
            $parameter = $('<parameter/>');
            $parameter.attr('name', key).attr('value', options.params[key]);
            parameters.push($parameter);
        }
    }

    for(var i=0; i< parameters.length; i++){
        $tag.append(parameters[i]);
    }
    return $tag;
};

