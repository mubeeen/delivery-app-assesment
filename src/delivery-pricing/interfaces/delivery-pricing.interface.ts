export interface DeliveryPricingResponse {
  total_price: number;
  small_order_surcharge: number;
  cart_value: number;
  delivery: {
    fee: number;
    distance: number;
  };
}
