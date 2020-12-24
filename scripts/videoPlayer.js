import { addZero} from './supScript.js';

export const videoPlayerInit = () => {

    const videoPlayer = document.querySelector(".video-player");
    const videoButtonPlay = document.querySelector(".video-button__play");
    const videoButtonStop = document.querySelector(".video-button__stop");
    const videoTimePassed = document.querySelector(".video-time__passed");
    const videoProgress = document.querySelector(".video-progress");
    const videoTimeTotal = document.querySelector(".video-time__total");
    const videoVolume = document.querySelector(".video-volume");
    const videoFullscreen = document.querySelector(".video-fullscreen");
    const faVolumeOff = document.querySelector(".fa-volume-off"); 

    videoFullscreen.addEventListener("click", () => {    //видио на весь экран
        console.log(videoPlayer);
        videoPlayer.requestFullscreen();
    });

    videoPlayer.addEventListener('fullscreenchange', () => {
        if (document.fullscreen) {
            videoPlayer.controls = true;
        } else {
            videoPlayer.controls = false;
        }
    });

    const toggleIcon = () => {     // функция действий при включения и выключения видио   (меняем иконки )
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove("fa-pause");
            videoButtonPlay.classList.add("fa-play");
        } else {
            videoButtonPlay.classList.add("fa-pause");
            videoButtonPlay.classList.remove("fa-play");
        }
    };

    const togglePlay = event => {    // функция действий при включения и выключения видио
        event.preventDefault();     // блокируем  тогл
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const stopPlay = () => {   // при нажатии на иконку паузы видио возвращается в начало и обнумяется время
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    const changeValue = () => {       //ф- вычисления звука
        const valueVolume = videoVolume.value;      // получаем значение от импуту value
        videoPlayer.volume = valueVolume / 100;
        audio.muted = false;
    };

    videoPlayer.addEventListener("click", togglePlay);    //видиоплеер запускает выдио при клике на картинку плюс функция вкл и выкл togglePlay
    videoButtonPlay.addEventListener("click", togglePlay);     //при клике на кнопку видио запускается и остан

/* "    videoPlayer.addEventListener("          FullScreen", () => {    // блокируем наш тогл
        if ("FullScreen") {
            videoPlayer.removeEventListener("click", togglePlay);
        } else {
            videoPlayer.addEventListener("click", togglePlay);
        }
    }); */

    videoPlayer.addEventListener("play", toggleIcon);         //срабатывание функции при нажатии кнопки play
    videoPlayer.addEventListener("pause", toggleIcon);         //срабатывание функции при нажатии кнопки pause
    videoButtonStop.addEventListener("click", stopPlay);

    videoPlayer.addEventListener("timeupdate", () => {   // функция вычисления значения времени
        const currentTime = videoPlayer.currentTime;     // получаем currentTime время которое меняется
        const duration = videoPlayer.duration;   // получаем duration  время которое не меняется столько сколько длится видио

        videoProgress.value = (currentTime / duration) * 100 ;   // меняем положение инпута для прокрутки видио при делении получаем дроное число , потому * 100

        let minutePassed = Math.floor(currentTime / 60);    //узнаем сколько минут прошло (узнаем кольч мин)
        let secondsPassed = Math.floor(currentTime % 60);    //вычисляем остаток (узнаем кольч секунд, остаток от минуты)

        let minuteTotal = Math.floor(duration / 60);    //узнаем сколько минут прошло только уже 
        let secondsTotal = Math.floor(duration % 60);    // Math.floor   округляет значения

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        //эту строку можно переписать и так videoTimePassed.textContent = addZero(minutePassed) + ":" + addZero(secondsPassed);  // textContent выводим время на экран
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });


    videoProgress.addEventListener("input", () => {    // делаем возможним прокручивать перетаскиванием бугунка
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        videoPlayer.currentTime = (value * duration) / 100;     // обращаемся к плееру что мы меняем разположение значка и меняем время
    });

    videoVolume.addEventListener("input", changeValue);

    videoPlayer.addEventListener("volumechange", () => {
        videoVolume.value = Math.round(videoPlayer.volume * 100);
    });
    
    
    faVolumeOff.addEventListener('click', () => {  // удаляем звук при нажатии на кнопку
        videoPlayer.muted = !videoPlayer.muted;
    });   /* videoPlayer.controls = true; */   // полоса прокрутки от браузера

    videoPlayerInit.stop = () => {   // при переходе на другую вкладку видио и звук на паузу
        videoPlayer.pause();
        toggleIcon();
    };

};
  
