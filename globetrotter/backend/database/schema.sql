-- GlobeTrotter Database Schema
-- Create database if not exists
CREATE DATABASE IF NOT EXISTS globetrotter;
USE globetrotter;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_photo VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Trips Table
CREATE TABLE IF NOT EXISTS trips (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    cover_photo VARCHAR(255) DEFAULT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    public_url VARCHAR(255) UNIQUE DEFAULT NULL,
    estimated_budget DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cities Table (Reference data)
CREATE TABLE IF NOT EXISTS cities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    country_code VARCHAR(3),
    cost_index DECIMAL(5, 2) DEFAULT 1.0,
    popularity INT DEFAULT 0,
    image_url VARCHAR(255) DEFAULT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trip Stops Table (Cities in a trip)
CREATE TABLE IF NOT EXISTS trip_stops (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    city_id INT NOT NULL,
    arrival_date DATE NOT NULL,
    departure_date DATE NOT NULL,
    order_index INT NOT NULL,
    transport_cost DECIMAL(10, 2) DEFAULT 0,
    accommodation_cost DECIMAL(10, 2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE
);

-- Activities Table (Reference data)
CREATE TABLE IF NOT EXISTS activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    duration_hours DECIMAL(4, 2) DEFAULT 2.0,
    cost DECIMAL(10, 2) DEFAULT 0,
    image_url VARCHAR(255) DEFAULT NULL,
    city_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE SET NULL
);

-- Trip Stop Activities (Activities assigned to a stop)
CREATE TABLE IF NOT EXISTS trip_stop_activities (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_stop_id INT NOT NULL,
    activity_id INT NOT NULL,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME,
    order_index INT NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE CASCADE,
    FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE
);

-- Budget Items Table
CREATE TABLE IF NOT EXISTS budget_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    trip_id INT NOT NULL,
    trip_stop_id INT DEFAULT NULL,
    category VARCHAR(50) NOT NULL, -- transport, accommodation, activity, meal, other
    item_name VARCHAR(200) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
    FOREIGN KEY (trip_stop_id) REFERENCES trip_stops(id) ON DELETE SET NULL
);

-- User Saved Destinations
CREATE TABLE IF NOT EXISTS saved_destinations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    city_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (city_id) REFERENCES cities(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_city (user_id, city_id)
);

-- Insert Sample Cities
INSERT INTO cities (name, country, country_code, cost_index, popularity, image_url) VALUES
('Paris', 'France', 'FRA', 1.8, 95, 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'),
('Tokyo', 'Japan', 'JPN', 2.1, 92, 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf'),
('New York', 'United States', 'USA', 2.3, 98, 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'),
('London', 'United Kingdom', 'GBR', 1.9, 94, 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad'),
('Barcelona', 'Spain', 'ESP', 1.5, 88, 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4'),
('Rome', 'Italy', 'ITA', 1.6, 90, 'https://images.unsplash.com/photo-1529260830199-42c24126f198'),
('Dubai', 'United Arab Emirates', 'UAE', 1.7, 85, 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'),
('Singapore', 'Singapore', 'SGP', 1.8, 87, 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd'),
('Bali', 'Indonesia', 'IDN', 1.2, 91, 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'),
('Sydney', 'Australia', 'AUS', 2.0, 86, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4');

-- Insert Sample Activities
INSERT INTO activities (name, description, category, duration_hours, cost, city_id) VALUES
('Eiffel Tower Visit', 'Iconic landmark and observation deck', 'Sightseeing', 2.5, 25.00, 1),
('Louvre Museum', 'World-famous art museum', 'Museum', 4.0, 17.00, 1),
('Shibuya Crossing Tour', 'Experience the famous intersection', 'Sightseeing', 1.0, 0.00, 2),
('Sushi Making Class', 'Learn to make authentic sushi', 'Food & Drink', 3.0, 85.00, 2),
('Statue of Liberty Tour', 'Visit the iconic symbol of freedom', 'Sightseeing', 3.0, 24.00, 3),
('Broadway Show', 'Watch a world-class musical', 'Entertainment', 2.5, 120.00, 3),
('Big Ben & Parliament', 'Historic government buildings', 'Sightseeing', 1.5, 0.00, 4),
('Tower of London', 'Historic castle and crown jewels', 'History', 3.0, 29.00, 4),
('Sagrada Familia', 'Gaudi''s masterpiece basilica', 'Sightseeing', 2.0, 26.00, 5),
('Colosseum Tour', 'Ancient Roman amphitheater', 'History', 2.5, 16.00, 6);

