const movie = `
  CREATE TABLE IF NOT EXISTS movie (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    url_param varchar(50) NOT NULL UNIQUE,
    title varchar(100) NOT NULL,
    play_time smallint unsigned NOT NULL,
    age smallint unsigned NOT NULL,
    poster_url varchar(255) NOT NULL,
    movie_info json,
    CHECK (
        JSON_SCHEMA_VALID (
            '{
                "$schema": "https://json-schema.org/draft/2020-12/schema",
                "title": "Movie info",
                "description": "Various misc info about a movie",
                "type": "object",
                "properties": {
                    "original_title": {"type": "string"},
                    "year_recorded": {"type": "integer"},
                    "director": {"type": "string"},
                    "actors": {"type": "array", "items": {"type": "string"}},
                    "description": {"type": "string"},
                    "trailer": {"type": "string", "description": "A URL to play the movie trailer"},
                }
            }',
            movie_info
        )
    )
  );
`;

const genre = `
  CREATE TABLE IF NOT EXISTS genre (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    genre_name varchar(30) NOT NULL
  );
`;

const genreMovie = `
  CREATE TABLE IF NOT EXISTS genre_movie (
    genre_id int unsigned,
    movie_id int unsigned,
    PRIMARY KEY (genre_id, movie_id),
    FOREIGN KEY (genre_id) REFERENCES genre (id),
    FOREIGN KEY (movie_id) REFERENCES movie (id)
  );
`;

const event = `
  CREATE TABLE IF NOT EXISTS event (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    title varchar(30) NOT NULL,
    description text NOT NULL
  );
`;

const eventMovie = `
  CREATE TABLE IF NOT EXISTS event_movie (
    event_id int unsigned,
    movie_id int unsigned,
    PRIMARY KEY (event_id, movie_id),
    FOREIGN KEY (event_id) REFERENCES event (id),
    FOREIGN KEY (movie_id) REFERENCES movie (id)
  );
`;

const ticket = `
  CREATE TABLE IF NOT EXISTS ticket (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    name_one varchar(30) NOT NULL,
    name_many varchar(30) NOT NULL,
    price smallint unsigned NOT NULL
  );
`;

const auditorium = `
  CREATE TABLE IF NOT EXISTS auditorium (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    auditorium_name varchar(30) NOT NULL
  );
`;

const seat = `
  CREATE TABLE IF NOT EXISTS seat (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    auditorium_id int unsigned,
    seat_row int unsigned,
    seat_num int unsigned,
    FOREIGN KEY (auditorium_id) REFERENCES auditorium (id)
  );
`;

const screening = `
  CREATE TABLE IF NOT EXISTS screening (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    start_time datetime NOT NULL,
    movie_id int unsigned,
    auditorium_id int unsigned,
    FOREIGN KEY (movie_id) REFERENCES movie (id),
    FOREIGN KEY (auditorium_id) REFERENCES auditorium (id)
  );
`;

const user = `
  CREATE TABLE IF NOT EXISTS user (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    role varchar(20) NOT NULL,
    user_email varchar(100) UNIQUE NOT NULL,
    user_password varchar(255),
    first_name varchar(100),
    last_name varchar(100)
  );
`;

const reservation = `
  CREATE TABLE IF NOT EXISTS reservation (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    reservation_num char(6) UNIQUE NOT NULL,
    user_id int unsigned,
    screening_id int unsigned,
    FOREIGN KEY (user_id) REFERENCES user (id),
    FOREIGN KEY (screening_id) REFERENCES screening (id)
  );
`;

const resSeatScreen = `
  CREATE TABLE IF NOT EXISTS res_seat_screen (
    reservation_id int unsigned,
    seat_id int unsigned,
    screening_id int unsigned,
    PRIMARY KEY (seat_id, screening_id),
    FOREIGN KEY (reservation_id) REFERENCES reservation (id),
    FOREIGN KEY (seat_id) REFERENCES seat (id),
    FOREIGN KEY (screening_id) REFERENCES screening (id)
  );
`;
const reservationTicket = `
  CREATE TABLE IF NOT EXISTS reservation_ticket (
    id int unsigned AUTO_INCREMENT PRIMARY KEY,
    reservation_id int unsigned,
    ticket_id int unsigned,
    FOREIGN KEY (reservation_id) REFERENCES reservation (id),
    FOREIGN KEY (ticket_id) REFERENCES ticket (id)
  );
`;

export const allTables = [
  movie,
  genre,
  genreMovie,
  event,
  eventMovie,
  ticket,
  auditorium,
  seat,
  screening,
  user,
  reservation,
  resSeatScreen,
  reservationTicket,
];
