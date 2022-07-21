<?php

$dbFile = "F:\\00.Mido\\0.Local Server\htdocs\Projects\book-test\assets\db\db.accdb";

$db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=".$dbFile.";Uid=; Pwd=;");

$sql = "SELECT * FROM q";

$results = $db->query($sql)->fetchAll();

/* echo "<pre>"; print_r($results); echo "</pre>"; */

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
    /* echo "<pre>"; print_r($allAttch); echo "</pre>"; */

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


/* echo "<pre>"; print_r($currentExam); echo "</pre>"; */
echo json_encode($currentExam);

/* echo $results[9]["details"]; */
?>