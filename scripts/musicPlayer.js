import { addZero} from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector(".audio");
    const audioImg = document.querySelector(".audio-img");
    const audioHeader = document.querySelector(".audio-header");
    const audioPlayer = document.querySelector(".audio-player");
    const audioNavigation = document.querySelector(".audio-navigation");
    const audioButtonPlay = document.querySelector(".audio-button__play");
    const audioTimePassed = document.querySelector(".audio-time__passed");
    const audioProgress = document.querySelector(".audio-progress");
    const audioProgressTiming = document.querySelector(".audio-progress__timing");
    const audioTimeTotal = document.querySelector(".audio-time__total");

    const playList = ['hello', 'flow', 'speed'];   // перечень файлов с музыкой
    let trackIndex = 0;  // первый индекс в масиве с музыкой

    const loadTreck = () => {
        const isPlayed = audioPlayer.paused;     //получаем текушее значение аудиоплеера  стоит ли он на паузе или нет
        const track = playList[trackIndex];//trackIndex если индекс 0 получим "hello"если 2 то плучим "speed"
        audioImg.src = `./audio/${track}.jpg`;  //  получаем картинки к треку
        audioHeader.textContent = track.toUpperCase();       // получаем подпись трека ,большими буквами
        audioPlayer.src = `./audio/${track}.mp3`;  //прописываем путь до трека

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };


    const prevTrack = () =>{
        if (trackIndex !== 0){       // если индекс не равен 0
                trackIndex--;
            } else {
                trackIndex = playList.length - 1;   //   проверяем сколько всего песен и переходим к следующему треку
            }
        loadTreck();
    }

    const nextTrack = () => {
        if (trackIndex === playList.length - 1) {   // если последний трек то переходим в начало
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTreck();
        
    };

    audioNavigation.addEventListener("click", event => {    // Для  target мы вызываем event 
        const target = event.target;
        if (target.classList.contains("audio-button__play")) {   // метод проверяет есть ли клас contains() если да то true
            audio.classList.toggle("play");    // проверяем есть ли клас play у элемента audio если есть уберет, если нет добавит
            audioButtonPlay.classList.toggle("fa-play");
            audioButtonPlay.classList.toggle("fa-pause");

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            const track = playList[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains("audio-button__prev")){
            prevTrack();
        }

        if (target.classList.contains("audio-button__next")){
            nextTrack();
        }
    });

    audioPlayer.addEventListener("ended", () => {
        nextTrack();
        audioPlayer.play();
    });
  
    audioPlayer.addEventListener ("timeupdate", () => { 
        const currentTime = audioPlayer.currentTime;     // получаем currentTime время которое меняется
        const duration = audioPlayer.duration;   // получаем duration  время которое не меняется столько сколько длится видио
        const progress =(currentTime / duration) * 100 ;   // меняем положение инпута для прокрутки видио при делении получаем дроное число , потому * 100

        audioProgressTiming.style.width = progress + '%';
        let minutePassed = Math.floor(currentTime / 60) || '0';    //узнаем сколько минут прошло (узнаем кольч мин)
        let secondsPassed = Math.floor(currentTime % 60) || '0';    //вычисляем остаток (узнаем кольч секунд, остаток от минуты)

        let minuteTotal = Math.floor(duration / 60) || '0';    //узнаем сколько минут прошло только уже 
        let secondsTotal = Math.floor(duration % 60) || '0';    // Math.floor   округляет значения

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        //эту строку можно переписать и так videoTimePassed.textContent = addZero(minutePassed) + ":" + addZero(secondsPassed);  // textContent выводим время на экран
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`; 
    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;     // определяем координаты импута
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    musicPlayerInit.stop = () => {  // при переходе на другую вкладку  звук на паузе
        audioPlayer.pause();
    };


};
 