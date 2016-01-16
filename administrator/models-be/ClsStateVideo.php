<?php

require "../config-be/ClsConexion.php";

class ClsStateVideo extends ClsConexion
{

	function Get_StateVideo_by_todo()
    {
        $this->query = "call usp_get_stateVideo()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_StateVideo_by_todo($pcStateVideo)
    {
        $this->query = "call usp_set_stateVideo('$pcStateVideo')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_StateVideo_by_todo($Codigo){
        $this->query=  "DELETE FROM statevideo Where idstatevideo=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }

     function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_stateVideo_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_stateVideo($cod,$desc)
    {
        $this->query = "call USP_Actualizar_stateVideo($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}