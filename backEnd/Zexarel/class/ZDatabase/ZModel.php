<?php
class ZModel{

  protected $table;
  protected $key;

  private $mode = "i";

  private $field = [];

  private $originalData = [];

  private $actualData = [];

  public function __construct($data = null){
    if(!isset($this->table)){
      $this->table = get_called_class();
    }

    $sql = "DESCRIBE ".$this->table;
    $DB = $this->connect();
    $ret = $DB->executeSql($sql);

    foreach($ret as $r){
      $this->field[$r["Field"]] = [
        "type" => $r["Type"],
        "null" => ($r["Null"] == "YES" ? true : false),
        "default" => $r['Default'],
        "key" => $r["Key"],
        "extra" => $r["Extra"]
      ];
    }

    foreach($this->field as $k => $v){
      $this->originalData[$k] = $v['default'];
    }

    if(isset($data)){
      foreach($data as $k => $v){
        if(array_key_exists($k, $this->originalData)){
          $this->originalData[$k] = $v;
        }
      }
      $this->mode = "r";
    }

    $this->actualData = $this->originalData;

  }

  protected function connect(){
    return null;
  }

  public function setData($data){
    foreach($data as $k => $v){
      if(array_key_exists($k, $this->actualData)){
        $this->__set($k, $v);
      }
    }
  }

  public function __get($name){
		if(isset($this->actualData[$name])){
			return $this->actualData[$name];
		}else{
			return null;
		}
	}

	public function __set($name, $value){
		if(array_key_exists($name, $this->actualData) && $this->field[$name]["extra"] != "auto_increment"){
			$this->actualData[$name] = $value;
		}
	}

  public function save(){
    $DB = $this->connect();

    switch($this->mode){
      case "r":
        $DB->update($this->table);
        foreach($this->field as $k => $v){
          if($this->actualData[$k] != $this->originalData[$k] && $v['extra'] != "auto_increment"){
            $DB->set($k, sprintf(" %s",$this->actualData[$k]));
          }
        }
        $DB->where($this->key, "=", $this->actualData[$this->key]);
        return $DB->execute();
        break;
      case "i":
        $f = [];
        $vv = [];

        $ai = false;
        foreach($this->field as $k => $v){
          if($v['extra'] != "auto_increment"){
            $f[] = $k;
            $vv[] = $this->actualData[$k];
          }else{
            $ai = $k;
          }
        }

        $DB->insert($this->table, implode(", ", $f));
        call_user_func_array([$DB, "value"], $vv);
        $r = $DB->execute();
        $this->originalData[$this->key] = $r;
        $this->actualData[$this->key] = $r;
        return $r;
        break;
    }
  }

}
