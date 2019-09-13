<?php

  //Headers
  header('Access-Control-Allow-Credentials: true');
  header('Origin: *');
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Methods: POST');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,
  Access-Control-Allow-Methods, Authorization, X-Requested-With, Origin, Accept,Access-Control-Allow-Origin,Access-Control-Allow-Credentials');

  

  include_once "../../config/Database.php";
  include_once "../../models/Url.php";

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate url object
  $url = new Url($db);

  // Get raw urled data
  $data = json_decode(file_get_contents("php://input"));

  $url->title = $data->title;
  $url->url = $data->url;
  

  // Create url
  if($url->create()) {
      echo json_encode(
          array('message' => 'Url Created')
      );
  } else {
      echo json_decode(
          array('message' => 'Url  Not Created')
      );
  }