-- Set up the database 
-- Create Players table
CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100),
    join_date DATE
);

-- Create Games table
CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100),
    genre VARCHAR(50)
);

-- Create Scores table
CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY,
    player_id INTEGER REFERENCES players(id),
    game_id INTEGER REFERENCES games(id),
    score INTEGER,
    date_played DATE
);

-- Clear existing data
DELETE FROM scores;
DELETE FROM games;
DELETE FROM players;

-- Insert sample data into players (with corrected IDs)
INSERT INTO players (id, name, join_date) VALUES
(1, 'Michiel van der Gragt', '2025-01-15'),
(2, 'Shahid Manzoor', '2025-02-20'),
(3, 'Anders Eklund', '2025-03-10'),
(4, 'Sanna Maya Blomdahl', '2025-04-05'),
(5, 'Ellenor Vestin', '2025-05-12'),
(6, 'Diliara Tazieva', '2025-04-12'),
(7, 'Lars Munck', '2024-04-12'),
(8, 'Ida Sofie Karlsson', '2024-04-12'),
(9, 'Silvia Ighere Pettersson', '2023-04-12'),
(10, 'Anton Kivi', '2023-04-12'),
(11, 'Magnus Nilsson', '2025-06-12'),
(12, 'Victor Kristiansson', CURRENT_DATE - INTERVAL '15 days'),
(13, 'Patience Evertsson', CURRENT_DATE - INTERVAL '10 days');

-- Insert sample data into games
INSERT INTO games (id, title, genre) VALUES
(1, 'Space Adventure', 'Action'),
(2, 'Mystery Mansion', 'Adventure'),
(3, 'Racing Extreme', 'Racing'),
(4, 'Puzzle Master', 'Puzzle'),
(5, 'Fantasy Quest', 'RPG'),
(6, 'Battle Royale', 'Action'),
(7, 'Cooking Master', 'Simulation');

-- Insert sample data into scores
INSERT INTO scores (id, player_id, game_id, score, date_played) VALUES
(1, 1, 1, 1500, '2025-03-01'),
(2, 1, 2, 800, '2025-03-02'),
(3, 2, 1, 1200, '2025-03-03'),
(4, 2, 3, 950, '2025-03-04'),
(5, 3, 2, 1100, '2025-03-05'),
(6, 3, 4, 750, '2025-03-06'),
(7, 4, 1, 1800, '2025-03-07'),
(8, 4, 3, 1300, '2025-03-08'),
(9, 5, 2, 900, '2025-03-09'),
(10, 5, 4, 600, '2025-03-10'),
(11, 6, 5, 2000, '2025-03-11'),
(12, 6, 6, 850, '2025-03-12'),
(13, 7, 1, 950, '2025-03-13'),
(14, 7, 7, 1200, '2025-03-14'),
(15, 8, 2, 1400, '2025-03-15'),
(16, 8, 5, 1100, '2025-03-16'),
(17, 9, 3, 1600, '2025-03-17'),
(18, 9, 6, 750, '2025-03-18'),
(19, 10, 4, 1900, '2025-03-19'),
(20, 10, 7, 800, '2025-03-20'),
(21, 11, 1, 1700, '2025-03-21'),
(22, 11, 3, 1250, '2025-03-22'),
(23, 12, 2, 1350, '2025-03-23'),
(24, 12, 5, 950, '2025-03-24'),
(25, 13, 6, 1850, '2025-03-25'),
(26, 13, 7, 700, '2025-03-26'),
-- Additional plays for favorite games analysis
(27, 1, 1, 1650, '2025-03-27'),
(28, 2, 1, 1400, '2025-03-28'),
(29, 6, 5, 2100, '2025-03-29'),
(30, 9, 3, 1750, '2025-03-30');