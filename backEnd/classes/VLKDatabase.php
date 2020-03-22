<?php
class VLKDatabase extends ZDatabase{
  public function __construct(){
    $this->host = "localhost";
    $this->user = "root";
    $this->password = "";
    $this->database = "myasd";
    parent::__construct();
    $this->set_charset("utf8");
  }
}
?>
