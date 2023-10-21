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
        writingArea.focus(); // 툴의 기능 버튼 클릭시 글쓰기 커서 생성.(버튼 토글이 꼬여서 추가함.)
        modifyText(button.id, false, null);
    });
});

advancedOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        writingArea.focus();
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
    });
}

window.onload = initializer();



let sel
let range
const imgArr = {};

// 1. 이미지를 불러온다.
// 2. 이미지 src 속성에 URL추가
// 3. imgArr객체에 file 객체를 담는다.
// 4. submit할때 일치하는 객체만 찾아서 보낸다.

function imgUpload(obj) {

    const fileNum = document.querySelectorAll('.imgSize').length;

    if(obj.files.length + fileNum < 6) {    // 이미지 최대 첨부 개수 (업로드 하려는 이미지 갯수 + 업로드된 이미지 개수 < 6)
        if(range) {  // caret의 range값이 있을때.
            for(file of obj.files) {
                const img = new Image();
                const imgFile = URL.createObjectURL(file);
                img.src = imgFile;
                img.setAttribute('class', 'imgSize');
                img.setAttribute('alt', file.name);
                imgArr[imgFile] = file;
                range.insertNode(img);
            }
        }
    
        if(!range) { // caret의 range값이 없을때. (바로 사진 버튼 눌렀을때.)
            for(file of obj.files) {
                const img = new Image();
                const imgFile = URL.createObjectURL(file);
                img.src = imgFile;
                img.setAttribute('class', 'imgSize');
                img.setAttribute('alt', file.name);
                imgArr[imgFile] = file;
                caret.appendChild(img);
            }
        }
    } else {
        alert("최대 첨부 갯수 5개를 초과 했습니다.");
    }

};

const caret = document.querySelector('#text-input');
caret.onkeyup = function() {
    sel = window.getSelection();
    range = sel.getRangeAt(0);
};
caret.addEventListener('click', function() {
    sel = window.getSelection();
    range = sel.getRangeAt(0);
});


async function uploadContent() {

    const textData = document.getElementById('text-input');
    const titleData = document.getElementById('new2Title').value;
    const imgData = textData.querySelectorAll('img');
    const formData = new FormData();
    const uploadImg = [];
    const imgIndex = {};

    let num = 0;
    imgData.forEach((img) => {
        if(Object.keys(imgArr).includes(img.src)) {
            img.setAttribute("data-img-num", num);
            uploadImg.push(imgArr[img.src]);
            URL.revokeObjectURL(img.src);
            img.removeAttribute('src');
            imgIndex[num] = img.alt
            num++;
        }
    });
    formData.append('imgIndex', JSON.stringify(imgIndex));

    uploadImg.forEach((img) => {
        formData.append('images', img);
    });

    formData.append('title' ,titleData);
    formData.append('mainText' ,textData.innerHTML);

    await axios.post('/index', formData)
    .then((res) => {
        window.location.href =` http://localhost:3000/index/${res.data}`
    })
};

