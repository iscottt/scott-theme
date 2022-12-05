/**
 * Build styles
 */
var Vue = nv.Vue;
var defineRemoteComponent = nv.Vue._defineRemoteComponent;
var store = nv.Vue._store;
var themeProvider = defineRemoteComponent("/srcs/block-paragraph/theme-provider.vue")
var settingsUI = defineRemoteComponent("/srcs/block-paragraph/settings_ui.vue")

// paragraph 样式
var paragraph_style = document.createElement('link');
paragraph_style.setAttribute('rel','stylesheet')
paragraph_style.setAttribute('type','text/css')
paragraph_style.setAttribute('href',`${location.port==3000?"/vite-proxy":""}/srcs/block-paragraph/index.css`)
document.head.append(paragraph_style)

// fontawesome 样式
var fa_style = document.createElement('link');
fa_style.setAttribute('rel','stylesheet')
fa_style.setAttribute('type','text/css')
fa_style.setAttribute('href',`${location.port==3000?"/vite-proxy":""}/srcs/block-paragraph/fontawesome/css/all.css`)
document.head.append(fa_style)

class Paragraph {
    /**
     * Default placeholder for Paragraph Tool
     *
     * @return {string}
     * @constructor
     */
    static get DEFAULT_PLACEHOLDER() {
        return '';
    }

    /**
     * Allowed paragraph aligns
     *
     * @public
     * @returns {{left: string, center: string}}
     */
    static get ALIGNS() {
        return {
            left: 'left',
            center: 'center',
            right: 'right',
        };
    }

    /**
     *
     * @returns {boolean}
     */
    static get isReadOnlySupported() {
        return true;
    }

    /**
     * Default paragraph align
     *
     * @public
     * @returns {string}
     */
    static get DEFAULT_ALIGN() {
        return Paragraph.ALIGNS.left;
    }

    /**
     *
     * @param data
     * @param config
     * @param api
     * @param readOnly
     */
    constructor({data, config, api, readOnly}) {
        this.api = api;
        this.config = config;
        this.readOnly = readOnly;
        this._CSS = {
            block: this.api.styles.block,
            wrapper: 'ce-paragraph',
            align: {
                left: 'ce-paragraph--left',
                center: 'ce-paragraph--center',
                right: 'ce-paragraph--right',
            }
        }

        this.onKeyUp = this.onKeyUp.bind(this)

        /**
         * Placeholder for paragraph if it is first Block
         * @type {string}
         */
        this._placeholder = config.placeholder ? config.placeholder : Paragraph.DEFAULT_PLACEHOLDER;

        this._data = {
        	fontSize: data.fontSize || '',
        	color: data.color || '',
            text: data.text || '',
            align: data.align || config.defaultAlign || Paragraph.DEFAULT_ALIGN,
        };
        this._element = this.drawView();
        this.data = data;

        this._preserveBlank = config.preserveBlank !== undefined ? config.preserveBlank : false;

    }

    /**
     * Check if text content is empty and set empty string to inner html.
     * We need this because some browsers (e.g. Safari) insert <br> into empty contenteditanle elements
     *
     * @param {KeyboardEvent} e - key up event
     */
    onKeyUp(e) {
        if (e.code !== 'Backspace' && e.code !== 'Delete') {
            return;
        }

        const {textContent} = this._element;

        if (textContent === '') {
            this._element.innerHTML = '';
        }
    }

    /**
     * Create Tool's view
     * @return {HTMLElement}
     * @private
     */
    drawView() {
        let div = document.createElement('DIV');

        div.classList.add(this._CSS.wrapper, this._CSS.block, this._CSS.align[this.data.align]);
        div.contentEditable = !this.readOnly;
        div.dataset.placeholder = this.api.i18n.t(this._placeholder);
        div.innerHTML = this.data.text;
        div.style.fontSize = `${this.data.fontSize}px`;
        div.style.color = this.data.color;

        div.addEventListener('keyup', this.onKeyUp);

        return div;
    }

    /**
     * Return Tool's view
     * @returns {HTMLDivElement}
     * @public
     */
    render() {
        return this._element;
    }

    /**
     * Method that specified how to merge two Text blocks.
     * Called by Editor.js by backspace at the beginning of the Block
     * @param {ParagraphData} data
     * @public
     */
    merge(data) {

        let newData = {
            text: this.data.text += data.text,
            align: this.data.align,
            fontSize: this.data.fontSize,
            color: this.data.color,
        };

        this._element.innerHTML = this.data.text;

        this.data = newData;
    }

    /**
     * Validate Paragraph block data:
     * - check for emptiness
     *
     * @param {ParagraphData} savedData — data received after saving
     * @returns {boolean} false if saved data is not correct, otherwise true
     * @public
     */
    validate(savedData) {
        if (savedData.text.trim() === '' && !this._preserveBlank) {
            return false;
        }

        return true;
    }

    /**
     * Extract Tool's data from the view
     * @param {HTMLDivElement} toolsContent - Paragraph tools rendered view
     * @returns {ParagraphData} - saved data
     * @public
     */
    save(toolsContent) {
        return Object.assign(this.data, {
            text: toolsContent.innerHTML,
        });
    }

    /**
     * On paste callback fired from Editor.
     *
     * @param {PasteEvent} event - event with pasted data
     */
    onPaste(event) {
        const data = {
            text: event.detail.data.innerHTML,
            align: this.config.defaultAlign || Paragraph.DEFAULT_ALIGN,
            fontSize: '',
            color: '',
        };

        this.data = data;
    }

    /**
     * Get current Tools`s data
     * @returns {ParagraphData} Current data
     * @private
     */
    get data() {
        return this._data;
    }

    /**
     * Store data in plugin:
     * - at the this._data property
     * - at the HTML
     *
     * @param {ParagraphData} data — data to set
     * @private
     */
    set data(data) {
        this._data = {
            text: data.text || '',
            align: data.align || this.config.defaultAlign || Paragraph.DEFAULT_ALIGN,
            fontSize: data.fontSize || '',
            color: data.color || '',
        }
        this._element.innerHTML = this._data.text || '';
    }


    /**
     * Enable Conversion Toolbar. Paragraph can be converted to/from other tools
     */
    static get conversionConfig() {
        return {
            export: 'text', // to convert Paragraph to other block, use 'text' property of saved data
            import: 'text' // to covert other block's exported string to Paragraph, fill 'text' property of tool data
        };
    }

    /**
     * Sanitizer rules
     */
    static get sanitize() {
        return {
            text: {
                br: true,
                span: {
                    class: true,
                }
            },
            align: {},
            fontSize: {},
            color: {},
        };
    }

    /**
     * Used by Editor paste handling API.
     * Provides configuration to handle P tags.
     *
     * @returns {{tags: string[]}}
     */
    static get pasteConfig() {
        return {
            tags: ['P']
        };
    }

    /**
     *
     * @returns {HTMLDivElement}
     */
    renderSettings() {
        var rawEl = this._element;
        var rawData = this.data;
        var wrapper = document.createElement(`div`);
        var constructor = this;
        var vue_app_settings_ui = Vue.createApp({
        	template: `<themeProvider :store="store"><blockUI :rawEl="rawEl" :rawData="rawData" @forceUpdate="forceUpdate" /></themeProvider>`,
        	components: {
        		themeProvider,
        		blockUI: settingsUI,
        	},
        	data(){return{
        		store,
        		rawEl,
        		rawData,
        	}},
            methods: {
                forceUpdate() {
                    var api = constructor.api;
                    var currentBlockIndex = api.blocks.getCurrentBlockIndex();
                    var currentBlock = api.blocks.getBlockByIndex(currentBlockIndex);
                    currentBlock.save()
                    .then((data)=>{
                        api.blocks.insert(data.tool,{},null,0,true);
                        api.blocks.delete(0)
                    })
                    .catch(e=>console.log(e))
                }
            }
        }).mount(wrapper);
        return wrapper;
    }


    /**
     * @private
     * Click on the Settings Button
     * @param {string} tune — tune name from this.settings
     */
    _toggleTune(tune) {
        this.data.align = tune;
    }

    /**
     * Icon and title for displaying at the Toolbox
     *
     * @return {{icon: string, title: string}}
     */
    static get toolbox() {
        return {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0.2 -0.3 9 11.4" width="12" height="14"><path d="M0 2.77V.92A1 1 0 01.2.28C.35.1.56 0 .83 0h7.66c.28.01.48.1.63.28.14.17.21.38.21.64v1.85c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26a1 1 0 01-.21-.66V1.69H5.6v7.58h.5c.25 0 .45.08.6.23.17.16.25.35.25.6s-.08.45-.24.6a.87.87 0 01-.62.22H3.21a.87.87 0 01-.61-.22.78.78 0 01-.24-.6c0-.25.08-.44.24-.6a.85.85 0 01.61-.23h.5V1.7H1.73v1.08c0 .26-.08.48-.23.66-.15.17-.37.26-.66.26-.28 0-.5-.09-.64-.26A1 1 0 010 2.77z"/></svg>`,
            title: 'Text'
        };
    }
}

export default Paragraph;