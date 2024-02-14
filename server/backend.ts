import { GenezioDeploy, GenezioMethod, GnzAuth, GnzContext } from "@genezio/types";
import pg from 'pg'
import TeamMember from "./models/member";
const { Pool } = pg

@GenezioDeploy()
export class BackendService {
  pool = new Pool({
    connectionString: process.env.TEAM_NFT_DATABASE_URL,
    ssl: true,
  });

  @GenezioMethod()
  @GnzAuth()
  async getMember(context: GnzContext): Promise<TeamMember | null> {
    const userEmail = context.user?.email;
    try {
      const result = await this.pool.query('SELECT * FROM team_members WHERE email = $1', [userEmail]);
      const user = result.rows[0];
      return user || null;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  @GenezioMethod()
  @GnzAuth()
  async addNewResults(context: GnzContext, member: TeamMember): Promise<boolean> {
    const userEmail = context.user?.email;

    if (!userEmail && userEmail !== member.email) {
      return false;
    }

    try {
      const currentDate = new Date().toISOString(); // Get the current date in ISO format

      const queryString = `
        INSERT INTO team_members (email, fullname, image_url, panther_percentage, owl_percentage, dolphin_percentage, peacock_percentage, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `;

      await this.pool.query(queryString, [
        member.email,
        member.fullname,
        member.image_url,
        member.panther_percentage,
        member.owl_percentage,
        member.dolphin_percentage,
        member.peacock_percentage,
        currentDate,
      ]);

      return true;
    } catch (error) {
      console.error('Error fetching user:', error);
      return false;
    }
  return true;
  }
}
