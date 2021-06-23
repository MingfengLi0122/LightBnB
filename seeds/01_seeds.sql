-- fake data for users table
INSERT INTO users(name, email, password)
VALUES('Armand Hilll', 'lera_hahn@dickens.org', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Stephanie Wolff', 'darius.homenick@tod.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Stan Miller', 'mcdermott.maxie@schoen.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Elliot Dickinson', 'derrick_pollich@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Eva Stanley', 'sebastianguerra@ymail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Louisa Meyer', 'jacksonrose@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u'),
('Dominic Parks', 'victoriablackwell@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


-- fake data for properties table
INSERT INTO properties(owner_id, title , description, thumbnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES(1,'Speed lamp', 'nice house', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 930, 6, 4, 8, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true),
(2, 'Blank corner', 'nice apt', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 763, 5, 1, 5, 'Canada', '651 Nami Road', 'Bohbatev', ' Alberta', '83680', true),
(3, 'Habit mix', 'good house', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 830, 3, 6, 2, 'Canada', '513 Powov Grove', 'Jaebvap', 'Ontario', '38051', true),
(4, 'Headed know', 'good apt', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 345, 1, 2, 2, 'Canada', '1392 Gaza Junction', 'Upetafpuv', 'Nova Scotia', '81059', true);

-- fake data for reservations table
INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('2018-09-11', '2018-09-26', 3 ,5),
('2008-08-12', '2009-07-25', 1 ,3),
('2020-02-01', '2021-05-03', 2 , 1),
('2007-06-07', '2007-08-07', 4, 2),
('2015-12-11', '2015-12-13', 3, 6);

-- fake data for property_reviews table
INSERT INTO property_reviews(guest_id, property_id, reservation_id, rating, message)
VALUES(2, 4, 1 , 5, 'message'),
(1, 3, 2 , 3, 'message'),
(4, 4, 3 , 5, 'message'),
(3, 2, 4 , 2, 'message'),
(2, 4, 3 , 1, 'message');