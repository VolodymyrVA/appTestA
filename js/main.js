(function () {
    "use strict";

    var ajaxModule = (function () {
        return {
            request: function (http) {
                var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest,
                    temp = 0;

                var xhr = new XHR();

                xhr.open('GET', http, false);

                xhr.onload = function () {
                    temp = this.responseText;
                    console.log(temp)
                };

                xhr.onerror = function () {
                    console.log('Ошибка ' + this.status);
                };

                xhr.send();
                return temp;
            }
        }
    })();


    var viewModule = (function () {
        var arr = [];
        return {

            createArray: function (arr, depth) {
                var tempArr = [];

                for (var i = 0; i < arr.length; i++) {
                    if (i < depth) {
                        tempArr.push(arr[i]);
                    }
                }
                var randomData = tempArr.sort(function () {
                    return Math.random() - 0.5
                });
                return randomData;
            },

            setContent: function () {

                var strings = ajaxModule.request("https://kde.link/test/get_field_size.php").replace(/\D+/g, ""),
                    rows = parseInt(strings.replace(/^\d/, "")),
                    cells = parseInt(strings.replace(/\d$/, "")),
                    depth = rows * cells,
                    data = viewModule.createArray(dataArray, depth),
                    i,
                    j,
                    tik = 0,
                    content = document.getElementById("content"),
                    table = document.createElement("table");

                    table.id = "tables";


                for (j = 0; j < rows; j++) {
                    var row = document.createElement("tr");

                    for (i = 0; i < cells; i++) {
                        var cell = document.createElement("td");
                        cell.innerHTML = '<img class="font" src="'+data[tik]+'">';
                        tik += 1;
                        row.appendChild(cell);
                    }
                    table.appendChild(row);
                }
                content.appendChild(table);
            },

            hide: function(e){
                e.preventDefault();
                e.currentTarget.classList.toggle("font");
                var first = e.currentTarget;
                viewModule.selectionCheck(e.currentTarget);
            },

            changeImg: function (obj) {
            var img = document.getElementsByTagName("img"),
                imgLength = img.length;
                for(var j = 0; j < imgLength; j++) {
                    img[j].addEventListener("click",viewModule.hide, false);
                }
            },

            selectionCheck: function (e) {
                var img = document.getElementsByTagName("img"),
                    imgClassNameHidden = document.getElementsByClassName("hidden"),
                    imgLength = img.length,
                    i ,
                    temp = [];

                if(e.getAttribute("class") !== "font"){
                    arr.push(e);
                }else{
                    arr[0].classList.add("font");
                    arr.shift();
                    if(arr[0]){
                        arr[0].classList.add("font");
                        arr.shift();
                    }
                }


                if(arr.length > 1){
                    if(arr[0].getAttribute("src") === arr[1].getAttribute("src")){
                        arr[0].classList.add("hidden");
                        arr[0].classList.remove("font");
                        arr[1].classList.add("hidden");
                        arr[1].classList.remove("font");
                        arr.shift();
                        arr.shift();
                    }
                }
                if(arr.length > 2){
                    if(arr[0].getAttribute("src") !== arr[1].getAttribute("src")){
                        arr[0].classList.add("font");
                        arr[1].classList.add("font");
                        arr.shift();
                        arr.shift();
                    }
                }
                for(i = imgLength; i-- ;){
                    if(img[i].classList.contains('hidden')){
                        temp.push(img[i])
                    }
                    if(imgLength === temp.length){
                        var tables = document.getElementById("tables");
                        tables.insertAdjacentHTML("beforeBegin", '<span class="imgContentFinish"><img src="http://risovach.ru/upload/2014/12/mem/toni-stark_68055196_orig_.jpg"></span><span><a id="restart" href="#">Начать сначала</a></span>');
                        restartModule.restart();
                    }
                }

            }
        }
    })();
    viewModule.setContent();
    viewModule.changeImg();

    var restartModule = (function () {

        return {

            restart: function () {
                var restartButton = document.getElementById("restart"),
                    content = document.getElementById("content");
                if(restartButton){
                    restartButton.addEventListener("click",function () {
                        content.innerHTML = "";
                        viewModule.setContent();
                        viewModule.changeImg();
                    }, false);
                }
            }
        }
    })();
})();