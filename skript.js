var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
    lastTop;



window.addEventListener('scroll', function (event) {
    var train = document.getElementById('trainMotion'),
        top = train.getBoundingClientRect().top,
        offset = top - windowHeight;

    if (offset > 0) {
        train.classList.remove('choochoo');
        return;
    }

    if (top < windowHeight / 2 && top > lastTop) {
        train.classList.remove('choochoo');
    }

    if (train.className.indexOf('choocho') === -1 && top < lastTop) {
        train.classList.add('choochoo');
    }

    lastTop = top;

});





/** color change when scroll **/
$(window).scroll(function () {

    // selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel');

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 3);

    $panel.each(function () {
        var $this = $(this);

        // if position is within range of this panel.
        // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
        // Remember we set the scroll to 33% earlier in scroll var.
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

            // Remove all classes on body with color-
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });

            // Add class of currently active div
            $body.addClass('color-' + $(this).data('color'));
        }
    });

}).scroll();



/**bruger menu **/


function onClickMenu() {
    console.log("klik burgermenu");
    document.getElementById("menuknap").classList.toggle("change");
    document.getElementById("nav1").classList.toggle("change");
    document.getElementById("bgeffekt").classList.toggle("changebg");
}



/** piediagram **/

document.addEventListener("DOMContentLoaded", hentJson);


let valueArray = [];
let offsetArray = [0];
let omkreds = 200 * Math.PI;
let myData;
let dataArray = [];

async function hentJson() {
    let myJson = await fetch("pie.json");
    myData = await myJson.json();
    //console.log(myData);
    lavArray();
}

function lavArray() {
    myData.forEach(data => {
        //console.log(data.value)
        let tilProcent = data.value * omkreds / 100;
        //console.log(tilProcent);
        offsetArray.push(tilProcent + offsetArray[offsetArray.length - 1]);
        valueArray.push(tilProcent);
        dataArray.push(data.value);



    })
    //console.log(valueArray);
    //console.log(offsetArray);
    animer();
}


function animer() {

    document.querySelectorAll(".piechart circle").forEach((pie, i) => {
        pie.style.strokeDasharray = valueArray[i] + " " + omkreds;
        pie.style.strokeDashoffset = -offsetArray[i];
        pie.setAttribute("data-value", dataArray[i]);
        // console.log(pie);
    });


}

document.querySelector(".piechart").addEventListener("mouseover", e => {

    let valgt = e.target.getAttribute("data-value");
    if (valgt) {
        console.log("procent er:", valgt);
        document.querySelector("h3").textContent = valgt + "%";


    }
});
