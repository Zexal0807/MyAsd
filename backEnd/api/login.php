<?php
class login{

    public static $schema = [
        [
            'name' => "username",
            'type' => "string",
            'required' => true
        ],
        [
            'name' => "password",
            'type' => "string",
            'required' => true
        ]
    ];

    public static function api($data){
        require 'backEnd/classes/VLKDatabase.php';
        
        $DB = new VLKDatabase();
	    $ret = $DB->select(
			"vlk_utenti.id", 
			"vlk_utenti.username", 
			"vlk_utenti.idAsd", 
			"vlk_asd.host AS db_host", 
			"vlk_asd.user AS db_user", 
			"vlk_asd.password AS db_pasw", 
			"vlk_asd.db AS db_db"
		)
		->from("vlk_utenti")
		->innerJoin("vlk_asd", "vlk_asd.id", "=", "vlk_utenti.idAsd")
		->where("vlk_utenti.username", "=", $data['username']," AND")
		->where("vlk_utenti.password", "=", md5($data['password']))
		->execute();
	
        if(sizeof($ret) == 0){
            header("HTTP/1.0 404 Not Found");
            echo "Username o password non corrette";
            exit;
        }
        if(sizeof($ret) != 1){
            header("HTTP/1.0 404 Not Found");
            exit;
        }else{
            $ret = $ret[0];
            $_SESSION['id'] = $ret['id'];
            $_SESSION['idAsd'] = $ret['idAsd'];
            $_SESSION['db_host'] = $ret['db_host'];
            $_SESSION['db_user'] = $ret['db_user'];
            $_SESSION['db_pasw'] = $ret['db_pasw'];
            $_SESSION['db_db'] = $ret['db_db'];
        }
    }
}