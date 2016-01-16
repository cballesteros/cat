<?php

require "../config-be/ClsConexion.php";

class ClsVideo extends ClsConexion
{

	function Get_Video_by_todo()
    {
        $this->query = "call usp_get_video()";
        $this->execute_query();
        $data = $this->rows ;
        return json_encode($data);
    }

    function Set_Video_by_todo($pcClinicHistory,$pcDateRecorded,$pcAge,$pcExam,$pcGende,$pcDateRegistry,$pcState,$pcFileLink,$pcModel,$pcHospital)
    {
        $this->query = "call usp_set_video('$pcClinicHistory','$pcDateRecorded','$pcAge','$pcExam','$pcGende','$pcDateRegistry','$pcState','$pcFileLink','$pcModel','$pcHospital')";
        $this->execute_single_query();
        return json_encode('registro');
    }

    function delete_Video_by_todo($Codigo){
        $this->query=  "DELETE FROM video Where idvideo=$Codigo";
        $this->execute_single_query();
         return json_encode('elimino');
    }
}