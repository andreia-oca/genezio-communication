import React, { useEffect, useState } from 'react';
import { BackendService, TeamMember } from "@genezio-sdk/genezio-team-nft_us-east-1"
import { useNavigate } from 'react-router-dom';
import { AuthService } from '@genezio/auth';

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

  const logout = async () => {
    try {
        await AuthService.getInstance().logout();
        navigate('/login');
    } catch (error) {
        console.error(error);
    }
  }

  return (
    <div className="form-container">
      <h2>Member Details</h2>
      {loading && <p>Loading...</p>}
      {member && (
        <>
          <p>Name: {member.fullname}</p>
          <p>Email: {member.email}</p>
          {member.image_url && <img src={member.image_url} alt="Member" style={{ maxWidth: '100px' }} />}
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default SecretView;
