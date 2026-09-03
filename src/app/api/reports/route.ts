import { NextResponse } from "next/server";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const payload = (await request.json()) as Record<string, unknown>;
  const reason = typeof payload.reason === "string" ? payload.reason.trim() : "";
  const topicId = typeof payload.topicId === "number" ? payload.topicId : null;
  const replyId = typeof payload.replyId === "number" ? payload.replyId : null;

  if (!reason || (topicId === null && replyId === null) || (topicId !== null && replyId !== null)) {
    return NextResponse.json({ error: "A reason and exactly one report target are required" }, { status: 400 });
  }

  await db.$executeRaw`INSERT INTO forum_reports (reason, reporterId, topicId, replyId) VALUES (${reason}, ${user.id}, ${topicId}, ${replyId})`;
  const reports = await db.$queryRaw<Array<ReportRecord>>`SELECT * FROM forum_reports WHERE reporterId = ${user.id} ORDER BY id DESC LIMIT 1`;
  const report = reports[0];
  if (!report) {
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
  return NextResponse.json(report, { status: 201 });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !(user.group?.team || user.group?.highTeam)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const reports = await db.$queryRaw<Array<ReportRecord>>`
    SELECT r.*, u.id AS reporterUserId, u.username AS reporterUsername
    FROM forum_reports r
    INNER JOIN forum_user u ON u.id = r.reporterId
    ORDER BY r.createdAt DESC
  `;
  return NextResponse.json(reports.map(mapReport));
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser();
  if (!user || !(user.group?.team || user.group?.highTeam)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const payload = (await request.json()) as Record<string, unknown>;
  const id = typeof payload.id === "number" ? payload.id : NaN;
  const status = payload.status === "open" || payload.status === "resolved" || payload.status === "dismissed"
    ? payload.status
    : null;
  if (!Number.isInteger(id) || !status) {
    return NextResponse.json({ error: "A valid report id and status are required" }, { status: 400 });
  }

  await db.$executeRaw`UPDATE forum_reports SET status = ${status}, reviewedBy = ${user.id}, updatedAt = NOW(6) WHERE id = ${id}`;
  const reports = await db.$queryRaw<Array<ReportRecord>>`SELECT * FROM forum_reports WHERE id = ${id}`;
  const report = reports[0];
  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }
  return NextResponse.json(report);
}

type ReportRecord = {
  id: number;
  reason: string;
  status: string;
  reporterId: number;
  topicId: number | null;
  replyId: number | null;
  reviewedBy: number | null;
  createdAt: Date;
  updatedAt: Date;
  reporterUserId?: number;
  reporterUsername?: string;
};

function mapReport(report: ReportRecord) {
  return {
    ...report,
    reporter: {
      id: report.reporterUserId ?? report.reporterId,
      username: report.reporterUsername ?? "Unknown",
    },
  };
}
