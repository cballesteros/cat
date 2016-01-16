<?php
require "../models-be/ClsDiagnosisVideo.php";

    $objDiagnosisVideo = new ClsDiagnosisVideo();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objDiagnosisVideo->Get_DiagnosisVideo_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcDiagnosisVideo = $objDatos->cDiagnosisVideo;

            try
            {
                $Resultado = $objDiagnosisVideo->Set_DiagnosisVideo_by_todo($pcDiagnosisVideo);
                $objDiagnosisVideo->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objDiagnosisVideo->rollback() ;
                echo $e ;
            }

        }

        //ELIMONAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $piddiagnosisVideo = $objDatos->iddiagnosisVideo;
            $Resultado = $objDiagnosisVideo->delete_DiagnosisVideo_by_todo($piddiagnosisVideo);
        }

        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objDiagnosisVideo->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;

            try
            {
                $Resultado = $objDiagnosisVideo->update_DiagnosisVideo($pcCodigo,$pcDescri);

                $objDiagnosisVideo->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objDiagnosisVideo->rollback() ;
                echo $e ;
            }

        }

    }

?>