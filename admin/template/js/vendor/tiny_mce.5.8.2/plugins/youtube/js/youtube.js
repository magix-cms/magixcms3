/*
 # -- BEGIN LICENSE BLOCK ----------------------------------
 #
 # This file is part of tinyMCE.
 # YouTube for tinyMCE 4.x.x
 # Copyright (C) 2011 - 2017  Gerits Aurelien <aurelien[at]magix-cms[dot]com>
 # This program is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # This program is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.

 # You should have received a copy of the GNU General Public License
 # along with this program.  If not, see <http://www.gnu.org/licenses/>.
 #
 # -- END LICENSE BLOCK -----------------------------------
 * https://developers.google.com/youtube/player_parameters
 */
class Youtube {
    constructor(url, options = {}) {
        this.id = this.idFromUrl(url);
        this.width = '';
        this.height = '';
        this.ratio = '16by9';
        this.autoplay = false;
        this.related = false;
        this.fullscreen = true;
        this.hd = false;
        if(typeof options === 'object') this.set(options);
        this.url = this.setSrcUrl();
        this.placeholder = this.setPlaceholderUrl();
    }

    set(options) {
        let instance = this;
        for (var key in options) {
            if (options.hasOwnProperty(key)) instance[key] = options[key];
        }
    }

    idFromUrl(url) {
        let match = url.match((/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/));
        return match && match[2].length === 11 ? match[2] : false;
    }

    setSrcUrl() {
        return "https://www.youtube.com/embed/"+this.id+"?rel=" + (this.related ? '1' : '0')+"&autoplay=" + (this.autoplay ? '1' : '0');
    }

    setPlaceholderUrl() {
        return "https://i.ytimg.com/vi/"+this.id+"/maxresdefault.jpg";
    }

    createIframe(width = 750, height = 315) {
        return '<iframe src="' + this.url + '" ' + 'width="' + width + '" height="' + height + '"' + ' frameborder="0" allowfullscreen class="embed-responsive-item">&nbsp;</iframe>';
    }

    compiledHTML() {
        let params = {
            videoId: this.id,
            height: this.height,
            width: this.width,
            playerVars: {
                'autoplay': this.autoplay? 1 : 0,
                'rel': this.related? 1 : 0,
                'fs': this.fullscreen? 1 : 0,
                'hd': this.hd? 1 : 0
            }
        };
        let html = '<div class="embed-responsive embed-responsive-'+this.ratio+'">';
        html += '<img src="'+this.placeholder+'" alt="Accept embed video cookie to display the video" class="embed-responsive-item img-responsive ytb-video-preview" data-ytb=\''+JSON.stringify(params)+'\' />';
        html += '</div>'
        return html;
    }
}

window.addEventListener('load',() => {
    let timer;
    let preview;
    let urlInput;
    let langVariables = {
        section_video: parent.tinymce.util.I18n.translate("section_video"),
        aspect_video: parent.tinymce.util.I18n.translate("aspect_video"),
        option_video: parent.tinymce.util.I18n.translate("option_video"),
        preview_video: parent.tinymce.util.I18n.translate("preview_video"),
        youtubeUrl: parent.tinymce.util.I18n.translate("Youtube URL"),
        youtubeID: parent.tinymce.util.I18n.translate("Youtube ID"),
        youtubeWidth: parent.tinymce.util.I18n.translate("width"),
        youtubeHeight: parent.tinymce.util.I18n.translate("height"),
        youtubeRatio: parent.tinymce.util.I18n.translate("ratio"),
        ratio16by9: parent.tinymce.util.I18n.translate("ratio16by9"),
        ratio4by3: parent.tinymce.util.I18n.translate("ratio4by3"),
        youtubeAutoplay: parent.tinymce.util.I18n.translate("autoplay"),
        youtubeHD: parent.tinymce.util.I18n.translate("HD video"),
        youtubeREL: parent.tinymce.util.I18n.translate("Related video"),
        cancel: parent.tinymce.util.I18n.translate("cancel"),
        Insert: parent.tinymce.util.I18n.translate("Insert")
    };

    /**
     * Display iframe preview
     */
    function renderPreview() {
        let url = urlInput.value;
        let youtube = new Youtube(url);
        preview.innerHTML = youtube.createIframe();
    }

    /**
     * Update Timer with keypress
     * @param ts {number} (optional)
     */
    function updateTimer(ts) {
        clearTimeout(timer);
        timer = setTimeout(renderPreview, ts || 1000);
    }

    /**
     * Init url input and preview render
     */
    function init() {
        preview = document.getElementById('preview');
        urlInput = document.getElementById('youtubeID');

        if(preview !== null && urlInput !== null) {
            urlInput.addEventListener('keypress',updateTimer);
            urlInput.addEventListener('change',() => { updateTimer(100); });
        }
    }

    /**
     * Insert content when the window form is submitted
     * @returns {string}
     */
    function renderHtml() {
        let video = urlInput.value;
        let html = '';
        if(video !== '') {
            let youtube = new Youtube(video, {
                autoplay: document.getElementById("youtubeAutoplay").checked,
                related: document.getElementById("youtubeREL").checked,
                hd: document.getElementById("youtubeHD").checked,
                width: document.getElementById("youtubeWidth").value,
                height: document.getElementById("youtubeHeight").value,
                ratio: document.getElementById("youtubeRatio").value
            });
            html = youtube.compiledHTML();
        }
        return html;
    }

    /**
     * Execute insert
     */
    function insert() {
        let html = renderHtml();
        parent.tinymce.activeEditor.insertContent(html);
        parent.tinymce.activeEditor.windowManager.close();
    }

    /**
     * Display the form into the dialog
     */
    fetch('./view/form.html').then((response) => {
        return response.text();
    }).then((template) => {
        document.getElementById('template-container').innerHTML = Mustache.render(template, langVariables);
        init();
        document.getElementById('insert-btn').addEventListener('click',insert);
        document.getElementById('close-btn').addEventListener('click',() => {
            parent.tinymce.activeEditor.windowManager.close();
        });
    });
});