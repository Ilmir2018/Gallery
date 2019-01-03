"use strict";

const gallery = {
    settings: {
        //Селекторы html
        previewSelector: '.mySuperGallery',
            oppendImageWrapperClass: 'galleryWrapper',
            oppendImageClass: 'galleryWrapper__image',
            oppendImageScreenClass: 'galleryWrapper__screen',
            oppendImageCloseBtnClass: 'galleryWrapper__close',
            oppendImageCloseBtnSrc: 'images/gallery/close.png', //Ссылка до картинки закрыть
        oppendImageIfNotFounImage: 'galleryWrapper__notimage', //Класс для подгрузки картинки error
        oppendImageIfNotFounImageSrc: 'images/gallery/error.jpg' //Путь до картинки error
    },

    init(userSettings = {}){
        //Перебиваем настройки и заменяем их на пользовательские
        Object.assign(this.settings, userSettings);
         document.querySelector(this.settings
             .previewSelector)//Ищем главный селектор в котором лежат остальные и говорим ему
            .addEventListener('click', event => this.containerClickEventHandler(event));//что при клике, - вызывай метод..;
    },

    /**
     * Функция принимает событие и обрабатывает его
     * @param event Проверяем куда был произведён клик, если не по картинке, ничего не делаем.
     */

    containerClickEventHandler(event) {
        if (event.target.tagName !== 'IMG'){ //Возвращает ложь и ничего не делает если клик произведён не по картинке
            return;
        }
        this.openImage(event.target.dataset.full_image_url);//Вызываем метод, который открывает картинку
        // по определённому пути
    },

    /**
     * Метод открывает картинку по адресу src
     * @param src
     */
    openImage(src) {
        this.getScreenContainer().querySelector(`.${this.settings.oppendImageClass}`).src = src;//Вызываем метод,
        // который возвращает контейнер для открытой картинки
    },


    /**
     * Метод ищет, есть ли вообще контейнер который запрашивается, если нет, создаёт его и возвращает
     * @returns {*} Контейнер
     */

    getScreenContainer() {
        //Ищем есть ли нужный нам див уже.
        const galleryWrapperElement = document.querySelector(`.${this.settings.oppendImageWrapperClass}`);
        //Если этот элемент есть, просто возвращаем его.
        if (galleryWrapperElement){
            return galleryWrapperElement;
        }
        //Если нет возвращаем метод, который его создаст
        return this.createScreenContainer();
    },

    /**
     * Метод создаёт контейнер, если его не существует и подгружает его при клике
     * @returns {HTMLDivElement}
     */

    createScreenContainer() {
        //Создаём див.
        const galleryWrapperElement = document.createElement('div');
        //Доюавляем созданному элементу класс.
        galleryWrapperElement.classList.add(this.settings.oppendImageWrapperClass);
        //Создаём див.
        const  galleryScreenElement = document.createElement('div');
        //Доюавляем созданному элементу класс.
        galleryScreenElement.classList.add(this.settings.oppendImageScreenClass);
        //Помещаем второё див в первый.
        galleryWrapperElement.appendChild(galleryScreenElement);
        //Создание картинки для закрытия большой картинки
        const closeImageElement = new Image();
        //Доюавляем созданному элементу класс.
        closeImageElement.classList.add(this.settings.oppendImageCloseBtnClass);
        //Ссылку на эту картинку задаём из настроек.
        closeImageElement.src = this.settings.oppendImageCloseBtnSrc;
        //При нажатии на крестик мы вызываем метод close().
        closeImageElement.addEventListener('click', () => this.close());
        //Добавляем крестик в главный див.
        galleryWrapperElement.appendChild(closeImageElement);
        //Создание картинки для большого изображения.
        const image = new Image();
        //Добавляем ему класс из настроек.
        image.classList.add(this.settings.oppendImageClass);
        //Помещаем изображение в главный див.
        galleryWrapperElement.appendChild(image);
        //Вызываем функцию замены картинки в случае её отсутствия
        image.onerror = () => {image.src = this.settings.oppendImageIfNotFounImageSrc};
        //Добавляем главный элемент в боди.
        document.body.appendChild(galleryWrapperElement);
        //Возвращаем див с элементами.
        return galleryWrapperElement;
    },

    /**
     * Метод удаляет подгружаемый контейнер если пользователь  нажимает на крестик
     */

    close() {
        document.querySelector(`.${this.settings.oppendImageWrapperClass}`).remove();
    }
};
//Настройки, которые мы предопределили можно поменять при вызове метода init объекта gallery.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});







