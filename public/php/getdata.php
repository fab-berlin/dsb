<?php

header('Access-Control-Allow-Origin: *');

$filename = "currentDataJson.txt";


$classname = $_GET['classname'];
$path = $_GET['path'];
$path = urldecode($path);

// retrieve data from "web"server
$ch = curl_init();
$url = $path; //'https://light.dsbcontrol.de/DSBlightWebsite/Data/9b5231e5-a016-4170-900e-e1afe3feba10/fc201e86-5046-4c53-980a-0aa232cbefcc/subst_001.htm?638642500617318723';


curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);


$output = curl_exec($ch);
curl_close($ch);

$correctRow = false;

// parse retrieved data to json

if ($output) {
    $classData = [];
    $dom = new DOMDocument;
    $dom->loadHTML(utf8_encode($output));

    $centerTable = $dom->getElementsbyTagName('center')[0];

    $currentDateLong = $centerTable->getElementsByTagName('div')[0]->textContent;

    $pattern = '/(\d{2}\.\d{2}\.\d{4})\s(\w+)\s\(Seite\s(\d+)\s\//';
    if (preg_match($pattern, $currentDateLong, $matches)) {
        $currentDate = $matches[1];
        $currentDay = $matches[2];
        $currentSorting = $matches[3];
    }

    $counter = 0;
    foreach($centerTable->getElementsbyTagName('tr') as $row) {
        $class = $row->getElementsbyTagName('td')[0];
        $hour = $row->getElementsbyTagName('td')[1];
        $newLesson = $row->getElementsbyTagName('td')[2];
        $newRoom = $row->getElementsbyTagName('td')[3];
        $oldLesson = $row->getElementsbyTagName('td')[4];
        $oldRoom = $row->getElementsbyTagName('td')[5];
        $text = $row->getElementsbyTagName('td')[6];
        $cancellation = $row->getElementsbyTagName('td')[7];

        $isDateRow = false;
        foreach($class->attributes as $attr) {
            if ($attr->nodeName === 'colspan' && $attr->nodeValue==='8') {
                $isDateRow = true;
                break;
            }
        }

        if ($isDateRow === true) {
            $dateObj = ["date" => ["date" => $currentDate,"day" => $currentDay,"sorting" => $currentSorting]];
        }

        if ((!is_null($classname) && $class->textContent === $classname) || is_null($classname)) {
            if (!$isDateRow) {
                $dateObj['classData'][] = ['name' => $class->textContent, 'hour' => $hour->textContent, 'newLesson' => $newLesson->textContent, 'newRoom' => $newRoom->textContent, 'oldLesson' => $oldLesson->textContent, 'oldRoom' => $oldRoom->textContent, 'message' => $text->textContent, 'cancellation' => $cancellation->textContent];
                if ($isDateRow === true) {
                    $counter++;
                }
            }
        }
    }


    echo json_encode($dateObj);
}
