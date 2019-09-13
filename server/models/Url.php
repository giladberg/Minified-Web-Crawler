<?php
    class Url {
        // DB stuff

private $conn;
private $table = 'urls';

//Post Properties
public $id;
public $title;
public $url;


//constructor with DB
public function __construct($db) {
    $this->conn = $db;
}

// Get Urls
public function read() {
    // Create query
    $query = 'SELECT * FROM ' . $this->table . '  ';

    // Prepare statement 
    $stmt = $this->conn->prepare($query);

    // Execute query
    $stmt->execute();

    return $stmt;
}

    // Create Url
    public function create() {
        // Create query
        $query = 'INSERT INTO ' . $this->table . ' SET title = :title, url = :url';

        // Prepare statement
        $stmt = $this->conn->prepare($query);

        // Clean data
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->body = htmlspecialchars(strip_tags($this->url));
        

        // Bind data
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':url', $this->url);
     

        // Execute query
        if($stmt->execute()) {
          return true;
    }

    // Print error if something goes wrong
    printf("Error: %s.\n", $stmt->error);

    return false;
  }
    }
