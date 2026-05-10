import Image from "next/image";

export default function Settings() {
  return (
    <>
      <div className="col-xl-9 col-lg-8">
        <div className="card">
          <div className="card-body">
            <div className="account-overview">
              <div className="account-overview-icon">
                <Image
                  src="/default.png"
                  alt="TerrorV2"
                  width={100}
                  height={100}
                />
              </div>
              <div className="account-overview-info">
                <div className="pairs pairs-50">
                  <dl>
                    <dt>Username</dt>
                    <dd>TerrorV2</dd>
                  </dl>
                  <dl>
                    <dt>Group</dt>
                    <dd>Member</dd>
                  </dl>
                  <dl>
                    <dt>Registered</dt>
                    <dd>26 Feb 2023, 14:39</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3>Forum posts (last 7 days)</h3>
            <div id="chartWrapper">
              <span>keine du hs</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
