<?php
class TypeText extends SuperType implements ValidationInterface {

  private $type = "string";

  public function setType($type){
    $this->type = $type;
  }
/*
  public function required(){
    if($this->node_object != "" && $this->node_object != null){
      return true;
    }
    return false;
  }
*/
  public function validateType() {
    if (strval($this->value) !== $this->value) {
      return false;
    }
    $f = true;
    switch($this->type){
      case "email":
        $f = filter_var($this->value, FILTER_VALIDATE_EMAIL);
        break;
      case "ipv4":
        $f = filter_var($this->value, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4);
        break;
      case "ipv6":
        $f = filter_var($this->value, FILTER_VALIDATE_IP, FILTER_FLAG_IPV6);
        break;
      case "mac":
        $f = filter_var($this->value, FILTER_VALIDATE_MAC);
        break;
      case "date":
        $d = DateTime::createFromFormat('Y-m-d', $this->value);
        $f = (sizeof($d->getLastErrors()) > 0);
        break;
      case "time":
        $t = DateTime::createFromFormat('H:i:s', $this->value);
        $f = (sizeof($t->getLastErrors()) > 0);
        break;
    }
    if(!$f)
      return false;
    return true;
  }
}
