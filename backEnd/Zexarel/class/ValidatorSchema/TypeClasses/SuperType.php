<?php
class SuperType {

  protected $node_object;

  protected $value;

  public function __construct($value) {
    $this->value = $value;
  }
/*
  protected function required(){
    if($this->node_object != null){
      return true;
    }
    return false;
  }*/

  public function validate(){
    /*if(isset($this->node_object['required']) && $this->node_object['required']){
      if(!$this->required()){
        return false;
      }
    }*/
    return $this->validateType();
  }

}
