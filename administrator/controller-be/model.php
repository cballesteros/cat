<?php
require "../models-be/ClsModel.php";

    $objModel = new ClsModel();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objModel->Get_Model_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcModel = $objDatos->cModel;
            $pcBrand = $objDatos->cIdbrand;

            try
            {
                $Resultado = $objModel->Set_Model_by_todo($pcModel,$pcBrand);
                $objModel->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objModel->rollback() ;
                echo $e ;
            }

        }

        //ELIMINAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidmodel = $objDatos->idmodel;
            $Resultado = $objModel->delete_Model_by_todo($pidmodel);
        }


        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objModel->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcCodigo = $objDatos->cCodigo;
            $pcDescri = $objDatos->cDescripcion;
            $pcBrand = $objDatos->cBrand;

            try
            {
                $Resultado = $objModel->update_brand($pcCodigo,$pcDescri,$pcBrand);

                $objModel->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objModel->rollback() ;
                echo $e ;
            }

        }

    }

?>