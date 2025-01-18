import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class GetDeliveryPricingDto {
  @Type(() => String)
  @IsString({ message: 'Venue slug must be a string' })
  @IsNotEmpty({ message: 'Venue slug is required' })
  venue_slug: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Cart value must be a number' })
  @Min(0, { message: 'Cart value cannot be negative' })
  cart_value: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Latitude must be a number' })
  @Min(-90, { message: 'Latitude must be between -90 and 90' })
  @Max(90, { message: 'Latitude must be between -90 and 90' })
  user_lat: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Longitude must be a number' })
  @Min(-180, { message: 'Longitude must be between -180 and 180' })
  @Max(180, { message: 'Longitude must be between -180 and 180' })
  user_lon: number;
}
