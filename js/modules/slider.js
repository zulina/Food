function slider() {

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

    // добавляем элемент к слайдеру
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        // создаём элемент для одной точки
        const dot = document.createElement('li');
        dot.classList.add('dot');
        // устанавливаем атрибут принадоежности точки к номеру слайда
        dot.setAttribute('data-slide-to', i + 1);

        if (i==0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);

        indicators.append(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }

    // при нажатии на стрелку влево
    next.addEventListener('click', () => {
        // для width убираем символы 'px' из конца
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
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
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
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

            offset = deleteNotDigits(width) * (slideTo - 1);
            
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

}

module.exports = slider;