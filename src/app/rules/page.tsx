import { db } from "~/server/db";

async function getPolicies(): Promise<{
  privacyPolicy: string;
  termsOfService: string;
}> {
  const rows = await db.$queryRaw<Array<{ key: string; value: string }>>`
    SELECT \`key\`, \`value\`
    FROM \`dashboard_configuration\`
    WHERE \`key\` IN ('privacyPolicy', 'termsOfService')
  `;
  const values = new Map(rows.map((row) => [row.key, row.value]));
  return {
    privacyPolicy: values.get("privacyPolicy") ?? "",
    termsOfService: values.get("termsOfService") ?? "",
  };
}

function PolicyCard({ content, emptyMessage }: { content: string; emptyMessage: string }) {
  return (
    <div className="card">
      <div className="card-body">
        {content ? (
          <div className="text-break" style={{ whiteSpace: "pre-wrap" }}>
            {content}
          </div>
        ) : (
          <p className="text-muted mb-0">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}

export default async function Rules() {
  const policies = await getPolicies();

  return (
    <div className="content">
      <h1 className="h2">Privacy, terms, and rules</h1>
      <div className="row">
        <div className="col-lg-12">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-privacy" type="button" role="tab">
                Privacy policy
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-terms" type="button" role="tab">
                Terms of service
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#tab-chat" type="button" role="tab">
                Community rules
              </button>
            </li>
          </ul>
          <div className="tab-content pt-3">
            <div className="tab-pane fade show active" id="tab-privacy" role="tabpanel">
              <PolicyCard content={policies.privacyPolicy} emptyMessage="No privacy policy has been published yet." />
            </div>
            <div className="tab-pane fade" id="tab-terms" role="tabpanel">
              <PolicyCard content={policies.termsOfService} emptyMessage="No terms of service have been published yet." />
            </div>
            <div className="tab-pane fade" id="tab-chat" role="tabpanel">
              <PolicyCard
                content={"1. No swearing\n\n2. No bullying, put-downs, or other harassment\n\n3. No spamming"}
                emptyMessage="No community rules have been published yet."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
