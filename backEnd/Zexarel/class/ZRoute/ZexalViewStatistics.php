<?php
require "StatisticsLogger.php";
class ZexalViewStatistics{
	private static $page;
	public static $started = false;

  private $logger;
  private $pag;
  private $id;

	public static function start(){
		$f = file_get_contents("statistics.json");
		$f = json_decode($f, true);
    foreach($f as $k => $v){
      ZexalViewStatistics::$page[$k] = RoutePatternCreator::create($v);
    }
		ZexalViewStatistics::$started = true;
	}

	public function __construct($req){
    $this->logger = new StatisticsLogger();
    foreach(ZexalViewStatistics::$page as $k => $v){
      if(preg_match("#^".ZexalViewStatistics::$page[$k]."$#", $req->getUrl())){
        $this->pag = ZexalViewStatistics::$page[$k];
        $this->id = $k;
        break;
      }
    }
    $c = 0;
    $a = "";
    if(isset($_COOKIE['zexalViewCounter'])){
      $a = json_decode($_COOKIE['zexalViewCounter'], true);
      $c = $a[$this->id];
      $a[$this->id]++;
    }else{
      $c = 1;
      $a[$this->id] = $c;
    }
    setcookie("zexalViewCounter", json_encode($a), time()+ 24*60*60, "/", "");
    $this->logger->write($req->getIp(), "/".$req->getUrl()."\t".$c." views");
	}


}
ZexalViewStatistics::start();
?>
