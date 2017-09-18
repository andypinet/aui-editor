
    function htmlentities( string ) {
        return string.replace(/[&<>"]/g, function(tag) {
            var charsToReplace = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;'
            };
            return charsToReplace[tag] || tag;
        });
    };

    function goToNextLine(range, selection, options) {
        var editor = options.editor;        
        if (editor.children.length < 1) {
            // range.setStartAfter(editor);
            // range.setEndAfter(editor);
        } else {        
            var element = selection.anchorNode;
            var parents = [];
            while (element.parentNode && element.parentNode.className != 'wysiwyg-editor') {
                parents.push(element = element.parentNode);
            }   
            
            console.log('------------------------------------');
            console.dir(selection.anchorNode.parentNode);
            console.log('------------------------------------');

            if (parents.length > 0) {
                console.log('------------------------------------');
                console.log(parents);
                console.log('------------------------------------');

                range.setStartAfter(parents[parents.length - 1]);
                range.setEndAfter(parents[parents.length - 1]);
            } else {
                range.setStartAfter(editor.children[editor.children.length - 1]);
                range.setEndAfter(editor.children[editor.children.length - 1]);
            }        
        }
    }

    function createNewLine(range, selection, options) {
        var s = document.createElement("div");   
        s.className = "aui-row";          

    
        if (options && options.cloneNode) {
            var element = selection.anchorNode;
            var parents = [];
            while (element.parentNode && !element.parentNode.matches('div')) {
                parents.push(element = element.parentNode);
            }        
            var deep = parents.length;
            if (deep > 0) {
                var a = parents[parents.length - 1].cloneNode(true);            
                var c = a;
                for (var i = 0; i < deep - 1; i++) {
                    c = c.children[0];
                }
                c.textContent = "";
                s.appendChild(a);    
                range.insertNode(s);
                range.setStartBefore(c.childNodes[0]);
                range.setEndBefore(c.childNodes[0]);
                selection.removeAllRanges();
                selection.addRange(range);  
            } else {
                if (document.documentMode == 11) {
                    // if (!selection.anchorNode.nodeValue) {
                    //     s.appendChild(document.createElement("br"));     
                    // } else {
                    //     s.appendChild(document.createComment("<br>"));                           
                    // }
                    s.appendChild(document.createComment("<br>"));
                    s.appendChild(document.createTextNode("\uFEFF"))            
                } else {
                    s.appendChild(document.createComment("<br>"));                       
                }

    
                range.insertNode(s);
                range.setStartBefore(s.childNodes[0]);
                range.setEndBefore(s.childNodes[0]);
                selection.removeAllRanges();
                selection.addRange(range);  
            }
        } else {
            if (document.documentMode == 11) {
                console.log('------------------------------------');
                console.log("append empty node");
                console.log('------------------------------------');
                s.appendChild(document.createComment("<br>"));     
                s.appendChild(document.createTextNode("\uFEFF"))            
                range.insertNode(s);
                range.setStartBefore(s.childNodes[0]);
                range.setEndBefore(s.childNodes[0]);
                selection.removeAllRanges();
                selection.addRange(range);  
            } else {
                s.appendChild(document.createComment("<br>"));   
                range.insertNode(s);
                range.setStartBefore(s.childNodes[0]);
                range.setEndBefore(s.childNodes[0]);
                selection.removeAllRanges();
                selection.addRange(range);  
            }
        }
        
         
    }

    function initGogogo(e, dom, options) {
        var editor = options.editor;

        // handle "Enter" keypress
        if (e.which == 13) {
            if (document.documentMode) {                                                  
                if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = selection.getRangeAt(0);                                

                    var textNodeParent = document.getSelection().anchorNode.parentNode;
                    var inDiv = textNodeParent.nodeName == "DIV" && textNodeParent.className != "wysiwyg-editor";
                    
                    // console.log('------------------------------------');
                    // console.log(textNodeParent.nodeName.toLowerCase());
                    // console.log('------------------------------------');

                    if (selection.anchorNode.nodeName.toLowerCase() == "#text" &&
                    textNodeParent.nodeName.toLowerCase() == "li" &&
                    !selection.anchorNode.nodeValue) {
                        console.log('------------------------------------');
                        console.log("in li");
                        console.log('------------------------------------');       
                        // fix ie bug 
                        range.setStartAfter(textNodeParent.parentNode);
                        range.setEndAfter(textNodeParent.parentNode);
                        textNodeParent.parentNode.removeChild(selection.anchorNode.parentNode)
                        if (textNodeParent.parentNode.children.length < 1) {
                            // textNodeParent.parentNode.parentNode.removeChild(textNodeParent);
                        }
                        createNewLine(range, selection)      
                        return false;                                        
                    }

                    if (textNodeParent.nodeName.toLowerCase() != "li" &&
                        textNodeParent.nodeName.toLowerCase() != "ol" && 
                        textNodeParent.nodeName.toLowerCase() != "ul") {     
    
                        if (selection.anchorNode.nodeValue) {                                                                                                           
                            if (selection.anchorNode.nodeName == "#text") {

                                console.log('------------------------------------');
                                console.dir(selection.anchorNode.parentNode);
                                console.log('------------------------------------');

                                if (selection.anchorNode.parentNode.nodeName.toLowerCase() == "div" && selection.anchorNode.parentNode.className != "aui-row") {                                   
                                    range.setStartAfter(selection.anchorNode.parentNode.childNodes[selection.anchorNode.parentNode.childNodes.length - 1]);
                                    range.setEndAfter(selection.anchorNode.parentNode.childNodes[selection.anchorNode.parentNode.childNodes.length - 1]);
                                    createNewLine(range, selection, { cloneNode: false })   
                                } else {
                                    goToNextLine(range, selection, { editor: editor });
                                    createNewLine(range, selection, { cloneNode: true })                                                                                
                                }

                                    
                            }
                        } else {  
                            
                            console.log('------------------------------------');
                            console.log("enter is empty");
                            console.log('------------------------------------');
                            

                            if (selection.anchorNode.children.length > 0) {
                                // 最后一个是图片时
                 
                                if (selection.anchorNode.parentNode.nodeName.toLowerCase() == "div" && selection.anchorNode.parentNode.className != "wysiwyg-wrapper") {
                                    console.log('------------------------------------');
                                    console.log("sds");
                                    console.log('------------------------------------');
                                    range.setStartAfter(selection.anchorNode.parentNode.children[selection.anchorNode.parentNode.children.length - 1]);
                                    range.setEndAfter(selection.anchorNode.parentNode.children[selection.anchorNode.parentNode.children.length - 1]);
                                } else {
                                    range.setStartAfter(selection.anchorNode.children[selection.anchorNode.children.length - 1]);
                                    range.setEndAfter(selection.anchorNode.children[selection.anchorNode.children.length - 1]);
                                }

                               
                                createNewLine(range, selection, { cloneNode: false })   
                                return false;
                            } else {
                                // selection anchorNode empty
                                if (selection.anchorNode.nodeName.toLowerCase() == "p") {
                                    
                                } else {                                
                                    if (textNodeParent.nodeName == "DIV" && textNodeParent.className == "wysiwyg-wrapper") {


                                    } else if (textNodeParent.nodeName == "DIV" && textNodeParent.className == "wysiwyg-editor") {
                                        console.log('------------------------------------');
                                        console.log("in editor");
                                        console.log('------------------------------------');
                                        goToNextLine(range, selection, { editor: editor });

                                        createNewLine(range, selection, { cloneNode: false })   
                                        return false;
                                    } else {
                                        if (textNodeParent.nodeName == "DIV") {
                                            console.log('------------------------------------');
                                            console.log("in row");
                                            console.log('------------------------------------');                                        
                                            goToNextLine(range, selection, { editor: editor });
                                        }                                   
                                    }

                                    
                                    createNewLine(range, selection, { cloneNode: false })   
                                    
                                    // 第一行为空时 要再加一行
                                    if (textNodeParent.nodeName == "DIV" && textNodeParent.className == "wysiwyg-wrapper") {
                                        console.log('------------------------------------');
                                        console.log("append row");
                                        console.log('------------------------------------');

                                        goToNextLine(range, selection, { editor: editor });
                                        createNewLine(range, selection, { cloneNode: false });                                
                                    }                               
                                }
                            }

                        
                        }
                        return false;
                    }
                    
                    if (textNodeParent.nodeName.toLowerCase() != "li" ) {
                        console.log('------------------------------------');
                        console.log("out of li");
                        console.log('------------------------------------');

                        range.setStartAfter(textNodeParent);
                        range.setEndAfter(textNodeParent);
                        textNodeParent.removeChild(selection.anchorNode)
                        if (textNodeParent.children.length < 1) {
                            textNodeParent.parentNode.removeChild(textNodeParent);
                        }
                        createNewLine(range, selection)                      
                        return false;
                    }        
                                    


                }
            }
        } else {
            if (document.documentMode) {                                                  
                if (window.getSelection) {
                    var selection = window.getSelection();                    
                    if (document.documentMode == 11) {
                        if (selection.anchorNode.textContent.indexOf("\uFEFF") > -1) {
                            // selection.anchorNode.textContent = selection.anchorNode.textContent.replace(/[\u200B-\u200D\uFEFF]/g, "");
                            // selection.anchorNode.textContent = selection.anchorNode.textContent.replace("<!--<br>-->", "");
                        }
                    }
                }
            }
        }      
    }

    // Create the Editor
    var create_editor = function( textarea, classes, placeholder, toolbar_position, toolbar_buttons, toolbar_submit, label_selectImage,
                                  placeholder_url, placeholder_embed, max_imagesize, filter_imageType, on_imageupload, force_imageupload, video_from_url,
                                  on_keydown, on_keypress, on_keyup, on_autocomplete ) {

        // Transform the textarea to contenteditable
        var hotkeys = {},
            autocomplete = null;
        var create_wysiwyg = function( textarea, editor, container, placeholder ) {
            var wysiwygeditor = {};
            var handle_autocomplete = function( keypress, key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                if( ! on_autocomplete )
                    return ;
                var typed = autocomplete || '';

                switch( key ) {
                    case  8: // backspace
                        typed = typed.substring( 0, typed.length - 1 );
                        // fall through
                    case 13: // enter      
                    case 27: // escape
                    case 33: // pageUp
                    case 34: // pageDown
                    case 35: // end
                    case 36: // home
                    case 37: // left
                    case 38: // up
                    case 39: // right
                    case 40: // down
                        if( keypress )
                            return ;
                        character = false;
                        break;
                    default:
                        if( ! keypress )
                            return ;
                        typed += character;
                        break;
                }
                var rc = on_autocomplete( typed, key, character, shiftKey, altKey, ctrlKey, metaKey );
                if( typeof(rc) == 'object' && rc.length ) {
                    // Show autocomplete
                    autocomplete = typed;
                }
                else {
                    // Hide autocomplete
                    autocomplete = null;
                    return rc; // swallow key if 'false'
                }
            };

            var innerEdior = {};

            // Options to wysiwyg.js
            var option = {
                element: textarea,
                contenteditable: editor ? editor : null,
                onKeyDown: function( key, character, shiftKey, altKey, ctrlKey, metaKey, e) {
                    
                        switch( key ) {
                            case  8: // backspace                                
                            case 13: // enter     
                                // e.preventDefault();
                                // document.execCommand('insertHTML', false, '<br><br>');
                            case 16: // shift
                            case 18: // option
                            case 27: // escape
                            case 33: // pageUp
                            case 34: // pageDown
                            case 35: // end
                            case 36: // home
                            case 37: // left
                            case 38: // up
                            case 39: // right
                            case 40: // down
                            case 91: // control                            
                                break;

                            default:
                                // placeholder.style.display = "none";                                                                
                        }                                       
                  
                        // Ask master
                        if( on_keydown && on_keydown(key, character, shiftKey, altKey, ctrlKey, metaKey) === false )
                            return false; // swallow key
                        // Exec hotkey (onkeydown because e.g. CTRL+B would oben the bookmarks)
                        if( character && !shiftKey && !altKey && ctrlKey && !metaKey )
                        {
                            var hotkey = character.toLowerCase();
                            if( ! hotkeys[hotkey] )
                                return ;
                            hotkeys[hotkey]();
                            return false; // prevent default
                        }
                        // Handle autocomplete
                        return handle_autocomplete( false, key, character, shiftKey, altKey, ctrlKey, metaKey );
                    },
                onKeyPress: function( key, character, shiftKey, altKey, ctrlKey, metaKey, e ) {
                        // return initGogogo(e, dom, { editor: innerEdior });
                        // Ask master
                        if( on_keypress && on_keypress(key, character, shiftKey, altKey, ctrlKey, metaKey) === false )
                            return false; // swallow key
                        // Handle autocomplete
                        return handle_autocomplete( true, key, character, shiftKey, altKey, ctrlKey, metaKey );
                    },
                onKeyUp: function( key, character, shiftKey, altKey, ctrlKey, metaKey, e ) {
                        // Ask master
                        if( on_keyup && on_keyup(key, character, shiftKey, altKey, ctrlKey, metaKey) === false )
                            return false; // swallow key
                    },
                onSelection: function( collapsed, rect, nodes, rightclick ) {
 
                    },
                onOpenpopup: function() {
                        // add_class_active();
                    },
                onClosepopup: function() {
                        autocomplete = null;
                        // remove_class_active();
                    },
                hijackContextmenu: (toolbar_position == 'selection'),
                readOnly: !!textarea.getAttribute( 'readonly' )
            };
            if( placeholder ) {
                option.onPlaceholder = function( visible ) {
                    if( visible )
                        placeholder.style.display = "block";
                    else
                        placeholder.style.display = "none";
                };
            }

            wysiwygeditor = wysiwyg( option );

            setTimeout(function() {
                innerEdior = container.AuifindSelectorFromChildren(".wysiwyg-editor");
            }, 0);

            return wysiwygeditor;
        };

        var dom = {};
        dom.container = textarea.closest('.wysiwyg-container');
        
        if( dom.container == null ) {
            dom.container = document.createElement('div')
            dom.container.classList.add('wysiwyg-container');
            if( classes ) {
                dom.container.classList.add( classes );
            }
            textarea.before(dom.container);
            dom.container.append(textarea);        
        }

        dom.wrapper = textarea.closest('.wysiwyg-wrapper');            
        if( placeholder && dom.wrapper == null ) {
            dom.wrapper = document.createElement('div')
            dom.wrapper.classList.add('wysiwyg-wrapper');
            textarea.before(dom.wrapper);
            dom.wrapper.append(textarea);             
        }

        if( dom.wrapper ) {
            dom.placeholder = dom.wrapper.AuifindSelectorAllFromChildren( '.wysiwyg-placeholder' );
        }            
        if( placeholder && (! dom.placeholder || dom.placeholder.length == 0) )
        {
            dom.placeholder = document.createElement('div')
            dom.placeholder.classList.add( 'wysiwyg-placeholder' )
            dom.placeholder.textContent = placeholder;
            dom.placeholder.style.display = "none";
            dom.wrapper.prepend(dom.placeholder);
        }

        dom.editor = dom.wrapper.AuifindSelectorAllFromChildren( '.wysiwyg-editor' );

        if( dom.editor.length == 0 ) {
            dom.editor = null;
        }
            
        var wysiwygeditor = create_wysiwyg( textarea, dom.editor, dom.container, dom.placeholder );
        
        if( wysiwygeditor.legacy ) {
            if( dom.editor ) {
                dom.editor.style.display = "none";
            }
            if( dom.placeholder )
                dom.placeholder.style.display = "none";
            var wysiwygeditortextarea = wysiwygeditor.getElement();
            wysiwygeditortextarea.style.display = "block";
            wysiwygeditortextarea.classList.add( 'wysiwyg-textarea' );
            if( wysiwygeditortextarea.AuiIsVisible() ) // inside the DOM
                textarea.style.width = parseInt(getComputedStyle(dom.container).width) - (dom.textarea.offsetWidth - parseInt(getComputedStyle(dom.textarea).width)  );
        }
        else {
            if( ! dom.editor )
                wysiwygeditor.getElement().classList.add( 'wysiwyg-editor' );

            // Clicking the placeholder -> focus editor - fixes IE6-IE8
            if (window.$) {
                $(dom.wrapper).click(function(){
                    wysiwygeditor.getElement().focus();
                });
            }

            dom.editor = dom.wrapper.AuifindSelectorFromChildren( '.wysiwyg-editor' )
        }

        // Export userdata
        return {
            shell: wysiwygeditor,
            dom: dom
        };
    };

    createWysiwyg = function( element, option = {} ) {
        if( ! option || typeof(option) === 'object' ) {
            option = Object.assign( {}, option );
            
            var self = element;
            // Already an editor
            if( self.dataset.wysiwygjs )
                return ;

            // Two modes: toolbar on top and on bottom
            var classes = option['class'],
                placeholder = option.placeholder || self.getAttribute('placeholder'),
                toolbar_position = option.toolbar || 'top',
                toolbar_buttons = option.buttons || {},
                toolbar_submit = option.submit,
                label_selectImage = option.selectImage,
                placeholder_url = option.placeholderUrl || null,
                placeholder_embed = option.placeholderEmbed || null,
                max_imagesize = option.maxImageSize || null,
                filter_imageType = option.filterImageType || '^image/',
                on_imageupload = option.onImageUpload || null,
                force_imageupload = option.forceImageUpload && on_imageupload,
                video_from_url = option.videoFromUrl || null,
                on_keydown = option.onKeyDown || null,
                on_keypress = option.onKeyPress || null,
                on_keyup = option.onKeyUp || null,
                on_autocomplete = option.onAutocomplete || null;

            // Create the WYSIWYG Editor
            var data = create_editor( self, classes, placeholder, toolbar_position, toolbar_buttons, toolbar_submit, label_selectImage,
                                        placeholder_url, placeholder_embed, max_imagesize, filter_imageType, on_imageupload, force_imageupload, video_from_url,
                                        on_keydown, on_keypress, on_keyup, on_autocomplete );
            self.dataset.wysiwygjs = data;
            
        }
        return data;
    };


