import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';

const playerBtn = document.querySelectorAll(".player-btn");    //вытягиваем все классы .player-btn для дальнейших изменений
const playerBlock = document.querySelectorAll(".player-block"); 
const temp = document.querySelector (".temp");       // получаем один .temp 

const deactivationPlayer = () => {     // функция для того что б в списке было только одно окно а другие деактивируем
    temp.style.display = "none"; // убираем с екрана (скрываем этот блок)
    playerBtn.forEach(item => item.classList.remove ("active"));   //перебираем все элементы item - кнопки убираем клас active
    playerBlock.forEach(item =>  item.classList.remove ("active"));//перебираем все элементы item - блоки убираем клас active
    radioPlayerInit.stop();    // при переходе на другую вкладку видио и звук на паузу
    videoPlayerInit.stop();
    musicPlayerInit.stop();
};

playerBtn.forEach((btn, i) => btn.addEventListener("click", () => {   // для выведения всех блоков перебераем методом
                                                                      // forEach и навешиваем слушатель собитий при клике
    deactivationPlayer();    //приминили функцию
    btn.classList.add("active");        // к кнопкам  btn добавили  класс - active
    playerBlock[i].classList.add("active");     //обращаемся playerBlock[i] по индикси и тоже добавляем клас - active
}));


radioPlayerInit();
musicPlayerInit();
videoPlayerInit();


