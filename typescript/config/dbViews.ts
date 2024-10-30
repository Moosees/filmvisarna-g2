const viewAllSeats = `
  CREATE OR REPLACE VIEW view_all_seats AS
  SELECT m.title, s2.start_time AS startTime, s2.id AS screeningId, m.poster_url AS poster, 
  (SELECT json_arrayagg(json_object('seatId',s.id ,'row', s.seat_row,'number', s.seat_num, 'free', IF(rss.reservation_id IS NULL, TRUE, FALSE)))
  FROM seat s
  LEFT JOIN res_seat_screen rss ON (s.id = rss.seat_id AND rss.screening_id = screeningId)
  WHERE s.auditorium_id = s2.auditorium_id) AS seats,
  (SELECT json_arrayagg(json_object('ticketId', t.id, 'name', t.ticket_name, 'price', t.price))
  FROM ticket t) AS tickets
  FROM screening s2
  JOIN movie m ON m.id = s2.movie_id
  JOIN auditorium a ON a.id = s2.auditorium_id; 
`;

export const allViews = [viewAllSeats];
