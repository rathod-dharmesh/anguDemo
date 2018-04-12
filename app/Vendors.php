<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Vendors extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'pnumber', 'status', 'terms', 'supplier_name', 'first_name', 'last_name', 'city', 'state', 'zip', 'categoty', 'type', 'growing_practice', 'freight', 'start_period', 'end_period', 'price_agreement', 'billing_address', 'certifications', 'current_balance', 'website', 'misc_notes', 'commodities',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $casts = [
        'commodities' => 'array',
    ];

    public function product()
    {
        return $this->hasMany('\App\Products', 'vendor_id', 'id');
    }
}
