<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class RandomPositionController extends Controller
{    

    public function create(Request $request)
    {
        try {
        $longitude = mt_rand(-3000, 3000) + (mt_rand(0, 9999) / 10000); 
        $latitude = mt_rand(-3000, 3000) + (mt_rand(0, 9999) / 10000); 
        $coordinates = [$longitude, $latitude];
            Redis::publish('positions', json_encode($coordinates));
    
            return response()->json(['message' => 'Success'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }
    }
}
