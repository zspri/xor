var editor = CodeMirror(document.getElementsByClassName("editor")[0], {
    lineNumbers: true,
    lineWrapping: true,
    autofocus: true,
    mode: "htmlmixed"
});
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
    $(".editor").toggle();
}
