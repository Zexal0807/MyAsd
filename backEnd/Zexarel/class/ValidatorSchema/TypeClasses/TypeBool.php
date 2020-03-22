<?php
class TypeBool extends SuperType implements ValidationInterface {

  public function validateType() {
    if (boolval($this->inputjson) !== $this->inputjson) {
      return false;
    }
    return true;
  }

}
