//Menu點選可以顯示出子選單
//點選收和按鈕把Menu收起來，並顯示數字或圖案顯示，在上面點選可以顯示出子選單

window.addEventListener("load", function(e){
    //alert("Hello");
    //SetNavItem();
    CreateNav(document.getElementById("menu"));
}, false);

var testClass = function(menuObject) {
    var GetChildItems = function() {
        
    };
}

function CreateNav(menuObject) {
    var ulLevel1 = [], ulLevel2 = [], ulLevel3 = [];
    var liLevel1 = [], liLevel2 = [], liLevel3 = [];
    //
    ulLevel1 = menuObject.children;
    liLevel1 = GetChildItems(ulLevel1, "ul", "li");
    ulLevel2 = GetChildItems(liLevel1, "li", "ul");
    liLevel2 = GetChildItems(ulLevel2, "ul", "li");
    ulLevel3 = GetChildItems(liLevel2, "li", "ul");
    liLevel3 = GetChildItems(ulLevel3, "ul", "li");
    //
    SetLiLevel(ulLevel2, 1, "init");
    SetLiLevel(ulLevel3, 2, "init");
    //
    menuObject.addEventListener("click", SetMenuEvent, false);
}

function GetChildItems(parentNodes, parentTagName, getTagName) {
    var childNodes = [];
    //
    [].forEach.call(parentNodes, function(item) {
        if (item && item.tagName.toLowerCase() === parentTagName) {
            for (var i0 = 0; i0 < item.children.length; i0++) {
                if (item.children[i0].tagName.toLowerCase() === getTagName) {
                    childNodes.push(item.children[i0]);
                }
            }
        }
    });
    //
    return childNodes;
}

function SetLiLevel(liLevel, level, process) {
    [].forEach.call(liLevel, function(item) {
        if (item) {
            if (process) {
                SetItems(item, level, process);
            } else {
                if (item.classList.contains("hide")) {
                    SetItems(item, level, "open");
                } else {
                    SetItems(item, level, "hide");
                }
            }
        }
    });
}

// function SetLiItem(liItem, level, process) {
//     [].forEach.call(liItem.children, function(item) {
//         if (item) {
//             SetItems(item, level, process);
//         }
//     });
// }

function SetItems(item, level, process) {
    switch (item.tagName.toLowerCase()) {
        case "a":
            break;
        case "span":
            break;
        case "ul":
            SetItemsByProcess(item, level, process);
            break;
        default:
            break;
    }
}

function SetItemsByProcess(item, level, process) {
    switch (process) {
        case "init":
            item.classList.add("hide");
            SetItemByLevel(item, level);
            break;
        case "open":
            item.classList.remove("hide");
            break;
        case "hide":
            item.classList.add("hide");
            break;
        default:
            break;
    }
}

function SetItemByLevel(item, level) {
    switch (level) {
        case 1:
            item.classList.add("nav-level1-ul");
            break;
        case 2:
            item.classList.add("nav-level2-ul");
            break;
        case 3:
            item.classList.add("nav-level3-ul");
            break;
        default:
            break;
    }
}

function SetMenuEvent(event) {
    var targetElement = event.target;
    var liLevel = [], ulLevel = [];
    //
    if (targetElement.tagName.toLowerCase() === "a") {
        if (targetElement.getAttribute("href") === "#") {
            event.preventDefault();
            liLevel.push(targetElement.parentNode);
            ulLevel = GetChildItems(liLevel, "li", "ul");
            //
            SetLiLevel(ulLevel);
        }
    } else {
        event.preventDefault();
    }
}
