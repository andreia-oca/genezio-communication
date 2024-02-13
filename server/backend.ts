import { GenezioDeploy, GenezioMethod, GnzAuth, GnzContext } from "@genezio/types";
import pg from 'pg'
import TeamMember from "./models/member";
const { Pool } = pg

@GenezioDeploy()
export class BackendService {
  pool = new Pool({
    connectionString: process.env.NEON_POSTGRES_URL,
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
}
