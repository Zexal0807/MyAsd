<?php
require("TypeClasses/ValidationInterface.php");

require("TypeClasses/SuperType.php");

require("TypeClasses/TypeBool.php");
require("TypeClasses/TypeText.php");
require("TypeClasses/TypeNumeric.php");
require("TypeClasses/TypeDate.php");

require("TypeClasses/Validation.php");

class ValidatorSchema {

  private $error_nodes = [];

  public $validated = true;

  public function validate($schema, $json_payload) {
    if (!is_array($schema)) {
      return false;
    }
    $this->recursive_walk($schema, $json_payload);
    return $this->validated;
  }

  private function recursive_walk($schema, $json_payload) {
    foreach ($schema as $nodes => $value) {
      $type = isset($value['type']) ? $value['type'] : 'object';

      $t = null;

      switch ($value['type']) {
        case 'text':
          $t = new TypeText($value, $json_payload[$value['name']]);
          break;
        case 'numeric':
          $t = new TypeNumeric($value, $json_payload[$value['name']]);
          break;
        case 'boolean':
          $t = new TypeBool($value, $json_payload[$value['name']]);
          break;
        case 'date':
          $t = new TypeDate($value, $json_payload[$value['name']]);
          break;
        case 'array':
          foreach ($json_payload[$value['name']] as $vv) {
            $this->recursive_walk($value['schema'], $vv);
          }
          break;
        case 'object':
          $this->recursive_walk($value['sub'], $json_payload[$value['name']]);
          break;
        default:
          $this->validated = false;
          return;
          break;
      }
      $val = new Validation($t);
      $this->validated = $val->validate();
      if(!$this->validated){
        return;
      }
    }
  }

}
