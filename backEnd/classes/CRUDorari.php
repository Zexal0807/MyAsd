<?php
require_once 'Database.php';

class CRUDorari extends ZModel{

    protected $table = "orari";
	
	public $schema = [
        [
            'name' => "idCorso",
            "type" => "int"
        ],
        [
            'name' => "giorno",
            "type" => "string"
        ],
        [
            'name' => "inizio",
            "type" => "time"
        ],
        [
            'name' => "fine",
            "type" => "time"
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
new CRUDorari();
