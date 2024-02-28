CREATE USER IF NOT EXISTS 'andre'@'%' IDENTIFIED BY 'root';
GRANT ALL PRIVILEGES ON soccer_db.* TO 'andre'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;


CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    featured_team VARCHAR(100),
    featured_player VARCHAR(100),
    related_match VARCHAR(255),
    tactics VARCHAR(255),
    highlighted_event VARCHAR(255),
    banner TEXT NOT NULL
);