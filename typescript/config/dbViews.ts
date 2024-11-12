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

export const allViews = [viewAllSeats];
