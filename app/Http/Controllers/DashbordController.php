<?php

namespace App\Http\Controllers;

use App\User;
use App\Vendors;
use App\Products;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;

class DashbordController extends BaseController
{

    public function getDashboard()
    {

    }

    public function getVendors()
    {

        $get_vendors = Vendors::orderby('id', 'desc')->get()->toArray();
        if ($get_vendors) {
            return response()->json(['status' => '200', 'response' => $get_vendors]);
        }
        return response()->json(['status' => '200']);
    }

    public function getVendorsProduct(request $request, $product)
    {
        $get_products = Products::select('vendor_id')->where('customer_facing_name',$product)->get()->toArray();

         $vendors=[];
            foreach ($get_products as $key => $value) {
                array_push($vendors,$value['vendor_id']);
            }

            if($vendors){
                 $get_vendors = Vendors::wherein('id',$vendors)->get()->toArray();
            }
            

        if ($get_vendors) {
            return response()->json(['status' => '200', 'response' => $get_vendors]);
        }
        return response()->json(['status' => '200']);
    }

    public function addVendors(Request $request)
    {

        $add_vendor = $request->all();

        if ($add_vendor['pnumber']) {
            $add_vendor['pnumber'] = str_replace('-', '', $request['pnumber']);
        }

        $vendors = Vendors::create($add_vendor);

        if ($vendors) {
            return response()->json(['status' => '200', 'response' => $vendors]);
        }
        return response()->json(['status' => '200']);
    }

    public function addUsers(Request $request)
    {

        $add_user       = $request->all();
        $username_exist = $this->checkUsername($add_user['username']);
        $email_exist    = $this->checkEmail($add_user['email']);
        $add_user['password']=bcrypt($request['password']);
        if ($username_exist) {
            if ($email_exist) {
                $users = User::create($add_user);
                if ($users) {
                    return response()->json(['status' => '200', 'response' => $users]);
                } else {
                    return response()->json(['status' => '200']);
                }
            } else {
                return response()->json(['status' => '500', 'response' => 'Email Address Already in use Please Use another Email Address']);
            }

        } else {
            return response()->json(['status' => '500', 'response' => 'Username Already in use Please Use another Username']);
        }

    }

    public function checkUsername($username)
    {
        $exist = User::where('username', $username)->get()->toArray();
        if (count($exist) > 0) {
            return false;
        } else {
            return true;
        }
    }
    public function checkEmail($email)
    {
        $exist = User::where('email', $email)->get()->toArray();
        if (count($exist) > 0) {
            return false;
        } else {
            return true;
        }
    }

    public function getUsers()
    {
        $get_users = User::orderby('id', 'desc')->get()->toArray();

        if ($get_users) {
            return response()->json(['status' => '200', 'response' => $get_users]);
        }
        return response()->json(['status' => '200']);
    }

    public function getUserDeails($id)
    {
        $get_users_details = User::where('id', $id)->get()->first();
        if ($get_users_details) {
            return response()->json(['status' => '200', 'response' => $get_users_details]);
        }
        return response()->json(['status' => '200']);
    }

    public function getVendorDeails($id)
    {
        $get_vendors_details = Vendors::with('product')->where('id', $id)->get()->first();
        if ($get_vendors_details) {
            return response()->json(['status' => '200', 'response' => $get_vendors_details]);
        }
        return response()->json(['status' => '200']);
    }

    public function deleteUser($id)
    {
        $delete_users = User::where('id', $id)->delete();
        if ($delete_users) {
            return response()->json(['status' => '200', 'response' => $delete_users]);
        }
        return response()->json(['status' => '200']);
    }
    public function deleteVendor($id)
    {
        $delete_users = Vendors::where('id', $id)->delete();
        if ($delete_users) {
            return response()->json(['status' => '200', 'response' => $delete_users]);
        }
        return response()->json(['status' => '200']);
    }

    public function updateUsers(Request $request)
    {

        $add_user       = $request->all();
        $username_exist = $this->checkUsername($add_user['username']);
        $email_exist    = $this->checkEmail($add_user['email']);
        $email_exist    = true;
        $username_exist = true;
        if ($username_exist) {
            if ($email_exist) {
                $users = User::where('id', $add_user['id'])->update(['name' => $add_user['name'], 'email' => $add_user['email'], 'password' => bcrypt($add_user['password']), 'position' => $add_user['position'], 'username' => $add_user['username']]);
                if ($users) {
                    return response()->json(['status' => '200', 'response' => $users]);
                } else {
                    return response()->json(['status' => '200']);
                }
            } else {
                return response()->json(['status' => '500', 'response' => 'Email Address Already in use Please Use another Email Address']);
            }
        } else {
            return response()->json(['status' => '500', 'response' => 'Username Already in use Please Use another Username']);
        }

    }
    public function updateVendor(Request $request)
    {

        $add_vendor = $request->all();

        if ($add_vendor['pnumber']) {
            $add_vendor['pnumber'] = str_replace('-', '', $request['pnumber']);
        }

        $vendor = Vendors::where('id', $add_vendor['id'])
            ->update(['name'   => $add_vendor['name'],
                'email'            => $add_vendor['email'],
                'status'           => $add_vendor['status'],
                'terms'            => $add_vendor['terms'],
                'pnumber'          => $add_vendor['pnumber'],
                'supplier_name'    => $add_vendor['supplier_name'],
                'first_name'       => $add_vendor['first_name'],
                'last_name'        => $add_vendor['last_name'],
                'city'             => $add_vendor['city'],
                'state'            => $add_vendor['state'],
                'zip'              => $add_vendor['zip'],
                'categoty'         => $add_vendor['categoty'],
                'type'             => $add_vendor['type'],
                'growing_practice' => $add_vendor['growing_practice'],
                'freight'          => $add_vendor['freight'],
                'start_period'     => $add_vendor['start_period'],
                'end_period'       => $add_vendor['end_period'],
                'price_agreement'  => $add_vendor['price_agreement'],
                'billing_address'  => $add_vendor['billing_address'],
                'certifications'   => $add_vendor['certifications'],
                'current_balance'  => $add_vendor['current_balance'],
                'website'          => $add_vendor['website'],
                'misc_notes'       => $add_vendor['misc_notes'],
                'commodities'      => json_encode($add_vendor['commodities'])]);
        if ($vendor) {
            return response()->json(['status' => '200', 'response' => $vendor]);
        } else {
            return response()->json(['status' => '200']);
        }

    }

    public function updateVendorProfile(Request $request)
    {

        $add_vendor = $request->all();

        if ($add_vendor['pnumber']) {
            $add_vendor['pnumber'] = str_replace('-', '', $request['pnumber']);
        }
        $vendor = Vendors::where('id', $add_vendor['id'])
            ->update(['name'   => $add_vendor['name'],
                'email'            => $add_vendor['email'],
                'status'           => $add_vendor['status'],
                'terms'            => $add_vendor['terms'],
                'pnumber'          => $add_vendor['pnumber'],
                'supplier_name'    => $add_vendor['supplier_name'],
                'first_name'       => $add_vendor['first_name'],
                'last_name'        => $add_vendor['last_name'],
                'city'             => $add_vendor['city'],
                'state'            => $add_vendor['state'],
                'zip'              => $add_vendor['zip'],
                'categoty'         => $add_vendor['categoty'],
                'type'             => $add_vendor['type'],
                'growing_practice' => $add_vendor['growing_practice'],
                'freight'          => $add_vendor['freight'],
                'start_period'     => $add_vendor['start_period'],
                'end_period'       => $add_vendor['end_period'],
                'price_agreement'  => $add_vendor['price_agreement'],
                'billing_address'  => $add_vendor['billing_address'],
                'certifications'   => $add_vendor['certifications'],
                'current_balance'  => $add_vendor['current_balance'],
                'website'          => $add_vendor['website'],
                'misc_notes'       => $add_vendor['misc_notes'],
                'commodities'      => json_encode($add_vendor['commodities'])]);
        if ($vendor) {
            return response()->json(['status' => '200', 'response' => $vendor]);
        } else {
            return response()->json(['status' => '200']);
        }

    }

    public function deleteAllVendors(Request $request)
    {
        foreach ($request->ids as $key => $value) {
            $this->deleteVendor($value['id']);
        }
        return response()->json(['status' => '200', 'response' => 'Vendors Deleted']);

    }

    public function deleteAllUsers(Request $request)
    {
        foreach ($request->ids as $key => $value) {
            $this->deleteUser($value['id']);
        }
        return response()->json(['status' => '200', 'response' => 'Users Deleted']);

    }
}
