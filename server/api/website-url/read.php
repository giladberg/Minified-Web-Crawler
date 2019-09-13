<?php
    //Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    

    include_once "../../config/Database.php";
    include_once "../../models/Url.php";

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate url object
    $url = new Url($db);

    // url query 
    $result = $url->read();
    // Get row count
    $num = $result->rowCount();

    // Check if any posts
    if($num > 0){
        // Post array
        $urls_arr = array();
        $urls_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            $url_item = array(
                 'id' => $id,
                 'title' => $title,
                 'url' => $url

            );

            // Push to "data"
            array_push($urls_arr['data'], $url_item);
        }

        // Turn to JSON & output
        echo json_encode($urls_arr);
    } else {
        // No urls
        echo json_decode(
            array('message' => 'No urls Found')
        );
    }