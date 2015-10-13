<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');


$time = date('r');
echo "data: The server time for :".$_GET['id']." is: {$time}\n\n";
flush();