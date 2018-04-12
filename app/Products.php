<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Products extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'vendor_id', 'customer_facing_name', 'label_name', 'sku', 'category', 'subcategory', 'frequency', 'weeks_avilable',
        'day_avilable', 'never_list_categories', 'default_unit_size', 'ice_pack', 'sorting', 'heavy_or_large_item', 'repacking', 'storage_temp', 'fragility_level', 'ethelyne_classification', 'value', 'perishable', 'tracking_inventory', 'expiration_date', 'dmv_available', 'dmv_customer_price', 'dmv_grocery_price', 'dmv_our_cost', 'dmv_description', 'dmv_quantity', 'dmv_unit_type_size', 'dmv_inventory_limits', 'philly_available', 'philly_customer_price', 'philly_grocery_price', 'philly_our_cost', 'philly_description', 'philly_quantity', 'philly_unit_type_size', 'philly_inventory_limits', 'raleigh_available', 'raleigh_customer_price', 'raleigh_grocery_price', 'raleigh_our_cost', 'raleigh_description', 'raleigh_quantity', 'raleigh_unit_type_size', 'raleigh_inventory_limits', 'miami_available', 'miami_customer_price', 'miami_grocery_price', 'miami_our_cost', 'miami_description', 'miami_quantity', 'miami_unit_type_size', 'miami_inventory_limits', 'detroit_available', 'detroit_customer_price', 'detroit_grocery_price', 'detroit_our_cost', 'detroit_description', 'detroit_quantity', 'detroit_unit_type_size', 'detroit_inventory_limits', 'newmarket_available', 'newmarket_customer_price', 'newmarket_grocery_price', 'newmarket_our_cost', 'newmarket_description', 'newmarket_quantity',
        'newmarket_unit_type_size', 'newmarket_inventory_limits',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $casts = [
        'day_avilable'            => 'array',
        'never_list_categories'   => 'array',
        'ethelyne_classification' => 'array',
        'weeks_avilable'          => 'array',
        'subcategory'             => 'array',
    ];

}
