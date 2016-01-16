<?php

require "../config-be/ClsConexion.php";

class ClsDiagnosisVideo extends ClsConexion
{

	function Get_DiagnosisVideo_by_todo()
    {
        $this->query = "call usp_get_diagnosisVideo()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_DiagnosisVideo_by_todo($pcDiagnosisVideo)
    {
        $this->query = "call usp_set_diagnosisVideo('$pcDiagnosisVideo')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_DiagnosisVideo_by_todo($Codigo){
        $this->query=  "DELETE FROM diagnosisvideoframe Where iddiagnosisvideoframe=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }

     function Get_equipo_By_Id($Codigo)
    {
        $this->query = "call USP_diagnosisVideo_Por_Codigo($Codigo)";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
        //return $this->query;
    }


    function update_DiagnosisVideo($cod,$desc)
    {
        $this->query = "call USP_Actualizar_diagnosisVideo($cod,'$desc')";
        $this->execute_single_query();
        return json_encode('Modifico Correctamente');
    }
}