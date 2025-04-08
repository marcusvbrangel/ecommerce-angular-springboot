CREATE TABLE IF NOT EXISTS product_category (
  id BIGSERIAL PRIMARY KEY,
  category_name VARCHAR(255) DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS product (
  id BIGSERIAL PRIMARY KEY,
  sku VARCHAR(255) DEFAULT NULL,
  name VARCHAR(255) DEFAULT NULL,
  description VARCHAR(255) DEFAULT NULL,
  unit_price DECIMAL(13,2) DEFAULT NULL,
  image_url VARCHAR(255) DEFAULT NULL,
  active BOOLEAN DEFAULT TRUE,
  units_in_stock INT DEFAULT NULL,
  date_created TIMESTAMP(6) DEFAULT NULL,
  last_updated TIMESTAMP(6) DEFAULT NULL,
  category_id BIGINT NOT NULL,
  FOREIGN KEY (category_id) REFERENCES product_category (id)
);


CREATE TABLE IF NOT EXISTS country (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(2) DEFAULT NULL,
  name VARCHAR(255) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS state (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) DEFAULT NULL,
  country_id SMALLINT NOT NULL,
  FOREIGN KEY (country_id) REFERENCES country (id)
);


----------------------------------------------------------


CREATE TABLE IF NOT EXISTS address (
 id BIGSERIAL PRIMARY KEY,
  city VARCHAR(255) DEFAULT NULL,
  country VARCHAR(255) DEFAULT NULL,
  state VARCHAR(255) DEFAULT NULL,
  street VARCHAR(255) DEFAULT NULL,
  zip_code VARCHAR(255) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS customer (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255) DEFAULT NULL,
  last_name VARCHAR(255) DEFAULT NULL,
  email VARCHAR(255) DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_tracking_number VARCHAR(255) DEFAULT NULL,
    total_price DECIMAL(19,2) DEFAULT NULL,
    total_quantity INT DEFAULT NULL,
    billing_address_id BIGINT DEFAULT NULL,
    customer_id BIGINT DEFAULT NULL,
    shipping_address_id BIGINT DEFAULT NULL,
    status VARCHAR(128) DEFAULT NULL,
    date_created TIMESTAMP(6) DEFAULT NULL,
    last_updated TIMESTAMP(6) DEFAULT NULL,
    UNIQUE (billing_address_id),
    UNIQUE (shipping_address_id),
    FOREIGN KEY (customer_id) REFERENCES customer (id),
    FOREIGN KEY (billing_address_id) REFERENCES address (id),
    FOREIGN KEY (shipping_address_id) REFERENCES address (id)
);


CREATE TABLE IF NOT EXISTS order_item (
    id BIGSERIAL PRIMARY KEY,
    image_url VARCHAR(255) DEFAULT NULL,
    quantity INT DEFAULT NULL,
    unit_price DECIMAL(19,2) DEFAULT NULL,
    order_id BIGINT DEFAULT NULL,
    product_id BIGINT DEFAULT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);















