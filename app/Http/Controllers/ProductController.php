<?php

namespace App\Http\Controllers;

use App\Products;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends BaseController
{

    public function getProducts()
    {

        $get_products = Products::orderby('id', 'desc')->get()->toArray();

        if ($get_products) {
            return response()->json(['status' => '200', 'response' => $get_products]);
        }
        return response()->json(['status' => '200']);
    }

    public function addProduct(Request $request)
    {
        $add_product = $request->all();

        $products = Products::create($add_product);

        if ($products) {
            return response()->json(['status' => '200', 'response' => $products]);
        }
        return response()->json(['status' => '200']);
    }

    public function getProductDeails($id)
    {

        $get_product_details = Products::where('id', $id)->get()->first();

        if ($get_product_details) {

            return response()->json(['status' => '200', 'response' => $get_product_details]);
        }
        return response()->json(['status' => '200']);
    }

    public function updateProduct(Request $request)
    {
        $update_product = $request->all();

        foreach ($update_product as $key => $value) {
            if (is_array($value)) {
                $update_product[$key] = json_encode($value);
            }
        }

        $update_products = Products::where('id', $update_product['id'])->update($update_product);
        if ($update_products) {
            return response()->json(['status' => '200', 'response' => $update_products]);
        } else {
            return response()->json(['status' => '200']);
        }

    }

    public function deleteProduct($id)
    {

        $delete_product = Products::where('id', $id)->delete();

        if ($delete_product) {
            return response()->json(['status' => '200', 'response' => $delete_product]);
        }
        return response()->json(['status' => '500']);
    }

    public function uploadProduct(Request $request)
    {

        $resultArray = [];

        $total_product = Excel::load($request['file'], function ($reader) use ($resultArray) {

            foreach ($reader->get() as $value) {

                $data = $value->toArray();

                $validate = $this->validate($data);

                if ($validate) {
                    if ($data['day_avilable']) {
                        $tempData             = explode(",", $data['day_avilable']);
                        $trimmed_array        = array_map('trim', $tempData);
                        $data['day_avilable'] = $trimmed_array;

                    }
                    if ($data['never_list_categories']) {
                        $data['never_list_categories'] = explode(",", $data['never_list_categories']);
                        $trimmed_array                 = array_map('trim', $data['never_list_categories']);
                        $data['never_list_categories'] = $trimmed_array;

                    }
                    if ($data['ethelyne_classification']) {
                        $data['ethelyne_classification'] = explode(",", $data['ethelyne_classification']);
                        $trimmed_array                   = array_map('trim', $data['ethelyne_classification']);
                        $data['ethelyne_classification'] = $trimmed_array;

                    }

                    if ($data['weeks_avilable']) {
                        $data['weeks_avilable'] = explode(",", $data['weeks_avilable']);
                        $trimmed_array          = array_map('trim', $data['weeks_avilable']);
                        $data['weeks_avilable'] = $trimmed_array;

                    }
                    if ($data['subcategory']) {
                        $data['subcategory'] = explode(",", $data['subcategory']);
                        $trimmed_array       = array_map('trim', $data['subcategory']);
                        $data['subcategory'] = $trimmed_array;

                    }

                    $success = Products::updateOrCreate(array('sku' => $data['sku']), $data);
                    if (!empty($success->id)) {
                        array_push($resultArray, $success);
                    }
                } else {

                    continue;
                }

            }

        })->get();

        $res = [];
        foreach ($total_product as $key => $value) {
            if (!empty($value['vendor_id'])) {
                array_push($res, $value);
            }
        }

        $resultArray['Total_product'] = count($total_product);
        $resultArray['Added_product'] = count($res);
        $resultArray['Not_updated']   = count($total_product) - count($res);

        return $resultArray;
    }

    public function deleteAllProduct(Request $request)
    {   
            
        foreach ($request->ids as $key => $value) {
                
             $delete_product = Products::where('id', $value['id'])->delete();
        }
        return response()->json(['status' => '200', 'response' => 'Products Deleted']);

    }

    public function downloadExcel($type)
    {
        $data = Products::orderby('id', 'desc')->get()->toArray();
        foreach ($data as $key => $value) {
            foreach ($value as $k => $val) {
                if (is_array($val)) {
                    $data[$key][$k] = implode(",", $val);
                }
            }
        }
        return Excel::create('Products List', function ($excel) use ($data) {
            $excel->sheet('mySheet', function ($sheet) use ($data) {
                $sheet->fromArray($data);
            });
        })->download($type);
    }

    public function validate($data)
    {

        if (!$data['vendor_id']) {
            return false;
        }

        if (!$data['sku']) {
            return false;
        }

        return true;
    }

}
