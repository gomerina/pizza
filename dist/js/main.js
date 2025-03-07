if (maskPhone === undefined) {
    var maskPhone = new function () {
        this.isNum = function (value) {
            return /\d/.test(value);
        };
        this.maskEditValue = function (input, pos) {
            let posReturn = pos;
            let posReturnChange = true;
            if (pos > 0) {
                pos--;
            }

            let valueNew = '';
            for (let posValue = 0; posValue < pos; posValue++) {
                valueNew += input.value.charAt(posValue);
            }

            let posMask = pos;
            for (let posValue = pos; posValue < input.value.length; posValue++) {
                if (posMask < input.mask.length) {
                    let simbolValue = input.value.charAt(posValue);
                    let simbolMask = input.mask.charAt(posMask);

                    if (
                        simbolMask == simbolValue
                        || (simbolMask == '9' && maskPhone.isNum(simbolValue))
                    ) {
                        posReturnChange = false;
                        valueNew += simbolValue;
                        posMask++;
                    } else if (
                        simbolMask == '9'
                        && !maskPhone.isNum(simbolValue)
                    ) {
                        posReturnChange = false;
                    } else if (
                        simbolMask != '9'
                        && maskPhone.isNum(simbolValue)
                    ) {
                        valueNew += simbolMask;
                        posMask++;
                        posValue--;
                        if (posReturnChange) {
                            posReturn++;
                        }
                        if (
                            input.valueOld.length > posReturn
                            && input.valueOld.charAt(posReturn - 1) == simbolMask
                        ) {
                            while (posReturn > 1 && !maskPhone.isNum(input.valueOld.charAt(posReturn - 1))) {
                                posReturn--;
                            }
                        }
                    } else if (
                        simbolMask != '9'
                        && !maskPhone.isNum(simbolValue)
                    ) {
                        valueNew += simbolMask;
                        posMask++;
                    }
                }
            }
            input.value = valueNew;
            input.valueOld = valueNew;

            let valueNotFull = '';
            for (let posMask = 0; posMask < input.mask.length; posMask++) {
                let simbolMask = input.mask.charAt(posMask);
                if (simbolMask == '9') {
                    if (input.value.length <= posMask) {
                        input.value = valueNotFull;
                        input.valueOld = valueNotFull;
                        posReturn = input.value.length;
                    }
                    break;
                }
                valueNotFull += simbolMask;
            }

            return posReturn;
        };
        this.cursorPosition = function (input) {
            let posMinimum = 0;
            for (let posMask = 0; posMask < input.mask.length; posMask++) {
                let simbolMask = input.mask.charAt(posMask);
                if (
                    simbolMask == '9'
                    || input.value.length <= posMask
                ) {
                    posMinimum = posMask;
                    break;
                }
            }
            if (
                input.selectionStart < posMinimum
                || input.selectionEnd < posMinimum
            ) {
                input.selectionStart = posMinimum;
                input.selectionEnd = posMinimum;
            }
        }
        this.maskDefault = '+7 (999) 999-99-99';

        this.init = function (input, mask, placeholder) {
            placeholder = placeholder === undefined || placeholder === true ? true : false;
            if (!input) {
                return false;
            }
            if (!input.classList.contains('is-masked')) {
                input.mask = mask || maskPhone.maskDefault;
                input.valueOld = input.value;
                maskPhone.maskEditValue(input, 0);
                if (input.value.length != input.mask.length) {
                    input.value = '';
                }
                if (placeholder) {
                    input.setAttribute('placeholder', input.mask);
                }

                input.classList.add('is-masked');

                input.addEventListener('input', function () {
                    let posReturn = maskPhone.maskEditValue(this, this.selectionStart);
                    this.selectionStart = posReturn;
                    this.selectionEnd = posReturn;
                });
                input.addEventListener('focus', function () {
                    if (this.value.length <= 0) {
                        this.value = this.valueOld;
                        this.selectionStart = this.value.length;
                        this.selectionEnd = this.value.length;
                    }
                });
                input.addEventListener('blur', function () {
                    if (this.value.length != this.mask.length) {
                        this.value = '';
                    }
                });
                input.addEventListener('keydown', function () {
                    let obInput = this;
                    setTimeout(function () {
                        maskPhone.cursorPosition(obInput);
                    }, 10);
                });
                input.addEventListener('keyup', function () {
                    maskPhone.cursorPosition(this);
                });
                input.addEventListener('click', function () {
                    maskPhone.cursorPosition(this);
                });
            }
        };
    };
}


document.addEventListener('DOMContentLoaded', function () {
    let jsTel = document.querySelectorAll('.jsTel');
    jsTel.forEach(function () {
        maskPhone.init(this, '+7 (999) 999-99-99', false);
    });
    new Swiper(".main-screen", {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        speed: 900,
        effect: 'fade',
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    new Swiper(".product-slider", {
        spaceBetween: 31,
        slidesPerView: 4,
        slidesPerGroup: 1,
        speed: 900,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
            formatFractionCurrent: addZero,
            formatFractionTotal: addZero,
        },
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });
    new Swiper(".promo__slider", {
        spaceBetween: 29,
        slidesPerView: 3,
        slidesPerGroup: 1,
        speed: 900,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
            formatFractionCurrent: addZero,
            formatFractionTotal: addZero,
        },
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });
    new Swiper(".reviews__slider", {
        spaceBetween: 85,
        slidesPerView: 3,
        slidesPerGroup: 1,
        speed: 900,
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
            formatFractionCurrent: addZero,
            formatFractionTotal: addZero,
        },
        navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
        },
    });
    function addZero(num) {
        return (num > 9) ? num : '0' + num;
    }

    function clickCounter(e) {
        var target = e.target;
        if (target.matches('.jsCounterIncrease')) {
            var counterInput = target.closest('.jsCounterParent').querySelector('.jsCounterInput');
            var value = parseInt(counterInput.value);
            var max = parseInt(counterInput.max);
            if (value < max) counterInput.value = value + 1;
        }
        if (target.matches('.jsCounterDecrease')) {
            var counterInput = target.closest('.jsCounterParent').querySelector('.jsCounterInput');
            var value = parseInt(counterInput.value);
            var max = parseInt(counterInput.max);
            if (value > 1) counterInput.value = value - 1;
        }
    }
    function inputCounter(e) {
        var target = e.target;
        if (target.matches('.jsCounterInput')) {
            var value = parseInt(target.value);
            var max = parseInt(target.max);
            if (isNaN(value) || value < 1) target.value = 1;
            else if (value > max) target.value = max;
        }
    }

    document.addEventListener('click', clickCounter);
    document.addEventListener('input', inputCounter);


    Fancybox.bind(".jsOpenModal", {
        on: {
            reveal: (fancybox, slide) => {
                let jsTel = slide.contentEl.querySelectorAll('.jsTel');
                jsTel.forEach(function (item) {
                    maskPhone.init(item, '+7 (999) 999-99-99', false);
                });
            },
        },
    });



})