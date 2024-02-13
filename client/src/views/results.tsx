import { TeamMember } from '@genezio-sdk/genezio-team-nft_us-east-1';
import React from 'react';

const WorkshopResultsTable: React.FC<{ member: TeamMember | null }> = ({ member }) => {
    const strongPurple: string = "#6A0DAD";
const mediumPurple: string = "#9B59B6";
const lightPurple: string = "#BF55EC";
const lighterPurple: string = "#D7BDE2";

const getColorClass = (percentage: number) => {
    const color = percentage >= 50
      ? strongPurple
      : percentage >= 30
        ? mediumPurple
        : percentage >= 15
          ? lightPurple
          : lighterPurple;

    return { backgroundColor: color };
  };

  return (
    <table className="table">
      <tbody>
        <tr>
          <td style={getColorClass(member?.owl_percentage || 0)}>
            Owl: {member?.owl_percentage}%
          </td>
          <td style={getColorClass(member?.panther_percentage || 0)}>
            Panther: {member?.panther_percentage}%
          </td>
        </tr>
        <tr>
          <td style={getColorClass(member?.dolphin_percentage || 0)}>
            Dolphin: {member?.dolphin_percentage}%
          </td>
          <td style={getColorClass(member?.peacock_percentage || 0)}>
            Peacock: {member?.peacock_percentage}%
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WorkshopResultsTable;
