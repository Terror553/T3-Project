export default function Rules() {
  return (
    <div className="container">
      <div className="alert alert-danger" id="alert-ie">
        <div className="alert-heading">Internet Explorer</div>
        Internet Explorer is not supported. Please upgrade to a more modern
        browser.
      </div>

      <h2>Rules</h2>

      <div className="row">
        <div className="col-lg-12">
          <div className="content">
            <div id="chatbox-top"></div>

            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  href="#tab-home"
                  className="nav-link active"
                  data-bs-toggle="tab"
                >
                  <i className="fas fa-gavel"></i>
                  Rules
                </a>
              </li>
              <li className="nav-item">
                <a href="#tab-1" className="nav-link" data-bs-toggle="tab">
                  <i className="fas fa-bed"></i>
                  Bedwars
                </a>
              </li>
              <li className="nav-item">
                <a href="#tab-2" className="nav-link" data-bs-toggle="tab">
                  <i className="fas fa-comments"></i>
                  Chat
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="tab-home">
                <div className="card">
                  <div className="card-body">
                    <span>Test</span>
                  </div>
                </div>
                <div className="tab-pane" id="tab-1">
                  <div className="card">
                    <div className="card-body">
                      <span>test</span>
                    </div>
                  </div>
                </div>
                <div className="tab-pane" id="tab-2">
                  <div className="card">
                    <div className="card-body">
                      <span>Chat Rules:</span>
                      <br />
                      1. No swearing
                      <br />
                      <br />
                      2. No bullying, put-downs, or other harassment
                      <br />
                      <br />
                      3. No spamming
                      <br />
                      <br />
                      <span style={{ color: "#c0392b" }}>
                        <strong>Punishment:</strong>
                      </span>{" "}
                      Breaking any of these rules can result in a
                      temporary/permanent mute
                    </div>
                  </div>
                </div>
              </div>

              <div id="chatbox-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
