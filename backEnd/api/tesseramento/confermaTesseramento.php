<?php
class confermaTesseramento{

    public static $schema = [
        [
            'name' => "code",
            "type" => "string",
            "required" => true
        ]
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $codice = $data['code'];

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $ret = $DB->select("*")
            ->from("tesseramenti")
            ->where("codice", "=", $codice)
            ->execute();
        if(sizeof($ret) == 1){
            $ret = $ret[0];

            $sql = 'INSERT INTO tesseramenti(idIscritto, data, idTipoTesseramento, idFile) VALUES('.$ret['idIscritto'].', "'.date("Y-m-d H:i:s").'", '.(intval($ret['idTipoTesseramento']) - 10000).', '.($ret['idFile'] == null ? "null": $ret['idFile'] ).')';
            $r = $DB->executeSql($sql);

            if($r){
                //rendo NULL tutto il vecchio record
                $r = $DB->update("tesseramenti")
                    ->set("idFile", NULL)
                    ->set("codice", NULL)
                    ->where("id", "=", $ret['id'])
                    ->execute();
                if($r){
                    return true;
                }else{
                    mail("tesserevlk@roujutsu.it", "Errore conferma codice", "Annullamento vecchio tesseramento non registrato id:".$ret['id']);
                }
            }else{
                mail("tesserevlk@roujutsu.it", "Errore conferma codice", "Tesseramento non registrato file:".$ret['idFile']);
            }
        }
        return false;
    }
}
?>