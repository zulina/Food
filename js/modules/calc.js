function calc() {

    // Calc

    // отбираем по классу и внутреннему блоку с указанием span
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, ratio;

    // устанавливаем значение по умолчанию
    // если есть в хранилище - вытаскиваем
    // если нет - задаём и записываем его в хранилище
    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    // теперь подкрашиваем выбранные по-умолчанию значения
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            // убираем окрашевание
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === sex) {//=== localStorage.getItem('sex'))
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') === ratio) {//=== localStorage.getItem('ratio'))
                elem.classList.add(activeClass);
            }

        })
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        // проверка на заполнение значений
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    // функция для обработки полей с кнопками
    function getStaticInformation(selector, activeClass) {
        // выбераем все подчинённые div 
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // если есть такой атрибут, то устанавливаем физ активность
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else { // иначе - это пол человека
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                console.log(ratio, sex);
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
    
                // устанавливаем класс, который подсвечивает выбранное
                e.target.classList.add(activeClass);
    
                calcTotal();
            })
        })

    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    // функция для обработки полей с вводимимы значениями
    function getDynamicInfornation(selector) {
        const input = document.querySelector(selector);

        // обработчик при вводе в поле
        input.addEventListener('input', () => {

            // если ввели не числа, то подсвечиваем
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        })
    }

    getDynamicInfornation('#height')
    getDynamicInfornation('#weight')
    getDynamicInfornation('#age')

}

// module.exports = calc;

export default calc;