<?php
require("TypeClasses/ValidationInterface.php");

require("TypeClasses/SuperType.php");

require("TypeClasses/TypeBool.php");
require("TypeClasses/TypeText.php");
require("TypeClasses/TypeNumeric.php");

class ValidatorSchema {

  public $validated = true;

  public function validate($schema, $data) {
    if (!is_array($schema)) {
      $this->validated = false;
      return $this->validated;
    }
    foreach ($schema as $value) {
      $this->recursive_walk($value, $data);
    }
    return $this->validated;
  }

  private function recursive_walk($value, $input) {
    $t = null;
    switch ($value['type']) {
      case 'ipv4':
      case 'ipv6':
      case 'mac':
      case 'email':
      case 'date':
      case 'time':
      case 'string':
        $t = new TypeText($input[$value['name']]);
        $t->setType($value['type']);
        $this->validated = $t->validate();
        break;
      case 'int':
      case 'float':
        $t = new TypeNumeric($input[$value['name']]);
        $t->setType($value['type']);
        $this->validated = $t->validate();
        break;
      case 'boolean':
        $t = new TypeBool($input[$value['name']]);
        $this->validated = $t->validate();
        break;
      case 'array':
        $ass = isset($value['assoc']) ? $value['assoc'] : false;
        if($ass){

          $f = fopen("a.txt", "a");
          fwrite($f, json_encode($value, JSON_PRETTY_PRINT ));
          fwrite($f, json_encode($input[$value['name']], JSON_PRETTY_PRINT ));
          fwrite($f, "/n/n");
          fclose($f);

          foreach ($value['schema'] as $sub) {
            $this->recursive_walk($sub, $input[$value['name']]);
          }
        }else{
          $s = $value['schema'];
          for($i = 0; $i < sizeof($input[$value['name']]); $i++){
            $s['name'] = $i;
            $this->recursive_walk($s, [$i => $input[$value['name']][$i]]);
          }
        }
        break;
      default:
        $this->validated = false;
        break;
    }
  
  }
}
