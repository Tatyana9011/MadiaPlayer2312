export const radioPlayerInit = () => {
    const radio = document.querySelector(".radio");
    const radioCoverImg=document.querySelector(".radio-cover__img");
    const radioNavigation=document.querySelector(".radio-navigation");
    const radioHeaderBig=document.querySelector(".radio-header__big");
    const radioItem=document.querySelectorAll(".radio-item");
    const radioStop = document.querySelector(".radio-stop");
    const radioVolume = document.querySelector(".radio-volume"); 
    const radioVolumeOff = document.querySelector(".radio-volume-off"); 

    const audio = new Audio();    // создаем новый обьект 
    audio.type = "audio/aac";     // добавляем в обьект тип

    let prevVolume = audio.volume;      //получаем для прерывания звука

    radioStop.disabled = true;     // блокируем кнопку плей

    const changeIconPlay = () => {            // меняем иконки при запуске и остановке
        if (audio.paused) {
            radio.classList.remove("play");    // удаляем анимацию с  плеера когда он выключен
            radioStop.classList.add("fa-play");
            radioStop.classList.remove("fa-pause");
        } else {
            radio.classList.add("play");    // добавляем анимацию для плеера когда он включается
            radioStop.classList.add("fa-pause");
            radioStop.classList.remove("fa-play");
        }
    };

    /* audioNavigation.addEventListener("click", event => {    // Для  target мы вызываем event 
        const target = event.target;
        if (target.classList.contains("audio-button__play")){   // метод проверяет есть ли клас contains() если да то true
            audio.classList.toggle("play");    // проверяем есть ли клас play у элемента audio если есть уберет, если нет добавит
            audioButtonPlay.classList.toggle("fa play");
            audioButtonPlay.classList.toggle("fa pause");
        }
        
    }) */

     const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove("select")); //  убираем серый ободок вокруг        
        elem.classList.add("select");
    };

     const changeValue = () => {       //ф- вычисления звука
        const valueVolumeRadio = radioVolume.value;      // получаем значение от импуту value
        audio.volume = valueVolumeRadio / 100;
        audio.muted = false;
    };  

    radioNavigation.addEventListener('change', event => {   // с помощью event    обращаемся к необходимому target 
        const target = event.target;
        const parrent = target.closest(".radio-item");  // closest ищет родительский класс выше по леснице пока не найдет нужный
        selectItem(parrent);
        const title = parrent.querySelector(".radio-name").textContent;   //textContent  вытягиваем именно текст
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector(".radio-img").src;
        radioCoverImg.src = urlImg;
        radioStop.disabled = false;      // когда плеер запушен кнопка плей становится активной
        audio.src = target.dataset.radioStantion;     // прописываем путь к радиостанции 
        audio.play();
        changeIconPlay();    // применяем смену иконок
    });

    radioStop.addEventListener("click", () => {   // ф возможности вкл и выкл 
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener("input", changeValue);

    audio.addEventListener("volumechange", () => {
        radioVolume.value = Math.round(audio.volume * 100);
        }); 
    
    radioVolumeOff.addEventListener('click', () => {
        audio.muted = !audio.muted;
    });


    radioPlayerInit.stop = () => {   // при переходе на другую вкладку  звук на паузу
        audio.pause();
        changeIconPlay();
    }
    
};
