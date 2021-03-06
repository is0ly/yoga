window.addEventListener("DOMContentLoaded", function() {
    "use strict";

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");
        }
    }

    info.addEventListener("click", function(event) {
        let target = event.target;
        if (target && target.classList.contains("info-header-tab")) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // * Timer

    let deadline = "2020-01-23";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor(t / (1000 * 60 * 60));
        return {
            total: t,
            hourse: hours,
            minutes: minutes,
            seconds: seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            if (t.hourse < 10) {
                hours.textContent = `0${t.hourse}`;
            } else {
                hours.textContent = t.hourse;
            }
            if (t.minutes < 10) {
                minutes.textContent = `0${t.minutes}`;
            } else {
                minutes.textContent = t.minutes;
            }
            if (t.seconds < 10) {
                seconds.textContent = `0${t.seconds}`;
            } else {
                seconds.textContent = t.seconds;
            }

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = `00`;
                minutes.textContent = `00`;
                seconds.textContent = `00`;
            }
        }
    }

    setClock("timer", deadline);

    //* Modal

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close"),
        knowMore = document.querySelectorAll(".description-btn");

    knowMore.forEach(function(item) {
        item.addEventListener("click", function() {
            overlay.style.display = "block";
            this.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    });

    more.addEventListener("click", function() {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function() {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    //FORM
    let message = {
        loading: "Загрузка",
        success: "Спасибо! Скоро мы с Вами свяжемся",
        failure: "Что-то пошло не так!"
    };

    let form = document.querySelector(".main-form"),
        input = document.getElementsByTagName("input"),
        statusMessage = document.createElement("div");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        statusMessage.classList.add("status");

        let formData = new FormData(form);

        let obj = {};

        let promise = new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader(
                "Content-type",
                "application/json; charset=utf-8"
            );

            formData.forEach(function(value, key) {
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json);

            request.onload = function() {
                if (request.readyState < 4) {
                    resolve();
                } else if (request.readyState === 4 && request.status == 200) {
                    resolve();
                } else {
                    reject();
                }
            };
        });

        function clearInput() {
            for (let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
        }

        promise
            .then(() => {
                statusMessage.innerHTML = message.loading;
            })
            .then(() => {
                statusMessage.innerHTML = message.success;
            })
            .catch(err => {
                console.log(err);
                statusMessage.innerHTML = message.failure;
            })
            .then(clearInput);
    });

    // SLIDER

    let slideIndex = 1,
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => {
            item.style.display = "none";
        });

        dots.forEach(item => {
            item.classList.remove("dot-active");
        });

        slides[slideIndex - 1].style.display = "block";

        dots[slideIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides((slideIndex += n));
    }

    function currentSlide(n) {
        showSlides((slideIndex = n));
    }

    prev.addEventListener("click", function() {
        plusSlides(-1);
    });

    next.addEventListener("click", function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (
                event.target.classList.contains("dot") &&
                event.target == dots[i - 1]
            ) {
                currentSlide(i);
            }
        }
    });

    /// Relax Calculator

    // Calc

    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener("change", function() {
        personsSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (restDays.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }

        if (persons.value == 0) {
            totalValue.innerHTML = 0;
        }
    });

    restDays.addEventListener("change", function() {
        daysSum = +this.value;
        total = (daysSum + personsSum) * 4000;

        if (persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
        if (restDays.value == 0) {
            totalValue.innerHTML = 0;
        }
    });

    place.addEventListener("change", function() {
        if (restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});
