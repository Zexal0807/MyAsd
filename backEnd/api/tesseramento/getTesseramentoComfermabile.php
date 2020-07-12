<?php
class getTesseramentoComfermabile{

    public static $fx = 15;

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);
        $a = intval(date("m")) > 7 ? intval(date("Y"))+1:intval(date("Y"));
        
        $ret = $DB->executeSql('SELECT tesseramenti.idIscritto AS id, tesseramenti.codice AS code, anagrafiche.cognome, anagrafiche.nome
            FROM tesseramenti 
            INNER JOIN anagrafiche ON tesseramenti.idIscritto = anagrafiche.idIscritto
            WHERE tesseramenti.idTipoTesseramento LIKE "%'.$a.'" AND tesseramenti.idIscritto NOT IN (
                SELECT id FROM gettesserati WHERE anno = YEAR(NOW()) 
            )');
        
        return $ret;
    }
}