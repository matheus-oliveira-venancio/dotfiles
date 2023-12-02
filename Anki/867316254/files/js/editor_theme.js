/* ------------------------------------------------------------------------------
#
# MIT License
#
# Copyright (c) 2021-2022 nogira
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
# --------------------------------------------------------------------------- */

const fieldShadowRootNode = (fieldNum) => {
    /*
    return shadowroot node of field number fieldNum
    */
    const selector = (i) => `.fields > div:nth-child(${i}) > div > div.editing-area > div > div.rich-text-editable`;
    return document.querySelector(selector(fieldNum)).shadowRoot;
}

function wrapSelectionInElems(...arr) {
    /*
    wrap the current text selection in the input elements

    example input:
        wrapSelectionInElems(
            "pre",
            ["code", {"class": "lang-js", "id": "code-block"}],
        );

    output:
        <pre><code class="lang-js" id="code-block">text selection</code></pre>
    */

    // --- prepare nodes for wrap ---

    const elemsForWrap = [];
    for (const elem of arr) {
        if (typeof(elem) === "string") {
            const node = document.createElement(elem);
            elemsForWrap.unshift(node);
        } else {
            const [tag, attrs] = elem;
            const node = document.createElement(tag);
            for (const attr of Object.keys(attrs)) {
                node.setAttribute(attr, attrs[attr])
            }
            elemsForWrap.unshift(node);
        }
    }

    // --- wrap selection in nodes ---

    const numTextFields = document.querySelector(".fields").childElementCount;

    // loop through text fields until selection is found
    for (let i = 1; i < (numTextFields + 1); i++) {
        // because selection is in shadowroot, the only way to access the 
        // selection is by using the shadowroot as the seleciton node
        const node = fieldShadowRootNode(i);
        const selectionInField = node.getSelection().anchorNode;
        if (selectionInField) {
            const selection = node.getSelection();
            const range = selection.getRangeAt(0);

            // use try-catch in case user tries to semi-overlap html tags which 
            // doesn't work
            try {
                // declaring elem here so i can use it to reselect the range 
                // after elems added
                let elem;
                for (elem of elemsForWrap) {
                    range.surroundContents(elem);
                }
                // the selection gets removed after wrapping, so we need to 
                // re-select the text
                selection.setBaseAndExtent(elem,0 ,elem,1);
            } catch (e) {
                // alert(e);
                alert("Can't semi-overlap HTML tags!\n\n"
                        + "Illustrative Example:\n"
                        + "- Good\n"
                        + "  <bold>text</bold> <italic>text</italic>\n\n"
                        + "- Also Good\n"
                        + "  <bold><italic>text</italic></bold>text\n\n"
                        + "- BAD !!\n"
                        + "  <bold><italic>text</bold> text</italic>");
            }
            break;
        }
    }
}

function changeFields() {
    /*
    add editor.css to each editor field (have to make sure its within shadowroot)
    */

    // get src attr of editor_theme.js script then modify that path to get path 
    // of editor.css
    const scriptUrl = document.querySelector("#editor-script").src;
    const cssPath = scriptUrl.replace("js/editor_theme.js", "css/editor.css");

    const fieldElemNodes = document.querySelector(".fields").childElementCount;
    for (let i = 1; i != (fieldElemNodes + 1); i++) {
        const node = fieldShadowRootNode(i);

        // to prevent infite additions of editor.css when field is updated 
        // in browse, only add if not present
        // if not present, this = null
        const cssElemPresent = node.querySelector(`[href="${cssPath}"]`);
        if (!cssElemPresent) {
            const newCSSElem = document.createElement("link");
            newCSSElem.setAttribute("rel", "stylesheet");
            newCSSElem.setAttribute("href", cssPath);
            node.appendChild(newCSSElem);
        }
    }

    // -------------------------------------------------------------------------

    // this was causing editor to glitch, also the editor now swaps between two 
    // svgs, so this doesn't really work anyway anymore

    // const pinIcon = '<svg class="icn-dmns" width="13" height="13" viewBox="0 0 512 512" class="bi bi-pin-angle"><path d="m370.5 186.6-5.7-42.6h27.2c13.2 0 24-10.8 24-24v-96c0-13.2-10.8-24-24-24h-272c-13.2 0-24 10.8-24 24v96c0 13.2 10.8 24 24 24h27.2l-5.7 42.6c-47.9 32.8-77.5 84.1-77.5 141.4 0 13.2 10.8 24 24 24h144v104c0 .9.1 1.7.4 2.5l16 48c2.4 7.3 12.8 7.3 15.2 0l16-48c.3-.8.4-1.7.4-2.5v-104h144c13.2 0 24-10.8 24-24 0-57.3-29.6-108.6-77.5-141.4zm-256 117.4c8.3-38.5 35.6-70 71.5-87.8l16-120.2h-58v-48h224v48h-58l16 120.2c35.8 17.8 63.2 49.4 71.5 87.8z"/></svg>';
    // const pinElements = document.querySelectorAll("svg#mdi-pin-outline");
    // for (let i = 0; i != pinElements.length; i++) {
    //         pinElements[i].parentElement.innerHTML = pinIcon;
    // }
};

function changeTopButtons(config) {

    // ----------------------------MODIFY BUTTON CSS----------------------------

    function addPathToSVG(svgNode, path) {
        svgNode.classList.add("icn-dmns");
        svgNode.setAttribute("viewBox", "0 0 640 640");
        svgNode.firstElementChild.setAttribute("d", path);
    }
    const inlineTxtBtns = document.querySelector("#inlineFormatting > div > div:nth-child(1) > div");

    if (config["modify editor appearance"] == true) {
        // remove "..." from fields button and cards button
        // iterate through child 1 & 2 to change text of each child
        for (let i = 1; i < 3; i++) {
            const selector = `#notetype > div > div > div:nth-child(${i}) > button`
            const elem = document.querySelector(selector);
            elem.innerHTML = elem.innerHTML.replace("...", "");
        }

        // fix italic button styling by encasing in div like the rest of the buttons
        const range = document.createRange();
        const italicDiv = document.createElement("div");
        italicDiv.setAttribute("style", "display: contents; --border-left-radius:5px;")
        range.selectNode(document.querySelector('button[title="Italic text (⌘I)"]'));
        range.surroundContents(italicDiv);

        // uses 'font awesome' icons
        const icons = [
            {"path": "m426.52 302.78a119.76 119.76 0 00-82.52-206.78h-184a16 16 0 00-16 16v16a16 16 0 0016 16h16v352h-16a16 16 0 00-16 16v16a16 16 0 0016 16h208a128 128 0 00128-128c0-49.49-28.38-91.92-69.48-113.22zm-186.52-158.78h88a72 72 0 010 144h-88zm112 352h-112v-160h112a80 80 0 010 160z",
            "selector": "svg.bi-type-bold"}, // bold icon
            {"path": "m480 112v16a16 16 0 01-16 16h-67l-88 352h59a16 16 0 0116 16v16a16 16 0 01-16 16h-192a16 16 0 01-16-16v-16a16 16 0 0116-16h67l88-352h-59a16 16 0 01-16-16v-16a16 16 0 0116-16h192a16 16 0 0116 16z",
            "selector": "svg.bi-type-italic"}, // italic icon
            {"path": "m128 112h32v208c0 88.22 71.78 160 160 160s160-71.78 160-160v-208h32a16 16 0 0016-16v-16a16 16 0 00-16-16h-128a16 16 0 00-16 16v16a16 16 0 0016 16h32v208a96 96 0 01-192 0v-208h32a16 16 0 0016-16v-16a16 16 0 00-16-16h-128a16 16 0 00-16 16v16a16 16 0 0016 16zm400 416h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg.bi-type-underline"}, // underline icon
            {"path": "m400 128h-52.28a16 16 0 00-13.31 7.12l-94.41 141.61-94.41-141.61a16 16 0 00-13.31-7.12h-52.28a16 16 0 00-16 16v16a16 16 0 0016 16h35.16l96 144-96 144h-35.16a16 16 0 00-16 16v16a16 16 0 0016 16h52.28a16 16 0 0013.31-7.12l94.41-141.61 94.41 141.61a16 16 0 0013.31 7.12h52.28a16 16 0 0016-16v-16a16 16 0 00-16-16h-35.16l-96-144 96-144h35.16a16 16 0 0016-16v-16a16 16 0 00-16-16zm160 112h-24v-160a16 16 0 00-16-16h-32a16 16 0 00-14.29 8.83l-16 32a16 16 0 0014.29 23.17h16v112h-24a16 16 0 00-16 16v16a16 16 0 0016 16h96a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg#mdi-format-superscript"}, // superscript icon
            {"path": "m400 128h-52.28a16 16 0 00-13.31 7.12l-94.41 141.61-94.41-141.61a16 16 0 00-13.31-7.12h-52.28a16 16 0 00-16 16v16a16 16 0 0016 16h35.16l96 144-96 144h-35.16a16 16 0 00-16 16v16a16 16 0 0016 16h52.28a16 16 0 0013.31-7.12l94.41-141.61 94.41 141.61a16 16 0 0013.31 7.12h52.28a16 16 0 0016-16v-16a16 16 0 00-16-16h-35.16l-96-144 96-144h35.16a16 16 0 0016-16v-16a16 16 0 00-16-16zm160 400h-24v-160a16 16 0 00-16-16h-32a16 16 0 00-14.29 8.83l-16 32a16 16 0 0014.29 23.17h16v112h-24a16 16 0 00-16 16v16a16 16 0 0016 16h96a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg#mdi-format-subscript"}, // subscript icon
            {"path": "m634 535-598-467.5a16 16 0 00-22.51 2.5l-10 12.5a16 16 0 002.51 22.5l598 467.5a16 16 0 0022.5-2.5l10-12.5a16 16 0 00-2.5-22.5zm-282-375-24.76 74.27 50.76 39.73 38-114h144v32a16 16 0 0016 16h16a16 16 0 0016-16v-80a16 16 0 00-16-16h-416a15.86 15.86 0 00-14.18 8.94l70.42 55.06zm-16 336h-32l25.68-77-50.77-39.7-38.91 116.7h-32a16 16 0 00-16 16v16a16 16 0 0016 16h128a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg.bi-eraser"}, // remove html icon
            // ---------------------------------------------------------------------
            {"path": "m112 432a48 48 0 1048 48 48 48 0 00-48-48zm0-160a48 48 0 1048 48 48 48 0 00-48-48zm0-160a48 48 0 1048 48 48 48 0 00-48-48zm448 24h-320a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm0 160h-320a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm0 160h-320a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg.bi-list-ul"}, // unordered list icon
            {"path": "m125.77 465 17.5-20.15a19.92 19.92 0 005.07-14.19v-3.31c0-7.35-3.84-11.35-11.34-11.35h-57a8 8 0 00-8 8v16a8 8 0 008 8h22.84a154.82 154.82 0 00-11 12.31l-5.61 7c-4 5.07-5.25 10.13-2.8 14.88l1.05 1.93c3 5.76 6.3 7.88 12.25 7.88h4.73c10.33 0 15.94 2.44 15.94 9.09 0 4.72-4.2 8.22-14.36 8.22a41.54 41.54 0 01-15.47-3.12c-6.49-3.88-11.74-3.5-15.6 3.12l-5.59 9.31c-3.73 6.13-3.2 11.72 2.62 15.94 7.71 4.69 20.39 9.44 37 9.44 34.16 0 48.5-22.75 48.5-44.12-.03-14.38-9.12-29.76-28.73-34.88zm434.23-9h-320a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm0-320h-320a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm0 160h-320a16 16 0 00-16 16v16a16 16 0 0016 16h320a16 16 0 0016-16v-16a16 16 0 00-16-16zm-480-72h64a8 8 0 008-8v-16a8 8 0 00-8-8h-16v-88a8 8 0 00-8-8h-24a8 8 0 00-7.14 4.42l-8 16a8 8 0 007.14 11.58h8v64h-16a8 8 0 00-8 8v16a8 8 0 008 8zm-3.9 160h67.9a8 8 0 008-8v-16a8 8 0 00-8-8h-38.67c3.28-10.29 48.33-18.68 48.33-56.44 0-29.06-25-39.56-44.47-39.56-21.36 0-33.8 10-40.45 18.75-4.38 5.59-3 10.84 2.79 15.37l8.58 6.88c5.61 4.56 11 2.47 16.13-2.44a13.4 13.4 0 019.45-3.84c3.33 0 9.28 1.56 9.28 8.75.03 12.72-50.97 21.84-50.97 69.12v4c0 7.41 5.08 11.41 12.1 11.41z",
            "selector": "svg.bi-list-ol"}, // ordered list icon
            {"path": "m504 96h-224a160 160 0 000 320h48v112a16 16 0 0016 16h16a16 16 0 0016-16v-384h48v384a16 16 0 0016 16h16a16 16 0 0016-16v-384h32a16 16 0 0016-16v-16a16 16 0 00-16-16zm-176 272h-48a112 112 0 010-224h48z",
            "selector": "svg.bi-text-paragraph"},  // paragraph icon
            {"path": "m108.83 408h262.34a12.82 12.82 0 0012.83-12.83v-22.34a12.82 12.82 0 00-12.83-12.83h-262.34a12.82 12.82 0 00-12.83 12.83v22.34a12.82 12.82 0 0012.83 12.83zm0-256h262.34a12.82 12.82 0 0012.83-12.83v-22.34a12.82 12.82 0 00-12.83-12.83h-262.34a12.82 12.82 0 00-12.83 12.83v22.34a12.82 12.82 0 0012.83 12.83zm419.17 80h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm0 256h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg.bi-text-left"}, // align left icon
            {"path": "m204.1 152h231.81a12.09 12.09 0 0012.09-12.1v-23.81a12.09 12.09 0 00-12.09-12.09h-231.81a12.09 12.09 0 00-12.1 12.09v23.81a12.1 12.1 0 0012.1 12.1zm323.9 336h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm0-256h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm-92.09 176a12.09 12.09 0 0012.09-12.1v-23.81a12.09 12.09 0 00-12.09-12.09h-231.81a12.09 12.09 0 00-12.1 12.09v23.81a12.1 12.1 0 0012.1 12.1z",
            "selector": "svg.bi-text-center"}, // align centre icon
            {"path": "m112 280h416a16 16 0 0016-16v-16a16 16 0 00-16-16h-416a16 16 0 00-16 16v16a16 16 0 0016 16zm416 208h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm3.17-384h-262.34a12.82 12.82 0 00-12.83 12.83v22.34a12.82 12.82 0 0012.83 12.83h262.34a12.82 12.82 0 0012.83-12.83v-22.34a12.82 12.82 0 00-12.83-12.83zm0 256h-262.34a12.82 12.82 0 00-12.83 12.83v22.34a12.82 12.82 0 0012.83 12.83h262.34a12.82 12.82 0 0012.83-12.83v-22.34a12.82 12.82 0 00-12.83-12.83z",
            "selector": "svg.bi-text-right"}, // align right icon
            {"path": "m528 488h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm0-128h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm0-128h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16zm0-128h-416a16 16 0 00-16 16v16a16 16 0 0016 16h416a16 16 0 0016-16v-16a16 16 0 00-16-16z",
            "selector": "svg.bi-justify"}, // align justify icon
            // {"svg": ,
            // "selector": "svg.bi-text-indent-right"}, // indent icon
            // {"svg": ,
            // "selector": "svg.bi-text-indent-left"}, // outdent icon
            // ---------------------------------------------------------------------
            {"path": "m131.508 532.467c-58.005-58.013-58.016-151.92 0-209.943l225.011-225.04c44.643-44.645 117.279-44.645 161.92 0 44.743 44.749 44.753 117.186 0 161.944l-189.465 189.49c-31.41 31.413-82.518 31.412-113.926.001-31.479-31.482-31.49-82.453 0-113.944l160.462-160.484c4.687-4.687 12.286-4.687 16.972 0l16.967 16.971c4.685 4.686 4.685 12.283 0 16.969l-160.466 160.486c-12.724 12.724-12.73 33.328 0 46.058 12.696 12.697 33.356 12.699 46.054-.001l189.465-189.489c25.987-25.989 25.994-68.06.001-94.056-25.931-25.934-68.119-25.932-94.049 0l-225.01 225.039c-39.249 39.252-39.258 102.795-.001 142.057 39.285 39.29 102.885 39.287 142.162-.028a739446.174 739446.174 0 01195.892-196.007c4.686-4.687 12.282-4.684 16.969.004l16.967 16.971c4.685 4.686 4.689 12.279.004 16.965a755654.128 755654.128 0 00-195.881 195.996c-58.034 58.092-152.004 58.093-210.048.041z",
            "selector": "svg#mdi-paperclip"}, // paperclip icon
            {"path": "m480 256h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38c-66.5-6.49-115.21-66.27-115.21-133.08v-42.3c0-8.84-7.16-16-16-16h-16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69v34.15h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77c85.71-11.76 152-85.33 152-174.23v-48c0-8.84-7.16-16-16-16zm-160 160c53.02 0 96-42.98 96-96v-160c0-53.02-42.98-96-96-96s-96 42.98-96 96v160c0 53.02 42.98 96 96 96zm-48-256c0-26.47 21.53-48 48-48s48 21.53 48 48v160c0 26.47-21.53 48-48 48s-48-21.53-48-48v-160z",
            "selector": "svg.bi-mic"}, // record icon
            // {"svg": ' width="100%" height="100%" viewBox="0 0 448 512" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><path d="M128,32L32,32C14.445,32 -0,46.445 0,64L0,448C0,465.555 14.445,480 32,480L128,480C136.777,480 144,472.777 144,464L144,448C144,439.223 136.777,432 128,432L48,432L48,80L128,80C136.777,80 144,72.777 144,64L144,48C144,39.223 136.777,32 128,32ZM416,32L320,32C311.223,32 304,39.223 304,48L304,64C304,72.777 311.223,80 320,80L400,80L400,432L320,432C311.223,432 304,439.223 304,448L304,464C304,472.777 311.223,480 320,480L416,480C433.555,480 448,465.555 448,448L448,64C448,46.445 433.555,32 416,32Z" style="fill-rule:nonzero;"/><g transform="matrix(0.791667,0,0,0.791667,80,280.471)"><path d="M48,48C21.668,48 -0,69.668 0,96C0,122.332 21.668,144 48,144C74.332,144 96,122.332 96,96C96,69.668 74.332,48 48,48Z" style="fill-rule:nonzero;"/></g><g transform="matrix(0.791667,0,0,0.791667,292,280.471)"><path d="M48,48C21.668,48 -0,69.668 0,96C0,122.332 21.668,144 48,144C74.332,144 96,122.332 96,96C96,69.668 74.332,48 48,48Z" style="fill-rule:nonzero;"/></g><g transform="matrix(0.791667,0,0,0.791667,186,280.471)"><path d="M48,48C21.668,48 -0,69.668 0,96C0,122.332 21.668,144 48,144C74.332,144 96,122.332 96,96C96,69.668 74.332,48 48,48Z" style="fill-rule:nonzero;"/></g></svg>',
            // "selector": "svg.#mdi-contain"}, // cloze icon
            {"path": "m224 112c0-8.84-7.16-16-16-16h-48c-48.6 0-88 39.4-88 88v48h-56c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h56v144c0 22.09-17.91 40-40 40h-16c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h16c48.6 0 88-39.4 88-88v-144h56c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-48c0-22.09 17.91-40 40-40h48c8.84 0 16-7.16 16-16v-16zm93.43 60.92-12.8-9.63c-7.22-5.44-17.81-4.01-22.92 3.41-37.32 54.3-57.71 119.47-57.71 185.3 0 65.85 20.39 131.02 57.71 185.3 5.11 7.43 15.7 8.85 22.92 3.41l12.8-9.63c6.84-5.14 8.09-14.54 3.28-21.59-31.51-46.22-48.71-101.57-48.71-157.49 0-55.91 17.2-111.26 48.71-157.5 4.8-7.05 3.55-16.44-3.28-21.58zm264.86-6.22c-5.11-7.43-15.7-8.85-22.92-3.41l-12.8 9.63c-6.84 5.14-8.09 14.54-3.28 21.59 31.51 46.22 48.71 101.57 48.71 157.49 0 55.91-17.2 111.26-48.71 157.5-4.8 7.05-3.55 16.44 3.28 21.59l12.8 9.63c7.22 5.44 17.81 4.02 22.92-3.41 37.32-54.31 57.71-119.48 57.71-185.31 0-65.85-20.39-131.02-57.71-185.3zm-74.84 120.84-10.99-10.99c-6.07-6.07-15.91-6.07-21.98 0l-42.48 42.48-42.47-42.47c-6.07-6.07-15.91-6.07-21.98 0l-10.99 10.99c-6.07 6.07-6.07 15.91 0 21.98l42.47 42.47-42.47 42.47c-6.07 6.07-6.07 15.91 0 21.98l10.99 10.99c6.07 6.07 15.91 6.07 21.98 0l42.47-42.47 42.47 42.47c6.07 6.07 15.91 6.07 21.98 0l10.99-10.99c6.07-6.07 6.07-15.91 0-21.98l-42.47-42.47 42.47-42.47c6.08-6.07 6.08-15.92.01-21.99z",
            "selector": "svg#mdi-function-variant"}, //func icon
            {"path": "m266.8 575.7-38.8-11.3c-4.2-1.2-6.7-5.7-5.5-9.9l140.8-484.7c1.2-4.2 5.7-6.7 9.9-5.5l38.8 11.3c4.2 1.2 6.7 5.7 5.5 9.9l-140.8 484.7c-1.2 4.3-5.6 6.7-9.9 5.5zm-83.2-121.1 27.2-29c3.1-3.3 2.8-8.5-.5-11.5l-106.1-94.1 106.1-94.1c3.4-3 3.6-8.2.5-11.5l-27.2-29c-3-3.2-8.1-3.4-11.3-.4l-137.8 129.2c-3.4 3.2-3.4 8.5 0 11.7l137.8 129.1c3.2 3 8.2 2.8 11.3-.4zm284.1.4 137.7-129.1c3.4-3.2 3.4-8.5 0-11.7l-137.7-129.2c-3.2-3-8.3-2.9-11.3.4l-27.2 29c-3.1 3.3-2.8 8.5.5 11.5l106.1 94.1-106.1 94.1c-3.4 3-3.6 8.2-.5 11.5l27.2 29c3.1 3.2 8.1 3.4 11.3.4z",
            "selector": "svg#mdi-xml"}, // html icon
        ]

        for (let icon of icons) {
            // select existing svg parent elem innerHTML, then replace with new svg
            if ("path" in icon) {
                const svg = document.querySelector(icon.selector);
                addPathToSVG(svg, icon.path);
            } else {
                // do these ones by themselves outside the loop

                // document.querySelector(icon.selector).parentElement.innerHTML = svgTagStart + icon.svg;
            }
        }
        {
        const svg = document.querySelector("svg#mdi-format-color-text");
        const path = "m528 496h-33.32l-135-389.24a16 16 0 00-15.13-10.76h-49.1a16 16 0 00-15.12 10.76l-135.01 389.24h-33.32a16 16 0 00-16 16v16a16 16 0 0016 16h128a16 16 0 0016-16v-16a16 16 0 00-16-16h-35.44l33.31-96h164.26l33.31 96h-35.44a16 16 0 00-16 16v16a16 16 0 0016 16h128a16 16 0 0016-16v-16a16 16 0 00-16-16zm-273.47-144 65.47-188.69 65.47 188.69z";
        svg.classList.add("icn-dmns");
        svg.setAttribute("viewBox", "0 0 640 640");
        svg.firstElementChild.setAttribute("d", path);

        svg.setAttribute("id", "mdi-format-color-text mdi-color-helper");
        svg.firstElementChild.setAttribute("fill", "var(--color-helper-color)");

        // remove second svg which isn't needed
        svg.parentElement.lastElementChild.remove()
        }
        {
        const svg = document.querySelector("svg#mdi-format-color-highlight");
        const paths = `<g><path d="m48 544 99.92 32 35.45-35.45-67-67zm527.92-400.73-63.2-63.2a54.89 54.89 0 00-75.12-2.35l-199 170 169.72 169.74 170-199.06a54.88 54.88 0 00-2.4-75.13z" id="mdi-color-helper"/><path d="m123.94 435.84 50.93-50.94-13.05-42.83a36.6 36.6 0 0110.79-38.07l41.52-35.44 173.34 173.31-35.55 41.64a36.59 36.59 0 01-38.15 10.78l-42.77-13.08-50.86 50.86z"/></g>`;
        svg.classList.add("icn-dmns");
        svg.setAttribute("viewBox", "0 0 640 640");
        svg.innerHTML = paths;

        svg.setAttribute("id", "mdi-format-color-highlight mdi-color-helper");

        // remove second svg which isn't needed
        svg.parentElement.lastElementChild.remove()
        }
    }

    // -------------------------------ADD BUTTONS-------------------------------


    const codeIconPath = "m240 96h-88a56 56 0 00-56 56v77.49a40 40 0 01-11.72 28.29l-45.28 45.22a24 24 0 000 34l45.24 45.24a40 40 0 0111.76 28.28v77.48a56 56 0 0056 56h88a16 16 0 0016-16v-16a16 16 0 00-16-16h-88a8 8 0 01-8-8v-77.48a88.06 88.06 0 00-25.78-62.24l-28.29-28.28 28.29-28.28a88.06 88.06 0 0025.78-62.24v-77.48a8 8 0 018-8h88a16 16 0 0016-16v-16a16 16 0 00-16-16zm361 207-45.25-45.24a40.07 40.07 0 01-11.75-28.28v-77.48a56 56 0 00-56-56h-88a16 16 0 00-16 16v16a16 16 0 0016 16h88a8 8 0 018 8v77.48a88 88 0 0025.78 62.24l28.28 28.28-28.28 28.28a88 88 0 00-25.78 62.24v77.48a8 8 0 01-8 8h-88a16 16 0 00-16 16v16a16 16 0 0016 16h88a56 56 0 0056-56v-77.49a40 40 0 0111.72-28.29l45.28-45.22a24 24 0 000-34z";

    if (config["add editor button: code block"] == true) {
        // parent node button is added to
        // const node = document.querySelector("#blockFormatting > div > div.dynamically-slottable.svelte-8in7my")

        // clone paraDropdown to create codeDropdown
        const codeDropdown = document.querySelector('button[title="Center"]')
            .parentNode.parentNode.parentNode.parentNode.parentNode//.cloneNode(true); cloning removes event listeners. this causes text to deselect when button is pressed and cant find a way to stop it. so instead just replacing contents of existing button
        codeDropdown.setAttribute("id", "codeDropdown");
        // change icon
        const codeSVG = codeDropdown.querySelector("div > button > span > svg");
        addPathToSVG(codeSVG, codeIconPath);

        // change dropdown contents

        const btnTemplate = codeDropdown.querySelector("div.dropdown > div.btn-toolbar > div > div.btn-group > div")
                                        .cloneNode(true);
        const btnGroupSelector = "div.dropdown > div.btn-toolbar > div > div.btn-group"
        const codeDropdownBtnGroup = codeDropdown.querySelector(btnGroupSelector);
        // remove 1 set of btns bc dont need
        codeDropdownBtnGroup.nextElementSibling.remove();
        // remove contents of other set of btns
        codeDropdownBtnGroup.innerHTML = "";
        // change fron horizontal flex to block
        codeDropdownBtnGroup.setAttribute("style",
                            "flex-flow: column var(--buttons-wrap);");

        const codeLangs = config["code block button languages"];
        for (const item of codeLangs) {
            const { Name: codeLang, "PrismJS ID": prismID } = item;
            const codeLangElem = btnTemplate.cloneNode(true);
            const codeLangBtn = codeLangElem.querySelector("div > button");
            codeLangBtn.innerHTML = codeLang;
            codeLangBtn.setAttribute("title", "Lang: " + codeLang);
            codeLangBtn.setAttribute("onclick",
                `wrapSelectionInElems("pre", ["code", {"class": "lang-${prismID}"}]);`);
            codeLangBtn.setAttribute("style", "margin-top: 2px;"
                                            + "padding-left: 3px;"
                                            + "padding-right: 3px;");

            codeDropdownBtnGroup
                .appendChild(codeLangElem);
        }
        // codeDropdown.addEventListener("mousedown", event => event.preventDefault());
        // node.appendChild(codeDropdown);
    }

    // -----------------

    // INLINE BUTTONS
    
    const firstBtn = inlineTxtBtns.firstElementChild;

    // strikethough icon
    if (config["add editor button: strikethrough"] == true) {
        const hideIconPath = "m214.39 272h113.17l-46.31-23.16a45.65 45.65 0 010-81.68 67.93 67.93 0 0130.31-7.16h62.44a45.59 45.59 0 0136.49 18.25l15.09 20.13a16 16 0 0022.4 3.21l25.62-19.19a16 16 0 003.21-22.4l-15.11-20.16a109.44 109.44 0 00-87.6-43.84h-62.54a132.49 132.49 0 00-58.94 13.91c-40.35 20.17-64.19 62.31-60.18 108 1.76 20.09 10.02 38.37 21.95 54.09zm345.61 32h-480a16 16 0 00-16 16v16a16 16 0 0016 16h480a16 16 0 0016-16v-16a16 16 0 00-16-16zm-92.5 80h-91.07l14.32 7.16a45.65 45.65 0 010 81.68 67.93 67.93 0 01-30.31 7.16h-62.44a45.59 45.59 0 01-36.49-18.25l-15.09-20.13a16 16 0 00-22.4-3.21l-25.62 19.19a16 16 0 00-3.21 22.4l15.11 20.17a109.44 109.44 0 0087.6 43.83h62.54a132.42 132.42 0 0058.93-13.91c40.36-20.17 64.2-62.31 60.19-108-1.19-13.69-5.89-26.27-12.06-38.09z";
        const hideElem = firstBtn.cloneNode(true);
        const hideSVG = hideElem.querySelector("svg");
        addPathToSVG(hideSVG, hideIconPath);
        const hideBtn = hideElem.querySelector("button");
        hideBtn.setAttribute("title", "Strikethrough");
        hideBtn.setAttribute("onclick", "wrapSelectionInElems('s')");
        hideBtn.addEventListener("mousedown", event => event.preventDefault());
        inlineTxtBtns.appendChild(hideElem);
    }

    // inline code icon
    if (config["add editor button: inline code"] == true) {
        const codeElem = firstBtn.cloneNode(true);
        const codeSVG = codeElem.querySelector("svg");
        addPathToSVG(codeSVG, codeIconPath);
        const codeBtn = codeElem.querySelector("button")
        codeBtn.setAttribute("title", "Inline Code");
        codeBtn.setAttribute("onclick", "wrapSelectionInElems('code')");
        codeBtn.addEventListener("mousedown", event => event.preventDefault());
        inlineTxtBtns.appendChild(codeElem);
    }

    // -----------------

    // REMOVE BUTTONS

    const btnsToRemove = [
        {
            configID:"remove editor button: bold",
            btnTitle:"Bold text (⌘B)"
        },
        {
            configID:"remove editor button: italic",
            btnTitle:"Italic text (⌘I)"
        },
        {
            configID:"remove editor button: underline",
            btnTitle:"Underline text (⌘U)"
        },
        {
            configID:"remove editor button: superscript",
            btnTitle:"Superscript (⌘=)"
        },
        {
            configID:"remove editor button: subscript",
            btnTitle:"Subscript (⌘⇧=)"
        },
        {
            configID:"remove editor button: text color",
            btnTitle:"Change color (F8)"
        },
        {
            configID:"remove editor button: highlight",
            btnTitle:"Text highlight color"
        },
        {
            configID:"remove editor button: unordered list",
            btnTitle:"Unordered list (⌘,)"
        },
        {
            configID:"remove editor button: ordered list",
            btnTitle:"Ordered list (⌘.)"
        },
        // removing these 2 breaks the editor for some reason, so decided to 
        // swap all to turning invisible instead of removing
        {
            configID:"remove editor button: media file attachments",
            btnTitle:"Attach pictures/audio/video (F3)"
        },
        {
            configID:"remove editor button: audio recording",
            btnTitle:"Record audio (F5)"
        },
    ]
    for (const item of btnsToRemove) {
        if (config[item.configID] == true) {
            document.querySelector(`button[title="${item.btnTitle}"]`).parentNode
                .style.display = "none";
        }
    }
    // if (/*false &&*/ config.editorButtonPara == false) {
    //     const parent = document.querySelector("#blockFormatting > div > div.dynamically-slottable.svelte-8in7my")
    //     const paraDropdown = document.querySelector('button[title="Center"]').parentNode.parentNode.parentNode.parentNode.parentNode;
    //     paraDropdown.remove();
    //     if (parent.childElementCount == 0) {
    //         parent.remove()
    //     }
    // }
    if (config["remove editor button: latex equations"]) {
        document.querySelector("span.latex-button").parentNode
            .style.display = "none";
    }
}

async function main() {
    // block for 1 ms to allow other scripts to load so this script can access 
    // all their functions
    await new Promise(resolve => setTimeout(resolve, 1));
    // sending message to python to send back the config file
    pycmd("get_config", (returnedString) => {
        const config = JSON.parse(returnedString)

        changeTopButtons(config);

        if (config["modify editor appearance"]) {
            changeFields();

            // Select the node that will be observed for mutations
            const targetNode = document.querySelector('.fields');
            // now that im doing editor icons too (specifically the cloze icon), I need 
            // to check for updates in whole html body
            // const targetNode = document.body; // updating whole body causes continuous loop

            // Options for the observer (which mutations to observe)
            const obsConfig = { attributes: true, childList: true, subtree: true };

            // Callback function to execute when mutations are observed
            const callback = (mutationsList, observer) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        changeFields();
                    }
                }
            };

            // Create an observer instance linked to the callback function
            const observer = new MutationObserver(callback);

            // Start observing the target node for configured mutations
            observer.observe(targetNode, obsConfig);

            // Later, you can stop observing
            // observer.disconnect();
        } else {
            // REMOVE CSS

            // go through all links, and remove if href contains "css/all.css"
            const links = document.head.getElementsByTagName("link");
            for (let i = 0; i < links.length; i++) {
                if (links[i].href.includes("css/all.css")) {
                    links[i].remove();
                    break;
                }
            }
        }
    });
}

document.addEventListener('readystatechange', event => { 
    if (event.target.readyState === "complete") {
        main();
    }
});