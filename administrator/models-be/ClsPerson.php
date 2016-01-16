<?php
require "../config-be/ClsConexion.php";

class ClsPerson extends ClsConexion
{


	function Get_Person_by_todo()
    {
        $this->query = "call usp_get_person()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Person_by_todo($pcName,$pcEmail,$pcPhone,$pcExpeciality,$pcCountry,$pcExperience,$pcHospital,$pcUser,$pcPass,$pcEstado,$pcFecha)
    {
        $this->query = "call usp_set_person('$pcName','$pcEmail','$pcPhone','$pcExpeciality','$pcCountry','$pcExperience','$pcHospital','$pcUser','$pcPass','$pcEstado','$pcFecha')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Person_by_todo($Codigo){
        $this->query=  "DELETE FROM person Where idperson=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }

     function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_person_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_Person($nom,$ema,$pho,$esp,$cou,$exp,$hos,$user,$pas,$sta,$fec,$cod)
    {
        $this->query = "call USP_Actualizar_person('$nom','$ema','$pho','$esp','$cou','$exp','$hos','$user','$pas','$sta','$fec','$cod')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}