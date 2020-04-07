<?php
require_once 'Database.php';

class CRUDentrate extends ZCRUD{

    protected $table = "entrate";
	
	public $schema = [
        [
            'name' => "data",
            "type" => "date"
        ],
        [
            'name' => "importo",
            "type" => "float"
        ],
        [
            'name' => "modificabile",
            "type" => "int"
        ],
        [
            'name' => "idTipoEntrata",
            "type" => "int"
        ],
        [
            'name' => "descrizione",
            "type" => "string"
        ],
        [
            'name' => "cartaceo",
            "type" => "string"
        ],
        [
            'name' => "idTipoPagamento",
            "type" => "int"
        ],
        [
            'name' => "idFile",
            "type" => "int",
            "nullable" => true
        ]
	];
	
	public $primaryKey = [
		"name" => "id",
		"type" => "int",
		"autoincrement" => true
	];
	

	public function connect(){
		return new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);
	}

}
new CRUDentrate();
