<?php
require_once 'Database.php';

class CRUDcorsi extends ZModel{

    protected $table = "corsi";
	
	public $schema = [
        [
            'name' => "nome",
            "type" => "string"
        ],
        [
            'name' => "inizio",
            "type" => "date"
        ],
        [
            'name' => "fine",
            "type" => "date"
        ],
        [
            'name' => "costo",
            "type" => "float"
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
new CRUDcorsi();
