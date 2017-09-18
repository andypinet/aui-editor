import "../assets/css/index/index.css"
import "./wysiwyg.js"
import "./wysiwyg-editor.js"

var iconbuttons = {};
iconbuttons.emoji = `
<button type="button" class="aui-button" editor-action="emoji">
<svg t="1505636244032" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2430" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs><style type="text/css"></style></defs><path d="M510.944 960c-247.04 0-448-200.96-448-448s200.992-448 448-448 448 200.96 448 448-200.96 448-448 448z m0-832c-211.744 0-384 172.256-384 384s172.256 384 384 384 384-172.256 384-384-172.256-384-384-384z" p-id="2431"></path><path d="M512 773.344c-89.184 0-171.904-40.32-226.912-110.624-10.88-13.92-8.448-34.016 5.472-44.896 13.888-10.912 34.016-8.48 44.928 5.472 42.784 54.688 107.136 86.048 176.512 86.048 70.112 0 134.88-31.904 177.664-87.552 10.784-14.016 30.848-16.672 44.864-5.888 14.016 10.784 16.672 30.88 5.888 44.864C685.408 732.32 602.144 773.344 512 773.344zM368 515.2c-26.528 0-48-21.472-48-48v-64c0-26.528 21.472-48 48-48s48 21.472 48 48v64c0 26.496-21.504 48-48 48zM656 515.2c-26.496 0-48-21.472-48-48v-64c0-26.528 21.504-48 48-48s48 21.472 48 48v64c0 26.496-21.504 48-48 48z" p-id="2432"></path></svg>
</button>
`;

iconbuttons.bold = `
<button type="button" class="aui-button" editor-action="bold">
    <svg viewBox="0 0 11 15" class="aui-icon aui-icon--bold" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M2 12.025V8h4.418c1.19 0 2.415.562 2.415 2.012s-1.608 2.013-2.9 2.013H2zM2 2h4.336c1 0 1.814.888 1.814 2 0 .89-.814 2-1.814 2H2V2zm8.192 1.9c0-2.146-1.744-3.89-3.888-3.89 0 0-3.97-.01-5.137-.01C0 0 0 1.167 0 1.167v11.666C0 14 1.167 14 1.167 14l5.572.01c2.33 0 4.23-1.86 4.23-4.148 0-1.388-.7-2.618-1.77-3.372.614-.688.99-1.596.99-2.59z" fill-rule="evenodd"></path></g></svg>    
</button>
`;

iconbuttons.italic = `
<button type="button" class="aui-button" editor-action="italic">
    <svg viewBox="0 0 10 14" class="aui-icon aui-icon--italic" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M8.75 0h-5.5c-.412 0-.75.336-.75.75 0 .417.336.75.75.75H5l-2 11H1.25c-.412 0-.75.336-.75.75 0 .417.336.75.75.75h5.5c.412 0 .75-.336.75-.75 0-.417-.335-.75-.75-.75H5l2-11h1.75c.412 0 .75-.336.75-.75C9.5.333 9.165 0 8.75 0" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.header = `
<button type="button" class="aui-button">
    <svg viewBox="0 0 10 14" class="aui-icon aui-icon--header" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M0 1.007C0 .45.444 0 1 0c.552 0 1 .45 1 1.007v11.986C2 13.55 1.556 14 1 14c-.552 0-1-.45-1-1.007V1.007zm8 0C8 .45 8.444 0 9 0c.552 0 1 .45 1 1.007v11.986C10 13.55 9.556 14 9 14c-.552 0-1-.45-1-1.007V1.007zM2 6h6v2H2V6z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.blockquote = `
<button type="button" class="aui-button">
    <svg viewBox="0 0 14 11" class="aui-icon aui-icon--blockquote" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M12.975 5.21c-.503-.454-1.096-.668-1.78-.643l-.25.03h-.19c-.315.013-.49-.078-.526-.274-.04-.206.1-.566.43-1.08.34-.527.94-1.126 1.79-1.797.35-.276.5-.568.45-.877-.04-.2-.13-.35-.29-.46-.16-.11-.34-.14-.55-.11-.516.09-1.17.512-1.97 1.27-.947.89-1.647 1.89-2.1 3.006-.45 1.12-.59 2.168-.42 3.148.08.463.25.91.504 1.336.257.43.56.78.916 1.046.748.58 1.558.79 2.433.64.912-.166 1.602-.61 2.07-1.34.19-.3.322-.64.4-1.02.074-.38.08-.748.02-1.098-.13-.74-.45-1.34-.95-1.79zm-7.51 0c-.503-.454-1.096-.668-1.782-.643l-.248.03h-.19c-.316.013-.492-.078-.526-.274-.04-.206.1-.566.43-1.08.34-.527.94-1.126 1.79-1.797.35-.276.5-.568.45-.877-.03-.2-.13-.35-.28-.46C4.95 0 4.77-.03 4.56 0c-.514.09-1.17.516-1.97 1.273C1.65 2.17.95 3.17.492 4.29.04 5.41-.1 6.458.07 7.438c.083.462.252.91.507 1.335.256.43.56.78.916 1.046.748.58 1.558.79 2.433.63.914-.16 1.604-.61 2.07-1.34.19-.3.323-.64.4-1.02.076-.38.082-.75.02-1.1-.13-.74-.447-1.337-.95-1.79z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.code = `
<button type="button" class="aui-button">
    <svg viewBox="0 0 16 14" class="aui-icon aui-icon--code" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M15.718 6.56l-1.03-.954-2.476-2.29c-.356-.36-.978-.36-1.337 0-.367.372-.367.976.008 1.353l2.804 2.564-2.813 2.576c-.366.37-.365.976 0 1.346.18.18.417.28.67.28.252 0 .49-.1.66-.275l1.32-1.22 2.2-2.03c.368-.37.368-.974-.006-1.35zM8.256.99c.097-.548.612-.915 1.16-.818.544.096.907.616.81 1.165L8.144 13.142c-.096.548-.612.915-1.16.818-.543-.095-.906-.616-.81-1.164L8.257.992zM5.123 3.316c-.355-.36-.986-.355-1.33-.006l-.686.634-2.833 2.62c-.367.37-.367.975.007 1.352L1.697 9.22l2.093 1.936c.18.18.415.28.67.28.25 0 .487-.1.666-.28.366-.37.367-.973-.006-1.35l-2.81-2.57L5.124 4.66c.367-.37.367-.973 0-1.344z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.insertOrderedList = `
<button type="button" class="aui-button" editor-action="insertOrderedList">
    <svg viewBox="0 0 14 14" class="aui-icon aui-icon--insertOrderedList" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M4 1.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01c-.55 0-.995-.444-.995-1zM.884 2.893h.803V0H.403l-.16.804h.642v2.09zm.898 3.83c.362-.362.468-.57.468-.878 0-.488-.482-.945-1.125-.945S0 5.33 0 5.974h.707c0-.225.13-.43.418-.43.26 0 .4.165.396.367 0 .14-.09.26-.46.57L0 7.37v.48h2.25v-.73h-.86l.392-.396zM4 6.5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01c-.55 0-.995-.444-.995-1zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01c-.55 0-.995-.444-.995-1zm-1.76.624c0 .14-.024.27-.075.388-.05.12-.123.222-.217.31-.093.086-.205.154-.336.204-.13.05-.275.074-.437.074-.166 0-.32-.027-.462-.08-.142-.053-.265-.126-.367-.217-.103-.09-.185-.197-.246-.318-.062-.12-.095-.248-.1-.38v-.055h.765v.054c0 .1.033.183.1.25.066.068.155.102.267.102.117 0 .207-.03.27-.09.062-.06.093-.152.093-.277 0-.12-.04-.21-.117-.27-.078-.06-.185-.09-.32-.09h-.14v-.52h.144c.117 0 .205-.03.264-.09.058-.06.087-.14.087-.23 0-.087-.03-.157-.087-.21-.06-.05-.136-.08-.233-.08-.107 0-.185.03-.236.08-.05.053-.076.12-.076.2v.053H.09v-.055c.018-.267.116-.48.295-.643.18-.16.437-.24.776-.24.14 0 .27.02.39.062s.23.1.31.174c.09.074.16.16.21.26.05.1.08.208.08.32 0 .258-.116.46-.35.605v.005c.074.03.138.068.194.12.056.05.103.106.14.167.04.06.067.126.087.196.02.07.03.14.03.207z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.insertUnorderedList = `
<button type="button" class="aui-button" editor-action="insertUnorderedList">
    <svg viewBox="0 0 14 13" class="aui-icon aui-icon--insertUnorderedList" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M4 1c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 2 4 1.556 4 1zM1 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 7 4 6.556 4 6zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 12 4 11.556 4 11z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.editable_link = `
<button type="button" class="aui-button">
    <svg viewBox="0 0 14 13" class="aui-icon aui-icon--editable_link" width="14" height="14" aria-hidden="true" style="height: 14px; width: 14px;"><title></title><g><path d="M4 1c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 2 4 1.556 4 1zM1 2c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm0 5c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1zm3-6c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 7 4 6.556 4 6zm0 5c0-.552.456-1 .995-1h8.01c.55 0 .995.444.995 1 0 .552-.456 1-.995 1h-8.01C4.445 12 4 11.556 4 11z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.editable_image = `
<button type="button" class="aui-button">
    <svg width="16" height="14" viewBox="0 0 18 15" class="aui-icon aui-icon--editable/image" aria-hidden="true" style="height: 14px; width: 16px;"><title></title><g><path fill-rule="evenodd" d="M18 13.333C18 14.25 17.1 15 16 15H2c-1.1 0-2-.75-2-1.667V1.667C0 .75.9 0 2 0h14c1.1 0 2 .75 2 1.667v11.666zM8.563 8.525c-.042.074-.102.136-.174.18-.24.143-.548.07-.69-.167L6.44 6.473c-.043-.072-.105-.132-.178-.174-.24-.14-.545-.058-.682.182L3.427 10.25c-.043.076-.065.16-.065.25 0 .275.223.5.5.5h10.292c.084 0 .167-.02.24-.063.243-.133.33-.437.198-.68l-3.02-5.477c-.043-.08-.11-.146-.19-.192-.24-.137-.544-.053-.68.187l-2.14 3.75z"></path></g></svg>
</button>
`;

iconbuttons.video = `
<button type="button" class="aui-button">
    <svg viewBox="0 0 18 14" class="aui-icon aui-icon--video" width="16" height="14" aria-hidden="true" style="height: 14px; width: 16px;"><title></title><g><path d="M7.546 10c-.466.273-.86.053-.86-.5V4.505c0-.565.385-.778.86-.5L11.824 6.5c.466.273.475.727 0 1.004L7.546 10zM2 0S0 0 0 2v10s0 2 2.002 2H16c2 0 2-2 2-2V2c0-2-2-2-2-2H2z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.formula = `
<button type="button" class="aui-button">
    <svg width="16" height="14" viewBox="0 0 10 10" class="aui-icon aui-icon--formula" aria-hidden="true" style="height: 14px; width: 16px;"><title></title><g><path d="M10 4V0H0l4.5 5L0 10h10V6c0 3.25-4 3-4 3H3.5L7 5 3.5 1H6s4-.312 4 3z" fill-rule="evenodd"></path></g></svg>
</button>
`;

iconbuttons.editable_divider = `
<button type="button" class="aui-button">
    <svg viewBox="0 0 16 12" class="aui-icon aui-icon--editable/divider" width="16" height="14" aria-hidden="true" style="height: 14px; width: 16px;"><title></title><g><path d="M0 1c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H1c-.55 0-1-.444-1-1zm0 5c0-.552.443-1 1.01-1h1.98C3.55 5 4 5.444 4 6c0 .552-.443 1-1.01 1H1.01C.45 7 0 6.556 0 6zm6 0c0-.552.443-1 1.01-1h1.98C9.55 5 10 5.444 10 6c0 .552-.443 1-1.01 1H7.01C6.45 7 6 6.556 6 6zm6 0c0-.552.443-1 1.01-1h1.98c.56 0 1.01.444 1.01 1 0 .552-.443 1-1.01 1h-1.98C12.45 7 12 6.556 12 6zM0 11c0-.552.445-1 1-1h14c.552 0 1 .444 1 1 0 .552-.445 1-1 1H1c-.552 0-1-.444-1-1z" fill-rule="evenodd"></path></g></svg>
</button>
`;


iconbuttons.strikethrough = `
<button type="button" class="aui-button" editor-action="strikethrough">
    <svg viewBox="0 0 1024 1024" class="aui-icon aui-icon--strikethrough" width="18" height="18"><defs><style type="text/css"></style></defs><path d="M108.912014 480.419747l812.044634 0 0 63.160505-812.044634 0 0-63.160505Z" p-id="2709"></path><path d="M623.794667 586.232678c1.992377 0.960885 3.835352 1.89721 5.514597 2.797719 20.8734 11.234879 36.491099 25.64303 46.837748 43.214221 10.348696 17.572214 15.523555 38.132482 15.523555 61.679781 0 40.219004-14.256702 72.9208-42.754756 98.103342-28.508287 25.182542-68.540026 37.766139-120.092146 37.766139-35.945677 0-68.266803-7.437389-96.945983-22.328541-28.688389-14.886035-50.746778-34.586726-66.174142-59.093886-15.436574-24.509207-25.325805-58.730613-29.683043-102.664218l-81.69565 8.714476c1.811252 83.149768 26.77276 149.050688 74.888618 197.703781 48.105624 48.659233 112.645546 72.982198 193.617719 72.982198 51.918463 0 96.306416-9.79304 133.165906-29.378098 36.84721-19.589151 65.98483-48.149627 87.414909-85.687568 21.417799-37.536918 32.131815-79.156828 32.131815-124.859729 0-37.188994-6.67912-70.158896-19.966751-98.950639L623.794667 586.231655z" p-id="2710"></path><path d="M314.341756 437.768345l198.312648 0c-62.752206-17.674545-103.296621-35.153638-121.617895-52.420907-18.892279-17.788132-28.328185-42.832528-28.328185-75.152631 0-34.849716 12.884448-63.252603 38.669718-85.218894 25.775037-21.966291 63.177901-32.95046 112.196315-32.95046 48.285726 0 85.779665 12.526291 112.467491 37.579897 26.687826 25.052582 42.209334 63.542198 46.566572 115.463732l83.32987-7.625678c-1.457188-48.653093-12.254092-90.954525-32.406061-126.900202-20.151969-35.9467-48.472991-63.535035-84.962044-82.785471-36.491099-19.243273-79.068823-28.866445-127.717823-28.866445-70.804602 0-127.089513 20.515243-168.839383 61.545728-41.760103 41.035602-62.634526 93.863784-62.634526 158.489664 0 35.945677 7.258311 68.171636 21.786189 96.67276C305.118698 423.36531 309.518914 430.748465 314.341756 437.768345z" p-id="2711"></path></svg>
</button>
`;

iconbuttons.removeFormat = `
<button type="button" class="aui-button" editor-action="removeFormat">
    <svg width="16" height="14" viewBox="0 0 15 14" class="aui-icon aui-icon--removeFormat" aria-hidden="true" style="height: 14px; width: 16px;"><title></title><g><path fill-rule="evenodd" d="M4.864 7.83l1.64 1.642-1.17 2.874c-.262.644-.89 1.062-1.585 1.055-.1 0-.2-.02-.29-.054-.4-.163-.59-.62-.43-1.02L4.864 7.83zM6.5 3.81L7.24 2H4.69l-2-2h10.672c.552 0 1 .448 1 1s-.448 1-1 1H9.55L8.142 5.452 6.5 3.812zM.294 1.846c.39-.39 1.024-.39 1.414 0L11.753 11.89c.39.392.39 1.025 0 1.415-.39.39-1.024.39-1.414 0L.29 3.26c-.39-.39-.39-1.024 0-1.415z"></path></g></svg>
</button>
`;

var icons = `${iconbuttons.emoji}${iconbuttons.strikethrough}${iconbuttons.removeFormat}`;

let UiExampleEditor =  {
    template:  `<div class="" >
<form method="POST" action="/">      
    <div style="max-width: 950px; margin: 0 auto; width: 93vw;">
        <div ref="editor" class="aui-editor aui-editor--mystyle">     
            <div class="app-toolbar">${icons}</div>          
            <textarea editor-textarea ref="textarea" name="editor" 
                readonly="readonly" placeholder=" "></textarea>    
        </div>
        <button class="aui-button aui-button--default" id="send" type="button" 
        style="margin-top: 15px; float: right;"
        :disabled="disableSend">submit</button>    
    </div>
</form>
</div>`
}

function initBasicCommand(wysiwygeditor, event, name, action) {
    var selector = `[editor-action="${name}"]`;
    

    var element = event.target;
    var parents = [];
    while (element.parentNode && element.parentNode.className != 'app-toolbar') {
        parents.push(element = element.parentNode);
    }   

    if (parents.length > 0 && parents[parents.length - 1].matches(selector)) {        
        if (action) {
            action();
        } else {
            wysiwygeditor.shell[name]();
        }
        event.stopPropagation();
    }   
}


function initToolBar(wysiwygeditor, $refs, options) {
    var dom = {};
    dom.toolbar = $refs.editor.AuifindSelectorFromChildren(".app-toolbar");

    dom.toolbar.addEventListener("click", function(event) {
        initBasicCommand(wysiwygeditor, event, 'emoji', function() {

            wysiwygeditor.shell.insertHTML(`<img src='http://file.digitaling.com/eImg/uimages/20170105/1483591496870347.jpg' 
                    style='width: 30px; height: 30px; display: inline-block; margin: 0; border: none;' 
                        onerror="this.className = 'load-error'; this.title='图挂了'; " title='' />`);

        });
        initBasicCommand(wysiwygeditor, event, 'italic');
        initBasicCommand(wysiwygeditor, event, 'strikethrough');
        initBasicCommand(wysiwygeditor, event, 'removeFormat');
    });
}

function togglePlaceHolder(editorshell, $refs, options) {
    var html = editorshell.getHTML();
        
    if (html.length < 1 ||
        html.replace(/<br\s*[\/]?>/gi,'').length < 1 ||
        html.replace(/<div><br\s*[\/]?><\/div>/gi,'').length < 1) {
        $refs.editor.querySelector(".wysiwyg-placeholder").style.display = "block";
    } else {
        $refs.editor.querySelector(".wysiwyg-placeholder").style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", function() {
    var app = document.getElementById("app");

    app.innerHTML = UiExampleEditor.template;

    var $refs = {};
    $refs.textarea = document.querySelector('[ref="textarea"]');
    $refs.editor = document.querySelector('[ref="editor"]');

    var wysiwygeditor = createWysiwyg($refs.textarea);

    // 兼容ie9  ie10 placeholder无法穿透问题
    var __isLowIE = /*@cc_on!@*/false;
    if (__isLowIE) {
        wysiwygeditor.dom.wrapper.addEventListener("click", function __fucklowie() {
            wysiwygeditor.dom.editor.focus();
            wysiwygeditor.dom.wrapper.removeEventListener("click", __fucklowie);
        });
    }
    
    initToolBar(wysiwygeditor, $refs, {});


    var editorshell = wysiwygeditor.shell;
    $refs.textarea.addEventListener("change", function() {    
        // togglePlaceHolder(editorshell, $refs, {});
    });
    $refs.textarea.addEventListener("focus", function() {
        if( typeof console != 'undefined' )
            ;//console.log( 'focus' );
    });
    $refs.textarea.addEventListener("blur", function() {
        if( typeof console != 'undefined' );//console.log( 'blur' );
        togglePlaceHolder(editorshell, $refs, {});
    });

    editorshell.readOnly( false );
});
