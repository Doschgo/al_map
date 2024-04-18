<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redis;
use App\Http\Controllers\RandomPositionController;

Route::get('/', function () {
    return Inertia::render('index', [
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::post('/create', [RandomPositionController::class, 'create']);



