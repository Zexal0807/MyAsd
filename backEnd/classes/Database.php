<?php
class Database extends ZDatabase{
  public function __construct($host, $user, $password, $database){
    $this->host = $host;
    $this->user = $user;
    $this->password = $password;
    $this->database = $database;
    parent::__construct();
    $this->set_charset("utf8");
  }
}
?>
