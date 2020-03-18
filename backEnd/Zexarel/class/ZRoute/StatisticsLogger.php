<?php
class StatisticsLogger extends ZLogger{
  public function __construct(){
    $dir = __DIR__."../../../../log_statistics";
    if(!file_exists($dir)){
      mkdir($dir);
    }
    $this->file = $dir."/log_".date("Y-m-d").".txt";
  }
}
