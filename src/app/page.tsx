import Image from "next/image";
import Link from "next/link";
import { AnnouncementCard } from "~/components/announcement/AnnouncementCard";
import { listPublishedAnnouncements } from "~/server/announcements/announcements";

export const dynamic = "force-dynamic";

export default async function Home() {
  const announcements = await listPublishedAnnouncements(3);
  const [latestAnnouncement] = announcements;
  return (
    <>
      <div className="row">
        <div className="col-xl-9 col-lg-8">
          <div className="content">
            <div id="chatbox-top"></div>

            {latestAnnouncement ? (
              <div className="row">
                <div className="col-md-12">
                  <AnnouncementCard announcement={latestAnnouncement} />
                </div>
              </div>
            ) : (
              <div className="alert alert-secondary">No announcements have been published yet.</div>
            )}

            <br />

            <ul className="pagination d-inline-flex">
              <li className="page-item  disabled">
                <Link className="page-link" href="#">
                  «
                </Link>
              </li>
              <li className="page-item  active ">
                <Link className="page-link" href="?&amp;p=1">
                  1
                </Link>
              </li>
              <li className="page-item  disabled ">
                <Link className="page-link" href="#">
                  »
                </Link>
              </li>
            </ul>

            <div id="chatbox-bottom"></div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Online Staff</div>
                <div className="card-body">
                  There are no staff members online.
                </div>
              </div>
            </div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Online Users</div>
                <div className="card-body">There are no users online.</div>
              </div>
            </div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Statistics</div>
                <div className="card-body">
                  <div className="pairs">
                    <dl>
                      <dt>Total Threads</dt>
                      <dd>1</dd>
                    </dl>
                    <dl>
                      <dt>Total Posts</dt>
                      <dd>4</dd>
                    </dl>
                    <dl>
                      <dt>Users Registered</dt>
                      <dd>48</dd>
                    </dl>
                    <dl>
                      <dt>Online Guests</dt>
                      <dd>1</dd>
                    </dl>
                    <dl>
                      <dt>Latest Member</dt>
                      <dd>
                        <Link
                          href="/profile/Mr_Evan_Pvp/"
                          data-poload="/queries/user/?id=48"
                        >
                          Mr_Evan_Pvp
                        </Link>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget">
              <div className="card card-secondary">
                <div className="card-header">Latest News</div>
                <div className="card-body">
                  <div className="list">
                    {announcements.map((announcement) => (
                      <Link href={`/announcements/${announcement.id}`} key={announcement.id}>
                        <div className="list-item align-items-center">
                          <div className="list-icon">
                            {announcement.imageUrl ? <Image src={announcement.imageUrl} alt="" width={100} height={100} unoptimized /> : <span className="fa fa-bullhorn" aria-hidden="true" />}
                          </div>
                          <div className="list-content">
                            <div className="latest-news-name">{announcement.title}</div>
                            <div className="latest-news-date">{new Date(announcement.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
