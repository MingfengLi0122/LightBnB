const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryStr = `
    SELECT * FROM users
    WHERE users.email = $1;  
  `;
  const value = [email];
  return pool
    .query(queryStr, value)
    .then(res => {
      if(res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error("Query error:", err));
}

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryStr = `
    SELECT * FROM users
    WHERE users.id = $1
  `;
  const value = [id];
  return pool
    .query(queryStr, value)
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error("Query error:", err));
}

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryStr = `
    INSERT INTO users(name, email, password)
    VALUES($1, $2, $3)
    RETURNING *;
  `;
  const value = [user.name, user.password, user.email];
  return pool
    .query(queryStr, value)
    .then(res => {
      if(res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => console.error("Query error:", err));
}

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryStr = `
    SELECT reservations.*,
           properties.*,
           AVG(rating) AS average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON reservations.id = reservation_id 
                          AND properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1 AND end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY start_date
    LIMIT $2;
  `;
  const value = [guest_id, limit];
  return pool
    .query(queryStr, value)
    .then(res => {
      if(res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch(err => console.error("Query error:", err));
}

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  const queryParams = [];
  let queryStr = `
    SELECT properties.*, 
           avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryStr += `WHERE city LIKE $${queryParams.length} `;
  }
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`);
    queryStr += `WHERE owner_id = $${queryParams.length} `;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryStr += `WHERE cost_per_night >= $${queryParams.length} `;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryStr += `WHERE cost_per_night <= $${queryParams.length} `;
  }
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryStr += `WHERE avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryStr += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;
  
  return pool
    .query(queryStr, queryParams)
    .then(res => {
      if(res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch(err => console.error("Query error:", err));
}

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  //property.active = true;
  const queryStr = `
  INSERT INTO properties(owner_id, title , description, thumbnail_photo_url, cover_photo_url,cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
  RETURNING *;
  `;
  const value = [property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url, property.cost_per_night, property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms, property.country, property.street, property.city, property.province, property.post_code, true];
  
  return pool
    .query(queryStr, value)
    .then(res => {
      if(res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
    .catch(err => console.error("Query error:", err));
}

exports.getUserWithEmail = getUserWithEmail;
exports.getUserWithId = getUserWithId;
exports.addUser = addUser;
exports.getAllReservations = getAllReservations;
exports.getAllProperties = getAllProperties;
exports.addProperty = addProperty;
