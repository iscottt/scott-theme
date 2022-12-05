/**
 * Build styles
 */
import "./index.css"

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
        this.CSS = {
            baseClass: this.api.styles.block,
            loading: this.api.styles.loader,
            input: this.api.styles.input,
            settingsButton: this.api.styles.settingsButton,
            settingsButtonActive: this.api.styles.settingsButtonActive,
        }

        this.settings = [
            {
                name: 'left',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M256 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H256C273.7 32 288 46.33 288 64C288 81.67 273.7 96 256 96zM256 352H32C14.33 352 0 337.7 0 320C0 302.3 14.33 288 32 288H256C273.7 288 288 302.3 288 320C288 337.7 273.7 352 256 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"/></svg>`
            },
            {
                name: 'center',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M320 96H128C110.3 96 96 81.67 96 64C96 46.33 110.3 32 128 32H320C337.7 32 352 46.33 352 64C352 81.67 337.7 96 320 96zM416 224H32C14.33 224 0 209.7 0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224zM0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480H32C14.33 480 0 465.7 0 448zM320 352H128C110.3 352 96 337.7 96 320C96 302.3 110.3 288 128 288H320C337.7 288 352 302.3 352 320C352 337.7 337.7 352 320 352z"/></svg>`
            },
            {
                name: 'right',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width:14px"><path d="M416 96H192C174.3 96 160 81.67 160 64C160 46.33 174.3 32 192 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96zM416 352H192C174.3 352 160 337.7 160 320C160 302.3 174.3 288 192 288H416C433.7 288 448 302.3 448 320C448 337.7 433.7 352 416 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"/></svg>`
            }
        ];

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
        const wrapper = document.createElement('div');
        const buttons_wrapper = document.createElement('div');
        const fontsize_wrpper = document.createElement('div');
        const color_wrapper = document.createElement('div');
        wrapper.appendChild(buttons_wrapper);
        wrapper.appendChild(fontsize_wrpper);
        wrapper.appendChild(color_wrapper);

        this.settings.map(tune => {
            /**
             * buttonのdomを作成して、alignのtoggleをactiveに設定する
             * @type {HTMLDivElement}
             */
            const button = document.createElement('div');
            button.classList.add('cdx-settings-button','ce-settings__button');
            button.innerHTML = tune.icon;

            button.classList.toggle(this.CSS.settingsButtonActive, tune.name === this.data.align);

            buttons_wrapper.appendChild(button);
            buttons_wrapper.classList.add('ce-settings__default-zone')

            return button;
        }).forEach((element, index, elements) => {

            element.addEventListener('click', () => {

                this._toggleTune(this.settings[index].name);

                elements.forEach((el, i) => {
                    const {name} = this.settings[i];
                    el.classList.toggle(this.CSS.settingsButtonActive, name === this.data.align);
                    //paragraphのdivにalignのclassをつける。
                    this._element.classList.toggle(this._CSS.align[name], name === this.data.align)
                });
            });
        });

        fontsize_wrpper.setAttribute('class','tune-box border-top');
        fontsize_wrpper.appendChild((()=>{
        	var div = document.createElement('div');
        	div.innerText = '字号 px';
        	div.classList.add('title')
        	return div;
        })())
        fontsize_wrpper.appendChild((()=>{
        	var input = document.createElement('input');
        	input.classList.add('nv-input')
        	input.setAttribute('placeholder','默认')
        	input.setAttribute('type','number');
        	input.value = this.data.fontSize;

        	input.addEventListener('change',()=>{
        		var value = parseInt(input.value);
        		if (value >= 10 && value <= 100) {
        			this.data.fontSize = value;
        			this._element.style.fontSize = `${value}px`;
        		} else {
        			input.value = "";
        			this._element.style.fontSize = "";
        		}
        	})
        	return input;
        })())

        color_wrapper.setAttribute('class','tune-box border-bottom border-top');
        color_wrapper.appendChild((()=>{
        	var div = document.createElement('div');
        	div.innerText = '颜色';
        	div.classList.add('title')
        	return div;
        })())
        color_wrapper.appendChild((()=>{
        	var input_group = document.createElement('div');
        	input_group.classList.add('nv-input-group','flex');

        	var colorInput = document.createElement('input');
        	colorInput.classList.add('nv-input')
        	colorInput.setAttribute('placeholder','默认')
        	colorInput.setAttribute('type','text');
        	colorInput.style.width = "70%";
        	colorInput.value = this.data.color;

        	input_group.appendChild(colorInput);

        	var colorSelect = document.createElement('input');
        	colorSelect.classList.add('nv-input')
        	colorSelect.setAttribute('placeholder','默认')
        	colorSelect.setAttribute('type','color');
        	colorSelect.style.width = "30%";
        	colorSelect.style.padding = "0";
        	colorSelect.value = this.data.color;

        	input_group.appendChild(colorSelect);

        	colorInput.addEventListener('change',()=>{
        		var value = colorInput.value;
        		this.data.color = value;
        		colorSelect.value = value;
        		this._element.style.color = value;
        	})

        	colorSelect.addEventListener('change',()=>{
        		var value = colorSelect.value;
        		this.data.color = value;
        		colorInput.value = value;
        		this._element.style.color = value;
        	})


        	return input_group;
        })())

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