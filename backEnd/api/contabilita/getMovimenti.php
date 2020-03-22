<?php
class getMovimenti{

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $sqlM = 'SELECT 
                -1*uscite.id AS id,
                uscite.data AS data,
                -1*uscite.importo AS importo,
                tipoUscite.descrizione AS tipo,
                uscite.descrizione AS descrizione
            FROM uscite
            INNER JOIN tipoUscite ON uscite.idTipoUscita = tipoUscite.id
            UNION
            SELECT 
                entrate.id AS id,
                entrate.data AS data,
                entrate.importo AS importo,
                tipoEntrate.descrizione AS tipo,
                entrate.descrizione AS descrizione
            FROM entrate
            INNER JOIN tipoEntrate ON entrate.idTipoEntrata = tipoEntrate.id';

        $r = [];

        $r['cassa'] = $DB->executeSql('SELECT SUM(sub.importo) AS s FROM('.$sqlM.') AS sub')[0]['s'];
        $r['movimenti'] = $DB->executeSql('SELECT * FROM('.$sqlM.') AS sub ORDER BY sub.data DESC');

        return $r;
    }
}