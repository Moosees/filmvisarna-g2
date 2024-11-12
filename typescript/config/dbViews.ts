const viewAllSeats = `
  CREATE OR REPLACE VIEW view_all_seats AS
  SELECT m.title, s2.id AS screeningId, m.poster_url AS poster, 
  concat((case when (cast(s2.start_time as date) = curdate()) then 'idag' else dayname(s2.start_time) end), 
    ' ', date_format(s2.start_time, '%d %b')) AS date,
  concat(date_format(s2.start_time, '%H:%i'), ' - ', date_format((s2.start_time + interval m.play_time minute), '%H:%i')) AS time,
  (SELECT json_arrayagg(json_object('seatId',s.id ,'row', s.seat_row,'number', s.seat_num, 'free', IF(rss.reservation_id IS NULL, TRUE, FALSE)))
  FROM seat s
  LEFT JOIN res_seat_screen rss ON (s.id = rss.seat_id AND rss.screening_id = screeningId)
  WHERE s.auditorium_id = s2.auditorium_id) AS seats,
  (SELECT json_arrayagg(json_object('ticketId', t.id, 'name', t.name_one, 'price', t.price))
  FROM ticket t) AS tickets
  FROM screening s2
  JOIN movie m ON m.id = s2.movie_id
  JOIN auditorium a ON a.id = s2.auditorium_id; 
`;

const viewMovieDetails = `
  CREATE OR REPLACE VIEW view_movie_details AS
  SELECT m.id AS movieId, m.title AS title, m.alternate_title AS altTitle, m.url_param AS paramUrl, 
  m.play_time AS playTime, m.poster_url AS posterUrl, m.age AS age, m.movie_info AS movieInfo,
  ( SELECT json_arrayagg(unique_genres.genre_name) FROM
    ( SELECT g.genre_name AS genre_name
    FROM (genre g
    JOIN genre_movie gm ON ((gm.genre_id = g.id)))
    WHERE (gm.movie_id = m.id)
    GROUP BY g.genre_name)
  unique_genres) AS genres,
  (CASE
    WHEN (count(s.id) = 0) THEN json_array()
    ELSE json_arrayagg(json_object(
      'screeningId', s.id, 'timeRange', 
      concat(date_format(s.start_time, '%H:%i'), '-', date_format((s.start_time + interval m.play_time minute), '%H:%i')),
      'dayName',(case when (cast(s.start_time as date) = curdate()) then 'idag' else dayname(s.start_time) END),
      'screeningDate', date_format(s.start_time, '%d %b')))
  END) AS screeningDetails
  FROM (movie m
  LEFT JOIN screening s ON (((s.movie_id = m.id) AND (s.start_time > (now() + interval 15 minute)))))
  GROUP BY m.id;
`;

export const allViews = [viewAllSeats, viewMovieDetails];
