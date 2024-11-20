const viewAllSeats = `
  CREATE OR REPLACE VIEW view_all_seats AS
  SELECT m.title, s2.id AS screeningId, m.poster_url AS poster, m.url_param AS paramUrl,
  concat((case when (cast(s2.start_time as date) = curdate()) then 'idag' else dayname(s2.start_time) end),
    ' ', date_format(s2.start_time, '%d %b')) AS date,
  concat(date_format(s2.start_time, '%H:%i'), ' - ', date_format((s2.start_time + interval m.play_time minute), '%H:%i')) AS time,
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

const viewTicketBookingInfo = `
  CREATE OR REPLACE VIEW vy_biljettBokningsInfo AS
  SELECT r.reservation_num AS reservationNumber,
  count(t.id) AS totalTicket, sum(t.price) AS totalPrice,
  (SELECT group_concat(concat(ticket_summary.ticket_count, ' ',(case when (ticket_summary.ticket_count = 1) then ticket_summary.ticket_name when (ticket_summary.ticket_name = 'Vuxen') then 'Vuxna' when (ticket_summary.ticket_name = 'Senior') then 'Seniorer' else ticket_summary.ticket_name end)) separator ', ')
  FROM(SELECT count(t2.id) AS ticket_count, t2.ticket_name AS ticket_name
  FROM(bondkatt.reservation_ticket rt2
  JOIN bondkatt.ticket t2 on
  ((t2.id = rt2.ticket_id)))
  WHERE
  (rt2.reservation_id = r.id)
  GROUP by
  t2.ticket_name) ticket_summary) AS ticketDetails
  FROM
    ((bondkatt.reservation r
  FROM bondkatt.reservation_ticket rt on
    ((rt.reservation_id = r.id)))
  FROM bondkatt.ticket t on
    ((t.id = rt.ticket_id)))
  GROUP by
    r.reservation_num;
`;

const viewBookingHistory = `
CREATE OR REPLACE VIEW bondkatt.vy_bokningsHistorik AS
SELECT
    r.reservation_num AS reservationNum,
    r.screening_id AS screeningId,
    r.user_id AS userId,
    s.start_time AS startTime,
    date_format(s.start_time, '%Y-%m-%d') AS startDate,
    m.title AS title,
    m.poster_url AS posterUrl,
    m.url_param AS paramUrl
FROM
    ((bondkatt.reservation r
JOIN bondkatt.screening s on
    ((r.screening_id = s.id)))
JOIN bondkatt.movie m on
    ((s.movie_id = m.id)))
ORDER by
    s.start_time desc;
`;

const viewBookingInfo = `
CREATE OR REPLACE VIEW bondkatt.vy_filmBokningsInfo AS
SELECT
    r.reservation_num AS reservationNumber,
    m.title AS title,
    m.play_time AS playTime,
    m.poster_url AS posterUrl,
    a.auditorium_name AS auditriumName,
    date_format(s.start_time, '%Y-%m-%d') AS startDate,
    date_format(s.start_time, '%H:%i') AS startTime,
    date_format((s.start_time + interval m.play_time minute), '%H:%i') AS time,
    concat(date_format(s.start_time, '%H:%i'), ' - ', date_format((s.start_time + interval m.play_time minute), '%H:%i')) AS timeRange
FROM
    (((bondkatt.reservation r
JOIN bondkatt.screening s on
    ((s.id = r.screening_id)))
JOIN bondkatt.movie m on
    ((m.id = s.movie_id)))
JOIN bondkatt.auditorium a on
    ((a.id = s.auditorium_id)));
`;

const viewMovieDetails = `
CREATE OR REPLACE VIEW bondkatt.vy_filmdetaljer AS
SELECT
    m.id AS movieId,
    m.title AS title,
    m.url_param AS paramUrl,
    m.play_time AS playTime,
    m.poster_url AS posterUrl,
    m.age AS age,
    m.movie_info AS movieInfo,
    (
    SELECT
        json_arrayagg(unique_genres.genre_name)
    FROM
        (
        SELECT
            g.genre_name AS genre_name
        FROM
            (bondkatt.genre g
        JOIN bondkatt.genre_movie gm on
            ((gm.genre_id = g.id)))
        WHERE
            (gm.movie_id = m.id)
        GROUP by
            g.genre_name) unique_genres) AS genres,
    (case
        when (count(s.id) = 0) then json_array()
        else json_arrayagg(json_object('screeningId', s.id, 'timeRange', concat(date_format(s.start_time, '%H:%i'), '-', date_format((s.start_time + interval m.play_time minute), '%H:%i')), 'dayName',(case when (cast(s.start_time as date) = curdate()) then 'idag' else dayname(s.start_time) end), 'screeningDate', date_format(s.start_time, '%d %b')))
    end) AS screeningDetails
FROM
    (bondkatt.movie m
left JOIN bondkatt.screening s on
    (((s.movie_id = m.id)
        and (s.start_time > (now() + interval 75 minute)))))
GROUP by
    m.id;
`;

const viewReservedSeats = `
CREATE OR REPLACE VIEW bondkatt.vy_oReserveradePlatser AS
SELECT
    s2.id AS screeningId,
    a.auditorium_name AS auditoriumName,
    m.title AS movieTitle,
    s2.start_time AS screeningTime,
    count(s.id) AS totalSeats,
    json_arrayagg(json_object('seatId', s.id, 'row', s.seat_row, 'number', s.seat_num)) AS seats
FROM
    ((((bondkatt.seat s
JOIN bondkatt.auditorium a on
    ((s.auditorium_id = a.id)))
JOIN bondkatt.screening s2 on
    ((s2.auditorium_id = a.id)))
JOIN bondkatt.movie m on
    ((m.id = s2.movie_id)))
left JOIN bondkatt.res_seat_screen rss on
    (((rss.seat_id = s.id)
        and (rss.screening_id = s2.id))))
WHERE
    (rss.seat_id is null)
GROUP by
    s2.id;
`;

const viewSeatsBookingInfo = `
CREATE OR REPLACE VIEW bondkatt.vy_platserBokningsInfo AS
SELECT
    r.reservation_num AS reservationNumber,
    a.auditorium_name AS auditoriumName,
    count(s.seat_num) AS totalSeats,
    json_arrayagg(json_object('seatId', s.id, 'row', s.seat_row, 'number', s.seat_num)) AS seats
FROM
    (((bondkatt.res_seat_screen rss
JOIN bondkatt.reservation r on
    ((r.id = rss.reservation_id)))
JOIN bondkatt.seat s on
    ((s.id = rss.seat_id)))
JOIN bondkatt.auditorium a on
    ((a.id = s.auditorium_id)))
GROUP by
    r.reservation_num,
    a.auditorium_name;
`;

const viewReservationDetails = `
CREATE OR REPLACE VIEW bondkatt.vy_reservationDetails AS
SELECT
    bondkatt.vpbi.reservationNumber AS reservationNumber,
    bondkatt.vfbi.title AS title,
    bondkatt.vfbi.startDate AS startDate,
    bondkatt.vfbi.timeRange AS timeRange,
    bondkatt.vpbi.auditoriumName AS auditoriumName,
    bondkatt.vpbi.seats AS seats,
    bondkatt.vbbi.ticketDetails AS ticketDetails,
    bondkatt.vbbi.totalPrice AS totalPrice,
    bondkatt.vfbi.posterUrl AS posterUrl
FROM
    ((bondkatt.vy_platserBokningsInfo vpbi
JOIN bondkatt.vy_biljettBokningsInfo vbbi on
    ((bondkatt.vpbi.reservationNumber = bondkatt.vbbi.reservationNumber)))
JOIN bondkatt.vy_filmBokningsInfo vfbi on
    ((bondkatt.vpbi.reservationNumber = bondkatt.vfbi.reservationNumber)));
`;

const viewReseverdSeats = `
CREATE OR REPLACE VIEW bondkatt.vy_reserverdSeats AS
SELECT
    rss.screening_id AS screeningId,
    a.auditorium_name AS auditoriumName,
    m.title AS movieTitle,
    s2.start_time AS screeningTime,
    count(s.seat_num) AS totalSeats,
    json_arrayagg(json_object('seatId', s.id, 'row', s.seat_row, 'number', s.seat_num)) AS seats
FROM
    ((((bondkatt.res_seat_screen rss
JOIN bondkatt.seat s on
    ((rss.seat_id = s.id)))
JOIN bondkatt.auditorium a on
    ((s.auditorium_id = a.id)))
JOIN bondkatt.screening s2 on
    ((rss.screening_id = s2.id)))
JOIN bondkatt.movie m on
    ((m.id = s2.movie_id)))
GROUP by
    rss.screening_id,
    a.auditorium_name,
    m.title;
`;

export const allViews = [
  viewAllSeats,
  viewTicketBookingInfo,
  viewBookingHistory,
  viewBookingInfo,
  viewMovieDetails,
  viewReservedSeats,
  viewSeatsBookingInfo,
  viewReservationDetails,
  viewReseverdSeats,
];
