<?php
require "../models-be/ClsVideo.php";

    $objVideo = new ClsVideo();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objVideo->Get_Video_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcClinicHistory = $objDatos->cClinicHistory;
            $pcDateRecorded = $objDatos->cDateRecorded;
            $pcAge = $objDatos->cAge;
            $pcExam = $objDatos->cExam;
            $pcGende = $objDatos->cGende;
            $pcDateRegistry = $objDatos->cDateRegistry;
            $pcState = $objDatos->cState;
            $pcFileLink = $objDatos->cFileLink;
            $pcModel = $objDatos->cModel;
            $pcHospital = $objDatos->cHospital;

            try
            {
                $Resultado = $objVideo->Set_Video_by_todo($pcClinicHistory,$pcDateRecorded,$pcAge,$pcExam,$pcGende,$pcDateRegistry,$pcState,$pcFileLink,$pcModel,$pcHospital);
                $objVideo->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objVideo->rollback() ;
                echo $e ;
            }

        }

        //ELIMONAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidvideo = $objDatos->idvideo;
            $Resultado = $objVideo->delete_Video_by_todo($pidvideo);
        }


    }

?>