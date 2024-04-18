<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Redis;
use App\Events\PositionSent;

class SubscriberCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subscriber';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        echo 'start listening for positions' . PHP_EOL;
        Redis::subscribe('positions', function ($data) {
            PositionSent::dispatch($data);
        });
    }
}
