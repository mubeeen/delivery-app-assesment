The application is built using NestJS, a progressive Node.js framework, and TypeScript for strong typing and improved developer experience.

---

# Delivery Pricing Application

## Overview

The **Delivery Pricing Application** calculates the delivery pricing for users based on their location, cart value, and venue's delivery specifications. It fetches dynamic venue data to determine delivery fees, surcharges, and other pricing information.

---

## Features

- Calculates delivery pricing based on location and cart value.
- Fetches venue data (static and dynamic) to get delivery specifications.
- Returns detailed pricing breakdown including delivery fee, small order surcharge, and total price.

---

## API

### Endpoint: `GET /api/v1/delivery-order-price`

#### Query Parameters:

- **`venue_slug`**: (string) The venue's unique identifier.
- **`cart_value`**: (number) The value of the user's cart (e.g., `1000`).
- **`user_lat`**: (number) Latitude of the user's location (e.g., `60.17094`).
- **`user_lon`**: (number) Longitude of the user's location (e.g., `24.93087`).

#### Response Example:

```json
{
  "total_price": 1190,
  "small_order_surcharge": 0,
  "cart_value": 1000,
  "delivery": {
    "fee": 190,
    "distance": 177
  }
}
```

---

## Installation

### 1. Clone the repository:

```bash
cd delivery-pricing-app
```

### 2. Install Node.js and NPM (if not installed):

Ensure you have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed. You can check your Node.js and npm versions by running:

```bash
node -v
npm -v
```

If Node.js and npm are not installed, follow the instructions from the official Node.js website to install them.

### 3. Install project dependencies:

Run the following command to install the required dependencies:

```bash
npm install
```

This will install all the necessary packages listed in the `package.json` file.

### 4. Set environment variables:

Create a `.env` file in the root directory of the project and add the following variables:

```bash
STATIC_URL_BASE=<your_static_url_base>
DYNAMIC_URL_BASE=<your_dynamic_url_base>
```

- **`STATIC_URL_BASE`**: The base URL for static data.
- **`DYNAMIC_URL_BASE`**: The base URL for dynamic data.

Make sure to replace `<your_static_url_base>` and `<your_dynamic_url_base>` with the actual URLs provided by your data sources.

### 5. Start the application:

Run the following command to start the application:

```bash
npm run start
```

The application will start running at `http://localhost:3000`. You can access the API by sending requests to `http://localhost:3000/api/v1/delivery-order-price`.

---

## Development

To run the application in development mode with live-reloading enabled, use:

```bash
npm run start:dev
```

This will automatically reload the server when you make changes to the source code.

---

## Running Tests

The project uses [Jest](https://jestjs.io/) for unit testing.

To run the tests, use the following command:

```bash
npm run test
```

---

## Example

To test the API, you can use any API testing tool like [Postman](https://www.postman.com/) or simply use `curl`:

### Example Request

```bash
curl "http://localhost:3000/api/v1/delivery-order-price?venue_slug=example-venue&cart_value=1000&user_lat=40.7128&user_lon=-74.0060"
```

This will return the calculated delivery pricing in JSON format.

---

## Conclusion

This application helps businesses calculate the delivery pricing based on user location and cart value. By fetching real-time data from the venue APIs, it ensures that the pricing is accurate and up-to-date.

---

### Additional Notes

- Ensure you have access to the static and dynamic URL bases used in the environment variables.
- The API endpoint `/api/v1/delivery-order-price` expects the correct query parameters to calculate the delivery pricing accurately.

---
