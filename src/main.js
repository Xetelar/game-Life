let grid = document.getElementById('grid');
let life = document.getElementById('life');
let btn = document.getElementById('next');

let td = document.getElementById('td');
let th = document.getElementById('th');

let width;
let height;

function creaneTable(w = 30, h = 15) {
    grid.innerHTML = '';
    for (let i = 0; i < h; i++) {
        for (let j = 0; j < w; j++) {
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            let x = Math.random();
            if (x > 0.5) {
                checkbox.checked = 'checked';
            }

            grid.appendChild(checkbox);
        }
        let br = document.createElement('br');
        grid.appendChild(br);
    }
}

btn.addEventListener('click', function () {
    let childrens = grid.childNodes;
    let childrensArr = [];
    for (let i = 0; i < childrens.length; i++) {
        if (childrens[i].ELEMENT_NODE === document.ELEMENT_NODE && childrens[i].tagName !== 'BR') {
            childrensArr.push(childrens[i]);
        }
    }
    for (let i = 0; i < childrensArr.length; i++) {
        let tr = Math.floor(i / width) + 1;
        let sibling = [];

        if (i % 10 !== 0) {
            sibling.push(childrensArr[i - 1]);

            if (tr !== height) {
                sibling.push(childrensArr[i + width - 1]);
            }
        }
        if (i < width * height - 1) {
            sibling.push(childrensArr[i + 1]);
        }
        if (tr > 1) {
            sibling.push(childrensArr[i - width]);
            sibling.push(childrensArr[i - width + 1]);
            if (i > width) {
                sibling.push(childrensArr[i - width - 1]);
            }
        }
        if (tr < height) {
            sibling.push(childrensArr[i + width]);
            if (i < tr * width - 1) {
                sibling.push(childrensArr[i + width + 1]);
            }

        }

        let check = sibling.filter(el => el.checked);

        if (check.length < 2 || check.length > 3) {
            childrensArr[i].checked = '';
        } else if (check.length === 3) {
            childrensArr[i].checked = 'checked';
        }
    }
});

life.addEventListener('click', function () {
    creaneTable(width, height);
});

td.addEventListener('input', function () {
   width = parseInt(this.value) || 30;
});

th.addEventListener('input', function () {
    height = parseInt(this.value) || 15;
});
