import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BackendService, TeamMember } from "@genezio-sdk/genezio-team-nft_us-east-1"
import { useNavigate } from 'react-router-dom';

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



  return (
    <div className="container mt-4">
      <h2 className="mb-4">Member Details</h2>
      {loading && <p>Loading...</p>}
      {member ? (
        <>
          <p><strong>Name:</strong> {member.fullname}</p>
          <p><strong>Email:</strong> {member.email}</p>
          <p><strong>Workshop Results:</strong> Panther {member.panther_percentage}%, Peacock {member.peacock_percentage}%, Dolphin {member.dolphin_percentage}%, Owl {member.owl_percentage}%</p>
          {member.image_url && <img src={member.image_url} alt="Member" className="img-fluid rounded-circle mb-3" />}
        </>
      ) : (
        !loading && <p>Unfortunately, you have not taken part in the communication workshop!</p>
      )}
    </div>
  );
};

export default SecretView;
