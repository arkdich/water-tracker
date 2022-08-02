### [Read in English](/arkdich/water-tracker/blob/main/README.en.md)
# About
PWA для ослеживания количества выпитой воды с детальной статистикой

- написал на typescript
- стилизовал с scss
- собрал вебпаком
- использовал сервис воркеры для кеширования и работы в офлайне
- данные хранятся в [IndexedDb](https://github.com/dexie/Dexie.js), график рендерится при помощи [Chart.js](https://github.com/chartjs/Chart.js)


## [Онлайн демка](https://arkdich.github.io/water-tracker/)

# Features
- установка, смена и заполнение цели

  ![](https://i.imgur.com/HsgKTRM.gif)
  
- просмотр статистики за неделю
  
  ![](https://i.imgur.com/5HPLyO1.gif)
  
 # Installation
 Склонируйте репозиторий и установите зависимости
 ```
 git clone git@github.com:arkdich/water-tracker.git
 ```
 ```
 npm i
 ```
 Запустите dev сервер
 ```
 npm start
 ```