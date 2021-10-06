import Swal from 'sweetalert2';
import { useState, useEffect, useCallback } from 'react';
import api from 'services/api';
import { IParams } from './useData.d';

export default function useData(url: string, setLoading:
  React.Dispatch<React.SetStateAction<boolean>>): [any[], React.Dispatch<React.SetStateAction<IParams>>, () => void] {
  const [data, setData] = useState([]);
  const [params, setParams] = useState<IParams>({});
  const [ updateTrigger, setUpdateTrigger ] = useState(false);
  const update = useCallback(() => { setUpdateTrigger(t => !t) }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      urlParams.set(key, params[key])
    });

    let search = urlParams.toString() !== '' ? `?${urlParams.toString()}` : ''
    const fetchData = async () => {
      try {
        const response = await api.get(url + search);
        setData(await response.json());
        setLoading(false); 
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Atenção!',
          text: 'Não foi possível recuperar os dados do servidor, favor consultar o suporte técnico.'
        });
        setLoading(false); 
      }
    }

    fetchData();
  }, [params, url, updateTrigger]);

  return [data, setParams, update];
}