const errorConfig = {
  incorrect_data_id: 'Переданы некорректные данные пользователя при поиске по _id!',
  incorrect_data_user: 'Переданы некорректные данные пользователя!',
  incorrect_data_already_registered: 'Пользователь с указанным email уже существует!',
  incorrect_data_user_update: 'Переданы некорректные данные пользователя при обновлении профиля!',
  unauthorized_error_credentials: 'Неправильные почта или пароль!',
  unauthorized_error: 'Необходима авторизация',
  server_error: 'Что то пошло не так!',
  url_error: 'Формат ссылки не верный!',
  email_error: 'Формат email не верный!',
  movie_create_error: 'Переданны некорректные данные при создани создании карточки фильма!',
  movie_error_id: 'Переданны некорректный _id при попытке удаление фильма!',
  not_found_error: 'Ресурс не найден!',
  movie_forbidden_error: 'Фильм вам не принадлежит!',
  movie_is_delete: 'Фильм удалён успешно!',
};

module.exports = errorConfig;
