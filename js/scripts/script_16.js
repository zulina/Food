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
});