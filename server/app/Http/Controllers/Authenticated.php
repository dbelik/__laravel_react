<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Authenticated extends Controller
{
    // Middleware check it.
    public function post(Request $request)
    {
        return true;
    }
}
