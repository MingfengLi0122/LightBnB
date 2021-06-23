SELECT city, 
       COUNT(property_reviews.*) AS total_reservations
FROM properties
JOIN property_reviews ON properties.id = property_id
GROUP BY city
ORDER BY total_reservations DESC;