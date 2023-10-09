// 내가 원하는 caret의 위치에 이미지를 추가해야함.
// -> caret의 위치 정보를 실시간으로 담고 있다가 이미지 추가시 마지막 caret위치에 이미지를 추가.

let sel
let range

function imgUpload(obj) {
    if(range){  // caret의 range값이 있을때.
        for(file of obj.files) {
            let img = new Image();
            img.src = URL.createObjectURL(file);
            img.setAttribute('class', 'imgSize');
            range.insertNode(img);
        }
    }

    if(!range){ // caret의 range값이 없을때.(바로 사진 버튼 눌렀을때.)
        for(file of obj.files){
            let img = new Image();
            img.src = URL.createObjectURL(file);
            img.setAttribute('class', 'imgSize');
            caret.appendChild(img);
        }
    }
};

const caret = document.querySelector('#text-input');
caret.onkeyup = function(){
    sel = window.getSelection();
    range = sel.getRangeAt(0);
};
caret.addEventListener('click', function(){
    sel = window.getSelection();
    console.log("anchorNode: ", sel.anchorNode);
    console.log("focusNode: ", sel.focusNode);

    range = sel.getRangeAt(0);
    console.log("sel: ", sel);
    console.log("click: ", range);

    // const ggbet = range.getBoundingClientRect()
    // console.log("ggbet: ", ggbet);

    // const ggbet2 = range.getClientRects()
    // console.log("ggbet2: ", ggbet2);
});


let optionsButtons = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let writingArea = document.getElementById("text-input");
let linkButton = document.getElementById("createLink");
let alignButtons = document.querySelectorAll(".align");
let formatButtons = document.querySelectorAll(".format");



let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive"
];

const initializer = () => {

    highlighter(alignButtons, true);
    highlighter(formatButtons, false);

    fontList.map((value) => {
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for(let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

optionsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    });
});

linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL");

    if(/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {

            if(needsRemoval) {
                let alreadyActive = false;

                if(button.classList.contains("active")) {
                    alreadyActive = true;
                }

                highlighterRemover(className);
                if(!alreadyActive) {
                    button.classList.add("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    })
}

window.onload = initializer();

