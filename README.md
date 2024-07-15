# Задание 1
При выполнении задания, с учетом полного отсутсвия опыта на react, выбрал Webpack Federation.

Была попытка сделать все на single-spa, но это было гораздо сложнее.

Разделил микрофронты по основным задачам приложения, с учетом связанности компонентов.

- Главный модуль - содержит в себе основной компонент APP, все что нужно для отображения страницу, контекст пользователя и служебный компонент ProtectedRoute.
- m_api - содержит в себе логику запросов на бэк, по сути являясь BFF.
- m_auth - содержит в себе логику авторизации и тоже является BFF.
- m_list - содержит в себе компонент карточки и списка карточек.
- m_popup - содержит в себе все popup'ы и их контексты.
- m_register - содержит в себе компоненты для входа в систему и регистрацию.

В качестве стейта использовал React.Context тк он проще чем redux.

## Запуск

Для запуска перейти в папку `frontend` и выполнить команду `npm start`.

# Задание 2

## Описание архитектуры

[Архитектура](./Задание_2.drawio.xml.drawio) представляет собой набор микросервисов и микрофронтов, которые отделены от пользователя Proxy (Nginx).

## Proxy

Прокси отвечает за установку безопасного соединения с пользователем, маршрутизацию запросов, отдачи статики.

## Front

Фронт представляет собой набор микрофронтендов, разделенных по ыункционалу пользователя:
- Профиль - реализует логику работы карточки пользователя
- Заказы - реализует логику работы с заказами
- Услуги - реализует логику работы с услугами
- Аукционы - реализует логику работы с аукционами

## API Gateway

Основная точка входа в приложение, маршрутизует запросы, подписывает запросы токеном, ограничивает нагрузку на сервисы.
Может использоваться для масштабирования отдельных сервисов.

## Back

Бэк представляет собой набор микросервисов со связанными с ними СУБД. По мере необходимости, микросервисы могут масштабироваться,
возможно добавление кеша.
- Пользователи - реализует все функции работы с пользователями. При введении еще одного слоя абстрации, можно внедрить внешнюю авторизацию через
AD и Keycloak.
- Заказы - реализует все функции работы с заказами. Связан с пользователями через ID пользователя.
- Услуги - реализует все функции работы с услугами. Связан с пользователями через ID пользователя.
- Аукционты - реализует все функции работы с аукционтами. Связан с пользователями через ID пользователя.
- Товары - реализует все функции работы с товарами.
- Платежные операции - реализует все функции работы с сплатежными операциями. Связан с обработчиками платежей через транзакции.
- Апелляции - реализует все функции работы с апелляциями. Связан с пользователями через ID пользователя. Используется администраторами.
- Техподдержка - реализует все функции работы с техподдержкой. Связан с пользователями через ID пользователя. Используется сотрудниками тех поддержки.
- Нотификации - реализует все функции работы с уведомлениями пользователей. Связан с пользователями через ID пользователя.
