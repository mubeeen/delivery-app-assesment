import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDeliveryPricingDto {
  @Type(() => String)
  @IsString()
  venue_slug: string;

  @Type(() => Number)
  @IsNumber()
  cart_value: number;

  @Type(() => Number)
  @IsNumber()
  user_lat: number;

  @Type(() => Number)
  @IsNumber()
  user_lon: number;
}
