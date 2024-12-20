import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {generateExcelSheet} from '../Redux/Slices/generateExcelSlice'
import axios from 'axios'
function GenerateSheet() {
    // const {response} = useSelector((state)=>state.generateExcel)
const dispatch = useDispatch()
const id = localStorage.getItem('userId');
const handleDownload = async () => {
    try {
        const response = await axios.get('http://localhost:5000/v1/user/reminder/generate-excel',id,{
            responseType:'blob  '
        })

        // console.log('data excel',response.data);    
        // Convert response to a Blob
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reminders.xlsx'; // File name for download
        document.body.appendChild(link);
        link.click();

        // Cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};

  return (
    <div>
        <button type='button' onClick={handleDownload}>
            generate
        </button>
    </div>
  )
}

export default GenerateSheet