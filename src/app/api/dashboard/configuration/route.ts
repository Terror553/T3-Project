import { NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "~/server/auth/utils/currentUser";
import { db } from "~/server/db";

const DEFAULTS = {
  siteName: "T3 Project",
  siteDescription: "",
  registrationEnabled: true,
  requireEmailVerification: false,
  privacyPolicy: "",
  termsOfService: "",
} as const;

type Configuration = {
  siteName: string;
  siteDescription: string;
  registrationEnabled: boolean;
  requireEmailVerification: boolean;
  privacyPolicy: string;
  termsOfService: string;
};

const configurationSchema = z.object({
  siteName: z.string().max(100),
  siteDescription: z.string().max(10000),
  registrationEnabled: z.boolean(),
  requireEmailVerification: z.boolean(),
  privacyPolicy: z.string().max(10000),
  termsOfService: z.string().max(10000),
});

function isStaff(user: Awaited<ReturnType<typeof getCurrentUser>>): boolean {
  return Boolean(user?.group?.team || user?.group?.highTeam);
}

async function readConfiguration(): Promise<Configuration> {
  const rows = await db.$queryRaw<Array<{ key: string; value: string }>>`
    SELECT \`key\`, \`value\` FROM \`dashboard_configuration\`
  `;
  const values = new Map(rows.map((row) => [row.key, row.value]));
  return {
    siteName: values.get("siteName") ?? DEFAULTS.siteName,
    siteDescription: values.get("siteDescription") ?? DEFAULTS.siteDescription,
    registrationEnabled: values.get("registrationEnabled") === "true" || (values.get("registrationEnabled") === undefined && DEFAULTS.registrationEnabled),
    requireEmailVerification: values.get("requireEmailVerification") === "true",
    privacyPolicy: values.get("privacyPolicy") ?? DEFAULTS.privacyPolicy,
    termsOfService: values.get("termsOfService") ?? DEFAULTS.termsOfService,
  };
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!isStaff(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    return NextResponse.json(await readConfiguration());
  } catch (error) {
    console.error("Failed to read dashboard configuration", error);
    return NextResponse.json({ error: "Configuration is unavailable." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  if (!isStaff(user)) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    const parsed = configurationSchema.partial().safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Configuration contains invalid values." }, { status: 400 });
    }
    const current = await readConfiguration();
    const next: Configuration = { ...current };
    for (const key of Object.keys(current) as Array<keyof Configuration>) {
      if (key === "siteName" && parsed.data.siteName !== undefined) next.siteName = parsed.data.siteName;
      if (key === "siteDescription" && parsed.data.siteDescription !== undefined) next.siteDescription = parsed.data.siteDescription;
      if (key === "registrationEnabled" && parsed.data.registrationEnabled !== undefined) next.registrationEnabled = parsed.data.registrationEnabled;
      if (key === "requireEmailVerification" && parsed.data.requireEmailVerification !== undefined) next.requireEmailVerification = parsed.data.requireEmailVerification;
      if (key === "privacyPolicy" && parsed.data.privacyPolicy !== undefined) next.privacyPolicy = parsed.data.privacyPolicy;
      if (key === "termsOfService" && parsed.data.termsOfService !== undefined) next.termsOfService = parsed.data.termsOfService;
    }
    await db.$transaction(
      (Object.entries(next) as Array<[keyof Configuration, string | boolean]>).map(([key, value]) =>
        db.$executeRaw`
          INSERT INTO \`dashboard_configuration\` (\`key\`, \`value\`)
          VALUES (${key}, ${String(value)})
          ON DUPLICATE KEY UPDATE \`value\` = VALUES(\`value\`), \`updatedAt\` = CURRENT_TIMESTAMP(6)
        `,
      ),
    );
    return NextResponse.json(next);
  } catch (error) {
    console.error("Failed to update dashboard configuration", error);
    return NextResponse.json({ error: "Configuration could not be saved." }, { status: 500 });
  }
}
