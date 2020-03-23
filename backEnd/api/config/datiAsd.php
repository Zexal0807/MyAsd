<?php
class datiAsd{

    public static $fx = 2;

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';
        require_once 'backEnd/classes/VLKDatabase.php';
                
        $retu = [];
        $DB = new VLKDatabase();
        $ret = $DB->selectAll()
            ->from("vlk_chiavi")
            ->orderBy("chiave")
            ->execute();
        foreach($ret as $r){
            $retu[] = ["chiave" => $r['chiave'], "descrizione" => $r['descrizione'], "modificabile" => true, "valore" => ""] ;
        }
        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);
        $ret = $DB->selectAll()
            ->from("datiasd")
            ->orderBy("chiave")
            ->execute();
        
        for($i = 0, $k = 0; $i < sizeof($retu); $i++){
            if($retu[$i]['chiave'] == $ret[$k]['chiave']){
                $retu[$i]["valore"] = $ret[$k]['valore'];
                $retu[$i]["modificabile"] = boolval($ret[$k]['modificabile']);
                $k++;
            }
        }
        return $retu;
    }
}