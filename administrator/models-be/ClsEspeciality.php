<?php

require "../config-be/ClsConexion.php";

class ClsEspeciality extends ClsConexion
{

	function Get_Especiality_by_todo()
    {
        $this->query = "call usp_get_especiality()"; 
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Especiality_by_todo($pcEspeciality)
    {
        $this->query = "call usp_set_especiality('$pcEspeciality')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Especiality_by_todo($Codigo){
        $this->query=  "DELETE FROM especiality Where idespeciality=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }

     function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_especiality_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_epeciality($cod,$desc)
    {
        $this->query = "call USP_Actualizar_especiality($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}