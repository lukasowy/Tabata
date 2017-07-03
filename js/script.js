let countdown;
let regTime = /^[\d]{1,2}:[\d]{1,2}$/;
let regCycTab = /^[\d]{1,2}$/;
let arrSumTime = [0, 0, 0, 1, 1];


const timerDisplay = document.querySelector('#timerClockFrame');
const cyclesDisplay = document.querySelector('#numberOfCyclesFrame');
const tabatasDisplay = document.querySelector('#numberOfTabatasFrame');
const start = document.querySelector('#start');
const listInputs = document.querySelectorAll('ul>li>form>input');

function timer(seconds) {

    clearInterval(countdown);


    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {

        const secondLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it
        if (secondLeft < 0) {
            clearInterval(countdown);

            return timer(seconds);
        }
        displayTimeLeft(secondLeft);
    }, 1000);

}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0':''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

// return convert prepare time from input
function convTimePrep(e) {
    e.preventDefault();
    const mins = this.minutes.value;

    if (regTime.test(mins)) {
        var res = mins.split(":");
        var sek = getSum(res);
        arrSumTime[0] = sek;
        displayTimeLeft(fullTime());
        //console.log(arrSumTime[0]);

    } else {
        this.reset();
    }
}

// return convert work time from input
function convTimeWork(e) {
    e.preventDefault();
    const mins = this.minutes.value;

    if (regTime.test(mins)) {
        var res = mins.split(":");
        var sek = getSum(res);
        arrSumTime[1] = sek;
        displayTimeLeft(fullTime());
        //console.log(arrSumTime[1]);

    } else {
        this.reset();
    }
}

// return convert reset time from input
function convTimeReset(e) {
    e.preventDefault();
    const mins = this.minutes.value;

    if (regTime.test(mins)) {
        var res = mins.split(":");
        var sek = getSum(res);
        arrSumTime[2] = sek;
        displayTimeLeft(fullTime());
        //console.log(arrSumTime[2]);

    } else {
        this.reset();
    }
}

//sum convert from  00:00 to seconds
function getSum(arr) {
    return parseInt(arr[0] * 60) + parseInt(arr[1]);
}

//sum of each inputs + cycles & tabatas

function fullTime() {
    var sumSec = (arrSumTime[0] + (arrSumTime[1] + arrSumTime[2]) * arrSumTime[3]) * arrSumTime[4];
    //console.log(sumSec);
    return sumSec;
}

// add class success if input value correct or danger if not 
function select1(e) {
    e.preventDefault();
    const input = this.value;
    //console.log(input);
    if (regTime.test(input)) {
        e.target.classList.remove("danger");
        e.target.classList.add("success");
    } else {
        e.target.classList.remove("success");
        e.target.classList.add("danger");
    }
}

function select2(e) {
    e.preventDefault();
    const input = this.value;
    //console.log(input);
    if (regCycTab.test(input)) {
        e.target.classList.remove("danger");
        e.target.classList.add("success");
    } else {
        e.target.classList.remove("success");
        e.target.classList.add("danger");
    }
}

function jobStart() {
    var prep = arrSumTime[0];
    var work = arrSumTime[1];
    var rest = arrSumTime[2];
    var cyc = arrSumTime[3];
    var tab = arrSumTime[4];
    if (prep != 0 && work != 0 && rest != 0 && cyc > 0 && tab > 0) {
        timer(prep);
    } else {
        alert("Prosze o wypełnienie poprawnie wszystkich pól.")
        
    }

    //timer(rest);
    /*    for (i = 0; i < tab; i++) {
            timer(prep);
            console.log(prep);
            for (j = 0; j < cyc; j++) {
                timer(work);
                console.log(work);
                timer(rest);
                console.log(rest);

            }
        }*/
}

//-----------------......EVENTS.....-----------------------//

document.SetPrepTime.addEventListener('change', convTimePrep);
document.SetWorkTime.addEventListener('change', convTimeWork);
document.SetResetTime.addEventListener('change', convTimeReset);
document.SetPrepTime.addEventListener('submit', convTimePrep);
document.SetWorkTime.addEventListener('submit', convTimeWork);
document.SetResetTime.addEventListener('submit', convTimeReset);
start.addEventListener('click', jobStart);

for (i = 0; i < 3; i++) {
    listInputs[i].addEventListener('change', select1);
}
for (i = 3; i < 5; i++) {
    listInputs[i].addEventListener('change', select2);
}

//----------------------------------------------------------//

function displayCyclesLeft(cycles) {
    const display = `${cycles < 10 ? '0':''}${cycles}`
    cyclesDisplay.textContent = display;

}

document.SetCycles.addEventListener('change', function (e) {
    e.preventDefault();
    const cyc = this.cycles.value;

    if (regCycTab.test(cyc)) {
        arrSumTime[3] = cyc;
        displayCyclesLeft(cyc);
        displayTimeLeft(fullTime());
    } else {
        this.reset();
    }
});

document.SetCycles.addEventListener('submit', function (e) {
    e.preventDefault();
    const cyc = this.cycles.value;

    if (regCycTab.test(cyc)) {
        arrSumTime[3] = cyc;
        displayCyclesLeft(cyc);
        displayTimeLeft(fullTime());
    } else {
        this.reset();
    }
});

function displayTabatasLeft(tabatas) {
    const display = `${tabatas < 10 ? '0':''}${tabatas}`
    tabatasDisplay.textContent = display;
}

document.SetTabatas.addEventListener('change', function (e) {
    e.preventDefault();
    const tab = this.tabatas.value;

    if (regCycTab.test(tab)) {
        arrSumTime[4] = tab;
        displayTabatasLeft(tab);
        displayTimeLeft(fullTime());
    } else {
        this.reset();
    }
});

document.SetTabatas.addEventListener('submit', function (e) {
    e.preventDefault();
    const tab = this.tabatas.value;

    if (regCycTab.test(tab)) {
        arrSumTime[4] = tab;
        displayTabatasLeft(tab);
        displayTimeLeft(fullTime());
    } else {
        this.reset();
    }
});
