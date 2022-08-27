<?php

$dbFile = $_SERVER['DOCUMENT_ROOT'] . "/test-yourself/assets/db/db.accdb";

$db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=".$dbFile.";Uid=; Pwd=;");

# For random order and limit "SELECT TOP 3 * FROM q ORDER BY rnd(-(100000*id)*Time())"
# SELECT * FROM q WHERE Question LIKE 'project%';
$sql = "SELECT * FROM q";

$results = $db->query($sql)->fetchAll();

$currentExam = [];
$currentQuestionId = 0;

foreach($results as $result) {
    $allAttch = explode(";",$result["Attachments"]);
    $imgs=[];
    $vids =[];
    foreach($allAttch as $oneAtt) {
        $attExt = explode(".",$oneAtt);
        if(key_exists(1,$attExt)){
            if($attExt[1] === "jpg" || $attExt[1] === "jpeg" || $attExt[1] === "png") {
                $imgs[] = $oneAtt;
            }

            if($attExt[1] === "mp4") {
                $vids[] = $oneAtt;
            }
    }
    }

    $currentExam[] = [
        "id" => ++$currentQuestionId,
        "question" => $result['Question'],
        "answer" => $result['Answer'],
        "attachments" => [
            "imgs" => $imgs,
            "vids" => $vids
        ]
    ];
}
echo json_encode($currentExam);
?>