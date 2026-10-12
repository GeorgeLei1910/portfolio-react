function formatImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('/img/')) return path;
  if (path.startsWith('/')) return `/img${path}`;
  return `/img/${path}`;
}

export async function onRequestGet(context) {
  try {
    const { type } = context.params;
    const db = context.env.portfolio_db || context.env.DB;

    if (!db) {
      return new Response(
        JSON.stringify({ error: "Database binding (portfolio_db or DB) not found." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const typePattern = `%${type}%`;

    // 1. Fetch Bio
    const bioResult = await db
      .prepare('SELECT * FROM bios WHERE type = ?')
      .bind(type)
      .all();
    const bioRow = bioResult.results && bioResult.results[0];
    const bio = bioRow
      ? {
          id: bioRow.id,
          type: bioRow.type,
          blurb: bioRow.blurb,
          imagePath: formatImageUrl(bioRow.image_path),
          createdAt: bioRow.created_at,
          updatedAt: bioRow.updated_at,
        }
      : null;

    // 2. Fetch Projects
    const projectsResult = await db
      .prepare('SELECT * FROM projects WHERE type LIKE ? ORDER BY title ASC')
      .bind(typePattern)
      .all();

    const projectSkillsResult = await db
      .prepare(
        `SELECT p.id as "project_id", s.id as "skills_id", s.skill, s.image_url
         FROM skills s, projects p, project_skills ps
         WHERE p.type LIKE ? AND ps.skills_id = s.id AND p.id = ps.project_id`
      )
      .bind(typePattern)
      .all();

    const projectSkillsMap = new Map();
    (projectSkillsResult.results || []).forEach((row) => {
      if (!projectSkillsMap.has(row.project_id)) {
        projectSkillsMap.set(row.project_id, []);
      }
      projectSkillsMap.get(row.project_id).push({
        projectId: row.project_id,
        skillsId: row.skills_id,
        type: row.skill,
        imageUrl: formatImageUrl(row.image_url),
      });
    });

    const projects = (projectsResult.results || []).map((row) => ({
      id: row.id,
      type: row.type,
      title: row.title,
      description: row.description,
      embeddable: row.embeddable || null,
      imageUrl: formatImageUrl(row.image_url),
      url: row.link,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      skills: projectSkillsMap.get(row.id) || [],
    }));

    // 3. Fetch Skills
    const skillsResult = await db
      .prepare('SELECT * FROM skills WHERE type LIKE ?')
      .bind(typePattern)
      .all();

    const skillsMap = new Map();
    (skillsResult.results || []).forEach((row) => {
      if (!skillsMap.has(row.subtype)) {
        skillsMap.set(row.subtype, []);
      }
      skillsMap.get(row.subtype).push({
        id: row.id,
        type: row.type,
        skill: row.skill,
        imageUrl: formatImageUrl(row.image_url),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        subtype: row.subtype,
        experience: row.experience_year,
      });
    });
    const skills = Object.fromEntries(skillsMap);

    // 4. Fetch Timeline
    const timelineResult = await db
      .prepare('SELECT * FROM timeline WHERE type LIKE ? ORDER BY date DESC')
      .bind(typePattern)
      .all();

    const timelineSkillsResult = await db
      .prepare(
        `SELECT te.id as "timeline_id", s.id as "skills_id", s.skill, s.image_url
         FROM skills s, timeline te, timeline_skills ts
         WHERE te.type LIKE ? AND ts.skills_id = s.id AND te.id = ts.timeline_id
         ORDER BY te.date DESC`
      )
      .bind(typePattern)
      .all();

    const timelineSkillsMap = new Map();
    (timelineSkillsResult.results || []).forEach((row) => {
      if (!timelineSkillsMap.has(row.timeline_id)) {
        timelineSkillsMap.set(row.timeline_id, []);
      }
      timelineSkillsMap.get(row.timeline_id).push({
        timelineId: row.timeline_id,
        skillsId: row.skills_id,
        type: row.skill,
        imageUrl: formatImageUrl(row.image_url),
      });
    });

    const timeline = (timelineResult.results || []).map((row) => ({
      id: row.id,
      type: row.type,
      date: row.date,
      title: row.title,
      description: row.description,
      company: row.company,
      imageUrl: formatImageUrl(row.image_url),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      skills: timelineSkillsMap.get(row.id) || [],
    }));

    return new Response(
      JSON.stringify({ bio, projects, skills, timeline }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "public, max-age=3600, s-maxage=86400",
        },
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
