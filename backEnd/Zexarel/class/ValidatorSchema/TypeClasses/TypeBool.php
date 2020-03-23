<?php
class TypeBool extends SuperType implements ValidationInterface {

  public function validateType() {
    if (boolval($this->value) !== $this->value) {
      return false;
    }
    return true;
  }

}
