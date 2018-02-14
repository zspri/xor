var editor = CodeMirror(document.getElementsByClassName("editor")[0], {
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    mode: "htmlmixed"
});

var demo = `<!DOCTYPE html>
<html>
<head>
    <style>
    * {
        text-align: center;
        font-family: 'Roboto';
        font-weight: 400;
    }

    hr {
        width: 150px;
        border: 2px solid #fa0;
        margin: 40px auto;
        border-radius: 3px;
    }

    a {
        color: #fa0;
        text-decoration: none;
        transition: .3s linear;
        position: relative;
    }

    a::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        display: block;
        right: 0;
        background: #fa0;
        transition: width .2s ease;
        -webkit-transition: width .2s ease;
    }

    a:hover::after {
        width: 100%;
        left: 0;
        background: #fa0;
    }
    </style>
</head>
<body>
    <h1>Welcome to Xor</h1>
    <h2>A real-time website editor in your browser.</h2>
    <a class="github-button" href="https://github.com/Nanomotion/xor" data-size="large" data-show-count="true">Star</a>
    &ensp;
    <a class="github-button" href="https://github.com/Nanomotion/xor/subscription" data-icon="octicon-eye" data-size="large" data-show-count="true">Watch</a>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    <hr>
    <h1>Features</h1>
    <h3>Full HTML, CSS, and JS support</h3>
    <h3>Real-time code previews</h3>
    <hr>
    <span>Copyright &copy; 2018 &ndash; <a href="https://github.com/Nanomotion">Nanomotion</a></span>
</body>
</html>`;

editor.setValue(demo);
document.getElementsByTagName("iframe")[0].srcdoc = editor.getValue();

var fname = document.getElementsByName("fname")[0];
fname.value = "example.html";

function saveFile() {
    try {
        if (!fname.value) {
            swal("Error", "Please enter a valid file name.")
        } else {
            var blob = new Blob([editor.getValue()], {type: "text/html;charset=utf-8"})
            saveAs(blob, fname.value)
        }
    } catch (e) {
        swal("Error", "Something went wrong when saving your file.")
    }
}

function makeNew() {
    window.open(window.location.href);
}

function setIframePosition() {
    var iframe = document.getElementsByTagName("iframe")[0];
    if ($(document).width() > 900) {
        iframe.width = String($(document).width() / 2) + "px";
        iframe.height = String($(document).height() - 54.2) + "px";
    } else {
        iframe.width = String(document.body.clientWidth + 18) + "px";
        iframe.height = String(($(document).height() / 20 * 9)) + "px";
    }
}

editor.on('change', function(instance, changeObj) {
    var iframe = document.getElementsByTagName("iframe")[0];
    iframe.srcdoc = editor.getValue();
});

function toggleMenu() {
    var drop = document.getElementsByClassName("drop")[0];
    if (drop.style.display == "block") {
        drop.style.display = "none";
    } else {
        drop.style.display = "block";
    }
}

$(window).resize(setIframePosition);
setIframePosition();

function togglePreview() {
    var iframe = document.getElementsByTagName("iframe")[0];
    var drop = document.getElementsByClassName("drop")[0];
    if (iframe.style.display == "block") {
        iframe.style.display = "none";
        drop.children[1].innerHTML = "Enable live preview";
    } else {
        iframe.style.display = "block";
        drop.children[1].innerHTML = "Disable live preview";
    }
    $(".editor").toggleClass("noiframe");
}

function toggleThemePanel() {
    var menu = document.getElementById("panel");
    if (menu.style.display == "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
    //$(".editor").toggle();
}

window.onbeforeunload = function(){
    return "Are you sure that you want to leave without saving your changes?"
}

function changeTheme(value) {
    document.querySelector("*[aria-rel=xor-editor-styling]").outerHTML = "";
    document.querySelector("*[aria-rel=xor-syntax-styling]").outerHTML = "";
    var new_editor_style = document.createElement("link");
    var new_syntax_style = document.createElement("link");
    new_editor_style.rel = "stylesheet";
    new_syntax_style.rel = "stylesheet";
    new_editor_style.setAttribute("aria-rel", "xor-editor-styling");
    new_syntax_style.setAttribute("aria-rel", "xor-syntax-styling");
    new_editor_style.href = "assets/codemirror-" + value + ".css";
    new_syntax_style.href = "assets/syntax-" + value + ".css";
    document.getElementsByTagName("head")[0].appendChild(new_editor_style);
    document.getElementsByTagName("head")[0].appendChild(new_syntax_style);
}

// Commands
$(window).keydown(function (e){
    if ((e.metaKey || e.ctrlKey) && e.keyCode == 83) { /*ctrl+s or command+s*/
        saveFile();
        e.preventDefault();
        return false;
    }
});
$(window).keydown(function (e){
    if ((e.metaKey || e.ctrlKey) && e.keyCode == 78) { /*ctrl+n or command+n*/
        saveFile();
        e.preventDefault();
        return false;
    }
});
$(window).keydown(function (e){
    if ((e.metaKey || e.ctrlKey) && e.keyCode == 80) { /*ctrl+p or command+p*/
        togglePreview();
        e.preventDefault();
        return false;
    }
});
