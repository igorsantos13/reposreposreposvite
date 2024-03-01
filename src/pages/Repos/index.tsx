import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { Loader } from "lucide-react";

export function Repos() {
  const [repository, setRepository] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { repo } = useParams();

  useEffect(() => {
    async function load() {
      const [repositoryData, repositoryIssues] = await Promise.all([
        api.get(`/repos/${repo}`),
        api.get(`/repos/${repo}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);

      setRepository(repositoryData.data);
      // setIssues(repositoryIssues.data);
      setLoading(false);
    }

    load();
  }, [repo]);

  useEffect(() => {
    async function loadPages() {
      const currentIssue = await api.get(`/repos/${repo}/issues`, {
        params: {
          state: "open",
          page,
          per_page: 5,
        },
      });
      setIssues(currentIssue.data);
    }
    loadPages();
  }, [page]);
  return (
    <>
      <div className="antialiased p-4 mt-12 w-[750px] min-h-[150px] rounded-md flex flex-col items-center bg-white">
        {loading && (
          <h1>
            <Loader />
          </h1>
        )}

        <div className="flex flex-row gap-2 ">
          <img
            src={repository?.owner?.avatar_url}
            alt={repository?.owner?.login}
            className="h-6 w-6"
          />

          <b className="font-bold">/</b>
          <h1 className="text-slate-800 font-bold text-2xl antialiased capitalize">
            {repository?.name}
          </h1>
        </div>

        <p>{repository?.description}</p>

        <div className="antialiased p-4 mt-12 w-[750px] min-h-[150px] rounded-md flex flex-col items-center">
          <ul className="rounded-md flex flex-col justify-around h-[600px]">
            {issues?.map((issue) => (
              <li
                className="flex flex-row gap-2 items-center "
                key={String(issue.id)}
              >
                <img
                  className="h-20 w-h-20 border-4 border-slate-600 rounded-full"
                  src={issue.user?.avatar_url}
                  alt={issue.user?.login}
                />

                <div>
                  <strong>
                    <a href={issue?.html_url}>{issue?.title}</a>

                    {issue?.labels?.map((label) => (
                      <span
                        className="text-slate-700 border-2 border-slate-300 p-1 ml-1 rounded-e-md"
                        key={String(label?.id)}
                      >
                        {label?.name}
                      </span>
                    ))}
                  </strong>
                  <p className="font-semibold">by: {issue?.user?.login}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-row justify-between w-full">
          <button
            className="bg-slate-800 text-white px-4 py-1 rounded-md"
            type="button"
            onClick={() => setPage(() => page - 1)}
          >
            Previous
          </button>
          <button
            className="bg-slate-800 text-white px-6 py-1 rounded-md"
            type="button"
            onClick={() => setPage(() => page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
