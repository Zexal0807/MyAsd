<?php
class getMovimenti{

    public static $schema = [
    ];

    public static function api($data){
        require_once 'backEnd/classes/Database.php';

        $DB = new Database($_SESSION['db_host'], $_SESSION['db_user'], $_SESSION['db_pasw'], $_SESSION['db_db']);

        $sqlM = 'SELECT 
                uscite.id AS id,
                uscite.data AS data,
                uscite.cartaceo AS cartaceo,
                null AS entrate,
                -1*uscite.importo AS uscite,
                tipouscite.descrizione AS tipo,
                uscite.descrizione AS descrizione
            FROM uscite
            INNER JOIN tipouscite ON uscite.idTipoUscita = tipouscite.id
            UNION
            SELECT 
                entrate.id AS id,
                entrate.data AS data,
                entrate.cartaceo AS cartaceo,
                entrate.importo AS entrate,
                null AS uscite,
                tipoentrate.descrizione AS tipo,
                entrate.descrizione AS descrizione
            FROM entrate
            INNER JOIN tipoentrate ON entrate.idTipoEntrata = tipoentrate.id';

        $r = [];

        $r['cassa'] = $DB->executeSql('SELECT SUM(sub.entrate) AS entrate, SUM(sub.uscite) AS uscite FROM('.$sqlM.') AS sub')[0];
        $r['movimenti'] = $DB->executeSql('SELECT * FROM('.$sqlM.') AS sub ORDER BY sub.data DESC');

        return $r;
    }
}