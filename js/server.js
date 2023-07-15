const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Парсинг данных формы
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Обработчик POST-запроса для отправки формы
app.post('/submit-form', (req, res) => {
    const phoneNumber = req.body.phone;
    // Здесь можно добавить код для отправки номера телефона на почту или в телеграм

    // Пример отправки номера телефона по электронной почте с помощью nodemailer
    const transporter = nodemailer.createTransport({
        // Здесь указываете настройки вашего почтового сервера
        service: 'Yandex',
        auth: {
            user: 'your-email@example.com', // Ваша электронная почта
            pass: 'your-password' // Пароль от вашей почты
        }
    });

    const mailOptions = {
        from: 'your-email@example.com', // Ваша электронная почта
        to: 'your-recipient@example.com', // Электронная почта получателя
        subject: 'Новый номер телефона',
        text: `Пользователь отправил новый номер телефона: ${phoneNumber}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Произошла ошибка при отправке почты');
        } else {
            console.log('Письмо успешно отправлено: ' + info.response);
            res.send('Форма успешно отправлена!');
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});