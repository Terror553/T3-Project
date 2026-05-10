import { TopicCreationForm } from "~/components/topicCreationForm";

export default function LoginPage() {
  return (
    <div className="content">
      <h2>Creating topic in Forum</h2>

      <div className="row">
        <div className="col">
          <div className="content">
            <div id="chatbox-top"></div>

            <div className="card">
              <div className="card-body">
                <TopicCreationForm />
              </div>
            </div>

            <div className="modal fade" id="modal-cancel">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="modal-title">Cancel</div>
                    <a href="#" className="close" data-bs-dismiss="modal">
                      <i className="fas fa-times"></i>
                    </a>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you wish to cancel?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <a href="/forum/" className="btn btn-primary btn-sm">
                      Yes
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
