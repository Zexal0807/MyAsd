<?php
class SuperType {

  protected $node_object;

  protected $inputjson;

  public function __construct($node_object, $inputjson) {
    $this->node_object = $node_object;
    $this->inputjson = $inputjson;
  }

  protected function required(){
    if($this->node_object != null){
      return true;
    }
    return false;
  }

  public function validate(){
    if(isset($this->node_object['required']) && $this->node_object['required']){
      if(!$this->required()){
        return false;
      }
    }
    return $this->validateType();
  }

}
