const genres = `
  INSERT INTO genre (genre_name) VALUES
  ('action'),
  ('rysare'),
  ('fantasy'),
  ('komedi'),
  ('skräck'),
  ('drama'),
  ('dokumentär'),
  ('science fiction');
`;

const tickets = `
  INSERT INTO ticket (name_one, name_many, price) VALUES
  ('vuxen', 'vuxna', 140),
  ('barn', 'barn', 80),
  ('senior', 'senierer', 120);
`;

const auditoriums = `
  INSERT INTO auditorium (auditorium_name) VALUES
  ('stora salongen'),
  ('lilla salongen');
`;

const seatsStora = `
  INSERT INTO seat (auditorium_id, seat_row, seat_num) VALUES
  (1, 1, 1), (1, 1, 2), (1, 1, 3), (1, 1, 4),
  (1, 1, 5), (1, 1, 6), (1, 1, 7), (1, 1, 8),
  (1, 2, 1), (1, 2, 2), (1, 2, 3), (1, 2, 4),
  (1, 2, 5), (1, 2, 6), (1, 2, 7), (1, 2, 8), (1, 2, 9),
  (1, 3, 1), (1, 3, 2), (1, 3, 3), (1, 3, 4), (1, 3, 5),
  (1, 3, 6), (1, 3, 7), (1, 3, 8), (1, 3, 9), (1, 3, 10),
  (1, 4, 1), (1, 4, 2), (1, 4, 3), (1, 4, 4), (1, 4, 5),
  (1, 4, 6), (1, 4, 7), (1, 4, 8), (1, 4, 9), (1, 4, 10),
  (1, 5, 1), (1, 5, 2), (1, 5, 3), (1, 5, 4), (1, 5, 5),
  (1, 5, 6), (1, 5, 7), (1, 5, 8), (1, 5, 9), (1, 5, 10),
  (1, 6, 1), (1, 6, 2), (1, 6, 3), (1, 6, 4), (1, 6, 5),
  (1, 6, 6), (1, 6, 7), (1, 6, 8), (1, 6, 9), (1, 6, 10),
  (1, 7, 1), (1, 7, 2), (1, 7, 3), (1, 7, 4),
  (1, 7, 5), (1, 7, 6), (1, 7, 7), (1, 7, 8),
  (1, 7, 9), (1, 7, 10), (1, 7, 11), (1, 7, 12),
  (1, 8, 1), (1, 8, 2), (1, 8, 3), (1, 8, 4),
  (1, 8, 5), (1, 8, 6), (1, 8, 7), (1, 8, 8),
  (1, 8, 9), (1, 8, 10), (1, 8, 11), (1, 8, 12);
`;

const usersMember = `
  INSERT INTO user (role, user_email, user_password, first_name, last_name) VALUES
  ('member', 'yves@maila.se', '123', 'Yves', 'Bananums'),
  ('member', 'gertrude@gertrude.org', '123', 'Gertrude', 'Bananums'),
  ('member', 'johan.olsson@exempel.se', '123', 'Johan', 'Olsson'),
  ('member', 'elin.persson@domän.se', '123', 'Elin', 'Persson'),
  ('member', 'mats.nilsson@webbpost.se', '123', 'Mats', 'Nilsson'),
  ('member', 'sara.karlsson@tjänst.net', '123', 'Sara', 'Karlsson'),
  ('member', 'emil.svensson@minemail.org', '123', 'Emil', 'Svensson'),
  ('member', 'linda.larsson@domän.org', '123', 'Linda', 'Larsson'),
  ('member', 'oskar.johansson@snabbmail.se', '123', 'Oskar', 'Johansson'),
  ('member', 'kristin.andersson@online.se', '123', 'Kristin', 'Andersson'),
  ('member', 'anton.eriksson@brevlåda.com', '123', 'Anton', 'Eriksson');
`;

const usersVisitor = `
  INSERT INTO user (role, user_email) VALUES
  ('visitor', 'sofie.nilsson@mittdomän.se'),
  ('visitor', 'viktor.holm@webbmail.net'),
  ('visitor', 'julia.fredriksson@företag.org'),
  ('visitor', 'isak.lindgren@affär.net'),
  ('visitor', 'agnes.söderberg@tjänst.com'),
  ('visitor', 'linnea.hansson@kontor.com'),
  ('visitor', 'lucas.berglund@nyemail.org'),
  ('visitor', 'hanna.nyström@snabbpost.net'),
  ('visitor', 'mia.fransson@domän.net'),
  ('visitor', 'gustav.sandberg@företag.com'),
  ('visitor', 'ida.wikström@minemail.net'),
  ('visitor', 'henrik.lund@webbtjänst.com'),
  ('visitor', 'emma.berg@mejla.org'),
  ('visitor', 'adam.pettersson@domänmail.com'),
  ('visitor', 'alice.sundström@info.se'),
  ('visitor', 'leo.ahlgren@företagsmail.org'),
  ('visitor', 'klara.ström@tjänst.org'),
  ('visitor', 'max.blom@webbemail.net'),
  ('visitor', 'vilma.andreasson@internetmail.com'),
  ('visitor', 'oskar.dahl@affärsmail.net'),
  ('visitor', 'nora.sjölund@onlinemail.se');
`;

export const allData = [
  genres,
  tickets,
  auditoriums,
  seatsStora,
  usersMember,
  usersVisitor,
];
