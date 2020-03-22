<?php
class TypeNumeric extends SuperType implements ValidationInterface {

  private $type = "int";

  public function setType($type){
    $this->type = $type;
  }

  public function validateType() {
    switch($this->type){
      case "int":
        if (intval($this->inputjson) !== $this->inputjson) {
          return false;
        }
      case "float":
        if (floatval($this->inputjson) !== $this->inputjson) {
          return false;
        }
      case "double":
        if (doubleval($this->inputjson) !== $this->inputjson) {
          return false;
        }
      default:
        return false;
    }
    return true;
  }

}
