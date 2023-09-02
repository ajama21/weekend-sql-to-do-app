CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    -- priority INT,
    is_complete BOOLEAN DEFAULT FALSE
);
