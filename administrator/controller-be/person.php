<?php
require "../models-be/ClsPerson.php";

    $objPerson = new ClsPerson();
    
    if(!empty($_GET["accion"]))
    {

        //LISTAR 
        if($_GET["accion"]=='listar')
        {
            $Resultado = $objPerson->Get_Person_by_todo();
            echo $Resultado;
        }

        //REGISTRAR
        if ($_GET["accion"]=='registrar')
        {
            $objDatos = json_decode(file_get_contents("php://input"));
            $pcName = $objDatos->cName;
            $pcEmail = $objDatos->cEmail;
            $pcPhone = $objDatos->cPhone;
            $pcExpeciality = $objDatos->cEspeciality;
            $pcCountry = $objDatos->cCountry;
            $pcExperience = $objDatos->cExperience;
            $pcHospital = $objDatos->cHospital;
            $pcUser = $objDatos->cUser;
            $pcPass = $objDatos->cPass;
            $pcEstado = $objDatos->cEstado;
            $pcFecha = $objDatos->cFecha;

            try
            {
                $Resultado = $objPerson->Set_Person_by_todo($pcName,$pcEmail,$pcPhone,$pcExpeciality,$pcCountry,$pcExperience,$pcHospital,$pcUser,$pcPass,$pcEstado,$pcFecha);
                $objPerson->beginTransaction();
                echo 'registro realizado correctamente';
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objPerson->rollback() ;
                echo $e ;
            }

        }

        //ELIMINAR
        if($_GET["accion"]=='eliminar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pidperson = $objDatos->idperson;
            $Resultado = $objPerson->delete_Person_by_todo($pidperson);
        }


        if ($_GET["accion"]=='Editar')
        {

            $objDatos = json_decode(file_get_contents("php://input"));
            $pnequipoCodigo = $objDatos->nCodigo;

            $Resultado = $objPerson->Get_equipo_By_Id($pnequipoCodigo);
            echo $Resultado;

        }

        if ($_GET["accion"]=='actualizar')
        {
            
            $objDatos = json_decode(file_get_contents("php://input"));
            
            $pcNombre = $objDatos->cNombre;
            $pcEmail = $objDatos->cEmail;
            $pcPhone = $objDatos->cPhone;
            $pcEspeciality = $objDatos->cEspeciality;
            $pcCountry = $objDatos->cCountry;
            $pcExperience = $objDatos->cExperience;
            $pcHospital = $objDatos->cHospital;
            $pcUser = $objDatos->cUser;
            $pcPass = $objDatos->cPass;
            $pcState = $objDatos->cState;
            $pcFecha = $objDatos->cFecha; 
            $pcCodigo = $objDatos->cCodigo;

            try
            {
                $Resultado = $objPerson->update_Person($pcNombre,$pcEmail,$pcPhone,$pcEspeciality,$pcCountry,$pcExperience,$pcHospital,$pcUser,$pcPass,$pcState,$pcFecha,$pcCodigo);

                $objPerson->beginTransaction();
                echo $Resultado;
            }
            catch(Exception $e)
            {
                # abortamos la transacción
                $objPerson->rollback() ;
                echo $e ;
            }

        }

    }

?>