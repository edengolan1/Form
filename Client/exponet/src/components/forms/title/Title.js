import React , {useEffect,useState} from 'react';
import instance from '../../../utils/Axios';
import './Title.css';

function Title({text}) {
  const [formCount, setFormCount] = useState(0);

    useEffect(() => {
        fetchFormCount();
    }, []);

    const fetchFormCount = async () => {
        try {
            const response = await instance.get("/api/getFormCount");
            setFormCount(response.data.count);
        } catch (error) {
            console.error("Error fetching form count:", error);
        }
    };
    return (
      <div className="title">
        <div className="arrow-right">
          <div className="arrow-right2"></div>
        </div>
        <div>
          <h2 className="textTitle">{text}</h2>
        </div>
        <div className="numberOfProcedure">
          <span className="caption">מספר הליך: {formCount+1}</span>
        </div>
      </div>
    );
}

export default Title;