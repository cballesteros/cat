<?php
require "../models-be/ClsStateVideo.php";

    $objStateVideo = new ClsStateVideo();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objStateVideo->Get_StateVideo_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcStateVideo = $objDatos->cStateVideo;

            try
            {
                $Resultado = $objStateVideo->Set_StateVideo_by_todo($pcStateVideo);
                $objStateVideo->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objStateVideo->rollback() ;
                echo $e ;
            }

        }

        //ELIMONAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidstateVideo = $objDatos->idstateVideo;
            $Resultado = $objStateVideo->delete_StateVideo_by_todo($pidstateVideo);
        }


        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objStateVideo->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;

            try
            {
                $Resultado = $objStateVideo->update_stateVideo($pcCodigo,$pcDescri);

                $objStateVideo->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objStateVideo->rollback() ;
                echo $e ;
            }

        }

    }

?>