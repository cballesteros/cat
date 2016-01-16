<?php

require "../config-be/ClsConexion.php";

class ClsExperience extends ClsConexion
{

	function Get_Experience_by_todo()
    {
        $this->query = "call usp_get_experience()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Experience_by_todo($pcExperience)
    {
        $this->query = "call usp_set_experience('$pcExperience')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Experience_by_todo($Codigo){
        $this->query=  "DELETE FROM experience Where idexperience=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }


     function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_experience_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_experience($cod,$desc)
    {
        $this->query = "call USP_Actualizar_experience($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}