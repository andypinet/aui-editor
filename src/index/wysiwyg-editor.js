
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

    function previousNode(node) {
        var previous = node.previousSibling;
        if (previous) {
            node = previous;
            while (node && node.hasChildNodes && node.hasChildNodes()) {
                node = node.lastChild;
            }
            return node;
        }
        var parent = node.parentNode;
        if (parent && parent.nodeType && parent.hasChildNodes && parent.hasChildNodes()) {
            return parent;
        }
        return null;
    }

    function CssFnctn(editor) {
        document.execCommand('formatblock', false, 'p')

        var sel = window.getSelection();
        if (sel.rangeCount > 0) {
            var range = sel.getRangeAt(0);
            var node = range.startContainer;
            if (node.hasChildNodes() && range.startOffset > 0) {
                node = node.childNodes[range.startOffset - 1];
            }
        
            // Walk backwards through the DOM until we find an image
            while (node) {
                if (node.nodeType == 1 && node.tagName.toLowerCase()  == "p") {
                    console.log(node);
                    node.className = "aui-editor__row";
                    break;
                }
                node = previousNode(node);
            }
        }

        // var row = window.getSelection().focusNode.parentNode;
        // if (row.className && row.className.indexOf("wysiwyg-editor") > -1) {
        //     // setTimeout(function() {
        //     //     row.children[0].className = "aui-editor__row";
        //     // }, 0)
        //     // if (row.children && row.children[0] && row.children[0].className.indexOf("aui-editor__row") < 0) {
        //     //     console.log(row);
        //     //     row.children[0].className = "aui-editor__row";
        //     // }
        //     console.log('------------------------------------');
        //     console.log(window.getSelection().focusNode);
        //     console.log('------------------------------------');
        //     // window.getSelection().focusNode.className = "aui-editor__row"
        // } else {        
        //     row.className = "aui-editor__row";
        // }     
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

            // Options to wysiwyg.js
            var option = {
                element: textarea,
                contenteditable: editor ? editor : null,
                onKeyDown: function( key, character, shiftKey, altKey, ctrlKey, metaKey, e) {
                    
                        switch( key ) {
                            case  8: // backspace                                
                            case 13: // enter
                                CssFnctn(editor);
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

                        if (document.activeElement && document.activeElement.className.indexOf("wysiwyg-editor") > -1) {
                            var firstChildRow = document.activeElement.children[0];
                            if (firstChildRow && firstChildRow.className.indexOf("aui-editor__row") < 0) {
                              firstChildRow.className = "aui-editor__row";
                            }
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
                onKeyPress: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                        // Ask master
                        if( on_keypress && on_keypress(key, character, shiftKey, altKey, ctrlKey, metaKey) === false )
                            return false; // swallow key
                        // Handle autocomplete
                        return handle_autocomplete( true, key, character, shiftKey, altKey, ctrlKey, metaKey );
                    },
                onKeyUp: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
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


