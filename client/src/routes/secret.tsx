import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BackendService, TeamMember } from "@genezio-sdk/genezio-team-nft_us-east-1"
import { useNavigate } from 'react-router-dom';
import WorkshopResultsTable from '../views/results';
import { Button, Table } from 'react-bootstrap';

const SecretView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [member, setMember] = useState<TeamMember | null>(null)

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const member = await BackendService.getMember();
        setMember(member);
      } catch (error) {
        console.error(error);
        navigate('/login');
      }
      setLoading(false);
    };

    fetchMember();
  }, [navigate]);

  const taketest =  () => {
    try {
        navigate('/taketest');
    } catch (error) {
        console.error(error);
    }
}

 
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Member Details</h2>
      {loading && <p>Loading...</p>}
      {member ? (
        <>
        <p><strong>Name:</strong> {member.fullname}</p>
        <p><strong>Email:</strong> {member.email}</p>
        <table>
          <tr>
            <td>Date: 13 feb 2024</td>
            <td><WorkshopResultsTable member={member} /></td>
            <td>{member.image_url && <img src={member.image_url} alt="Member" className="img-fluid d-block mx-auto mb-5" />}</td>
          </tr>
        </table>
        <Button variant="danger" className="mx-2" onClick={taketest}>
              Take another test
        </Button>
        </>
      ) : (
        !loading && <p>Unfortunately, you have not taken part in the communication workshop!</p>
      )}
    </div>
  );
};

export default SecretView;
