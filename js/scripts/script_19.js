window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    
    // Timer

    const deadline = '2022-06-11';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // // --- Вариант 1. получаем данные по меню ---
    // getResource('http://localhost:3000/menu')
    //     // получаем массив объектов
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             // добавляем каждый пункт на страничку
    //             new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    //         });
    //     });

    // // --- Вариант 2. получаем данные по меню ---
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // // создаем меню
    // function createCard(data) {
    //     // для каждого объекта их массива
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         // создаем элемент
    //         const element = document.createElement('div');
    //         // указываем что это меню
    //         element.classList.add("menu__item");
    //         // добавляем содержание
    //         // цена не пересчитана в доллары
    //         element.innerHTML = `
    //             <img src=${img} alt=${altimg}>
    //             <h3 class="menu__item-subtitle">${title}</h3>
    //             <div class="menu__item-descr">${descr}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //             </div>
    //         `;
    //         // ?
    //         document.querySelector(".menu .container").append(element);
    //     });
    // }

    // --- Вариант 3. получаем данные по меню ---
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                // добавляем каждый пункт на страничку
                new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
            });
        });

    // Forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // указываем что внутри функции будет асинхр код
    const postData = async (url, data) => {
        // ждёт результата
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
        // ждёт результата
        return await res.json();
    };

    // указываем что внутри функции будет асинхр код
    async function getResource(url) {
         // ждёт результата
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        // ждёт результата
        return await res.json();
    }

    // вывод статуса отправки данных
    function bindPostData(form) {
        // для форм при нажатии кнопки срабатывает submit
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // создаём элемент для вывода статуса
            let statusMessage = document.createElement('img');
            // указываем путь к картинке
            statusMessage.src = message.loading;
            // указываем параметры стиля картинки
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // вставляем картинку после конца текущей формы
            form.insertAdjacentElement('afterend', statusMessage);
        
            const formData = new FormData(form);

            // данные формы преобразовываем в массив, а массив - в объект
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // постим данные в файл db.json requests
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                // показываем окно благодарности
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                // очищаем введённые значения
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        // получаем текущее модальное окно
        const prevModalDialog = document.querySelector('.modal__dialog');

        // скрываем текущее модальное окно
        prevModalDialog.classList.add('hide');

        // открываем модальную форму на всякий случай если её могли закрыть
        openModal();

        // создаём элемент для вывода благодарности
        const thanksModal = document.createElement('div');
        // указываем класс модального окна
        thanksModal.classList.add('modal__dialog');
        // указываем что будет отображаться в окне
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        // добавляем на модальную форму новое модальное окно
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            // закрываем через 4 сек
            thanksModal.remove();
            // возвращаем видимость предыдущему модальному окну
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // Slider

    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width; // например, 500px

    let slideIndex = 1;
    let offset = 0;

    // показываем общее количество слайдов
    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    }
    else {
        total.textContent = slides.length;
    }

    // отображаем номер текущего слайда
    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    }
    else {
        current.textContent = slideIndex;
    }

    // указываем ширину поля для слайдов в процентах (от ширины родителя)
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all'; // переход
    slidesWrapper.style.overflow = 'hidden'; // всё, что выходит за границы - скрываем

    slides.forEach(slide => {
        // указываем ширину слайдов равной ширине окошка для слайдов
        slide.style.width = width;
    })

    // нужно указать если у подчинённых элементов стоит absolute
    slider.style.position = 'relative';

    // создаём элемент для точек под слайдами
    const indicators = document.createElement('ol');

    // массив точек
    const dots = [];

    indicators.classList.add('carousel-indicators');
    // indicators.style.cssText = `
    //     position: absolute;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     z-index: 15;
    //     display: flex;
    //     justify-content: center;
    //     margin-right: 15%;
    //     margin-left: 15%;
    //     list-style: none;
    // `;

    // добавляем элемент к слайдеру
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        // создаём элемент для одной точки
        const dot = document.createElement('li');
        dot.classList.add('dot');
        // устанавливаем атрибут принадоежности точки к номеру слайда
        dot.setAttribute('data-slide-to', i + 1);
        // dot.style.cssText = `
        //     box-sizing: content-box;
        //     flex: 0 1 auto;
        //     width: 30px;
        //     height: 6px;
        //     margin-right: 3px;
        //     margin-left: 3px;
        //     cursor: pointer;
        //     background-color: #fff;
        //     background-clip: padding-box;
        //     border-top: 10px solid transparent;
        //     border-bottom: 10px solid transparent;
        //     opacity: .5;
        //     transition: opacity .6s ease;
        // `;

        if (i==0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);

        indicators.append(dot);
    }

    // при нажатии на стрелку влево
    next.addEventListener('click', () => {
        // для width убираем символы 'px' из конца
        if (offset == +width.slice(0, width.length-2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length-2);
        }
        // сдвиг по оси Х на размер отступа
        slidesField.style.transform = `translateX(-${offset}px)`;

        // если дошли в конец, то переходим в начало
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        // отображаем номер текущего слайда
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = slideIndex;
        }

        // для всех точек устанавливаем одинаковую непрозрачность
        dots.forEach(dot => dot.style.opacity = '.5');
        // для текущей точки устнавливаем более сильную непрозрачность
        dots[slideIndex - 1].style.opacity = 1;
    })

    // при нажатии на стрелку вправо
    prev.addEventListener('click', () => {
        // для width убираем символы 'px' из конца
        if (offset == 0) {
            offset = +width.slice(0, width.length-2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length-2);
        }
        // сдвиг по оси Х на размер отступа
        slidesField.style.transform = `translateX(-${offset}px)`;

        // если дошли до начала, то переходим в конец
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        // отображаем номер текущего слайда
        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        }
        else {
            current.textContent = slideIndex;
        }

        // для всех точек устанавливаем одинаковую непрозрачность
        dots.forEach(dot => dot.style.opacity = '.5');
        // для текущей точки устнавливаем более сильную непрозрачность
        dots[slideIndex - 1].style.opacity = 1;
    })

    dots.forEach(dot => {
        // при нажатии на любую точку
        dot.addEventListener('click', (e) => {
            // получаем атрибут номера слайда
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;

            offset = +width.slice(0, width.length-2) * (slideTo - 1);
            
            // сдвиг по оси Х на размер отступа
            slidesField.style.transform = `translateX(-${offset}px)`;


            // отображаем номер текущего слайда
            if (slideIndex < 10) {
                current.textContent = `0${slideIndex}`;
            }
            else {
                current.textContent = slideIndex;
            }

            // для всех точек устанавливаем одинаковую непрозрачность
            dots.forEach(dot => dot.style.opacity = '.5');
            // для текущей точки устнавливаем более сильную непрозрачность
            dots[slideIndex - 1].style.opacity = 1;
        })
    })

});