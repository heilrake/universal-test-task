# Test Task

Є два хуки, які відповідають за логіку збереження даних та отримання даних з localStorage та хук для конвертації строки в pdf файл. 
Це відповідно `useConvertToPdf` та `useConversionHistory` для цих обох хуків написані unit test.

Також є невелика утіліта для конвертації з blob => string для також написаний невеликий unit test.
Є декілька компонентів. App.tsx - це головний компонент, HistoryList - це компонент з переліком збережених документів та PdfViewer який відповідає за відображення pdf у браузері.

Для запуску проекту викростовуємо команду `yarn run dev` для запуску тестів `yarn run test`

Посилання на відео роботи: https://drive.google.com/file/d/1BAVYQT8NOZ0iwk_FNYiS18PSXEEPoN6h/view?usp=sharing
