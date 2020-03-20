<?php
class getUserData{

    public static $schema = [
    ];

    public static function api($data){
        require 'backEnd/classes/VLKDatabase.php';
        
        if(isset($_SESSION['id'])){
            $DB = new VLKDatabase();
            $ret = $DB->select(
                "vlk_privilegi.idUtente AS id", 
                "vlk_utenti.username", 
    
                "vlk_tipofunzioni.id AS tid", 
                "vlk_tipofunzioni.nome AS tnome",
                "vlk_tipofunzioni.descrizione AS tdescrizione", 
                "vlk_tipofunzioni.icon AS ticon", 
                "vlk_tipofunzioni.url AS turl", 
    
                "vlk_funzioni.id AS fid", 
                "vlk_funzioni.nome AS fnome",
                "vlk_funzioni.descrizione AS fdescrizione", 
                "vlk_funzioni.url AS furl"
            )
            ->from("vlk_privilegi")
            ->innerJoin("vlk_funzioni", "vlk_privilegi.idFunzione", "=", "vlk_funzioni.id")
            ->innerJoin("vlk_tipofunzioni", "vlk_funzioni.idTipoFunzione", "=", "vlk_tipofunzioni.id")
            ->innerJoin("vlk_utenti", "vlk_privilegi.idUtente", "=", "vlk_utenti.id")
            ->where("vlk_privilegi.idUtente", "=", $_SESSION['id'], "AND")
            ->where("vlk_funzioni.url", "IS NOT")
            ->execute();
    
            $retu["id"] = $ret[0]['id'];
            $retu["username"] = $ret[0]['username'];
            $retu["funzioni"] = [];
            
            foreach($ret as $k => $v){
                if(!isset($retu['funzioni'][$v["tid"]])){
                    $tmp['idTipoFunzione'] = $v["tid"];
                    $tmp['nome'] = $v["tnome"];
                    $tmp['descrizione'] = $v["tdescrizione"];
                    $tmp['icon'] = $v["ticon"];
                    $tmp['url'] = $v["turl"];
                    $tmp['sub'] = [];
    
                    $retu['funzioni'][$v["tid"]] = $tmp;
                }
                $tmp = [];
                $tmp['idFunzione'] = $v["fid"];
                $tmp['nome'] = $v["fnome"];
                $tmp['descrizione'] = $v["fdescrizione"];
                $tmp['url'] = $v["furl"];
    
                $retu['funzioni'][$v["tid"]]['sub'][] = $tmp;
            }
            return $retu;
        }else{
            header("HTTP/1.0 404 Not Found");
            exit;
        }
    }
}